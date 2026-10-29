"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { historyItems, models } from "@/lib/data";
import Gallery from "./gallery/Gallery";
import HistoryStrip from "./history/HistoryStrip";
import PromptPanel from "./prompt/PromptPanel";

// the lightbox isn't needed until someone clicks an image
const Lightbox = dynamic(() => import("./Lightbox"));

const defaultSettings = {
  count: 4,
  ratio: "1:1",
  model: models[0],
  style: "None",
  negativePrompt: "",
  guidance: 7,
};

export default function Workspace({ initialGenerations }) {
  const [mode, setMode] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [settings, setSettings] = useState(defaultSettings);
  const [generations, setGenerations] = useState(initialGenerations);
  const [pendingRequest, setPendingRequest] = useState(null);
  const [error, setError] = useState("");
  const [lightbox, setLightbox] = useState(null);
  const galleryRef = useRef(null);

  const updateSetting = useCallback((key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
  }, []);

  async function generate() {
    if (pendingRequest) return;
    if (!prompt.trim()) {
      setError("Write a prompt first, then hit generate.");
      document.getElementById("prompt")?.focus();
      return;
    }

    const request = { prompt: prompt.trim(), mode, ...settings };
    setError("");
    setPendingRequest(request);
    galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong.");

      setGenerations((current) => [data.generation, ...current]);
      setPrompt("");
    } catch (err) {
      setError(err.message || "Couldn't reach the server. Try again.");
    } finally {
      setPendingRequest(null);
    }
  }

  const openImages = useCallback((images, index) => {
    setLightbox({ images, index });
  }, []);

  const openHistory = useCallback((index) => {
    setLightbox({ images: historyItems, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const changeLightboxImage = useCallback((index) => {
    setLightbox((current) => ({ ...current, index }));
  }, []);

  const reusePrompt = useCallback((generation) => {
    setPrompt(generation.prompt);
    setMode(generation.mode);
    setSettings((current) => ({
      ...current,
      model: generation.model,
      ratio: generation.ratio,
      count: generation.images.length,
    }));
    document.getElementById("prompt")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mx-auto max-w-app px-4 pb-12 md:px-8 xl:px-12">
      <div className="sticky top-0 z-30 -mx-1 bg-cream px-1 pt-2">
        <HistoryStrip items={historyItems} onOpen={openHistory} />
      </div>

      <div className="mt-4 flex flex-col gap-6 lg:flex-row xl:gap-8">
        <aside className="lg:sticky lg:top-36 lg:w-72 lg:shrink-0 lg:self-start xl:w-80">
          <PromptPanel
            mode={mode}
            onModeChange={setMode}
            prompt={prompt}
            onPromptChange={(value) => {
              setPrompt(value);
              if (error) setError("");
            }}
            settings={settings}
            onSettingChange={updateSetting}
            onGenerate={generate}
            isGenerating={Boolean(pendingRequest)}
            error={error}
          />
        </aside>

        <main ref={galleryRef} className="min-w-0 flex-1 scroll-mt-36">
          <h1 className="sr-only">Your generations</h1>
          <Gallery generations={generations} pendingRequest={pendingRequest} onOpenImage={openImages} onReuse={reusePrompt} />
        </main>
      </div>

      {lightbox && <Lightbox images={lightbox.images} index={lightbox.index} onClose={closeLightbox} onChange={changeLightboxImage} />}
    </div>
  );
}
