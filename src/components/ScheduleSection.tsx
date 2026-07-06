"use client";

import React, { useState } from "react";
import { Play, Calendar, Trophy, Gamepad2, Info, ArrowUpRight } from "lucide-react";

interface Match {
  id: string;
  stage: string;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  time: string;
  status: "LIVE" | "UPCOMING" | "COMPLETED";
  game: string;
}

interface TeamStanding {
  rank: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  trend: "up" | "down" | "stable";
}

const MATCHES_DATA: Match[] = [
  {
    id: "m1",
    stage: "Grand Finals",
    teamA: "Quantum Hunters",
    teamB: "Nebula Strykers",
    scoreA: 2,
    scoreB: 1,
    time: "Ongoing",
    status: "LIVE",
    game: "Valorant"
  },
  {
    id: "m2",
    stage: "Semi Finals B",
    teamA: "Apex Phantoms",
    teamB: "Titan Syndicate",
    scoreA: 3,
    scoreB: 0,
    time: "Finished",
    status: "COMPLETED",
    game: "Apex Legends"
  },
  {
    id: "m3",
    stage: "Quarter Finals 4",
    teamA: "Eclipse Clan",
    teamB: "Solar Flare",
    time: "Today, 19:30 UTC",
    status: "UPCOMING",
    game: "Valorant"
  },
  {
    id: "m4",
    stage: "Quarter Finals 3",
    teamA: "Frostbite Gaming",
    teamB: "Viper Division",
    time: "Today, 21:00 UTC",
    status: "UPCOMING",
    game: "League of Legends"
  }
];

const LEADERBOARD_DATA: TeamStanding[] = [
  { rank: 1, team: "Quantum Hunters", played: 12, won: 10, lost: 2, points: 30, trend: "up" },
  { rank: 2, team: "Nebula Strykers", played: 12, won: 9, lost: 3, points: 27, trend: "stable" },
  { rank: 3, team: "Apex Phantoms", played: 12, won: 8, lost: 4, points: 24, trend: "up" },
  { rank: 4, team: "Titan Syndicate", played: 12, won: 7, lost: 5, points: 21, trend: "down" },
  { rank: 5, team: "Eclipse Clan", played: 12, won: 6, lost: 6, points: 18, trend: "stable" }
];

export default function ScheduleSection() {
  const [activeTab, setActiveTab] = useState<"matches" | "standings">("matches");

  return (
    <section className="relative min-h-screen w-full py-20 px-6 md:px-12 bg-cyber-bg-darker overflow-hidden flex flex-col justify-center">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

      {/* Decorative Neon Ring */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-neon-mint/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs tracking-[0.4em] text-neon-blue uppercase block mb-2">
            Match Center
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wider uppercase text-white font-mono">
            Tournament Live Hub
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-mono mt-3 uppercase tracking-wider max-w-xl mx-auto">
            Track schedules, watch live streams, and view active leaderboards.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg p-1 bg-cyber-bg-dark border border-white/5 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("matches")}
              className={`px-6 py-2.5 rounded-md font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "matches"
                  ? "bg-gradient-to-r from-neon-mint to-neon-blue text-cyber-bg-darker font-bold shadow-[0_0_12px_rgba(0,245,160,0.3)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Match Schedule
            </button>
            <button
              onClick={() => setActiveTab("standings")}
              className={`px-6 py-2.5 rounded-md font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "standings"
                  ? "bg-gradient-to-r from-neon-blue to-neon-gold text-cyber-bg-darker font-bold shadow-[0_0_12px_rgba(0,153,255,0.3)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Standings
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        {activeTab === "matches" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MATCHES_DATA.map((match) => (
              <div
                key={match.id}
                className={`relative overflow-hidden rounded-xl border p-5 md:p-6 bg-cyber-bg-dark/60 backdrop-blur-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl ${
                  match.status === "LIVE"
                    ? "border-neon-mint/50 shadow-[0_0_15px_rgba(0,245,160,0.1)]"
                    : "border-white/5 hover:border-neon-blue/40"
                }`}
              >
                {/* Header status */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[10px] text-gray-500 tracking-wider uppercase flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5 text-neon-mint" />
                    {match.game} • {match.stage}
                  </span>
                  
                  {match.status === "LIVE" ? (
                    <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-red-500 px-2 py-0.5 rounded border border-red-500/30 bg-red-500/10 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      LIVE NOW
                    </span>
                  ) : match.status === "COMPLETED" ? (
                    <span className="font-mono text-[10px] text-gray-400 px-2 py-0.5 rounded border border-white/10 bg-white/5">
                      FINISHED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-neon-blue px-2 py-0.5 rounded border border-neon-blue/20 bg-neon-blue/5">
                      <Calendar className="w-3 h-3" />
                      UPCOMING
                    </span>
                  )}
                </div>

                {/* Match Score/Teams Area */}
                <div className="flex justify-between items-center my-6">
                  {/* Team A */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="font-mono font-bold text-sm md:text-base text-white uppercase tracking-wide truncate">
                      {match.teamA}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono mt-1">BLUE SIDE</div>
                  </div>

                  {/* Versus / Score */}
                  <div className="px-4 flex flex-col items-center">
                    {match.status === "LIVE" || match.status === "COMPLETED" ? (
                      <div className="font-mono font-extrabold text-xl md:text-2xl text-white tracking-widest flex gap-3">
                        <span className={match.scoreA! > match.scoreB! ? "text-neon-mint" : "text-gray-500"}>{match.scoreA}</span>
                        <span className="text-gray-600">:</span>
                        <span className={match.scoreB! > match.scoreA! ? "text-neon-blue" : "text-gray-500"}>{match.scoreB}</span>
                      </div>
                    ) : (
                      <div className="font-mono font-bold text-xs text-gray-500 px-2 py-1 rounded bg-cyber-bg-darker border border-white/5">
                        VS
                      </div>
                    )}
                  </div>

                  {/* Team B */}
                  <div className="flex-1 text-center md:text-right">
                    <div className="font-mono font-bold text-sm md:text-base text-white uppercase tracking-wide truncate">
                      {match.teamB}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono mt-1">RED SIDE</div>
                  </div>
                </div>

                {/* Footer Link / Info */}
                <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                  <span className="font-mono text-[10px] text-gray-400">
                    {match.time}
                  </span>
                  
                  {match.status === "LIVE" ? (
                    <button className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-neon-mint hover:text-white transition-colors cursor-pointer">
                      <Play className="w-3.5 h-3.5 fill-current" /> WATCH BROADCAST
                    </button>
                  ) : (
                    <button className="flex items-center gap-1 font-mono text-[10px] text-gray-400 hover:text-neon-blue transition-colors cursor-pointer">
                      MATCH DETAILS <Info className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-cyber-bg-dark/60 backdrop-blur-sm shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 font-mono text-xs text-gray-400 tracking-wider uppercase">
                  <th className="p-4 md:p-5 text-center w-16">Rank</th>
                  <th className="p-4 md:p-5">Team Name</th>
                  <th className="p-4 md:p-5 text-center">Played</th>
                  <th className="p-4 md:p-5 text-center">W</th>
                  <th className="p-4 md:p-5 text-center">L</th>
                  <th className="p-4 md:p-5 text-right pr-6 md:pr-10">Points</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {LEADERBOARD_DATA.map((row) => (
                  <tr
                    key={row.rank}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-4 md:p-5 text-center font-bold">
                      {row.rank === 1 ? (
                        <span className="inline-flex w-6 h-6 rounded-full bg-neon-mint/20 border border-neon-mint/40 items-center justify-center text-neon-mint text-xs">
                          1
                        </span>
                      ) : row.rank === 2 ? (
                        <span className="inline-flex w-6 h-6 rounded-full bg-neon-blue/20 border border-neon-blue/40 items-center justify-center text-neon-blue text-xs">
                          2
                        </span>
                      ) : row.rank === 3 ? (
                        <span className="inline-flex w-6 h-6 rounded-full bg-neon-gold/20 border border-neon-gold/40 items-center justify-center text-neon-gold text-xs">
                          3
                        </span>
                      ) : (
                        row.rank
                      )}
                    </td>
                    <td className="p-4 md:p-5 font-bold text-white uppercase group-hover:text-neon-mint transition-colors">
                      {row.team}
                    </td>
                    <td className="p-4 md:p-5 text-center text-gray-300">{row.played}</td>
                    <td className="p-4 md:p-5 text-center text-green-400">{row.won}</td>
                    <td className="p-4 md:p-5 text-center text-red-400">{row.lost}</td>
                    <td className="p-4 md:p-5 text-right pr-6 md:pr-10 font-bold text-neon-mint">
                      {row.points} PTS
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View All Call to Action */}
        <div className="flex justify-center mt-12">
          <button className="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-400 hover:text-neon-mint transition-colors cursor-pointer group">
            GO TO FULL MATCH CENTER 
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
