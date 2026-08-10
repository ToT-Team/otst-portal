import React from "react";

export function ModeManiaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" />
      <rect x="36" y="32" width="6" height="36" rx="3" fill="currentColor" />
      <rect x="47" y="24" width="6" height="52" rx="3" fill="currentColor" />
      <rect x="58" y="32" width="6" height="36" rx="3" fill="currentColor" />
    </svg>
  );
}
