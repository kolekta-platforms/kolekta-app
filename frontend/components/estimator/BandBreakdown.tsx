// components/estimator/BandBreakdown.tsx

import { BandResult } from "@/lib/tax-utils";
import { formatKES, formatRatePercent } from "@/lib/tax-utils";

interface BandBreakdownProps {
  bands: BandResult[];
  personalRelief: number;
  grossTax: number;
  netTax: number;
}

export default function BandBreakdown({
  bands,
  personalRelief,
  grossTax,
  netTax,
}: BandBreakdownProps) {
  return (
    <div>
      <p className="label-tag mb-4">How your tax is calculated</p>

      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1.5px solid #DDDDC8" }}
      >
        {/* Band rows */}
        {bands.map((band, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{
              borderColor: "#DDDDC8",
              backgroundColor: i % 2 === 0 ? "#F0F0E0" : "#E8E8D0",
            }}
          >
            <div className="flex items-center gap-3">
              {/* Rate badge */}
              <span
                className="px-2 py-0.5 rounded text-xs font-bold"
                style={{
                  fontFamily: "var(--font-code)",
                  backgroundColor: "#003020",
                  color: "#E0A020",
                  flexShrink: 0,
                }}
              >
                {formatRatePercent(band.rate)}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.8125rem",
                  color: "#616150",
                }}
              >
                {band.label}
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "#003020",
              }}
            >
              {formatKES(band.taxInBand)}
            </span>
          </div>
        ))}

        {/* Gross tax subtotal */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            borderColor: "#DDDDC8",
            backgroundColor: "#E8E8D0",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.8125rem",
              color: "#616150",
            }}
          >
            Gross tax before reliefs
          </span>
          <span
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "#E0A020",
            }}
          >
            {formatKES(grossTax)}
          </span>
        </div>

        {/* Personal relief */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            borderColor: "#DDDDC8",
            backgroundColor: "#D4EDDF",
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "0.875rem" }}>✅</span>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.8125rem",
                color: "#003020",
                fontWeight: 500,
              }}
            >
              Personal relief (automatic deduction)
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "#20A160",
            }}
          >
            − {formatKES(personalRelief)}
          </span>
        </div>

        {/* Net tax total */}
        <div
          className="flex items-center justify-between px-4 py-4"
          style={{ backgroundColor: "#003020" }}
        >
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "#F0F0E0",
            }}
          >
            Estimated tax due
          </span>
          <span
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#E0A020",
            }}
          >
            {formatKES(netTax)}
          </span>
        </div>
      </div>
    </div>
  );
}
