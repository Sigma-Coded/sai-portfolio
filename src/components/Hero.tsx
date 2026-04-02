"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { skills } from "@/lib/constants";

const fadeIn = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut", delay },
    }),
};

type HeroProps = {
    theme: "light" | "dark";
};

export default function Hero({ theme }: HeroProps) {
    const command = "npm run dev";
    const [typedLength, setTypedLength] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [skillIndex, setSkillIndex] = useState(0);
    const [skillTypedLength, setSkillTypedLength] = useState(0);

    const typedCommand = command.slice(0, typedLength);
    const currentSkill = skills[skillIndex] ?? "";
    const typedSkill = currentSkill.slice(0, skillTypedLength);

    useEffect(() => {
        setTypedLength(0);
        setIsRunning(false);
        setShowOutput(false);
        setSkillIndex(0);

        let cancelled = false;
        let timer: ReturnType<typeof setTimeout> | null = null;
        let index = 0;

        const typeCommand = () => {
            if (cancelled) return;

            if (index < command.length) {
                index += 1;
                setTypedLength(index);
                timer = setTimeout(typeCommand, 85);
                return;
            }

            timer = setTimeout(() => {
                if (cancelled) return;
                setIsRunning(true);
                timer = setTimeout(() => {
                    if (cancelled) return;
                    setIsRunning(false);
                    setShowOutput(true);
                }, 650);
            }, 280);
        };

        typeCommand();

        return () => {
            cancelled = true;
            if (timer) clearTimeout(timer);
        };
    }, [command]);

    useEffect(() => {
        if (!showOutput || skills.length === 0) return;

        let timer: ReturnType<typeof setTimeout> | null = null;
        let cancelled = false;
        let currentIndex = 0;
        let charIndex = 0;
        let phase: "typing" | "hold" | "erasing" = "typing";

        setSkillIndex(0);
        setSkillTypedLength(0);

        const stepSkill = () => {
            if (cancelled) return;

            const target = skills[currentIndex] ?? "";

            if (phase === "typing") {
                if (charIndex < target.length) {
                    charIndex += 1;
                    setSkillTypedLength(charIndex);
                    timer = setTimeout(stepSkill, 75);
                    return;
                }
                phase = "hold";
                timer = setTimeout(stepSkill, 1000);
                return;
            }

            if (phase === "hold") {
                phase = "erasing";
                timer = setTimeout(stepSkill, 45);
                return;
            }

            if (charIndex > 0) {
                charIndex -= 1;
                setSkillTypedLength(charIndex);
                timer = setTimeout(stepSkill, 45);
                return;
            }

            currentIndex = (currentIndex + 1) % skills.length;
            setSkillIndex(currentIndex);
            phase = "typing";
            timer = setTimeout(stepSkill, 180);
        };

        timer = setTimeout(stepSkill, 240);

        return () => {
            cancelled = true;
            if (timer) clearTimeout(timer);
        };
    }, [showOutput]);

    return (
        <section id="hero" className="section-shell scroll-mt-28 pb-6 pt-8 sm:pt-10 lg:pb-10 lg:pt-12">
            <div className="grid items-stretch gap-8 lg:gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-12">
                <motion.div
                    className="mx-auto h-full w-full max-w-2xl space-y-7 sm:space-y-8 xl:mx-0 xl:max-w-3xl"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    {/* <div className="flex flex-wrap items-center gap-3">
            <span className="pill">Software Developer</span>
            <span className="pill">React Native & Full Stack</span>
          </div> */}
                    <div className="space-y-4 sm:space-y-5">
                        <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
                            Hi, I&apos;m Sai Gaikwad building mobile and web apps that ship reliably.
                        </h1>
                        {/* <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                            React Native and React/Next.js developer focused on end-to-end delivery, API integrations, and leading teams. I love solving real problems with clean UX and production-ready engineering.
                        </p> */}
                    </div>



                    <div className="relative rounded-xl border border-slate-200/70 bg-slate-900/95 p-3 font-mono text-xs text-emerald-300 shadow-inner dark:border-white/10 sm:p-4">
                        <div className="flex items-center justify-between gap-3">
                            <p className="truncate">
                                {typedCommand}
                                {!showOutput && <span className="cursor-blink" />}
                            </p>
                            <button
                                type="button"
                                aria-label="Run profile command"
                                className={`rounded-md border px-2 py-1 text-[10px] font-semibold transition ${isRunning
                                    ? "border-emerald-300 bg-emerald-400 text-slate-900"
                                    : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                                    }`}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={isRunning ? "running" : "run"}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.18, ease: "easeOut" }}
                                        className="inline-block"
                                    >
                                        {isRunning ? "RUNNING" : "RUN"}
                                    </motion.span>
                                </AnimatePresence>
                            </button>
                        </div>

                        <AnimatePresence>
                            {showOutput && (
                                <motion.pre
                                    initial={{ opacity: 0, y: 10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: -8, height: 0 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="mt-3 min-h-[120px] overflow-hidden whitespace-pre-wrap rounded-lg border border-emerald-400/20 bg-black/30 p-3 leading-6 text-emerald-200 sm:mt-4 sm:min-h-[136px]"
                                >
                                    {`{
  name: "Sai Gaikwad",
  age: 22,
  email: "gaikwadsai78@gmail.com",
  skills: ["${typedSkill}${typedSkill.length < currentSkill.length ? "|" : ""}"]
}`}
                                </motion.pre>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* <div className="flex flex-wrap gap-2.5 text-sm text-slate-700 dark:text-slate-200 sm:gap-3">
                        <span className="rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 font-semibold backdrop-blur dark:border-white/10 dark:bg-white/5">
                            +91 8956223337
                        </span>
                        <a
                            href="mailto:gaikwadsai78@gmail.com"
                            className="rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 font-semibold text-emerald-500 backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 dark:border-white/10 dark:bg-white/5"
                        >
                            gaikwadsai78@gmail.com
                        </a>
                        <a
                            href="https://linkedin.com/in/sai-gaikwad-855404243"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 font-semibold text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/Sai-gaikwad-11"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 font-semibold text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                        >
                            GitHub
                        </a>
                    </div> */}

                    {/* <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                        {["Performance first", "Design + engineering", "Ship with intention"].map(
                            (item, idx) => (
                                <motion.div
                                    key={item}
                                    variants={fadeIn}
                                    custom={0.1 * (idx + 1)}
                                    className="glass rounded-2xl border border-slate-200/70 p-4 text-sm shadow-md dark:border-white/10"
                                >
                                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
                                        0{idx + 1}
                                    </p>
                                    <p className="mt-2 text-sm font-semibold">{item}</p>
                                </motion.div>
                            )
                        )}
                    </div> */}
                </motion.div>

                <motion.div
                    className="relative mx-auto h-full w-full max-w-2xl xl:max-w-none"
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
                    <div className="absolute -bottom-12 -right-10 h-36 w-36 rounded-full bg-purple-500/20 blur-3xl" />

                    <div className="terminal-card relative h-full overflow-hidden border border-slate-200/70 dark:border-white/10">
                        <div className="terminal-bar">
                            <span className="terminal-dot bg-rose-500" />
                            <span className="terminal-dot bg-amber-400" />
                            <span className="terminal-dot bg-emerald-400" />
                            <span className="ml-auto text-xs font-semibold text-slate-500 dark:text-slate-300">
                                portfolio.tsx
                            </span>
                        </div>

                        <div className="relative grid gap-5 p-4 sm:gap-6 sm:p-5 lg:gap-7 lg:p-6">
                            <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-start">
                                <div className="space-y-4 text-sm text-slate-800 dark:text-slate-200">
                                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
                                        /about-me
                                    </p>
                                    {/* <p className="max-w-prose leading-relaxed">
                                        Hi, I&apos;m Sai Gaikwad building mobile and web apps that ship reliably.
                        </p> */}
                                    <p className="max-w-prose leading-relaxed">
                                        Mobile-first builds in React Native and full-stack delivery with React/Next.js, REST APIs , GraphQl API's, and Firebase.
                                    </p>
                                    <p className="max-w-prose leading-relaxed">
                                        React Native and React/Next.js developer focused on end-to-end delivery, API integrations, and leading teams. I love solving real problems with clean UX and production-ready engineering.
                                    </p>
                                    {/* <div className="space-y-4 sm:space-y-5">
                        <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
                            Hi, I&apos;m Sai Gaikwad building mobile and web apps that ship reliably.
                        </h1>
                        <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                            React Native and React/Next.js developer focused on end-to-end delivery, API integrations, and leading teams. I love solving real problems with clean UX and production-ready engineering.
                        </p>
                    </div> */}
                                </div>

                                <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-none md:justify-self-end">
                                    <div className="absolute inset-6 rounded-3xl bg-gradient-to-br from-white/40 to-emerald-200/30 blur-2xl dark:from-emerald-500/10 dark:to-purple-500/10" />
                                    <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                                        <Image
                                            src="/assets/image/saiGaikwad.jpeg"
                                            alt="Sai Gaikwad avatar"
                                            width={320}
                                            height={220}
                                            className="mx-auto w-full max-w-[280px] animate-pulseSoft sm:max-w-[320px]"
                                            priority
                                        />
                                        <p className="mt-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                                            Let's Code & Grow Together.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                <a
                                    href="#projects"
                                    className="rounded-full bg-gradient-to-r from-cyan-400 via-emerald-300 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:brightness-105"
                                >
                                    View Projects
                                </a>
                                <a
                                    href="#contact"
                                    className="rounded-full border border-slate-300/60 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-400 dark:border-white/10 dark:text-slate-100"
                                >
                                    Contact Me
                                </a>
                                {/* <span className="text-sm text-slate-500 dark:text-slate-400">
              {theme === "dark" ? "Dark mode with a black-hole canvas" : "Light mode with a code grid background"}
            </span> */}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
