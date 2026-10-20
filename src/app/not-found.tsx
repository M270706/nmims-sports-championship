import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import NavyPatchBackground from "@/components/ui/NavyPatchBackground";
import BrandLogos from "@/components/ui/BrandLogos";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen min-h-[100svh] bg-navy text-text-main flex flex-col justify-between overflow-hidden">
      <NavyPatchBackground variant="calm" />

      {/* Header with Brand Logos */}
      <header className="relative z-10 w-full py-6">
        <Container>
          <BrandLogos size="lg" mobileSize="xs" href="/home" />
        </Container>
      </header>

      {/* Centre Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center py-12">
        <Container className="max-w-xl">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-gold/40 flex items-center justify-center text-gold shadow-card mb-6 mx-auto">
            <Compass className="w-8 h-8 text-gold-light" />
          </div>

          <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-gold mb-2">
            Error 404 · Fixture Not Located
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black uppercase text-gold-gradient tracking-tight">
            Page Not Found
          </h1>

          <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed max-w-md mx-auto text-pretty">
            The sports championship page, fixture scorecard, or document you requested does not exist or has been relocated.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/home"
              variant="primary"
              size="md"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Return to Championship Home
            </Button>
            <Button
              href="/sports"
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
            >
              Explore Disciplines
            </Button>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-text-muted/70 border-t border-gold/10 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Container>
          <p>© 2026 SVKM&apos;s NMIMS Sports Department · MPTP Shirpur Campus</p>
        </Container>
      </footer>
    </div>
  );
}
