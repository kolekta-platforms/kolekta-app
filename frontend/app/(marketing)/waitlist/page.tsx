"use client";

import { useState } from "react";

const WA_NUMBER = "254748244308";
const SUPPORT_EMAIL = "support@kolekta.co";

type Channel = "email" | "whatsapp";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState<Channel>("email");
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const message = (includeName: boolean) => {
    const greet = includeName && name.trim() ? `${name.trim()} — ` : "";
    return (
      `${greet}Hi Kolekta team! I'd like to join the waitlist.\n\n` +
      `Email: ${email.trim()}\n` +
      `How I heard about Kolekta: (tell us here)\n` +
      `What I do: (e.g. freelancer, creative, small business)`
    );
  };

  const handleSubmit = () => {
    if (honeypot) return;

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);

    if (channel === "email") {
      const subject = encodeURIComponent("Waitlist signup — Kolekta");
      const body = encodeURIComponent(message(true));
      window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    } else {
      const text = encodeURIComponent(message(true));
      window.location.href = `https://wa.me/${WA_NUMBER}?text=${text}`;
    }
  };

  return (
    <div className="relative">
      {/* Top accent line */}
      <div className="w-full h-[3px]" style={{ backgroundColor: "#20A160" }} />

      <div className="max-container padding-x">
        {/* Page header */}
        <div className="pt-10 pb-8 md:pt-14 md:pb-10">
          <span className="label-tag">Waitlist</span>
          <h1
            className="mt-3 mb-3"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#003020",
              lineHeight: 1.1,
            }}
          >
            Be first in line.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "1rem",
              color: "#616150",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            Kolekta is building tax tools for Kenya&apos;s independent workers,
            creatives, and small businesses. Leave your details and we&apos;ll be
            in touch when we launch — and we&apos;ll send your message straight to
            us on the channel you pick.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          style={{ paddingBottom: "7rem" }}
        >
          {/* Form */}
          <div
            className="rounded-2xl p-7"
            style={{ backgroundColor: "#E8E8D0", border: "1px solid #DDDDC8" }}
          >
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className="block mb-2 text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "#003020",
                  }}
                >
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full rounded-lg px-4 py-3"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "0.9375rem",
                    color: "#003020",
                    backgroundColor: "#F0F0E0",
                    border: "1.5px solid #DDDDC8",
                    outline: "none",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block mb-2 text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "#003020",
                  }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="you@email.com"
                  className="w-full rounded-lg px-4 py-3"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "0.9375rem",
                    color: "#003020",
                    backgroundColor: "#F0F0E0",
                    border: error ? "1.5px solid #C0392B" : "1.5px solid #DDDDC8",
                    outline: "none",
                  }}
                />
              </div>

              {/* Honeypot */}
              <div
                style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Channel selector */}
              <div>
                <p
                  className="mb-2 text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "#003020",
                  }}
                >
                  Send my message via
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setChannel("email")}
                    className="flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all"
                    style={{
                      fontFamily: "var(--font-primary)",
                      backgroundColor: channel === "email" ? "#003020" : "#F0F0E0",
                      color: channel === "email" ? "#F0F0E0" : "#616150",
                      border:
                        channel === "email"
                          ? "1.5px solid #003020"
                          : "1.5px solid #DDDDC8",
                      cursor: "pointer",
                    }}
                  >
                    ✉️ Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel("whatsapp")}
                    className="flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all"
                    style={{
                      fontFamily: "var(--font-primary)",
                      backgroundColor:
                        channel === "whatsapp" ? "#20A160" : "#F0F0E0",
                      color: channel === "whatsapp" ? "#F0F0E0" : "#616150",
                      border:
                        channel === "whatsapp"
                          ? "1.5px solid #20A160"
                          : "1.5px solid #DDDDC8",
                      cursor: "pointer",
                    }}
                  >
                    💬 WhatsApp
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p
                  className="text-sm"
                  role="alert"
                  style={{ fontFamily: "var(--font-primary)", color: "#C0392B" }}
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="btn btn-primary w-full"
                style={{ justifyContent: "center" }}
              >
                {channel === "email"
                  ? "Send via Email →"
                  : "Send via WhatsApp →"}
              </button>

              <p
                className="text-xs"
                style={{ fontFamily: "var(--font-primary)", color: "#8A8A72" }}
              >
                Your details open in your email app or WhatsApp with the message
                pre-filled — nothing is stored on this site.
              </p>
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-5">
            <div
              className="rounded-2xl p-7"
              style={{ backgroundColor: "#D4EDDF", border: "1px solid #20A160" }}
            >
              <p
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-primary)", color: "#003020" }}
              >
                What you get
              </p>
              <ul
                className="list-disc pl-5 space-y-2"
                style={{ fontFamily: "var(--font-primary)", color: "#616150" }}
              >
                <li>Early access to Kolekta&apos;s tax tools</li>
                <li>PAYE, VAT, and KRA guides for independents</li>
                <li>A heads-up when we launch in Kenya</li>
              </ul>
            </div>
            <div
              className="rounded-2xl p-7"
              style={{ backgroundColor: "#E8E8D0", border: "1px solid #DDDDC8" }}
            >
              <p
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-primary)", color: "#003020" }}
              >
                Prefer to reach us directly?
              </p>
              <p
                style={{ fontFamily: "var(--font-primary)", color: "#616150" }}
              >
                Email{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#20A160" }}>
                  {SUPPORT_EMAIL}
                </a>{" "}
                or chat with us on WhatsApp at{" "}
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#20A160" }}
                >
                  +254 748 244 308
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
