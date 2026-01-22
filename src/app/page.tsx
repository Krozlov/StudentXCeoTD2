import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          {/* Left Side: Title, caption, etc.*/}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
              Jakarta Chapter • Batch 14
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Learn. <span className="text-blue-500">Share.</span> <br />
              Impact!
            </h1>
            <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
              The premier platform bridging the gap between top-tier CEOs and the next generation of Indonesian leaders. 
              Join us in our mission to empower and inspire.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
            </div>
          </div>

          {/* Right Side: Logo */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-[400px] h-[400px] md:w-[550px] md:h-[550px] animate-float">
              <Image
                src="/sxclogo.png" 
                alt="StudentsxCEOs Jakarta Logo"
                fill
                className="object-contain drop-shadow-2xl"
                priority 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Meet The Team", path: "/team", desc: "The bright minds behind Batch 14." },
            { title: "Our Partners", path: "/partners", desc: "Leading organizations supporting our growth." },
            { title: "SXC AI Assistant", path: "/ai", desc: "Interact with our custom AI to learn everything about StudentXCEO Jakarta." }
          ].map((item) => (
            <Link key={item.title} href={item.path} className="group p-8 border border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-xl hover:shadow-blue-50 transition-all">
              <h3 className="text-xl font-bold group-hover:text-blue-600">{item.title}</h3>
              <p className="mt-2 text-slate-500">{item.desc}</p>
              <div className="mt-4 text-blue-500 font-bold flex items-center gap-2">
                Explore <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}