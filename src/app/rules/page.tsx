"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Download,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

export default function RulesPage() {
  const [openRule, setOpenRule] = useState<number | null>(0);

  const generalRules = [
    {
      title: "1. Official Entry Channel",
      text: "Entries must be routed through the proper designated channel, duly certified by the Sports Officer or Campus In-charge.",
    },
    {
      title: "2. Federation & AIU Governance",
      text: "All matches shall strictly follow the latest rules, bylaws, and technical regulations of the respective International Sports Federations and the Association of Indian Universities (AIU).",
    },
    {
      title: "3. Finality of Organising Committee Decisions",
      text: "The Organising Committee's decision on all administrative, procedural, and on-field sporting matters shall be final and binding.",
    },
    {
      title: "4. Schedule & Venue Alterations",
      text: "The Organising Secretary reserves the right to alter or adjust the tournament venue, court allocations, fixtures, or match timings should exigencies arise.",
    },
    {
      title: "5. Punctual Reporting",
      text: "Every participating team must report at the designated venue in official playing kit at least 30 minutes prior to the scheduled start of the match.",
    },
    {
      title: "6. Sportsmanship & Collegiate Discipline",
      text: "Exemplary discipline, mutual respect, and high standards of sportsmanship are expected from all student-athletes, coaches, and managers both on and off the field.",
    },
    {
      title: "7. Zero Tolerance Policy",
      text: "Alcohol, smoking, tobacco, e-cigarettes, and banned psychotropic/performance-enhancing substances are strictly prohibited across all campus premises. Any breach warrants immediate disqualification and disciplinary referral.",
    },
    {
      title: "8. Medical & First Aid Provision",
      text: "Qualified medical staff, first aid, and ambulance emergency facilities are stationed at the central sports complex throughout the tournament.",
    },
    {
      title: "9. Official Protest Procedure",
      text: "All formal objections or protests must be lodged in writing as per established AIU protocols within the specified protest window following the conclusion of the match.",
    },
    {
      title: "10. Residual Jurisdiction",
      text: "Any point or contingency not explicitly covered in these regulations shall be referred to the Chairman of the Organising Committee, whose ruling shall be conclusive.",
    },
  ];

  const eligibilityRequirements = [
    "Proof of annual or current semester fee payment, accompanied by previous year's or semester's certified mark sheet.",
    "Official University / College Photo Identity Card signed by the competent campus authority.",
    "Each participating contingent must be officially accompanied by a Manager or Coach as mandated by AIU norms.",
    "One typed, signed, and stamped Eligibility Proforma must be submitted on arrival at the registration desk.",
    "Strict rule: No overwriting or manual tampering is permitted on the submitted Eligibility Proforma.",
  ];

  const handleDownloadProforma = () => {
    alert(
      "Eligibility Proforma template will be available for download from your campus sports director. Please submit on 26 October."
    );
  };

  return (
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. Header Banner */}
      <PageHero
        eyebrow="Governance & Compliance"
        title="Rules & Eligibility"
        subtitle="Official accreditation guidelines, player eligibility criteria, code of conduct, and technical regulations for the championship."
        imageSrc="/images/gallery/highlight-04-opening-ceremony-anthem.webp"
        imageAlt="Opening ceremony and national anthem"
      />

      <Container className="py-12 md:py-16 space-y-12 md:space-y-16">
        {/* 2. Eligibility Section */}
        <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-surface via-surface-2 to-surface border border-gold/30 shadow-card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 mb-6 border-b border-gold/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold">
                  Accreditation Requirements
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-gold-light uppercase">
                  Player Eligibility Criteria
                </h2>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleDownloadProforma}
              icon={<Download className="w-4 h-4" />}
              className="w-full md:w-auto"
            >
              Download Eligibility Proforma
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibilityRequirements.map((req, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-indigo-black/80 border border-gold/15 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-text-main leading-relaxed">
                  {req}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. General Tournament Rules (Accordion) */}
        <div>
          <SectionHeader
            eyebrow="Championship Code"
            title="General Tournament Rules"
            subtitle="Standard operating procedures binding upon all participating delegations and athletes."
          />

          <div className="space-y-3 max-w-4xl mx-auto">
            {generalRules.map((rule, idx) => {
              const isOpen = openRule === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all border ${
                    isOpen
                      ? "bg-surface-2 border-gold/40 shadow-sm"
                      : "bg-surface border-gold/15 hover:border-gold/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenRule(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-2xl"
                  >
                    <span className="text-sm sm:text-base font-serif font-bold text-gold-light">
                      {rule.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-gold/10 pt-3 animate-fadeIn">
                      {rule.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. FAQ Section Anchor: #faq */}
        <div id="faq" className="pt-10 border-t border-gold/20 scroll-mt-20">
          <SectionHeader
            eyebrow="Clarifications & Help"
            title="Frequently Asked Questions"
            subtitle="Frequently asked questions regarding match regulations, team reporting, and logistics."
          />

          <div className="max-w-4xl mx-auto">
            <FAQAccordion />
          </div>
        </div>
      </Container>
    </NavyPatchBackground>
  );
}
