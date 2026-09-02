import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
  _id?: string;
  slug?: string | null;
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new Response("Missing environment variable SANITY_REVALIDATE_SECRET", {
      status: 500,
    });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true // wait for Content Lake propagation (client uses useCdn: true)
    );

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ message: "Invalid signature" }),
        { status: 401 }
      );
    }

    if (!body?._type) {
      return new Response(
        JSON.stringify({ message: "Bad Request", body }),
        { status: 400 }
      );
    }

    // Blog listing + category filter live on /blog
    revalidatePath("/blog");
    revalidatePath("/blog", "page");

    // Post detail pages: revalidate all slug routes so edits to any post
    // (and author/category references rendered on them) go live.
    revalidatePath("/blog/[slug]", "page");

    // If the payload carries a concrete slug, revalidate it directly too.
    if (body.slug) {
      revalidatePath(`/blog/${body.slug}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err) {
    console.error("Revalidate webhook error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(message, { status: 500 });
  }
}
