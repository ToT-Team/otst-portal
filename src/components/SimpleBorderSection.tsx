"use client";

import React from "react";

export default function SimpleBorderSection() {
  return (
    <section className="relative min-h-[60vh] w-full py-20 px-6 flex items-center justify-center bg-cyber-bg-darker overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

      {/* Outlined Tech Rectangle */}
      <div className="relative max-w-xl w-full p-10 md:p-14 border border-neon-blue/30 rounded-lg bg-cyber-bg-dark/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,210,255,0.05)] text-center flex flex-col items-center justify-center group hover:border-neon-mint/50 transition-all duration-500">
        {/* Subtle glowing tech corners on the rectangle */}
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-neon-mint/60" />
        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t border-r border-neon-mint/60" />
        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b border-l border-neon-mint/60" />
        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-neon-mint/60" />

        {/* Center Simple Text */}
        <h3 className="font-oxanium font-extrabold text-lg md:text-xl tracking-[0.25em] text-white uppercase mb-3">
          OTST ARENA
        </h3>
        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-gray-500 uppercase">
          Next Phase Coming Soon • Connection Established
        </p>
      </div>
    </section>
  );
}
