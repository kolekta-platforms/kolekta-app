"use client";

import { useEffect, useState } from "react";

const rotatingPhrases = [
  "craft stories that shape the culture",
  "engineer multisensory experiences",
  "are the soundtrack to movements",
  "make the imagined come to life",
  "chase your dreams tirelessly",
];

const TextRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      //   Fade out
      setIsVisible(false);

      // After fade out, change the phrase
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % rotatingPhrases.length,
        );
        setIsVisible(true);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-xl" style={{ fontFamily: "var(--font-family)" }}>
      {/*  "You" stays constant*/}
      <span style={{ color: "var(--color-kolekta-green-dark)" }}>You </span>

      {/*  Rotating phrase*/}
      <span
        style={{
          color: "var(--color-kolekta-green)",
          display: "inline",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        {rotatingPhrases[currentIndex]}
      </span>
    </h1>
  );
};
export default TextRotator;
