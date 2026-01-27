"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import ChatWidget from "@/components/ChatWidget";
import { useState, useEffect } from "react";
import { AIProvider } from "@/context/AIContext";
import { Instagram, Linkedin } from "lucide-react"; // Removed Mail

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900 flex flex-col min-h-screen`}>
        <AIProvider> 
          
          {/* NAVIGATION BAR */}
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

          {/* MAIN PAGE CONTENT */}
          <main className="flex-1">
            {children}
          </main>

          {/* FOOTER SECTION */}
          <footer className="bg-slate-50 border-t border-slate-100 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div className="space-y-6">
                  <h3 className="font-black italic text-3xl uppercase tracking-tighter">
                    <span className="text-slate-950">SxC</span>
                    <span className="text-blue-600 not-italic">JKT</span>
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-xs">
                    Bridging the gap between students and top-tier business leaders in Indonesia.
                  </p>
                </div>

                {/* Explore Links */}
                <div>
                  <h4 className="font-bold uppercase text-[11px] tracking-[0.25em] text-blue-600 mb-8">Explore</h4>
                  <ul className="space-y-4 text-sm font-bold text-slate-600">
                    <li><Link href="/vision-mission" className="hover:text-blue-600 transition-colors">Vision & Mission</Link></li>
                    <li><Link href="/team" className="hover:text-blue-600 transition-colors">Meet the Team</Link></li>
                    <li><Link href="/events" className="hover:text-blue-600 transition-colors">Our Projects</Link></li>
                  </ul>
                </div>

                {/* Contact Us Column */}
                <div className="lg:col-span-2">
                  <h4 className="font-bold uppercase text-[11px] tracking-[0.25em] text-blue-600 mb-8">Contact Us</h4>
                  <div className="flex flex-col gap-6">
                    
                    {/* Instagram Row */}
                    <Link 
                      href="https://instagram.com/studentsxceosjkt" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group w-fit"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-rose-500 group-hover:text-white group-hover:bg-rose-500 group-hover:border-rose-500 transition-all shadow-sm">
                        <Instagram size={22} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instagram</span>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">@studentsxceosjkt</span>
                      </div>
                    </Link>

                    {/* LinkedIn Row */}
                    <Link 
                      href="https://www.linkedin.com/company/studentsxceos-jakarta/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group w-fit"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all shadow-sm">
                        <Linkedin size={22} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">LinkedIn</span>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">StudentsxCEOs Jakarta</span>
                      </div>
                    </Link>

                  </div>
                </div>
              </div>

              {/* Bottom Copyright */}
              <div className="pt-8 border-t border-slate-200/60 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                  © 2026 StudentsxCEOs Jakarta. Learn Share Impact!
                </p>
              </div>
            </div>
          </footer>
        </AIProvider>
      </body>
    </html>
  );
}