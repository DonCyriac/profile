import { resume } from "@/data/resume";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Education</h2>
      <div className="mt-6 space-y-4">
        {resume.education.map((entry) => (
          <div
            key={entry.institution}
            className="flex flex-wrap items-baseline justify-between gap-x-4"
          >
            <div>
              <h3 className="font-medium">{entry.degree}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">{entry.institution}</p>
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-500">{entry.years}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
