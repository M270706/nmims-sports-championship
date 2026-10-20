"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import CampusBadge from "@/components/ui/CampusBadge";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { fetchCampusDepartments, getCampusDepartments, CampusDepartmentInfo } from "@/lib/campus-store";
import { fetchTeams, getTeams } from "@/lib/tournament-store";
import { SPORTS_CONFIG } from "@/config/tournament";
import { Team } from "@/types/tournament";

export default function CampusesPublicPage() {
  const [departments, setDepartments] = useState<CampusDepartmentInfo[]>(getCampusDepartments());
  const [allTeams, setAllTeams] = useState<Team[]>(getTeams());

  useEffect(() => {
    fetchCampusDepartments()
      .then((data) => {
        if (data && data.length > 0) setDepartments(data);
      })
      .catch((err) => console.error("fetchCampusDepartments error:", err));

    fetchTeams()
      .then((data) => {
        if (data && data.length > 0) setAllTeams(data);
      })
      .catch((err) => console.error("fetchTeams error:", err));
  }, []);

  return (
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="Pan-India Representation"
        title="Campus Contingents"
        subtitle="Official contingent figures, participating disciplines, squad sizes, and sports personnel across all seven SVKM's NMIMS university campuses."
        imageSrc="/images/gallery/highlight-02-all-campuses-group.webp"
        imageAlt="All seven NMIMS campuses gathered together"
      />

      <section className="py-12 lg:py-20">
        <Container>
          {/* 7 Campus Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {departments.map((dept) => {
              const campusTeams = allTeams.filter(
                (t) => t.campusId.toLowerCase() === dept.campusId.toLowerCase()
              );
              const sportsForCampus = Array.from(new Set(campusTeams.map((t) => t.sportId)));

              return (
                <div
                  key={dept.campusId}
                  className="card-championship bg-surface/90 border border-gold/20 rounded-2xl p-6 flex flex-col justify-between relative shadow-card hover:border-gold/50 transition-all duration-200 h-full"
                >
                  {/* Single Host Ribbon on Shirpur only */}
                  {dept.isHost && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-indigo-black font-black text-[11px] uppercase tracking-wider shadow-sm">
                      HOST CAMPUS
                    </div>
                  )}

                  <div>
                    {/* Campus Header */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <CampusBadge
                        shortCode={dept.shortCode}
                        size="lg"
                        isHost={false}
                      />
                      <div>
                        <h2 className="text-xl font-serif font-bold text-gold-light">
                          {dept.name}
                        </h2>
                        <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" />
                          <span>
                            {dept.city}, {dept.state}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Stats Pill Row */}
                    <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-gold/15">
                      <div className="p-2.5 rounded-xl bg-indigo-black/80 border border-gold/15 text-center">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted block">
                          Athletes
                        </span>
                        <span className="text-lg font-mono font-bold text-gold tabular-nums">
                          {dept.totalCount > 0 ? dept.totalCount : "Host"}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-indigo-black/80 border border-gold/15 text-center">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted block">
                          Staff
                        </span>
                        <span className="text-lg font-mono font-bold text-gold tabular-nums">
                          {dept.staffMen + dept.staffWomen > 0 ? dept.staffMen + dept.staffWomen : "Staff"}
                        </span>
                      </div>
                    </div>

                    {/* Participating Disciplines */}
                    <div className="my-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-2">
                        Participating Sports ({sportsForCampus.length}/6):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sportsForCampus.map((sportSlug) => {
                          const sport = SPORTS_CONFIG.find((s) => s.slug === sportSlug);
                          if (!sport) return null;
                          return (
                            <span
                              key={sportSlug}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-black border border-gold/20 text-xs text-text-main"
                            >
                              <span>{sport.icon}</span>
                              <span className="font-medium text-[11px]">{sport.name}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sports Staff Contacts */}
                    {dept.officerName && (
                      <div className="my-4 pt-3 border-t border-gold/15 space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block">
                          Sports Officer:
                        </span>
                        <div className="text-xs flex items-center justify-between text-text-muted">
                          <span className="flex items-center gap-1 text-text-main">
                            <UserCheck className="w-3.5 h-3.5 text-gold/80 flex-shrink-0" />
                            <strong className="font-semibold">{dept.officerName}</strong>
                          </span>
                          {dept.officerPhone && (
                            <span className="text-[11px] font-mono text-gold/80">{dept.officerPhone}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6 pt-4 border-t border-gold/15">
                    <Button
                      href={`/campuses/${dept.slug}`}
                      variant="primary"
                      size="md"
                      className="w-full"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      View Campus Profile
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </NavyPatchBackground>
  );
}
