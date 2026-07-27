import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don Ignatius Cyriac — Senior Front End Developer",
  description:
    "Portfolio and resume of Don Ignatius Cyriac, Senior Front End Developer based in Bangalore.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
