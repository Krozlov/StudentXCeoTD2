"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  PhoneCall,   
  Rocket, 
  CheckCircle2, 
  Calendar,
  ExternalLink,
  Plus,
  Handshake,
  Instagram,
  Linkedin,
  Mail,
  ArrowUpRight
} from "lucide-react";
import {PROJECTS_DATA as PROJECTS} from "@/constants/projects";
import {CATEGORIES } from "@/constants/projects";

const getProjectStatus = (start: string, end: string) => {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (now < startDate) return "COMING SOON";
  if (now >= startDate && now <= endDate) return "OPEN";
  return "FINISHED";
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] =useState("All");
  const [selectedId, setSelectedId]= useState<number | null>(null);
  const [showAll, setShowAll] =useState(false);

  const processedProjects =useMemo(() => {
    const filtered = PROJECTS.filter((p) => {
      if (activeFilter === "All") return true;
      return p.categories?.includes(activeFilter);
    });

    return [...filtered].sort((a, b) => {
      const statusA = getProjectStatus(a.startDate, a.endDate);
      const statusB = getProjectStatus(b.startDate, b.endDate);
      const priority: Record<string, number> = { "OPEN": 1, "COMING SOON": 2, "FINISHED": 3 };
      return priority[statusA] - priority[statusB];
    });
  }, [activeFilter]);

  const visibleProjects = showAll ? processedProjects : processedProjects.slice(0, 3);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/*HEADER*/}
      <section className="pt-16 pb-5 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 hover:gap-4 transition-all mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="text-6xl font-black tracking-tighter mb-4 italic leading-none">Our Projects.</h1>
          <p className="text-slate-500 font-medium text-lg italic tracking-tight">Driving impact for the next generation of leaders.</p>
        </div>
      </section>

      {/*LIST SECTION*/}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/*Filter*/}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat} 
                onClick={() => { setActiveFilter(cat); setShowAll(false); }} 
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold font-black transition-all duration-300 ${activeFilter === cat ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/*Content*/}
          <div className="flex flex-col gap-6">
              {visibleProjects.map((proj) => {
                const status = getProjectStatus(proj.startDate, proj.endDate);
                const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(proj.title)}&dates=${proj.startDate.replace(/-/g, '')}/${proj.endDate.replace(/-/g, '')}&details=${encodeURIComponent(proj.description)}`;

                return (
                  <motion.div 
                    key={proj.id} 
                    layout
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }} 
                    onClick={() => setSelectedId(proj.id)}
                    className={`group relative border rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row items-start gap-8 transition-all duration-500 cursor-pointer ${status === 'OPEN' ? 'bg-white border-blue-100 shadow-xl shadow-blue-500/5' : 'bg-slate-50/50 border-slate-100'}`}
                  >
                    <div className="flex-grow space-y-6">

                      {/*Status*/}
                      <div className="flex items-start">
                        <span className={`text-[9px] font-black px-2 py-1 rounded-full ${status === 'OPEN' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {status}
                        </span>

                        {/*Categories*/}
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic flex flex-wrap gap-y-2 items-center">
                          {proj.categories?.map((cat) => (
                            <span key={cat}className="py-1 px-2 rounded-full bg-white text-blue-600 border-2 text-[8px] mx-1 ">{cat}</span>
                          ))}
                        </span>
                      </div>

                      {/*Title*/}
                      <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-none group-hover:text-blue-600 transition-colors">
                        {proj.title}
                      </h3>

                      {/*Outcomes*/}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {proj.outcomes?.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                            <span className="text-slate-500 text-xs font-bold italic leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/*Dates*/}
                        <div className="space-y-1">
                          <p className="text-xs font-black text-blue-500 uppercase tracking-widest">Registration</p>
                          <div className="flex items-center gap-2 text-slate-600 font-bold italic text-[11px]">
                            <Calendar size={12} className="text-blue-600" /> {new Date(proj.startDate).toDateString()} - {new Date(proj.endDate).toDateString()}
                          </div>
                        </div>
                    </div>

                    {/*CTA*/}
                    <div className="flex flex-col gap-3 shrink-0 w-full md:w-64">
                      {status === "OPEN" ? (
                        <Link href={proj.link || "#"} target="_blank" onClick={(e) => e.stopPropagation()} className="w-full py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                          <Rocket size={14} /> Register Now
                        </Link>
                      ) : (
                        <div className="w-full py-4 bg-slate-100 text-slate-400 text-xs font-black uppercase tracking-widest rounded-full border border-slate-100 text-center">
                          Closed
                        </div>
                      )}
                      
                      <Link href="#" onClick={(e) => e.stopPropagation()} className="w-full py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-black transition-all flex items-center justify-center gap-2">
                        <PhoneCall size={14} /> Person In Charge 
                      </Link>

                      <Link href={googleUrl} target="_blank" onClick={(e) => e.stopPropagation()} className="flex items-center justify-center gap-2 text-xs font-black text-blue-600 hover:text-blue-900 uppercase tracking-widest mt-2">
                        <ExternalLink size={12} /> Add Reminder
                      </Link>
                    </div>
                  </motion.div>
                );
              })}

            {!showAll && processedProjects.length > 3 && (
              <button onClick={() => setShowAll(true)} className="mt-8 mx-auto flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl">
                <Plus size={16} /> View More
              </button>
            )}
          </div>
        </div>
      </section>

      {/* PARTNER CTA SECTION */}
      <section className="py-12 px-6 bg-blue-600 text-white rounded-[4rem] mx-20 my-24 overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Handshake size={48} className="mx-auto mb-8 opacity-50" />
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 uppercase">Become Our Strategic Partner.</h2>
          <p className="text-blue-100 text-lg md:text-xl font-medium italic mb-10">
            Collaborate with StudentsxCEOs to empower the next generation of leaders. 
          </p>
          <Link href="#" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
            Learn More <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/*FOOTER*/}
      <footer className="py-12 text-center text-slate-300 text-[9px] font-black uppercase tracking-[0.4em]">
        © 2026 StudentsxCEOs Jakarta. <br/> Learn Share Impact!
      </footer>
    </div>
  );
}