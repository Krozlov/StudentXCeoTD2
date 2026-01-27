"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import ChatWidget from "@/components/ChatWidget";
import { useState, useEffect } from "react";
import { AIProvider } from "@/context/AIContext"; // 1. Import the Provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}>
        {/* 2. Wrap EVERYTHING in AIProvider */}
        <AIProvider> 
          <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 transition-all duration-300">
            <div className={`
              w-full max-w-7xl px-6 py-3 flex items-center justify-between transition-all duration-500 rounded-2xl border
              ${isScrolled 
                ? "bg-white/95 backdrop-blur-2xl border-slate-200 shadow-xl shadow-blue-500/10" 
                : "bg-white/60 backdrop-blur-xl border-white/40 shadow-none"}
            `}>
              <Link href="/" className="group flex items-center font-black text-xl tracking-tighter italic uppercase transition-all">
                <span className="text-slate-950 group-hover:text-blue-600 transition-colors">SxC</span>
                <span className="text-blue-600 group-hover:text-blue-400 font-bold not-italic text-sm align-top ml-1 transition-colors">JKT</span>
              </Link>

              <div className="flex items-center gap-8">
                <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600 uppercase tracking-widest">
                  <Link href="/vision-mission" className="hover:text-blue-600 transition-colors">Vision</Link>
                  <Link href="/team" className="hover:text-blue-600 transition-colors">Team</Link>
                  <Link href="/events" className="hover:text-blue-600 transition-colors">Projects</Link>
                  <Link href="/partners" className="hover:text-blue-600 transition-colors">Partners</Link>
                </div>
                <ChatWidget />
              </div>
            </div>
          </nav>

          <main className="flex-1">
            {children}
          </main>
        </AIProvider>
      </body>
    </html>
  );
}