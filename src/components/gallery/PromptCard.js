"use client";

import { useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";

export default function PromptCard({ generation, onReuse }) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(generation.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available (e.g. insecure context), nothing else to do
    }
  }

  return (
    <div className="group relative flex flex-col justify-between gap-3 rounded-3xl border border-line bg-blush p-3 xl:w-56 xl:shrink-0 2xl:w-72">
      <p className="line-clamp-4 text-xs leading-relaxed text-ink/80 xl:line-clamp-none">{generation.prompt}</p>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1 opacity-100 transition-opacity duration-300 xl:opacity-0 xl:group-hover:opacity-100 xl:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={() => onReuse(generation)}
            title="Reuse prompt & settings"
            aria-label="Reuse prompt and settings"
            className="flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-card hover:text-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-clay"
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            onClick={copyPrompt}
            title="Copy prompt"
            aria-label={copied ? "Prompt copied" : "Copy prompt"}
            className="flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-card hover:text-ink active:scale-90 focus-visible:outline-2 focus-visible:outline-clay"
          >
            {copied ? <Check size={15} className="text-clay" /> : <Copy size={15} />}
          </button>
        </div>

        <span className="rounded-lg bg-card px-3 py-1.5 text-sm text-ink">{generation.model}</span>
      </div>
    </div>
  );
}
