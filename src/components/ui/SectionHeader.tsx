import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: "center" | "left";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  titleAs = "h2",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const TitleTag = titleAs;

  return (
    <div
      className={`mb-10 md:mb-14 ${
        isCenter ? "text-center max-w-3xl mx-auto" : "text-left max-w-3xl"
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`text-xs font-mono font-semibold uppercase tracking-[0.2em] text-gold mb-2.5 inline-block ${
            isCenter ? "title-ornament" : ""
          }`}
        >
          {eyebrow}
        </div>
      )}

      <TitleTag className="text-2xl sm:text-3xl md:text-4xl font-serif font-black uppercase text-gold-gradient tracking-tight leading-tight text-balance">
        {title}
      </TitleTag>

      {subtitle && (
        <p className="mt-3 md:mt-4 text-sm sm:text-base text-text-muted leading-relaxed max-w-[65ch] text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  );
}
