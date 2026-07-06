"use client";

import React, { useRef, useState, useEffect } from "react";
import { Calendar, Trophy, Users, Eye, Target } from "lucide-react";

interface EventData {
  id: string;
  season: string;
  title: string;
  date: string;
  winner: string;
  prize: string;
  viewers: string;
  description: string;
  color: string;
  glowColor: string;
  highlight: string;
}

const PAST_EVENTS: EventData[] = [
  {
    id: "01",
    season: "SEASON I",
    title: "OTST 2024 WINTER CUP",
    date: "December 15 - 22, 2024",
    winner: "Alpha Sentinels",
    prize: "$50,000 USD",
    viewers: "24,000 Peak",
    description: "The inaugural winter cup that started it all. 32 professional squads clashed in a double-elimination format over 7 days of high-intensity competitive play.",
    color: "from-neon-blue/15 via-neon-mint/5 to-transparent",
    glowColor: "shadow-neon-mint/20",
    highlight: "Double-Elimination Bracket"
  },
  {
    id: "02",
    season: "SEASON II",
    title: "OTST 2025 SUMMER INVITATIONAL",
    date: "July 12 - 18, 2025",
    winner: "Rex Dominance",
    prize: "$80,000 USD",
    viewers: "65,000 Peak",
    description: "A mid-year showstopper inviting top regional champions. The tournament featured the first-ever physical LAN final stage, setting new production standards.",
    color: "from-neon-blue/20 via-cyber-bg-light/10 to-transparent",
    glowColor: "shadow-neon-blue/20",
    highlight: "Offline LAN Arena Stage"
  },
  {
    id: "03",
    season: "SEASON III",
    title: "OTST 2026 SPRING CHAMPIONSHIP",
    date: "April 05 - 12, 2026",
    winner: "Vortex Esports",
    prize: "$120,000 USD",
    viewers: "110,000 Peak",
    description: "Our largest tournament. Blending online open qualifiers with a live crowd stadium finale, witnessing record-breaking match times and legendary comebacks.",
    color: "from-neon-gold/15 via-cyber-bg-light/10 to-transparent",
    glowColor: "shadow-neon-gold/20",
    highlight: "Stadium Main Stage Event"
  }
];

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableHeight = rect.height - windowHeight;

      if (scrollableHeight <= 0) return;

      // Calculate progress relative to container top alignment
      const progress = -rect.top / scrollableHeight;
      const clampedProgress = Math.min(Math.max(progress, 0), 1);
      setScrollProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cyber-bg-dark flex flex-col justify-center">
        {/* Animated Cyber Background Grid */}
        <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

        {/* Section Header */}
        <div className="absolute top-10 left-6 md:left-12 z-20 font-mono">
          <span className="text-[10px] tracking-[0.4em] text-neon-mint uppercase block mb-1">
            Historical Records
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold tracking-wider uppercase text-white flex items-center gap-3">
            <Target className="w-5 h-5 text-neon-mint animate-pulse" />
            Past Tournaments
          </h2>
        </div>

        {/* Slide Counter */}
        <div className="absolute top-10 right-6 md:right-12 z-20 font-mono text-right">
          <span className="text-[10px] tracking-[0.2em] text-gray-500 block">CURRENT RECORD</span>
          <span className="text-xl md:text-2xl font-extrabold text-neon-mint">
            {`0${Math.min(Math.floor(scrollProgress * 2.99) + 1, 3)}`}
          </span>
          <span className="text-gray-600 text-sm"> / 03</span>
        </div>

        {/* Translating horizontal container */}
        <div 
          className="flex h-full w-[300vw] transition-transform duration-75 ease-out"
          style={{ transform: `translateX(-${scrollProgress * 200}vw)` }}
        >
          {PAST_EVENTS.map((event, index) => {
            // Calculate scale & opacity for each slide based on scroll state
            const targetPos = index * 0.5;
            const diff = Math.abs(scrollProgress - targetPos);
            const slideOpacity = Math.max(1 - diff * 2.5, 0.4);
            const slideScale = Math.max(1 - diff * 0.15, 0.9);

            return (
              <div 
                key={event.id}
                className="w-screen h-full flex-shrink-0 flex items-center justify-center px-4 md:px-12 relative"
                style={{
                  opacity: slideOpacity,
                  transform: `scale(${slideScale})`,
                  transition: "opacity 0.2s ease-out, transform 0.2s ease-out"
                }}
              >
                {/* Background Gradient aura */}
                <div className={`absolute inset-0 bg-gradient-to-r ${event.color} z-0 opacity-80 pointer-events-none`} />

                {/* Event Card */}
                <div className={`w-full max-w-5xl bg-cyber-bg-darker/70 backdrop-blur-md border border-white/5 rounded-xl p-6 md:p-12 z-10 flex flex-col md:flex-row gap-8 items-center shadow-2xl ${event.glowColor}`}>
                  
                  {/* Left Column: Trophy & Huge Season ID */}
                  <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-white/10">
                    <span className="font-mono text-xs tracking-[0.4em] text-neon-mint uppercase mb-2">
                      {event.season}
                    </span>
                    <div className="w-24 h-24 rounded-full border border-neon-mint/20 bg-cyber-bg-light/40 flex items-center justify-center mb-4 relative group shadow-[0_0_15px_rgba(0,245,160,0.1)]">
                      <Trophy className="w-10 h-10 text-neon-mint animate-pulse" />
                    </div>
                    <span className="font-mono text-xs text-gray-400">WINNER</span>
                    <span className="font-mono font-bold text-lg text-white mt-1 uppercase text-glow-mint">
                      {event.winner}
                    </span>
                  </div>

                  {/* Right Column: Title and Stats Grid */}
                  <div className="w-full md:w-2/3 flex flex-col">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-neon-blue px-2 py-0.5 rounded border border-neon-blue/20 bg-neon-blue/5">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </span>
                      <span className="font-mono text-[10px] text-neon-mint px-2 py-0.5 rounded border border-neon-mint/20 bg-neon-mint/5">
                        {event.highlight}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-extrabold tracking-wider text-white uppercase font-mono mb-4">
                      {event.title}
                    </h3>

                    <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-neon-mint" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-gray-500 uppercase">Prize Pool</div>
                          <div className="text-sm font-mono font-bold text-white">{event.prize}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Eye className="w-5 h-5 text-neon-blue" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-gray-500 uppercase">Viewership</div>
                          <div className="text-sm font-mono font-bold text-white">{event.viewers}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Global Progress Scrollbar Indicator (bottom of section) */}
        <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 z-20 flex items-center gap-4">
          <span className="font-mono text-[9px] text-gray-500">START</span>
          <div className="flex-1 h-[2px] bg-white/10 relative rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-mint to-neon-blue shadow-[0_0_8px_rgba(0,245,160,0.6)]"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="font-mono text-[9px] text-gray-500">END</span>
        </div>
      </div>
    </div>
  );
}
