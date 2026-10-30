import type { ImageLoader } from "next/image";
import type { ProjectImage } from "@/data/site";

// GROQ projection for an image field: the asset plus the crop/hotspot set in the Studio.
export const imageFields = `"url": asset->url, alt, crop, hotspot,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip`;

type Crop = { top: number; bottom: number; left: number; right: number };
export type RawImage = Omit<ProjectImage, "position"> & { crop?: Crop | null; hotspot?: { x: number; y: number } | null };

const percent = (n: number) => `${(Math.min(1, Math.max(0, n)) * 100).toFixed(1)}%`;

// Applies the Studio crop with Sanity's `rect` param and turns the hotspot into a CSS object-position.
export function toImage({ crop, hotspot, ...img }: RawImage): ProjectImage {
  const { width, height } = img;
  const cropped = crop && width && height && (crop.top || crop.bottom || crop.left || crop.right);
  if (!cropped) return { ...img, position: hotspot ? `${percent(hotspot.x)} ${percent(hotspot.y)}` : undefined };

  const w = 1 - crop.left - crop.right;
  const h = 1 - crop.top - crop.bottom;
  const rect = [crop.left * width, crop.top * height, w * width, h * height].map(Math.round);
  return {
    ...img,
    url: `${img.url}?rect=${rect.join(",")}`,
    width: rect[2],
    height: rect[3],
    lqip: undefined, // The blur preview is of the uncropped image.
    position: hotspot ? `${percent((hotspot.x - crop.left) / w)} ${percent((hotspot.y - crop.top) / h)}` : undefined,
  };
}

// Sanity's CDN resizes on the fly, so let it do the work instead of Vercel's optimizer.
export const sanityLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}${src.includes("?") ? "&" : "?"}w=${width}&q=${quality ?? 80}&auto=format&fit=max`;
