const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfLMFTewEIn8ebRjYtvYvEHLtjBHfTolEj1te7GtXwTqni2kg/viewform";

export default function SurveyCard({ className = "" }: { className?: string }) {
  return (
    <a
      href={SURVEY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block no-underline ${className}`}
    >
      <div
        className="rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 group-hover:shadow-lg"
        style={{
          backgroundColor: "#003020",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute top-0 right-0 opacity-10 pointer-events-none"
          style={{
            width: 240,
            height: 240,
            borderRadius: "50%",
            backgroundColor: "#20A160",
            transform: "translate(35%, -35%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 opacity-10 pointer-events-none"
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            backgroundColor: "#E0A020",
            transform: "translate(-40%, 40%)",
          }}
        />

        <div className="relative z-10">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{
              backgroundColor: "#E0A020",
              color: "#003020",
              fontFamily: "var(--font-primary)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Quick Survey
          </span>

          <h3
            className="mb-3 group-hover:text-[#E0A020] transition-colors duration-200"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
              fontWeight: 800,
              color: "#F0F0E0",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Experience yako ya tax imekuaje so far?
          </h3>

          <p
            className="mb-6 max-w-[520px]"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.9375rem",
              color: "#D4EDDF",
              lineHeight: 1.7,
            }}
          >
            Help us shape the product to your needs. A 5–7 minute anonymous
            survey on how creatives navigate tax — no right or wrong answers,
            just your honest experience.
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className="group-hover:translate-x-1 transition-transform duration-200 inline-block font-semibold"
              style={{
                color: "#20A160",
                fontFamily: "var(--font-primary)",
                fontSize: "0.9375rem",
              }}
            >
              Take the Survey →
            </span>
            <span
              style={{
                color: "#8A8A72",
                fontFamily: "var(--font-primary)",
                fontSize: "0.75rem",
              }}
            >
              5–7 min · anonymous
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
