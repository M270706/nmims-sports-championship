import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { SPORTS_CONFIG } from "@/config/tournament";

export const metadata = {
  title: "Sports Overview",
  description:
    "Explore all 6 disciplines and 10 categories at the SVKM's NMIMS Inter Campus Sports Championship 2026-27.",
};

export default function SportsOverviewPage() {
  return (
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. Standard Page Hero */}
      <PageHero
        eyebrow="Athletic Disciplines"
        title="Championship Sports"
        subtitle="Explore all 6 athletic disciplines across men's and women's divisions, with live match fixtures, results, standings, and verified player statistics."
        imageSrc="/images/gallery/highlight-01-champions.webp"
        imageAlt="Athletes at SVKM's NMIMS Sports Championship"
      />

      {/* 2. Sports Cards Grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {SPORTS_CONFIG.map((sport) => (
              <div
                key={sport.id}
                className="card-championship overflow-hidden flex flex-col group h-full rounded-2xl"
              >
                {/* Photo Banner */}
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
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-2xl">{sport.icon}</span>
                      <h2 className="text-xl font-serif font-bold text-gold-light group-hover:text-gold transition-colors">
                        {sport.name}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-text-muted line-clamp-2 leading-relaxed">
                      {sport.description}
                    </p>
                  </div>

                  {/* Counters & Action Button */}
                  <div className="space-y-4 pt-5 mt-6 border-t border-gold/15">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-indigo-black border border-gold/15 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span className="text-text-muted truncate">Fixtures Pending</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-indigo-black border border-gold/15 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                        <span className="text-text-muted truncate">0 Completed</span>
                      </div>
                    </div>

                    <Button
                      href={`/sports/${sport.slug}`}
                      variant="primary"
                      size="md"
                      className="w-full"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </NavyPatchBackground>
  );
}
