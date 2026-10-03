"use client";

import { useState } from "react";

interface CommentFormProps {
  postId: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export default function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!comment.trim()) {
      setErrorMessage("Please write a comment.");
      return;
    }

    setSubmitState("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment, postId, website }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setSubmitState("success");
    } catch (err: unknown) {
      setSubmitState("error");
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setErrorMessage(
        message.includes("Too many")
          ? "You have commented too many times recently. Please try again later."
          : "We could not save your comment. Please try again.",
      );
    }
  };

  if (submitState === "success") {
    return (
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#D4EDDF", border: "1.5px solid #20A160" }}
      >
        <p
          className="font-bold"
          style={{
            fontFamily: "var(--font-primary)",
            color: "#003020",
            fontSize: "1rem",
          }}
        >
          Thanks for your comment!
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.875rem",
            color: "#616150",
            lineHeight: 1.6,
          }}
        >
          It is awaiting moderation and will appear here once approved.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: "#E8E8D0", border: "1.5px solid #DDDDC8" }}
    >
      <p
        className="mb-4"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.9375rem",
          fontWeight: 700,
          color: "#003020",
        }}
      >
        Leave a comment
      </p>

      {/* Honeypot */}
      <div
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        aria-hidden="true"
      >
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrorMessage(null);
        }}
        placeholder="Your name"
        className="w-full rounded-lg px-4 py-3 mb-3"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.9375rem",
          color: "#003020",
          backgroundColor: "#F0F0E0",
          border: errorMessage ? "1.5px solid #C0392B" : "1.5px solid #DDDDC8",
          outline: "none",
        }}
        aria-label="Your name"
      />

      <textarea
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          setErrorMessage(null);
        }}
        placeholder="Share your thoughts…"
        rows={4}
        className="w-full rounded-lg px-4 py-3 mb-3"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.9375rem",
          color: "#003020",
          backgroundColor: "#F0F0E0",
          border: errorMessage ? "1.5px solid #C0392B" : "1.5px solid #DDDDC8",
          outline: "none",
          resize: "vertical",
        }}
        aria-label="Comment"
      />

      {errorMessage && (
        <p
          className="mb-3 text-sm"
          role="alert"
          style={{ fontFamily: "var(--font-primary)", color: "#C0392B" }}
        >
          {errorMessage}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitState === "loading"}
        className="btn btn-primary w-full"
        style={{
          opacity: submitState === "loading" ? 0.7 : 1,
          justifyContent: "center",
        }}
      >
        {submitState === "loading" ? "Submitting..." : "Submit Comment"}
      </button>
    </div>
  );
}
