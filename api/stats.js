import { fetch as undiciFetch } from 'undici'

const SIX_HOURS_SECONDS = 60 * 60 * 6

const fetchImpl = globalThis.fetch || undiciFetch

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

function toNumberArray(values, limit = 24) {
	if (!Array.isArray(values)) return []
	return values
		map(v => Number(v))
		filter(v => Number.isFinite(v))
		slice(-limit)
}

async function fetchJson(url, options = {}) {
	const controller = new AbortController()
	const timeoutMs = Number(options.timeoutMs || 10_000)
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

	try {
		const res = await fetchImpl(url, {
			...options,
			signal: controller.signal,
			headers: {
				'User-Agent': 'portfolio-stats/1.0',
				...(options.headers || {}),
			},
		})

		const contentType = res.headers.get('content-type') || ''
		const isJson = contentType.includes('application/json') || contentType.includes('+json')

		let body
		if (isJson) {
			body = await res.json().catch(() => null)
		} else {
			// We do NOT scrape HTML; if a non-JSON response comes back, treat it as an error.
			const text = await res.text().catch(() => '')
			const hint = text ? ` (non-JSON response)` : ''
			const error = new Error(`Expected JSON from ${url}${hint}`)
			error.status = res.status
			throw error
		}

		if (!res.ok) {
			const message = body?.message || body?.error || `HTTP ${res.status}`
			const error = new Error(message)
			error.status = res.status
			error.body = body
			throw error
		}

		return body
	} finally {
		clearTimeout(timeoutId)
	}
}

async function getLeetCodeStats(username) {
	if (!username) return { ok: false, error: 'Missing username' }

	const query = `
		query userProfile($username: String!) {
			matchedUser(username: $username) {
				username
				profile {
					realName
					ranking
					reputation
					starRating
				}
				submitStatsGlobal {
					acSubmissionNum {
						difficulty
						count
						submissions
					}
				}
			}
			userContestRanking(username: $username) {
				attendedContestsCount
				rating
				globalRanking
				totalParticipants
				topPercentage
			}
		}
	`

	try {
		const body = await fetchJson('https://leetcode.com/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				// Some CDNs are picky; keep headers minimal.
			},
			body: JSON.stringify({ query, variables: { username } }),
			timeoutMs: 12_000,
		})

		if (body?.errors?.length) {
			return { ok: false, error: body.errors.map(e => e?.message).filter(Boolean).join('; ') || 'LeetCode GraphQL error' }
		}

		const matchedUser = body?.data?.matchedUser
		if (!matchedUser) return { ok: false, error: 'User not found' }

		const acNums = matchedUser?.submitStatsGlobal?.acSubmissionNum || []
		const solvedByDifficulty = Object.fromEntries(
			acNums
				.filter(x => x?.difficulty)
				.map(x => [String(x.difficulty).toLowerCase(), Number(x.count || 0)])
		)

		const totalSolved = Number(solvedByDifficulty.all || solvedByDifficulty.total || 0) ||
			(Number(solvedByDifficulty.easy || 0) + Number(solvedByDifficulty.medium || 0) + Number(solvedByDifficulty.hard || 0))

		const contest = body?.data?.userContestRanking || null

		// Best-effort contest rating history for sparklines.
		let ratingTrend = []
		try {
			const historyQuery = `
				query contestHistory($username: String!) {
					userContestRankingHistory(username: $username) {
						contestHistory {
							rating
						}
					}
				}
			`
			const historyBody = await fetchJson('https://leetcode.com/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify({ query: historyQuery, variables: { username } }),
				timeoutMs: 12_000,
			})
			const contestHistory = historyBody?.data?.userContestRankingHistory?.contestHistory || []
			ratingTrend = toNumberArray(contestHistory.map(x => x?.rating), 24)
		} catch {
			// Ignore history failures; main stats still returned.
		}

		return {
			ok: true,
			data: {
				username: matchedUser.username,
				realName: matchedUser?.profile?.realName || null,
				ranking: matchedUser?.profile?.ranking ?? null,
				reputation: matchedUser?.profile?.reputation ?? null,
				starRating: matchedUser?.profile?.starRating ?? null,
				solved: {
					total: totalSolved,
					easy: Number(solvedByDifficulty.easy || 0),
					medium: Number(solvedByDifficulty.medium || 0),
					hard: Number(solvedByDifficulty.hard || 0),
				},
				contest: contest
					? {
							rating: contest?.rating ?? null,
							globalRanking: contest?.globalRanking ?? null,
							attendedContestsCount: contest?.attendedContestsCount ?? null,
							topPercentage: contest?.topPercentage ?? null,
							totalParticipants: contest?.totalParticipants ?? null,
						}
					: null,
				trend: {
					rating: ratingTrend,
				},
			},
		}
	} catch (err) {
		return { ok: false, error: normalizeError(err) }
	}
}

async function getCodeforcesStats(handle) {
	if (!handle) return { ok: false, error: 'Missing handle' }
	try {
		const [body, ratingBody, statusBody] = await Promise.all([
			fetchJson(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`, {
				timeoutMs: 10_000,
			}),
			fetchJson(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle)}`, {
				timeoutMs: 10_000,
			}).catch(() => null),
			fetchJson(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=${encodeURIComponent(String(process.env.CODEFORCES_STATUS_COUNT || '10000'))}`, {
				timeoutMs: 12_000,
			}).catch(() => null),
		])

		if (body?.status !== 'OK') {
			return { ok: false, error: body?.comment || 'Codeforces API error' }
		}

		const user = body?.result?.[0]
		if (!user) return { ok: false, error: 'User not found' }

		let ratingTrend = []
		let contestsCount = null
		if (ratingBody?.status === 'OK' && Array.isArray(ratingBody?.result)) {
			contestsCount = ratingBody.result.length
			ratingTrend = toNumberArray(ratingBody.result.map(x => x?.newRating), 24)
		}

		let solvedCount = null
		if (statusBody?.status === 'OK' && Array.isArray(statusBody?.result)) {
			const solved = new Set()
			for (const submission of statusBody.result) {
				if (submission?.verdict !== 'OK') continue
				const problem = submission?.problem
				const contestId = problem?.contestId
				const index = problem?.index
				if (!contestId || !index) continue
				solved.add(`${contestId}-${index}`)
			}
			solvedCount = solved.size
		}

		return {
			ok: true,
			data: {
				handle: user.handle,
				rank: user.rank || null,
				rating: user.rating ?? null,
				maxRank: user.maxRank || null,
				maxRating: user.maxRating ?? null,
				contribution: user.contribution ?? null,
				friendOfCount: user.friendOfCount ?? null,
				organization: user.organization || null,
				country: user.country || null,
				contestsCount,
				solved: {
					total: solvedCount,
				},
				trend: {
					rating: ratingTrend,
				},
			},
		}
	} catch (err) {
		return { ok: false, error: normalizeError(err) }
	}
}

async function getGitHubProfile(username) {
	if (!username) return { ok: false, error: 'Missing username' }

	const token = process.env.GITHUB_TOKEN
	const headers = {
		'Accept': 'application/vnd.github+json',
		...(token ? { 'Authorization': `Bearer ${token}` } : {}),
	}

	try {
		const [user, events] = await Promise.all([
			fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}`, {
				headers,
				timeoutMs: 10_000,
			}),
			// Best-effort: derive a recent commit count from public events (limited window).
			fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`, {
				headers,
				timeoutMs: 10_000,
			}).catch(() => []),
		])

		let commitsRecent = null
		if (Array.isArray(events)) {
			let total = 0
			for (const evt of events) {
				if (evt?.type !== 'PushEvent') continue
				const commits = evt?.payload?.commits
				if (Array.isArray(commits)) total += commits.length
			}
			commitsRecent = total
		}

		return {
			ok: true,
			data: {
				login: user.login,
				name: user.name || null,
				avatarUrl: user.avatar_url || null,
				htmlUrl: user.html_url || null,
				company: user.company || null,
				blog: user.blog || null,
				location: user.location || null,
				publicRepos: user.public_repos ?? null,
				publicGists: user.public_gists ?? null,
				followers: user.followers ?? null,
				following: user.following ?? null,
				commitsRecent,
				createdAt: user.created_at || null,
				updatedAt: user.updated_at || null,
			},
		}
	} catch (err) {
		return { ok: false, error: normalizeError(err) }
	}
}

// CodeChef does not provide an official public stats API.
// We extract data from their profile HTML page (best-effort scraping).
async function getCodeChefStats(username) {
	if (!username) return { ok: false, error: 'Missing username' }

	try {
		const profileUrl = `https://www.codechef.com/users/${encodeURIComponent(username)}`
		const html = await fetchImpl(profileUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			},
		}).then(r => r.text())

		// Extract rating from common patterns in HTML
		const ratingMatch = html.match(/rating["']?\s*:\s*([0-9]+)/i) || 
		                   html.match(/current.*?rating.*?([0-9]{3,4})/i)
		const starsMatch = html.match(/stars?["']?\s*:\s*([0-9]+)/i) ||
		                  html.match(/([0-9])\s*★/)
		const solvedMatch = html.match(/fully.*?solved["']?\s*:\s*([0-9]+)/i) ||
		                   html.match(/problems.*?solved.*?([0-9]+)/i)

		const rating = ratingMatch ? Number(ratingMatch[1]) : null
		const stars = starsMatch ? Number(starsMatch[1]) : null
		const solved = solvedMatch ? Number(solvedMatch[1]) : null

		// If we got nothing, consider it failed
		if (!rating && !stars && !solved) {
			return { ok: false, error: 'Could not extract stats from profile page' }
		}

		return {
			ok: true,
			data: {
				username,
				rating,
				stars,
				globalRank: null,
				countryRank: null,
				solved: {
					total: solved,
				},
			},
		}
	} catch (err) {
		return { ok: false, error: normalizeError(err) }
	}
}

// GeeksforGeeks does not expose an official public stats API.
// We extract data from their profile HTML page (best-effort scraping).
async function getGeeksForGeeksStats(username) {
	if (!username) return { ok: false, error: 'Missing username' }

	try {
		const profileUrl = `https://www.geeksforgeeks.org/user/${encodeURIComponent(username)}/`
		const html = await fetchImpl(profileUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			},
		}).then(r => r.text())

		let totalSolved = null
		let codingScore = null
		let instituteRank = null

		// Try to extract JSON-LD or embedded JSON data
		const jsonMatch = html.match(/<script[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/i)
		if (jsonMatch) {
			try {
				const jsonData = JSON.parse(jsonMatch[1])
				// Recursively search for stats fields
				const search = (obj, depth = 0) => {
					if (depth > 10 || !obj || typeof obj !== 'object') return
					if (obj.totalProblemsSolved) totalSolved = Number(obj.totalProblemsSolved)
					if (obj.total_problems_solved) totalSolved = Number(obj.total_problems_solved)
					if (obj.totalSolved) totalSolved = Number(obj.totalSolved)
					if (obj.problemsSolved) totalSolved = Number(obj.problemsSolved)
					if (obj.codingScore) codingScore = Number(obj.codingScore)
					if (obj.score) codingScore = Number(obj.score)
					if (obj.instituteRank) instituteRank = Number(obj.instituteRank)
					if (obj.institute_rank) instituteRank = Number(obj.institute_rank)
					for (const value of Object.values(obj)) {
						search(value, depth + 1)
					}
				}
				search(jsonData)
			} catch (e) {
				// Ignore parse errors
			}
		}

		// Fallback: look for embedded JSON-like content in HTML text
		// Pattern: \"score\":1650,\"institute_rank\":3
		if (!codingScore) {
			const scoreMatch = html.match(/\\?"score\\?":\s*(\d+)/)
			if (scoreMatch) codingScore = Number(scoreMatch[1])
		}
		
		if (!instituteRank) {
			const rankMatch = html.match(/\\?"institute_rank\\?":\s*(\d+)/)
			if (rankMatch) instituteRank = Number(rankMatch[1])
		}

		// Fallback to regex patterns in HTML text
		if (!totalSolved) {
			const solvedMatch = html.match(/([0-9]{2,5})\s*problems?\s*solved/i) ||
			                   html.match(/solved["\']?\s*:\s*["']?([0-9]+)/i) ||
			                   html.match(/total[^0-9]*([0-9]{2,5})/i) ||
			                   html.match(/>([0-9]{2,5})<\/[^>]*>\s*problems?/i)
			if (solvedMatch) totalSolved = Number(solvedMatch[1])
		}

		// Regex patterns for coding score
		if (!codingScore) {
			const scoreMatch = html.match(/coding\s+score[^0-9]*([0-9]{3,5})/i) ||
			                  html.match(/score["\']?\s*:\s*["']?([0-9]{3,5})/i) ||
			                  html.match(/([0-9]{3,5})\s*(?:points?|score)/i) ||
			                  html.match(/>([0-9]{3,5})<\/[^>]*>\s*(?:score|points)/i)
			if (scoreMatch) codingScore = Number(scoreMatch[1])
		}

		// Regex patterns for institute rank
		if (!instituteRank) {
			const rankMatch = html.match(/institute\s+rank[^0-9]*([0-9]{1,7})/i) ||
			                 html.match(/rank["\']?\s*:\s*["']?([0-9]{1,7})/i) ||
			                 html.match(/ranking[^0-9]*([0-9]{1,7})/i) ||
			                 html.match(/>([0-9]{1,7})<\/[^>]*>\s*(?:rank|ranking)/i)
			if (rankMatch) instituteRank = Number(rankMatch[1])
		}

		// If we got nothing, consider it failed
		if (!totalSolved && !codingScore) {
			return { ok: false, error: 'Could not extract stats from profile page' }
		}

		return {
			ok: true,
			data: {
				username,
				totalSolved,
				codingScore,
				instituteRank,
			},
		}
	} catch (err) {
		return { ok: false, error: normalizeError(err) }
	}
}

export default async function handler(req, res) {
	// Allow only GET
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET')
		return json(res, 405, { ok: false, error: 'Method Not Allowed' })
	}

	// 6 hours caching at the CDN (Vercel) + stale-while-revalidate
	res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate')

	const leetcode = getQueryParam(req, 'leetcode') || process.env.LEETCODE_USERNAME || ''
	const codeforces = getQueryParam(req, 'codeforces') || process.env.CODEFORCES_HANDLE || ''
	const codechef = getQueryParam(req, 'codechef') || process.env.CODECHEF_USERNAME || ''
	const gfg = getQueryParam(req, 'gfg') || process.env.GFG_USERNAME || ''
	const github = getQueryParam(req, 'github') || process.env.GITHUB_USERNAME || ''

	try {
		const [leetcodeRes, codeforcesRes, codechefRes, gfgRes, githubRes] = await Promise.all([
			getLeetCodeStats(leetcode),
			getCodeforcesStats(codeforces),
			getCodeChefStats(codechef),
			getGeeksForGeeksStats(gfg),
			getGitHubProfile(github),
		])

		const sources = {
			leetcode: leetcodeRes,
			codeforces: codeforcesRes,
			codechef: codechefRes,
			geeksforgeeks: gfgRes,
			github: githubRes,
		}

		const errors = Object.entries(sources)
			.filter(([, r]) => !r?.ok)
			.map(([name, r]) => ({ source: name, error: r?.error || 'Unknown error' }))

		// Create a single normalized view for easy frontend consumption.
		const normalized = {
			leetcode: leetcodeRes.ok ? leetcodeRes.data : null,
			codeforces: codeforcesRes.ok ? codeforcesRes.data : null,
			codechef: codechefRes.ok ? codechefRes.data : null,
			geeksforgeeks: gfgRes.ok ? gfgRes.data : null,
			github: githubRes.ok ? githubRes.data : null,
		}

		const allFailed = Object.values(sources).every(r => !r?.ok)

		return json(res, allFailed ? 502 : 200, {
			ok: !allFailed,
			generatedAt: new Date().toISOString(),
			cacheSeconds: SIX_HOURS_SECONDS,
			handles: { leetcode, codeforces, codechef, gfg, github },
			normalized,
			sources,
			errors,
		})
	} catch (err) {
		console.error('Stats API error:', err)
		return json(res, 500, { ok: false, error: 'Failed to fetch stats' })
	}
}
