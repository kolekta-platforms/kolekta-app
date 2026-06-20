// sections/estimator/DisclaimerBox.tsx
import Link from "next/link";

export default function DisclaimerBox() {
  return (
    <div
      className="rounded-xl p-5 flex gap-4"
      style={{
        backgroundColor: "#FDF3D6",
        border: "1.5px solid #E0A020",
      }}
    >
      <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>⚠️</span>
      <div>
        <p
          className="font-semibold mb-1"
          style={{
            fontFamily: "var(--font-primary)",
            color: "#003020",
            fontSize: "0.875rem",
          }}
        >
          This is an estimate, not a formal tax assessment.
        </p>
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.8125rem",
            color: "#616150",
            lineHeight: 1.6,
          }}
        >
          Figures are based on KRA rates effective 2026 and are for general
          guidance only. This is not financial or tax advice. Kolekta is not a
          registered tax agent. Always verify with KRA or a certified tax
          professional before filing.{" "}
          <Link href="/disclaimer" style={{ color: "#20A160" }}>
            Read our full disclaimer →
          </Link>
        </p>
      </div>
    </div>
  );
}
