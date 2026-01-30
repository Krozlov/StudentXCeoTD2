"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {ArrowLeft} from "lucide-react";
import {VALUES_DATA } from "@/constants/values";
import Image from "next/image";

export default function VisionMissionPage() {
  const [activeValue, setActiveValue] = useState(VALUES_DATA[0]);
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">

      {/*HERO SECTION*/}
      <section className="relative pt-16 pb-5 px-10 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0, y:20 }} animate={{opacity: 1, y:0 }} transition={{duration: 0.6 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4">
              Learn <br/> <span className="text-blue-600">Share <br/> <span className="text-black italic text-5xl md:text-8xl"> IMPACT!</span></span>
            </h1>
            <p className="text-slate-500 text-xs md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
               StudentsxCEOs is a leadership accelerator, guild boardroom and think-tank for future business leaders designed for students.
            </p>
          </motion.div>
        </div>
      </section>

      {/*VISION SECTION*/}
      <section className="py-6 px-10 my-10 border-y border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-3 px-4 bg-blue-50 text-blue-600 rounded-2xl mb-3">
              <span className="text-xs font-black uppercase tracking-widest">
                Our Vision & Mission
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
              Aspiring future business leaders in Indonesia.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xl md:text-2xl italic text-slate-800 leading-tight tracking-tight border-l-4 border-blue-600 pl-8 py-5 ">
              "To be the home of connected and integrated economic leaders, to push the nation towards a developed country."
            </p>
          </div>
        </div>
      </section>

      {/* VALUE SECTION*/}
      <section className="py-6 px-10 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-5">
            <h2 className="text-xl font-black tracking-widest text-blue-600 mb-4 text-center md:text-left">Inside StudentsxCEOs Jakarta</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-center md:text-left">
              Our <span className="italic">Value!</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/*NAVIGASI KIRI*/}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {VALUES_DATA.map((val) => {
                const Icon = val.icon;
                const isActive = activeValue.id === val.id;
                return (
                  <button
                    key={val.id}
                    onClick={() => setActiveValue(val)}
                    className={`relative p-8 rounded-[2.5rem] text-left transition-all duration-500 ${
                      isActive ? `${val.bgLight} border-transparent shadow-xl shadow-slate-100`:"bg-white border border-slate-100 hover:border-slate-300"
                    }`}
                    aria-label={`Select value ${val.title}`}
                  >
                    <div className="flex items-center gap-6 relative z-10">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isActive ? `${val.color} text-white scale-110 shadow-lg`: "bg-slate-100 text-slate-400"
                      }`}>
                      <Icon size={24} aria-hidden="true"/>
                      </div>
                      <div>
                        <h4 className={`text-xl font-black tracking-tight ${isActive? "text-slate-900" : "text-slate-400"}`}>
                          {val.title}
                        </h4>
                        <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${isActive ? val.text : "text-slate-300"}`}>
                          {isActive ? "Active View" : "Explore Detail"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/*DISPLAY KANAN*/}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeValue.id}
                  initial={{opacity:0, y:10 }}
                  animate={{ opacity:1, y: 0 }}
                  exit={{opacity: 0, y: -10 }}
                  transition={{duration: 0.3 }}
                  className="bg-slate-50 rounded-[4rem] p-8 md:p-14 h-full border border-slate-100 flex flex-col justify-between overflow-hidden relative"
                >
                  <div className="relative z-10">
                    <h4 className={`text-3xl font-black tracking-tighter mb-5 italic ${activeValue.text}`}>
                      {activeValue.title}
                    </h4>
                    <p className="text-slate-800 font-bold text-2xl md:text-3xl leading-tight tracking-tight mb-5">
                      "{activeValue.description}"
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeValue.points.map((p, i) => (
                        <span key={i} className="px-4 py-2 bg-white rounded-full text-xs font-black tracking-widest text-slate-500 shadow-sm border border-slate-100">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                    <Image
                      src={`/${activeValue.img}`}
                      alt={activeValue.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/*CTA SECTION*/}
      <section className="py-3 px-3 my-10 mx-3 md:mx-16 text-center">
        <div className="max-w-3xl mx-auto bg-blue-50 p-11 rounded-[4rem] border border-blue-100">
          <h2 className="text-3xl font-black mb-6 tracking-tight">
            Let's dive into our projects!
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/events"
              className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-blue-200 uppercase text-xs tracking-widest"
            >
              Our Projects
            </Link>
            <Link
              href="/"
              className="px-10 py-4 bg-white text-slate-900 border border-slate-200 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase text-xs tracking-widest"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      {/*FOOTER*/}
      <footer className="py-12 text-center text-slate-300 text-[9px] font-black uppercase tracking-[0.4em]">
        © 2026 StudentsxCEOs Jakarta. <br/> Learn Share Impact!
      </footer>
    </div>
  );
}