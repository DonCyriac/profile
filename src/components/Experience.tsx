import { resume } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
      <div className="mt-6 space-y-8">
        {resume.experience.map((job) => (
          <div key={`${job.company}-${job.role}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-medium">
                {job.role} · {job.company}
              </h3>
              <span className="text-sm text-neutral-500 dark:text-neutral-500">{job.dates}</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">{job.location}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
