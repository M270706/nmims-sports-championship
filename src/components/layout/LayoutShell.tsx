"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/layout/Footer";

interface LayoutShellProps {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const isStartingPage = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");

  // Starting page ('/') and all Admin pages ('/admin/*') manage their own layouts
  if (isStartingPage || isAdmin) {
    return <>{children}</>;
  }

  // Standard user portal pages render top SiteHeader and bottom Footer
  return (
    <>
      <SiteHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
