"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BookMarked,
  GitFork,
  Github,
  Star,
  UserPlus,
  Users,
} from "lucide-react";
import type { GithubData } from "@/lib/github";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/ui/CountUp";

const LEVEL_COLORS = [
  "rgba(255,255,255,0.05)",
  "rgba(59,130,246,0.35)",
  "rgba(59,130,246,0.6)",
  "rgba(124,92,246,0.8)",
  "#8b5cf6",
];

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Python: "#3572A5",
  Vue: "#41b883",
  Shell: "#89e051",
};

function relativeTime(iso: string): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function GithubActivityClient({
  data,
  username,
}: {
  data: GithubData;
  username: string;
}) {
  const { profile, totalContributions, weeks, topRepos, recent } = data;
  const profileUrl = profile?.htmlUrl ?? `https://github.com/${username}`;

  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow="GitHub"
          title="My coding activity"
          description="A live look at what I've been building on GitHub."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex flex-col gap-6"
        >
          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatTile
              icon={Activity}
              label="Contributions"
              value={totalContributions}
              hint="last year"
            />
            <StatTile
              icon={BookMarked}
              label="Public Repos"
              value={profile?.publicRepos ?? null}
            />
            <StatTile
              icon={Users}
              label="Followers"
              value={profile?.followers ?? null}
            />
            <StatTile
              icon={UserPlus}
              label="Following"
              value={profile?.following ?? null}
            />
          </div>

          {/* Contribution heatmap */}
          {weeks.length > 0 && (
            <motion.div
              variants={fadeUp}
              className="glass-card flex flex-col gap-4 rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Github size={16} className="text-primary" />
                  {totalContributions !== null
                    ? `${totalContributions} contributions in the last year`
                    : "Contribution graph"}
                </h3>
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white"
                >
                  @{username} <ArrowUpRight size={12} />
                </a>
              </div>

              <div className="overflow-x-auto pb-1">
                <div className="flex min-w-fit gap-[3px]">
                  {weeks.map((week, wi) => {
                    // Align each column to weekday rows (0=Sun … 6=Sat)
                    const cells = Array<(typeof week)[number] | null>(7).fill(
                      null
                    );
                    week.forEach((day) => {
                      cells[new Date(day.date).getUTCDay()] = day;
                    });
                    return (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {cells.map((day, di) => (
                          <motion.span
                            key={di}
                            initial={{ opacity: 0, scale: 0.4 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: Math.min(wi * 0.006, 0.6) }}
                            title={
                              day
                                ? `${day.count} contributions on ${day.date}`
                                : undefined
                            }
                            className="h-[11px] w-[11px] rounded-[3px]"
                            style={{
                              backgroundColor: day
                                ? LEVEL_COLORS[day.level]
                                : "transparent",
                              boxShadow:
                                day && day.level >= 4
                                  ? "0 0 8px -1px rgba(139,92,246,0.7)"
                                  : undefined,
                            }}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 text-[11px] text-white/40">
                <span>Less</span>
                {LEVEL_COLORS.map((c, i) => (
                  <span
                    key={i}
                    className="h-[11px] w-[11px] rounded-[3px]"
                    style={{ backgroundColor: c }}
                  />
                ))}
                <span>More</span>
              </div>
            </motion.div>
          )}

          {/* Top repos + recent activity */}
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {topRepos.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="glass-card flex flex-col gap-4 rounded-2xl p-6"
              >
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Star size={16} className="text-primary" /> Top Repositories
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {topRepos.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-medium text-white group-hover:text-primary">
                          {repo.name}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="shrink-0 text-white/30 transition-colors group-hover:text-primary"
                        />
                      </div>
                      {repo.description && (
                        <p className="line-clamp-2 text-xs leading-relaxed text-white/50">
                          {repo.description}
                        </p>
                      )}
                      <div className="mt-auto flex items-center gap-4 text-xs text-white/45">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  LANGUAGE_COLORS[repo.language] ?? "#8b949e",
                              }}
                            />
                            {repo.language}
                          </span>
                        )}
                        {repo.stars > 0 && (
                          <span className="flex items-center gap-1">
                            <Star size={12} /> {repo.stars}
                          </span>
                        )}
                        {repo.forks > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork size={12} /> {repo.forks}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {recent.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="glass-card flex flex-col gap-4 rounded-2xl p-6"
              >
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Activity size={16} className="text-secondary" /> Recent
                  Activity
                </h3>
                <ul className="flex flex-col gap-3">
                  {recent.map((event, i) => (
                    <li key={i}>
                      <a
                        href={event.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 text-sm"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary" />
                        <span className="flex-1">
                          <span className="text-white/70 group-hover:text-white">
                            {event.type}
                          </span>{" "}
                          <span className="text-white/45">
                            → {event.repo}
                          </span>
                          <span className="mt-0.5 block text-xs text-white/30">
                            {relativeTime(event.date)}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/20 hover:text-white"
            >
              <Github size={16} /> View full profile on GitHub
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Activity;
  label: string;
  value: number | null;
  hint?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="glass-card flex flex-col items-center gap-1.5 rounded-2xl px-3 py-5 text-center transition-shadow hover:shadow-glow"
    >
      <Icon size={18} className="text-primary" />
      <span className="text-2xl font-bold text-white sm:text-3xl">
        {value !== null ? <CountUp to={value} /> : "—"}
      </span>
      <span className="text-xs text-white/50">{label}</span>
      {hint && <span className="text-[10px] text-white/30">{hint}</span>}
    </motion.div>
  );
}
