import React from "react";

export function ModeTaikoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="6" />
      <rect x="46" y="28" width="8" height="44" rx="4" fill="currentColor" />
    </svg>
  );
}
