import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  breadcrumbs?: BreadcrumbItem[];
  backLink?: { label: string; href: string };
  children?: React.ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt = "NMIMS Sports Championship",
  backLink,
  children,
}: PageHeroProps) {
  return (
    <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden border-b border-gold/20">
      {/* Background image if provided */}
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-surface/80 to-indigo-black/85" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-black via-navy to-surface" />
      )}

      {/* Decorative subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,178,111,0.08),transparent_50%)] pointer-events-none" />

      {/* Hero Content aligned to bottom */}
      <Container className="h-full relative z-10 flex flex-col justify-end pb-8 sm:pb-10">
        {backLink && (
          <Link
            href={backLink.href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold/80 hover:text-gold mb-3 transition-colors focus-visible:ring-2 focus-visible:ring-gold/60 rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{backLink.label}</span>
          </Link>
        )}

        {eyebrow && (
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-gold mb-2 inline-block">
            {eyebrow}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black uppercase text-gold-gradient tracking-tight leading-tight text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-xs sm:text-sm md:text-base text-text-muted max-w-2xl leading-relaxed text-pretty">
                {subtitle}
              </p>
            )}
          </div>

          {children && <div className="flex-shrink-0">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
