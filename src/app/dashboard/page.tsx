'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useResumeStore } from '@/store/useResumeStore';
import { auth, mockSignOut } from '@/lib/firebase';
import { 
  FileText, Plus, Search, Calendar, Trash2, Copy, Edit3, LogOut, Sparkles, 
  Settings, User, Bell, LayoutGrid, SlidersHorizontal, CheckSquare, Eye, Gauge, 
  Clock, ArrowUpDown, ChevronRight, X, AlertCircle 
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  
  // Zustand State hooks
  const resumes = useResumeStore(state => state.resumes);
  const loadResumes = useResumeStore(state => state.loadResumes);
  const activeResumeId = useResumeStore(state => state.activeResumeId);
  const setActiveResumeId = useResumeStore(state => state.setActiveResumeId);
  const addResume = useResumeStore(state => state.addResume);
  const duplicateResume = useResumeStore(state => state.duplicateResume);
  const renameResume = useResumeStore(state => state.renameResume);
  const deleteResume = useResumeStore(state => state.deleteResume);

  // Local state
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'updated' | 'title'>('updated');
  const [filterTemplate, setFilterTemplate] = useState('all');
  
  // Rename Modal state
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Settings Panel Tab/Modal state
  const [showSettings, setShowSettings] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Initialize store and user auth checks
  useEffect(() => {
    loadResumes();
    
    // Subscribe to auth state updates
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (!user) {
        // Redirect to login if unauthenticated
        router.push('/login');
      } else {
        setCurrentUser(user);
        setDisplayName(user.displayName || user.email?.split('@')[0] || 'User');
      }
    });

    return () => unsubscribe();
  }, [loadResumes, router]);

  const handleCreateResume = () => {
    const newId = addResume('My Resume Draft', 'modern-sidebar');
    setActiveResumeId(newId);
    router.push('/builder');
  };

  const handleEditResume = (id: string) => {
    setActiveResumeId(id);
    router.push('/builder');
  };

  const handleSignOut = async () => {
    await mockSignOut();
    router.push('/login');
  };

  const handleOpenRename = (id: string, currentTitle: string) => {
    setRenameId(id);
    setRenameValue(currentTitle);
  };

  const handleSaveRename = () => {
    if (renameId && renameValue.trim()) {
      renameResume(renameId, renameValue);
      setRenameId(null);
    }
  };

  // Filtered & Sorted resumes list compilation
  const processedResumes = resumes
    .filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(r => filterTemplate === 'all' || r.templateId === filterTemplate)
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  // Calculate some fun dashboard analytics
  const totalResumes = resumes.length;
  
  // Average completeness score calculation
  const calculateCompleteness = (r: any) => {
    let filled = 0;
    let total = 8; // Checklist sections count
    
    if (r.personalInfo.name) filled++;
    if (r.personalInfo.title) filled++;
    if (r.summary) filled++;
    if (r.experience?.length > 0) filled++;
    if (r.education?.length > 0) filled++;
    if (r.skills?.length > 0) filled++;
    if (r.projects?.length > 0) filled++;
    if (r.certifications?.length > 0) filled++;
    
    return Math.round((filled / total) * 100);
  };

  const averageCompleteness = totalResumes > 0 
    ? Math.round(resumes.reduce((acc, r) => acc + calculateCompleteness(r), 0) / totalResumes) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-900 bg-slate-950 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-white">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <span>ResumeOMM <span className="text-indigo-400">AI</span></span>
          </Link>

          <nav className="space-y-1">
            <button className="w-full text-left text-xs font-semibold px-4 py-2.5 rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/15 flex items-center gap-2">
              <LayoutGrid size={15} /> My Resumes
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className="w-full text-left text-xs font-semibold px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 flex items-center gap-2 transition"
            >
              <Settings size={15} /> Settings
            </button>
          </nav>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 border-t border-slate-900 pt-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs uppercase text-indigo-400 border border-slate-700">
              {displayName.charAt(0)}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">{displayName}</div>
              <div className="text-[10px] text-slate-500 truncate">{currentUser?.email}</div>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full text-left text-xs font-bold text-red-400 hover:text-red-300 px-4 py-2 bg-slate-900 border border-slate-850 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-8">
        
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center border-b border-slate-900 pb-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-white">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
              <FileText size={14} />
            </div>
            <span>ResumeOMM <span className="text-indigo-400">AI</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSettings(true)} 
              className="p-1.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-450 hover:text-white"
            >
              <Settings size={15} />
            </button>
            <button 
              onClick={handleSignOut} 
              className="p-1.5 bg-slate-900 rounded-lg border border-slate-800 text-red-400"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* Dashboard Greeting Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              Hello, {displayName} <Sparkles size={20} className="text-indigo-400" />
            </h1>
            <p className="text-xs text-slate-450 mt-1">Manage, optimize, and build ATS-friendly resumes.</p>
          </div>
          <button
            onClick={handleCreateResume}
            className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/20"
          >
            <Plus size={15} /> Create Resume
          </button>
        </div>

        {/* Overview Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
              <FileText size={18} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Total Documents</div>
              <div className="text-xl font-bold text-white mt-0.5">{totalResumes}</div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CheckSquare size={18} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Average Progress</div>
              <div className="text-xl font-bold text-white mt-0.5">{averageCompleteness}%</div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/10 flex items-center justify-center text-teal-400">
              <Gauge size={18} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Mock Exports</div>
              <div className="text-xl font-bold text-white mt-0.5">{totalResumes * 2}</div>
            </div>
          </div>
        </div>

        {/* Toolbar: Search, Sort, Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 border border-slate-900 rounded-xl">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input 
              type="text" 
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg pl-9 pr-4 py-2 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Filter */}
            <select
              value={filterTemplate}
              onChange={(e) => setFilterTemplate(e.target.value)}
              className="flex-1 sm:flex-none text-xs bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-2 outline-none cursor-pointer"
            >
              <option value="all">All Templates</option>
              <option value="modern-sidebar">Modern Sidebar</option>
              <option value="minimal-professional">Minimal Pro</option>
              <option value="executive-corporate">Executive</option>
            </select>

            {/* Sort */}
            <button
              onClick={() => setSortBy(sortBy === 'updated' ? 'title' : 'updated')}
              className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg hover:text-white transition"
            >
              <ArrowUpDown size={12} />
              Sort: {sortBy === 'updated' ? 'Modified' : 'Title'}
            </button>
          </div>
        </div>

        {/* Resume grid */}
        {processedResumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedResumes.map(resume => {
              const completeness = calculateCompleteness(resume);
              return (
                <div 
                  key={resume.id} 
                  className="bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group transition hover:-translate-y-0.5 duration-200"
                >
                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-bold text-white text-sm group-hover:text-indigo-400 transition truncate max-w-[170px]">{resume.title}</h3>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(resume.updatedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/10">
                        {resume.templateId.replace('-', ' ')}
                      </span>
                    </div>

                    {/* Progress Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Checklist completeness</span>
                        <span>{completeness}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${completeness}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="px-5 py-3.5 bg-slate-950/40 border-t border-slate-850/80 flex items-center justify-between text-xs">
                    <button 
                      onClick={() => handleEditResume(resume.id)}
                      className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                    >
                      <Edit3 size={13} /> Edit Draft
                    </button>
                    
                    <div className="flex items-center gap-3 text-slate-500">
                      <button 
                        onClick={() => handleOpenRename(resume.id, resume.title)}
                        className="hover:text-white p-1 rounded" 
                        title="Rename"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button 
                        onClick={() => duplicateResume(resume.id)}
                        className="hover:text-white p-1 rounded" 
                        title="Duplicate"
                      >
                        <Copy size={13} />
                      </button>
                      <button 
                        onClick={() => deleteResume(resume.id)}
                        className="hover:text-red-400 p-1 rounded" 
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-slate-850 p-12 text-center rounded-2xl flex flex-col items-center justify-center">
            <FileText size={40} className="text-slate-700 mb-3" />
            <h3 className="font-bold text-white text-sm">No resumes found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">Create a new resume document to get started.</p>
          </div>
        )}

        {/* Footer Credit */}
        <footer className="py-6 mt-12 border-t border-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 max-w-7xl mx-auto px-6 w-full flex-shrink-0">
          <div>© {new Date().getFullYear()} ResumeOMM AI. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            <span>Designed & Developed by</span>
            <span className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors cursor-default">
              Ankush Raja
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-indigo-500/80 font-medium">Ankush kumar</span>
          </div>
        </footer>
      </main>

      {/* RENAME MODAL */}
      {renameId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-xs space-y-4">
            <h3 className="font-bold text-white text-sm">Rename Resume</h3>
            <input 
              type="text" 
              value={renameValue} 
              onChange={(e) => setRenameValue(e.target.value)}
              className="w-full text-xs bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 outline-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setRenameId(null)} className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg">Cancel</button>
              <button onClick={handleSaveRename} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS PANEL MODAL */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
              <h3 className="font-bold text-white text-base">Account Settings</h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6 text-left">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">User Profile Display Name</label>
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none transition"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-800 pb-1">Preferences</label>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-white">App Dark Mode Theme</div>
                    <div className="text-[10px] text-slate-500">Enable deep obsidian visual aesthetics</div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={darkMode} 
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-white">Draft Sync Toast Alerts</div>
                    <div className="text-[10px] text-slate-500">Receive notifications on file syncs</div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications} 
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-950/40 border-t border-slate-800 flex justify-end gap-3">
              <button 
                onClick={() => setShowSettings(false)} 
                className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition shadow-lg shadow-indigo-600/10"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
