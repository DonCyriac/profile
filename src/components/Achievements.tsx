import { resume } from "@/data/resume";

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Achievements</h2>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
        {resume.achievements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
