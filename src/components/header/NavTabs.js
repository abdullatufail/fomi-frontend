"use client";

import { useState } from "react";
import { Folder, House, Image, Video, WandSparkles } from "lucide-react";

const tabs = [
  { label: "Home", icon: House },
  { label: "Image", icon: Image },
  { label: "Video", icon: Video },
  { label: "Edit", icon: WandSparkles },
  { label: "Assets", icon: Folder },
];

export default function NavTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <nav aria-label="Main" className="w-full md:w-72 lg:w-md">
      <div className="relative h-2 rounded-full bg-blush shadow-sm">
        <div
          className="absolute inset-y-0 left-0 w-1/5 px-1 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${activeTab * 100}%)` }}
        >
          <div className="h-full rounded-full bg-clay" />
        </div>
      </div>

      <ul className="mt-3 grid grid-cols-5">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = index === activeTab;

          return (
            <li key={tab.label} className="flex justify-center">
              <button
                type="button"
                onClick={() => setActiveTab(index)}
                aria-current={isActive ? "page" : undefined}
                title={tab.label}
                className={`group flex flex-col items-center rounded-lg p-1.5 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-clay ${
                  isActive ? "text-ink" : "text-ink/70 hover:text-ink"
                }`}
              >
                <Icon size={20} strokeWidth={2.4} fill={isActive ? "currentColor" : "none"} />
                <span className="sr-only">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
