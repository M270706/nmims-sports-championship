"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Trophy, Award, AlertCircle } from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import PointsTable from "@/components/sports/PointsTable";
import SportLeaderboard, {
  SportLeaderboardConfig,
} from "@/components/leaderboard/SportLeaderboard";
import { SPORTS_CONFIG } from "@/config/tournament";
import { SportType, CategoryGender, Team, Match, TeamGroup, Group } from "@/types/tournament";
import { getTeams, fetchTeams, getMatches, fetchMatches } from "@/lib/tournament-store";
import { getTeamGroups, fetchTeamGroups, fetchGroups } from "@/lib/groups-store";

export const dynamic = "force-dynamic";

function StandingsContent() {
  const searchParams = useSearchParams();
  const initialSport = (searchParams.get("sport") as SportType) || "cricket";

  const [selectedSportSlug, setSelectedSportSlug] = useState<SportType>(initialSport);
  const [selectedCategory, setSelectedCategory] = useState<CategoryGender>("men");

  const [teams, setTeams] = useState<Team[]>(() => getTeams());
  const [matches, setMatches] = useState<Match[]>(() => getMatches());
  const [teamGroups, setTeamGroups] = useState<TeamGroup[]>(() => getTeamGroups());
  const [groupsList, setGroupsList] = useState<Group[]>([]);

  React.useEffect(() => {
    async function loadData() {
      const [m, t, g, grps] = await Promise.all([
        fetchMatches(),
        fetchTeams(),
        fetchTeamGroups(),
        fetchGroups(selectedSportSlug, selectedCategory),
      ]);
      setMatches(m);
      setTeams(t);
      setTeamGroups(g);
      setGroupsList(grps);
    }
    loadData();
  }, [selectedSportSlug, selectedCategory]);

  const currentSport = useMemo(
    () => SPORTS_CONFIG.find((s) => s.slug === selectedSportSlug) || SPORTS_CONFIG[0],
    [selectedSportSlug]
  );

  // Configure leaderboards strictly per Part 3 specification
  const leaderboardConfig = useMemo<SportLeaderboardConfig | null>(() => {
    if (selectedSportSlug === "cricket") {
      return {
        sportId: "cricket",
        category: selectedCategory,
        board1Title: "🏏 Highest Runs",
        board1Unit: "Runs",
        board1Data: [],
        board2Title: "🎯 Most Wickets",
        board2Unit: "Wickets",
        board2Data: [],
      };
    }

    if (selectedSportSlug === "football") {
      return {
        sportId: "football",
        category: selectedCategory,
        board1Title: "⚽ Most Goals",
        board1Unit: "Goals",
        board1Data: [],
      };
    }

    if (selectedSportSlug === "basketball") {
      return {
        sportId: "basketball",
        category: selectedCategory,
        board1Title: "🏀 Most Points Scored",
        board1Unit: "Points",
        board1Data: [],
      };
    }

    if (selectedSportSlug === "volleyball") {
      return {
        sportId: "volleyball",
        category: selectedCategory,
        board1Title: "🏐 Most Points Scored",
        board1Unit: "Points",
        board1Data: [],
      };
    }

    // Table Tennis and Lawn Tennis have NO leaderboard
    return null;
  }, [selectedSportSlug, selectedCategory]);

  return (
    <NavyPatchBackground variant="calm" className="min-h-screen py-12 sm:py-16 pb-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-md sm:max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Subtitle - hide decorative side lines on mobile */}
          <div className="text-[11px] sm:text-xs font-mono font-semibold uppercase text-gold mb-2 tracking-[0.2em] sm:tracking-widest">
            <span className="hidden sm:inline-flex items-center gap-3 title-ornament">
              Official Standings &amp; Statistics
            </span>
            <span className="sm:hidden">
              Official Standings &amp; Statistics
            </span>
          </div>
          <h1 className="text-[32px] sm:text-5xl font-serif font-black uppercase text-gold-gradient tracking-tight leading-tight">
            POINTS &amp; STATS
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-[#AEB3D6] max-w-md mx-auto">
            Group standings, qualification status, and verified player stat leaderboards computed strictly from official match scoresheets.
          </p>
        </div>

        {/* Sport Switcher — horizontally scrollable pills */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mb-6">
          <div className="flex items-center gap-2 sm:gap-3 sm:justify-center w-max sm:w-auto sm:flex-wrap">
            {SPORTS_CONFIG.map((sport) => {
              const active = selectedSportSlug === sport.slug;
              return (
                <button
                  key={sport.id}
                  type="button"
                  onClick={() => {
                    setSelectedSportSlug(sport.slug as SportType);
                    setSelectedCategory("men");
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap h-11 flex-shrink-0 ${
                    active
                      ? "btn-gold shadow-gold-glow"
                      : "bg-[#161A40] text-[#AEB3D6] hover:text-[#F4EFE3] hover:bg-[#20255A] border border-[rgba(217,178,111,0.2)]"
                  }`}
                >
                  <span>{sport.icon}</span>
                  <span>{sport.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Switcher (Men / Women) — full width on mobile */}
        {currentSport.hasMen && currentSport.hasWomen && (
          <div className="flex w-full sm:w-auto sm:justify-center mb-8 sm:mb-10">
            <div className="flex w-full sm:w-auto p-1 rounded-full bg-[#0F122E]/90 border border-gold/40 shadow-lg">
              <button
                type="button"
                onClick={() => setSelectedCategory("men")}
                className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all min-h-[40px] ${
                  selectedCategory === "men"
                    ? "bg-men text-indigo-black shadow-md"
                    : "text-[#AEB3D6] hover:text-men"
                }`}
              >
                Men&apos;s
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("women")}
                className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all min-h-[40px] ${
                  selectedCategory === "women"
                    ? "bg-women text-indigo-black shadow-md"
                    : "text-[#AEB3D6] hover:text-women"
                }`}
              >
                Women&apos;s
              </button>
            </div>
          </div>
        )}

        {/* SECTION 1: POINTS TABLE — single unified heading */}
        <div className="mb-14">
          <div className="pb-3 mb-6 border-b border-[rgba(217,178,111,0.2)]">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0" />
              <h2 className="text-[22px] sm:text-2xl font-serif font-black text-gold uppercase leading-tight">
                {currentSport.name} ({selectedCategory === "men" ? "Men" : "Women"})
              </h2>
            </div>
            <p className="text-[13px] text-gold-light/80 font-mono">
              Group Points Table · Top 2 qualify for semis (Q)
            </p>
          </div>

          <PointsTable
            sportId={selectedSportSlug}
            category={selectedCategory}
            teams={teams}
            groups={groupsList}
            teamGroups={teamGroups}
            matches={matches}
          />
        </div>

        {/* SECTION 2: STAT LEADERBOARDS */}
        {leaderboardConfig ? (
          <div>
            <div className="pb-3 mb-6 border-b border-[rgba(217,178,111,0.2)]">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0" />
                <h2 className="text-[22px] sm:text-2xl font-serif font-black text-gold uppercase leading-tight">
                  {currentSport.name} ({selectedCategory === "men" ? "Men" : "Women"}) – Stats
                </h2>
              </div>
              <p className="text-[13px] text-[#AEB3D6] font-mono">
                Official Records
              </p>
            </div>

            <SportLeaderboard config={leaderboardConfig} />
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#161A40]/50 border border-[rgba(217,178,111,0.2)] text-center text-sm text-[#AEB3D6] max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
            <AlertCircle className="w-5 h-5 text-gold flex-shrink-0" />
            <span>
              {currentSport.name} tournament standings and advancement are decided exclusively by the Group Points Table above.
            </span>
          </div>
        )}
      </div>
    </NavyPatchBackground>
  );
}

export default function StandingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-navy flex items-center justify-center text-gold font-serif">
          Loading Points &amp; Stats...
        </div>
      }
    >
      <StandingsContent />
    </Suspense>
  );
}
