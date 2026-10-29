import { Loader2, Sparkles } from "lucide-react";

export default function PromptBox({ value, onChange, onSubmit, isGenerating, mode }) {
  function handleKeyDown(event) {
    // Ctrl/Cmd + Enter generates without reaching for the mouse
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="relative mt-4 rounded-3xl border border-ink bg-card shadow-lg shadow-ink/10 transition focus-within:ring-4 focus-within:ring-salmon/25">
      <label htmlFor="prompt" className="sr-only">
        Prompt
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe you imaginations to be converted to piece of art ...."
        className="block h-44 w-full resize-none rounded-3xl bg-transparent px-4 pt-5 pb-16 text-sm leading-relaxed text-ink placeholder:text-muted focus:outline-none"
      />

      <div className="absolute right-3 bottom-3 left-4 flex items-center justify-between gap-2">
        <span className="hidden text-xs text-muted xl:inline">Ctrl + Enter</span>
        <button
          type="submit"
          disabled={isGenerating}
          className="ml-auto flex items-center gap-2 rounded-full bg-salmon px-5 py-2.5 text-base text-white shadow-md shadow-salmon/30 transition hover:bg-clay active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
        >
          {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} fill="currentColor" />}
          <span>{isGenerating ? "Generating" : mode === "video" ? "Animate" : "Generate"}</span>
        </button>
      </div>
    </div>
  );
}
