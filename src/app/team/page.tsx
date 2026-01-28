'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TeamMember {
  name: string;
  role: string;
  department: 'leadership' | 'events' | 'marketing' | 'partnerships' | 'operations' | 'finance';
  image?: string;
  bio: string;
  linkedin?: string;
  email?: string;
  instagram?: string;
}

interface Department {
  id: 'all' | 'leadership' | 'events' | 'marketing' | 'partnerships' | 'operations' | 'finance';
  label: string;
}

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'leadership' | 'events' | 'marketing' | 'partnerships' | 'operations' | 'finance'>('all');

  // Team data structure - UPDATE THIS WITH REAL DATA
  const teamMembers: TeamMember[] = [
    {
      name: "Title",
      role: "President / CEO",
      department: "leadership",
      bio: "Leading Batch 14 with vision and dedication to empower future business leaders.",
      linkedin: "#",
      email: "info@sxcjakarta.org"
    },
    {
      name: "Title",
      role: "Vice President",
      department: "leadership",
      bio: "Supporting strategic initiatives and organizational operations.",
      linkedin: "#",
      email: "info@sxcjakarta.org"
    },
    {
      name: "Title",
      role: "Project Manager",
      department: "events",
      bio: "Leading cross-functional teams and coordinating project execution.",
      linkedin: "#",
      email: "info@sxcjakarta.org"
    },
    {
      name: "Title",
      role: "Head of Marketing",
      department: "marketing",
      bio: "Amplifying SxC Jakarta's voice through strategic campaigns.",
      linkedin: "#",
      email: "info@sxcjakarta.org"
    },
    {
      name: "Title",
      role: "Partnerships Lead",
      department: "partnerships",
      bio: "Building bridges with industry leaders and corporate partners.",
      linkedin: "#",
      email: "info@sxcjakarta.org"
    },
    {
      name: "Title",
      role: "Finance Officer",
      department: "finance",
      bio: "Ensuring sustainable growth and financial transparency.",
      linkedin: "#",
      email: "info@sxcjakarta.org"
    },
  ];

  const departments: Department[] = [
    { id: 'all', label: 'All Team' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'events', label: 'Events' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'partnerships', label: 'Partnerships' },
    { id: 'operations', label: 'Operations' },
    { id: 'finance', label: 'Finance' }
  ];

  const filteredMembers = activeFilter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === activeFilter);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
            Batch 14 • Jakarta Chapter
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Meet The <span className="text-blue-500">Team</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Passionate individuals united by a shared vision to bridge students and CEOs, 
            creating opportunities for learning, growth, and impact across Jakarta.
          </p>
        </div>
      </section>

      {/* Department Filter */}
      <section className="py-12 px-6 border-b border-slate-100 sticky top-20 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveFilter(dept.id)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                  activeFilter === dept.id
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Profile Image */}
                <div className="relative h-72 bg-gradient-to-br from-blue-100 to-slate-100 overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-blue-200">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-semibold mt-1">
                    {member.role}
                  </p>
                  
                  {/* Contact Icons */}
                  <div className="mt-4 flex gap-3">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                        aria-label="Email"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                        aria-label="Instagram"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Want to Join <span className="text-blue-500">Our Team?</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            We're always looking for passionate individuals to join our mission. 
            Applications for Batch 15 will open soon.
          </p>
          <Link 
            href="/events"
            className="inline-block mt-8 px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
          >
            Stay Updated
          </Link>
        </div>
      </section>
    </div>
  );
}