const RESUME_PATH = "/resume/Don-Ignatius-Cyriac-Resume.pdf";

export function DownloadResumeButton({
  variant = "primary",
}: {
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
      : "inline-block rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500";

  return (
    <a href={RESUME_PATH} download className={className}>
      Download Resume
    </a>
  );
}
