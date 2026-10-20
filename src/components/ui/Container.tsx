import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Standard Corporate Container
 * Every section uses this one source of truth:
 * "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
 */
export default function Container({
  children,
  className = "",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
