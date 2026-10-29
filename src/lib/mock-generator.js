import { imagePools, imageCounts, models, ratios } from "./data";

// Very rough "understanding" of the prompt so the fake results feel related to it
function pickPool(prompt) {
  const text = prompt.toLowerCase();

  if (/(cat|kitten|pet)/.test(text)) return imagePools.cats;
  if (/(mountain|lake|landscape|forest|valley|nature|sky|drone)/.test(text)) return imagePools.landscapes;
  if (/(red ?head|auburn|ginger|freckle)/.test(text)) return imagePools.redhead;
  return imagePools.portraits;
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function validateRequest(body) {
  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

  if (!prompt) return { error: "Write a prompt before generating." };
  if (prompt.length > 2000) return { error: "Prompt is too long (2000 characters max)." };

  return {
    data: {
      prompt,
      mode: body.mode === "video" ? "video" : "image",
      count: imageCounts.includes(body.count) ? body.count : 4,
      ratio: ratios.includes(body.ratio) ? body.ratio : "1:1",
      model: models.includes(body.model) ? body.model : models[0],
      style: body.style || "None",
    },
  };
}

export function createGeneration({ prompt, mode, count, ratio, model, style }) {
  const id = crypto.randomUUID();
  const pool = shuffle(pickPool(prompt));

  const images = Array.from({ length: count }, (_, index) => ({
    ...pool[index % pool.length],
    id: `${id}-${index}`,
    type: mode,
    duration: mode === "video" ? `0:0${4 + index}` : null,
  }));

  return {
    id,
    prompt,
    mode,
    model,
    ratio,
    style,
    createdAt: new Date().toISOString(),
    images,
  };
}
