"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Linkedin, Github } from "lucide-react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const LazyBackground = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

export default function Home() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [navOpen, setNavOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  return (
    <main className="relative">
      <div id="top" className="absolute top-0" />
      <LazyBackground theme={theme} />

      <div className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/50 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
        <header className="section-shell flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            {/* <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-purple-500 shadow-lg shadow-emerald-500/30" /> */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400">
                Portfolio
              </p>
              <p className="text-sm font-semibold">Sai Gaikwad</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex dark:text-slate-200">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-emerald-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/70 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-400 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 md:hidden"
              onClick={() => setNavOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {navOpen ? (
            <motion.nav
              key="mobile-nav"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="section-shell mb-3 flex flex-col gap-2 rounded-2xl border border-slate-200/60 bg-white/90 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/80 md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-emerald-50 hover:text-emerald-500 dark:text-slate-100 dark:hover:bg-white/5 dark:hover:text-emerald-300"
                  onClick={() => setNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="h-20" aria-hidden />

      <div className="flex flex-col gap-12 pb-20">
        <Hero theme={theme} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>

      <motion.footer
        className="section-shell border-t border-white/5 py-8 text-sm text-slate-500 dark:text-slate-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2.5 text-sm text-slate-700 dark:text-slate-200 sm:gap-3">
            {/* <a
              href="tel:+918956223337"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 dark:border-white/10 dark:bg-white/5"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-400" />
              +91 8956223337
            </a> */}
            <a
              href="mailto:gaikwadsai78@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 font-semibold text-emerald-500 backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 dark:border-white/10 dark:bg-white/5"
            >
              <Mail className="h-3.5 w-3.5" />
              {/* gaikwadsai78@gmail.com */}
            </a>
            <a
              href="https://linkedin.com/in/sai-gaikwad-855404243"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 font-semibold text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/Sai-gaikwad-11"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 font-semibold text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>Built with Next.js, Tailwind, Framer Motion, and Three.js and lot's of love.</span>
            <a
              href="#top"
              className="rounded-full border border-slate-200/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-400 dark:border-white/10 dark:text-slate-200"
            >
              Back to top
            </a>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
