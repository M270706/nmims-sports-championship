"use client";

import React from "react";
import { X, Award, MapPin, Calendar } from "lucide-react";
import { Match } from "@/types/tournament";
import CampusBadge from "@/components/ui/CampusBadge";

interface MatchDetailsModalProps {
  match: Match | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MatchDetailsModal({ match, isOpen, onClose }: MatchDetailsModalProps) {
  if (!isOpen || !match) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full sm:max-w-2xl bg-surface border-0 sm:border sm:border-gold/20 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[85vh] sm:my-8 flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 z-10 px-5 py-4 sm:px-6 sm:py-5 bg-surface/95 backdrop-blur border-b border-gold/15 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded-md bg-navy/90 border border-gold/30 font-mono text-xs font-bold text-gold shrink-0">
              Match #{match.matchNo}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gold uppercase tracking-wider truncate">
              {match.round} · {match.sportId.toUpperCase()} ({match.category.toUpperCase()})
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-gold hover:text-navy border border-gold/20 text-gold transition-colors flex items-center justify-center shrink-0 ml-3"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Match Score Summary & Teams Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-navy/50 border border-gold/15 text-center">
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-5 flex flex-col items-center">
                <CampusBadge shortCode={match.teamAShortCode} size="lg" />
                <span
                  className={`mt-2 font-serif font-bold text-sm sm:text-base text-center line-clamp-2 ${
                    match.winnerId === match.teamAId ? "text-gold" : "text-text-main"
                  }`}
                >
                  {match.playerAName || match.teamAName}
                </span>
              </div>

              <div className="col-span-2 flex flex-col items-center">
                <span className="text-xs font-mono font-bold text-gold/90 px-2 py-0.5 rounded-md bg-surface border border-gold/20">
                  VS
                </span>
                {match.scoreSummary && (
                  <span className="text-xs sm:text-sm font-mono font-bold text-gold mt-2 whitespace-nowrap">
                    {match.scoreSummary}
                  </span>
                )}
              </div>

              <div className="col-span-5 flex flex-col items-center">
                <CampusBadge shortCode={match.teamBShortCode} size="lg" />
                <span
                  className={`mt-2 font-serif font-bold text-sm sm:text-base text-center line-clamp-2 ${
                    match.winnerId === match.teamBId ? "text-gold" : "text-text-main"
                  }`}
                >
                  {match.playerBName || match.teamBName}
                </span>
              </div>
            </div>

            {match.resultText && (
              <div className="mt-4 pt-4 border-t border-gold/15 text-sm sm:text-base font-serif font-bold text-gold">
                {match.resultText}
              </div>
            )}
          </div>

          {/* Man of the Match Card */}
          {match.motmPlayerName && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-royal/50 to-surface border border-gold/40 shadow-card">
              <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 text-gold-light" />
                <span>Player of the Match</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-gold-gradient">
                    {match.motmPlayerName}
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    Campus: <strong className="text-text-main">{match.motmCampusCode}</strong>
                  </p>
                </div>
                <CampusBadge shortCode={match.motmCampusCode || "MUM"} size="md" />
              </div>

              {match.motmNote && (
                <div className="mt-3 p-3 rounded-xl bg-navy/70 border border-gold/20 text-xs font-mono text-gold-light">
                  Performance: {match.motmNote}
                </div>
              )}
            </div>
          )}

          {/* Player Stats Table (if available) */}
          {match.playerStats && match.playerStats.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
                Match Player Stats
              </h4>
              <div className="overflow-x-auto rounded-xl border border-gold/15">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-gold uppercase tracking-wider border-b border-gold/15">
                    <tr>
                      <th className="p-3">Player</th>
                      <th className="p-3">Campus</th>
                      <th className="p-3 text-right">Match Stats</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10">
                    {match.playerStats.map((stat, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-semibold text-text-main">{stat.playerName}</td>
                        <td className="p-3 text-text-muted">{stat.campusCode}</td>
                        <td className="p-3 font-mono text-gold text-right tabular-nums">{stat.statsText}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Match Notes & Venue Details */}
          <div className="p-4 rounded-xl bg-navy/40 border border-gold/10 text-xs text-text-muted space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span>
                <strong className="text-text-main">Venue:</strong> {match.venue}, MPTP Campus, Shirpur
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold shrink-0" />
              <span>
                <strong className="text-text-main">Date & Time:</strong>{" "}
                {new Date(match.scheduledAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            {match.notes && (
              <div className="pt-2 border-t border-gold/10 text-text-muted">
                <strong className="text-text-main">Notes:</strong> {match.notes}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
