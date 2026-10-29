"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

export default function Lightbox({ images, index, onClose, onChange }) {
  const closeButtonRef = useRef(null);
  const image = images[index];
  const hasMany = images.length > 1;

  useEffect(() => {
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % images.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, images.length, onChange, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
      className="fixed inset-0 z-50 flex animate-fade-up flex-col bg-black/85 p-4 backdrop-blur-sm md:p-10"
    >
      <div className="flex items-center justify-between gap-4 text-white" onClick={(event) => event.stopPropagation()}>
        <p className="truncate text-sm text-white/70">
          {index + 1} / {images.length}
          {image.type === "video" && <span className="ml-2 rounded-md bg-white/15 px-1.5 py-0.5 text-xs">Video preview</span>}
        </p>
        <div className="flex gap-2">
          <a
            href={image.src}
            download
            aria-label="Download"
            className="flex size-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
          >
            <Download size={18} />
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="flex size-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="relative mt-4 flex-1">
        <Image key={image.id} src={image.src} alt={image.alt} fill sizes="90vw" className="animate-fade-up object-contain" onClick={(event) => event.stopPropagation()} />

        {hasMany && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onChange((index - 1 + images.length) % images.length);
              }}
              aria-label="Previous image"
              className="absolute top-1/2 left-0 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onChange((index + 1) % images.length);
              }}
              aria-label="Next image"
              className="absolute top-1/2 right-0 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-white/70">{image.alt}</p>
    </div>
  );
}
