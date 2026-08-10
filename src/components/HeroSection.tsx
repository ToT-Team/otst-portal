"use client";

import React, { useRef, useEffect } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      sectionRef.current.style.setProperty("--mouse-x", `${x}px`);
      sectionRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Set initial position to center
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      sectionRef.current.style.setProperty("--mouse-x", `${rect.width / 2}px`);
      sectionRef.current.style.setProperty("--mouse-y", `${rect.height / 2}px`);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 z-0 h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none z-0" />

      {/* Ambient Neon Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-neon-mint/15 rounded-full blur-[100px] md:blur-[160px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-neon-blue/15 rounded-full blur-[100px] md:blur-[160px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: "2s" }} />

      {/* Scanline Cyber Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-repeat" style={{
        backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
        backgroundSize: "100% 4px"
      }} />

      {/* Bottom Right Vertical Text */}
      <div className="absolute right-[32px] bottom-[32px] z-20 w-0 h-0">
        <div className="absolute bottom-0 left-0 font-mono tracking-[0.2em] text-gray-400 uppercase whitespace-nowrap opacity-80 origin-bottom-left -rotate-90 text-[clamp(10px,1.5vh,14px)]">
          osu! Taiwanese Standard Tournament
        </div>
      </div>

      {/* Layer 1: Main Content (Unmasked) */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <div className="group relative mb-6 flex flex-col items-center justify-center z-20 cursor-default">
          {/* Main Solid Text */}
          <h1 className="relative noto-sans-tc-hero text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.03em] select-none text-[#fefce8] z-10">
            OTST
          </h1>
        </div>
      </div>

      {/* Layer 2: Outlines Content (Masked by Cursor) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center overflow-hidden"
        style={{
          WebkitMaskImage: `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`
        }}
      >
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
          <div className="relative mb-6 flex flex-col items-center justify-center z-20 cursor-default">

            {/* Top Outlines */}
            {Array.from({ length: 6 }).map((_, idx) => {
              const i = 6 - idx;
              const opacity = i === 1 ? 0.5 : i === 2 ? 0.3 : i === 3 ? 0.2 : Math.max(0.01, 0.2 - (i - 3) * 0.03);
              return (
                <div
                  key={`top-${i}`}
                  className="absolute noto-sans-tc-hero text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.03em] select-none text-transparent z-0 pointer-events-none transition-all duration-500 [-webkit-text-stroke:2px_#fefce8]"
                  style={{ transform: `translateY(-${i * 75}%)`, opacity }}
                >
                  OTST
                </div>
              );
            })}

            {/* Invisible Main Text to keep proportions and spacing identical */}
            <h1 className="relative noto-sans-tc-hero text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.03em] select-none text-transparent opacity-0 z-10">
              OTST
            </h1>

            {/* Bottom Outlines */}
            {Array.from({ length: 6 }).map((_, idx) => {
              const step = idx + 1;
              const opacity = step === 1 ? 0.5 : step === 2 ? 0.3 : step === 3 ? 0.2 : Math.max(0.01, 0.2 - (step - 3) * 0.03);
              return (
                <div
                  key={`bottom-${step}`}
                  className="absolute noto-sans-tc-hero text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.03em] select-none text-transparent z-0 pointer-events-none transition-all duration-500 [-webkit-text-stroke:2px_#fefce8]"
                  style={{ transform: `translateY(${step * 75}%)`, opacity }}
                >
                  OTST
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}
