import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "OpenClaw Explained",
  description: "An interactive guide to understanding OpenClaw's architecture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable}`}>
      <body className="bg-[#0A0A0A] text-gray-50 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
