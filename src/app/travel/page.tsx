import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Plane,
  Train,
  Bus,
  Home,
  Utensils,
  Sun,
  CheckSquare,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { TOURNAMENT_CONFIG } from "@/config/tournament";

export const metadata = {
  title: "Travel & Stay",
  description:
    "Reporting details, complimentary pickup, accommodation at MPTP Shirpur & MRP School, meal timings, and travel guide.",
};

export default function TravelPage() {
  const transitHubs = [
    { name: "Indore International Airport", type: "flight", dist: "~200 km", icon: Plane },
    { name: "Nardana Railway Station", type: "train", dist: "~15 km", icon: Train },
    { name: "Sindkheda Railway Station", type: "train", dist: "~15 km", icon: Train },
    { name: "Shirpur Bus Stand", type: "bus", dist: "~8 km", icon: Bus },
    { name: "Dhule", type: "train/bus", dist: "~45 km", icon: Train },
    { name: "Jalgaon", type: "train/bus", dist: "~90 km", icon: Train },
    { name: "Bhusawal", type: "train/bus", dist: "~120 km", icon: Train },
    { name: "Manmad", type: "train/bus", dist: "~180 km", icon: Train },
    { name: "Indore Bus Stand and Railway Station", type: "train/bus", dist: "~200 km", icon: Train },
  ];

  const packingList = [
    "Official College Student ID card (mandatory for accreditation)",
    "Eligibility documents (fee proof, mark sheet, signed proforma)",
    "Championship playing kit and sport-specific footwear",
    "Personal medical supplies & required medications",
    "Light cotton clothes for daytime warmth",
    "Light layer / jacket for cooler late October evenings",
    "Reusable water bottle & sunscreen",
  ];

  return (
    <NavyPatchBackground variant="calm" className="min-h-screen pb-24">
      {/* 1. Header Banner */}
      <PageHero
        eyebrow="Host Destination & Logistics"
        title="Travel & Stay"
        subtitle="Complete delegate information for arrivals, transit terminal pick-ups, residential accommodation, dining timings, and Shirpur logistics."
        imageSrc="/images/shirpur-campus.webp"
        imageAlt="Aerial view of Mukesh Patel Technology Park, Shirpur Campus"
      />

      <Container className="py-12 md:py-16 space-y-12 md:space-y-16">
        {/* 2. Prominent Reporting Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-surface-2 via-surface to-surface-2 border border-gold/40 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="w-14 h-14 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
              <Clock className="w-7 h-7 text-gold-light" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold">
                Reporting Deadline
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-gold-light mt-1">
                Report on 26th October 2026 by 12:00 Noon
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1">
                At Mukesh Patel Technology Park (MPTP), Shirpur Campus.
              </p>
            </div>
          </div>

          <Button
            href="/contact"
            variant="primary"
            size="md"
            icon={<PhoneCall className="w-4 h-4" />}
            className="flex-shrink-0 w-full sm:w-auto"
          >
            Contact Organisers
          </Button>
        </div>

        {/* 3. Venue Address & Google Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-gold/30 text-xs font-semibold text-gold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Official Host Venue</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-gold-light">
              Mukesh Patel Technology Park – Shirpur Campus
            </h3>
            <div className="p-4 rounded-xl bg-surface border border-gold/15 text-xs text-text-main whitespace-pre-line leading-relaxed font-sans">
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
              Get Directions on Google Maps
            </Button>
          </div>

          {/* Embedded Map */}
          <div className="lg:col-span-7 h-64 sm:h-80 rounded-2xl overflow-hidden border border-gold/25 shadow-card relative">
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

        {/* 4. Pick-up Facility Announcement Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface/90 border border-gold/30 shadow-card space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚐</span>
            <h3 className="text-xl font-serif font-bold text-gold">
              Complimentary Travel Pick-up Facility
            </h3>
          </div>
          <p className="text-sm sm:text-base text-text-main leading-relaxed">
            Pick-up will be arranged from <strong>all nearest railway stations and airports</strong>. Please share your arrival details (mode of travel, station/airport, date, time, and total number of team members) with the Organising Committee in advance to ensure smooth transfer to campus.
          </p>
        </div>

        {/* 5. How to Reach: Transit Hubs with Distances */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-serif font-black uppercase text-gold-gradient">
              How To Reach Shirpur
            </h3>
            <p className="text-xs sm:text-sm text-text-muted mt-2">
              Approximate distances from nearest transit terminals to MPTP Shirpur Campus:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {transitHubs.map((hub, i) => {
              const Icon = hub.icon;
              return (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl bg-surface border border-gold/15 flex items-center justify-between hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-indigo-black text-gold border border-gold/20 flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-text-main leading-snug truncate">
                        {hub.name}
                      </h4>
                      <span className="text-[11px] text-text-muted uppercase tracking-wider block font-mono">
                        {hub.type}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-gold text-sm sm:text-base ml-2 flex-shrink-0 tabular-nums">
                    {hub.dist}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Accommodation & Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Accommodation Card */}
          <div className="card-championship p-6 sm:p-8 space-y-4 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-surface-2 text-gold border border-gold/30">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gold-light">
                  Player &amp; Team Accommodation
                </h3>
              </div>
              <p className="text-sm text-text-main leading-relaxed">
                Accommodation (sharing basis, with comfortable bedding) will be provided at:
              </p>
              <div className="space-y-3 pt-3">
                <div className="p-4 rounded-xl bg-indigo-black border border-gold/20">
                  <div className="font-bold text-gold text-sm">MPTP Shirpur Campus</div>
                  <div className="text-xs text-text-muted mt-0.5">On-campus residential hostels with 24/7 security and amenities.</div>
                </div>
                <div className="p-4 rounded-xl bg-indigo-black border border-gold/20">
                  <div className="font-bold text-gold text-sm">MRP School Lodging</div>
                  <div className="text-xs text-text-muted mt-0.5">Designated delegate and team lodging wing with bedding provided.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Food Card */}
          <div className="card-championship p-6 sm:p-8 space-y-4 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-surface-2 text-gold border border-gold/30">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gold-light">
                  Food &amp; Dining Timings
                </h3>
              </div>
              <p className="text-sm text-text-main leading-relaxed">
                Wholesome vegetarian meals are served daily in the central dining hall:
              </p>
              <div className="space-y-2 pt-3 text-xs">
                <div className="p-3 rounded-xl bg-indigo-black flex justify-between items-center border border-gold/15">
                  <span className="font-bold text-text-main">Breakfast</span>
                  <span className="font-mono text-gold font-bold">7:00 AM – 9:30 AM</span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-black flex justify-between items-center border border-gold/15">
                  <span className="font-bold text-text-main">Lunch</span>
                  <span className="font-mono text-gold font-bold">12:00 PM – 2:00 PM</span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-black flex justify-between items-center border border-gold/15">
                  <span className="font-bold text-text-main">Campus Canteen</span>
                  <span className="font-mono text-gold font-bold">4:00 PM – 7:00 PM</span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-black flex justify-between items-center border border-gold/15">
                  <span className="font-bold text-text-main">Dinner</span>
                  <span className="font-mono text-gold font-bold">8:00 PM – 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Weather & What to Carry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Weather */}
          <div className="card-championship p-6 sm:p-8 space-y-4 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-surface-2 text-gold border border-gold/30">
                  <Sun className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gold-light">
                  Shirpur Weather in Late October
                </h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Late October in Shirpur is warm and dry during afternoons (28°C–33°C) and pleasantly cool in the early morning and late evenings (18°C–22°C).
              </p>
              <p className="text-xs text-text-main/90 leading-relaxed mt-2">
                Athletes should ensure adequate daytime hydration, and bring light cotton playing wear plus a pullover or light jacket for evening sessions.
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="card-championship p-6 sm:p-8 space-y-4 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-surface-2 text-gold border border-gold/30">
                  <CheckSquare className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gold-light">
                  Participant Checklist
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-text-main">
                {packingList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </NavyPatchBackground>
  );
}
