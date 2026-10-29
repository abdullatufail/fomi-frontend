import { ChevronDown } from "lucide-react";

export default function OptionSelect({ label, prefix, value, options, onChange, className = "" }) {
  return (
    <label className={`relative flex items-center gap-1 rounded-lg bg-card py-1.5 pr-7 pl-2 text-xs text-ink shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-salmon/50 ${className}`}>
      <span className="sr-only">{label}</span>
      {prefix && <span aria-hidden="true">{prefix}</span>}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="cursor-pointer appearance-none bg-transparent font-semibold field-sizing-content focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1 flex size-5 items-center justify-center rounded-md bg-blush-light">
        <ChevronDown size={13} />
      </span>
    </label>
  );
}
