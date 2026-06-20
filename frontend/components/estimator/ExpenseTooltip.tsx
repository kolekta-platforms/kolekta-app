// components/estimator/ExpenseTooltip.tsx
"use client";

import { useEffect } from "react";
import { ExpenseCategory } from "@/lib/expense-categories";

interface ExpenseTooltipProps {
  category: ExpenseCategory;
  onClose: () => void;
}

export default function ExpenseTooltip({
  category,
  onClose,
}: ExpenseTooltipProps) {
  // Close on escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[300]"
        style={{ backgroundColor: "rgba(0,48,32,0.3)" }}
        onClick={onClose}
      />

      {/* Panel — bottom sheet on mobile, inline panel on desktop */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[400] md:absolute md:top-full md:left-0 md:right-auto md:bottom-auto md:w-[420px] rounded-t-2xl md:rounded-2xl overflow-y-auto"
        style={{
          backgroundColor: "#F0F0E0",
          border: "1.5px solid #DDDDC8",
          boxShadow: "0 -8px 40px rgba(0,48,32,0.12)",
          maxHeight: "80vh",
          marginTop: "8px",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5 border-b sticky top-0"
          style={{
            borderColor: "#DDDDC8",
            backgroundColor: "#F0F0E0",
          }}
        >
          <div className="flex items-center gap-3">
            <span style={{ fontSize: "1.5rem" }}>{category.icon}</span>
            <div>
              <p
                className="font-bold"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "#003020",
                  fontSize: "0.9375rem",
                }}
              >
                {category.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "#616150",
                  fontSize: "0.8125rem",
                }}
              >
                {category.description}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{
              backgroundColor: "#DDDDC8",
              border: "none",
              cursor: "pointer",
              color: "#616150",
              fontSize: "1rem",
              flexShrink: 0,
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* What qualifies */}
          <div>
            <p className="label-tag mb-3">✅ What counts</p>
            <ul className="space-y-2">
              {category.whatQualifies.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "#616150",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "#20A160", flexShrink: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What does not qualify */}
          <div>
            <p className="label-tag mb-3">❌ What does not count</p>
            <ul className="space-y-2">
              {category.whatDoesNot.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "#616150",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "#C0392B", flexShrink: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Kenyan examples */}
          <div>
            <p className="label-tag mb-3">🇰🇪 Kenyan examples</p>
            <div className="space-y-2">
              {category.kenyanExamples.map((ex, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b"
                  style={{ borderColor: "#DDDDC8" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "0.875rem",
                      color: "#616150",
                    }}
                  >
                    {ex.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#003020",
                    }}
                  >
                    ~KES {ex.typical.toLocaleString("en-KE")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: "#D4EDDF",
              border: "1px solid #20A160",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.8125rem",
                color: "#003020",
                lineHeight: 1.6,
              }}
            >
              💡 {category.tipText}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
