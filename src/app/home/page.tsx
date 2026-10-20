"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  ArrowRight,
  ChevronDown,
  MapPin,
  Award,
  ExternalLink,
} from "lucide-react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import AnnouncementTicker from "@/components/ui/AnnouncementTicker";
import CampusBadge from "@/components/ui/CampusBadge";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ImageLightbox, { LightboxImage } from "@/components/ui/ImageLightbox";
import ChampionshipTitle from "@/components/ui/ChampionshipTitle";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  TOURNAMENT_CONFIG,
  SPORTS_CONFIG,
  CAMPUSES_CONFIG,
} from "@/config/tournament";
import { getAnnouncementsAction } from "@/app/actions/announcements";
import CampusBackground from "@/components/ui/CampusBackground";

export default function UserHomePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    getAnnouncementsAction()
      .then((items) => {
        if (items && items.length > 0) {
          setAnnouncements(items.map((a) => a.content));
        }
      })
      .catch((err) => console.error("Error fetching announcements for home:", err));
  }, []);

  const galleryHighlights: LightboxImage[] = [
    {
      src: "/images/gallery/highlight-01-champions.webp",
      alt: "Champions with the trophy",
      caption: "Champions celebrating with the championship trophy",
    },
    {
      src: "/images/gallery/highlight-02-all-campuses-group.webp",
      alt: "All seven campuses together",
      caption: "Athletes and officials from all 7 NMIMS campuses together",
    },
    {
      src: "/images/gallery/highlight-03-campus-captains.webp",
      alt: "Campus captains at march-past",
      caption: "Campus team captains at the ceremonial march-past",
    },
    {
      src: "/images/gallery/highlight-04-opening-ceremony-anthem.webp",
      alt: "Opening ceremony national anthem",
      caption: "Opening ceremony and national anthem",
    },
    {
      src: "/images/gallery/highlight-07-trophies.webp",
      alt: "The championship trophies",
      caption: "Championship trophies awaiting this year's champions",
    },
    {
      src: "/images/gallery/highlight-08-closing-group.webp",
      alt: "Closing ceremony celebration",
      caption: "Closing ceremony gathering of athletes and dignitaries",
    },
    {
      src: "/images/gallery/highlight-09-in-the-news.webp",
      alt: "In the News – Punya Nagari",
      caption: "Featured in Punya Nagari, Dhule Edition",
    },
  ];

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="relative text-text-main overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative isolate min-h-[100svh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden">
        <CampusBackground />

        {/* Hero Content */}
        <Container className="pt-16 sm:pt-24 pb-12 flex-1 flex flex-col justify-center items-center text-center">
          <div className="p-6 sm:p-10 md:p-12 rounded-2xl bg-indigo-black/40 backdrop-blur-md border border-gold/25 shadow-2xl max-w-5xl mx-auto flex flex-col items-center">
            <ChampionshipTitle />

            <p className="mt-5 text-sm sm:text-base md:text-xl text-text-main font-light max-w-3xl drop-shadow text-balance">
              {TOURNAMENT_CONFIG.dates} · {TOURNAMENT_CONFIG.hostCampus}
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <Button
              href="#sports"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-gold-glow"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Sports
            </Button>

            <Button
              href="/standings"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              icon={<Trophy className="w-4 h-4 text-gold" />}
            >
              Points &amp; Stats
            </Button>
          </div>
        </Container>

        {/* Scroll Cue */}
        <div className="pb-6 flex flex-col items-center justify-center text-gold/70 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 text-gold mt-0.5" />
        </div>
      </section>

      {/* REST OF /HOME: Standard Navy Background */}
      <div className="relative bg-navy">
        {/* 2. COUNTDOWN TIMER */}
        <div className="py-6 sm:py-8 border-b border-gold/15 bg-indigo-black/50">
          <CountdownTimer />
        </div>

        {/* 3. ANNOUNCEMENT TICKER */}
        <AnnouncementTicker announcements={announcements.length > 0 ? announcements : undefined} />

        {/* 4. SPORTS SECTION */}
        <section id="sports" className="py-12 lg:py-20 relative scroll-mt-16">
          <Container>
            <SectionHeader
              eyebrow="Championship Disciplines"
              title="Choose Your Sport"
              subtitle="Select a discipline below to view fixtures, live results, group points tables, and official stat leaderboards."
            />

            {/* 6 Sport Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {SPORTS_CONFIG.map((sport) => (
                <div
                  key={sport.id}
                  className="group card-championship overflow-hidden flex flex-col h-full rounded-2xl"
                >
                  {/* Sport Photo */}
                  <div className="relative w-full h-52 sm:h-56 overflow-hidden flex-shrink-0">
                    <Image
                      src={sport.image}
                      alt={`${sport.name} Championship`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                    {/* Category Chips */}
                    <div className="absolute top-3.5 left-3.5 flex gap-2">
                      {sport.hasMen && (
                        <span className="px-2.5 py-0.5 rounded-full bg-surface/90 border border-men text-[11px] font-bold text-men uppercase tracking-wider backdrop-blur-md">
                          Men
                        </span>
                      )}
                      {sport.hasWomen && (
                        <span className="px-2.5 py-0.5 rounded-full bg-surface/90 border border-women text-[11px] font-bold text-women uppercase tracking-wider backdrop-blur-md">
                          Women
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{sport.icon}</span>
                        <h3 className="text-xl font-serif font-bold text-gold-light group-hover:text-gold transition-colors">
                          {sport.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-text-muted line-clamp-2 leading-relaxed">
                        {sport.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
                      <span className="text-xs text-gold/80 font-mono">
                        27–31 Oct 2026
                      </span>
                      <Link
                        href={`/sports/${sport.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light group-hover:translate-x-1 transition-all"
                      >
                        <span>View Dashboard</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 5. QUICK NUMBERS STRIP */}
        <section className="py-12 bg-surface/60 border-y border-gold/15">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-3 sm:p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gold tabular-nums">
                  7
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-muted mt-1">
                  Campuses
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gold tabular-nums">
                  6
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-muted mt-1">
                  Sports
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gold tabular-nums">
                  50
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-muted mt-1">
                  Competing Teams
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gold tabular-nums">
                  5
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-muted mt-1">
                  Championship Days
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 6. PARTICIPATING CAMPUSES */}
        <section className="py-12 lg:py-20 relative">
          <Container>
            <SectionHeader
              eyebrow="Pan-India Representation"
              title="Participating Campuses"
              subtitle="Athletes from seven NMIMS campuses convene at Mukesh Patel Technology Park, Shirpur."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
              {CAMPUSES_CONFIG.map((campus) => (
                <Link
                  key={campus.id}
                  href={`/campuses/${campus.slug}`}
                  className="group card-championship p-6 flex flex-col items-center text-center relative h-full rounded-2xl hover:-translate-y-0.5 transition-all"
                >
                  {campus.isHost && (
                    <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-indigo-black font-black text-[10px] uppercase tracking-wider shadow">
                      HOST
                    </div>
                  )}

                  <CampusBadge
                    shortCode={campus.shortCode}
                    size="lg"
                    isHost={false}
                    className="mb-4"
                  />

                  <h3 className="text-lg font-serif font-bold text-gold-light group-hover:text-gold transition-colors">
                    {campus.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold/70" />
                    <span>
                      {campus.city}, {campus.state}
                    </span>
                  </p>

                  <div className="mt-auto pt-4 border-t border-gold/15 w-full text-center">
                    <span className="text-xs font-semibold text-gold/80 group-hover:text-gold uppercase tracking-wider flex items-center justify-center gap-1">
                      View Contingent <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* 7. ABOUT THE CHAMPIONSHIP */}
        <section className="py-12 lg:py-20 border-t border-gold/15 relative">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 relative h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-gold/25 shadow-card">
                <Image
                  src="/images/gallery/highlight-02-all-campuses-group.webp"
                  alt="All seven NMIMS campuses gathered at the championship"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-indigo-black/80 backdrop-blur-md border border-gold/20 text-xs text-text-muted">
                  All 7 campuses united at Mukesh Patel Technology Park, Shirpur.
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-gold">
                  Excellence in Collegiate Athletics
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black uppercase text-gold-gradient leading-tight text-balance">
                  About The Championship
                </h2>
                <p className="text-sm sm:text-base text-text-main leading-relaxed font-normal text-pretty">
                  Organised by the <strong>Sports Department, SVKM&apos;s NMIMS</strong>, the Inter Campus Sports Championship is the pinnacle athletic gathering bringing together over 800 student-athletes from Mumbai, Navi Mumbai, Indore, Bengaluru, Hyderabad, Chandigarh, and Shirpur.
                </p>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed text-pretty">
                  Hosted at the world-class sports complex of <strong>Mukesh Patel Technology Park (MPTP), Shirpur Campus</strong>, the five-day tournament features standard international facilities, floodlit arenas, professional federation officiating, and spirited collegiate camaraderie.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Button href="/rules" variant="outline" size="md">
                    Rules &amp; Eligibility
                  </Button>
                  <Button href="/travel" variant="secondary" size="md">
                    Host Venue Details
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 8. GALLERY PREVIEW */}
        <section className="py-12 lg:py-20 bg-surface/40 border-y border-gold/15 relative">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12">
              <div>
                <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-gold mb-2">
                  Memories in Motion
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black uppercase text-gold-gradient">
                  Championship Highlights
                </h2>
              </div>

              <Button
                href="/gallery"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View Tournament Gallery
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {galleryHighlights.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightboxAt(idx)}
                  className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer border border-gold/20 hover:border-gold hover:shadow-card-hover transition-all duration-300"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-serif font-bold text-gold-light truncate drop-shadow">
                    {item.caption}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 9. "WHO WILL LIFT THE TROPHY?" */}
        <section className="py-12 lg:py-20 relative">
          <Container>
            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-surface via-surface-2 to-indigo-black border border-gold/30 shadow-card relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-xs font-bold text-gold uppercase tracking-wider">
                    <Trophy className="w-4 h-4 text-gold-light" />
                    <span>The Ultimate Prize</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black uppercase text-gold-gradient text-balance">
                    Who Will Lift The Trophy?
                  </h2>
                  <p className="text-sm sm:text-base text-text-main/90 leading-relaxed text-pretty">
                    Six prestigious championship trophies await the victors across Cricket, Football, Basketball, Volleyball, Table Tennis, and Lawn Tennis. Seven campuses arrive with determination, but only one champion will claim each crown.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2.5 text-xs text-gold font-mono">
                    <span className="px-3 py-1.5 rounded-lg bg-indigo-black border border-gold/20">
                      ⭐ Man of the Match Honours
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-indigo-black border border-gold/20">
                      🏆 Overall Campus Champions
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-indigo-black border border-gold/20">
                      📊 Live Points &amp; Stats
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-gold/30 shadow-md">
                  <Image
                    src="/images/gallery/highlight-07-trophies.webp"
                    alt="Six championship trophies on display table"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 10. IN THE NEWS */}
        <section className="py-12 lg:py-20 border-t border-gold/15 relative">
          <Container className="max-w-4xl">
            <SectionHeader
              eyebrow="Media Coverage"
              title="In The News"
            />

            <div
              onClick={() => openLightboxAt(6)}
              className="group card-championship p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:border-gold hover:shadow-card-hover rounded-2xl"
            >
              <div className="relative w-full md:w-60 h-48 sm:h-56 rounded-xl overflow-hidden border border-gold/25 flex-shrink-0">
                <Image
                  src="/images/gallery/highlight-09-in-the-news.webp"
                  alt="Featured in Punya Nagari newspaper clipping"
                  fill
                  sizes="(max-width: 768px) 100vw, 240px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-indigo-black/20 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="space-y-3 flex-1">
                <span className="px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold uppercase tracking-wider font-mono">
                  Press Release &amp; Coverage
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gold-light group-hover:text-gold transition-colors">
                  Featured in Punya Nagari, Dhule Edition
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Extensive regional media coverage celebrating the athletic spirit of the SVKM&apos;s NMIMS Inter Campus Sports Championship hosted in Shirpur. Click to view the full newspaper clipping with zoom.
                </p>
                <span className="text-xs font-bold text-gold inline-flex items-center gap-1 group-hover:underline">
                  Open in Lightbox <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* 11. FAQ ACCORDION */}
        <section className="py-12 lg:py-20 relative overflow-hidden border-t border-gold/15">
          <div className="absolute inset-0 -z-20">
            <Image
              src="/images/gallery/highlight-08-closing-group.webp"
              alt="FAQ Background"
              fill
              sizes="100vw"
              className="object-cover object-center opacity-10 filter brightness-40"
            />
            <div className="absolute inset-0 bg-indigo-black/90" />
          </div>

          <Container className="relative z-10">
            <SectionHeader
              eyebrow="Need Assistance?"
              title="Frequently Asked Questions"
              subtitle="Essential details regarding reporting, travel pick-up, accommodation, meals, and eligibility."
            />

            <div className="max-w-4xl mx-auto">
              <FAQAccordion />
            </div>
          </Container>
        </section>

        {/* LIGHTBOX MODAL */}
        <ImageLightbox
          images={galleryHighlights}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNext={() =>
            setLightboxIndex((prev) => (prev + 1) % galleryHighlights.length)
          }
          onPrev={() =>
            setLightboxIndex(
              (prev) =>
                (prev - 1 + galleryHighlights.length) % galleryHighlights.length
            )
          }
        />
      </div>
    </div>
  );
}
