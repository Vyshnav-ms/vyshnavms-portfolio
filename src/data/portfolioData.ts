import type { IconType } from 'react-icons'
import {
  SiClaude,
  SiCss,
  SiDjango,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGodaddy,
  SiGoogle,
  SiGooglegemini,
  SiHostinger,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiOpenai,
  SiPhp,
  SiPython,
  SiReact,
  SiTypescript,
  SiVercel,
  SiWordpress,
} from 'react-icons/si'
import { TbCode } from 'react-icons/tb'

export type Skill = {
  name: string
  group: string
  level: number
  icon?: IconType
  logoText?: string
  accent: string
}

export const skills: Skill[] = [
  { name: 'Python', group: 'Languages', level: 88, icon: SiPython, accent: '#3776AB' },
  { name: 'JavaScript', group: 'Languages', level: 92, icon: SiJavascript, accent: '#F7DF1E' },
  { name: 'TypeScript', group: 'Languages', level: 90, icon: SiTypescript, accent: '#3178C6' },
  { name: 'PHP', group: 'Languages', level: 78, icon: SiPhp, accent: '#777BB4' },
  { name: 'HTML5', group: 'Languages', level: 96, icon: SiHtml5, accent: '#E34F26' },
  { name: 'CSS3', group: 'Languages', level: 94, icon: SiCss, accent: '#663399' },
  { name: 'Django', group: 'Frameworks & Libraries', level: 82, icon: SiDjango, accent: '#092E20' },
  { name: 'React.js', group: 'Frameworks & Libraries', level: 94, icon: SiReact, accent: '#61DAFB' },
  { name: 'Flutter', group: 'Frameworks & Libraries', level: 76, icon: SiFlutter, accent: '#02569B' },
  { name: 'WordPress', group: 'Frameworks & Libraries', level: 86, icon: SiWordpress, accent: '#21759B' },
  { name: 'MySQL', group: 'Databases', level: 82, icon: SiMysql, accent: '#4479A1' },
  { name: 'Firebase', group: 'Databases', level: 80, icon: SiFirebase, accent: '#FFCA28' },
  { name: 'Git', group: 'Developer Tools', level: 88, icon: SiGit, accent: '#F05032' },
  { name: 'Vercel', group: 'Developer Tools', level: 86, icon: SiVercel, accent: '#FFFFFF' },
  { name: 'GoDaddy', group: 'Developer Tools', level: 74, icon: SiGodaddy, accent: '#1BDBDB' },
  { name: 'Hostinger', group: 'Developer Tools', level: 78, icon: SiHostinger, accent: '#673DE6' },
  { name: 'Claude Code', group: 'AI-Assisted Development', level: 86, icon: SiClaude, accent: '#D97757' },
  { name: 'Antigravity', group: 'AI-Assisted Development', level: 76, icon: SiGoogle, accent: '#4285F4' },
  { name: 'Cursor AI', group: 'AI-Assisted Development', level: 88, logoText: 'Cursor', accent: '#FFFFFF' },
  { name: 'Codex', group: 'AI-Assisted Development', level: 86, icon: SiOpenai, accent: '#10A37F' },
  { name: 'ChatGPT', group: 'AI-Assisted Development', level: 92, icon: SiOpenai, accent: '#10A37F' },
  { name: 'Gemini', group: 'AI-Assisted Development', level: 84, icon: SiGooglegemini, accent: '#8E75B2' },
]

export const skillGroups = [
  'Languages',
  'Frameworks & Libraries',
  'Databases',
  'Developer Tools',
  'AI-Assisted Development',
]

export const projects = [
  {
    title: 'HirePilot AI',
    role: 'Full-Stack AI SaaS Platform',
    summary: 'AI-powered interview preparation platform that generates personalized questions, checks ATS scores, and delivers career readiness insights using resume and job description analysis.',
    details:
      'Developed a full-stack AI-powered interview preparation platform generating personalized technical, HR, project-based, behavioral, and scenario-based questions via Groq LLMs. Implemented ATS score checking with resume-to-JD matching, missing skills detection, keyword analysis, and recommendation generation. Built secure authentication and user management with Supabase Auth including email verification. Designed a modern SaaS-style dashboard with protected routes, theme management, and interactive UI components. Integrated AI-powered workflows using Groq for role-specific interview preparation. Developed reusable frontend architecture using Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Groq AI', 'Framer Motion', 'shadcn/ui'],
    live: 'https://gethirepilot.vercel.app/',
    github: 'https://github.com/Vyshnav-ms/hirepilot-ai',
    color: 'from-indigo-400/30 via-purple-300/15 to-white/5',
  },
  {
    title: 'IncubateX',
    role: 'Flutter + Firebase App',
    summary: 'Role-driven business incubation tracker for student startup progress at LEAD College of Management.',
    details:
      'Built a dashboard system for students, mentors, directors, deputy directors, and admins with Firebase authentication, role verification, Firestore progress tracking, stage filtering, profile management, and chart-based incubation analytics.',
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'FL Chart'],
    live: '#',
    github: 'https://github.com/Vyshnav-ms/incubatex-business-incubation-tracker',
    color: 'from-emerald-300/30 via-cyan-300/10 to-white/5',
  },
  {
    title: 'Lumos Learning App',
    role: 'Accessible Frontend App',
    summary: 'Interactive alphabet learning app for CP students using animation, audio, and drawing practice.',
    details:
      'Designed a learning interface with alphabet writing animations, voice-over guidance, HTML5 audio examples, and a responsive drawing canvas that works with both touch and mouse input.',
    stack: ['React.js', 'TypeScript', 'HTML5 Canvas API', 'Tailwind CSS', 'Vercel'],
    live: 'https://lumos-learning-app.vercel.app',
    github: 'https://github.com/Vyshnav-ms/Lumos-learning-app',
    color: 'from-cyan-400/30 via-sky-300/10 to-white/5',
  },
  {
    title: 'MentalPal',
    role: 'Django Web Platform',
    summary: 'Mental health support platform connecting students with mentors through dashboards and messaging.',
    details:
      'Developed a Django application with student and mentor dashboards, mentor selection, reviews, admin access, chat workflows, templates, static assets, and database-backed user flows for mental health support.',
    stack: ['Python', 'Django', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    live: '#',
    github: 'https://github.com/Vyshnav-ms/Mental-pal',
    color: 'from-violet-400/30 via-fuchsia-300/10 to-white/5',
  },
  {
    title: 'SwiftKeys',
    role: 'Typing Test App',
    summary: 'Modern typing practice app with real-time WPM, accuracy, progress, and infinite text flow.',
    details:
      'Built a compact typing test experience with a fixed no-scroll interface, fully filled textarea, infinite paragraph replacement, real-time performance stats, duration controls, special-character mode, and responsive dark/light UI.',
    stack: ['React.js', 'Next.js', 'Tailwind CSS', 'Netlify'],
    live: 'https://shiftkeys.netlify.app/',
    github: 'https://github.com/Vyshnav-ms/Typing-test-app',
    color: 'from-amber-300/30 via-orange-300/10 to-white/5',
  },
]

export const experience = [
  {
    period: 'Sep 2025 - Mar 2026',
    title: 'Software Developer Intern',
    place: 'Moonhive Private Limited',
    notes: [
      'Managed and optimized production WordPress websites with strong uptime discipline.',
      'Built custom features, improved Core Web Vitals, and reduced recurring client-side issues.',
      'Worked with Git workflows, reviews, merge conflict handling, and deployment checks.',
    ],
  },
]

export const education = [
  {
    period: '2024 - 2026',
    title: 'Master of Computer Applications',
    place: 'LEAD College of Management, University of Calicut',
    notes: ['CGPA 9.0 / 10', 'Focused on scalable web systems and software engineering practice.'],
  },
  {
    period: '2019 - 2022',
    title: 'Bachelor of Computer Applications',
    place: 'Sree Narayana College of Technology',
    notes: ['CGPA 7.01 / 10', 'Built a strong base in programming, databases, and web development.'],
  },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Vyshnav-ms/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Email', href: 'mailto:vyshnams1@gmail.com' },
]

export const metrics = [
  ['Frontend-first', 'developer brand'],
  ['Full stack', 'delivery range'],
  ['AI-assisted', 'modern workflow'],
]

export const CodeMark = TbCode
