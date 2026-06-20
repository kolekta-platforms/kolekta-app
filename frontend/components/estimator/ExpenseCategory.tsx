// components/estimator/ExpenseCategory.tsx
"use client";

import { useState } from "react";
import { ExpenseCategory as ExpenseCategoryType } from "@/lib/expense-categories";
import {
  parseAmount,
  getTaxSavingForExpense,
  EXPENSE_LIMITS,
} from "@/lib/tax-utils";
import ExpenseTooltip from "./ExpenseTooltip";
import SavingsNudge from "./SavingsNudge";

interface ExpenseCategoryProps {
  category: ExpenseCategoryType;
  value: number;
  grossIncome: number;
  onChange: (id: string, value: number) => void;
}

export default function ExpenseCategory({
  category,
  value,
  grossIncome,
  onChange,
}: ExpenseCategoryProps) {
  const [raw, setRaw] = useState(value > 0 ? value.toString() : "");
  const [focused, setFocused] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saving = getTaxSavingForExpense(value, grossIncome);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    setRaw(input);
    setError(null);

    const parsed = parseAmount(input);
    if (parsed > EXPENSE_LIMITS.max) {
      setError("Amount seems too high — please double check");
      return;
    }
    onChange(category.id, parsed);
  };

  const displayValue = focused
    ? raw
    : value > 0
      ? value.toLocaleString("en-KE")
      : "";

  return (
    <div
      className="relative rounded-xl p-4 transition-all duration-200"
      style={{
        backgroundColor: value > 0 ? "#E8F5EE" : "#E8E8D0",
        border: value > 0 ? "1.5px solid #20A160" : "1.5px solid #DDDDC8",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <span className="mt-0.5 flex-shrink-0" style={{ fontSize: "1.25rem" }}>
          {category.icon}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Label row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <label
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "#003020",
              }}
            >
              {category.label}
            </label>

            {/* What counts trigger */}
            <button
              onClick={() => setTooltipOpen(true)}
              className="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full transition-colors duration-150"
              style={{
                fontFamily: "var(--font-primary)",
                backgroundColor: "#DDDDC8",
                color: "#616150",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              What counts? →
            </button>
          </div>

          {/* Input */}
          <div className="relative">
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold pointer-events-none"
              style={{
                fontFamily: "var(--font-code)",
                color: focused || value > 0 ? "#003020" : "#8A8A72",
              }}
            >
              KES
            </div>
            <input
              type="text"
              inputMode="numeric"
              value={displayValue}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="0"
              className="w-full rounded-lg text-right"
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#003020",
                backgroundColor: "#F0F0E0",
                border: error
                  ? "1.5px solid #C0392B"
                  : focused
                    ? "1.5px solid #20A160"
                    : "1.5px solid transparent",
                padding: "0.625rem 0.75rem 0.625rem 3rem",
                outline: "none",
                transition: "border-color 0.15s ease",
              }}
              aria-label={`${category.label} expenses`}
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="mt-1 text-xs"
              style={{ fontFamily: "var(--font-primary)", color: "#C0392B" }}
            >
              {error}
            </p>
          )}

          {/* Savings nudge — Feature 4 */}
          <SavingsNudge saving={saving} categoryLabel={category.label} />
        </div>
      </div>

      {/* Tooltip */}
      {tooltipOpen && (
        <ExpenseTooltip
          category={category}
          onClose={() => setTooltipOpen(false)}
        />
      )}
    </div>
  );
}
