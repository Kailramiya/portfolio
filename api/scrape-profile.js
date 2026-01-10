import fetch from 'node-fetch'

const DEFAULT_TTL_SECONDS = 60 * 60 * 6

// Best-effort in-memory cache (per serverless instance)
const memoryCache = globalThis.__PROFILE_SCRAPE_CACHE__ || new Map()
globalThis.__PROFILE_SCRAPE_CACHE__ = memoryCache

function json(res, status, payload) {
	res.statusCode = status
	res.setHeader('Content-Type', 'application/json; charset=utf-8')
	res.end(JSON.stringify(payload))
}

function getQueryParam(req, key) {
	const query = req?.query || {}
	const value = query[key]
	if (typeof value === 'string') return value.trim()
	if (Array.isArray(value) && typeof value[0] === 'string') return value[0].trim()
	return ''
}

function normalizeError(err) {
	if (!err) return 'Unknown error'
	if (typeof err === 'string') return err
	return err.message || 'Unknown error'
}

function safeJsonParse(str) {
	try {
		return JSON.parse(str)
	} catch {
		return null
	}
}

function extractNextData(html) {
	const m = html.match(/<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i)
	if (!m) return null
	return safeJsonParse(m[1])
}

function extractLdJson(html) {
	// Pick the first JSON-LD script that parses.
	const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
	let m
	while ((m = re.exec(html))) {
		const parsed = safeJsonParse(m[1])
		if (parsed) return parsed
	}
	return null
}

function getByDotPath(obj, path) {
	if (!obj || !path) return undefined
	const parts = String(path)
		.split('.')
		.map(p => p.trim())
		.filter(Boolean)
	let cur = obj
	for (const part of parts) {
		if (cur == null) return undefined
		if (Array.isArray(cur)) {
			const idx = Number(part)
			cur = Number.isFinite(idx) ? cur[idx] : undefined
		} else {
			cur = cur[part]
		}
	}
	return cur
}

function isFiniteNumber(v) {
	return typeof v === 'number' && Number.isFinite(v)
}

function findFirstNumericByKeys(obj, keys, maxNodes = 50_000) {
	const wanted = new Set(keys.map(k => String(k).toLowerCase()))
	const queue = [obj]
	let visited = 0
	while (queue.length) {
		const cur = queue.shift()
		visited++
		if (visited > maxNodes) break

		if (!cur || typeof cur !== 'object') continue
		if (Array.isArray(cur)) {
			for (const v of cur) queue.push(v)
			continue
		}
		for (const [k, v] of Object.entries(cur)) {
			if (wanted.has(String(k).toLowerCase()) && isFiniteNumber(v)) {
				return v
			}
			if (v && typeof v === 'object') queue.push(v)
		}
	}
	return null
}

function normalizeFields({ jsonBlob, ratingPath, scorePath, rankPath }) {
	const rating = ratingPath ? getByDotPath(jsonBlob, ratingPath) : findFirstNumericByKeys(jsonBlob, ['rating', 'userRating', 'currentRating'])
	const score = scorePath ? getByDotPath(jsonBlob, scorePath) : findFirstNumericByKeys(jsonBlob, ['score', 'codingScore', 'points'])
	const rank = rankPath ? getByDotPath(jsonBlob, rankPath) : findFirstNumericByKeys(jsonBlob, ['rank', 'ranking', 'globalRank', 'countryRank'])

	return {
		rating: isFiniteNumber(rating) ? rating : null,
		score: isFiniteNumber(score) ? score : null,
		rank: isFiniteNumber(rank) ? rank : null,
	}
}

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET')
		return json(res, 405, { ok: false, error: 'Method Not Allowed' })
	}

	const url = getQueryParam(req, 'url')
	if (!url) return json(res, 400, { ok: false, error: 'Missing url query param' })

	let parsedUrl
	try {
		parsedUrl = new URL(url)
	} catch {
		return json(res, 400, { ok: false, error: 'Invalid url' })
	}

	// Caching headers: CDN caching + stale revalidation
	const ttl = Math.max(60, Number(getQueryParam(req, 'ttl')) || DEFAULT_TTL_SECONDS)
	res.setHeader('Cache-Control', `s-maxage=${ttl}, stale-while-revalidate`)

	const cacheKey = `${parsedUrl.toString()}|ratingPath=${getQueryParam(req, 'ratingPath')}|scorePath=${getQueryParam(req, 'scorePath')}|rankPath=${getQueryParam(req, 'rankPath')}`
	const now = Date.now()
	const cached = memoryCache.get(cacheKey)
	if (cached && cached.expiresAt > now) {
		return json(res, 200, { ...cached.payload, cache: { hit: true, ttlSeconds: ttl } })
	}

	try {
		const resp = await fetch(parsedUrl.toString(), {
			method: 'GET',
			headers: {
				'User-Agent': 'portfolio-stats/1.0 (+https://example.com)',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.9',
			},
		})

		if (!resp.ok) {
			return json(res, 502, { ok: false, error: `Upstream HTTP ${resp.status}` })
		}

		const html = await resp.text()

		// Extract embedded JSON (no DOM parsing; just script tag extraction)
		const nextData = extractNextData(html)
		const ldJson = nextData ? null : extractLdJson(html)
		const jsonBlob = nextData || ldJson

		if (!jsonBlob) {
			return json(res, 502, { ok: false, error: 'No embedded JSON found in HTML (expected __NEXT_DATA__ or application/ld+json)' })
		}

		const ratingPath = getQueryParam(req, 'ratingPath')
		const scorePath = getQueryParam(req, 'scorePath')
		const rankPath = getQueryParam(req, 'rankPath')

		const normalized = normalizeFields({ jsonBlob, ratingPath, scorePath, rankPath })

		const payload = {
			ok: true,
			generatedAt: new Date().toISOString(),
			sourceUrl: parsedUrl.toString(),
			extractedFrom: nextData ? 'nextjs' : 'jsonld',
			data: normalized,
		}

		memoryCache.set(cacheKey, {
			expiresAt: now + ttl * 1000,
			payload,
		})

		return json(res, 200, { ...payload, cache: { hit: false, ttlSeconds: ttl } })
	} catch (err) {
		return json(res, 500, { ok: false, error: normalizeError(err) })
	}
}
