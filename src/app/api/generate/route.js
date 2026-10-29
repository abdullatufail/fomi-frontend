import { NextResponse } from "next/server";
import { createGeneration, validateRequest } from "@/lib/mock-generator";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { data, error } = validateRequest(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  // pretend the model is thinking
  await wait(data.mode === "video" ? 2600 : 1800);

  return NextResponse.json({ generation: createGeneration(data) });
}
