import { imageCounts, models, ratios, styles } from "@/lib/data";
import Accordion from "./Accordion";
import ModeToggle from "./ModeToggle";
import OptionSelect from "./OptionSelect";
import PromptBox from "./PromptBox";

const countOptions = imageCounts.map((count) => ({
  value: count,
  label: `${count} ${count === 1 ? "Image" : "Images"}`,
}));
const ratioOptions = ratios.map((ratio) => ({ value: ratio, label: ratio }));
const modelOptions = models.map((model) => ({ value: model, label: model }));

export default function PromptPanel({ mode, onModeChange, prompt, onPromptChange, settings, onSettingChange, onGenerate, isGenerating, error }) {
  function handleSubmit(event) {
    event.preventDefault();
    onGenerate();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-blush p-3.5 pb-8 lg:pb-24">
      <ModeToggle mode={mode} onChange={onModeChange} />

      <PromptBox value={prompt} onChange={onPromptChange} onSubmit={onGenerate} isGenerating={isGenerating} mode={mode} />

      {error && (
        <p role="alert" className="mt-3 animate-fade-up rounded-xl bg-card px-3 py-2 text-xs text-clay">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        <OptionSelect
          label="Number of images"
          prefix="#"
          value={settings.count}
          options={countOptions}
          onChange={(value) => onSettingChange("count", Number(value))}
        />
        <OptionSelect label="Aspect ratio" value={settings.ratio} options={ratioOptions} onChange={(value) => onSettingChange("ratio", value)} />
        <OptionSelect
          label="Model"
          prefix="Model:"
          value={settings.model}
          options={modelOptions}
          onChange={(value) => onSettingChange("model", value)}
        />
      </div>

      <Accordion title="Advance">
        <label htmlFor="negative-prompt" className="text-xs font-medium text-muted">
          Negative prompt
        </label>
        <textarea
          id="negative-prompt"
          rows={2}
          value={settings.negativePrompt}
          onChange={(event) => onSettingChange("negativePrompt", event.target.value)}
          placeholder="Things to avoid, e.g. blurry, extra fingers"
          className="mt-1 w-full resize-none rounded-xl bg-blush-light px-3 py-2 text-xs text-ink placeholder:text-muted focus:ring-2 focus:ring-salmon/50 focus:outline-none"
        />

        <div className="mt-3 flex items-center justify-between text-xs font-medium text-muted">
          <label htmlFor="guidance">Prompt strength</label>
          <span className="text-ink">{settings.guidance}</span>
        </div>
        <input
          id="guidance"
          type="range"
          min={1}
          max={20}
          value={settings.guidance}
          onChange={(event) => onSettingChange("guidance", Number(event.target.value))}
          className="mt-2 w-full cursor-pointer accent-clay"
        />
      </Accordion>

      <Accordion title="Styles">
        <div className="flex flex-wrap gap-2">
          {styles.map((style) => {
            const isSelected = settings.style === style;
            return (
              <button
                key={style}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSettingChange("style", style)}
                className={`rounded-full px-3 py-1.5 text-xs transition active:scale-95 focus-visible:outline-2 focus-visible:outline-clay ${
                  isSelected ? "bg-salmon text-white" : "bg-blush-light text-ink hover:bg-petal"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </Accordion>
    </form>
  );
}
