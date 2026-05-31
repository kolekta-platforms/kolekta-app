import React from "react";
import Image from "next/image";
import MarketingHero from "@/sections/marketing/hero/MarketingHero";

const Page = () => {
  return (
    <div className="overflow-hidden relative w-full min-h-[calc(100vh-56px)]">
      <div className="max-container">
        {/* Art — top right */}
      <div className="absolute -top-4 right-0 pointer-events-none z-0">
        <Image
          src="/Kolekta-art-1.png"
          alt=""
          width={320}
          height={320}
          className="object-contain w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px]"
        />
      </div>

      {/* Art — top left, rotated 180deg */}
      <div
        className="absolute -top-6 left-0 pointer-events-none z-0"
        style={{  }}
      >
        <Image
          src="/images/kolekta-art-2.png"
          alt=""
          width={280}
          height={280}
          className="object-contain w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px]"
        />
      </div>

       {/* ── Blob 1 — bottom left ──────────────────── */}
            {/* <div
              className="absolute bottom-0 -left-20 pointer-events-none z-0 ring-1 ring-red-500"
              style={{ width: 340, height: 240 }}
            >
              <Image
                src="/images/blob-uno.png"
                alt="Blob"
                width={340}
                height={240}
                className=""
              />
            </div> */}
      
            {/* ── Blob 2 — mid right behind image ──────── */}
            {/* <div
              className="absolute top-10 right-0 pointer-events-none z-0"
              style={{ width: 300, height: 300 }}
            >
              <svg
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M240 50 C300 90 310 180 260 240 C210 300 110 310 60 260 C10 210 20 110 70 60 C120 10 180 10 240 50Z"
                  fill="#20A160"
                  fillOpacity="0.12"
                />
              </svg>
            </div> */}

      {/* Hero section — padding lives here, not inside the hero component */}
      <section className="relative z-20 padding">
        <MarketingHero />
      </section>
      </div>
    </div>
  );
};

export default Page;
