import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/writeClient";

const MAX_NAME = 80;
const MAX_EMAIL = 200;
const MAX_COMMENT = 2000;

// Best-effort in-memory throttle (resets on cold start). Guards against
// obvious bursts; swap for a durable store before relying on it in prod.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const attempts = new Map<string, { count: number; first: number }>();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    attempts.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json(
      { message: "Server not configured for comments" },
      { status: 500 }
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooManyRequests(ip)) {
    return NextResponse.json(
      { message: "Too many comments. Please wait a few minutes." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";
  const postId = typeof body.postId === "string" ? body.postId.trim() : "";
  const website = typeof body.website === "string" ? body.website : "";

  // Honeypot: bots fill the hidden field; silently accept.
  if (website) {
    return NextResponse.json({ ok: true, approved: true }, { status: 201 });
  }

  if (!name || name.length > MAX_NAME) {
    return NextResponse.json(
      { message: "Please enter your name (max 80 characters)." },
      { status: 400 }
    );
  }
  if (email && (email.length > MAX_EMAIL || !EMAIL_RE.test(email))) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!comment || comment.length > MAX_COMMENT) {
    return NextResponse.json(
      { message: "Please enter a comment (max 2000 characters)." },
      { status: 400 }
    );
  }
  if (!postId) {
    return NextResponse.json(
      { message: "Missing post." },
      { status: 400 }
    );
  }

  try {
    await writeClient.create({
      _type: "comment",
      name,
      email: email || undefined,
      comment,
      post: { _type: "reference", _ref: postId },
      approved: true,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to create comment:", err);
    return NextResponse.json(
      { message: "We could not save your comment. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, approved: true }, { status: 201 });
}
