"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const MAIN = [
  { href: "/home", label: "Home" },
  { href: "/sports", label: "Sports" },
  { href: "/teams", label: "Teams" },
  { href: "/campuses", label: "Campuses" },
  { href: "/standings", label: "Points & Stats" },
];
const MORE = [
  { href: "/gallery", label: "Gallery" },
  { href: "/previous-edition", label: "Previous Edition" },
  { href: "/travel", label: "Travel & Stay" },
  { href: "/rules", label: "Rules" },
  { href: "/contact", label: "Contact" },
];
const ALL = [...MAIN, ...MORE];

const SVKM_LOGO = "/images/svkm-logo.webp";
const NMIMS_LOGO = "/images/nmims-logo-v3-white.webp";

function LogoBox({ src, alt }: { src: string; alt: string }) {
  return (
    <Link href="/home" aria-label={alt} className="relative h-11 w-11 shrink-0 lg:h-14 lg:w-14">
      <Image src={src} alt={alt} fill sizes="56px" priority className="object-contain" />
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname() || "";
  const stripRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    pathname === href || (href !== "/home" && pathname.startsWith(href));

  // Phone: keep the active link visible in the swipe strip
  useEffect(() => {
    const el = stripRef.current?.querySelector<HTMLElement>("[data-active='true']");
    el?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#D9B26F]/15 bg-[#0F122E]">
      {/* ===== PHONE LAYOUT (rows 1 & 2, below lg) ===== */}
      {/* Row 1 */}
      <div className="flex h-16 items-center gap-3 px-4 md:px-6 lg:hidden">
        <LogoBox src={SVKM_LOGO} alt="SVKM" />

        {/* Phone title */}
        <Link href="/home" className="min-w-0 flex-1 text-center leading-tight">
          <span className="block truncate font-serif text-[15px] font-semibold text-[#D9B26F]">SVKM&apos;s NMIMS</span>
          <span className="block truncate text-[10.5px] uppercase tracking-[0.12em] text-white/70">Championship 2026-27</span>
        </Link>

        <LogoBox src={NMIMS_LOGO} alt="NMIMS" />
      </div>

      {/* Row 2: phone swipe menu */}
      <nav aria-label="Main" className="border-t border-[#D9B26F]/10 lg:hidden">
        <div
          ref={stripRef}
          className="flex h-11 items-center gap-1 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ALL.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                data-active={active}
                className={`relative flex h-full shrink-0 items-center whitespace-nowrap px-3 text-[14px] ${
                  active ? "font-semibold text-[#D9B26F]" : "text-white/80"
                }`}
              >
                {l.label}
                {active && <span className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[#D9B26F]" />}
              </Link>
            );
          })}
          <Link
            href="/admin/login"
            className="ml-1 flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#D9B26F]/40 px-3 text-[13px] font-semibold text-[#D9B26F]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /></svg>
            Admin
          </Link>
        </div>
      </nav>

      {/* ===== LAPTOP LAYOUT (3-zone grid, lg and up) ===== */}
      <div className="mx-auto hidden h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-8 lg:grid">
        {/* Left zone: SVKM logo (justify-self-start) */}
        <div className="justify-self-start flex items-center">
          <LogoBox src={SVKM_LOGO} alt="SVKM" />
        </div>

        {/* Centre zone: nav links (justify-self-center, flex gap-8) */}
        <nav className="justify-self-center flex items-center gap-8">
          {MAIN.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-2 text-[15px] font-medium transition-colors hover:text-[#F0D38F] ${
                  active ? "text-[#D9B26F]" : "text-white/85"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1 inset-x-0 h-[2px] rounded-full bg-[#D9B26F]" />
                )}
              </Link>
            );
          })}

          {/* More dropdown */}
          <div className="group relative">
            <button
              type="button"
              className={`relative flex items-center gap-1 py-2 text-[15px] font-medium transition-colors hover:text-[#F0D38F] ${
                MORE.some((m) => isActive(m.href)) ? "text-[#D9B26F]" : "text-white/85"
              }`}
            >
              <span>More</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
              {MORE.some((m) => isActive(m.href)) && (
                <span className="absolute -bottom-1 inset-x-0 h-[2px] rounded-full bg-[#D9B26F]" />
              )}
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-xl border border-[#D9B26F]/20 bg-[#141842] py-2 shadow-xl">
                {MORE.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-[#F0D38F] ${
                      isActive(l.href) ? "text-[#D9B26F] font-semibold" : "text-white/85"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Right zone: Admin button + NMIMS logo (justify-self-end, flex items-center gap-4) */}
        <div className="justify-self-end flex items-center gap-4">
          <Link
            href="/admin/login"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#D9B26F]/40 px-4 text-sm font-semibold text-[#D9B26F] transition hover:bg-[#D9B26F]/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
            </svg>
            <span>Admin</span>
          </Link>

          <LogoBox src={NMIMS_LOGO} alt="NMIMS" />
        </div>
      </div>
    </header>
  );
}
