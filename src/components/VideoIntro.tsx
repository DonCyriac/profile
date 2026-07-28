export function VideoIntro() {
  return (
    <section id="video-intro" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Introduction</h2>
      <div className="relative mt-6 w-full overflow-hidden rounded-lg pb-[56.25%]">
        <iframe
          src="https://www.loom.com/embed/f11cfc7ae8c1478da2d666771fadc058"
          title="Introduction video"
          allow="fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </section>
  );
}
