"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="section-shell scroll-mt-28 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
            Skills
          </p>
          <h2 className="text-3xl font-semibold">Tooling I reach for</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
          Practical stack grouped by domain so recruiters and clients can quickly scan frontend, backend, infra, and AI capabilities.
        </p>
      </div>

      <motion.div
        className="mt-6 grid gap-4 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            variants={fadeUp}
            custom={idx * 0.03}
            className="glass rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-emerald-300/60 dark:border-white/10 dark:bg-white/5"
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-emerald-500">
              {category.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
