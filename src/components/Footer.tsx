"use client";

import React from "react";
import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-cyber-bg-darker border-t border-white/5 py-12 px-6 md:px-12 overflow-hidden">
      {/* Grid background snippet */}
      <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side: Brand and Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono font-extrabold text-xl tracking-widest text-white uppercase text-glow-mint">
              OTST
            </span>
            <span className="text-[9px] font-mono text-neon-mint px-1.5 py-0.5 rounded border border-neon-mint/30 bg-neon-mint/5">
              V2.6
            </span>
          </div>
          <p className="text-gray-500 font-mono text-xs max-w-sm">
            Offline To Online Synchronized Tournaments. Empowering next-generation competitive leagues and player tracking systems.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4">
          {/* X / Twitter */}
          <a
            href="#"
            className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-neon-mint hover:border-neon-mint/40 hover:shadow-[0_0_10px_rgba(0,245,160,0.2)] transition-all cursor-pointer"
            aria-label="Twitter"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* Discord */}
          <a
            href="#"
            className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/40 hover:shadow-[0_0_10px_rgba(0,153,255,0.2)] transition-all cursor-pointer"
            aria-label="Discord"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c1.9-1.4,3.74-2.92,5.5-4.5a75.41,75.41,0,0,0,67,0c1.76,1.58,3.6,3.1,5.5,4.5a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.06-18.83C129,54.65,122.83,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.92,46,53.92,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.16,46,96.16,53,91,65.69,84.69,65.69Z" />
            </svg>
          </a>
          {/* Twitch */}
          <a
            href="#"
            className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-neon-gold hover:border-neon-gold/40 hover:shadow-[0_0_10px_rgba(255,170,0,0.2)] transition-all cursor-pointer"
            aria-label="Twitch"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M11.571 4.714h1.715v5.143H11.57zm3.002 0H16.29v5.143h-1.717zm5.143-3.001v12.001l-4.716 4.715h-3.858l-2.142 2.143H6.858v-2.143H2.571V1.713zm-1.715 10.286V3.429H4.286v10.286h3.429v2.143l2.143-2.143h5.571z" />
            </svg>
          </a>
          {/* GitHub */}
          <a
            href="#"
            className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all cursor-pointer"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>

        {/* Right Side: Status and Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right font-mono text-xs text-gray-500">
          <div className="flex items-center gap-2 mb-2 bg-cyber-bg-dark border border-white/5 px-3 py-1 rounded-full">
            <Cpu className="w-3.5 h-3.5 text-green-400 animate-pulse" />
            <span className="text-[10px] tracking-widest text-green-400">SYS: OPERATIONAL</span>
          </div>
          <div>
            © {new Date().getFullYear()} OTST. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
