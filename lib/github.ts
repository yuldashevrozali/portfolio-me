// Token-free GitHub data layer.
// All requests are cached (ISR) and revalidated once a day, so visitors never
// hit GitHub's unauthenticated rate limit and the page stays fast. Every fetch
// fails gracefully (returns null / empty) so the UI can degrade without breaking.

export const GITHUB_USERNAME = "yuldashevrozali";

const REVALIDATE = 60 * 60 * 24; // 24h

export type GithubProfile = {
  name: string;
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
};

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
};

export type GithubActivityEvent = {
  type: string;
  repo: string;
  repoUrl: string;
  date: string;
};

export type GithubData = {
  profile: GithubProfile | null;
  totalContributions: number | null;
  weeks: ContributionDay[][];
  topRepos: GithubRepo[];
  recent: GithubActivityEvent[];
};

async function safeJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function getProfile(): Promise<GithubProfile | null> {
  const data = await safeJson<Record<string, unknown>>(
    `https://api.github.com/users/${GITHUB_USERNAME}`
  );
  if (!data || typeof data.login !== "string") return null;
  return {
    name: (data.name as string) ?? GITHUB_USERNAME,
    login: data.login as string,
    avatarUrl: data.avatar_url as string,
    htmlUrl: data.html_url as string,
    publicRepos: (data.public_repos as number) ?? 0,
    followers: (data.followers as number) ?? 0,
    following: (data.following as number) ?? 0,
  };
}

async function getContributions(): Promise<{
  total: number | null;
  weeks: ContributionDay[][];
}> {
  // jogruber's contributions API mirrors the public contribution calendar
  // without requiring a token.
  const data = await safeJson<{
    total: Record<string, number>;
    contributions: ContributionDay[];
  }>(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);

  if (!data?.contributions?.length) return { total: null, weeks: [] };

  const days = data.contributions;
  const weeks: ContributionDay[][] = [];
  let current: ContributionDay[] = [];

  days.forEach((day) => {
    const weekday = new Date(day.date).getUTCDay(); // 0 = Sunday
    if (weekday === 0 && current.length) {
      weeks.push(current);
      current = [];
    }
    current.push(day);
  });
  if (current.length) weeks.push(current);

  const total =
    typeof data.total?.lastYear === "number"
      ? data.total.lastYear
      : days.reduce((sum, d) => sum + d.count, 0);

  return { total, weeks };
}

async function getTopRepos(): Promise<GithubRepo[]> {
  const data = await safeJson<Array<Record<string, unknown>>>(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`
  );
  if (!data) return [];
  return data
    .filter((r) => !r.fork)
    .map((r) => ({
      name: r.name as string,
      description: (r.description as string) ?? null,
      url: r.html_url as string,
      language: (r.language as string) ?? null,
      stars: (r.stargazers_count as number) ?? 0,
      forks: (r.forks_count as number) ?? 0,
    }))
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 6);
}

async function getRecent(): Promise<GithubActivityEvent[]> {
  const data = await safeJson<Array<Record<string, unknown>>>(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`
  );
  if (!data) return [];
  return data
    .map((e) => {
      const repo = e.repo as { name?: string } | undefined;
      return {
        type: (e.type as string)?.replace(/Event$/, "") ?? "Activity",
        repo: repo?.name ?? "",
        repoUrl: repo?.name ? `https://github.com/${repo.name}` : "",
        date: (e.created_at as string) ?? "",
      };
    })
    .filter((e) => e.repo)
    .slice(0, 5);
}

export async function getGithubData(): Promise<GithubData> {
  const [profile, contributions, topRepos, recent] = await Promise.all([
    getProfile(),
    getContributions(),
    getTopRepos(),
    getRecent(),
  ]);

  return {
    profile,
    totalContributions: contributions.total,
    weeks: contributions.weeks,
    topRepos,
    recent,
  };
}
