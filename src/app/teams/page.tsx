"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Users,
} from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import CampusBadge from "@/components/ui/CampusBadge";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import EmptyState from "@/components/ui/EmptyState";
import {
  CAMPUSES_CONFIG,
  SPORTS_CONFIG,
} from "@/config/tournament";
import { fetchTeams, getSeededTeams } from "@/lib/tournament-store";
import { Team } from "@/types/tournament";

function TeamsContent() {
  const searchParams = useSearchParams();
  const campusQuery = searchParams.get("campus");

  const [viewMode, setViewMode] = useState<"campus" | "sport">("campus");
  const [selectedCampus, setSelectedCampus] = useState<string>(
    campusQuery || "all"
  );
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  // Teams from Supabase (with seeded fallback)
  const [allTeams, setAllTeams] = useState<Team[]>(getSeededTeams());

  useEffect(() => {
    fetchTeams()
      .then((data) => {
        if (data && data.length > 0) {
          setAllTeams(data);
        }
      })
      .catch((err) => console.error("fetchTeams error:", err));
  }, []);

  // Filtered teams
  const filteredTeams = useMemo(() => {
    return allTeams.filter((team) => {
      const campusMatch =
        selectedCampus === "all" ||
        team.campusId.toUpperCase() === selectedCampus.toUpperCase() ||
        CAMPUSES_CONFIG.find((c) => c.shortCode === selectedCampus)?.id ===
          team.campusId;

      const sportMatch =
        selectedSport === "all" || team.sportId === selectedSport;

      return campusMatch && sportMatch;
    });
  }, [allTeams, selectedCampus, selectedSport]);

  const toggleTeamExpand = (id: string) => {
    setExpandedTeamId(expandedTeamId === id ? null : id);
  };

  return (
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. Header Banner */}
      <PageHero
        eyebrow="Pan-India Delegations"
        title="Championship Teams"
        subtitle="7 campuses, 10 categories, 70 official teams competing in Shirpur. Browse rosters, player squads, and campus contingents."
        imageSrc="/images/gallery/highlight-02-all-campuses-group.webp"
        imageAlt="All seven NMIMS campuses gathered at the championship"
      />

      <Container className="py-12 md:py-16">
        {/* Filters and View Switcher */}
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-gold/20 mb-10 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-card">
          {/* View Mode Toggle: Campus View vs Sport View */}
          <div className="flex items-center p-1 rounded-xl bg-indigo-black border border-gold/30 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setViewMode("campus")}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] ${
                viewMode === "campus"
                  ? "bg-gold text-indigo-black shadow"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              Campus View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("sport")}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] ${
                viewMode === "sport"
                  ? "bg-gold text-indigo-black shadow"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              Sport View
            </button>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Campus Selector */}
            <div className="flex-1 sm:flex-none">
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-indigo-black border border-gold/30 text-xs font-semibold text-gold focus:outline-none focus:border-gold h-11"
              >
                <option value="all">All 7 Campuses</option>
                {CAMPUSES_CONFIG.map((c) => (
                  <option key={c.shortCode} value={c.shortCode}>
                    {c.name} ({c.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Sport Selector */}
            <div className="flex-1 sm:flex-none">
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-indigo-black border border-gold/30 text-xs font-semibold text-gold focus:outline-none focus:border-gold h-11"
              >
                <option value="all">All 6 Sports</option>
                {SPORTS_CONFIG.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* CAMPUS VIEW (Default) */}
        {viewMode === "campus" && (
          <div className="space-y-16">
            {CAMPUSES_CONFIG.filter(
              (c) =>
                selectedCampus === "all" ||
                selectedCampus.toUpperCase() === c.shortCode.toUpperCase()
            ).map((campus) => {
              const campusTeams = filteredTeams.filter(
                (t) => t.campusId === campus.id
              );

              return (
                <div key={campus.id} className="space-y-6">
                  {/* Campus Header Section */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-surface-2 via-surface to-indigo-black border border-gold/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-card">
                    <div className="flex items-center gap-4">
                      <CampusBadge
                        shortCode={campus.shortCode}
                        size="lg"
                        isHost={campus.isHost}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-serif font-black text-gold-light">
                            {campus.name}
                          </h2>
                          {campus.isHost && (
                            <span className="px-2 py-0.5 rounded-full bg-gold text-indigo-black font-black text-[10px] tracking-wider">
                              HOST
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gold" />
                          <span>
                            {campus.city}, {campus.state}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-gold font-mono">
                      {campusTeams.length} Competition Teams
                    </div>
                  </div>

                  {/* Campus Teams Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {campusTeams.map((team) => {
                      const isExpanded = expandedTeamId === team.id;
                      const hasSquad =
                        team.players && team.players.length > 0;

                      return (
                        <div
                          key={team.id}
                          className="card-championship overflow-hidden rounded-2xl border border-gold/20 hover:border-gold/40 flex flex-col"
                        >
                          <div
                            onClick={() => toggleTeamExpand(team.id)}
                            className="p-5 cursor-pointer flex items-center justify-between gap-3 bg-surface hover:bg-surface-2 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">
                                {
                                  SPORTS_CONFIG.find(
                                    (s) => s.slug === team.sportId
                                  )?.icon
                                }
                              </span>
                              <div>
                                <h3 className="font-serif font-bold text-sm sm:text-base text-gold-light">
                                  {team.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                      team.category === "women"
                                        ? "bg-women/15 text-women"
                                        : "bg-men/15 text-men"
                                    }`}
                                  >
                                    {team.category.toUpperCase()}
                                  </span>
                                  {team.squadSize && (
                                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30">
                                      Squad: {team.squadSize}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="p-1.5 rounded-lg text-gold hover:bg-surface-2"
                              aria-label="Toggle team roster"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                          </div>

                          {/* Expanded Squad Roster */}
                          {isExpanded && (
                            <div className="p-5 border-t border-gold/15 bg-indigo-black/80 space-y-3 animate-fadeIn">
                              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
                                Official Squad Roster
                              </h4>

                              {!hasSquad ? (
                                <div className="py-6 text-center text-xs text-text-muted italic">
                                  Squad to be announced by sports department
                                </div>
                              ) : (
                                <div className="space-y-1.5 text-xs">
                                  {team.players!.map((player) => (
                                    <div
                                      key={player.id}
                                      className="p-2.5 rounded-xl bg-surface flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-gold font-bold w-5">
                                          #{player.jerseyNo || "-"}
                                        </span>
                                        <span className="font-semibold text-text-main">
                                          {player.name}
                                        </span>
                                        {player.isCaptain && (
                                          <span className="text-[10px] font-black text-gold bg-gold/15 px-1.5 py-0.5 rounded">
                                            (C)
                                          </span>
                                        )}
                                        {player.isWk && (
                                          <span className="text-[10px] font-black text-men bg-men/15 px-1.5 py-0.5 rounded">
                                            (WK)
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-text-muted text-[11px]">
                                        {player.role || "Player"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SPORT VIEW */}
        {viewMode === "sport" && (
          <div className="space-y-16">
            {SPORTS_CONFIG.filter(
              (s) => selectedSport === "all" || selectedSport === s.slug
            ).map((sport) => {
              const sportTeams = filteredTeams.filter(
                (t) => t.sportId === sport.slug
              );

              return (
                <div key={sport.id} className="space-y-6">
                  {/* Sport Header */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-surface-2 via-surface to-indigo-black border border-gold/25 flex items-center justify-between shadow-card">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{sport.icon}</span>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-serif font-black text-gold-light">
                          {sport.name} Championship
                        </h2>
                        <p className="text-xs text-text-muted mt-0.5">
                          {sportTeams.length} Teams Registered
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sport Teams Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {sportTeams.map((team) => (
                      <div
                        key={team.id}
                        className="card-championship p-5 rounded-2xl border border-gold/20 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <CampusBadge
                            shortCode={team.campusId}
                            size="md"
                          />
                          <div>
                            <h3 className="font-serif font-bold text-sm sm:text-base text-gold-light">
                              {team.name}
                            </h3>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-block mt-1 ${
                                team.category === "women"
                                  ? "bg-women/15 text-women"
                                  : "bg-men/15 text-men"
                              }`}
                            >
                              {team.category.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        {team.squadSize && (
                          <span className="text-xs font-mono text-gold/80">
                            {team.squadSize} Players
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </NavyPatchBackground>
  );
}

export default function TeamsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-navy flex items-center justify-center text-gold font-serif">
          Loading Teams Directory...
        </div>
      }
    >
      <TeamsContent />
    </Suspense>
  );
}
