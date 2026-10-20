import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: React.ElementType;
}

export default function Card({
  children,
  className = "",
  hover = true,
  as: Component = "div",
  ...props
}: CardProps) {
  return (
    <Component
      className={`p-5 md:p-6 rounded-2xl bg-surface/90 border border-gold/15 shadow-card ${
        hover
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/35 hover:shadow-card-hover"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
