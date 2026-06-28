'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, FileText, CheckCircle2, ChevronRight, ArrowRight, ShieldCheck, 
  Settings2, Download, Zap, Star, HelpCircle, ArrowUpRight, Gauge, 
  Users, Check, Briefcase, GraduationCap, Award, Keyboard, ChevronDown, Layers
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: "Is this resume builder truly ATS-friendly?",
    a: "Yes! Every single one of our 10 templates is designed strictly according to ATS parse testing specifications, utilizing standard section layout tables, vector system-embedded fonts, and proper layout spacing structures to ensure 100% parser readability."
  },
  {
    q: "How does the AI Resume Assistant work?",
    a: "Our integrated AI assistant parses your target job title to automatically generate professional introductory summaries, optimize weaker descriptions with action verbs, and suggest keywords recruiters search for."
  },
  {
    q: "Can I download my resume directly as a PDF?",
    a: "Absolutely. You can download print-ready, high-resolution A4 vector PDFs matching standard paper sizing, or print directly using your browser print options."
  },
  {
    q: "Do you offer offline draft saving?",
    a: "Yes, drafts are autosaved to your local database browser storage in real-time, allowing you to edit offline without losing a single keystroke. Once connected, drafts automatically synchronize to your cloud backup."
  }
];

const TESTIMONIALS = [
  {
    name: "Marcus Aurelius",
    role: "Senior Software Architect @ Google",
    comment: "This tool is amazing. I upgraded my resume to the Minimal Pro layout, optimized bullets using the AI Suggestions, and landed interviews at Google and Stripe within two weeks.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Selena Thorne",
    role: "Product Marketing Lead @ Vercel",
    comment: "The template switcher is magic. I can adjust my accent colors, swap layouts instantly based on the company aesthetic, and print to PDF without any layout breakage.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  }
];

const STATS_ITEMS = [
  {
    value: "150,000+",
    label: "Resumes Created",
    desc: "By professionals worldwide"
  },
  {
    value: "99.4%",
    label: "ATS Pass Rate",
    desc: "Exceeding parsing benchmarks"
  },
  {
    value: "3.2x",
    label: "Interview Invites",
    desc: "Increase in callback volume"
  }
];

const STEPS = [
  {
    num: "01",
    title: "Choose a Template",
    desc: "Select from 10 handcrafted, recruiter-approved templates optimized for standard layouts."
  },
  {
    num: "02",
    title: "AI Optimizations",
    desc: "Instantly rewrite weak experience descriptions using dynamic bullet points and business metrics."
  },
  {
    num: "03",
    title: "Analyze ATS Score",
    desc: "Run automated compliance check and suggestions to add missing industry keywords."
  },
  {
    num: "04",
    title: "Export & Download",
    desc: "Download high-definition 300 DPI A4 PDFs containing ATS-friendly metadata formats."
  }
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden relative selection:bg-indigo-600/30 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[1000px] right-1/4 w-[600px] h-[600px] bg-teal-600/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[800px] left-1/3 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Glass Header */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/70 backdrop-blur-md border-b border-slate-900/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200">
              <FileText size={18} className="text-white" />
            </div>
            <span className="tracking-tight">ResumeOMM <span className="text-indigo-400">AI</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
            <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a>
            <a href="#ats" className="hover:text-white transition-colors duration-200">ATS Checklist</a>
            <a href="#faq" className="hover:text-white transition-colors duration-200">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-indigo-600/25 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 max-w-7xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles size={11} className="animate-pulse" /> Next-Gen AI Resume Platform
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05] font-sans">
            Build a Professional <br/>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Resume in Minutes
            </span>
          </h1>
          
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Build Smarter. Get Hired Faster. Unleash professional, A4 layouts that pass recruiter parsing tests. Instantly suggest skills, evaluate ATS compliance scores, and download high-DPI PDFs.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto text-sm font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-8 py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
            >
              Build Resume For Free
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <a 
              href="#features" 
              className="w-full sm:w-auto text-sm font-semibold text-slate-300 hover:text-white px-7 py-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-850 transition duration-200"
            >
              See Features
            </a>
          </div>
        </motion.div>

        {/* Live Mockup Dashboard Screen */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 relative mx-auto max-w-5xl bg-slate-900/50 border border-slate-800 rounded-2xl p-2.5 shadow-2xl shadow-indigo-500/5 overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10 pointer-events-none" />
          
          {/* Top Bar Mock */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="bg-slate-900/60 rounded px-8 py-1 text-[10px] text-slate-500 border border-slate-850">
              workspace/builder
            </div>
            <div className="w-8" />
          </div>

          <div className="w-full aspect-[16/10] bg-slate-950 rounded-b-xl overflow-hidden relative flex text-left">
            {/* Mock Editor Column */}
            <div className="w-1/3 border-r border-slate-900 h-full p-4 flex flex-col gap-4 bg-slate-950/60 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-indigo-500/20 text-indigo-400 rounded flex items-center justify-center"><Briefcase size={10} /></div>
                <div className="h-3.5 w-24 bg-slate-850 rounded" />
              </div>
              <div className="space-y-3.5 flex-1">
                <div className="space-y-1">
                  <div className="h-2 w-16 bg-slate-800 rounded" />
                  <div className="h-8 bg-slate-900 rounded border border-slate-850" />
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-20 bg-slate-800 rounded" />
                  <div className="h-8 bg-slate-900 rounded border border-slate-850" />
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-12 bg-slate-800 rounded" />
                  <div className="h-16 bg-slate-900 rounded border border-slate-850" />
                </div>
              </div>
            </div>

            {/* Mock Live View Page */}
            <div className="flex-1 h-full bg-slate-900/20 p-6 flex justify-center items-start overflow-hidden relative">
              <div className="w-[280px] h-[380px] sm:w-[320px] sm:h-[430px] bg-white rounded shadow-2xl p-5 flex flex-col gap-3 relative scale-95 origin-top border border-slate-200">
                {/* Header details */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-32 bg-slate-800 rounded" />
                    <div className="h-2.5 w-24 bg-indigo-600 rounded" />
                    <div className="h-2 w-40 bg-slate-400/60 rounded" />
                  </div>
                  <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 flex-shrink-0" />
                </div>
                <div className="h-px bg-slate-200" />
                {/* Profile detail */}
                <div className="space-y-1.5">
                  <div className="h-2.5 w-12 bg-slate-800 rounded" />
                  <div className="h-2 w-full bg-slate-350 rounded" />
                  <div className="h-2 w-5/6 bg-slate-350 rounded" />
                </div>
                {/* Exp detail */}
                <div className="space-y-2 mt-1">
                  <div className="h-2.5 w-24 bg-slate-800 rounded" />
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <div className="h-2 w-20 bg-slate-700 rounded" />
                      <div className="h-2 w-12 bg-slate-400 rounded" />
                    </div>
                    <div className="h-2 w-11/12 bg-slate-350 rounded" />
                    <div className="h-2 w-4/5 bg-slate-350 rounded" />
                  </div>
                </div>
              </div>

              {/* Float badge ATS */}
              <div className="absolute right-4 top-4 bg-slate-900/90 border border-slate-800 px-3.5 py-2.5 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md animate-bounce duration-1000">
                <div className="w-9 h-9 rounded-full border-2 border-emerald-500 border-t-transparent flex items-center justify-center font-bold text-xs text-white">98%</div>
                <div>
                  <div className="text-[10px] font-bold text-white">ATS Check passed</div>
                  <div className="text-[9px] text-slate-500">Optimized description</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 border-y border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS_ITEMS.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1.5 md:border-r last:border-0 border-slate-900/60 p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight">{stat.value}</div>
              <div className="text-xs sm:text-sm font-bold text-white">{stat.label}</div>
              <div className="text-xs text-slate-550">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Full-Featured Core Engine</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Every capability designed to empower professional resume creation seamlessly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              title: "AI Optimization",
              desc: "Integrated text assistants write professional summaries, rewrite weaker experience bullet points, and auto-suggest skills."
            },
            {
              icon: Layers,
              title: "10 Elegant Layouts",
              desc: "Switch between 10 customized ATS-friendly templates instantly. Formatting adjusts dynamically without losing a single keystroke."
            },
            {
              icon: Gauge,
              title: "Real-time ATS Score",
              desc: "Receive instant grade compatibility analysis, missing keyword warnings, and detailed checks as you type."
            },
            {
              icon: Settings2,
              title: "Visual Design Controls",
              desc: "Pick accent colors, update A4 page margin spacing density, adjust typography, and position profile photos."
            },
            {
              icon: Download,
              title: "High-Resolution PDFs",
              desc: "Export pixel-perfect vector A4 documents that map print sizes cleanly with split-protection page breaks."
            },
            {
              icon: ShieldCheck,
              title: "Secure Cloud Sync",
              desc: "Safeguard documents with Firebase client integrations or enjoy instant offline draft persistence automatically."
            }
          ].map((f, i) => (
            <div key={i} className="bg-slate-900/40 hover:bg-slate-900/70 border border-slate-900 hover:border-slate-800/80 p-6 rounded-2xl flex flex-col gap-4 text-left transition duration-200 group hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                <f.icon size={20} />
              </div>
              <h3 className="font-bold text-white text-sm sm:text-base">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-950/40 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white">How It Works</h2>
            <p className="text-slate-400 text-xs sm:text-sm">Four simple steps to construct your next job-winning application document.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-left">
            {STEPS.map((step, idx) => (
              <div key={idx} className="relative space-y-3 bg-slate-900/20 border border-slate-900 p-5 rounded-2xl backdrop-blur-sm">
                <div className="text-[28px] font-black text-indigo-500/35">{step.num}</div>
                <h3 className="font-bold text-white text-sm sm:text-base">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Compatibility Checklist Section */}
      <section id="ats" className="py-20 border-t border-slate-900 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Optimized Specifically for <br/>
              <span className="text-indigo-400">Recruiter Parsing Tests</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Automated Applicant Tracking Systems (ATS) reject over 70% of resumes due to parsing errors. ResumeOMM AI layouts are created strictly according to formatting principles that bypass layout checkers.
            </p>
            <div className="space-y-3.5">
              {[
                "100% standard table layouts without complex graphic elements.",
                "System-standard typography (Inter, System, Times New Roman).",
                "Action verb descriptions optimized with business metric weights.",
                "Custom split margins that preserve pixel-perfect page breaks."
              ].map((text, idx) => (
                <div key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-2xl backdrop-blur-sm text-left space-y-6">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Zap size={15} className="text-amber-400" /> ATS Compatibility Checklist
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-350">Font embedded metadata support</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-semibold text-[10px]">Verified</span>
              </div>
              <div className="h-px bg-slate-900" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-350">Tabular parser validation</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-semibold text-[10px]">Verified</span>
              </div>
              <div className="h-px bg-slate-900" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-350">Multi-page layout slice protections</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-semibold text-[10px]">Verified</span>
              </div>
              <div className="h-px bg-slate-900" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-350">OKLCH color conversion compatibility</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-semibold text-[10px]">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-950/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-white">Endorsed by Professionals</h2>
            <p className="text-slate-400 text-xs sm:text-sm">Job seekers who leveraged ResumeOMM AI templates to secure competitive roles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {TESTIMONIALS.map((t, index) => (
              <div key={index} className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl relative flex flex-col gap-4 backdrop-blur-sm hover:border-slate-800/80 transition-colors">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">"{t.comment}"</p>
                <div className="flex items-center gap-3 mt-2 border-t border-slate-850/60 pt-4">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-800" />
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">{t.name}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="py-20 border-t border-slate-900 max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Got questions? We've compiled common inquiries below.</p>
        </div>

        <div className="space-y-4 text-left">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-slate-900/20 border border-slate-900 rounded-xl overflow-hidden transition-all duration-200">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between font-bold text-white text-xs sm:text-sm text-left hover:bg-slate-900/40 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown size={16} className={`text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-950/40 whitespace-pre-line">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Beautiful Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-16 text-center text-slate-500 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-left mb-12">
          {/* Logo column */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-white text-base">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                <FileText size={14} className="text-white" />
              </div>
              <span>ResumeOMM <span className="text-indigo-400">AI</span></span>
            </Link>
            <p className="text-xs text-slate-550 leading-relaxed">
              Create professional, recruiter-approved, A4 layout resumes in minutes with ResumeOMM AI.
            </p>
          </div>

          {/* Nav columns */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a href="#features" className="hover:text-white transition-colors">Core Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#ats" className="hover:text-white transition-colors">ATS Verification</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">About & Contact</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a href="#about" className="hover:text-white transition-colors">About Us</a>
              <a href="mailto:support@resumeomm.ai" className="hover:text-white transition-colors">Contact Support</a>
              <a href="#pricing" className="hover:text-white transition-colors">Plans & Pricing</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#gdpr" className="hover:text-white transition-colors">GDPR Compliance</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-slate-900/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="text-[10px] text-slate-600">
              Designed & Developed by <span className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">Ankush Raja</span> (<span className="text-indigo-500/80 font-medium">Ankush kumar</span>)
            </div>
          </div>
          
          <div className="text-xs text-slate-600">
            © {new Date().getFullYear()} ResumeOMM AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
