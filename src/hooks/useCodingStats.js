import { useEffect, useState, useCallback, useMemo } from 'react';
import { portfolioData } from '../data/portfolio';

// Shared live-stats source for the Coding Dashboard and Achievements sections,
// so both show the same numbers from a single (deduped) API call.

function lastPathSegment(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return (parts[parts.length - 1] || '').trim();
  } catch {
    return '';
  }
}

function githubHandleFromUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    if (u.hostname !== 'github.com') return '';
    const parts = u.pathname.split('/').filter(Boolean);
    return (parts[0] || '').trim();
  } catch {
    return '';
  }
}

function buildStatsUrl(handles) {
  const url = new URL('/api/coding-stats', window.location.origin);
  for (const [key, value] of Object.entries(handles || {})) {
    if (typeof value === 'string' && value.trim()) {
      url.searchParams.set(key, value.trim());
    }
  }
  return url.toString();
}

// Module-level promise cache so multiple components mounting at once share a
// single in-flight request per URL. Failed requests are evicted so a retry
// can refetch.
const cache = new Map();

function fetchStats(url) {
  if (cache.has(url)) return cache.get(url);
  const p = fetch(url, { headers: { Accept: 'application/json' } }).then(async (res) => {
    const body = await res.json().catch(() => null);
    if (!res.ok) throw new Error(body?.error || 'Failed to load stats');
    return body;
  });
  cache.set(url, p);
  p.catch(() => cache.delete(url));
  return p;
}

export function useCodingStats(handles) {
  const derived = useMemo(() => {
    const links = portfolioData?.personal?.links || {};
    return {
      leetcode: lastPathSegment(links.leetcode),
      codeforces: lastPathSegment(links.codeforces),
      codechef: lastPathSegment(links.codechef),
      gfg: lastPathSegment(links.gfg),
      github: githubHandleFromUrl(links.github),
    };
  }, []);

  const merged = useMemo(() => ({ ...derived, ...(handles || {}) }), [derived, handles]);
  const url = useMemo(() => (typeof window === 'undefined' ? '' : buildStatsUrl(merged)), [merged]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(
    (force = false) => {
      if (typeof window === 'undefined') return;
      const target = url || '/api/coding-stats';
      if (force) cache.delete(target);
      setLoading(true);
      setError('');
      fetchStats(target)
        .then((body) => {
          setData(body);
          setError('');
        })
        .catch((e) => {
          setData(null);
          setError(e?.message || 'Failed to load stats');
        })
        .finally(() => setLoading(false));
    },
    [url]
  );

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: () => load(true), handles: merged };
}
