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
  footer: { px: 56, boxClass: "w-14 h-14" },
  md: { px: 56, boxClass: "w-14 h-14" },
  lg: { px: 56, boxClass: "w-14 h-14" },
  xl: { px: 96, boxClass: "w-24 h-24" },
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
      className={`relative ${boxClass} flex-shrink-0 flex items-center justify-center ${className}`}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/svkm-logo.webp"
          alt="SVKM - Shri Vile Parle Kelavani Mandal"
          fill
          sizes={sizesAttr}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded flex items-center flex-shrink-0"
        title="SVKM - Shri Vile Parle Kelavani Mandal"
      >
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * NMIMS Logo in a fixed square box with object-contain, scaled up visually by 1.15
 * so its circular crest and delicate wordmark equal the visual mass of the SVKM logo.
 * overflow-hidden on the outer box prevents the scaled image from pushing layout wider.
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
      className={`relative ${boxClass} flex-shrink-0 flex items-center justify-center ${className}`}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/nmims-logo-white.webp"
          alt="NMIMS Deemed to be University"
          fill
          sizes={sizesAttr}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded flex items-center flex-shrink-0"
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
