"use client";

import { projects } from "@/lib/constants";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="section-shell scroll-mt-28 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
            Projects
          </p>
          <h2 className="text-3xl font-semibold">Terminal-inspired builds</h2>
        </div>
        {/* <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
          Interfaces shaped like terminals, tuned for responsiveness, clarity, and subtle motion cues.
        </p> */}
      </div>

      <div className="mt-8 space-y-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
