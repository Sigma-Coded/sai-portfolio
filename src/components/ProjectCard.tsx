"use client";

import { ExternalLink, Github } from "lucide-react";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import type { Project } from "@/lib/constants";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <article className="terminal-card flex flex-col overflow-hidden border border-slate-200/70 p-4 sm:p-5 lg:p-6 dark:border-white/10">
      <div className="terminal-bar -mx-4 -mt-4 mb-5 sm:-mx-5 sm:-mt-5 lg:-mx-6 lg:-mt-6">
        {/* <span className="terminal-dot bg-rose-500" />
        <span className="terminal-dot bg-amber-400" />
        <span className="terminal-dot bg-emerald-400" /> */}
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-200">
          {project.title.toLowerCase().replaceAll(" ", "-")}
        </span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-white/5"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-sm font-semibold">
          {/* <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-emerald-500 transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-emerald-500/15 hover:text-emerald-400"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a> */}

          {project.playStore ? (
            <a
              href={project.playStore}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-emerald-400"
            >
              <SiGoogleplay className="h-4 w-4" />
              Play Store
            </a>
          ) : null}

          {project.appStore ? (
            <a
              href={project.appStore}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-cyan-400"
            >
              <SiAppstore className="h-4 w-4" />
              App Store
            </a>
          ) : null}

          {!project.playStore && !project.appStore ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-600 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-500/15 hover:text-cyan-500 dark:text-cyan-400"
            >
              <ExternalLink className="h-4 w-4" />
              Live Site
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
