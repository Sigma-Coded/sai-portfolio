"use client";

import { motion } from "framer-motion";
import { education, experiences } from "@/lib/constants";
import { Briefcase, GraduationCap } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <section id="about" className="section-shell scroll-mt-28 py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="space-y-12"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="space-y-4 rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white/60 to-white/40 p-5 transition-all duration-300 hover:border-emerald-400/30 hover:shadow-lg dark:border-white/10 dark:from-slate-900/50 dark:to-slate-800/30 dark:hover:border-emerald-400/20">
                              {/* className="group relative rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white/60 to-white/40 p-5 transition-all duration-300 hover:border-emerald-400/30 hover:shadow-lg dark:border-white/10 dark:from-slate-900/50 dark:to-slate-800/30 dark:hover:border-emerald-400/20" */}

          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded bg-gradient-to-r from-emerald-400 to-cyan-400" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
              About
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">
            Building reliable mobile & web products
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Hi, I&apos;m Sai Gaikwad, a passionate developer specializing in building high-quality mobile and web applications. I enjoy solving real-world problems through technology and love learning and growing every day.
          </p>
        </motion.div>

        {/* Core Competencies */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-emerald-400">
            Core Competencies
          </h3>
          <div className="grid gap-2 sm:grid-cols-3">
            {["React Native & Next.js", "REST & GraphQL APIs ", "Leadership & Agile"].map(
              (item) => (
                <div
                  key={item}
                  className="group rounded-xl border border-emerald-400/20 bg-gradient-to-br from-emerald-50/50 to-cyan-50/30 px-4 py-3 text-sm font-semibold text-emerald-900 transition-all duration-300 hover:border-emerald-400/50 hover:shadow-lg dark:from-emerald-950/30 dark:to-cyan-950/20 dark:text-emerald-200 dark:hover:border-emerald-400/40"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Experience Section */}
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10">
                <Briefcase className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  Experience
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {experiences.length} roles • {Math.round((new Date().getTime() - new Date("2022-10-01").getTime()) / (1000 * 60 * 60 * 24 * 365.25))}+ years
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <motion.article
                  key={`${exp.company}-${exp.role}`}
                  variants={itemVariants}
                  className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white/70 to-white/50 p-5 transition-all duration-300 hover:border-emerald-400/35 hover:shadow-lg dark:border-white/10 dark:from-slate-900/60 dark:to-slate-800/40 dark:hover:border-emerald-400/25"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-300">
                      {exp.period}
                    </span>
                    {idx === 0 ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                        Current
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-900 dark:text-slate-50">
                      {exp.role}
                    </p>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {exp.company}
                    </p>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {exp.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10">
                <GraduationCap className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  Education
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {education.length} degrees
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <motion.article
                  key={`${edu.school}-${edu.program}`}
                  variants={itemVariants}
                  className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white/70 to-white/50 p-5 transition-all duration-300 hover:border-cyan-400/35 hover:shadow-lg dark:border-white/10 dark:from-slate-900/60 dark:to-slate-800/40 dark:hover:border-cyan-400/25"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-300">
                      {edu.period}
                    </span>
                    {edu.period.toLowerCase().includes("present") ? (
                      <span className="inline-flex items-center rounded-full bg-cyan-400/10 px-2 py-0.5 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-300">
                        In Progress
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-900 dark:text-slate-50">
                      {edu.program}
                    </p>
                    <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                      {edu.school}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
