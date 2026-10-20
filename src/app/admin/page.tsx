"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  FileEdit,
  Clock,
  BarChart2,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { SPORTS_CONFIG } from "@/config/tournament";
import { getMatches } from "@/lib/tournament-store";

export default function AdminDashboardPage() {
  const matches = useMemo(() => getMatches(), []);

  const todayIso = "2026-10-27";

  const matchesToday = matches.filter(
    (m) => m.scheduledAt && m.scheduledAt.startsWith(todayIso)
  ).length;

  const matchesUpcoming = matches.filter(
    (m) => m.status === "Scheduled" || m.status === "Postponed"
  ).length;

  const totalCompleted = matches.filter((m) => m.status === "Completed").length;

  const totalPending = matches.filter(
    (m) =>
      m.status === "Completed" &&
      (!m.motmPlayerId || !m.playerStats || m.playerStats.length === 0)
  ).length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-gold/15">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold">
              Control Centre
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black uppercase text-gold-gradient mt-1">
              Admin Overview Dashboard
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Live tournament metrics, pending scorecard entries, and quick actions.
            </p>
          </div>

          {/* Quick Buttons: Add Match, Enter Result, Update Points Table */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <Link
              href="/admin/matches?action=new"
              className="px-4 py-2.5 rounded-xl btn-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm min-h-[44px]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Match</span>
            </Link>

            <Link
              href="/admin/results"
              className="px-4 py-2.5 rounded-xl btn-royal text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <FileEdit className="w-4 h-4 text-gold" />
              <span>Enter Result</span>
            </Link>

            <Link
              href="/admin/points"
              className="px-4 py-2.5 rounded-xl btn-outline-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <BarChart2 className="w-4 h-4 text-gold" />
              <span>Update Points Table</span>
            </Link>
          </div>
        </div>

        {/* 4 Stat Metric Cards (Today, Upcoming, Completed, Pending Results) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Matches Today */}
          <div className="card-championship p-6 border border-gold/15 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Matches Today
              </span>
              <div className="p-2 rounded-xl bg-surface border border-gold/20 text-gold">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl sm:text-4xl font-mono font-black text-gold tabular-nums">
                {matchesToday}
              </span>
              <span className="text-xs text-text-muted block mt-1">
                Day 1 (27 Oct 2026)
              </span>
            </div>
          </div>

          {/* Upcoming Matches */}
          <div className="card-championship p-6 border border-gold/15 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Upcoming Matches
              </span>
              <div className="p-2 rounded-xl bg-surface border border-gold/20 text-blue-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl sm:text-4xl font-mono font-black text-blue-400 tabular-nums">
                {matchesUpcoming}
              </span>
              <span className="text-xs text-text-muted block mt-1">
                Scheduled / Postponed
              </span>
            </div>
          </div>

          {/* Completed Matches */}
          <div className="card-championship p-6 border border-gold/15 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Completed Matches
              </span>
              <div className="p-2 rounded-xl bg-surface border border-gold/20 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl sm:text-4xl font-mono font-black text-emerald-400 tabular-nums">
                {totalCompleted}
              </span>
              <span className="text-xs text-text-muted block mt-1">
                Scorecards recorded
              </span>
            </div>
          </div>

          {/* Pending Results / Incomplete Stats */}
          <div className="card-championship p-6 border border-gold/15 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Pending Results
              </span>
              <div className="p-2 rounded-xl bg-surface border border-gold/20 text-amber-400">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl sm:text-4xl font-mono font-black text-amber-400 tabular-nums">
                {totalPending}
              </span>
              <span className="text-xs text-text-muted block mt-1">
                Missing MOTM or player stats
              </span>
            </div>
          </div>
        </div>

        {/* Total Matches Scheduled Per Sport Grid */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface/90 border border-gold/15 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-serif font-bold text-gold-gradient uppercase">
              Total Matches Scheduled Per Sport
            </h3>
            <span className="text-xs font-mono text-gold">
              Tournament Totals
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPORTS_CONFIG.map((sport) => {
              const sportCount = matches.filter(
                (m) => m.sportId === sport.slug
              ).length;

              return (
                <div
                  key={sport.id}
                  className="p-4 rounded-xl bg-navy/60 border border-gold/15 text-center flex flex-col items-center justify-center hover:border-gold/40 transition-colors"
                >
                  <span className="text-2xl mb-1">{sport.icon}</span>
                  <span className="text-xs font-serif font-bold text-text-main truncate w-full">
                    {sport.name}
                  </span>
                  <span className="text-xl font-mono font-black text-gold mt-1 tabular-nums">
                    {sportCount}
                  </span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">
                    Fixtures
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
