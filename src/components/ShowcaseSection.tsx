"use client";

import { Fragment, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { showcase, showcaseCode, showcaseFeatures, showcaseSteps } from "@/data/site";

const KEYWORDS = new Set(["async", "def", "if", "return"]);

// Minimal Python highlighter: comments, strings, keywords and `await`.
function highlight(line: string) {
  const commentAt = line.indexOf("#");
  const code = commentAt >= 0 ? line.slice(0, commentAt) : line;
  const comment = commentAt >= 0 ? line.slice(commentAt) : "";
  const parts = code.split(/("[^"]*"|\b\w+\b)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('"')) return <span key={i} style={{ color: "#86efac" }}>{part}</span>;
        if (part === "await") return <span key={i} style={{ color: "#c4b5fd" }}>{part}</span>;
        if (KEYWORDS.has(part)) return <span key={i} style={{ color: "#93c5fd" }}>{part}</span>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
      {comment && <span style={{ color: "var(--ink-faint)", opacity: 0.7 }}>{comment}</span>}
    </>
  );
}

export function ShowcaseSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="showcase" ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-[var(--surface-raised)]">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-4">
          <p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-3">{showcase.label}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)]">
            {showcase.title}<span className="gradient-text">{showcase.titleAccent}</span>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[var(--ink-muted)] text-lg max-w-3xl mb-12 leading-relaxed"
        >
          {showcase.intro}
        </motion.p>

        <div className="mb-12">
          <h3 className="font-mono text-xs text-[var(--ink-faint)] uppercase tracking-widest mb-6">System Architecture Flow</h3>
          <div className="space-y-3">
            {showcaseSteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                onClick={() => setActiveStep(i === activeStep ? -1 : i)}
                className={`bento-card rounded-2xl border cursor-pointer transition-all duration-300 relative z-10 ${
                  activeStep === i
                    ? "border-[var(--accent)] bg-[var(--accent-muted)]"
                    : "border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent)]/40"
                }`}
              >
                <div className="p-5 flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${step.color}20` }}>
                      {step.icon}
                    </div>
                    {i < showcaseSteps.length - 1 && <div className="w-px h-4 bg-[var(--surface-border)]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-[var(--ink-faint)]">{step.id}</span>
                      <h3 className="font-semibold text-[var(--ink)] text-sm">{step.title}</h3>
                    </div>
                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{step.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {step.tech.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-md font-mono" style={{ background: `${step.color}15`, color: step.color }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`flex-shrink-0 text-[var(--ink-faint)] transition-transform ${activeStep === i ? "rotate-180" : ""}`}>↓</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-2xl overflow-hidden border border-[var(--surface-border)]"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--surface-border)] bg-[var(--surface-raised)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="font-mono text-xs text-[var(--ink-faint)]">chat_api.py</span>
            <span className="font-mono text-xs text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-muted)]">Python</span>
          </div>
          <div className="overflow-x-auto">
            <pre className="code-block p-5 text-[var(--ink-muted)] leading-6 whitespace-pre">
              <code>
                {showcaseCode.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none text-[var(--ink-faint)] opacity-40 w-8 text-right mr-4 flex-shrink-0 text-xs">{i + 1}</span>
                    <span>{highlight(line)}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 grid sm:grid-cols-3 gap-4"
        >
          {showcaseFeatures.map((f) => (
            <article key={f.title} className="glass rounded-xl p-4">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h4 className="font-semibold text-sm text-[var(--ink)] mb-1">{f.title}</h4>
              <p className="text-xs text-[var(--ink-faint)] leading-relaxed">{f.desc}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
