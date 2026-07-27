import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experience />
      </main>
    </>
  );
}
