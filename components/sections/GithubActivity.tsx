import { getGithubData, GITHUB_USERNAME } from "@/lib/github";
import GithubActivityClient from "./GithubActivityClient";

/**
 * Server component: fetches GitHub data at build time and revalidates daily
 * (ISR). If nothing loads (e.g. all sources are down), the section is omitted
 * entirely so the page never shows a broken widget.
 */
export default async function GithubActivity() {
  const data = await getGithubData();

  const hasContent =
    data.totalContributions !== null ||
    data.profile !== null ||
    data.topRepos.length > 0;

  if (!hasContent) return null;

  return <GithubActivityClient data={data} username={GITHUB_USERNAME} />;
}
