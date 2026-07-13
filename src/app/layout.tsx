import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OTST | Esports & Tournament Portal",
  description: "Offline To Online Synchronized Tournaments. Discover elite gaming schedules, standings, and historical records.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
