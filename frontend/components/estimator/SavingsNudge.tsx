// components/estimator/SavingsNudge.tsx

import { formatKES } from "@/lib/tax-utils";

interface SavingsNudgeProps {
  saving: number;
  categoryLabel: string;
}

export default function SavingsNudge({
  saving,
  categoryLabel,
}: SavingsNudgeProps) {
  if (saving <= 0) return null;

  return (
    <div
      className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg"
      style={{
        backgroundColor: "#D4EDDF",
        border: "1px solid #20A160",
      }}
    >
      <span style={{ fontSize: "0.875rem" }}>💡</span>
      <p
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.8125rem",
          color: "#003020",
          lineHeight: 1.5,
        }}
      >
        Claiming {categoryLabel.toLowerCase()} saves you{" "}
        <strong
          style={{
            fontFamily: "var(--font-code)",
            color: "#20A160",
          }}
        >
          ~{formatKES(saving)}
        </strong>{" "}
        in tax
      </p>
    </div>
  );
}
