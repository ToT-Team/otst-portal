"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MonitorPlay, Users, Target, CalendarDays, ExternalLink, Clock, Search } from "lucide-react";
import { ModeStandardIcon } from "../../components/icons/ModeStandardIcon";
import { ModeManiaIcon } from "../../components/icons/ModeManiaIcon";
import { ModeTaikoIcon } from "../../components/icons/ModeTaikoIcon";
import { ModeCatchIcon } from "../../components/icons/ModeCatchIcon";
import type { Tournament } from "../api/tournaments/route";

// Mode Map function
const getModeInfo = (modeStr: string) => {
  const mode = parseInt(modeStr, 10);
  switch (mode) {
    case 0: return { name: "osu! Standard", Icon: ModeStandardIcon, color: "text-neon-mint", bg: "bg-neon-mint", shadow: "group-hover:shadow-[0_0_20px_rgba(0,163,255,0.15)]", border: "group-hover:border-neon-mint" };
    case 1: return { name: "osu! Catch", Icon: ModeCatchIcon, color: "text-neon-blue", bg: "bg-neon-blue", shadow: "group-hover:shadow-[0_0_20px_rgba(255,255,0,0.15)]", border: "group-hover:border-neon-blue" };
    case 2: return { name: "osu! Taiko", Icon: ModeTaikoIcon, color: "text-neon-gold", bg: "bg-neon-gold", shadow: "group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]", border: "group-hover:border-neon-gold" };
    case 3: return { name: "osu! mania 4K", Icon: ModeManiaIcon, color: "text-pink-400", bg: "bg-pink-400", shadow: "group-hover:shadow-[0_0_20px_rgba(244,114,182,0.15)]", border: "group-hover:border-pink-400" };
    case 4: return { name: "osu! mania 7K", Icon: ModeManiaIcon, color: "text-purple-400", bg: "bg-purple-400", shadow: "group-hover:shadow-[0_0_20px_rgba(192,132,252,0.15)]", border: "group-hover:border-purple-400" };
    case 5: return { name: "osu! mapping", Icon: null, color: "text-green-400", bg: "bg-green-400", shadow: "group-hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]", border: "group-hover:border-green-400" };
    default: return { name: "-", Icon: null, color: "text-gray-400", bg: "bg-gray-400", shadow: "group-hover:shadow-[0_0_20px_rgba(156,163,175,0.15)]", border: "group-hover:border-gray-400" };
  }
};

// Rank Map function
const formatRank = (min: string, max: string) => {
  if (min === "-" && max === "-") return "無限制 (No Limit)";
  if (min === "-") return `Max #${max}`;
  if (max === "-") return `Min #${min}`;
  return `#${min} - #${max}`;
};

// Parse team size from format string (e.g., "1v1" -> 1, "4v4" -> 4)
const getTeamSize = (format: string): number => {
  const match = format.match(/\d+/);
  return match ? parseInt(match[0], 10) : 1;
};

// Status calculation
const getTournamentStatus = (regStart: string, regEnd: string, tourneyEnd: string) => {
  const now = new Date();

  // Create dates and set them to end of day to be inclusive
  const rStart = new Date(regStart);
  const rEnd = new Date(regEnd);
  rEnd.setHours(23, 59, 59, 999);
  const tEnd = new Date(tourneyEnd);
  tEnd.setHours(23, 59, 59, 999);

  if (now < rStart) {
    return { label: "即將開始", className: "bg-purple-500/10 text-purple-400 border-purple-500/30" };
  } else if (now >= rStart && now <= rEnd) {
    return { label: "報名中", className: "bg-neon-mint/10 text-neon-mint border-neon-mint/30" };
  } else if (now > rEnd && now <= tEnd) {
    return { label: "進行中", className: "bg-neon-blue/10 text-neon-blue border-neon-blue/30" };
  } else {
    return { label: "已結束", className: "bg-gray-500/10 text-gray-400 border-gray-500/30" };
  }
};

export default function TournamentsPage() {
  const [initialTournaments, setInitialTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModes, setSelectedModes] = useState<number[]>([]);
  const [selectedTeamSizes, setSelectedTeamSizes] = useState<number[]>([]);
  const [rankFilter, setRankFilter] = useState("");

  // Force a re-render on mount to ensure dates match the client time 
  const [, setNow] = useState(new Date());

  useEffect(() => {
    setNow(new Date());

    fetch("/api/tournaments")
      .then(res => res.json())
      .then(data => {
        setInitialTournaments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load tournaments:", err);
        setLoading(false);
      });
  }, []);

  const toggleMode = (mode: number) => {
    setSelectedModes(prev => prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]);
  };

  const toggleTeamSize = (size: number) => {
    setSelectedTeamSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const filteredTournaments = useMemo(() => {
    return initialTournaments.filter(t => {
      // 1. Search Query Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!t.name.toLowerCase().includes(query) && !t.shortName.toLowerCase().includes(query)) {
          return false;
        }
      }

      // 2. Mode Filter
      const tMode = parseInt(t.mode, 10);
      if (selectedModes.length > 0 && !selectedModes.includes(tMode)) {
        return false;
      }

      // 3. Team Size Filter
      const tSize = getTeamSize(t.format);
      if (selectedTeamSizes.length > 0 && !selectedTeamSizes.includes(tSize)) {
        return false;
      }

      // 4. Rank Filter
      if (rankFilter) {
        const rank = parseInt(rankFilter, 10);
        if (!isNaN(rank)) {
          const min = t.rankLimitMin === "-" ? 0 : parseInt(t.rankLimitMin, 10);
          const max = t.rankLimitMax === "-" ? Infinity : parseInt(t.rankLimitMax, 10);
          if (rank < min || rank > max) {
            return false;
          }
        }
      }

      return true;
    });
  }, [initialTournaments, searchQuery, selectedModes, selectedTeamSizes, rankFilter]);

  const availableModes = [
    { id: 0, name: "Standard" },
    { id: 1, name: "Catch" },
    { id: 2, name: "Taiko" },
    { id: 3, name: "4K" },
    { id: 4, name: "7K" },
    { id: 5, name: "Mapping" }
  ];

  const availableTeamSizes = [1, 2, 3, 4];

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
        <header className="mb-8">
          <h1 className="font-sans font-black italic text-4xl md:text-6xl tracking-[0.05em] text-white mb-4">
            台灣<span className="text-neon-blue">賽事</span>
          </h1>
          <p className="font-mono text-gray-400 text-sm md:text-base tracking-[0.2em] uppercase">
            Discover local championships and community events
          </p>
        </header>

        {/* Filters Section */}
        <div className="bg-cyber-bg-dark/60 backdrop-blur-md border border-white/10 rounded-lg p-5 md:p-6 mb-8 flex flex-wrap lg:items-end gap-6">

          {/* Search */}
          <div className="flex flex-col gap-2 w-full sm:w-auto flex-1 min-w-[200px] max-w-sm">
            <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Search</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜尋賽事名稱..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded py-[5px] pl-9 pr-4 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:shadow-[0_0_10px_rgba(0,163,255,0.2)] transition-all"
              />
            </div>
          </div>

          {/* Rank Input */}
          <div className="flex flex-col gap-2 w-full sm:w-auto flex-1 min-w-[150px] max-w-xs">
            <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Rank Limit</span>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                placeholder="輸入 Rank 數字"
                value={rankFilter}
                onChange={(e) => setRankFilter(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded py-[5px] pl-9 pr-4 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-neon-mint/50 focus:shadow-[0_0_10px_rgba(0,255,170,0.2)] transition-all"
              />
            </div>
          </div>

          {/* Modes */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Game Mode</span>
            <div className="flex flex-wrap gap-2">
              {availableModes.map(mode => {
                const isActive = selectedModes.includes(mode.id);
                return (
                  <button
                    key={mode.id}
                    onClick={() => toggleMode(mode.id)}
                    className={`px-3 py-1 rounded border text-xs font-mono transition-all duration-300 ${isActive
                        ? "bg-neon-blue/20 border-neon-blue/50 text-neon-blue shadow-[0_0_10px_rgba(0,163,255,0.2)]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {mode.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Team Sizes */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Team Size</span>
            <div className="flex flex-wrap gap-2">
              {availableTeamSizes.map(size => {
                const isActive = selectedTeamSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleTeamSize(size)}
                    className={`px-3 py-1 rounded border text-xs font-mono transition-all duration-300 ${isActive
                        ? "bg-neon-mint/20 border-neon-mint/50 text-neon-mint shadow-[0_0_10px_rgba(0,255,170,0.2)]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {size}v{size}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Tournaments List (Row Based) */}
        <div className="flex flex-col gap-4">

          {/* Table Header (Hidden on small screens) */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/20 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            <div className="col-span-3">Tournament Name</div>
            <div className="col-span-2">Mode</div>
            <div className="col-span-1">Format</div>
            <div className="col-span-2">Rank Limit</div>
            <div className="col-span-3 text-center">Schedule</div>
            <div className="col-span-1 text-center">Status</div>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="text-center py-12 text-neon-blue font-mono animate-pulse">
              載入賽事中 (Loading tournaments)...
            </div>
          ) : initialTournaments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 font-mono gap-2">
              <span className="text-lg tracking-widest uppercase">即將公佈</span>
              <span className="text-sm opacity-60">(To Be Announced)</span>
            </div>
          ) : filteredTournaments.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-mono">
              沒有符合條件的賽事 (No tournaments found)
            </div>
          ) : (
            filteredTournaments.map((tournament) => {
              const modeInfo = getModeInfo(tournament.mode);
              const rankText = formatRank(tournament.rankLimitMin, tournament.rankLimitMax);
              const status = getTournamentStatus(tournament.regStart, tournament.regEnd, tournament.tourneyEnd);

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
                    {modeInfo.Icon ? (
                      <modeInfo.Icon className={`w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity ${modeInfo.color}`} />
                    ) : (
                      <MonitorPlay className={`w-4 h-4 ${modeInfo.color}`} />
                    )}
                    <span className="whitespace-nowrap">{modeInfo.name}</span>
                  </div>

                  {/* Format (Solo/Team) */}
                  <div className="col-span-1 flex items-center gap-2 text-gray-300 font-mono text-sm">
                    <Users className={`w-4 h-4 ${modeInfo.color}`} />
                    {tournament.format}
                  </div>

                  {/* Rank Limit */}
                  <div className="col-span-2 flex items-center gap-2 text-gray-300 font-mono text-sm">
                    <Target className={`w-4 h-4 ${modeInfo.color}`} />
                    <span className="whitespace-nowrap">{rankText}</span>
                  </div>

                  {/* Schedule (Registration & Tourney Time) */}
                  <div className="col-span-3 flex items-center justify-center w-full">
                    <div className="flex flex-col gap-1.5 w-full justify-center lg:items-center">
                      <div className="flex items-center gap-2 text-gray-400 font-mono text-[10px] md:text-xs">
                        <CalendarDays className={`w-3.5 h-3.5 ${modeInfo.color}`} />
                        <span className="whitespace-nowrap">Reg: {tournament.regStart} ~ {tournament.regEnd}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-200 font-mono text-xs md:text-sm">
                        <Clock className={`w-4 h-4 ${modeInfo.color}`} />
                        <span className="whitespace-nowrap">Play: {tournament.tourneyStart} ~ {tournament.tourneyEnd}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="col-span-1 flex items-center justify-start lg:justify-end w-full mt-2 lg:mt-0 gap-2">
                    <span className={`px-2 py-1 rounded text-[10px] sm:text-xs font-bold tracking-widest font-mono border ${status.className} whitespace-nowrap shadow-sm`}>
                      {status.label}
                    </span>
                    {/* External Link Icon for Desktop */}
                    <ExternalLink className="w-4 h-4 text-gray-600 hidden lg:block group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0" />
                  </div>

                </a>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
