"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Layers,
  UserCheck,
  Calendar,
  CheckCircle2,
  BarChart2,
  Image as ImageIcon,
  Megaphone,
  Phone,
  Building2,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import BrandLogos from "@/components/ui/BrandLogos";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    pathname === "/admin/login" ? true : null
  );

  useEffect(() => {
    if (pathname === "/admin/login") {
      return;
    }

    async function checkAuth() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user || !user.email) {
          router.push("/admin/login");
          return;
        }

        // Verify user is in admins table
        const { data: adminRecord, error: adminErr } = await supabase
          .from("admins")
          .select("email, role")
          .eq("email", user.email.toLowerCase().trim())
          .maybeSingle();

        if (adminErr || !adminRecord) {
          await supabase.auth.signOut();
          router.push("/admin/login");
          return;
        }

        setAdminEmail(user.email);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      }
    }

    checkAuth();
  }, [pathname, router]);

  // Admin Sidebar Items
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Teams", href: "/admin/teams", icon: Users },
    { label: "Groups", href: "/admin/groups", icon: Layers },
    { label: "Players", href: "/admin/players", icon: UserCheck },
    { label: "Schedule Matches", href: "/admin/matches", icon: Calendar },
    { label: "Declare Results", href: "/admin/results", icon: CheckCircle2 },
    { label: "Points Tables", href: "/admin/points", icon: BarChart2 },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { label: "Contacts", href: "/admin/contacts", icon: Phone },
    { label: "Campus Departments", href: "/admin/campuses", icon: Building2 },
    { label: "Admin Users", href: "/admin/users", icon: ShieldCheck },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Signout error:", e);
    }
    router.push("/");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0F122E] flex items-center justify-center text-gold font-serif text-sm">
        Verifying Admin Access...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-text-main flex flex-col md:flex-row">
      {/* Desktop Sidebar: 240px */}
      <aside className="hidden md:flex flex-col w-60 bg-indigo-black border-r border-gold/20 flex-shrink-0 min-h-screen">
        {/* Brand Header: BrandLogos size="sm" (48x48) */}
        <div className="p-3.5 border-b border-[rgba(217,178,111,0.15)]">
          <BrandLogos size="sm" href="/admin" className="w-full">
            <div className="text-center px-1">
              <div className="font-serif font-black text-xs text-gold uppercase tracking-wider">
                Admin Portal
              </div>
              <div className="text-[10px] font-mono text-[#AEB3D6]">
                2026-27
              </div>
            </div>
          </BrandLogos>
        </div>

        {/* 12 Navigation Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-gold/20 to-transparent border-l-2 border-gold text-gold-light"
                    : "text-[#AEB3D6] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-gold" : "text-[#AEB3D6]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Footer */}
        <div className="p-4 border-t border-[rgba(217,178,111,0.15)] bg-[#0A0D24] space-y-3">
          <div className="text-[11px] font-mono text-gold-light truncate">
            {adminEmail}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/home"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-royal/40 hover:bg-royal text-gold text-[11px] font-bold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>User Portal</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header: 56px height, email (truncated), logout, and hamburger */}
      <header className="md:hidden h-14 bg-[#0F122E] border-b border-[rgba(217,178,111,0.2)] px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-gold focus:outline-none flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg hover:bg-white/[0.04]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link
            href="/admin"
            className="font-serif font-black text-xs text-gold uppercase tracking-wider whitespace-nowrap"
          >
            Admin Portal
          </Link>
        </div>

        <div className="flex items-center gap-2 min-w-0 max-w-[58%] justify-end">
          {adminEmail && (
            <span
              className="text-[11px] font-mono text-gold-light truncate max-w-[140px] sm:max-w-[200px]"
              title={adminEmail}
            >
              {adminEmail}
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0F122E]/95 backdrop-blur-md p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-gold/20 mb-4">
            <span className="font-serif font-bold text-sm text-gold uppercase">
              Admin Navigation
            </span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold ${
                    isActive
                      ? "bg-gold/20 text-gold-light border-l-2 border-gold"
                      : "text-[#AEB3D6]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-4 border-t border-gold/20 space-y-3">
            <div className="text-xs font-mono text-gold truncate">
              {adminEmail}
            </div>
            <div className="flex gap-2">
              <Link
                href="/home"
                className="flex-1 py-2.5 rounded-xl bg-royal text-center text-xs font-bold text-gold"
              >
                View User Portal
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl bg-red-500/20 text-red-300 text-xs font-bold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area: minimum px-4 on mobile */}
      <main className="flex-1 min-w-0 px-4 py-4 sm:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar (Quick Access for Top Admin Tasks: Dashboard, Matches, Results, Groups, More) */}
      <nav
        aria-label="Mobile Admin Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0F122E] border-t border-[rgba(217,178,111,0.2)] px-1 pt-1 pb-[env(safe-area-inset-bottom)] flex items-center justify-around shadow-2xl"
      >
        <Link
          href="/admin"
          className={`flex-1 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1 text-[10px] transition-colors ${
            pathname === "/admin" ? "text-gold font-bold" : "text-[#AEB3D6] hover:text-white"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/matches"
          className={`flex-1 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1 text-[10px] transition-colors ${
            pathname.startsWith("/admin/matches") ? "text-gold font-bold" : "text-[#AEB3D6] hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Matches</span>
        </Link>
        <Link
          href="/admin/results"
          className={`flex-1 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1 text-[10px] transition-colors ${
            pathname.startsWith("/admin/results") ? "text-gold font-bold" : "text-[#AEB3D6] hover:text-white"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Results</span>
        </Link>
        <Link
          href="/admin/groups"
          className={`flex-1 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1 text-[10px] transition-colors ${
            pathname.startsWith("/admin/groups") ? "text-gold font-bold" : "text-[#AEB3D6] hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Groups</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className={`flex-1 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1 text-[10px] transition-colors ${
            mobileMenuOpen ? "text-gold font-bold" : "text-[#AEB3D6] hover:text-white"
          }`}
          aria-label="Open full admin menu"
        >
          <MoreHorizontal className="w-4 h-4" />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}
