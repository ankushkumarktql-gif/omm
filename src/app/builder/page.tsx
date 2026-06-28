'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useResumeStore } from '@/store/useResumeStore';
import { auth } from '@/lib/firebase';
import { ResumeFormEditor } from '@/components/builder/ResumeFormEditor';
import { ResumePreviewPane } from '@/components/builder/ResumePreviewPane';
import { 
  FileText, ArrowLeft, CloudLightning, CloudCheck, Eye, Edit2, 
  Sparkles, Laptop, Smartphone, HelpCircle 
} from 'lucide-react';

export default function BuilderPage() {
  const router = useRouter();
  
  // Zustand State hooks
  const loadResumes = useResumeStore(state => state.loadResumes);
  const activeResumeId = useResumeStore(state => state.activeResumeId);
  const resumes = useResumeStore(state => state.resumes);

  const activeResume = resumes.find(r => r.id === activeResumeId);

  // Local responsive view mode (for small devices): 'form' vs 'preview'
  const [mobileMode, setMobileMode] = useState<'form' | 'preview'>('form');
  const [savingState, setSavingState] = useState<'saved' | 'saving'>('saved');

  useEffect(() => {
    loadResumes();

    // Check auth session
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [loadResumes, router]);

  // Simulate an elegant Auto-save typing indicator whenever resume updates
  useEffect(() => {
    if (!activeResume) return;
    setSavingState('saving');
    
    const timeout = setTimeout(() => {
      setSavingState('saved');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [activeResume]);

  if (!activeResume) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center flex-col gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500" />
        <span>Loading workspace drafts...</span>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* Top Builder Navbar */}
      <header className="h-14 bg-slate-950 border-b border-slate-900 px-6 flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard"
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition"
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
          
          <div className="h-4 w-px bg-slate-900 hidden sm:block" />
          
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold text-white max-w-[150px] truncate">{activeResume.title}</span>
            {savingState === 'saved' ? (
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CloudCheck size={10} /> Saved
              </span>
            ) : (
              <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CloudLightning size={10} className="animate-pulse" /> Auto-saving...
              </span>
            )}
          </div>
        </div>

        {/* Logo */}
        <Link href="/" className="font-bold text-sm text-white flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center">
            <FileText size={12} className="text-white" />
          </div>
          <span className="hidden sm:inline">ResumeOMM <span className="text-indigo-400">AI</span></span>
        </Link>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Desktop Two-Column Layout */}
        <div id="builder-workspace-container" className="hidden md:grid grid-cols-12 w-full h-full p-4 gap-4">
          <div id="builder-left-pane" className="col-span-5 h-full overflow-hidden">
            <ResumeFormEditor />
          </div>
          <div id="builder-right-pane" className="col-span-7 h-full overflow-hidden">
            <ResumePreviewPane />
          </div>
        </div>

        {/* Mobile Layout Viewport (Switch Toggles) */}
        <div className="md:hidden flex flex-col w-full h-full relative overflow-hidden">
          <div className="flex-1 overflow-hidden p-3 pb-16">
            {mobileMode === 'form' ? <ResumeFormEditor /> : <ResumePreviewPane />}
          </div>

          {/* Mobile Sticky Tab Footer Switcher */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-slate-950 border-t border-slate-900 flex items-center justify-around px-6 z-25">
            <button
              onClick={() => setMobileMode('form')}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${
                mobileMode === 'form' ? 'text-indigo-400' : 'text-slate-500'
              }`}
            >
              <Edit2 size={16} />
              Edit details
            </button>

            <button
              onClick={() => setMobileMode('preview')}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${
                mobileMode === 'preview' ? 'text-indigo-400' : 'text-slate-500'
              }`}
            >
              <Eye size={16} />
              Live preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
