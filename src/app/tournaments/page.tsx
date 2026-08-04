import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { ArrowLeft, MonitorPlay, Users, Target, CalendarDays, ExternalLink, Clock } from "lucide-react";

// Define the shape of our parsed tournament data
interface Tournament {
  id: number;
  name: string;
  shortName: string;
  mode: string;
  format: string;
  rankLimitMin: string;
  rankLimitMax: string;
  regStart: string;
  regEnd: string;
  tourneyStart: string;
  tourneyEnd: string;
  forumPost?: string;
  url?: string;
}

// Function to parse the markdown file
function getTournaments(): Tournament[] {
  const filePath = path.join(process.cwd(), "src/data/tournaments.md");
  let fileContent = "";
  
  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error("Failed to read tournaments.md:", err);
    return [];
  }

  const tournaments: Tournament[] = [];
  const blocks = fileContent.split("## ").slice(1);
  
  blocks.forEach((block, index) => {
    const lines = block.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const name = lines[0];
    
    // Initialize with empty defaults
    const obj: any = { id: index + 1, name };
    
    lines.slice(1).forEach(line => {
      const match = line.match(/-\s+\*\*(.+?)\*\*:\s+(.+)/);
      if (match) {
        obj[match[1]] = match[2].trim();
      }
    });
    tournaments.push(obj as Tournament);
  });

  return tournaments;
}

export default function TournamentsPage() {
  const tournaments = getTournaments();

  // Mode Map function
  const getModeInfo = (modeStr: string) => {
    const mode = parseInt(modeStr, 10);
    switch (mode) {
      case 0: return { name: "osu! Standard", color: "text-neon-mint", bg: "bg-neon-mint", shadow: "group-hover:shadow-[0_0_20px_rgba(0,163,255,0.15)]", border: "group-hover:border-neon-mint" };
      case 1: return { name: "osu! Catch", color: "text-neon-blue", bg: "bg-neon-blue", shadow: "group-hover:shadow-[0_0_20px_rgba(255,255,0,0.15)]", border: "group-hover:border-neon-blue" };
      case 2: return { name: "osu! Taiko", color: "text-neon-gold", bg: "bg-neon-gold", shadow: "group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]", border: "group-hover:border-neon-gold" };
      case 3: return { name: "osu! mania 4K", color: "text-pink-400", bg: "bg-pink-400", shadow: "group-hover:shadow-[0_0_20px_rgba(244,114,182,0.15)]", border: "group-hover:border-pink-400" };
      case 4: return { name: "osu! mania 7K", color: "text-purple-400", bg: "bg-purple-400", shadow: "group-hover:shadow-[0_0_20px_rgba(192,132,252,0.15)]", border: "group-hover:border-purple-400" };
      case 5: return { name: "osu! mapping", color: "text-green-400", bg: "bg-green-400", shadow: "group-hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]", border: "group-hover:border-green-400" };
      default: return { name: "Unknown Mode", color: "text-gray-400", bg: "bg-gray-400", shadow: "group-hover:shadow-[0_0_20px_rgba(156,163,175,0.15)]", border: "group-hover:border-gray-400" };
    }
  };

  // Rank Map function
  const formatRank = (min: string, max: string) => {
    if (min === "-" && max === "-") return "無限制 (No Limit)";
    if (min === "-") return `Max #${max}`;
    if (max === "-") return `Min #${min}`;
    return `#${min} - #${max}`;
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg-darker text-white overflow-x-hidden selection:bg-neon-blue selection:text-black">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 bg-grid-cyber opacity-20 pointer-events-none z-0" />

      {/* Ambient Neon Glows */}
      <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-neon-mint/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Content Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-32">
        
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
            <div className="col-span-3">Tournament Name</div>
            <div className="col-span-2">Mode</div>
            <div className="col-span-2">Format</div>
            <div className="col-span-2">Rank Limit</div>
            <div className="col-span-3">Schedule</div>
          </div>

          {/* Rows */}
          {tournaments.map((tournament) => {
            const modeInfo = getModeInfo(tournament.mode);
            const rankText = formatRank(tournament.rankLimitMin, tournament.rankLimitMax);

            return (
              <a 
                key={tournament.id}
                href={tournament.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-4 items-start lg:items-center p-5 md:p-6 bg-cyber-bg-dark/40 backdrop-blur-md border border-white/10 rounded-lg transition-all duration-300 cursor-pointer hover:bg-cyber-bg-dark/60 ${modeInfo.border} ${modeInfo.shadow}`}
              >
                
                {/* Name */}
                <div className="col-span-3 w-full flex items-center justify-between lg:justify-start gap-4">
                  <div className="flex flex-col">
                    <h2 className="font-bold text-lg md:text-xl text-white group-hover:text-white transition-colors flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full bg-white/20 group-hover:${modeInfo.bg} transition-colors`} />
                      {tournament.name}
                    </h2>
                    <span className="text-gray-500 font-mono text-[10px] md:text-xs ml-5 tracking-widest uppercase">{tournament.shortName}</span>
                  </div>
                  {/* External Link Icon for Mobile */}
                  <ExternalLink className="w-4 h-4 text-gray-500 lg:hidden group-hover:text-white transition-colors flex-shrink-0" />
                </div>

                {/* Mode */}
                <div className="col-span-2 flex items-center gap-2 text-gray-300 font-mono text-sm">
                  <MonitorPlay className={`w-4 h-4 ${modeInfo.color}`} />
                  <span className="whitespace-nowrap">{modeInfo.name}</span>
                </div>

                {/* Format (Solo/Team) */}
                <div className="col-span-2 flex items-center gap-2 text-gray-300 font-mono text-sm">
                  <Users className={`w-4 h-4 ${modeInfo.color}`} />
                  {tournament.format}
                </div>

                {/* Rank Limit */}
                <div className="col-span-2 flex items-center gap-2 text-gray-300 font-mono text-sm">
                  <Target className={`w-4 h-4 ${modeInfo.color}`} />
                  <span className="whitespace-nowrap">{rankText}</span>
                </div>

                {/* Schedule (Registration & Tourney Time) */}
                <div className="col-span-3 flex items-center justify-between w-full">
                  <div className="flex flex-col gap-1.5 w-full justify-center">
                    <div className="flex items-center gap-2 text-gray-400 font-mono text-[10px] md:text-xs">
                      <CalendarDays className={`w-3.5 h-3.5 ${modeInfo.color}`} />
                      <span className="whitespace-nowrap">Reg: {tournament.regStart} ~ {tournament.regEnd}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200 font-mono text-xs md:text-sm">
                      <Clock className={`w-4 h-4 ${modeInfo.color}`} />
                      <span className="whitespace-nowrap">Play: {tournament.tourneyStart} ~ {tournament.tourneyEnd}</span>
                    </div>
                  </div>
                  {/* External Link Icon for Desktop */}
                  <ExternalLink className="w-4 h-4 text-gray-600 hidden lg:block group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0" />
                </div>

              </a>
            );
          })}

        </div>
      </main>
    </div>
  );
}
