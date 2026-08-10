"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, Trophy, Users, ExternalLink } from "lucide-react";

interface EventData {
  id: string;
  title: string;
  date: string;
  winner: string;
  description: string;
  color: string;
  imagePath: string;
  participantCount: string;
  backgroundImagePath: string;
  forumid?: string;
  url?: string;
}

export default function HorizontalScrollSection() {
  const [pastEvents, setPastEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/past-otst")
      .then(res => res.json())
      .then(data => {
        setPastEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load past events:", err);
        setLoading(false);
      });
  }, []);

  const totalEvents = pastEvents.length;
  const maxIndex = totalEvents > 0 ? totalEvents - 1 : 0;

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
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
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
      setActiveIndex(Math.round(clamped * maxIndex));
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
    setActiveIndex(Math.round(clamped * maxIndex));
  };

  // Click direct move on track - Mobile
  const handleTrackClickMobile = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mobileTrackRef.current) return;
    const rect = mobileTrackRef.current.getBoundingClientRect();
    const progress = (e.clientY - rect.top) / rect.height;
    const clamped = Math.min(Math.max(progress, 0), 1);
    setActiveIndex(Math.round(clamped * maxIndex));
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
          setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
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

  const currentProgress = isDragging && dragProgress !== null ? dragProgress : (maxIndex > 0 ? activeIndex / maxIndex : 0);
  const transitionClass = isDragging ? "transition-none" : "transition-all duration-500 ease-out";

  // Compute horizontal translate calculation for real-time sliding
  const translateStyle = isSwiping
    ? `calc(-${activeIndex * 100}% + ${swipeOffset}px)`
    : `-${activeIndex * 100}%`;

  if (loading) {
    return (
      <div className="relative h-[100dvh] w-full flex flex-col justify-center items-center bg-cyber-bg-darker border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)] z-10">
        <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none z-10" />
        <div className="animate-pulse font-mono text-neon-blue z-20 tracking-widest text-sm">LOADING PAST EVENTS...</div>
      </div>
    );
  }

  return (
    <div
      className="relative h-[100dvh] w-full flex flex-col justify-start overflow-hidden bg-cyber-bg-darker z-10 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]"
    >
      {/* Animated Cyber Background Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none z-10" />

        {/* Main Slider Container (Swipable) */}
        <div
          onTouchStart={handleSwipeStart}
          onMouseDown={handleSwipeStart}
          className="w-full h-full overflow-hidden flex items-center select-none z-10 cursor-default"
        >
          <div
            className={`flex w-full h-full ${isSwiping ? "transition-none" : "transition-transform duration-500 ease-out"}`}
            style={{ transform: `translateX(${translateStyle})` }}
          >
            {pastEvents.map((event, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={event.id}
                  className="w-full h-full flex-shrink-0 flex items-center justify-center relative"
                  style={{
                    opacity: isActive ? 1 : 0.2,
                    transform: `scale(${isActive ? 1 : 0.95})`,
                    transition: "opacity 0.5s ease-out, transform 0.5s ease-out"
                  }}
                >
                  {/* Full Section Background Image for this event */}
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-overlay"
                    style={{ backgroundImage: `url(${event.backgroundImagePath})` }}
                  />

                  {/* Event Card Container */}
                  <div className="relative z-10 w-full px-4 md:px-20 flex justify-center items-center">
                    {/* Event Card */}
                    <div className={`w-full max-w-5xl bg-cyber-bg-darker/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-12 z-10 flex flex-col md:flex-row gap-8 items-stretch`}>

                      {/* Left Column: Image */}
                      <div className="w-full md:w-2/5 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-white/10">
                        <div className="w-48 sm:w-56 md:w-full aspect-video flex items-center justify-center relative group">
                          <img
                            src={event.imagePath}
                            alt={event.title}
                            draggable={false}
                            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,163,255,0.3)] group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>
                      </div>

                      {/* Right Column: Title and Stats Grid */}
                      <div className="w-full md:w-3/5 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="flex items-center gap-1.5 font-mono text-[10px] text-neon-blue px-2 py-0.5 rounded border border-neon-blue/20 bg-neon-blue/5">
                            <Calendar className="w-3.5 h-3.5" />
                            {event.date}
                          </span>
                        </div>

                        <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-6 mt-auto">

                          {/* Winner Block */}
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg border border-neon-blue/30 bg-neon-blue/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(255,255,0,0.2)]">
                              <Trophy className="w-6 h-6 text-neon-blue" />
                            </div>
                            <div>
                              <div className="text-[10px] font-mono text-gray-300  tracking-widest mb-1">冠軍</div>
                              <div className="text-base font-mono font-bold text-white text-glow-blue ">{event.winner}</div>
                            </div>
                          </div>

                          {/* Participants Block */}
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg border border-neon-mint/30 bg-neon-mint/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,163,255,0.2)]">
                              <Users className="w-6 h-6 text-neon-mint" />
                            </div>
                            <div>
                              <div className="text-[10px] font-mono text-gray-300  tracking-widest mb-1">參賽玩家</div>
                              <div className="text-base font-mono font-bold text-white">{event.participantCount}</div>
                            </div>
                          </div>

                        </div>

                        {/* Action Links */}
                        <div className="flex items-center gap-4 mt-6">
                          {event.forumid && (
                            <a
                              href={`https://osu.ppy.sh/community/forums/topics/${event.forumid}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs font-mono text-gray-300 hover:text-white"
                            >
                              Forum
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {event.url && (
                            <a
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs font-mono text-gray-300 hover:text-white"
                            >
                              Website
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
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
          <div className="relative w-full h-8 font-mono text-[10px] sm:text-xs md:text-base lg:text-lg">
            {pastEvents.map((event, index) => {
              const isActive = activeIndex === index;
              const yearLabel = event.date.substring(0, 4);

              return (
                <button
                  key={event.id}
                  onClick={() => handleYearClick(index)}
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300 cursor-pointer select-none group border-none bg-transparent outline-none"
                  style={{ left: `${maxIndex > 0 ? (index / maxIndex) * 100 : 0}%` }}
                >
                  <span
                    className={`transition-all duration-300 group-hover:text-white group-hover:scale-110 ${isActive
                      ? "text-white font-bold scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      : "text-gray-300 hover:text-white"
                      }`}
                  >
                    {yearLabel}
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
                className={`absolute top-1/2 w-8 h-8 flex items-center justify-center select-none z-30 group pointer-handle cursor-default ${transitionClass}`}
                style={{
                  left: `${currentProgress * 100}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                {/* Visible pointer notch */}
                <div className="w-[3px] h-[20px] bg-white rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:scale-y-110 transition-all duration-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline (right side of section) */}
        <div className="flex md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 flex-row items-center h-[280px]">
          {/* Timeline Year Labels */}
          <div className="relative h-full w-10 font-mono text-[9px]">
            {pastEvents.map((event, index) => {
              const isActive = activeIndex === index;
              const yearLabel = event.date.substring(0, 4);

              return (
                <button
                  key={event.id}
                  onClick={() => handleYearClick(index)}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-right w-full pr-1.5 transition-all duration-300 cursor-pointer select-none border-none bg-transparent outline-none"
                  style={{ top: `${maxIndex > 0 ? (index / maxIndex) * 100 : 0}%` }}
                >
                  <span
                    className={`transition-all duration-300 ${isActive
                      ? "text-white font-bold scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      : "text-gray-300 hover:text-white"
                      }`}
                  >
                    {yearLabel}
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
                  top: `${maxIndex > 0 ? (activeIndex / maxIndex) * 100 : 0}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="w-[10px] h-[2px] bg-white rounded-sm shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
