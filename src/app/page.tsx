"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

// ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Running Text Content
const SXC_HIGHLIGHTS = [
  "Bridging Students & Top CEOs",
  "14 Batches of Excellence",
  "Premier Leadership Accelerator",
  "Impactful Mentorship Programs",
  "Expanding Professional Networks"
];

export default function Home() {
  const [index, setIndex] = useState(0);

  // Running Texts
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SXC_HIGHLIGHTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-white text-slate-900 font-sans flex flex-col"
    >
      {/* HERO SECTION */}
      <section className="relative flex-1 flex items-start md:items-center overflow-hidden bg-white px-6 pt-32 md:pt-25 pb-12">
        
        {/* Dynamic Background */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400 blur-[120px] animate-mesh"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-blue-200 blur-[100px] animate-mesh-delay"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 w-full relative z-10">
          
          {/* Left Side Content */}
          <div className="flex-[1.5] text-center md:text-left z-10">
            <motion.div variants={itemVariants} className="mb-4">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic pr-10 bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-blue-700 to-blue-500 drop-shadow-md">
                STUDENTSXCEO
              </h2>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full"
            >
              Jakarta Chapter • Batch 14
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Learn. <span className="text-blue-500">Share.</span> <br />
              Impact!
            </motion.h1>
            
            <motion.p variants={itemVariants} className="mt-4 text-sm md:text-base text-slate-500 leading-relaxed max-w-lg">
              The premier platform bridging the gap between top-tier CEOs and the next generation of Indonesian leaders. 
              Join us in our mission to empower and inspire.
            </motion.p>

            {/* Rotating Highlight with Leadership Trophy Icon */}
            <motion.div variants={itemVariants} className="mt-8 h-12 overflow-hidden flex justify-center md:justify-start items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
                <Trophy size={20} fill="currentColor" /> 
              </div>
              <div className="relative h-full flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute whitespace-nowrap text-slate-900 font-black text-xl md:text-3xl tracking-tighter"
                  >
                    {SXC_HIGHLIGHTS[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="/vision-mission" 
                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
              >
                Our Vision & Mission
              </Link>
              <Link 
                href="/events" 
                className="px-8 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-all"
              >
                Past Projects
              </Link>
            </motion.div>
          </div>

          {/* Rigt Side Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="flex-1 flex justify-center relative"
          >
            {/* Impact Badge 1 - CEO Network */}
            <div className="absolute top-10 left-0 md:-left-4 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-blue-50 animate-float-slow hidden sm:block">
              <div className="flex items-baseline gap-1">
                <span className="text-blue-600 font-black text-2xl leading-none">50</span>
                <span className="text-blue-600 font-bold text-xs">+</span>
              </div>
              <p className="text-slate-400 text-[8px] uppercase font-bold tracking-widest mt-1">Partner CEOs</p>
            </div>

            {/* Impact Badge 2 - Alumni Success */}
            <div className="absolute bottom-20 right-0 md:-right-4 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-blue-50 animate-float-delayed hidden sm:block">
              <p className="text-slate-950 font-black text-lg leading-none italic uppercase">Alumni</p>
              <p className="text-blue-500 text-[8px] uppercase font-bold tracking-widest mt-1">Top-Tier Network</p>
            </div>

            <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] animate-float">
              <Image
                src="/sxclogo.png" 
                alt="StudentsxCEOs Jakarta Logo"
                fill
                className="object-contain drop-shadow-2xl"
                priority 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK ACCESS GRID */}
      <section className="py-12 max-w-6xl mx-auto px-6 w-full">
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "Meet The Team", path: "/team", desc: "The bright minds behind Batch 14." },
            { title: "Our Partners", path: "/partners", desc: "Leading organizations supporting our growth." },
            { title: "SXC AI Assistant", path: "/chatbot", desc: "Interact with our custom AI to learn everything about StudentXCEO Jakarta." }
          ].map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <Link href={item.path} className="group block h-full p-8 border border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-xl hover:shadow-blue-50 transition-all bg-white">
                <h3 className="text-xl font-bold group-hover:text-blue-600">{item.title}</h3>
                <p className="mt-2 text-slate-500">{item.desc}</p>
                <div className="mt-4 text-blue-500 font-bold flex items-center gap-2">
                  Explore <span>→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}