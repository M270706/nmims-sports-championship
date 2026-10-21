import React from "react";
import Image from "next/image";
import Link from "next/link";

export type LogoSize = "xs" | "sm" | "footer" | "md" | "lg" | "xl";

interface SizeSpec {
  px: number;
  boxClass: string;
}

const SIZE_SPECS: Record<LogoSize, SizeSpec> = {
  xs: { px: 44, boxClass: "w-11 h-11" },
  sm: { px: 48, boxClass: "w-12 h-12" },
  footer: { px: 64, boxClass: "w-16 h-16" },
  md: { px: 56, boxClass: "w-14 h-14" },
  lg: { px: 64, boxClass: "w-16 h-16" },
  xl: { px: 80, boxClass: "w-20 h-20" },
};

function getDimensions(size: LogoSize, mobileSize?: LogoSize) {
  const desktop = SIZE_SPECS[size];
  if (!mobileSize || mobileSize === size) {
    return {
      boxClass: desktop.boxClass,
      sizesAttr: `${desktop.px}px`,
    };
  }

  const mobile = SIZE_SPECS[mobileSize];
  return {
    boxClass: `${mobile.boxClass} lg:${desktop.boxClass}`,
    sizesAttr: `(max-width: 1024px) ${mobile.px}px, ${desktop.px}px`,
  };
}

export interface LogoItemProps {
  size?: LogoSize;
  mobileSize?: LogoSize;
  href?: string;
  className?: string;
}

/**
 * SVKM Logo in a fixed square box with object-contain.
 */
export function SvkmLogo({
  size = "md",
  mobileSize,
  href = "/home",
  className = "",
}: LogoItemProps) {
  const { boxClass, sizesAttr } = getDimensions(size, mobileSize);

  const content = (
    <div
      className={`grid ${boxClass} shrink-0 place-items-center rounded-xl bg-white p-1 sm:p-1.5 shadow-sm ring-1 ring-black/5 ${className}`}
    >
      <span className="relative h-full w-full">
        <Image
          src="/images/svkm-logo.webp"
          alt="SVKM - Shri Vile Parle Kelavani Mandal"
          fill
          sizes={sizesAttr}
          className="object-contain"
          priority
        />
      </span>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl flex items-center shrink-0"
        title="SVKM - Shri Vile Parle Kelavani Mandal"
      >
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * NMIMS Logo in a fixed square box with object-contain.
 */
export function NmimsLogo({
  size = "md",
  mobileSize,
  href = "/home",
  className = "",
}: LogoItemProps) {
  const { boxClass, sizesAttr } = getDimensions(size, mobileSize);

  const content = (
    <div
      className={`grid ${boxClass} shrink-0 place-items-center rounded-xl bg-white p-1 sm:p-1.5 shadow-sm ring-1 ring-black/5 ${className}`}
    >
      <span className="relative h-full w-full">
        <Image
          src="/images/nmims-logo-v3.webp"
          alt="NMIMS Deemed to be University"
          fill
          sizes={sizesAttr}
          className="object-contain"
          priority
        />
      </span>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl flex items-center shrink-0"
        title="NMIMS Deemed to be University"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export interface BrandLogosProps {
  size?: LogoSize;
  mobileSize?: LogoSize;
  href?: string;
  className?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * BrandLogos: Equal-looking logos component with SVKM at far left and NMIMS at far right.
 * Sizes:
 * - xl = 120x120 (Starting page)
 * - lg = 96x96 (Navbar desktop, Admin login)
 * - md = 72x72 (Navbar mobile, Footer)
 * - sm = 48x48 (Admin sidebar)
 * - xs = 40x40 (Mobile header)
 */
export default function BrandLogos({
  size = "md",
  mobileSize,
  href = "/home",
  className = "",
  leftAddon,
  rightAddon,
  children,
}: BrandLogosProps) {
  return (
    <div className={`flex items-center justify-between w-full min-w-0 ${className}`}>
      {/* FAR LEFT: SVKM */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <SvkmLogo size={size} mobileSize={mobileSize} href={href} />
        {leftAddon}
      </div>

      {/* CENTRE: Optional children (e.g. Navbar links or titles) */}
      {children}

      {/* FAR RIGHT: NMIMS + optional right addon */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {rightAddon}
        <NmimsLogo size={size} mobileSize={mobileSize} href={href} />
      </div>
    </div>
  );
}
