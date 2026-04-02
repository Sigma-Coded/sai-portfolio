"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      aria-label="Toggle color theme"
      className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
    >
      {isDark ? (
        <Moon className="h-4 w-4" aria-hidden />
      ) : (
        <Sun className="h-4 w-4" aria-hidden />
      )}
      {/* <span className="font-mono text-xs uppercase tracking-[0.2em]">
        {isDark ? "Dark" : "Light"}
      </span> */}
    </motion.button>
  );
}
