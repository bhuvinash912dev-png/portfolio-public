"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { about, education, experience, focusAreas, site } from "@/data/site";

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const show = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay },
  });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...show()} className="mb-16">
          <p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-3">01 — About</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)]">
            Building software at the intersection of<span className="gradient-text"> code &amp; intelligence</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">
          <div className="space-y-6">
            <motion.p {...show(0.1)} className="text-[var(--ink-muted)] text-lg leading-relaxed">
              I&apos;m <strong className="text-[var(--ink)] font-semibold">{site.name}</strong>, {about.intro}
            </motion.p>
            <motion.p {...show(0.2)} className="text-[var(--ink-muted)] leading-relaxed">
              {about.body}
            </motion.p>
            <motion.p {...show(0.3)} className="text-[var(--ink-muted)] leading-relaxed">
              {about.focus}
            </motion.p>
            <motion.div {...show(0.4)} className="grid sm:grid-cols-2 gap-3 pt-4">
              {focusAreas.map((f) => (
                <article key={f.area} className="bento-card glass rounded-xl p-4 relative z-10">
                  <h3 className="text-sm font-semibold text-[var(--ink)] mb-1">{f.area}</h3>
                  <p className="text-xs text-[var(--ink-faint)] font-mono leading-relaxed">{f.desc}</p>
                </article>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-mono text-[var(--ink-faint)] uppercase tracking-widest mb-6">Experience</h3>
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--surface-border)] to-transparent" />
              <div className="space-y-8">
                {experience.map((e, i) => (
                  <motion.div
                    key={e.year}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + 0.1 * i }}
                    className="pl-8 relative"
                  >
                    <div
                      className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        i === 0 ? "border-[var(--accent)] bg-[var(--accent-muted)]" : "border-[var(--surface-border)] bg-[var(--surface)]"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[var(--accent)]" : "bg-[var(--surface-border)]"}`} />
                    </div>
                    <p className="font-mono text-xs text-[var(--accent)] mb-0.5">{e.year}</p>
                    <p className="font-semibold text-[var(--ink)] text-sm">{e.role}</p>
                    <p className="text-xs text-[var(--ink-muted)]">{e.org}</p>
                    <ul className="mt-1.5 space-y-1">
                      {e.highlights.map((h) => (
                        <li key={h} className="text-xs text-[var(--ink-faint)] leading-relaxed pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-[var(--accent)]">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 glass rounded-xl p-4 flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[var(--accent-muted)] text-[var(--accent)]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <p className="font-mono text-xs text-[var(--accent)] mb-0.5">{education.year}</p>
                <p className="font-semibold text-[var(--ink)] text-sm">{education.degree}</p>
                <p className="text-xs text-[var(--ink-muted)]">{education.school}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
