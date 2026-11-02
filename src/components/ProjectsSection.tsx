"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Project, ProjectImage } from "@/data/site";
import { sanityLoader } from "@/sanity/image";

function wrap(i: number, n: number) {
  return (i + n) % n;
}

function NavButton({ dir, onClick, className = "" }: { dir: "prev" | "next"; onClick: () => void; className?: string }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous image" : "Next image"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 -translate-y-1/2 ${dir === "prev" ? "left-3" : "right-3"} w-9 h-9 rounded-full glass bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-all ${className}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

function Placeholder({ title }: { title: string }) {
  const initials = title.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+|(?=[A-Z])/).slice(0, 2).map((w) => w[0]).join("");
  return (
    <div className="absolute inset-0 grid-bg flex items-center justify-center bg-gradient-to-br from-[var(--accent-muted)] via-transparent to-purple-500/10">
      <span className="font-display text-5xl font-black gradient-text">{initials}</span>
    </div>
  );
}

function CardGallery({ project, onOpen }: { project: Project; onOpen: (index: number) => void }) {
  const images = project.images ?? [];
  const [index, setIndex] = useState(0);
  const current = images[index];

  return (
    <div
      className={`group/gallery relative aspect-[6/5] md:aspect-[4/3] lg:aspect-[5/4] overflow-hidden bg-[var(--surface)] border-b border-[var(--surface-border)] ${images.length ? "cursor-zoom-in" : ""}`}
      onClick={() => images.length && onOpen(index)}
    >
      {current ? (
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              loader={sanityLoader}
              src={current.url}
              alt={current.alt || `${project.title} screenshot ${index + 1}`}
              fill
              sizes="(min-width: 1152px) 368px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              placeholder={current.lqip ? "blur" : "empty"}
              blurDataURL={current.lqip}
              className="object-cover object-top transition-transform duration-500 group-hover/gallery:scale-[1.03]"
              style={{ objectPosition: current.position }}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <Placeholder title={project.title} />
      )}

      {images.length > 0 && (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 text-white text-xs font-mono backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 transition-opacity">
          <Expand className="w-3 h-3" />
          {images.length > 1 ? `${index + 1} / ${images.length}` : "View"}
        </div>
      )}

      {images.length > 1 && (
        <>
          <NavButton dir="prev" onClick={() => setIndex((i) => wrap(i - 1, images.length))} className="md:opacity-0 md:group-hover/gallery:opacity-100" />
          <NavButton dir="next" onClick={() => setIndex((i) => wrap(i + 1, images.length))} className="md:opacity-0 md:group-hover/gallery:opacity-100" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show image ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Lightbox({ project, start, onClose }: { project: Project; start: number; onClose: () => void }) {
  const images = project.images ?? [];
  const [index, setIndex] = useState(start);
  const go = useCallback((step: number) => setIndex((i) => wrap(i + step, images.length)), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  const current: ProjectImage | undefined = images[index];
  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
    >
      <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-4 text-white" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="font-display text-lg font-bold truncate">
            {project.title} <span className="text-xs font-mono font-normal text-white/60">{index + 1} / {images.length}</span>
          </p>
          {/* Cards clamp the description, so the full text lives here. */}
          {project.description && <p className="text-sm text-white/70 max-w-3xl line-clamp-3 md:line-clamp-none">{project.description}</p>}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Live site <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          <button type="button" onClick={onClose} aria-label="Close gallery" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-0 mx-4 md:mx-16" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div key={index} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0">
            <Image
              loader={sanityLoader}
              src={current.url}
              alt={current.alt || `${project.title} screenshot ${index + 1}`}
              fill
              sizes="100vw"
              placeholder={current.lqip ? "blur" : "empty"}
              blurDataURL={current.lqip}
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <NavButton dir="prev" onClick={() => go(-1)} className="md:-left-12" />
            <NavButton dir="next" onClick={() => go(1)} className="md:-right-12" />
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 px-4 py-4 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`relative w-20 h-12 md:w-24 md:h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                i === index ? "border-[var(--accent)] opacity-100" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image loader={sanityLoader} src={img.url} alt="" fill sizes="96px" className="object-cover" style={{ objectPosition: img.position }} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<{ project: Project; index: number } | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-3">03 — Projects</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)]">Things I&apos;ve built</h2>
          <p className="text-[var(--ink-muted)] mt-3 max-w-xl">Open-source tools, AI experiments, and production systems.</p>
        </motion.div>

        {projects.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center text-[var(--ink-muted)] font-mono text-sm">
            New projects are on the way — check back soon.
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className={`group rounded-2xl overflow-hidden flex flex-col border bg-[var(--surface-raised)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 ${
                p.featured ? "border-[var(--accent)]" : "border-[var(--surface-border)] hover:border-[var(--accent)]/40"
              }`}
            >
              <CardGallery project={p} onOpen={(index) => setOpen({ project: p, index })} />

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display text-lg md:text-xl font-bold text-[var(--ink)] line-clamp-1" title={p.title}>{p.title}</h3>
                  {p.featured && (
                    <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-[var(--accent)] text-white text-xs font-mono">Featured</span>
                  )}
                </div>

                {/* Clamped so the image stays at least half the card; the lightbox shows it in full. */}
                {p.description && (
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed line-clamp-2" title={p.description}>
                    {p.description}
                  </p>
                )}

                {p.tags && p.tags.length > 0 && (
                  // Show the first 3 tags in a single row plus a "+N" count.
                  <div className="flex flex-wrap gap-1.5 mt-4 max-h-6 overflow-hidden">
                    {p.tags.map((t, ti) => (
                      <span
                        key={t}
                        className={`text-xs px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--ink-faint)] font-mono ${ti >= 3 ? "hidden" : ""}`}
                      >
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-md text-[var(--ink-faint)] font-mono">+{p.tags.length - 3}</span>
                    )}
                  </div>
                )}

                {p.liveUrl && (
                  <div className="mt-auto pt-5">
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                    >
                      Live site
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <Lightbox project={open.project} start={open.index} onClose={close} />}</AnimatePresence>
    </section>
  );
}
