import { resume } from "@/data/resume";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-3xl px-6 py-12 text-sm text-neutral-500 dark:text-neutral-500">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <span>
          © {year} {resume.name}
        </span>
        <div className="flex gap-4">
          <a href={`mailto:${resume.contact.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
            Email
          </a>
          <a
            href={resume.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
