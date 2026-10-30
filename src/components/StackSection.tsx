"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";
import { certifications, stack } from "@/data/site";

export function StackSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" ref={ref} className="py-24 md:py-32 relative bg-[var(--surface-raised)]">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-3">02 — Tech Stack</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)]">Tools of the trade</h2>
          <p className="text-[var(--ink-muted)] mt-3 max-w-xl mx-auto">
            A curated selection of technologies I use to build reliable, scalable systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((group, i) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="bento-card glass rounded-2xl p-6 relative z-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: `${group.color}20` }}>
                  {group.icon}
                </span>
                <h3 className="font-semibold text-[var(--ink)] text-sm">{group.title}</h3>
              </div>
              <div className="h-px w-full mb-4 opacity-40" style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }} />
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="skill-badge text-xs px-2.5 py-1 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--ink-muted)] font-mono">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 glass rounded-2xl p-6 md:p-8"
        >
          <h3 className="font-mono text-xs text-[var(--ink-faint)] uppercase tracking-widest mb-6">Certifications</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {certifications.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + 0.06 * i }}
                className="flex items-start gap-3 p-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)]"
              >
                <Award className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--accent)]" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--ink)] leading-snug">{c.name}</p>
                  <p className="text-xs font-mono text-[var(--ink-faint)] mt-0.5">
                    {c.issuer}
                    {c.year && ` · ${c.year}`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
