"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Expand, Play } from "lucide-react";

export const ratioClasses = {
  "1:1": "aspect-square",
  "3:4": "aspect-3/4",
  "4:3": "aspect-4/3",
  "16:9": "aspect-video",
  "9:16": "aspect-9/16",
};

export default function ImageCard({ image, ratio, onOpen, priority = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideo = image.type === "video";

  return (
    <div className={`group relative animate-fade-up overflow-hidden rounded-xl bg-petal ${ratioClasses[ratio] ?? "aspect-3/4"}`}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${isVideo ? "video" : "image"}: ${image.alt}`}
        className="absolute inset-0 rounded-xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-clay"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 18vw, (min-width: 768px) 25vw, 50vw"
          onLoad={() => setIsLoaded(true)}
          className={`object-cover transition duration-700 group-hover:scale-105 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </button>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {isVideo && (
        <>
          <span className="pointer-events-none absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur-sm transition group-hover:scale-110">
            <Play size={18} fill="currentColor" className="ml-0.5" />
          </span>
          <span className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-black/50 px-1.5 py-0.5 text-xs text-white">{image.duration}</span>
        </>
      )}

      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <a
          href={image.src}
          download
          aria-label="Download"
          className="flex size-8 items-center justify-center rounded-lg bg-white/85 text-neutral-900 shadow-sm backdrop-blur-sm transition hover:bg-white active:scale-90"
        >
          <Download size={15} />
        </a>
        <button
          type="button"
          onClick={onOpen}
          aria-label="View full size"
          className="flex size-8 items-center justify-center rounded-lg bg-white/85 text-neutral-900 shadow-sm backdrop-blur-sm transition hover:bg-white active:scale-90"
        >
          <Expand size={15} />
        </button>
      </div>
    </div>
  );
}
