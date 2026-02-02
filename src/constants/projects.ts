export const CATEGORIES = ["All", "High School Students", "University Students", "Fresh Graduates", "Public", "Associates & Alumni"];

export interface Project {
  id: number;
  title: string;
  categories: string[];
  description: string;
  outcomes: string[];
  startDate: string;
  endDate: string;
  partnerRange?: string;
  link?: string;
  pic: string;
}

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "School of Ideas",
    categories: ["High School Students"],
    description: "Offline event for high school students to explore their potential through personality tests and grow into future leaders with engaging talk shows and workshops.", 
    outcomes: [
      "Discovery of personal leadership style through MBTI & Holland Code tests",
      "Direct networking with top-tier university students as mentors",
      "Foundational public speaking and critical thinking workshop"
    ],
    startDate: "2026-01-15",
    endDate: "2026-02-15",
    partnerRange: "Dec 2025 - Jan 2026",
    link: "https://www.instagram.com/p/DI0bR3GhJPm/?igsh=MXA5cXRscDNxdDVhbQ==",
    pic: ""
  },
  {
    id: 2,
    title: "SxCareer",
    categories: ["University Students", "Fresh Graduates"],
    description: "Career preparation webinar focused on 5 industries: Consulting, Banking, FMCG, Media, Technology, and Startups, featuring impactful goal-setting sessions.",
    outcomes: [
      "In-depth industry insights from professionals in 5 top sectors",
      "Step-by-step roadmap for securing internships in MNCs & Startups",
      "Goal-setting framework for short-term and long-term career paths"
    ],
    startDate: "2026-01-01",
    endDate: "2026-02-25",
    partnerRange: "Nov - Dec 2025",
    link: "https://www.instagram.com/studentsxceosjakarta",
    pic: ""
  },
  {
    id: 3,
    title: "SxCelerate",
    categories: ["University Students"],
    description: "A 2-month intensive bootcamp for outstanding students consisting of Forums, Mentoring, Company Visits, Case Competitions, and Client Projects.",
    outcomes: [
      "Intensive 8-week career bootcamp with 1-on-1 industry mentoring",
      "Hands-on experience solving real-world business cases for client projects",
      "Exclusive access to company visits and executive networking sessions"
    ],
    startDate: "2025-10-01",
    endDate: "2025-12-01",
    partnerRange: "Aug - Sept 2025",
    link: "https://www.instagram.com/studentsxceosjakarta",
    pic:""
  },
  {
    id: 4,
    title: "Meet the Series",
    categories: ["Public"],
    description: "Large-scale offline event featuring Meet The CEO, Meet The Expert, and Meet Yourself, focusing on professional skill training and business leadership perspectives.",
    outcomes: [
      "Direct Q&A sessions with prominent CEOs and industry experts",
      "Soft skills masterclass focusing on professional presence and leadership",
      "Holistic self-development sessions for long-term career fulfillment"
    ],
    startDate: "2026-05-01",
    endDate: "2026-06-01",
    partnerRange: "Feb - Apr 2026",
    link: "https://www.instagram.com/studentsxceosjakarta",
    pic:""
  },
  {
    id: 5,
    title: "SxConference",
    categories: ["Associates & Alumni"],
    description: "A dynamic program uniting SxC alumni, young professionals, and industry leaders for insightful talk shows to foster collaboration and growth.",
    outcomes: [
      "High-level networking forum for SxC alumni and young professionals",
      "Collaborative discussions on industry-wide impactful change and growth",
      "Insightful talk shows on navigating professional challenges in senior roles"
    ],
    startDate: "2025-06-01",
    endDate: "2025-07-01", 
    partnerRange: "May 2025",
    link: "https://www.instagram.com/studentsxceosjakarta",
    pic:""
  },
];