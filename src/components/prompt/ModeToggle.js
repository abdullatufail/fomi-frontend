const modes = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
];

export default function ModeToggle({ mode, onChange }) {
  return (
    <div role="radiogroup" aria-label="What to create" className="relative grid grid-cols-2 rounded-full bg-card p-1 shadow-sm">
      <div className="pointer-events-none absolute inset-1">
        <span
          className={`block h-full w-1/2 rounded-full bg-petal transition-transform duration-300 ease-out ${
            mode === "video" ? "translate-x-full" : ""
          }`}
        />
      </div>
      {modes.map((item) => (
        <button
          key={item.value}
          type="button"
          role="radio"
          aria-checked={mode === item.value}
          onClick={() => onChange(item.value)}
          className={`relative rounded-full py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-clay ${
            mode === item.value ? "text-ink" : "text-muted hover:text-ink"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
