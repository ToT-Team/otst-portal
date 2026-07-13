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
    season: "SEASON I - 2016",
    title: "OTST 2016 GENESIS CUP",
    date: "November 10 - 15, 2016",
    winner: "Taiwan OldSchool",
    prize: "$5,000 TWD",
    viewers: "1,500 Peak",
    description: "The very first Taiwanese Standard Tournament. A grassroots local championship that set the foundation for osu! competitive community leagues in Taiwan.",
    color: "from-neon-mint/10 via-cyber-bg-light/5 to-transparent",
    glowColor: "shadow-neon-mint/10",
    highlight: "Community Initiation"
  },
  {
    id: "02",
    season: "SEASON II - 2017",
    title: "OTST 2017 CLASH OF HEROES",
    date: "August 12 - 18, 2017",
    winner: "Eclipse Esports",
    prize: "$15,000 TWD",
    viewers: "3,200 Peak",
    description: "Expanding the player bracket and adopting double-elimination rules. This season witnessed the legendary finals that cemented regional rivalry.",
    color: "from-neon-blue/15 via-cyber-bg-light/5 to-transparent",
    glowColor: "shadow-neon-blue/10",
    highlight: "Double-Elimination System"
  },
  {
    id: "03",
    season: "SEASON III - 2018",
    title: "OTST 2018 EVOLUTION",
    date: "October 05 - 12, 2018",
    winner: "Apex Predators",
    prize: "$30,000 TWD",
    viewers: "5,800 Peak",
    description: "First tournament introducing custom pool designs, allowing players to show mechanical mastery across complex map variations.",
    color: "from-neon-gold/15 via-cyber-bg-light/5 to-transparent",
    glowColor: "shadow-neon-gold/10",
    highlight: "Custom Mappool Design"
  },
  {
    id: "04",
    season: "SEASON IV - 2019",
    title: "OTST 2019 NEXUS INVITE",
    date: "December 08 - 15, 2019",
    winner: "Nova Syndicate",
    prize: "$50,000 TWD",
    viewers: "8,500 Peak",
    description: "Broadcast capabilities upgraded. An invite-only system bringing together the top 16 local talents for a high-speed showcase event.",
    color: "from-neon-mint/10 via-cyber-bg-light/5 to-transparent",
    glowColor: "shadow-neon-mint/10",
    highlight: "First Live Broadcast"
  },
  {
    id: "05",
    season: "SEASON V - 2020",
    title: "OTST 2020 VIRTUAL ARENA",
    date: "September 14 - 20, 2020",
    winner: "Frostbite Gaming",
    prize: "$70,000 TWD",
    viewers: "14,000 Peak",
    description: "Adapted to global remote conditions with fully optimized streaming production, breaking record player signups and online viewership.",
    color: "from-neon-blue/15 via-cyber-bg-light/5 to-transparent",
    glowColor: "shadow-neon-blue/10",
    highlight: "Fully Virtual Production"
  },
  {
    id: "06",
    season: "SEASON VI - 2021",
    title: "OTST 2021 REBIRTH",
    date: "July 22 - 28, 2021",
    winner: "Ignis Esports",
    prize: "$100,000 TWD",
    viewers: "22,000 Peak",
    description: "Rebuilding the core structure. Introducing regional groups and advanced statistics dashboard for player performance tracking.",
    color: "from-neon-gold/15 via-cyber-bg-light/5 to-transparent",
    glowColor: "shadow-neon-gold/10",
    highlight: "Advanced Stats Hub"
  },
  {
    id: "07",
    season: "SEASON VII - 2022",
    title: "OTST 2022 ASCENDANCY",
    date: "November 05 - 12, 2022",
    winner: "Vortex Masters",
    prize: "$150,000 TWD",
    viewers: "38,000 Peak",
    description: "Introduction of physical hybrid LAN setups for regional semi-final stages, increasing local engagement and community gatherings.",
    color: "from-neon-mint/10 via-cyber-bg-light/5 to-transparent",
    glowColor: "shadow-neon-mint/10",
    highlight: "Hybrid LAN Stages"
  },
  {
    id: "08",
    season: "SEASON VIII - 2023",
    title: "OTST 2023 ELITE INVITATIONAL",
    date: "August 18 - 25, 2023",
    winner: "Rex Dominance",
    prize: "$200,000 TWD",
    viewers: "70,000 Peak",
    description: "The transition to a stadium LAN finals in Taipei. Bringing together elite local players to perform on the main stage before a live audience.",
    color: "from-neon-blue/15 via-cyber-bg-light/5 to-transparent",
    glowColor: "shadow-neon-blue/10",
    highlight: "Live Stage LAN Finals"
  },
  {
    id: "09",
    season: "SEASON IX - 2024",
    title: "OTST 2024 WINTER CUP",
    date: "December 15 - 22, 2024",
    winner: "Alpha Sentinels",
    prize: "$300,000 TWD",
    viewers: "120,000 Peak",
    description: "Our largest cup to date. Features a double-elimination hybrid stage, custom esports mapping, and massive community contributions.",
    color: "from-neon-gold/15 via-cyber-bg-light/5 to-transparent",
    glowColor: "shadow-neon-gold/10",
    highlight: "Record-Breaking Season"
  }
];

const YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

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

  // Jump to specific slide (year index)
  const handleYearClick = (index: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableHeight = rect.height - window.innerHeight;

    // Calculate vertical scroll position corresponding to the year index
    const targetScrollY = containerTop + (index / 8) * scrollableHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });
  };

  return (
    <div ref={containerRef} className="relative h-[900vh] w-full">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cyber-bg-dark flex flex-col justify-center">
        {/* Animated Cyber Background Grid */}
        <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />



        {/* Translating horizontal container */}
        <div 
          className="flex h-full w-[900vw] transition-transform duration-75 ease-out"
          style={{ transform: `translateX(-${scrollProgress * 800}vw)` }}
        >
          {PAST_EVENTS.map((event, index) => {
            // Calculate scale & opacity for each slide based on scroll state
            const targetPos = index * (1 / 8);
            const diff = Math.abs(scrollProgress - targetPos);
            const slideOpacity = Math.max(1 - diff * 7.5, 0.4);
            const slideScale = Math.max(1 - diff * 0.5, 0.9);

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

        {/* Desktop Progress Timeline Indicator (bottom of section) */}
        <div className="hidden md:flex absolute bottom-10 left-12 right-12 z-20 flex-col gap-5">
          {/* Timeline Year Labels */}
          <div className="relative w-full h-6 font-mono text-[10px] sm:text-xs">
            {YEARS.map((year, index) => {
              const targetPos = index * (1 / 8);
              const isPastOrCurrent = scrollProgress >= targetPos - 0.02;
              const isActive = Math.min(Math.max(Math.floor(scrollProgress * 8.99), 0), 8) === index;

              return (
                <button
                  key={year}
                  onClick={() => handleYearClick(index)}
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300 cursor-pointer select-none group border-none bg-transparent outline-none"
                  style={{ left: `${index * 12.5}%` }}
                >
                  <span 
                    className={`transition-all duration-300 group-hover:text-neon-mint group-hover:scale-110 ${
                      isActive 
                        ? "text-neon-mint font-bold scale-110 text-glow-mint" 
                        : isPastOrCurrent 
                          ? "text-white" 
                          : "text-gray-500"
                    }`}
                  >
                    {year}
                  </span>
                  {/* Tick Dot */}
                  <div 
                    className={`w-1.5 h-1.5 rounded-full mt-2.5 transition-all duration-300 group-hover:bg-neon-mint group-hover:scale-125 ${
                      isActive 
                        ? "bg-neon-mint scale-125 shadow-[0_0_8px_rgba(0,245,160,0.8)]" 
                        : isPastOrCurrent 
                          ? "bg-white" 
                          : "bg-gray-700"
                    }`} 
                  />
                </button>
              );
            })}
          </div>

          {/* Progress Solid Bar Track */}
          <div className="w-full h-[2px] bg-white/10 relative rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-neon-mint shadow-[0_0_8px_rgba(0,245,160,0.5)]"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Mobile Vertical Timeline (right side of section) */}
        <div className="flex md:hidden absolute right-3 top-1/2 -translate-y-1/2 z-20 flex-row items-center gap-2.5 h-[280px]">
          {/* Timeline Year Labels */}
          <div className="relative h-full w-10 font-mono text-[9px]">
            {YEARS.map((year, index) => {
              const targetPos = index * (1 / 8);
              const isPastOrCurrent = scrollProgress >= targetPos - 0.02;
              const isActive = Math.min(Math.max(Math.floor(scrollProgress * 8.99), 0), 8) === index;

              return (
                <button
                  key={year}
                  onClick={() => handleYearClick(index)}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 transition-all duration-300 cursor-pointer select-none border-none bg-transparent outline-none text-right justify-end w-full group"
                  style={{ top: `${index * 12.5}%` }}
                >
                  <span 
                    className={`transition-all duration-300 group-hover:text-neon-mint group-hover:scale-110 ${
                      isActive 
                        ? "text-neon-mint font-bold scale-110 text-glow-mint" 
                        : isPastOrCurrent 
                          ? "text-white" 
                          : "text-gray-500"
                    }`}
                  >
                    {year}
                  </span>
                  {/* Tick Dot */}
                  <div 
                    className={`w-1 h-1 rounded-full transition-all duration-300 group-hover:bg-neon-mint group-hover:scale-125 ${
                      isActive 
                        ? "bg-neon-mint scale-125 shadow-[0_0_8px_rgba(0,245,160,0.8)]" 
                        : isPastOrCurrent 
                          ? "bg-white" 
                          : "bg-gray-750"
                    }`} 
                  />
                </button>
              );
            })}
          </div>

          {/* Progress Vertical Bar Track */}
          <div className="w-[2px] h-full bg-white/10 relative rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 w-full bg-neon-mint shadow-[0_0_8px_rgba(0,245,160,0.5)]"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
