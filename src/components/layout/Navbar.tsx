"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Shield } from "lucide-react";
import { TOURNAMENT_CONFIG } from "@/config/tournament";
import { SvkmLogo, NmimsLogo } from "@/components/ui/BrandLogos";
import Container from "@/components/ui/Container";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }

  const navLinks = [
    { label: "Home", href: "/home" },
    { label: "Sports", href: "/sports" },
    { label: "Teams", href: "/teams" },
    { label: "Campuses", href: "/campuses" },
    { label: "Points & Stats", href: "/standings" },
    { label: "Gallery", href: "/gallery" },
    { label: "Travel & Stay", href: "/travel" },
    { label: "Contact", href: "/contact" },
  ];

  const moreLinks = [
    { label: "Rules & Eligibility", href: "/rules" },
    { label: "Previous Edition", href: "/previous-edition" },
    { label: "FAQ", href: "/rules#faq" },
  ];

  const isActive = (href: string) => {
    if (href === "/home") return pathname === "/home";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-md shadow-lg border-b border-gold/20"
            : "bg-navy/90 backdrop-blur-sm border-b border-gold/15"
        }`}
      >
        {/* ===== PHONE & TABLET HEADER (below lg / 1024px) ===== */}
        {/* Height: 64px (h-16). Order: [SVKM 44px] [title "NMIMS Sports 2026-27" truncate, centred] [☰ 44px] [NMIMS 44px] */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4">
          {/* SVKM logo (44x44) */}
          <SvkmLogo size="xs" href="/home" />

          {/* Centred Title (truncate) */}
          <div className="flex-1 min-w-0 px-2 text-center">
            <Link
              href="/home"
              className="text-sm sm:text-base font-serif font-bold text-gold tracking-wide truncate block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
            >
              NMIMS Sports 2026-27
            </Link>
          </div>

          {/* Hamburger + NMIMS logo */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-gold hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <NmimsLogo size="xs" href="/home" />
          </div>
        </div>

        {/* ===== LAPTOP & DESKTOP HEADER (lg and above / 1024px+) ===== */}
        {/* Height: 80px (h-20). Order: [SVKM 56px] [nav links centred] [Admin button] [NMIMS 56px] */}
        <Container className="hidden lg:block">
          <div className="flex items-center justify-between h-20">
            {/* Left: SVKM logo (56x56) */}
            <div className="shrink-0 flex items-center">
              <SvkmLogo size="lg" href="/home" />
            </div>

            {/* Centre: Nav links */}
            <div className="flex-1 flex items-center justify-center px-4">
              <nav className="flex items-center space-x-1 xl:space-x-2">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-3 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                        active
                          ? "text-gold font-semibold"
                          : "text-text-main hover:text-gold-light"
                      }`}
                    >
                      {link.label}
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold" />
                      )}
                    </Link>
                  );
                })}

                {/* More Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                    className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                      pathname === "/rules" || pathname === "/previous-edition"
                        ? "text-gold font-semibold"
                        : "text-text-main hover:text-gold-light"
                    }`}
                    aria-expanded={moreDropdownOpen}
                  >
                    <span>More</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {moreDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-surface border border-gold/25 shadow-card-hover py-2 z-50 backdrop-blur-md">
                      {moreLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-xs text-text-main hover:bg-surface-2 hover:text-gold transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right: Admin button + NMIMS logo (56x56) */}
            <div className="shrink-0 flex items-center gap-3">
              <Link
                href="/admin/login"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gold/30 bg-surface/80 hover:bg-gold/15 text-gold text-xs font-semibold tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 min-h-[44px]"
                title="Admin Portal Login"
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </Link>
              <NmimsLogo size="lg" href="/home" />
            </div>
          </div>
        </Container>
      </header>

      {/* ===== FULL-SCREEN MOBILE DRAWER (PORTAL TO BODY) ===== */}
      {/* Mounted via createPortal to document.body to prevent backdrop-blur clipping */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-navy/98 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Top: Title & Close Button (44x44) */}
            <div className="flex items-center justify-between pb-4 border-b border-gold/15 shrink-0">
              <div className="flex items-center gap-3">
                <SvkmLogo size="xs" href="/home" />
                <span className="font-serif font-bold text-sm text-gold uppercase tracking-wider">
                  NMIMS Sports 2026-27
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-xl bg-white/5 hover:bg-gold hover:text-navy text-gold flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Body: Big Gold Nav Links */}
            <nav className="flex-1 py-6 space-y-1">
              {[...navLinks, ...moreLinks].map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-lg font-serif transition-colors min-h-[44px] flex items-center ${
                      active
                        ? "bg-surface text-gold font-bold border-l-4 border-gold"
                        : "text-text-main hover:text-gold active:bg-surface/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Bottom: Admin Portal Button + Footer info */}
            <div className="pt-4 border-t border-gold/15 space-y-4 shrink-0 pb-[env(safe-area-inset-bottom)]">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl btn-gold text-xs font-bold uppercase tracking-wider shadow-gold-glow min-h-[44px]"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Portal Login</span>
              </Link>

              <div className="text-center text-xs text-text-muted">
                <p>{TOURNAMENT_CONFIG.hostCampus}</p>
                <p className="mt-0.5 text-gold font-mono">{TOURNAMENT_CONFIG.dates}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
