"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, Loader2, Phone, Mail } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type SubmissionStatus = "idle" | "loading" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", website: "" });
  const [startedAt, setStartedAt] = useState<number>(Date.now());
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const disableSubmit = useMemo(
    () => !form.name.trim() || !form.email.trim() || !form.message.trim() || status === "loading",
    [form, status]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (disableSubmit) {
      setErrorMessage("Please fill out every field.");
      setStatus("error");
      return;
    }

    const emailValid = /.+@.+\..+/.test(form.email);
    if (!emailValid) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          website: form.website,
          submittedAt: startedAt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "", website: "" });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", message: "", website: "" });
    setStartedAt(Date.now());
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id="contact" className="section-shell scroll-mt-28 py-12 sm:py-16">
      <motion.div
        className="mx-auto max-w-2xl space-y-8 rounded-3xl border border-slate-200/70 bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/70"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        {/* Header */}
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-slate-50">
            Let&apos;s build together
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Have a project in mind or want to collaborate? Send me a message and I'll get back to you within 24-48 hours.
          </p>
        </div>

        {/* Success / Form Stage */}
        <AnimatePresence mode="wait" initial={false}>
          {status === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 rounded-2xl border border-emerald-300/70 bg-emerald-50/50 p-4 sm:p-6 dark:border-emerald-400/20 dark:bg-emerald-950/30"
            >
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">
                    Thank you for your message! 🎉
                  </h3>
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">
                    I've received your submission and sent a confirmation to your email. I'll review your message and get back to you shortly.
                  </p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="w-full rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-500/30 dark:text-emerald-200 dark:hover:bg-emerald-500/40"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              {status === "error" && (
                <div className="flex items-start gap-3 rounded-2xl border border-rose-300/70 bg-rose-50/50 p-4 sm:p-6 dark:border-rose-400/20 dark:bg-rose-950/30">
                  <AlertCircle className="h-6 w-6 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-semibold text-rose-900 dark:text-rose-100">
                      Oops! Something went wrong
                    </h3>
                    <p className="text-sm text-rose-800 dark:text-rose-200">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Honeypot field for bots; hidden from real users */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    disabled={status === "loading"}
                    className="w-full rounded-lg border border-slate-200/70 bg-white/50 px-4 py-2.5 text-slate-900 placeholder-slate-500 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 disabled:opacity-50 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-50 dark:placeholder-slate-400 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    disabled={status === "loading"}
                    className="w-full rounded-lg border border-slate-200/70 bg-white/50 px-4 py-2.5 text-slate-900 placeholder-slate-500 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 disabled:opacity-50 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-50 dark:placeholder-slate-400 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  rows={5}
                  placeholder="Tell me about your project, idea, or collaboration opportunity..."
                  disabled={status === "loading"}
                  className="w-full rounded-lg border border-slate-200/70 bg-white/50 px-4 py-2.5 text-slate-900 placeholder-slate-500 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 disabled:opacity-50 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-50 dark:placeholder-slate-400 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={disableSubmit}
                className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 px-6 sm:px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:brightness-100"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                I'll respond to your message within 24-48 hours. All information is kept confidential.
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Contact Info */}
        <div className="space-y-3 border-t border-slate-200/50 pt-6 dark:border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Other Ways to Connect
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="tel:+918956223337"
              className="rounded-lg border border-slate-200/70 bg-white/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-emerald-400/50 dark:hover:text-emerald-400"
            >
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +91 8956223337
              </span>
            </a>
            <a
              href="mailto:gaikwadsai78@gmail.com"
              className="rounded-lg border border-slate-200/70 bg-white/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-emerald-400/50 dark:hover:text-emerald-400"
            >
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                gaikwadsai78@gmail.com
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
