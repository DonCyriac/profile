import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Achievements } from "@/components/Achievements";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
      </main>
    </>
  );
}
