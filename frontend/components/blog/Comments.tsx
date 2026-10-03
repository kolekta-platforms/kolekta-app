import { sanityFetch } from "@/lib/sanity/live";
import { COMMENTS_QUERY } from "@/lib/sanity/queries";
import type { SanityComment } from "@/lib/sanity/types";
import CommentForm from "./CommentForm";

type Props = {
  postId: string;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Comments({ postId }: Props) {
  const { data: comments } = (await sanityFetch({
    query: COMMENTS_QUERY,
    params: { postId },
  })) as { data: SanityComment[] };

  return (
    <section className="max-w-[760px] pb-12">
      <h2
        className="mb-6"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "1.25rem",
          fontWeight: 800,
          color: "#003020",
          letterSpacing: "-0.02em",
        }}
      >
        Comments{comments.length > 0 ? ` (${comments.length})` : ""}
      </h2>

      {comments.length > 0 ? (
        <ul className="flex flex-col gap-5 mb-8" style={{ listStyle: "none" }}>
          {comments.map((c) => (
            <li
              key={c._id}
              className="rounded-xl p-5"
              style={{ backgroundColor: "#F0F0E0", border: "1px solid #DDDDC8" }}
            >
              <div
                className="flex items-center gap-3 mb-2"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                <span
                  className="rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#D4EDDF",
                    color: "#003020",
                  }}
                >
                  {c.name.charAt(0)}
                </span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#003020",
                  }}
                >
                  {c.name}
                </span>
                <span style={{ fontSize: "0.75rem", color: "#8A8A72" }}>
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.9375rem",
                  color: "#616150",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {c.comment}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="mb-8"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.9375rem",
            color: "#616150",
          }}
        >
          No comments yet. Be the first to share your thoughts.
        </p>
      )}

      <CommentForm postId={postId} />
    </section>
  );
}
