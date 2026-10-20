import React from "react";
import Link from "next/link";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "right",
  className = "",
  disabled = false,
  href,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      "bg-gold-gradient text-indigo-black font-bold uppercase tracking-wider hover:brightness-105 active:scale-[0.99] shadow-sm",
    secondary:
      "bg-surface-2 hover:bg-royal text-gold-light border border-gold/30 hover:border-gold font-semibold active:scale-[0.99]",
    outline:
      "bg-transparent hover:bg-gold/10 text-gold border border-gold/35 hover:border-gold font-semibold active:scale-[0.99]",
    ghost:
      "bg-transparent hover:bg-white/5 text-text-muted hover:text-text-main font-semibold",
  }[variant];

  const sizeStyles = {
    sm: "h-9 px-4 text-xs rounded-lg gap-1.5",
    md: "h-11 px-6 text-xs sm:text-sm rounded-xl gap-2",
    lg: "h-12 px-8 text-sm sm:text-base rounded-xl gap-2.5",
  }[size];

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:opacity-50 disabled:pointer-events-none select-none text-center whitespace-nowrap";

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...(props as any)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...(props as any)}
    >
      {content}
    </button>
  );
}
