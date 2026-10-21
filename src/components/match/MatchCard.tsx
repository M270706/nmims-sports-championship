"use client";

import React from "react";
import { MapPin, Award, CalendarPlus } from "lucide-react";
import CampusBadge from "@/components/ui/CampusBadge";
import { Match } from "@/types/tournament";
import { downloadIcsFile, IST_TIME_ZONE } from "@/lib/calendar";

export interface MatchCardProps {
  match: Match;
  onSelect?: (match: Match) => void;
  onOpenDetails?: (match: Match) => void;
  type?: "scheduled" | "result";
}

export default function MatchCard({ match, onSelect, onOpenDetails, type = "scheduled" }: MatchCardProps) {
  const isFinal = match.round === "Final";
  const isCompleted = match.status === "Completed" || type === "result";
  const handleClick = onOpenDetails || onSelect;

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadIcsFile({
      title: `${match.round}: ${match.teamAName} vs ${match.teamBName}`,
      description: `SVKM's NMIMS Inter Campus Sports Championship 2026-27 - ${match.sportId.toUpperCase()} (${match.category.toUpperCase()})\nMatch #${match.matchNo} (${match.round})\nVenue: ${match.venue}`,
      location: `${match.venue}, Mukesh Patel Technology Park, Shirpur`,
      startDate: match.scheduledAt,
    });
  };

  const formattedDate = new Date(match.scheduledAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: IST_TIME_ZONE,
  });

  const formattedTime = new Date(match.scheduledAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: IST_TIME_ZONE,
  });

  return (
    <div
      onClick={() => handleClick && handleClick(match)}
      className={`card-championship p-5 md:p-6 rounded-2xl relative overflow-hidden transition-all duration-200 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 ${
        handleClick ? "cursor-pointer" : ""
      } ${
        isFinal
          ? "border-2 border-gold shadow-gold-glow"
          : "border border-gold/20 hover:border-gold/40"
      }`}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-gold/15 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-gold px-2 py-0.5 rounded-md bg-navy border border-gold/30">
            M#{match.matchNo}
          </span>
          <span className="font-semibold px-2.5 py-0.5 rounded-full bg-surface-2 text-gold-light border border-gold/20">
            {match.round}
          </span>
          <span
            className={`font-semibold px-2 py-0.5 rounded-full text-[11px] font-mono uppercase ${
              match.category === "women"
                ? "bg-women/15 text-women border border-women/30"
                : "bg-men/15 text-men border border-men/30"
            }`}
          >
            {match.category.toUpperCase()}
          </span>
        </div>

        {/* Status Chip */}
        <div>
          {match.status === "Postponed" ? (
            <span className="px-2.5 py-0.5 rounded-full bg-warning/20 text-warning border border-warning/40 font-bold text-[11px] font-mono uppercase">
              Postponed
            </span>
          ) : isCompleted ? (
            <span className="px-2.5 py-0.5 rounded-full bg-success/20 text-success border border-success/40 font-bold text-[11px] font-mono uppercase">
              Completed
            </span>
          ) : (
            <span className="text-text-muted font-mono text-[11px] tabular-nums">
              {formattedDate} · {formattedTime}
            </span>
          )}
        </div>
      </div>

      {/* PHONE LAYOUT (below md / lg) */}
      <div className="md:hidden space-y-3 py-1">
        {/* Team A */}
        <div className="flex items-center gap-3">
          <CampusBadge shortCode={match.teamAShortCode} size="md" />
          <div className="min-w-0 flex-1">
            <h4
              className={`text-sm font-serif font-bold truncate ${
                isCompleted && match.winnerId === match.teamAId
                  ? "text-gold"
                  : isCompleted && match.winnerId && match.winnerId !== match.teamAId
                  ? "text-text-muted/60"
                  : "text-text-main"
              }`}
            >
              {match.playerAName || match.teamAName}
            </h4>
            <span className="text-[11px] text-text-muted font-mono">{match.teamAShortCode}</span>
          </div>
        </div>

        {/* VS / Score Divider */}
        <div className="flex items-center justify-center my-1">
          {isCompleted && match.scoreSummary ? (
            <span className="text-xs font-mono font-bold text-gold px-3 py-1 rounded-md bg-navy/80 border border-gold/30">
              {match.scoreSummary}
            </span>
          ) : (
            <span className="text-xs font-mono font-bold text-gold/80 px-2.5 py-0.5 rounded-full bg-navy/80 border border-gold/20">
              VS
            </span>
          )}
        </div>

        {/* Team B */}
        <div className="flex items-center gap-3">
          <CampusBadge shortCode={match.teamBShortCode} size="md" />
          <div className="min-w-0 flex-1">
            <h4
              className={`text-sm font-serif font-bold truncate ${
                isCompleted && match.winnerId === match.teamBId
                  ? "text-gold"
                  : isCompleted && match.winnerId && match.winnerId !== match.teamBId
                  ? "text-text-muted/60"
                  : "text-text-main"
              }`}
            >
              {match.playerBName || match.teamBName}
            </h4>
            <span className="text-[11px] text-text-muted font-mono">{match.teamBShortCode}</span>
          </div>
        </div>
      </div>

      {/* LAPTOP LAYOUT (md / lg and above) */}
      <div className="hidden md:grid grid-cols-12 gap-3 items-center py-2">
        {/* Team A */}
        <div className="col-span-5 flex items-center gap-3 min-w-0">
          <CampusBadge shortCode={match.teamAShortCode} size="md" />
          <div className="min-w-0 flex-1">
            <h4
              className={`text-sm lg:text-base font-serif font-bold truncate ${
                isCompleted && match.winnerId === match.teamAId
                  ? "text-gold"
                  : isCompleted && match.winnerId && match.winnerId !== match.teamAId
                  ? "text-text-muted/60"
                  : "text-text-main"
              }`}
            >
              {match.playerAName || match.teamAName}
            </h4>
            <span className="text-[11px] text-text-muted block truncate">
              {match.teamAShortCode}
            </span>
          </div>
        </div>

        {/* VS / Score Divider */}
        <div className="col-span-2 text-center flex flex-col items-center justify-center">
          {isCompleted && match.scoreSummary ? (
            <div className="text-xs font-mono font-bold text-gold px-2.5 py-1 rounded bg-navy/80 border border-gold/30 whitespace-nowrap">
              {match.scoreSummary}
            </div>
          ) : (
            <span className="text-xs font-black font-mono tracking-widest text-gold/80 px-2.5 py-1 rounded-full bg-navy/80 border border-gold/20">
              VS
            </span>
          )}
        </div>

        {/* Team B */}
        <div className="col-span-5 flex items-center justify-end gap-3 text-right min-w-0">
          <div className="min-w-0 flex-1">
            <h4
              className={`text-sm lg:text-base font-serif font-bold truncate ${
                isCompleted && match.winnerId === match.teamBId
                  ? "text-gold"
                  : isCompleted && match.winnerId && match.winnerId !== match.teamBId
                  ? "text-text-muted/60"
                  : "text-text-main"
              }`}
            >
              {match.playerBName || match.teamBName}
            </h4>
            <span className="text-[11px] text-text-muted block truncate">
              {match.teamBShortCode}
            </span>
          </div>
          <CampusBadge shortCode={match.teamBShortCode} size="md" />
        </div>
      </div>

      {/* Result Line (for completed matches) */}
      {isCompleted && match.resultText && (
        <div className="mt-3 pt-3 border-t border-gold/15 text-center">
          <div className="text-xs sm:text-sm font-semibold text-gold-light">
            {match.resultText}
          </div>
          {match.motmPlayerName && (
            <div className="mt-1.5 text-xs text-gold flex items-center justify-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-gold-light" />
              <span>
                🏅 Player of the Match: <strong>{match.motmPlayerName}</strong> ({match.motmCampusCode || match.motmCampus})
              </span>
            </div>
          )}
        </div>
      )}

      {/* Footer Info for Scheduled Matches */}
      {!isCompleted && (
        <div className="mt-4 pt-3 border-t border-gold/15 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-text-muted gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="truncate">{match.venue}</span>
            <span className="text-gold/50 mx-1 hidden sm:inline">·</span>
            <span className="font-mono text-[11px] sm:inline block text-gold/80">
              {formattedDate} · {formattedTime}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCalendarClick}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface hover:bg-gold hover:text-navy border border-gold/25 text-gold text-xs font-semibold transition-colors min-h-[36px]"
            title="Add to Calendar"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>Add to Calendar (.ics)</span>
          </button>
        </div>
      )}
    </div>
  );
}
