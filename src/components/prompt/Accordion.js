"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-4 rounded-3xl bg-card shadow-sm transition hover:shadow-md">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="relative w-full rounded-3xl py-2.5 text-center text-base text-ink focus-visible:outline-2 focus-visible:outline-clay"
      >
        {title}
        <span className="absolute top-1/2 right-6 flex size-5 -translate-y-1/2 items-center justify-center rounded-md bg-blush-light">
          <ChevronDown size={13} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </span>
      </button>

      {isOpen && (
        <div id={panelId} className="animate-fade-up px-4 pt-1 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}
