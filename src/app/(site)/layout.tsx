import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} - ${site.title}`,
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} - ${site.title}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "profile",
    ...(site.photo ? { images: [{ url: site.photo, alt: `${site.name} — ${site.title}` }] } : {}),
  },
  twitter: {
    card: site.photo ? "summary_large_image" : "summary",
    title: `${site.name} - ${site.title}`,
    description: site.description,
    ...(site.photo ? { images: [site.photo] } : {}),
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
