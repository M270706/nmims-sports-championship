import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Trophy, Award } from "lucide-react";
import { TOURNAMENT_CONFIG, SPORTS_CONFIG } from "@/config/tournament";
import { LEADERSHIP_CONFIG, COMMITTEE_CONFIG } from "@/config/contacts";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="relative bg-navy border-t border-gold/20 text-text-main overflow-hidden pt-12 lg:pt-16 pb-20 lg:pb-12">
      {/* Background ambient subtle glow */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-royal rounded-full filter blur-3xl" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-cobalt rounded-full filter blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Top bar with dual logos in identical boxes (relative h-16 w-16 shrink-0) */}
        <div className="pb-8 lg:pb-10 border-b border-gold/15 flex items-center justify-between w-full min-w-0">
          {/* SVKM logo + text */}
          <div className="flex items-center gap-3.5 shrink-0">
            <Link
              href="/home"
              className="relative h-16 w-16 shrink-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              title="SVKM - Shri Vile Parle Kelavani Mandal"
            >
              <Image
                src="/images/svkm-logo.webp"
                alt="SVKM"
                fill
                sizes="64px"
                className="object-contain"
              />
            </Link>
            <div className="hidden sm:flex items-center gap-3.5">
              <div className="h-8 w-px bg-gold/25" />
              <span className="text-xs font-medium text-text-muted leading-tight">
                Shri Vile Parle Kelavani Mandal
              </span>
            </div>
          </div>

          {/* NMIMS logo + text */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="hidden sm:flex items-center gap-3.5">
              <span className="text-xs font-medium text-text-muted text-right leading-tight">
                Deemed-to-be University
              </span>
              <div className="h-8 w-px bg-gold/25" />
            </div>
            <Link
              href="/home"
              className="relative h-16 w-16 shrink-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              title="NMIMS Deemed to be University"
            >
              <Image
                src="/images/nmims-logo-v3-white.webp"
                alt="NMIMS"
                fill
                sizes="64px"
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Main content: Phone = stacked & centred; Laptop = 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 py-10 lg:py-12 border-b border-gold/15 text-center lg:text-left">
          {/* Col 1: Championship Info & Venue */}
          <div className="space-y-4 flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-gold/25 text-xs font-semibold text-gold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Official Sports Portal</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-gold-light leading-snug">
              {TOURNAMENT_CONFIG.fullName}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Hosted by {TOURNAMENT_CONFIG.hostCampus}
            </p>
            <div className="pt-2 text-xs text-text-muted flex items-center lg:items-start justify-center lg:justify-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div className="whitespace-pre-line leading-relaxed font-sans text-center lg:text-left">
                {TOURNAMENT_CONFIG.venueAddress}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold mb-4">
              Championship Links
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li>
                <Link href="/home" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
                  Sports &amp; Fixtures
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
                  Participating Teams
                </Link>
              </li>
              <li>
                <Link href="/campuses" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
                  Campus Contingents
                </Link>
              </li>
              <li>
                <Link href="/standings" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
                  Points &amp; Stats
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
                  Tournament Gallery
                </Link>
              </li>
              <li>
                <Link href="/travel" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
                  Travel &amp; Stay
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
                  Rules &amp; Eligibility
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-gold transition-colors text-xs text-gold/70 inline-flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-gold rounded">
                  <span>Admin Portal</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sports Dashboards */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold mb-4">
              Sports Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted w-full max-w-xs lg:max-w-none">
              {SPORTS_CONFIG.map((sport) => (
                <li key={sport.id}>
                  <Link
                    href={`/sports/${sport.slug}`}
                    className="hover:text-gold transition-colors flex items-center justify-between group focus-visible:ring-1 focus-visible:ring-gold rounded"
                  >
                    <span>
                      {sport.icon} {sport.name}
                    </span>
                    <span className="text-xs font-mono text-gold/60 group-hover:text-gold">
                      {sport.hasMen && sport.hasWomen ? "M / W" : "Men"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Key Contacts */}
          <div className="flex flex-col items-start w-full text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold mb-4">
              Key Contacts
            </h4>
            <div className="w-full">
              {/* Leadership */}
              <div className="w-full p-3.5 rounded-xl bg-surface border border-gold/20 text-left">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gold uppercase tracking-wider mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Leadership</span>
                </div>
                <div className="font-serif font-bold text-gold text-sm">{LEADERSHIP_CONFIG.name}</div>
                <div className="text-text-muted text-xs mt-0.5">{LEADERSHIP_CONFIG.role}</div>
              </div>

              {/* Organising Committee */}
              <div className="mt-5 w-full">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Organising Committee
                </p>
                <ul className="divide-y divide-[#D9B26F]/10">
                  {COMMITTEE_CONFIG.map((c) => (
                    <li key={c.name} className="py-3">
                      <p className="text-[15px] font-semibold leading-tight text-white">{c.name}</p>
                      <p className="mt-0.5 text-xs leading-snug text-white/60">{c.role}</p>
                      {c.phone && (
                        <a
                          href={`tel:${c.phone.replace(/\s/g, "")}`}
                          className="mt-1.5 inline-flex items-center gap-1.5 whitespace-nowrap text-sm tabular-nums text-[#D9B26F] hover:text-[#F0D38F]"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0"
                          >
                            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                          </svg>
                          {c.phone}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: Laptop = © left / links right; Phone = stacked */}
        {/* Extra bottom padding pb-12 ensures privacy notice never overlaps dev badges */}
        <div className="pt-8 pb-12 flex flex-col lg:flex-row items-center justify-between text-xs text-text-muted gap-4 text-center lg:text-left">
          <div className="space-y-1">
            <p>© 2026 SVKM&apos;s NMIMS Sports Department. All rights reserved.</p>
            <p className="text-[11px] text-text-muted/80">
              Privacy Notice: This site does not collect personal data from visitors.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/rules" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
              Eligibility Rules
            </Link>
            <Link href="/travel" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
              Reporting: 27th Oct 2026, 12:00 Noon
            </Link>
            <Link href="/contact" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
