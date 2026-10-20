"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Trophy,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Users,
} from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import CampusBadge from "@/components/ui/CampusBadge";
import MatchCard from "@/components/match/MatchCard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { getCampusDepartments } from "@/lib/campus-store";
import { getTeams, getMatches } from "@/lib/tournament-store";
import { SPORTS_CONFIG } from "@/config/tournament";

export default function CampusDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const departments = useMemo(() => getCampusDepartments(), []);
  const dept = departments.find((d) => d.slug === slug) || departments[0];

  const allTeams = useMemo(() => getTeams(), []);
  const allMatches = useMemo(() => getMatches(), []);

  // Teams for this campus
  const campusTeams = useMemo(() => {
    return allTeams.filter(
      (t) => t.campusId.toLowerCase() === dept.campusId.toLowerCase()
    );
  }, [allTeams, dept]);

  // Matches involving this campus
  const campusMatches = useMemo(() => {
    return allMatches.filter(
      (m) =>
        m.teamAShortCode.toUpperCase() === dept.shortCode.toUpperCase() ||
        m.teamBShortCode.toUpperCase() === dept.shortCode.toUpperCase()
    );
  }, [allMatches, dept]);

  return (
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="Campus Profile"
        title={dept.name}
        subtitle={`${dept.city}, ${dept.state} · Official Contingent of ${dept.totalCount > 0 ? dept.totalCount : "Host"} delegates across ${campusTeams.length} championship sports.`}
        imageSrc="/images/gallery/highlight-02-all-campuses-group.webp"
        imageAlt={`${dept.name} delegation`}
        backLink={{ label: "All Campuses", href: "/campuses" }}
      />

      <Container className="py-12 lg:py-20 space-y-12 lg:space-y-20">
        {/* Campus Overview Header Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface/90 border border-gold/25 shadow-card relative overflow-hidden">
          {dept.isHost && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-indigo-black font-black text-xs uppercase tracking-wider shadow-sm">
              HOST CAMPUS
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <CampusBadge shortCode={dept.shortCode} size="xl" isHost={false} />

            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase text-gold-light tracking-tight">
                {dept.name}
              </h2>
              <p className="text-xs sm:text-sm text-text-muted flex items-center justify-center sm:justify-start gap-1.5 mt-1.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span>
                  {dept.city}, {dept.state}
                </span>
              </p>

              {/* Numbers grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 max-w-lg">
                <div className="p-3 rounded-xl bg-indigo-black border border-gold/20 text-center">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted block">
                    Student Athletes
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-gold tabular-nums">
                    {dept.totalCount > 0 ? dept.totalCount : "Host"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-black border border-gold/20 text-center">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted block">
                    Staff Delegates
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-gold tabular-nums">
                    {dept.staffMen + dept.staffWomen > 0 ? dept.staffMen + dept.staffWomen : "Staff"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-black border border-gold/20 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted block">
                    Disciplines
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-gold tabular-nums">
                    {campusTeams.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Registered Teams */}
        <section className="space-y-6">
          <div className="pb-3 border-b border-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-5 h-5 text-gold" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gold uppercase tracking-wider">
                Teams Representing {dept.shortCode}
              </h2>
            </div>
            <span className="text-xs font-mono text-gold/80">
              {campusTeams.length} Teams
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {campusTeams.map((team) => (
              <div
                key={team.id}
                className="card-championship p-6 rounded-2xl border border-gold/20 hover:border-gold/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">
                      {
                        SPORTS_CONFIG.find((s) => s.slug === team.sportId)
                          ?.icon
                      }
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        team.category === "women"
                          ? "bg-women/15 text-women border border-women/30"
                          : "bg-men/15 text-men border border-men/30"
                      }`}
                    >
                      {team.category}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-gold-light">
                    {team.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    Sport:{" "}
                    {SPORTS_CONFIG.find((s) => s.slug === team.sportId)?.name}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between text-xs">
                  <span className="text-text-muted font-mono">
                    {team.squadSize ? `${team.squadSize} Players` : "Squad pending"}
                  </span>
                  <Link
                    href={`/teams?campus=${dept.shortCode}`}
                    className="text-gold hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>View Roster</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Matches Schedule & Results */}
        <section className="space-y-6">
          <div className="pb-3 border-b border-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-gold" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gold uppercase tracking-wider">
                Matches Involving {dept.shortCode}
              </h2>
            </div>
            <span className="text-xs font-mono text-gold/80">
              {campusMatches.length} Fixtures
            </span>
          </div>

          {campusMatches.length === 0 ? (
            <EmptyState
              icon={<Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-gold/80" />}
              title="No Fixtures Scheduled Yet"
              description={`Official match schedules involving ${dept.name} will be published prior to Day 1.`}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {campusMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </section>
      </Container>
    </NavyPatchBackground>
  );
}
