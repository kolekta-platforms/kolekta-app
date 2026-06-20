// app/estimator/page.tsx
import type { Metadata } from "next";
import EstimatorTool from "@/sections/estimator/EstimatorTool";
import EducationSection from "@/sections/estimator/EducationSection";
import DisclaimerBox from "@/sections/estimator/DisclaimerBox";
import { ACTIVE_TAX_CONFIG } from "@/lib/tax-bands-config";

export const metadata: Metadata = {
  title: "Tax Estimator",
  description:
    "Estimate your annual tax as a Kenyan creative or freelancer. Free, anonymous, no login required.",
};

export default function EstimatorPage() {
  return (
    <div className="relative">
      {/* Gold top accent */}
      <div className="w-full h-[3px]" style={{ backgroundColor: "#E0A020" }} />

      <div className="max-container padding-x">
        {/* Page header */}
        <div className="pt-10 pb-8 md:pt-14 md:pb-10">
          <span className="label-tag">
            Free · Anonymous · No login required
          </span>
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
            Know your tax.{" "}
            <span style={{ color: "#20A160" }}>In 10 seconds.</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "1rem",
              color: "#616150",
              lineHeight: 1.7,
              maxWidth: "500px",
            }}
          >
            Enter your income and expenses. Your estimated tax appears instantly
            — using current KRA {ACTIVE_TAX_CONFIG.effectiveFrom.slice(0, 4)}{" "}
            rates.
          </p>
        </div>

        {/* Tool */}
        <div className="pb-12 border-b" style={{ borderColor: "#DDDDC8" }}>
          <EstimatorTool />
        </div>

        {/* Mobile disclaimer */}
        <div className="lg:hidden py-8">
          <DisclaimerBox />
        </div>

        {/* Education section */}
        <EducationSection />
      </div>
    </div>
  );
}
