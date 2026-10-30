import Image from "next/image";
import { site, type ProjectImage } from "@/data/site";
import { sanityLoader } from "@/sanity/image";

type Props = { photo?: ProjectImage | null; size?: number; className?: string; textClassName?: string };

// Shows the Studio profile photo, then site.photo, otherwise the initials on the accent gradient.
export function Avatar({ photo, size, className = "", textClassName = "text-sm" }: Props) {
  const alt = `${site.name} — ${site.title}`;
  const image = photo
    ? { src: photo.url, loader: sanityLoader, position: photo.position ?? "50% 0%" }
    : site.photo
      ? { src: site.photo, loader: undefined, position: "50% 0%" }
      : null;

  if (image) {
    const { src, loader, position } = image;
    return size ? (
      <Image src={src} loader={loader} alt={alt} width={size} height={size} priority className={`object-cover ${className}`} style={{ width: size, height: size, objectPosition: position }} />
    ) : (
      <Image src={src} loader={loader} alt={alt} fill priority sizes="256px" className={`object-cover ${className}`} style={{ objectPosition: position }} />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      style={size ? { width: size, height: size } : undefined}
      className={`flex items-center justify-center bg-gradient-to-br from-[var(--accent)] via-[#a78bfa] to-[#f472b6] text-white font-display font-bold ${size ? "" : "absolute inset-0"} ${className}`}
    >
      <span className={textClassName}>{site.initials}</span>
    </div>
  );
}
