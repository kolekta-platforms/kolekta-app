// components/estimator/IncomeInput.tsx
"use client";

import { useState } from "react";
import { parseAmount, formatKES, INCOME_LIMITS } from "@/lib/tax-utils";

interface IncomeInputProps {
  value: number;
  onChange: (value: number) => void;
}

const QUICK_AMOUNTS = [300000, 600000, 1200000, 2400000];

export default function IncomeInput({ value, onChange }: IncomeInputProps) {
  const [raw, setRaw] = useState(value > 0 ? value.toString() : "");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    setRaw(input);
    setError(null);
    const parsed = parseAmount(input);
    if (parsed > INCOME_LIMITS.max) {
      setError("Please enter a realistic income amount");
      return;
    }
    onChange(parsed);
  };

  const handleQuickSelect = (amount: number) => {
    setRaw(amount.toString());
    setError(null);
    onChange(amount);
  };

  // Show formatted with commas when not focused
  const displayValue = focused
    ? raw
    : value > 0
      ? value.toLocaleString("en-KE")
      : "";

  return (
    <div>
      {/* Label */}
      <label
        htmlFor="gross-income"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "1.0625rem",
          fontWeight: 700,
          color: "#003020",
          display: "block",
          marginBottom: "8px",
        }}
      >
        What did you earn this year?
      </label>
      <p
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.875rem",
          color: "#8A8A72",
          marginBottom: "16px",
          lineHeight: 1.5,
        }}
      >
        Total income from freelance, contract, and business work. Annual figure.
      </p>

      {/* Input */}
      <div
        className="flex items-center rounded-xl overflow-hidden"
        style={{
          border: error
            ? "2px solid #C0392B"
            : focused
              ? "2px solid #20A160"
              : "2px solid #DDDDC8",
          backgroundColor: "#E8E8D0",
          transition: "border-color 0.15s ease",
        }}
      >
        {/* KES prefix */}
        <div
          className="px-4 py-4 flex-shrink-0 select-none"
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "1rem",
            fontWeight: 700,
            color: focused || value > 0 ? "#003020" : "#8A8A72",
            borderRight: "1.5px solid #DDDDC8",
            lineHeight: 1,
          }}
        >
          KES
        </div>

        <input
          id="gross-income"
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="0"
          autoComplete="off"
          className="flex-1 text-right bg-transparent outline-none"
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            fontWeight: 700,
            color: "#003020",
            padding: "14px 16px",
            letterSpacing: "-0.02em",
            border: "none",
          }}
          aria-label="Annual gross income in KES"
          aria-describedby={error ? "income-error" : undefined}
        />
      </div>

      {/* Error */}
      {error && (
        <p
          id="income-error"
          className="mt-2 text-sm"
          role="alert"
          style={{ fontFamily: "var(--font-primary)", color: "#C0392B" }}
        >
          {error}
        </p>
      )}

      {/* Quick select amounts */}
      <div className="flex flex-wrap gap-2 mt-3">
        {QUICK_AMOUNTS.map((amount) => (
          <button
            key={amount}
            onClick={() => handleQuickSelect(amount)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
            style={{
              fontFamily: "var(--font-primary)",
              backgroundColor: value === amount ? "#003020" : "#DDDDC8",
              color: value === amount ? "#F0F0E0" : "#616150",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0",
            }}
          >
            {formatKES(amount)}
          </button>
        ))}
      </div>
    </div>
  );
}
