import React from "react";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`p-8 sm:p-12 rounded-2xl bg-surface/80 border border-gold/20 text-center max-w-xl mx-auto shadow-card flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-black/80 border border-gold/30 flex items-center justify-center text-gold shadow-sm mb-4">
        {icon || <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-gold/80" />}
      </div>
      <h3 className="text-base sm:text-lg font-serif font-bold text-gold uppercase tracking-wider mb-2 leading-snug">
        {title}
      </h3>
      {description && (
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
