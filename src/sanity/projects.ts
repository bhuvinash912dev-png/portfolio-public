import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";
import { imageFields, toImage, type RawImage } from "./image";
import { defaultProjects, type Project, type ProjectImage } from "@/data/site";

const client = projectId ? createClient({ projectId, dataset, apiVersion, useCdn: true }) : null;

const projectsQuery = `*[_type == "project"] | order(order asc, _createdAt asc) {
  "id": _id, title, description, tags, featured, liveUrl,
  "images": images[defined(asset)]{ ${imageFields} }
}`;

const profilePhotoQuery = `*[_id == "profile" && defined(photo.asset)][0].photo{ ${imageFields} }`;

// Falls back to the bundled projects until Sanity is configured, or if it is unreachable.
export async function getProjects(): Promise<Project[]> {
  if (!client) return defaultProjects;
  try {
    const projects = await client.fetch<(Project & { images?: RawImage[] })[]>(projectsQuery, {}, { next: { revalidate: 60 } });
    return projects.map((p) => ({ ...p, images: p.images?.map(toImage) }));
  } catch (err) {
    console.error("Failed to load projects from Sanity", err);
    return defaultProjects;
  }
}

// The photo from the Studio's Profile page; null means fall back to site.photo.
export async function getProfilePhoto(): Promise<ProjectImage | null> {
  if (!client) return null;
  try {
    const photo = await client.fetch<RawImage | null>(profilePhotoQuery, {}, { next: { revalidate: 60 } });
    return photo ? toImage(photo) : null;
  } catch (err) {
    console.error("Failed to load profile photo from Sanity", err);
    return null;
  }
}
