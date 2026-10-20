"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
const NMIMS_LOGO = "/images/nmims-logo-white.webp";

function LogoBox({ src, alt }: { src: string; alt: string }) {
  return (
    <Link href="/home" aria-label={alt} className="relative h-11 w-11 shrink-0 lg:h-14 lg:w-14">
      <Image src={src} alt={alt} fill sizes="56px" priority className="object-contain" />
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/home" && pathname.startsWith(href));

  const menu = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[1000] flex flex-col bg-[#0F122E] lg:hidden"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-[#D9B26F]/15 px-4">
        <LogoBox src={SVKM_LOGO} alt="SVKM" />
        <span className="min-w-0 flex-1 text-center font-serif text-base font-semibold text-[#D9B26F]">Menu</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#D9B26F]/40 text-[#D9B26F]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <LogoBox src={NMIMS_LOGO} alt="NMIMS" />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2">
        {ALL.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`flex min-h-[52px] items-center justify-between border-b border-[#D9B26F]/10 text-lg ${
              isActive(l.href) ? "font-semibold text-[#F0D38F]" : "text-white/85"
            }`}
          >
            {l.label}
            <span className="text-[#D9B26F]/60">›</span>
          </Link>
        ))}
      </nav>

      <div className="shrink-0 border-t border-[#D9B26F]/15 p-4">
        <Link
          href="/admin/login"
          onClick={() => setOpen(false)}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#A88345] via-[#D9B26F] to-[#F0D38F] font-semibold text-[#0F122E]"
        >
          Admin Portal
        </Link>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#D9B26F]/15 bg-[#0F122E]">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-6 lg:h-20 lg:px-8">
        <LogoBox src={SVKM_LOGO} alt="SVKM" />

        <Link href="/home" className="min-w-0 flex-1 text-center leading-tight lg:hidden">
          <span className="block truncate font-serif text-[15px] font-semibold text-[#D9B26F]">SVKM&apos;s NMIMS</span>
          <span className="block truncate text-[10.5px] uppercase tracking-[0.12em] text-white/70">Championship 2026-27</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {MAIN.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[15px] transition-colors hover:text-[#F0D38F] ${
                isActive(l.href) ? "font-semibold text-[#D9B26F]" : "text-white/85"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="group relative">
            <button type="button" className="flex items-center gap-1 text-[15px] text-white/85 hover:text-[#F0D38F]">
              More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-xl border border-[#D9B26F]/20 bg-[#141842] py-2 shadow-xl">
                {MORE.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block px-4 py-2.5 text-sm hover:bg-white/5 hover:text-[#F0D38F] ${
                      isActive(l.href) ? "text-[#D9B26F]" : "text-white/85"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <Link
          href="/admin/login"
          className="hidden h-10 shrink-0 items-center gap-2 rounded-xl border border-[#D9B26F]/40 px-4 text-sm font-semibold text-[#D9B26F] transition hover:bg-[#D9B26F]/10 lg:inline-flex"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /></svg>
          Admin
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#D9B26F]/40 text-[#D9B26F] lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <LogoBox src={NMIMS_LOGO} alt="NMIMS" />
      </div>

      {mounted && open && createPortal(menu, document.body)}
    </header>
  );
}
