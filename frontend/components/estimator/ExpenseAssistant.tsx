// components/estimator/ExpenseAssistant.tsx
"use client";

import { useState } from "react";
import { EXPENSE_CATEGORIES } from "@/lib/expense-categories";
import {
  formatKES,
  getTaxSavingForExpense,
  parseAmount,
  EXPENSE_LIMITS,
} from "@/lib/tax-utils";
import ExpenseTooltip from "./ExpenseTooltip";

interface ExpenseAssistantProps {
  expenses: Record<string, number>;
  grossIncome: number;
  onExpenseChange: (id: string, value: number) => void;
  disabled: boolean;
}

export default function ExpenseAssistant({
  expenses,
  grossIncome,
  onExpenseChange,
  disabled,
}: ExpenseAssistantProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tooltipCategory, setTooltipCategory] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [rawValues, setRawValues] = useState<Record<string, string>>({});

  const totalExpenses = Object.values(expenses).reduce((s, v) => s + v, 0);
  const filledCount = Object.values(expenses).filter((v) => v > 0).length;

  const handleToggle = (id: string) => {
    if (disabled) return;
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleChange = (id: string, input: string) => {
    const clean = input.replace(/[^0-9]/g, "");
    setRawValues((prev) => ({ ...prev, [id]: clean }));
    const parsed = parseAmount(clean);
    if (parsed <= EXPENSE_LIMITS.max) {
      onExpenseChange(id, parsed);
    }
  };

  const activeTooltipCategory = EXPENSE_CATEGORIES.find(
    (c) => c.id === tooltipCategory,
  );

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "1.0625rem",
              fontWeight: 700,
              color: disabled ? "#8A8A72" : "#003020",
              transition: "color 0.2s ease",
            }}
          >
            Find your deductions
          </p>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.875rem",
              color: "#8A8A72",
              marginTop: "2px",
            }}
          >
            {disabled
              ? "Enter your income above to unlock"
              : filledCount > 0
                ? `${filledCount} categor${filledCount === 1 ? "y" : "ies"} added · ${formatKES(totalExpenses)} total`
                : "Each deduction reduces your tax bill"}
          </p>
        </div>

        {/* Total badge */}
        {totalExpenses > 0 && (
          <div
            className="px-3 py-1.5 rounded-full flex-shrink-0"
            style={{
              backgroundColor: "#D4EDDF",
              border: "1px solid #20A160",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#003020",
                whiteSpace: "nowrap",
              }}
            >
              − {formatKES(totalExpenses)}
            </p>
          </div>
        )}
      </div>

      {/* Category list */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: "1.5px solid #DDDDC8",
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? "none" : "auto",
          transition: "opacity 0.2s ease",
        }}
      >
        {EXPENSE_CATEGORIES.map((category, index) => {
          const value = expenses[category.id] || 0;
          const isExpanded = expanded === category.id;
          const isFocused = focused === category.id;
          const saving = getTaxSavingForExpense(value, grossIncome);
          const rawVal = rawValues[category.id] ?? "";
          const displayVal = isFocused
            ? rawVal
            : value > 0
              ? value.toLocaleString("en-KE")
              : "";
          const isLast = index === EXPENSE_CATEGORIES.length - 1;

          return (
            <div
              key={category.id}
              style={{
                borderBottom: isLast ? "none" : "1px solid #DDDDC8",
              }}
            >
              {/* Category row — always visible */}
              <button
                onClick={() => handleToggle(category.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-150"
                style={{
                  backgroundColor:
                    value > 0 ? "#E8F5EE" : isExpanded ? "#E8E8D0" : "#F0F0E0",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "1.125rem", flexShrink: 0 }}>
                    {category.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "0.9rem",
                      fontWeight: value > 0 ? 600 : 400,
                      color: value > 0 ? "#003020" : "#616150",
                    }}
                  >
                    {category.label}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Value badge */}
                  {value > 0 && (
                    <span
                      style={{
                        fontFamily: "var(--font-code)",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#20A160",
                      }}
                    >
                      {formatKES(value)}
                    </span>
                  )}

                  {/* Chevron */}
                  <span
                    style={{
                      color: "#8A8A72",
                      fontSize: "0.75rem",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      display: "inline-block",
                    }}
                  >
                    ▼
                  </span>
                </div>
              </button>

              {/* Expanded input panel */}
              {isExpanded && (
                <div
                  className="px-4 pb-4 pt-3"
                  style={{ backgroundColor: "#E8E8D0" }}
                >
                  {/* What counts link */}
                  <button
                    onClick={() => setTooltipCategory(category.id)}
                    className="mb-3 text-xs font-medium transition-colors duration-150"
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "#20A160",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    What counts as {category.label.toLowerCase()}? →
                  </button>

                  {/* Amount input */}
                  <div
                    className="flex items-center rounded-lg overflow-hidden"
                    style={{
                      border: isFocused
                        ? "1.5px solid #20A160"
                        : "1.5px solid #DDDDC8",
                      backgroundColor: "#F0F0E0",
                      transition: "border-color 0.15s ease",
                    }}
                  >
                    <div
                      className="px-3 py-3 flex-shrink-0 select-none"
                      style={{
                        fontFamily: "var(--font-code)",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#8A8A72",
                        borderRight: "1px solid #DDDDC8",
                      }}
                    >
                      KES
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={displayVal}
                      onChange={(e) =>
                        handleChange(category.id, e.target.value)
                      }
                      onFocus={() => {
                        setFocused(category.id);
                        setRawValues((prev) => ({
                          ...prev,
                          [category.id]: value > 0 ? value.toString() : "",
                        }));
                      }}
                      onBlur={() => setFocused(null)}
                      placeholder="0"
                      autoComplete="off"
                      className="flex-1 text-right bg-transparent outline-none"
                      style={{
                        fontFamily: "var(--font-code)",
                        fontSize: "1.125rem",
                        fontWeight: 700,
                        color: "#003020",
                        padding: "10px 12px",
                        border: "none",
                        letterSpacing: "-0.02em",
                      }}
                      aria-label={`${category.label} annual expenses in KES`}
                    />
                  </div>

                  {/* Tip text */}
                  <p
                    className="mt-2 text-xs"
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "#8A8A72",
                      lineHeight: 1.5,
                    }}
                  >
                    {category.tipText}
                  </p>

                  {/* Savings nudge — Feature 4 */}
                  {saving > 0 && (
                    <div
                      className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg"
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
                          lineHeight: 1.4,
                        }}
                      >
                        Claiming this saves you{" "}
                        <strong
                          style={{
                            fontFamily: "var(--font-code)",
                            color: "#20A160",
                          }}
                        >
                          {formatKES(saving)}
                        </strong>{" "}
                        in tax
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tooltip modal */}
      {activeTooltipCategory && (
        <ExpenseTooltip
          category={activeTooltipCategory}
          onClose={() => setTooltipCategory(null)}
        />
      )}
    </div>
  );
}
