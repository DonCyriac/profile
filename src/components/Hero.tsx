import Image from "next/image";
import { resume } from "@/data/resume";
import { DownloadResumeButton } from "@/components/DownloadResumeButton";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center">
      <Image
        src="/images/profile.jpg"
        alt={resume.name}
        width={128}
        height={128}
        className="h-32 w-32 rounded-full object-cover"
        priority
      />
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{resume.name}</h1>
        <p className="mt-1 text-lg text-neutral-600 dark:text-neutral-400">{resume.title}</p>
      </div>
      <p className="max-w-xl text-neutral-700 dark:text-neutral-300">{resume.summary}</p>
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <a href={`mailto:${resume.contact.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
          {resume.contact.email}
        </a>
        <span aria-hidden>·</span>
        <a href={`tel:${resume.contact.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400">
          {resume.contact.phone}
        </a>
        <span aria-hidden>·</span>
        <a
          href={resume.contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          LinkedIn
        </a>
      </div>
      <DownloadResumeButton />
    </section>
  );
}
