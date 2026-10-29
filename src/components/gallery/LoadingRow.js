import { ratioClasses } from "./ImageCard";

export default function LoadingRow({ request }) {
  return (
    <article aria-busy="true" aria-live="polite" className="flex animate-fade-up flex-col gap-3 xl:flex-row xl:gap-4">
      <div className="flex flex-col justify-between gap-3 rounded-3xl border border-line bg-blush p-3 xl:w-56 xl:shrink-0 2xl:w-72">
        <p className="line-clamp-4 text-xs leading-relaxed text-ink/60">{request.prompt}</p>
        <p className="flex items-center gap-2 text-xs text-muted">
          <span className="size-2 animate-ping rounded-full bg-clay" />
          {request.mode === "video" ? "Rendering your video…" : "Dreaming up your images…"}
        </p>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 xl:gap-4">
        {Array.from({ length: request.count }, (_, index) => (
          <div
            key={index}
            className={`animate-pulse rounded-xl bg-petal ${ratioClasses[request.ratio]}`}
            style={{ animationDelay: `${index * 150}ms` }}
          />
        ))}
      </div>
    </article>
  );
}
