"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HistoryStrip({ items, onOpen }) {
  const listRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateArrows() {
    const list = listRef.current;
    if (!list) return;
    setCanScrollLeft(list.scrollLeft > 4);
    setCanScrollRight(list.scrollLeft + list.clientWidth < list.scrollWidth - 4);
  }

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  function scrollList(direction) {
    listRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  }

  return (
    <section aria-label="History" className="relative flex items-center gap-3 rounded-2xl border-t border-line bg-blush-light p-2.5 shadow-lg shadow-ink/5 md:gap-4 md:p-3">
      <button
        type="button"
        className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-card transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-clay md:size-20"
      >
        <span className="text-sm font-semibold text-ink/80 md:text-base">History</span>
        <span className="text-xs font-light text-muted">View All</span>
      </button>

      <span className="hidden h-10 w-1.5 shrink-0 rounded-full bg-card md:block" />

      <ul ref={listRef} onScroll={updateArrows} className="no-scrollbar flex flex-1 snap-x gap-3 overflow-x-auto py-1 md:gap-4">
        {items.map((item, index) => (
          <li key={item.id} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => onOpen(index)}
              className="block overflow-hidden rounded-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
            >
              <Image src={item.src} alt={item.alt} width={80} height={80} className="size-16 object-cover md:size-20" />
            </button>
          </li>
        ))}
      </ul>

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollList(-1)}
          aria-label="Scroll history left"
          className="absolute top-1/2 left-24 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-ink shadow-md transition hover:scale-105 md:flex md:left-32"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 rounded-r-2xl bg-linear-to-l from-blush-light to-transparent" />

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollList(1)}
          aria-label="Scroll history right"
          className="absolute top-1/2 right-3 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-ink shadow-md transition hover:scale-105 md:flex"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </section>
  );
}
