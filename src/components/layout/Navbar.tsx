"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Shield } from "lucide-react";
import { TOURNAMENT_CONFIG } from "@/config/tournament";
import { SvkmLogo, NmimsLogo } from "@/components/ui/BrandLogos";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F122E]/90 backdrop-blur-md shadow-lg border-b border-[rgba(217,178,111,0.2)]"
          : "bg-[#0F122E]/75 backdrop-blur-sm border-b border-[rgba(217,178,111,0.12)]"
      }`}
    >
      {/* ===== MOBILE HEADER (below lg) ===== */}
      <div className="lg:hidden flex items-center justify-between h-16 px-3">
        {/* Left: SVKM logo */}
        <SvkmLogo size="xs" href="/home" />

        {/* Centre: Short title, flex-1, truncated */}
        <div className="flex-1 min-w-0 px-2 text-center">
          <Link
            href="/home"
            className="block text-[14px] sm:text-[15px] font-serif font-semibold text-gold tracking-wide truncate"
          >
            NMIMS Sports 26-27
          </Link>
        </div>

        {/* Right: NMIMS logo + hamburger */}
        <div className="flex items-center gap-1.5">
          <NmimsLogo size="xs" href="/home" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-11 h-11 rounded-lg text-gold hover:text-gold-light focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ===== DESKTOP HEADER (lg and above) ===== */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] xl:h-24">
          {/* Left: SVKM logo */}
          <SvkmLogo size="lg" href="/home" />

          {/* Centre: Navigation Links */}
          <div className="hidden xl:flex flex-col items-center justify-center flex-1 px-4">
            <nav className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-2.5 py-1.5 text-xs lg:text-sm font-medium transition-colors duration-200 rounded-md ${
                      active
                        ? "text-gold font-semibold"
                        : "text-[#F4EFE3] hover:text-gold-light"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#D9B26F] to-transparent" />
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
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-medium transition-colors duration-200 rounded-md ${
                    pathname === "/rules" || pathname === "/previous-edition"
                      ? "text-gold font-semibold"
                      : "text-[#F4EFE3] hover:text-gold-light"
                  }`}
                  aria-expanded={moreDropdownOpen}
                >
                  More
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#161A40] border border-[rgba(217,178,111,0.25)] shadow-xl py-1 z-50 backdrop-blur-md">
                    {moreLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-[#F4EFE3] hover:bg-[#20255A] hover:text-gold transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* DESKTOP (LG but not XL): Condensed Links */}
          <div className="hidden lg:flex xl:hidden flex-1 px-2 justify-center">
            <nav className="flex items-center space-x-1">
              {navLinks.slice(0, 5).map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-2 py-1.5 text-xs font-medium transition-colors ${
                      active ? "text-gold font-semibold" : "text-[#F4EFE3] hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/* More Dropdown for medium-large */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-[#F4EFE3] hover:text-gold"
                >
                  More <ChevronDown className="w-3 h-3" />
                </button>
                {moreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#161A40] border border-[rgba(217,178,111,0.25)] shadow-xl py-1 z-50 backdrop-blur-md">
                    {[...navLinks.slice(5), ...moreLinks].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-xs text-[#F4EFE3] hover:bg-[#20255A] hover:text-gold"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right: Admin link + NMIMS logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[rgba(217,178,111,0.3)] bg-[#161A40]/80 hover:bg-gold/15 text-gold text-xs font-semibold tracking-wider transition-all"
              title="Organisers / Admin Login"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
            <NmimsLogo size="lg" href="/home" />
          </div>
        </div>
      </div>

      {/* ===== MOBILE FULL-SCREEN NAV OVERLAY ===== */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-[#0F122E]/98 backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-fadeIn">
          <div className="p-4 space-y-3">
            <div className="text-center pb-3 border-b border-[rgba(217,178,111,0.15)]">
              <span className="text-[11px] uppercase tracking-widest text-[#AEB3D6]">
                {TOURNAMENT_CONFIG.organizedBy}
              </span>
              <h2 className="text-sm font-serif font-bold text-gold mt-0.5">
                {TOURNAMENT_CONFIG.fullName}
              </h2>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all min-h-[44px] flex items-center ${
                      active
                        ? "bg-[#20255A] text-gold font-bold border-l-4 border-gold"
                        : "text-[#F4EFE3] active:bg-[#161A40]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-[rgba(217,178,111,0.15)]">
                <p className="px-4 text-xs font-semibold uppercase tracking-wider text-[#AEB3D6] mb-1.5">
                  More Resources
                </p>
                {moreLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm text-[#F4EFE3] active:text-gold active:bg-[#161A40] min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Admin link — visible only in mobile menu */}
              <div className="pt-2">
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gold/15 border border-gold/40 text-gold font-bold text-sm tracking-wide min-h-[44px]"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Portal Login</span>
                </Link>
              </div>
            </nav>
          </div>

          <div className="p-4 border-t border-[rgba(217,178,111,0.15)] text-center text-xs text-[#AEB3D6] pb-[env(safe-area-inset-bottom)]">
            <p>{TOURNAMENT_CONFIG.hostCampus}</p>
            <p className="mt-0.5 text-gold font-mono">{TOURNAMENT_CONFIG.dates}</p>
          </div>
        </div>
      )}
    </header>
  );
}
