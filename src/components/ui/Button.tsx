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
      "bg-gradient-to-r from-[#A88345] via-[#D9B26F] to-[#F0D38F] text-[#0F122E] font-semibold uppercase tracking-wide shadow-[0_8px_24px_-8px_rgba(217,178,111,0.6)] hover:brightness-110 active:scale-[0.99]",
    secondary:
      "bg-[#161A40] hover:bg-[#20255A] text-[#D9B26F] border border-[#D9B26F]/40 hover:border-[#D9B26F] font-semibold active:scale-[0.99]",
    outline:
      "bg-transparent hover:bg-[#D9B26F]/10 text-[#D9B26F] border border-[#D9B26F]/40 hover:border-[#D9B26F] font-semibold active:scale-[0.99]",
    ghost:
      "bg-transparent hover:bg-white/5 text-[#AEB3D6] hover:text-[#F4EFE3] font-semibold",
  }[variant];

  const sizeStyles = {
    sm: "h-9 px-4 text-xs rounded-lg gap-1.5",
    md: "h-11 px-6 text-xs sm:text-sm rounded-xl gap-2",
    lg: "h-12 px-7 text-[15px] rounded-xl gap-2",
  }[size];

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0D38F]/70 disabled:opacity-50 disabled:pointer-events-none select-none text-center whitespace-nowrap";

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
