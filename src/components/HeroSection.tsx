"use client";

import React from "react";
import { ChevronDown, Trophy, Cpu } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-cyber-bg-darker">
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

      {/* Tech Corners / Borders */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-neon-mint/40 z-10 hidden sm:block" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-neon-blue/40 z-10 hidden sm:block" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-neon-blue/40 z-10 hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-neon-mint/40 z-10 hidden sm:block" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        {/* Large Logo */}
        <h1 className="relative font-orbitron font-black text-[5rem] sm:text-[8rem] md:text-[11rem] leading-none tracking-tighter uppercase select-none">
          {/* Backdrop Glow */}
          <span className="absolute inset-0 text-neon-blue/40 blur-xl select-none font-orbitron font-black">
            OTST
          </span>
          {/* Main Logo Text with Gradient */}
          <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-neon-mint via-white to-neon-blue">
            OTST
          </span>
        </h1>

        {/* Tagline / Subtitle */}
        <p className="text-gray-300 font-mono tracking-widest text-xs md:text-sm max-w-md md:max-w-xl mx-auto uppercase mb-10 leading-relaxed">
          osu! Taiwanese Standard Tournament
          <span className="block mt-2 text-neon-mint font-bold tracking-[0.3em] text-[10px] md:text-xs">
            Where Legends Collide
          </span>
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
        <span className="font-mono text-[9px] tracking-[0.3em] text-gray-400 uppercase">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 text-neon-mint animate-bounce" />
      </div>
    </section>
  );
}
