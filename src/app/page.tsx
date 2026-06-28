'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, FileText, CheckCircle2, ChevronRight, Play, ArrowRight, ShieldCheck, 
  Settings2, Download, Zap, Star, MessageSquareCode, Layers, HelpCircle, ArrowUpRight, Gauge 
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: "Is this resume builder truly ATS-friendly?",
    a: "Yes! Every single one of our 10 templates is designed strictly according to ATS parse testing specifications, utilizing standard section layout tables, vector system-embedded fonts, and proper layout spacing structures."
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

export default function LandingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden">
      {/* Top Floating Glass Header */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <FileText size={18} className="text-white" />
            </div>
            <span>Resu<span className="text-indigo-400">AI</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#templates" className="hover:text-white transition">Templates</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition shadow-lg shadow-indigo-600/25"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 max-w-7xl mx-auto px-6 text-center">
        {/* Glow BG effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-teal-600/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20 text-xs font-semibold">
            <Sparkles size={12} /> Next-Gen AI Resume Builder SaaS
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Build an ATS-Optimized <br/>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Resume in Seconds with AI
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Unleash professional dynamic A4 layouts that pass every automated recruiters parsing test. Suggest skills, grade score analytics, and crop profile photos client-side instantly.
          </p>

          <div className="flex justify-center items-center gap-4 pt-4">
            <Link 
              href="/signup" 
              className="text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/30 group"
            >
              Build Resume For Free
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
            </Link>
            <a 
              href="#features" 
              className="text-sm font-semibold text-slate-300 hover:text-white px-5 py-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-1.5 hover:bg-slate-850 transition"
            >
              See Features
            </a>
          </div>
        </motion.div>

        {/* Hero Product Screenshot Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 relative mx-auto max-w-5xl aspect-[16/10] bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-2xl shadow-indigo-500/5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden border border-slate-850 relative flex">
            {/* Mock Editor Panel */}
            <div className="w-1/3 border-r border-slate-900 h-full p-4 flex flex-col gap-3">
              <div className="h-6 w-24 bg-slate-900 rounded" />
              <div className="h-4 w-32 bg-slate-900 rounded" />
              <div className="flex-1 space-y-3 mt-4">
                <div className="h-10 bg-slate-900/60 rounded border border-slate-900/40" />
                <div className="h-10 bg-slate-900/60 rounded border border-slate-900/40" />
                <div className="h-24 bg-slate-900/60 rounded border border-slate-900/40" />
              </div>
            </div>
            {/* Mock Live View */}
            <div className="w-2/3 h-full bg-slate-900/10 p-6 flex items-center justify-center">
              <div className="w-[180px] h-[250px] bg-white rounded shadow-2xl flex flex-col p-4 gap-2">
                <div className="h-4 w-20 bg-slate-800 rounded" />
                <div className="h-2 w-10 bg-slate-400 rounded" />
                <div className="h-px bg-slate-200 my-1" />
                <div className="h-2 w-28 bg-slate-350 rounded" />
                <div className="h-2 w-24 bg-slate-350 rounded" />
                <div className="h-2 w-26 bg-slate-350 rounded" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-950/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-white">Full-Featured Core Engine</h2>
            <p className="text-slate-400 text-sm">Every capability designed to empower professional resume creation seamlessly.</p>
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
                desc: "Export pixel-perfect vector A4 documents that map print sizes cleanly, ready for direct email submissions."
              },
              {
                icon: ShieldCheck,
                title: "Secure Cloud Sync",
                desc: "Safeguard documents with Firebase client integrations or enjoy instant offline draft persistence automatically."
              }
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-900/50 border border-slate-900 hover:border-slate-800 p-6 rounded-2xl flex flex-col gap-3 group hover:-translate-y-0.5 transition duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition duration-200">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-white text-base mt-2">{f.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Template Previews */}
      <section id="templates" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-white">Choose from 10 Premium Layouts</h2>
          <p className="text-slate-400 text-sm">Perfect for software engineering, executive sales, corporate leadership, and academic CVs.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto mb-8">
          {[
            'Modern Sidebar', 'Minimal Pro', 'Executive', 'Creative Teal', 'Bold Accent', 
            'Academic CV', 'Tech / Startup', 'Elegant Serif', 'Classic Split', 'Clean Timeline'
          ].map((t, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-850 p-3 rounded-xl text-center text-xs font-semibold text-slate-300 hover:border-indigo-500 hover:text-white transition cursor-pointer">
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-950/20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-white font-sans">Endorsed by Professionals</h2>
            <p className="text-slate-400 text-sm">Job seekers who leveraged ResuAI templates to secure competitive roles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, index) => (
              <div key={index} className="bg-slate-900/40 border border-slate-900 p-6 rounded-2xl relative flex flex-col gap-4">
                <div className="flex gap-1.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">"{t.comment}"</p>
                <div className="flex items-center gap-3 mt-2 border-t border-slate-850 pt-4">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 border-t border-slate-900 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-white">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-sm">Cancel or change plans at any time. Create unlimited resumes.</p>
          
          {/* Monthly / Yearly Toggle */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className={`text-xs font-semibold ${!isYearly ? 'text-white' : 'text-slate-500'}`}>Monthly Billing</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-slate-800 p-1 flex items-center relative transition"
            >
              <div className={`w-4 h-4 rounded-full bg-indigo-500 transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${isYearly ? 'text-white' : 'text-slate-500'}`}>
              Yearly Billing 
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] px-1.5 py-0.5 rounded-full font-bold">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Standard</span>
              <h3 className="text-lg font-bold text-white">Free Starter</h3>
              <div className="mt-4 flex items-baseline gap-1 text-white">
                <span className="text-3xl font-black">$0</span>
                <span className="text-xs text-slate-500">/ forever</span>
              </div>
              <ul className="mt-6 space-y-3.5 text-xs text-slate-400 border-t border-slate-850 pt-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> 1 Active Resume Draft
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> Choice of 3 standard templates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> Basic PDF Print download
                </li>
              </ul>
            </div>
            <Link href="/signup" className="mt-8 text-center text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-850 py-2.5 rounded-lg transition">
              Get Started
            </Link>
          </div>

          {/* Pro Tier (Popular) */}
          <div className="bg-slate-900 border-2 border-indigo-500 p-6 rounded-2xl relative flex flex-col justify-between shadow-xl shadow-indigo-600/5">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider shadow">Most Popular</span>
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Growth</span>
              <h3 className="text-lg font-bold text-white">Premium Pro</h3>
              <div className="mt-4 flex items-baseline gap-1 text-white">
                <span className="text-4xl font-black">${isYearly ? '12' : '15'}</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="mt-6 space-y-3.5 text-xs text-slate-300 border-t border-slate-850 pt-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> Unlimited Resume Drafts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> Access to all 10 Premium templates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> AI Resume Assistant generation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> Full ATS Compatibility Grader
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> Cloud Sync & Local Backups
                </li>
              </ul>
            </div>
            <Link href="/signup" className="mt-8 text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 py-2.5 rounded-lg transition shadow-lg shadow-indigo-600/20">
              Start 7-Day Free Trial
            </Link>
          </div>

          {/* Enterprise Custom */}
          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Scale</span>
              <h3 className="text-lg font-bold text-white">Team Enterprise</h3>
              <div className="mt-4 flex items-baseline gap-1 text-white">
                <span className="text-3xl font-black">$29</span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <ul className="mt-6 space-y-3.5 text-xs text-slate-400 border-t border-slate-850 pt-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> Custom branding domains
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> Multi-user seat sharing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400" /> Premium API access integrations
                </li>
              </ul>
            </div>
            <Link href="/signup" className="mt-8 text-center text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-850 py-2.5 rounded-lg transition">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="py-20 bg-slate-950/40 border-t border-slate-900 max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Have queries about templates, ATS optimization, or PDFs? Find answers here.</p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, index) => (
            <div key={index} className="bg-slate-900/60 border border-slate-900 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-slate-900 transition"
              >
                <span className="font-semibold text-xs sm:text-sm text-white">{faq.q}</span>
                <ChevronRight size={16} className={`text-slate-400 transition-transform ${openFaq === index ? 'rotate-90' : 'rotate-0'}`} />
              </button>
              
              {openFaq === index && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-450 leading-relaxed border-t border-slate-950 pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-12 text-center text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-white text-base">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                <FileText size={14} className="text-white" />
              </div>
              <span>Resu<span className="text-indigo-400">AI</span></span>
            </Link>
            <div className="text-[10px] text-slate-600 mt-1">
              Designed & Developed by <span className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">Ankush Raja</span> (<span className="text-indigo-500/80 font-medium">Ankush kumar</span>)
            </div>
          </div>
          
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} ResuAI SaaS Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
