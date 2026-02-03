"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Building2, Handshake, Users, Award, TrendingUp, Globe } from "lucide-react";
import Image from "next/image";

// Partner Categories Data
const PARTNER_CATEGORIES = [
  {
    id: "corporate",
    title: "Corporate Partners",
    icon: Building2,
    color: "bg-blue-600",
    bgLight: "bg-blue-50",
    text: "text-blue-600",
    description: "Leading corporations empowering the next generation of business leaders through mentorship and collaboration.",
    points: ["Strategic Guidance", "Industry Insights", "Career Opportunities"],
    partners: [
      { name: "Partner Corp 1", logo: "/partner1.png" },
      { name: "Partner Corp 2", logo: "/partner2.png" },
      { name: "Partner Corp 3", logo: "/partner3.png" },
    ]
  },
  {
    id: "educational",
    title: "Educational Partners",
    icon: Users,
    color: "bg-purple-600",
    bgLight: "bg-purple-50",
    text: "text-purple-600",
    description: "Academic institutions fostering innovation and leadership development through collaborative programs.",
    points: ["Academic Excellence", "Research Collaboration", "Talent Development"],
    partners: [
      { name: "University 1", logo: "/edu1.png" },
      { name: "University 2", logo: "/edu2.png" },
    ]
  },
  {
    id: "startup",
    title: "Startup Ecosystem",
    icon: TrendingUp,
    color: "bg-green-600",
    bgLight: "bg-green-50",
    text: "text-green-600",
    description: "Dynamic startups and accelerators bringing entrepreneurial spirit and innovative approaches to leadership.",
    points: ["Innovation Focus", "Agile Mindset", "Growth Mentorship"],
    partners: [
      { name: "Startup 1", logo: "/startup1.png" },
      { name: "Startup 2", logo: "/startup2.png" },
      { name: "Startup 3", logo: "/startup3.png" },
    ]
  },
  {
    id: "community",
    title: "Community Partners",
    icon: Handshake,
    color: "bg-orange-600",
    bgLight: "bg-orange-50",
    text: "text-orange-600",
    description: "Community organizations and social enterprises driving positive impact and sustainable development.",
    points: ["Social Impact", "Community Building", "Sustainable Growth"],
    partners: [
      { name: "Community Org 1", logo: "/comm1.png" },
      { name: "Community Org 2", logo: "/comm2.png" },
    ]
  }
];

// Stats Data
const PARTNERSHIP_STATS = [
  { value: "50+", label: "Partner Organizations" },
  { value: "100+", label: "CEOs & Leaders" },
  { value: "14", label: "Batches Supported" },
  { value: "500+", label: "Students Impacted" }
];

export default function PartnersPage() {
  const [activeCategory, setActiveCategory] = useState(PARTNER_CATEGORIES[0]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative pt-30 pb-5 px-10 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4">
              Our <br/> 
              <span className="text-blue-600">Partners <br/> 
                <span className="text-black italic text-5xl md:text-8xl">Network!</span>
              </span>
            </h1>
            <p className="text-slate-500 text-xs md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              Building the future together with Indonesia's most innovative organizations and visionary leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-6 px-10 my-10 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNERSHIP_STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100"
              >
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP MISSION */}
      <section className="py-6 px-10 my-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-3 px-4 bg-blue-50 text-blue-600 rounded-2xl mb-3">
              <Globe size={16} />
              <span className="text-xs font-black uppercase tracking-widest">
                Partnership Philosophy
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
              Collaboration drives innovation.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xl md:text-2xl italic text-slate-800 leading-tight tracking-tight border-l-4 border-blue-600 pl-8 py-5">
              "We believe in the power of strategic partnerships to create meaningful impact and develop the next generation of Indonesian business leaders."
            </p>
          </div>
        </div>
      </section>

      {/* PARTNER CATEGORIES SECTION */}
      <section className="py-6 px-10 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-5">
            <h2 className="text-xl font-black tracking-widest text-blue-600 mb-4 text-center md:text-left">
              Partnership Ecosystem
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-center md:text-left">
              Our <span className="italic">Partners!</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* CATEGORY NAVIGATION - LEFT */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {PARTNER_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory.id === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category)}
                    className={`relative p-8 rounded-[2.5rem] text-left transition-all duration-500 ${
                      isActive 
                        ? `${category.bgLight} border-transparent shadow-xl shadow-slate-100`
                        : "bg-white border border-slate-100 hover:border-slate-300"
                    }`}
                    aria-label={`Select category ${category.title}`}
                  >
                    <div className="flex items-center gap-6 relative z-10">
                      <div 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isActive 
                            ? `${category.color} text-white scale-110 shadow-lg`
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <Icon size={24} aria-hidden="true" />
                      </div>
                      <div>
                        <h4 
                          className={`text-xl font-black tracking-tight ${
                            isActive ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {category.title}
                        </h4>
                        <p 
                          className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                            isActive ? category.text : "text-slate-300"
                          }`}
                        >
                          {isActive ? "Active View" : "Explore Category"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CATEGORY DISPLAY - RIGHT */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-50 rounded-[4rem] p-8 md:p-14 h-full border border-slate-100 flex flex-col justify-between overflow-hidden relative"
                >
                  <div className="relative z-10">
                    <h4 className={`text-3xl font-black tracking-tighter mb-5 italic ${activeCategory.text}`}>
                      {activeCategory.title}
                    </h4>
                    <p className="text-slate-800 font-bold text-2xl md:text-3xl leading-tight tracking-tight mb-5">
                      "{activeCategory.description}"
                    </p>
                    
                    {/* Key Points */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeCategory.points.map((point, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-white rounded-full text-xs font-black tracking-widest text-slate-500 shadow-sm border border-slate-100"
                        >
                          {point}
                        </span>
                      ))}
                    </div>

                    {/* Partner Logos Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {activeCategory.partners.map((partner, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="aspect-square bg-white rounded-2xl p-6 flex items-center justify-center border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group"
                        >
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                              <Award className="text-slate-400 group-hover:text-blue-600 transition-colors" size={32} />
                            </div>
                            <p className="text-xs font-bold text-slate-600">{partner.name}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP OPPORTUNITIES CTA */}
      <section className="py-3 px-3 my-10 mx-3 md:mx-16 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 p-11 rounded-[4rem] border border-blue-100">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full mb-4">
            <Handshake size={20} className="text-blue-600" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              Join Our Network
            </span>
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tight">
            Interested in partnering with us?
          </h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Let's collaborate to empower the next generation of Indonesian business leaders.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="mailto:partnerships@studentsxceos.id"
              className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-blue-200 uppercase text-xs tracking-widest"
            >
              Become a Partner
            </Link>
            <Link
              href="/vision-mission"
              className="px-10 py-4 bg-white text-slate-900 border border-slate-200 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase text-xs tracking-widest"
            >
              Our Vision
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="py-12 px-10 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-8">
            What Our Partners Say
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-100 shadow-lg"
          >
            <p className="text-xl md:text-2xl italic text-slate-700 leading-relaxed mb-6">
              "StudentsxCEOs Jakarta has been instrumental in bridging the gap between academia and industry. The caliber of students and the impact of their programs continue to exceed our expectations."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Award className="text-blue-600" size={24} />
              </div>
              <div className="text-left">
                <p className="font-black text-slate-900">Partner CEO</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Leading Corporation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BACK TO HOME CTA */}
      <section className="py-8 px-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </section>
    </div>
  );
}