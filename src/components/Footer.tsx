import { footerTagline, navLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--surface-border)] bg-[var(--surface-raised)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-[var(--ink)]">{site.name}</p>
            <p className="text-sm text-[var(--ink-faint)] mt-1">{site.title}</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {navLinks.map(({ label, href }) => (
              <a key={href} href={href} className="text-sm text-[var(--ink-faint)] hover:text-[var(--accent)] transition-colors animated-underline">
                {label}
              </a>
            ))}
          </nav>
          <div className="text-center border-t border-[var(--surface-border)] pt-6 w-full">
            <p className="text-xs text-[var(--ink-faint)]">© {new Date().getFullYear()} {site.name}.</p>
            <p className="text-xs text-[var(--ink-faint)] mt-1">{footerTagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
