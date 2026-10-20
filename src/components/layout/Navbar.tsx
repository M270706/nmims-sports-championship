"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Shield } from "lucide-react";
import { SvkmLogo, NmimsLogo } from "@/components/ui/BrandLogos";
import Container from "@/components/ui/Container";
import MobileMenu from "@/components/MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg border-b border-gold/20"
          : "bg-navy/90 backdrop-blur-sm border-b border-gold/15"
      }`}
    >
      {/* ===== PHONE & TABLET HEADER (below lg / 1024px) ===== */}
      {/* Exactly: [SVKM logo h-11 w-11] [title flex-1 min-w-0 truncate] [<MobileMenu />] [NMIMS logo h-11 w-11] */}
      <div className="lg:hidden flex items-center justify-between h-16 px-4">
        {/* SVKM logo (44x44 / h-11 w-11) */}
        <SvkmLogo size="xs" href="/home" />

        {/* Title flex-1 min-w-0 truncate */}
        <div className="flex-1 min-w-0 px-2 text-center">
          <Link
            href="/home"
            className="text-[15px] font-serif font-bold text-gold tracking-wide truncate block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
          >
            NMIMS Sports 2026-27
          </Link>
        </div>

        {/* <MobileMenu /> just before NMIMS logo */}
        <div className="flex items-center gap-1.5 shrink-0">
          <MobileMenu />
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
  );
}
