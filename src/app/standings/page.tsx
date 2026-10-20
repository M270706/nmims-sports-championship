"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Trophy, Award, AlertCircle } from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import PointsTable from "@/components/sports/PointsTable";
import SportLeaderboard, {
  SportLeaderboardConfig,
} from "@/components/leaderboard/SportLeaderboard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyState from "@/components/ui/EmptyState";
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
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="Official Standings & Statistics"
        title="Points & Stats"
        subtitle="Group pool standings, qualification status, and verified player record leaderboards computed strictly from official match scoresheets."
        imageSrc="/images/gallery/highlight-07-trophies.webp"
        imageAlt="Championship Trophies"
      />

      <Container className="py-12 md:py-16">
        {/* Sport Switcher — horizontally scrollable pills */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mb-8">
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
                      : "bg-surface text-text-muted hover:text-text-main hover:bg-surface-2 border border-gold/20"
                  }`}
                >
                  <span>{sport.icon}</span>
                  <span>{sport.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Switcher (Men / Women) */}
        {currentSport.hasMen && currentSport.hasWomen && (
          <div className="flex w-full sm:w-auto sm:justify-center mb-10 md:mb-12">
            <div className="flex w-full sm:w-auto p-1 rounded-full bg-indigo-black/90 border border-gold/40 shadow-card">
              <button
                type="button"
                onClick={() => setSelectedCategory("men")}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all min-h-[40px] ${
                  selectedCategory === "men"
                    ? "bg-men text-indigo-black shadow-md"
                    : "text-text-muted hover:text-men"
                }`}
              >
                Men&apos;s Division
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("women")}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all min-h-[40px] ${
                  selectedCategory === "women"
                    ? "bg-women text-indigo-black shadow-md"
                    : "text-text-muted hover:text-women"
                }`}
              >
                Women&apos;s Division
              </button>
            </div>
          </div>
        )}

        {/* SECTION 1: POINTS TABLE */}
        <div className="mb-16">
          <div className="pb-3 mb-8 border-b border-gold/20">
            <div className="flex items-center gap-2.5 mb-1.5">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-serif font-black text-gold uppercase tracking-wide leading-tight">
                {currentSport.name} ({selectedCategory === "men" ? "Men" : "Women"})
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gold-light/80 font-mono">
              Group Points Table · Top 2 teams from each group qualify for semi-finals (Q)
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
            <div className="pb-3 mb-8 border-b border-gold/20">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl font-serif font-black text-gold uppercase tracking-wide leading-tight">
                  {currentSport.name} ({selectedCategory === "men" ? "Men" : "Women"}) – Statistical Leaderboard
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-muted font-mono">
                Official Tournament Individual Records
              </p>
            </div>

            <SportLeaderboard config={leaderboardConfig} />
          </div>
        ) : (
          <EmptyState
            icon={<AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-gold/80" />}
            title="Single-Stage Tournament"
            description={`${currentSport.name} tournament standings and advancement are decided exclusively by the Group Points Table above.`}
          />
        )}
      </Container>
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
