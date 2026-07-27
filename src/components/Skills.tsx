import { resume } from "@/data/resume";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-6 space-y-5">
        {resume.skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {group.category}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
