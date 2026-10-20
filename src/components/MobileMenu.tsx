"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/home", label: "Home" },
  { href: "/sports", label: "Sports" },
  { href: "/teams", label: "Teams" },
  { href: "/campuses", label: "Campuses" },
  { href: "/standings", label: "Points & Stats" },
  { href: "/gallery", label: "Gallery" },
  { href: "/previous-edition", label: "Previous Edition" },
  { href: "/travel", label: "Travel & Stay" },
  { href: "/rules", label: "Rules" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

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

  const panel = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[1000] flex flex-col bg-[#0F122E] lg:hidden"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-[#D9B26F]/15 px-4">
        <div className="relative h-11 w-11 shrink-0">
          <Image src="/images/svkm-logo.webp" alt="SVKM" fill sizes="44px" className="object-contain" />
        </div>
        <span className="min-w-0 flex-1 truncate text-center font-serif text-[15px] text-[#D9B26F]">
          NMIMS Sports 2026-27
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[#D9B26F]/40 text-[#D9B26F]"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="relative h-11 w-11 shrink-0">
          <Image src="/images/nmims-logo-white.webp" alt="NMIMS" fill sizes="44px" className="object-contain" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2">
        {LINKS.map((l) => {
          const active = pathname === l.href || (l.href !== "/home" && pathname?.startsWith(l.href));
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex min-h-[52px] items-center justify-between border-b border-[#D9B26F]/10 text-lg ${
                active ? "font-semibold text-[#F0D38F]" : "text-white/85"
              }`}
            >
              {l.label}
              <span className="text-[#D9B26F]/60">›</span>
            </Link>
          );
        })}
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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[#D9B26F]/40 text-[#D9B26F] lg:hidden"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {mounted && open && createPortal(panel, document.body)}
    </>
  );
}
