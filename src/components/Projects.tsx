import { resume } from "@/data/resume";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
      <div className="mt-6 space-y-6">
        {resume.projects.map((project) => (
          <div key={project.name}>
            <h3 className="font-medium">{project.name}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">{project.context}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {project.description.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
