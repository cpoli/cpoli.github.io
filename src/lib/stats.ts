// Package stats fetched at build time. A failed lookup yields undefined so the
// build never breaks on a flaky API; the card simply omits that stat.

export async function githubStars(repo: string): Promise<number | undefined> {
  const url = `https://api.github.com/repos/${repo}`;
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  const token = process.env.GITHUB_TOKEN;
  try {
    let res = await fetch(url, token ? { headers: { ...headers, Authorization: `Bearer ${token}` } } : { headers });
    // Org SSO can reject an otherwise valid token on public repos; retry anonymously.
    if (!res.ok && token) res = await fetch(url, { headers });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { stargazers_count?: number };
    return data.stargazers_count;
  } catch {
    return undefined;
  }
}

// PyPI downloads over the last 30 days, excluding mirrors.
export async function monthlyDownloads(pkg: string): Promise<number | undefined> {
  try {
    const res = await fetch(`https://pypistats.org/api/packages/${pkg.toLowerCase()}/overall?mirrors=false`);
    if (!res.ok) return undefined;
    const { data } = (await res.json()) as { data: { date: string; downloads: number }[] };
    const cutoff = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    return data.filter((d) => d.date > cutoff).reduce((sum, d) => sum + d.downloads, 0);
  } catch {
    return undefined;
  }
}

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
export const formatCount = (n: number) => compact.format(n);
