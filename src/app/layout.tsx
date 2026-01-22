import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



import './globals.css';
import Link from 'next/link';
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: 'StudentsxCEOs Jakarta',
  description: 'Batch 14 Introduction App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-white">
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full z-[100] backdrop-blur-md bg-black/30 border-b border-white/10 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Left: Brand */}
            <Link href="/" className="font-bold text-xl tracking-tighter hover:text-blue-400 transition-colors">
              SxC JAKARTA
            </Link>

            {/* Right: Navigation Links & AI Button */}
            <div className="flex items-center gap-8">
              <div className="hidden md:flex space-x-6 text-sm font-medium">
                <Link href="/vision-mission" className="hover:text-blue-400 transition-colors">Vision</Link>
                <Link href="/team" className="hover:text-blue-400 transition-colors">Team</Link>
                <Link href="/events" className="hover:text-blue-400 transition-colors">Projects</Link>
                <Link href="/partners" className="hover:text-blue-400 transition-colors">Partners</Link>
              </div>

              {/* The Chatbot Widget Button */}
              <ChatWidget />
            </div>

          </div>
        </nav>

        {/* Page Content */}
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
