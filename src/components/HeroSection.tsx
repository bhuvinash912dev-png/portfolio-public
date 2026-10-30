"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { site, stats, type ProjectImage } from "@/data/site";
import { Avatar } from "./Avatar";

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = site.roles[index];
    if (!deleting && length === word.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % site.roles.length);
      return;
    }
    const t = setTimeout(() => setLength((l) => l + (deleting ? -1 : 1)), deleting ? 50 : 80);
    return () => clearTimeout(t);
  }, [length, deleting, index]);

  return (
    <span className="text-[var(--accent)] font-mono">
      {site.roles[index].substring(0, length)}
      <span className="cursor-blink ml-0.5">|</span>
    </span>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export function HeroSection({ photo }: { photo?: ProjectImage | null }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-24 pb-16" aria-label="Hero">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-400/5 blur-[160px]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface-raised)] text-xs font-mono text-[var(--ink-muted)]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-[var(--ink)]">
              {site.firstName}
              <br />
              <span className="gradient-text">{site.lastName}</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-xl md:text-2xl font-body font-light text-[var(--ink-muted)] min-h-[2rem]">
              <Typewriter />
            </motion.p>
            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="text-base text-[var(--ink-muted)] max-w-xl leading-relaxed">
              {site.tagline}
            </motion.p>
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-3 pt-2">
              <a href="#projects" className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5">
                View Projects
              </a>
              <a href="#about" className="px-6 py-3 rounded-xl border border-[var(--surface-border)] text-[var(--ink-muted)] text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200">
                About Me
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full p-[3px] profile-ring" style={{ margin: -4 }}>
                <div className="w-full h-full rounded-full bg-[var(--surface)]" />
              </div>
              <div className="absolute inset-0 rounded-full glow-accent opacity-40" />
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[var(--surface)] shadow-2xl animate-float">
                <Avatar photo={photo} textClassName="text-6xl md:text-7xl" />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-2 -right-4 glass px-3 py-1.5 rounded-lg text-xs font-mono text-[var(--ink-muted)] shadow-lg"
              >
                <span className="text-green-400">●</span> Shipping daily
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {stats.map((s) => (
            <article key={s.label} className="bento-card glass rounded-2xl p-3 sm:p-5 text-center hover:-translate-y-1 transition-transform">
              <div className="text-2xl mb-2">{s.icon}</div>
              {/* Zero-width space after "·" lets values like "AWS·GCP·Azure" wrap on narrow screens. */}
              <div className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)]">{s.value.replace(/·/g, "·​")}</div>
              <div className="text-xs text-[var(--ink-faint)] mt-1 font-mono">{s.label}</div>
            </article>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex justify-center mt-12">
          <a href="#about" className="flex flex-col items-center gap-2 text-[var(--ink-faint)] hover:text-[var(--accent)] transition-colors">
            <span className="text-xs font-mono">scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center pt-1.5">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="w-1 h-2 rounded-full bg-current" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
