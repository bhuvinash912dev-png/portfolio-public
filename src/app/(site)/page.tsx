import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { StackSection } from "@/components/StackSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { Footer } from "@/components/Footer";
import { getProfilePhoto, getProjects } from "@/sanity/projects";

// Re-fetch content from Sanity at most once a minute.
export const revalidate = 60;

export default async function Home() {
  const [projects, photo] = await Promise.all([getProjects(), getProfilePhoto()]);
  return (
    <main>
      <Navbar photo={photo} />
      <HeroSection photo={photo} />
      <AboutSection />
      <StackSection />
      <ProjectsSection projects={projects} />
      <ShowcaseSection />
      <Footer />
    </main>
  );
}
