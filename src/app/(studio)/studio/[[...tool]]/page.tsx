import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";
import { projectId } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!projectId) {
    return (
      <p style={{ fontFamily: "system-ui", padding: 32 }}>
        Sanity is not configured yet. Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (see README.md).
      </p>
    );
  }
  return <NextStudio config={config} />;
}
