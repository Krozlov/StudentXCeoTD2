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

const STATUS_PRIORITY :Record<string, number> = { 
  "OPEN": 1, 
  "COMING SOON": 2, 
  "FINISHED": 3 
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
      return STATUS_PRIORITY[statusA] - STATUS_PRIORITY[statusB];
    });
  }, [activeFilter]);

  const visibleProjects= showAll ? processedProjects : processedProjects.slice(0, 3);
  const selectedProject = useMemo(() => 
    processedProjects.find(p=> p.id === selectedId) || null,
    [selectedId, processedProjects]
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/*HEADER*/}
      <section className="pt-32 pb-5 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-7xl font-black tracking-tighter mb-4 italic leading-none">SxC's<span className="text-blue-700 md:text-8xl not-italic"> Projects.</span></h1>
          <p className="text-slate-500 font-medium text-xl italic tracking-tight">Driving impact for the next generation of leaders.</p>
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
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${activeFilter === cat ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
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
                    initial={{ opacity:0, y:20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity:0, scale: 0.95 }} 
                    onClick={() => setSelectedId(proj.id)}
                    onKeyDown={(e)=> e.key === 'Enter' && setSelectedId(proj.id)}
                    tabIndex={0}
                    className={`group relative border rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row items-start gap-8 transition-all duration-500 cursor-pointer ${status === 'OPEN' ? 'bg-white border-blue-100 shadow-xl shadow-blue-500/5' : 'bg-slate-50/50 border-slate-100'}`}
                    role="button"
                    aria-label={`View details for ${proj.title}`}
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
                <Plus size={16} />View More
              </button>
            )}
          </div>
        </div>
      </section>

      {/*PARTNER CTA SECTION*/}
      <section className="py-16 md:py-24 px-6 bg-blue-600 text-white rounded-[2.5rem] md:rounded-[4rem] mx-4 md:mx-20 my-16 md:my-24 overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Handshake size={40} className="md:w-12 md:h-12 mx-auto mb-6 md:mb-8 opacity-50" />
          <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter mb-4 md:mb-6 uppercase leading-none">
            Become Our <br className="md:hidden" /> Strategic Partner.
          </h2>
          <p className="text-blue-100 text-sm md:text-xl font-medium italic mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Collaborate with StudentsxCEOs to empower the next generation of leaders. 
          </p>
          
          <Link 
            href="#" 
            className="inline-flex w-full md:w-auto items-center justify-center gap-3 px-8 md:px-12 py-5 md:py-6 bg-white text-blue-600 rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl"
          >
            Learn More <ArrowUpRight size={16} />
          </Link>
        </div>

        {/*Background*/}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-400 rounded-full blur-[100px] md:blur-[150px] opacity-30 -translate-y-1/2 translate-x-1/2" />
      </section>

      {/*MODAL POPUP*/}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/*Backdrop */}
            <motion.div 
              initial={{opacity: 0 }} 
              animate={{ opacity:1}} 
              exit={{opacity:0}} 
              onClick={() => setSelectedId(null)} 
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" 
            />

            {/*Konten*/}
            <motion.div 
              layoutId={String(selectedId)} 
              className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl z-10 custom-scrollbar"
            >
              {/*Close Button Mobile*/}
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-8 text-slate-300 hover:text-slate-900 transition-colors md:hidden"
              >
                <Plus size={24} className="rotate-45" />
              </button>

              {/*Categories*/}
              <div className="flex flex-wrap gap-2 mb-6 ">
                {selectedProject.categories?.map((cat) => (
                  <span key={cat} className="py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest border border-blue-100">
                    {cat}
                  </span>
                ))}
              </div>

              {/*Title & Description*/}
              <h2 className="text-4xl md:text-5xl font-black mb-6 border-blue-500 tracking-tighter leading-none text-slate-900">
                {selectedProject.title}
              </h2>
              
              <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] mb-10 border-l-8 border-blue-600">
                <p className="text-slate-600 text-base md:text-xl font-medium italic leading-relaxed">
                  "{selectedProject.description}"
                </p>
              </div>

              {/*Outcomes*/}
              <div className="mb-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-slate-100"></span> Key Takeaways
                </h4>
                <div className="grid gap-4">
                  {selectedProject.outcomes?.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                        <CheckCircle2 size={12} className="text-blue-600 group-hover:text-white" />
                      </div>
                      <span className="text-slate-700 text-sm md:text-base font-bold italic leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/*Technical Info*/}
              <div className="grid grid-cols-2 gap-6 mb-12 py-8 border-y border-slate-100">
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Timeline</p>
                  <p className="text-slate-900 font-bold italic text-sm">
                    {new Date(selectedProject.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Partnership Window</p>
                  <p className="text-slate-900 font-bold italic text-sm">{selectedProject.partnerRange || "TBA"}</p>
                </div>
              </div>

              {/*CTA*/}
              <div className="flex flex-col md:flex-row gap-4">
                <Link 
                  href={selectedProject.link || "#"} 
                  target="_blank" 
                  className="flex-[2] py-5 bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl text-center hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-200"
                >
                  <Rocket size={16}/> Register Now!
                </Link>
                <button 
                  onClick={()=> setSelectedId(null)} 
                  className="flex-1 py-5 bg-slate-200 text-slate-400 text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-200 transition-all"
                >
                  Back
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    
  );
}