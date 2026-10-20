"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Archive, Trophy, Calendar, Users, Camera, Clock } from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import EmptyState from "@/components/ui/EmptyState";

export default function PreviousEditionPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "champions" | "results" | "leaderboards" | "gallery"
  >("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Calendar },
    { id: "champions", label: "Champions", icon: Trophy },
    { id: "results", label: "Results", icon: Clock },
    { id: "leaderboards", label: "Leaderboards", icon: Users },
    { id: "gallery", label: "Gallery", icon: Camera },
  ] as const;

  return (
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="Historical Archive"
        title="Previous Edition"
        subtitle="Official archives, results, and commemorative records from previous editions of the SVKM's NMIMS Inter Campus Sports Championship."
        imageSrc="/images/gallery/highlight-05-inauguration.webp"
        imageAlt="Inauguration Ceremony"
      />

      <Container className="py-12 md:py-16">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 border-b border-gold/20 mb-12 gap-2 sm:gap-3 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all h-11 ${
                  isActive
                    ? "btn-gold shadow-sm font-bold"
                    : "bg-surface text-text-muted hover:text-text-main border border-gold/15"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Placeholder Card */}
        <EmptyState
          icon={<Archive className="w-7 h-7 text-gold-light" />}
          title={`${tabs.find((t) => t.id === activeTab)?.label} Archive`}
          description="Historical archives and verified statistics for the previous edition will be published here upon archival completion."
          action={
            <div className="text-xs text-gold/80 font-mono">
              Archived records for edition 2025–26 are managed by the Organising Committee.
            </div>
          }
        />
      </Container>
    </NavyPatchBackground>
  );
}
