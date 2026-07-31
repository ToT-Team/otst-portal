"use client";

import React from "react";
import { ChevronDown, Trophy, Cpu } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden bg-cyber-bg-darker">
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
      <div className="absolute right-4 sm:right-12 font-mono tracking-[0.3em] text-gray-400 text-[10px] sm:text-[11px] uppercase z-20 origin-bottom-right -rotate-90 whitespace-nowrap opacity-80">
        osu! Taiwanese Standard Tournament
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        {/* Large Logo Container (Stacked Outlines) */}
        <div className="group relative mb-6 flex flex-col items-center justify-center z-20 cursor-default">

          {/* Top Outlines */}
          <div
            className="absolute -translate-y-[225%] font-sans font-black italic text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.05em] uppercase select-none text-transparent opacity-20 z-0 pointer-events-none transition-all duration-500 [-webkit-text-stroke:2px_#fefce8] group-hover:[-webkit-text-stroke:2px_#fef08a]"
            style={{ WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 90%)", maskImage: "linear-gradient(to top, black 10%, transparent 90%)" }}
          >
            OTST
          </div>
          <div
            className="absolute -translate-y-[150%] font-sans font-black italic text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.05em] uppercase select-none text-transparent opacity-30 z-0 pointer-events-none transition-all duration-500 [-webkit-text-stroke:2px_#fefce8] group-hover:[-webkit-text-stroke:2px_#fef08a]"
          >
            OTST
          </div>
          <div
            className="absolute -translate-y-[75%] font-sans font-black italic text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.05em] uppercase select-none text-transparent opacity-50 z-0 pointer-events-none transition-all duration-500 [-webkit-text-stroke:2px_#fefce8] group-hover:[-webkit-text-stroke:2px_#fef08a]"
          >
            OTST
          </div>

          {/* Main Solid Text */}
          <h1 className="relative font-sans font-black italic text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.05em] uppercase select-none text-[#fefce8] group-hover:text-[#fef08a] transition-all duration-500 z-10 drop-shadow-[0_0_15px_rgba(254,240,138,0.1)] group-hover:drop-shadow-[0_0_25px_rgba(254,240,138,0.5)]">
            OTST
          </h1>

          {/* Bottom Outlines */}
          <div
            className="absolute translate-y-[75%] font-sans font-black italic text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.05em] uppercase select-none text-transparent opacity-50 z-0 pointer-events-none transition-all duration-500 [-webkit-text-stroke:2px_#fefce8] group-hover:[-webkit-text-stroke:2px_#fef08a]"
          >
            OTST
          </div>
          <div
            className="absolute translate-y-[150%] font-sans font-black italic text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.05em] uppercase select-none text-transparent opacity-30 z-0 pointer-events-none transition-all duration-500 [-webkit-text-stroke:2px_#fefce8] group-hover:[-webkit-text-stroke:2px_#fef08a]"
          >
            OTST
          </div>
          <div
            className="absolute translate-y-[225%] font-sans font-black italic text-[5.5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-[0.05em] uppercase select-none text-transparent opacity-20 z-0 pointer-events-none transition-all duration-500 [-webkit-text-stroke:2px_#fefce8] group-hover:[-webkit-text-stroke:2px_#fef08a]"
            style={{ WebkitMaskImage: "linear-gradient(to bottom, black 10%, transparent 90%)", maskImage: "linear-gradient(to bottom, black 10%, transparent 90%)" }}
          >
            OTST
          </div>

        </div>
      </div>
    </section>
  );
}
