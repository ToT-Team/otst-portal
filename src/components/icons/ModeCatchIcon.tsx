import React from "react";

export function ModeCatchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" />
      <circle cx="42" cy="42" r="6" fill="currentColor" />
      <circle cx="58" cy="50" r="6" fill="currentColor" />
      <circle cx="42" cy="58" r="6" fill="currentColor" />
    </svg>
  );
}
