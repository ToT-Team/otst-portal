import React from "react";
import Link from "next/link";
import { ArrowLeft, MonitorPlay, Users, Target, CalendarDays, ExternalLink } from "lucide-react";

// Mock Data for Tournaments
const TOURNAMENTS = [
  {
    id: 1,
    name: "Taiwan osu! Catch Tournament",
    mode: "osu! Catch",
    format: "2v2",
    rankLimit: "#10k - #30k",
    timePeriod: "2026.09 - 2026.10",
    color: "group-hover:border-neon-blue group-hover:shadow-[0_0_20px_rgba(255,255,0,0.15)]",
    iconColor: "text-neon-blue"
  },
  {
    id: 2,
    name: "Taiwan Taiko Tournament (TTT)",
    mode: "osu! Taiko",
    format: "1v1",
    rankLimit: "無限制 (No Limit)",
    timePeriod: "2026.11 - 2026.12",
    color: "group-hover:border-neon-mint group-hover:shadow-[0_0_20px_rgba(0,163,255,0.15)]",
    iconColor: "text-neon-mint"
  },
  {
    id: 3,
    name: "Taiwan Mania 4K Cup",
    mode: "osu! Mania",
    format: "3v3",
    rankLimit: "#1k - #10k",
    timePeriod: "2027.01 - 2027.02",
    color: "group-hover:border-neon-gold group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]",
    iconColor: "text-neon-gold"
  },
  {
    id: 4,
    name: "OTST Minor",
    mode: "osu! Standard",
    format: "1v1",
    rankLimit: "#50k - #100k",
    timePeriod: "2027.03 - 2027.04",
    color: "group-hover:border-neon-blue group-hover:shadow-[0_0_20px_rgba(255,255,0,0.15)]",
    iconColor: "text-neon-blue"
  },
  {
    id: 5,
    name: "Formosa OWC Qualifiers",
    mode: "osu! Standard",
    format: "4v4",
    rankLimit: "無限制 (No Limit)",
    timePeriod: "2027.06 - 2027.07",
    color: "group-hover:border-neon-mint group-hover:shadow-[0_0_20px_rgba(0,163,255,0.15)]",
    iconColor: "text-neon-mint"
  },
  {
    id: 6,
    name: "Taichung osu! LAN Party",
    mode: "osu! Standard",
    format: "2v2",
    rankLimit: "#5k - #20k",
    timePeriod: "2027.08 (Offline)",
    color: "group-hover:border-neon-gold group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]",
    iconColor: "text-neon-gold"
  }
];

export default function TournamentsPage() {
  return (
    <div className="relative min-h-screen bg-cyber-bg-darker text-white overflow-x-hidden selection:bg-neon-blue selection:text-black">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 bg-grid-cyber opacity-20 pointer-events-none z-0" />

      {/* Ambient Neon Glows */}
      <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-neon-mint/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Content Container */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 pt-16 pb-32">
        
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded bg-white/5 hover:bg-white/10 hover:border-neon-blue/50 text-gray-400 hover:text-white transition-all duration-300 font-mono text-sm uppercase tracking-widest mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <header className="mb-16">
          <h1 className="font-sans font-black italic text-4xl md:text-6xl uppercase tracking-[0.05em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mb-4">
            Taiwan <span className="text-neon-blue text-glow-blue">Tournaments</span>
          </h1>
          <p className="font-mono text-gray-400 text-sm md:text-base tracking-[0.2em] uppercase">
            Discover local championships and community events
          </p>
        </header>

        {/* Tournaments List (Row Based) */}
        <div className="flex flex-col gap-4">
          
          {/* Table Header (Hidden on small screens) */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/20 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            <div className="col-span-4">Tournament Name</div>
            <div className="col-span-2">Mode</div>
            <div className="col-span-2">Format</div>
            <div className="col-span-2">Rank Limit</div>
            <div className="col-span-2">Time Period</div>
          </div>

          {/* Rows */}
          {TOURNAMENTS.map((tournament) => (
            <div 
              key={tournament.id}
              className={`group flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-4 items-start lg:items-center p-5 md:p-6 bg-cyber-bg-dark/40 backdrop-blur-md border border-white/10 rounded-lg transition-all duration-300 cursor-pointer hover:bg-cyber-bg-dark/60 ${tournament.color}`}
            >
              
              {/* Name */}
              <div className="col-span-4 w-full flex items-center justify-between lg:justify-start gap-4">
                <h2 className="font-bold text-lg md:text-xl text-white group-hover:text-white transition-colors flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full bg-white/20 group-hover:bg-current ${tournament.iconColor} transition-colors`} />
                  {tournament.name}
                </h2>
                {/* External Link Icon for Mobile */}
                <ExternalLink className="w-4 h-4 text-gray-500 lg:hidden group-hover:text-white transition-colors" />
              </div>

              {/* Mode */}
              <div className="col-span-2 flex items-center gap-2 text-gray-300 font-mono text-sm">
                <MonitorPlay className={`w-4 h-4 ${tournament.iconColor}`} />
                {tournament.mode}
              </div>

              {/* Format (Solo/Team) */}
              <div className="col-span-2 flex items-center gap-2 text-gray-300 font-mono text-sm">
                <Users className={`w-4 h-4 ${tournament.iconColor}`} />
                {tournament.format}
              </div>

              {/* Rank Limit */}
              <div className="col-span-2 flex items-center gap-2 text-gray-300 font-mono text-sm">
                <Target className={`w-4 h-4 ${tournament.iconColor}`} />
                {tournament.rankLimit}
              </div>

              {/* Time Period */}
              <div className="col-span-2 flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-gray-300 font-mono text-sm">
                  <CalendarDays className={`w-4 h-4 ${tournament.iconColor}`} />
                  {tournament.timePeriod}
                </div>
                {/* External Link Icon for Desktop */}
                <ExternalLink className="w-4 h-4 text-gray-600 hidden lg:block group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
              </div>

            </div>
          ))}

        </div>
      </main>
    </div>
  );
}
