"use client";

import React, { useState, useRef } from "react";
import { Calendar, Trophy, Users, Eye } from "lucide-react";

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
  }
];

const YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

export default function HorizontalScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState<number | null>(null);

  // Real-time slider swipe/drag states
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const swipeStartX = useRef(0);
  const swipeStartY = useRef(0);

  const handleYearClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, 8));
  };

  // Desktop Timeline Drag Handler
  const startDragDesktop = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const handleDragMove = (moveEvent: MouseEvent | TouchEvent) => {
      if (!desktopTrackRef.current) return;
      const rect = desktopTrackRef.current.getBoundingClientRect();
      const clientX = "touches" in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const progress = (clientX - rect.left) / rect.width;
      const clamped = Math.min(Math.max(progress, 0), 1);

      setDragProgress(clamped);
      setActiveIndex(Math.round(clamped * 8));
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      setDragProgress(null);
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);
  };

  // Click direct move on track - Desktop
  const handleTrackClickDesktop = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".pointer-handle")) return;

    if (!desktopTrackRef.current) return;
    const rect = desktopTrackRef.current.getBoundingClientRect();
    const progress = (e.clientX - rect.left) / rect.width;
    const clamped = Math.min(Math.max(progress, 0), 1);
    setActiveIndex(Math.round(clamped * 8));
  };

  // Click direct move on track - Mobile
  const handleTrackClickMobile = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mobileTrackRef.current) return;
    const rect = mobileTrackRef.current.getBoundingClientRect();
    const progress = (e.clientY - rect.top) / rect.height;
    const clamped = Math.min(Math.max(progress, 0), 1);
    setActiveIndex(Math.round(clamped * 8));
  };

  // Swipe / Drag Gestures on Content Area (Real-time Follow-and-Slide)
  const handleSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("a")) return;

    setIsSwiping(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    swipeStartX.current = clientX;
    swipeStartY.current = clientY;
    setSwipeOffset(0);

    const handleSwipeMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = "touches" in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = "touches" in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const diffX = currentX - swipeStartX.current;
      const diffY = currentY - swipeStartY.current;

      // Only track horizontal drag if horizontal motion is dominant (blocks vertical scroll interference)
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 10) {
          if (moveEvent.cancelable) moveEvent.preventDefault();
        }
        setSwipeOffset(diffX);
      }
    };

    const handleSwipeEndEvent = (endEvent: MouseEvent | TouchEvent) => {
      setIsSwiping(false);

      const currentX = "changedTouches" in endEvent ? endEvent.changedTouches[0].clientX : (endEvent as MouseEvent).clientX;
      const diffX = currentX - swipeStartX.current;

      // Reset swipe offset
      setSwipeOffset(0);

      // Snap to slide threshold (60px)
      if (Math.abs(diffX) > 60) {
        if (diffX < 0) {
          setActiveIndex((prev) => Math.min(prev + 1, 8));
        } else {
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
      }

      window.removeEventListener("mousemove", handleSwipeMove);
      window.removeEventListener("mouseup", handleSwipeEndEvent);
      window.removeEventListener("touchmove", handleSwipeMove);
      window.removeEventListener("touchend", handleSwipeEndEvent);
    };

    window.addEventListener("mousemove", handleSwipeMove);
    window.addEventListener("mouseup", handleSwipeEndEvent);
    window.addEventListener("touchmove", handleSwipeMove, { passive: false });
    window.addEventListener("touchend", handleSwipeEndEvent);
  };

  const currentProgress = isDragging && dragProgress !== null ? dragProgress : activeIndex / 8;
  const transitionClass = isDragging ? "transition-none" : "transition-all duration-500 ease-out";

  // Compute horizontal translate calculation for real-time sliding
  const translateStyle = isSwiping
    ? `calc(-${activeIndex * 100}% + ${swipeOffset}px)`
    : `-${activeIndex * 100}%`;

  return (
    <div className="relative h-screen w-full bg-cyber-bg-dark flex flex-col justify-center overflow-hidden">
      {/* Animated Cyber Background Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

      {/* Main Slider Container (Swipable) */}
      <div
        onTouchStart={handleSwipeStart}
        onMouseDown={handleSwipeStart}
        className="w-full overflow-hidden flex items-center px-4 md:px-20 select-none cursor-grab active:cursor-grabbing"
      >
        <div
          className={`flex w-full ${isSwiping ? "transition-none" : "transition-transform duration-500 ease-out"}`}
          style={{ transform: `translateX(${translateStyle})` }}
        >
          {PAST_EVENTS.map((event, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={event.id}
                className="w-full flex-shrink-0 flex items-center justify-center px-2 md:px-12 relative"
                style={{
                  opacity: isActive ? 1 : 0.2,
                  transform: `scale(${isActive ? 1 : 0.95})`,
                  transition: "opacity 0.5s ease-out, transform 0.5s ease-out"
                }}
              >
                {/* Background Gradient aura */}
                <div className={`absolute inset-0 bg-gradient-to-r ${event.color} z-0 opacity-80 pointer-events-none`} />

                {/* Event Card */}
                <div className={`w-full max-w-5xl bg-cyber-bg-darker/70 backdrop-blur-md border border-white/5 rounded-xl p-6 md:p-12 z-10 flex flex-col md:flex-row gap-8 items-center shadow-2xl ${event.glowColor}`}>

                  {/* Left Column: Trophy & Season ID */}
                  <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-white/10">
                    <span className="font-mono text-xs tracking-[0.4em] text-neon-mint uppercase mb-2">
                      {event.season}
                    </span>
                    <div className="w-24 h-24 rounded-full border border-neon-mint/20 bg-cyber-bg-light/40 flex items-center justify-center mb-4 relative group shadow-[0_0_15px_rgba(0,163,255,0.1)]">
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
      </div>

      {/* Desktop Progress Timeline Indicator (bottom of section) */}
      <div className="hidden md:flex absolute bottom-10 left-12 right-12 z-20 flex-col">
        {/* Timeline Year Labels */}
        <div className="relative w-full h-6 font-mono text-[10px] sm:text-xs">
          {YEARS.map((year, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={year}
                onClick={() => handleYearClick(index)}
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300 cursor-pointer select-none group border-none bg-transparent outline-none"
                style={{ left: `${index * 12.5}%` }}
              >
                <span
                  className={`transition-all duration-300 group-hover:text-neon-mint group-hover:scale-110 ${isActive
                    ? "text-neon-mint font-bold scale-110 text-glow-mint"
                    : "text-gray-500 hover:text-white"
                    }`}
                >
                  {year}
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress Timeline Track with Sliding Pointer */}
        <div
          onClick={handleTrackClickDesktop}
          className="py-3 w-full cursor-pointer relative flex items-center"
        >
          <div
            ref={desktopTrackRef}
            className="w-full h-[2px] bg-white/10 relative rounded-full overflow-visible"
          >
            {/* Draggable Sliding Pointer */}
            <div
              onMouseDown={(e) => { e.stopPropagation(); startDragDesktop(e); }}
              onTouchStart={(e) => { e.stopPropagation(); startDragDesktop(e); }}
              onClick={(e) => e.stopPropagation()}
              className={`absolute top-1/2 w-8 h-8 flex items-center justify-center cursor-grab active:cursor-grabbing select-none z-30 group pointer-handle ${transitionClass}`}
              style={{
                left: `${currentProgress * 100}%`,
                transform: "translate(-50%, -50%)"
              }}
            >
              {/* Visible pointer notch */}
              <div className="w-[3px] h-[20px] bg-neon-mint rounded-sm shadow-[0_0_10px_rgba(0,163,255,0.8)] group-hover:scale-y-110 group-hover:bg-white transition-all duration-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Timeline (right side of section) */}
      <div className="flex md:hidden absolute right-3 top-1/2 -translate-y-1/2 z-20 flex-row items-center h-[280px]">
        {/* Timeline Year Labels */}
        <div className="relative h-full w-10 font-mono text-[9px]">
          {YEARS.map((year, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={year}
                onClick={() => handleYearClick(index)}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-right w-full pr-1.5 transition-all duration-300 cursor-pointer select-none border-none bg-transparent outline-none"
                style={{ top: `${index * 12.5}%` }}
              >
                <span
                  className={`transition-all duration-300 ${isActive
                    ? "text-neon-mint font-bold scale-110 text-glow-mint"
                    : "text-gray-500 hover:text-white"
                    }`}
                >
                  {year}
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress Vertical Bar Track with Sliding Pointer */}
        <div
          onClick={handleTrackClickMobile}
          className="px-1.5 h-full cursor-pointer relative flex justify-center"
        >
          <div
            ref={mobileTrackRef}
            className="w-[1px] h-full bg-white/10 relative rounded-full overflow-visible"
          >
            {/* Non-draggable Sliding Pointer */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-1/2 w-4 h-4 flex items-center justify-center select-none z-30 transition-all duration-500 ease-out"
              style={{
                top: `${(activeIndex / 8) * 100}%`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <div className="w-[10px] h-[2px] bg-neon-mint rounded-sm shadow-[0_0_8px_rgba(0,163,255,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
