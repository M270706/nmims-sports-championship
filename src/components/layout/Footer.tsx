import React from "react";
import Link from "next/link";
import { MapPin, Phone, Trophy, Award } from "lucide-react";
import { TOURNAMENT_CONFIG, SPORTS_CONFIG } from "@/config/tournament";
import { LEADERSHIP_CONFIG, COMMITTEE_CONFIG } from "@/config/contacts";
import BrandLogos from "@/components/ui/BrandLogos";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="relative bg-indigo-black border-t border-gold/20 text-text-main overflow-hidden pt-12 md:pt-16 pb-12 sm:pb-16">
      {/* Background ambient subtle glow */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-royal rounded-full filter blur-3xl" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-cobalt rounded-full filter blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Top bar with dual logos: BrandLogos size="footer" (h-14 w-14) */}
        <div className="pb-8 md:pb-10 border-b border-gold/15">
          <BrandLogos
            size="footer"
            leftAddon={
              <div className="hidden sm:flex items-center space-x-3.5 pl-2">
                <div className="h-7 w-px bg-gold/25" />
                <span className="text-xs font-medium text-text-muted">
                  Shri Vile Parle Kelavani Mandal
                </span>
              </div>
            }
            rightAddon={
              <div className="hidden sm:flex items-center space-x-3.5 pr-2">
                <span className="text-xs font-medium text-text-muted text-right">
                  Deemed-to-be University
                </span>
                <div className="h-7 w-px bg-gold/25" />
              </div>
            }
          />
        </div>

        {/* Main 4-column footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 py-10 md:py-12 border-b border-gold/15">
          {/* Col 1: Championship Info & Venue */}
          <div className="space-y-4">
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
            <div className="pt-2 text-xs text-text-muted flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <div className="whitespace-pre-line leading-relaxed font-sans">
                {TOURNAMENT_CONFIG.venueAddress}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
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
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold mb-4">
              Sports Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
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
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold mb-4">
              Key Contacts
            </h4>
            <div className="space-y-3.5 text-xs">
              {/* Leadership */}
              <div className="p-3.5 rounded-xl bg-surface border border-gold/20">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gold uppercase tracking-wider mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Leadership</span>
                </div>
                <div className="font-serif font-bold text-gold text-sm">{LEADERSHIP_CONFIG.name}</div>
                <div className="text-text-muted text-[11px] mt-0.5">{LEADERSHIP_CONFIG.role}</div>
              </div>

              {/* Organising Committee */}
              <div className="space-y-2.5 pt-1">
                <div className="font-semibold text-text-muted text-[11px] uppercase tracking-wide">
                  Organising Committee:
                </div>
                {COMMITTEE_CONFIG.map((member) => (
                  <div
                    key={member.name}
                    className="py-1.5 border-b border-gold/10 flex flex-col sm:flex-row sm:items-start justify-between gap-1.5"
                  >
                    <div className="min-w-0">
                      <span className="text-text-main font-semibold text-xs block leading-snug">
                        {member.name}
                      </span>
                      <span className="text-text-muted text-[11px] block">
                        {member.role}
                      </span>
                    </div>
                    {member.phone && (
                      <a
                        href={`tel:${member.phone.replace(/\s+/g, "")}`}
                        className="text-gold hover:underline font-mono text-xs whitespace-nowrap inline-flex items-center justify-center sm:justify-start gap-1 py-1 px-2.5 sm:p-0 rounded-lg sm:rounded-none bg-surface/60 sm:bg-transparent border sm:border-0 border-gold/20 mt-1 sm:mt-0"
                      >
                        <Phone className="w-3 h-3 text-gold/80" />
                        <span>{member.phone}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright, privacy notice, and navigation */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted gap-4 text-center md:text-left pb-6 md:pb-2">
          <div className="space-y-1">
            <p>© 2026 SVKM&apos;s NMIMS Sports Department. All rights reserved.</p>
            <p className="text-[11px] text-text-muted/70">
              Privacy Notice: This site does not collect personal data from visitors.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/rules" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
              Eligibility Rules
            </Link>
            <Link href="/travel" className="hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded">
              Reporting: 26 Oct 12:00 Noon
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
