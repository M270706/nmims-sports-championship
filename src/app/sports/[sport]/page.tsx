"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Trophy,
  Filter,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import MatchCard from "@/components/match/MatchCard";
import MatchDetailsModal from "@/components/match/MatchDetailsModal";
import PointsTable from "@/components/sports/PointsTable";
import SportLeaderboard, {
  SportLeaderboardConfig,
} from "@/components/leaderboard/SportLeaderboard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import EmptyState from "@/components/ui/EmptyState";
import {
  SPORTS_CONFIG,
  CAMPUSES_CONFIG,
  TOURNAMENT_DAYS,
} from "@/config/tournament";
import { getMatches, fetchMatches, getTeams, fetchTeams } from "@/lib/tournament-store";
import { getTeamGroups, fetchTeamGroups, fetchGroups } from "@/lib/groups-store";
import { Match, CategoryGender, SportType, Team, TeamGroup, Group } from "@/types/tournament";

export const dynamic = "force-dynamic";

function SportDashboardContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const sportSlug = params.sport as SportType;

  const currentSport = SPORTS_CONFIG.find((s) => s.slug === sportSlug);

  // Category state (men vs women)
  const defaultCategory =
    searchParams.get("category") === "women" && currentSport?.hasWomen
      ? "women"
      : "men";
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryGender>(defaultCategory);

  // Tab state
  const hasLeaderboard = sportSlug !== "table-tennis" && sportSlug !== "lawn-tennis";
  const [activeTab, setActiveTab] = useState<"schedule" | "results" | "points" | "leaderboard">(
    "schedule"
  );

  // Filter chips for Schedule: Day & Campus
  const [selectedDay, setSelectedDay] = useState<number | "all">("all");
  const [selectedCampus, setSelectedCampus] = useState<string | "all">("all");

  // Match details modal
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Store data with live Supabase fetch
  const [allMatches, setAllMatches] = useState<Match[]>(() => getMatches());
  const [allTeams, setAllTeams] = useState<Team[]>(() => getTeams());
  const [allGroups, setAllGroups] = useState<TeamGroup[]>(() => getTeamGroups());
  const [groupsList, setGroupsList] = useState<Group[]>([]);

  React.useEffect(() => {
    async function loadData() {
      const [m, t, g, grps] = await Promise.all([
        fetchMatches(),
        fetchTeams(),
        fetchTeamGroups(),
        fetchGroups(sportSlug, selectedCategory),
      ]);
      setAllMatches(m);
      setAllTeams(t);
      setAllGroups(g);
      setGroupsList(grps);
    }
    loadData();
  }, [sportSlug, selectedCategory]);

  // Filtered by sport and category
  const sportMatches = useMemo(() => {
    return allMatches.filter(
      (m) => m.sportId === sportSlug && m.category === selectedCategory
    );
  }, [allMatches, sportSlug, selectedCategory]);

  // Scheduled / Postponed matches for Schedule tab
  const scheduledMatches = useMemo(() => {
    let list = sportMatches.filter(
      (m) => m.status === "Scheduled" || m.status === "Postponed"
    );

    if (selectedDay !== "all") {
      const dayConfig = TOURNAMENT_DAYS.find((d) => d.dayNumber === selectedDay);
      if (dayConfig) {
        list = list.filter((m) => m.scheduledAt.startsWith(dayConfig.date));
      }
    }

    if (selectedCampus !== "all") {
      list = list.filter(
        (m) =>
          m.teamAShortCode === selectedCampus ||
          m.teamBShortCode === selectedCampus
      );
    }

    return list.sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );
  }, [sportMatches, selectedDay, selectedCampus]);

  // Completed matches for Results tab (newest first)
  const completedMatches = useMemo(() => {
    return sportMatches
      .filter((m) => m.status === "Completed")
      .sort(
        (a, b) =>
          new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
      );
  }, [sportMatches]);

  // Leaderboard config
  const leaderboardConfig = useMemo<SportLeaderboardConfig | null>(() => {
    if (sportSlug === "cricket") {
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
    if (sportSlug === "football") {
      return {
        sportId: "football",
        category: selectedCategory,
        board1Title: "⚽ Most Goals",
        board1Unit: "Goals",
        board1Data: [],
      };
    }
    if (sportSlug === "basketball") {
      return {
        sportId: "basketball",
        category: selectedCategory,
        board1Title: "🏀 Most Points Scored",
        board1Unit: "Points",
        board1Data: [],
      };
    }
    if (sportSlug === "volleyball") {
      return {
        sportId: "volleyball",
        category: selectedCategory,
        board1Title: "🏐 Most Points Scored",
        board1Unit: "Points",
        board1Data: [],
      };
    }
    return null;
  }, [sportSlug, selectedCategory]);

  if (!currentSport) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gold">Sport Not Found</h2>
          <Link href="/sports" className="mt-4 inline-block btn-gold px-6 py-2.5 text-xs font-bold uppercase rounded-xl">
            Return to Sports Overview
          </Link>
        </div>
      </div>
    );
  }

  const openMatchDetails = (match: Match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  return (
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. SPORT BANNER HERO */}
      <PageHero
        eyebrow="Tournament Discipline"
        title={
          <span className="inline-flex items-center gap-3">
            <span>{currentSport.icon}</span>
            <span>{currentSport.name}</span>
          </span>
        }
        subtitle={currentSport.description}
        imageSrc={currentSport.image}
        imageAlt={`${currentSport.name} Championship`}
        backLink={{ label: "All Sports Overview", href: "/sports" }}
      >
        {/* Dynamic Men/Women Toggle in Hero */}
        {currentSport.hasMen && currentSport.hasWomen && (
          <div className="w-full sm:w-auto flex p-1 rounded-full bg-indigo-black/90 border border-gold/40 shadow-card backdrop-blur-md">
            <button
              type="button"
              onClick={() => setSelectedCategory("men")}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-xs font-bold transition-all min-h-[40px] ${
                selectedCategory === "men"
                  ? "bg-men text-indigo-black shadow-md"
                  : "text-men hover:bg-men/10"
              }`}
            >
              Men&apos;s Division
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("women")}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-xs font-bold transition-all min-h-[40px] ${
                selectedCategory === "women"
                  ? "bg-women text-indigo-black shadow-md"
                  : "text-women hover:bg-women/10"
              }`}
            >
              Women&apos;s Division
            </button>
          </div>
        )}
      </PageHero>

      {/* 2. TABS: Schedule · Results · Points Table · Leaderboard */}
      {/* Sticky pill row on mobile under 64px header, under 80px on laptop */}
      <div className="sticky top-16 lg:top-20 z-30 bg-navy/95 backdrop-blur-md border-b border-gold/20 py-3 shadow-md">
        <Container>
          <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("schedule")}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px] shrink-0 ${
                activeTab === "schedule"
                  ? "btn-gold shadow-gold-glow"
                  : "bg-surface text-text-muted hover:text-text-main hover:bg-surface-2 border border-gold/20"
              }`}
            >
              Schedule
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("results")}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px] shrink-0 ${
                activeTab === "results"
                  ? "btn-gold shadow-gold-glow"
                  : "bg-surface text-text-muted hover:text-text-main hover:bg-surface-2 border border-gold/20"
              }`}
            >
              Results
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("points")}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px] shrink-0 ${
                activeTab === "points"
                  ? "btn-gold shadow-gold-glow"
                  : "bg-surface text-text-muted hover:text-text-main hover:bg-surface-2 border border-gold/20"
              }`}
            >
              Points Table
            </button>
            {hasLeaderboard && (
              <button
                type="button"
                onClick={() => setActiveTab("leaderboard")}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px] shrink-0 ${
                  activeTab === "leaderboard"
                    ? "btn-gold shadow-gold-glow"
                    : "bg-surface text-text-muted hover:text-text-main hover:bg-surface-2 border border-gold/20"
                }`}
              >
                Leaderboard
              </button>
            )}
          </div>
        </Container>
      </div>

      <Container className="mt-8 md:mt-12">
        {/* TAB 1: SCHEDULE */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            {/* Filter Chips: Days & Campuses */}
            <div className="p-4 rounded-2xl bg-surface/80 border border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 shadow-card">
              {/* Day Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
                <span className="text-xs font-mono text-gold uppercase tracking-wider mr-1 flex items-center gap-1 flex-shrink-0">
                  <CalendarDays className="w-3.5 h-3.5" /> Day:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedDay("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedDay === "all"
                      ? "btn-gold shadow-sm"
                      : "bg-indigo-black text-text-muted hover:text-text-main"
                  }`}
                >
                  All Days
                </button>
                {TOURNAMENT_DAYS.map((day) => (
                  <button
                    key={day.dayNumber}
                    type="button"
                    onClick={() => setSelectedDay(day.dayNumber)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedDay === day.dayNumber
                        ? "btn-gold shadow-sm"
                        : "bg-indigo-black text-text-muted hover:text-text-main"
                    }`}
                  >
                    Day {day.dayNumber} ({day.label.split(",")[0]})
                  </button>
                ))}
              </div>

              {/* Campus Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
                <span className="text-xs font-mono text-gold uppercase tracking-wider mr-1 flex items-center gap-1 flex-shrink-0">
                  <Filter className="w-3.5 h-3.5" /> Campus:
                </span>
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="bg-indigo-black text-xs font-semibold text-text-main px-3.5 py-2 rounded-xl border border-gold/30 focus:outline-none focus:border-gold h-10 min-w-[160px]"
                >
                  <option value="all">All Campuses</option>
                  {CAMPUSES_CONFIG.map((c) => (
                    <option key={c.shortCode} value={c.shortCode}>
                      {c.shortCode} – {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Matches Grid */}
            {scheduledMatches.length === 0 ? (
              <EmptyState
                icon={<Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-gold/80" />}
                title="No Fixtures Found"
                description="No scheduled fixtures match your selected filters. Try selecting All Days or All Campuses."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {scheduledMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onOpenDetails={openMatchDetails}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RESULTS */}
        {activeTab === "results" && (
          <div className="space-y-6">
            {completedMatches.length === 0 ? (
              <EmptyState
                icon={<Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-gold/80" />}
                title="No Completed Matches Yet"
                description="Results, scorecards, and Man of the Match awards will appear here as fixtures are concluded and declared by the organising committee."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {completedMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onOpenDetails={openMatchDetails}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: POINTS TABLE */}
        {activeTab === "points" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gold/20">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-gold uppercase tracking-wider">
                {currentSport.name} ({selectedCategory.toUpperCase()}) – Group Stage
              </h3>
              <span className="text-xs font-mono text-gold-light/80">
                Top 2 Qualify for Semi-Finals
              </span>
            </div>

            <PointsTable
              sportId={sportSlug}
              category={selectedCategory}
              teams={allTeams}
              groups={groupsList}
              teamGroups={allGroups}
              matches={allMatches}
            />
          </div>
        )}

        {/* TAB 4: LEADERBOARD */}
        {activeTab === "leaderboard" && hasLeaderboard && leaderboardConfig && (
          <div className="space-y-6">
            <SportLeaderboard config={leaderboardConfig} />
          </div>
        )}
      </Container>

      {/* MATCH DETAILS MODAL */}
      <MatchDetailsModal
        match={selectedMatch}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </NavyPatchBackground>
  );
}

export default function SportDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-navy flex items-center justify-center text-gold font-serif">
          Loading Championship Dashboard...
        </div>
      }
    >
      <SportDashboardContent />
    </Suspense>
  );
}
