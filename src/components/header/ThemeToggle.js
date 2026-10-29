"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // storage can be blocked, the toggle still works for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="flex size-9 items-center justify-center rounded-full bg-blush-light text-muted transition hover:rotate-12 hover:text-ink focus-visible:outline-2 focus-visible:outline-clay"
    >
      <Moon size={16} className="dark:hidden" fill="currentColor" />
      <Sun size={16} className="hidden dark:block" />
    </button>
  );
}
