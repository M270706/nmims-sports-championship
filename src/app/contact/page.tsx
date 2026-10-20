import React from "react";
import Image from "next/image";
import {
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  Award,
  Users,
} from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { TOURNAMENT_CONFIG } from "@/config/tournament";
import { LEADERSHIP_CONFIG, COMMITTEE_CONFIG } from "@/config/contacts";
import { getContactsAction } from "@/app/actions/contacts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact",
  description:
    "Official contacts for SVKM's NMIMS Inter Campus Sports Championship 2026-27. Sports Leadership and Organising Committee.",
};

export default async function ContactPage() {
  const contacts = await getContactsAction();
  const leadership = contacts.find((c) => c.group === "leadership") || LEADERSHIP_CONFIG;
  const committee = contacts.filter((c) => c.group === "committee");
  const committeeList = committee.length > 0 ? committee : COMMITTEE_CONFIG;

  return (
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="Tournament Secretariat"
        title="Contact & Helpdesk"
        subtitle="Reach out to the Sports Leadership and Organising Committee for tournament inquiries, delegate arrivals, and logistics coordination."
        imageSrc="/images/gallery/highlight-06-felicitation.webp"
        imageAlt="Felicitation of dignitaries"
      />

      <Container className="py-12 lg:py-20 space-y-12 lg:space-y-20">
        {/* 2. LEADERSHIP: Single card, NO phone number, NO Call/WhatsApp buttons */}
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            eyebrow="Patron & Direction"
            title="Leadership"
            className="mb-6 md:mb-8"
          />

          <div className="card-championship p-6 sm:p-8 rounded-2xl border border-gold/35 shadow-card flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-6 bg-gradient-to-br from-surface-2 via-surface to-indigo-black">
            <div className="w-16 h-16 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-sm flex-shrink-0">
              <Award className="w-8 h-8 text-gold" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold/15 text-gold text-[10px] font-bold uppercase tracking-wider mb-2 font-mono">
                Tournament Patron
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gold-light">
                {leadership.name}
              </h3>
              <p className="text-sm text-text-muted mt-1 font-medium">
                {leadership.role}
              </p>
            </div>
          </div>
        </div>

        {/* 3. ORGANISING COMMITTEE */}
        <div>
          <SectionHeader
            eyebrow="Organising Personnel"
            title="Organising Committee"
            subtitle="Available 24/7 for contingent assistance, fixtures updates, transit arrivals, and campus coordination."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {committeeList.map((member) => (
              <div
                key={member.name}
                className="card-championship p-6 rounded-2xl border border-gold/20 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface-2 border border-gold/30 flex items-center justify-center text-gold mb-3.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-gold-light">
                    {member.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    {member.role}
                  </p>
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, "")}`}
                      className="inline-block text-xs font-mono text-gold mt-2.5 hover:underline whitespace-nowrap tabular-nums"
                    >
                      {member.phone}
                    </a>
                  )}
                </div>

                <div className="pt-4 mt-5 border-t border-gold/15 flex flex-col sm:flex-row gap-2">
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, "")}`}
                      className="flex-1 h-10 rounded-xl bg-surface-2 hover:bg-gold hover:text-indigo-black text-gold text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 border border-gold/25"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  )}

                  {member.cleanPhone && (
                    <a
                      href={`https://wa.me/${member.cleanPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-10 rounded-xl bg-surface border border-gold/30 hover:border-gold text-gold text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-success" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Venue Address Card with Map */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-2xl bg-surface border border-gold/25 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-black border border-gold/30 text-xs text-gold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Host Venue Secretariat</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gold-light">
                Mukesh Patel Technology Park
              </h3>
              <div className="p-4 rounded-xl bg-indigo-black border border-gold/15 text-xs text-text-main whitespace-pre-line leading-relaxed font-sans">
                {TOURNAMENT_CONFIG.venueAddress}
              </div>
              <Button
                href={TOURNAMENT_CONFIG.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                Google Maps Directions
              </Button>
            </div>

            <div className="lg:col-span-7 h-64 sm:h-72 rounded-xl overflow-hidden border border-gold/25 shadow-md">
              <iframe
                src={TOURNAMENT_CONFIG.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map MPTP Shirpur Campus"
              />
            </div>
          </div>
        </div>
      </Container>
    </NavyPatchBackground>
  );
}
