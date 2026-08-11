"use client";

import React from "react";
import Link from "next/link";

export default function SimpleBorderSection() {
  return (
    <section className="relative min-h-[60vh] w-full py-20 px-6 flex items-center justify-center bg-cyber-bg-darker overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

      {/* Outlined Tech Rectangle (Clickable Link) */}
      <Link href="/tournaments" className="relative max-w-xl w-full p-10 md:p-14 border border-gray-200/30 rounded-lg bg-cyber-bg-dark/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,163,255,0.05)] text-center flex flex-col items-center justify-center group hover:border-gray-200/80 hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] transition-all duration-500 cursor-pointer">
        {/* Center Simple Text */}
        <h3 className="font-sans font-black text-2xl tracking-[0.15em] text-gray-500 group-hover:text-white uppercase mb-3 transition-colors duration-300">
          更多台灣賽事
        </h3>
        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-gray-500 uppercase group-hover:text-gray-300 transition-colors duration-300">
          Discover Local Championships
        </p>
      </Link>
    </section>
  );
}
