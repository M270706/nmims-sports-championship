import React from "react";

export type BadgeVariant =
  | "men"
  | "women"
  | "gold"
  | "royal"
  | "success"
  | "neutral"
  | "host";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "gold",
  size = "md",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    men: "bg-men/15 text-men border-men/40",
    women: "bg-women/15 text-women border-women/40",
    gold: "bg-gold/15 text-gold border-gold/40",
    royal: "bg-royal/30 text-gold-light border-royal/50",
    success: "bg-success/15 text-success border-success/40",
    neutral: "bg-white/5 text-text-muted border-white/10",
    host: "bg-gradient-to-r from-gold via-gold-light to-gold text-indigo-black font-black border-transparent shadow-sm",
  }[variant];

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wider rounded-full border ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </span>
  );
}
