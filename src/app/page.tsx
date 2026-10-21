"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Trophy,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import ChampionshipTitle from "@/components/ui/ChampionshipTitle";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import BrandLogos from "@/components/ui/BrandLogos";
import CampusBackground from "@/components/ui/CampusBackground";
import Container from "@/components/ui/Container";

const emptySubscribe = () => () => {};

export default function StartingEntryPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    const targetDate = new Date("2026-10-27T09:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative isolate min-h-screen min-h-[100svh] overflow-hidden flex flex-col justify-between text-text-main select-none">
      {/* 1. SHARED CAMPUS BACKGROUND */}
      <CampusBackground />

      {/* Layered royal-blue patches at about 10% opacity */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-10">
        <NavyPatchBackground variant="calm" className="w-full h-full" />
      </div>

      {/* 2. HEADER: BrandLogos with SVKM on far left and NMIMS on far right */}
      <header className="relative z-20 w-full py-6 sm:py-8">
        <Container>
          <BrandLogos size="xl" mobileSize="xs" href="/home" />
        </Container>
      </header>

      {/* 3. CENTRE: Championship Title, Dates, Countdown, and Two Cards */}
      <Container className="relative z-20 flex-1 flex flex-col items-center justify-center py-6 text-center max-w-5xl">
        {/* Championship Title */}
        <ChampionshipTitle />

        {/* Dates Line */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-light text-text-main tracking-wide drop-shadow text-balance">
          27 – 31 October 2026 · MPTP Shirpur Campus
        </p>

        {/* Countdown Timer */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2.5 sm:gap-4 font-heading">
          <div className="flex flex-col items-center p-3 rounded-2xl bg-surface/85 border border-gold/30 backdrop-blur-md min-w-[64px] sm:min-w-[76px] shadow-card">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gold tabular-nums">
              {mounted ? timeLeft.days : "00"}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-text-muted mt-0.5">
              Days
            </span>
          </div>
          <span className="text-lg sm:text-xl font-bold text-gold/60">:</span>
          <div className="flex flex-col items-center p-3 rounded-2xl bg-surface/85 border border-gold/30 backdrop-blur-md min-w-[64px] sm:min-w-[76px] shadow-card">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gold tabular-nums">
              {mounted ? String(timeLeft.hours).padStart(2, "0") : "00"}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-text-muted mt-0.5">
              Hours
            </span>
          </div>
          <span className="text-lg sm:text-xl font-bold text-gold/60">:</span>
          <div className="flex flex-col items-center p-3 rounded-2xl bg-surface/85 border border-gold/30 backdrop-blur-md min-w-[64px] sm:min-w-[76px] shadow-card">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gold tabular-nums">
              {mounted ? String(timeLeft.minutes).padStart(2, "0") : "00"}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-text-muted mt-0.5">
              Minutes
            </span>
          </div>
        </div>

        {/* Two Portal Cards */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full max-w-3xl text-left items-stretch">
          {/* USER PORTAL CARD */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface/80 backdrop-blur-xl border border-gold/25 hover:border-gold/50 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-sm">
                  <Trophy className="w-6 h-6 text-gold" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/30">
                  Public Portal
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-text-main">
                User Portal
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-text-muted leading-relaxed">
                View schedules, match results, points tables, team contingents, photo gallery, and travel instructions.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gold/15">
              <Link
                href="/home"
                className="w-full h-11 px-6 rounded-xl btn-gold text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <span>Enter User Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ADMIN PORTAL CARD */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface/80 backdrop-blur-xl border border-royal/40 hover:border-gold/50 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-royal/20 border border-royal/40 flex items-center justify-center text-gold shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-gold-light" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-royal/30 text-gold-light border border-royal/40">
                  Organisers Only
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-text-main">
                Admin Portal
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-text-muted leading-relaxed">
                Authorised sports committee portal to schedule fixtures, verify scorecards, and publish points.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gold/15">
              <Link
                href="/admin/login"
                className="w-full h-11 px-6 rounded-xl btn-royal text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <span>Admin Login</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* 4. FOOTER */}
      <footer className="relative z-20 w-full py-4 text-center text-xs text-text-muted/70 border-t border-gold/10 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Container>
          <p>© 2026 SVKM&apos;s NMIMS Sports Department. All rights reserved.</p>
        </Container>
      </footer>
    </main>
  );
}
