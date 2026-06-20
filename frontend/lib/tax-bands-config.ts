// lib/tax-bands.config.ts
// ─────────────────────────────────────────────────────────────
// IMPORTANT: All rates must be verified by a certified Kenyan
// tax professional before going live.
// Band boundaries use half-open intervals [min, max)
// ─────────────────────────────────────────────────────────────

export interface TaxBand {
  min: number; // inclusive
  max: number | null; // exclusive upper bound; null = no limit
  rate: number; // decimal e.g. 0.10 = 10%
  label: string;
}

export interface TaxConfig {
  effectiveFrom: string;
  effectiveTo: string | null;
  personalRelief: number;
  insuranceReliefRate: number;
  maxInsuranceRelief: number;
  // Turnover Tax
  totRate: number; // 3% of gross revenue
  totMinThreshold: number; // KES 500,000
  totMaxThreshold: number; // KES 15,000,000
  // Installment tax threshold
  installmentTaxThreshold: number; // KES 40,000
  // WHT rates
  whtRates: {
    professional: number; // 5% — consultancy, design, photography
    royalties: number; // 5% — publishers, platforms
    rental: number; // 10% — registered tenants
    winnings: number; // 20% — prizes
    digital: number; // 5% — YouTube, Upwork etc
    construction: number; // 3% — contractors
  };
  bands: TaxBand[];
}

// ── 2026 bands — AWAITING ACCOUNTANT SIGN-OFF ─────────────────
export const TAX_CONFIG_2026: TaxConfig = {
  effectiveFrom: "2026-01-01",
  effectiveTo: null,
  personalRelief: 28800,
  insuranceReliefRate: 0.15,
  maxInsuranceRelief: 60000,
  totRate: 0.03,
  totMinThreshold: 500000,
  totMaxThreshold: 15000000,
  installmentTaxThreshold: 40000,
  whtRates: {
    professional: 0.05,
    royalties: 0.05,
    rental: 0.1,
    winnings: 0.2,
    digital: 0.05,
    construction: 0.03,
  },
  bands: [
    { min: 0, max: 288000, rate: 0.1, label: "First KES 288,000" },
    { min: 288000, max: 388000, rate: 0.25, label: "Next KES 100,000" },
    { min: 388000, max: 6000000, rate: 0.3, label: "Next KES 5,612,000" },
    { min: 6000000, max: 9600000, rate: 0.325, label: "Next KES 3,600,000" },
    { min: 9600000, max: null, rate: 0.35, label: "Above KES 9,600,000" },
  ],
};

export const ACTIVE_TAX_CONFIG = TAX_CONFIG_2026;
