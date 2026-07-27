import { resume } from "@/data/resume";
import { DownloadResumeButton } from "@/components/DownloadResumeButton";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold tracking-tight">{resume.name}</span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <DownloadResumeButton variant="secondary" />
        </div>
      </div>
    </header>
  );
}
