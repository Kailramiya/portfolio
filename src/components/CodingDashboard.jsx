import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
	ExternalLink,
	Github,
	Code,
	Trophy,
	AlertCircle,
	RefreshCw,
} from 'lucide-react'
import { portfolioData } from '../data/portfolio'

function Sparkline({ points, color = '#10b981', width = 140, height = 44 }) {
	if (!Array.isArray(points) || points.length < 2) return null
	const min = Math.min(...points)
	const max = Math.max(...points)
	const span = max - min || 1
	const pad = 4
	const usableWidth = width - pad * 2
	const usableHeight = height - pad * 2
	const coords = points.map((v, i) => {
		const x = (i / (points.length - 1)) * usableWidth + pad
		const y = height - pad - ((v - min) / span) * usableHeight
		return `${x},${y}`
	})
	const lastPoint = coords[coords.length - 1]?.split(',').map(Number)

	return (
		<svg width={width} height={height} role="img" aria-label="Rating trend" className="overflow-visible">
			<polyline
				fill="none"
				stroke={color}
				strokeWidth="2.5"
				strokeLinecap="round"
				points={coords.join(' ')}
			/>
			{lastPoint && (
				<circle cx={lastPoint[0]} cy={lastPoint[1]} r="3" fill={color} />
			)}
		</svg>
	)
}

function lastPathSegment(url) {
	if (!url) return ''
	try {
		const u = new URL(url)
		const parts = u.pathname.split('/').filter(Boolean)
		return (parts[parts.length - 1] || '').trim()
	} catch {
		return ''
	}
}

function githubHandleFromUrl(url) {
	if (!url) return ''
	try {
		const u = new URL(url)
		if (u.hostname !== 'github.com') return ''
		const parts = u.pathname.split('/').filter(Boolean)
		return (parts[0] || '').trim()
	} catch {
		return ''
	}
}

function buildStatsUrl(handles) {
	const url = new URL('/api/coding-stats', window.location.origin)
	for (const [key, value] of Object.entries(handles || {})) {
		if (typeof value === 'string' && value.trim()) {
			url.searchParams.set(key, value.trim())
		}
	}
	return url.toString()
}

function SkeletonCard() {
	return (
		<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
			<div className="flex items-center justify-between mb-4">
				<div className="h-5 w-28 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
				<div className="h-9 w-9 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
			</div>
			<div className="space-y-3">
				<div className="h-7 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
				<div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
				<div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
			</div>
		</div>
	)
}

function StatPill({ label, value }) {
	return (
		<div className="flex items-center justify-between gap-3 py-1.5">
			<span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
			<span className="text-sm font-semibold text-gray-900 dark:text-white">{value}</span>
		</div>
	)
}

function PlatformCard({
	title,
	icon,
	accent = 'from-primary-500 to-purple-600',
	profileUrl,
	primaryValue,
	primaryLabel,
	stats = [],
	status,
	trendLabel,
	trendData,
}) {
	const Icon = icon

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			whileHover={{ y: -3 }}
			className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-800"
		>
			<div className="flex items-start justify-between gap-4 mb-4">
				<div>
					<div className="flex items-center gap-2">
						<h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
						{status && (
							<span
								className={`px-2 py-1 text-xs font-medium rounded-full ${
									status === 'ok'
										? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
										: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
								}`}
							>
								{status === 'ok' ? 'Live' : 'Partial'}
							</span>
						)}
					</div>
					{primaryValue != null && (
						<div className="mt-2">
							<div className="text-3xl font-bold gradient-text leading-none">{primaryValue}</div>
							<div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{primaryLabel}</div>
						</div>
					)}
				</div>

				<div className="flex items-center gap-2 flex-shrink-0">
					{profileUrl && (
						<motion.a
							href={profileUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Open ${title} profile`}
							whileHover={{ scale: 1.08 }}
							whileTap={{ scale: 0.95 }}
							className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors"
						>
							<ExternalLink size={16} />
						</motion.a>
					)}
					<div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${accent} text-white flex items-center justify-center`}>
						<Icon size={20} />
					</div>
				</div>
			</div>

			<div className="divide-y divide-gray-100 dark:divide-gray-800">
				{stats.map((row) => (
					<StatPill key={row.label} label={row.label} value={row.value} />
				))}
			</div>

			{profileUrl && (
				<div className="mt-4 flex justify-end">
					<motion.a
						href={profileUrl}
						target="_blank"
						rel="noopener noreferrer"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
					>
						<ExternalLink size={14} />
						View Profile
					</motion.a>
				</div>
			)}
			{trendData && trendData.length > 1 && (
				<div className="mt-4 -mx-2 -mb-2">
					<div className="text-xs text-gray-600 dark:text-gray-400 mb-2 px-2">{trendLabel || 'Rating trend'}</div>
					<div className="bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
						<ResponsiveContainer width="100%" height={180}>
							<LineChart data={trendData.map((rating, i) => ({ contest: i + 1, rating }))}>
								<CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" vertical={false} />
								<XAxis 
									dataKey="contest" 
									stroke="rgba(107, 114, 128, 0.5)" 
									tick={{ fontSize: 11 }}
									style={{ opacity: 0.7 }}
								/>
								<YAxis 
									stroke="rgba(107, 114, 128, 0.5)" 
									tick={{ fontSize: 11 }}
									style={{ opacity: 0.7 }}
									domain="dataMin - 10"
								/>
								<Tooltip 
									contentStyle={{ 
										backgroundColor: 'rgba(17, 24, 39, 0.95)', 
										border: '1px solid rgba(75, 85, 99, 0.3)',
										borderRadius: '8px'
									}}
									labelStyle={{ color: '#9ca3af', fontSize: '12px' }}
									formatter={(value) => [`${Math.round(value)}`, 'Rating']}
									labelFormatter={(label) => `Contest ${label}`}
								/>
								<Line 
									type="monotone" 
									dataKey="rating" 
									stroke="#6366f1" 
									dot={false}
									strokeWidth={2.5}
									isAnimationActive={false}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			)}
		</motion.div>
	)
}

export default function CodingDashboard({
	handles,
}) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const derivedHandles = useMemo(() => {
		const links = portfolioData?.personal?.links || {}
		return {
			leetcode: lastPathSegment(links.leetcode),
			codeforces: lastPathSegment(links.codeforces),
			codechef: lastPathSegment(links.codechef),
			gfg: lastPathSegment(links.gfg),
			github: githubHandleFromUrl(links.github),
		}
	}, [])

	const mergedHandles = useMemo(() => {
		return { ...derivedHandles, ...(handles || {}) }
	}, [derivedHandles, handles])

	// Use local handles for profile links so they're visible even if the API fails.
	const linkHandles = mergedHandles

	const url = useMemo(() => {
		if (typeof window === 'undefined') return ''
		return buildStatsUrl(mergedHandles)
	}, [mergedHandles])

	async function load() {
		setLoading(true)
		setError('')

		try {
			const res = await fetch(url || '/api/coding-stats', {
				headers: { 'Accept': 'application/json' },
			})
			const body = await res.json().catch(() => null)

			if (!res.ok) {
				const message = body?.error || 'Failed to load stats'
				throw new Error(message)
			}

			setData(body)
		} catch (e) {
			setData(null)
			setError(e?.message || 'Failed to load stats')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (typeof window === 'undefined') return
		load()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url])

	const normalized = data?.normalized || {}
	const handlesOut = data?.handles || {}

	const totalSolved = useMemo(() => {
		const leet = Number(normalized?.leetcode?.solved?.total)
		const cf = Number(normalized?.codeforces?.solved?.total)
		const cc = Number(normalized?.codechef?.solved?.total)
		const gfg = Number(normalized?.geeksforgeeks?.totalSolved)
		const values = [leet, cf, cc, gfg].filter(v => Number.isFinite(v))
		if (!values.length) return null
		return values.reduce((a, b) => a + b, 0)
	}, [normalized])

	const cards = useMemo(() => {
		const leetcode = normalized.leetcode
		const codeforces = normalized.codeforces
		const codechef = normalized.codechef
		const gfg = normalized.geeksforgeeks
		const github = normalized.github

		return [
			{
				key: 'leetcode',
				title: 'LeetCode',
				icon: Code,
				accent: 'from-primary-500 to-purple-600',
				profileUrl: linkHandles.leetcode ? `https://leetcode.com/${linkHandles.leetcode}/` : null,
				primaryValue: leetcode?.solved?.total ?? null,
				primaryLabel: 'Problems solved',
				stats: [
					{ label: 'Solved', value: leetcode?.solved?.total ?? '—' },
					{ label: 'Easy', value: leetcode?.solved?.easy ?? '—' },
					{ label: 'Medium', value: leetcode?.solved?.medium ?? '—' },
					{ label: 'Hard', value: leetcode?.solved?.hard ?? '—' },
					{ label: 'Contest rating', value: leetcode?.contest?.rating ?? '—' },
				],
				trendLabel: 'Contest rating trend',
				trendData: leetcode?.trend?.rating || [],
				status: leetcode ? 'ok' : null,
			},
			{
				key: 'codeforces',
				title: 'Codeforces',
				icon: Trophy,
				accent: 'from-purple-600 to-pink-600',
				profileUrl: linkHandles.codeforces ? `https://codeforces.com/profile/${linkHandles.codeforces}` : null,
				primaryValue: codeforces?.rating ?? null,
				primaryLabel: 'Current rating',
				stats: [
					{ label: 'Solved', value: codeforces?.solved?.total ?? '—' },
					{ label: 'Rank', value: codeforces?.rank ?? '—' },
					{ label: 'Max rating', value: codeforces?.maxRating ?? '—' },
					{ label: 'Max rank', value: codeforces?.maxRank ?? '—' },
					{ label: 'Contests', value: codeforces?.contestsCount ?? '—' },
				],
				trendLabel: 'Contest rating trend',
				trendData: codeforces?.trend?.rating || [],
				status: codeforces ? 'ok' : null,
			},
			{
				key: 'codechef',
				title: 'CodeChef',
				icon: Trophy,
				accent: 'from-primary-600 to-purple-600',
				profileUrl: linkHandles.codechef ? `https://www.codechef.com/users/${linkHandles.codechef}` : null,
				primaryValue: codechef?.rating ?? null,
				primaryLabel: 'Current rating',
				stats: [
					{ label: 'Solved', value: codechef?.solved?.total ?? '—' },
					{ label: 'Stars', value: codechef?.stars ?? '—' },
					{ label: 'Global rank', value: codechef?.globalRank ?? '—' },
					{ label: 'Country rank', value: codechef?.countryRank ?? '—' },
				],
				status: codechef ? 'ok' : null,
			},
			{
				key: 'gfg',
				title: 'GeeksforGeeks',
				icon: Code,
				accent: 'from-green-600 to-emerald-600',
				profileUrl: linkHandles.gfg ? `https://www.geeksforgeeks.org/user/${linkHandles.gfg}/` : null,
				primaryValue: gfg?.totalSolved ?? null,
				primaryLabel: 'Problems solved',
				stats: [
					{ label: 'Solved', value: gfg?.totalSolved ?? '—' },
					{ label: 'Coding score', value: gfg?.codingScore ?? '—' },
					{ label: 'Institute rank', value: gfg?.instituteRank ?? '—' },
				],
				status: gfg ? 'ok' : null,
			},
			{
				key: 'github',
				title: 'GitHub',
				icon: Github,
				accent: 'from-gray-700 to-gray-900',
				profileUrl: github?.htmlUrl || (linkHandles.github ? `https://github.com/${linkHandles.github}` : null),
				primaryValue: github?.followers ?? null,
				primaryLabel: 'Followers',
				stats: [
					{ label: 'Commits', value: github?.commitsRecent ?? '—' },
					{ label: 'Public repos', value: github?.publicRepos ?? '—' },
					{ label: 'Following', value: github?.following ?? '—' },
					{ label: 'Profile', value: github?.login ?? handlesOut.github ?? '—' },
				],
				status: github ? 'ok' : null,
			},
		]
	}, [linkHandles, normalized])

	return (
		<section id="coding" className="section-compact bg-gray-50 dark:bg-gray-800">
			<div className="container-custom section-padding">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center section-margin"
				>
					<h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Competitive Programming</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Live stats from coding platforms (cached to avoid rate-limits)
					</p>
				</motion.div>

				{!loading && !error && (
					<div className="max-w-4xl mx-auto mb-6">
						<div className="glass-effect rounded-xl p-4 dark:bg-gray-900/40">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
								<div>
									<div className="text-sm font-semibold text-gray-900 dark:text-white">Total Questions Solved</div>
									<div className="text-xs text-gray-600 dark:text-gray-400">Across platforms (best available)</div>
								</div>
								<div className="text-3xl font-bold gradient-text leading-none">
									{totalSolved ?? '—'}
								</div>
							</div>
						</div>
					</div>
				)}

				{error && (
					<div className="max-w-3xl mx-auto mb-6">
						<div className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900 rounded-xl p-4 shadow-lg">
							<div className="flex items-start gap-3">
								<AlertCircle className="text-red-500" size={20} />
								<div className="flex-1">
									<div className="text-sm font-semibold text-gray-900 dark:text-white">Couldn’t load stats</div>
									<div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{error}</div>
								</div>
								<motion.button
									onClick={load}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
								>
									<RefreshCw size={14} />
									Retry
								</motion.button>
							</div>
						</div>
					</div>
				)}

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{loading
						? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
						: cards.map((card) => (
							<PlatformCard
								key={card.key}
								title={card.title}
								icon={card.icon}
								accent={card.accent}
								profileUrl={card.profileUrl}
								primaryValue={card.primaryValue}
								primaryLabel={card.primaryLabel}
								stats={card.stats}
								status={card.status}
							/>
						))}
				</div>

				<p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
					Stats are auto-synced every 6 hours via backend services deployed on Vercel.
				</p>
			</div>
		</section>
	)
}

