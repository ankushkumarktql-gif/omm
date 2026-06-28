import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { ImageCropper } from '@/components/ui/ImageCropper';
import { generateSummary, improveExperienceBullet, suggestSkills } from '@/lib/ai';
import { 
  User, Briefcase, GraduationCap, Code, FolderGit2, FileBadge, Trophy, Languages, 
  UserCheck, HeartHandshake, Award, FileText, Settings2, Plus, Trash2, ArrowUp, ArrowDown, 
  Eye, EyeOff, Sparkles, ChevronDown, ChevronUp, Link as LinkIcon, RotateCcw
} from 'lucide-react';

export const ResumeFormEditor: React.FC = () => {
  const activeResumeId = useResumeStore(state => state.activeResumeId);
  const resumes = useResumeStore(state => state.resumes);
  const updateActiveResume = useResumeStore(state => state.updateActiveResume);
  const undo = useResumeStore(state => state.undo);
  const redo = useResumeStore(state => state.redo);
  const canUndo = useResumeStore(state => state.canUndo());
  const canRedo = useResumeStore(state => state.canRedo());

  const activeResume = resumes.find(r => r.id === activeResumeId);

  // States
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [showCropper, setShowCropper] = useState(false);
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});

  if (!activeResume) {
    return (
      <div className="p-8 text-center text-slate-400">
        No active resume. Select or create one from the dashboard.
      </div>
    );
  }

  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    awards,
    languages,
    interests,
    references,
    volunteer,
    achievements,
    publications,
    customSections,
    accentColor,
    fontFamily,
    spacing,
    showPhoto
  } = activeResume;

  // Personal Info handlers
  const handlePersonalInfoChange = (field: string, value: any) => {
    updateActiveResume(draft => {
      draft.personalInfo = {
        ...draft.personalInfo,
        [field]: value
      };
    });
  };

  // Generic List item swap helper (Reorder)
  const moveItem = (section: keyof typeof activeResume, index: number, direction: 'up' | 'down') => {
    updateActiveResume(draft => {
      const list = draft[section] as any[];
      if (!list) return;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return;
      
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
    });
  };

  // Experience handlers
  const addExperience = () => {
    updateActiveResume(draft => {
      draft.experience.push({
        id: 'exp-' + Math.random().toString(36).substr(2, 9),
        company: '',
        role: '',
        dates: '',
        location: '',
        description: '',
        isCollapsed: false
      });
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    updateActiveResume(draft => {
      const item = draft.experience.find(e => e.id === id);
      if (item) (item as any)[field] = value;
    });
  };

  const deleteExperience = (id: string) => {
    updateActiveResume(draft => {
      draft.experience = draft.experience.filter(e => e.id !== id);
    });
  };

  const duplicateExperience = (id: string) => {
    updateActiveResume(draft => {
      const target = draft.experience.find(e => e.id === id);
      if (target) {
        draft.experience.push({
          ...target,
          id: 'exp-' + Math.random().toString(36).substr(2, 9)
        });
      }
    });
  };

  // Education handlers
  const addEducation = () => {
    updateActiveResume(draft => {
      draft.education.push({
        id: 'edu-' + Math.random().toString(36).substr(2, 9),
        school: '',
        degree: '',
        dates: '',
        location: '',
        description: '',
        isCollapsed: false
      });
    });
  };

  const updateEducation = (id: string, field: string, value: any) => {
    updateActiveResume(draft => {
      const item = draft.education.find(e => e.id === id);
      if (item) (item as any)[field] = value;
    });
  };

  const deleteEducation = (id: string) => {
    updateActiveResume(draft => {
      draft.education = draft.education.filter(e => e.id !== id);
    });
  };

  // Skills handlers
  const addSkill = () => {
    updateActiveResume(draft => {
      draft.skills.push({
        id: 'sk-' + Math.random().toString(36).substr(2, 9),
        name: '',
        category: 'General',
        rating: 4
      });
    });
  };

  const updateSkill = (id: string, field: string, value: any) => {
    updateActiveResume(draft => {
      const item = draft.skills.find(s => s.id === id);
      if (item) (item as any)[field] = value;
    });
  };

  const deleteSkill = (id: string) => {
    updateActiveResume(draft => {
      draft.skills = draft.skills.filter(s => s.id !== id);
    });
  };

  // Projects handlers
  const addProject = () => {
    updateActiveResume(draft => {
      draft.projects.push({
        id: 'proj-' + Math.random().toString(36).substr(2, 9),
        name: '',
        role: '',
        dates: '',
        description: '',
        link: '',
        isCollapsed: false
      });
    });
  };

  const updateProject = (id: string, field: string, value: any) => {
    updateActiveResume(draft => {
      const item = draft.projects.find(p => p.id === id);
      if (item) (item as any)[field] = value;
    });
  };

  const deleteProject = (id: string) => {
    updateActiveResume(draft => {
      draft.projects = draft.projects.filter(p => p.id !== id);
    });
  };

  // Certifications handlers
  const addCert = () => {
    updateActiveResume(draft => {
      draft.certifications.push({
        id: 'cert-' + Math.random().toString(36).substr(2, 9),
        name: '',
        issuer: '',
        date: '',
        description: '',
        isCollapsed: false
      });
    });
  };

  const updateCert = (id: string, field: string, value: any) => {
    updateActiveResume(draft => {
      const item = draft.certifications.find(c => c.id === id);
      if (item) (item as any)[field] = value;
    });
  };

  const deleteCert = (id: string) => {
    updateActiveResume(draft => {
      draft.certifications = draft.certifications.filter(c => c.id !== id);
    });
  };

  // Languages Handlers
  const addLanguage = () => {
    updateActiveResume(draft => {
      draft.languages.push({
        id: 'lang-' + Math.random().toString(36).substr(2, 9),
        name: '',
        proficiency: 'Professional'
      });
    });
  };

  // Custom sections handlers
  const addCustomSection = () => {
    updateActiveResume(draft => {
      draft.customSections.push({
        id: 'custom-' + Math.random().toString(36).substr(2, 9),
        title: 'New Section',
        items: [
          {
            id: 'item-' + Math.random().toString(36).substr(2, 9),
            title: '',
            subtitle: '',
            date: '',
            description: ''
          }
        ],
        isCollapsed: false
      });
    });
  };

  const updateCustomSectionTitle = (id: string, newTitle: string) => {
    updateActiveResume(draft => {
      const sec = draft.customSections.find(s => s.id === id);
      if (sec) sec.title = newTitle;
    });
  };

  const addCustomItem = (sectionId: string) => {
    updateActiveResume(draft => {
      const sec = draft.customSections.find(s => s.id === sectionId);
      if (sec) {
        sec.items.push({
          id: 'item-' + Math.random().toString(36).substr(2, 9),
          title: '',
          subtitle: '',
          date: '',
          description: ''
        });
      }
    });
  };

  const updateCustomItem = (sectionId: string, itemId: string, field: string, value: string) => {
    updateActiveResume(draft => {
      const sec = draft.customSections.find(s => s.id === sectionId);
      if (sec) {
        const item = sec.items.find(i => i.id === itemId);
        if (item) (item as any)[field] = value;
      }
    });
  };

  const deleteCustomSection = (id: string) => {
    updateActiveResume(draft => {
      draft.customSections = draft.customSections.filter(s => s.id !== id);
    });
  };

  // AI Summary generator trigger
  const handleAiSummaryGenerate = async () => {
    setAiLoading(prev => ({ ...prev, summary: true }));
    try {
      const generated = await generateSummary(personalInfo.title || "Software Developer");
      updateActiveResume(draft => {
        draft.summary = generated;
      });
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(prev => ({ ...prev, summary: false }));
    }
  };

  // AI Bullet optimization trigger
  const handleAiOptimizeBullet = async (expId: string, bulletText: string) => {
    setAiLoading(prev => ({ ...prev, [expId]: true }));
    try {
      const optimized = await improveExperienceBullet(bulletText);
      updateExperience(expId, 'description', optimized);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(prev => ({ ...prev, [expId]: false }));
    }
  };

  // AI Skills suggestion trigger
  const handleAiSuggestSkills = () => {
    const suggestions = suggestSkills(personalInfo.title || "Developer");
    updateActiveResume(draft => {
      suggestions.forEach(skName => {
        if (!draft.skills.some(s => s.name.toLowerCase() === skName.toLowerCase())) {
          draft.skills.push({
            id: 'sk-' + Math.random().toString(36).substr(2, 9),
            name: skName,
            category: 'Technical',
            rating: 4
          });
        }
      });
    });
  };

  return (
    <div className="flex flex-col gap-6 h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Undo/Redo & Quick settings */}
      <div className="flex justify-between items-center px-6 py-4 bg-slate-950 border-b border-slate-800">
        <span className="text-sm font-semibold text-white flex items-center gap-2">
          <Settings2 size={16} className="text-indigo-400" /> Form Workspace
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={undo} 
            disabled={!canUndo}
            className="p-1.5 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-850 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
            title="Undo"
          >
            <RotateCcw size={14} className="rotate-45" />
          </button>
          <button 
            onClick={redo} 
            disabled={!canRedo}
            className="p-1.5 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-850 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
            title="Redo"
          >
            <RotateCcw size={14} className="-scale-x-100 rotate-45" />
          </button>
        </div>
      </div>

      {/* Editor Tabs Navigation */}
      <div className="flex overflow-x-auto gap-1 border-b border-slate-800 px-4 bg-slate-950/40 py-2 scrollbar-none">
        {[
          { id: 'personal', label: 'Info', icon: User },
          { id: 'experience', label: 'Experience', icon: Briefcase },
          { id: 'education', label: 'Education', icon: GraduationCap },
          { id: 'skills', label: 'Skills', icon: Code },
          { id: 'projects', label: 'Projects', icon: FolderGit2 },
          { id: 'certifications', label: 'Certifications', icon: FileBadge },
          { id: 'additional', label: 'Custom', icon: Plus }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition ${
                activeSection === tab.id 
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' 
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Section View Switcher */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
        
        {/* PERSONAL INFO */}
        {activeSection === 'personal' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-250">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Personal Information</h3>
            
            {/* Photo Row */}
            <div className="flex items-center gap-4 bg-slate-950/40 p-4 border border-slate-800 rounded-xl">
              <div 
                className="w-16 h-16 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center overflow-hidden cursor-pointer hover:border-indigo-400 transition"
                onClick={() => setShowCropper(true)}
              >
                {personalInfo.photo ? (
                  <img src={personalInfo.photo} alt="Crop preview" className="w-full h-full object-cover" />
                ) : (
                  <User size={28} className="text-slate-500" />
                )}
              </div>
              <div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowCropper(true)} 
                    className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition"
                  >
                    {personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  {personalInfo.photo && (
                    <button 
                      onClick={() => handlePersonalInfoChange('photo', '')} 
                      className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-red-400 px-3 py-1.5 rounded-lg border border-slate-700 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <label className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    <input 
                      type="checkbox" 
                      checked={showPhoto} 
                      onChange={(e) => updateActiveResume(draft => { draft.showPhoto = e.target.checked })}
                      className="accent-indigo-500 rounded" 
                    />
                    Visible on resume
                  </label>
                </div>
              </div>
            </div>

            {/* General details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={personalInfo.name} 
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  className="w-full text-sm bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none transition" 
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Professional Title</label>
                <input 
                  type="text" 
                  value={personalInfo.title} 
                  onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                  className="w-full text-sm bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none transition" 
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={personalInfo.email} 
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full text-sm bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none transition" 
                  placeholder="john.doe@email.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number</label>
                <input 
                  type="text" 
                  value={personalInfo.phone} 
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full text-sm bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none transition" 
                  placeholder="+1 (555) 012-3456"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Location (City, State)</label>
                <input 
                  type="text" 
                  value={personalInfo.location} 
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  className="w-full text-sm bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none transition" 
                  placeholder="New York, NY"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Portfolio Link</label>
                <input 
                  type="text" 
                  value={personalInfo.website} 
                  onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                  className="w-full text-sm bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none transition" 
                  placeholder="https://myportfolio.com"
                />
              </div>
            </div>

            {/* Profile Summary with AI assistance */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-slate-300">Professional Summary</label>
                <button
                  onClick={handleAiSummaryGenerate}
                  disabled={aiLoading.summary}
                  className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-1 rounded-md border border-indigo-500/20 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Sparkles size={11} className={aiLoading.summary ? 'animate-spin' : ''} />
                  {aiLoading.summary ? 'AI Writing...' : 'Generate with AI'}
                </button>
              </div>
              <textarea 
                rows={4}
                value={summary}
                onChange={(e) => updateActiveResume(draft => { draft.summary = e.target.value })}
                className="w-full text-sm bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none transition resize-none leading-relaxed" 
                placeholder="Brief professional intro statement..."
              />
            </div>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {activeSection === 'experience' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-250">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Work History</h3>
              <button 
                onClick={addExperience} 
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
              >
                <Plus size={14} /> Add Role
              </button>
            </div>

            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={exp.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-slate-950 border-b border-slate-850">
                    <span className="text-xs font-semibold text-white truncate max-w-[200px]">
                      {exp.role || 'New Position'} — {exp.company || 'New Company'}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => moveItem('experience', idx, 'up')} 
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 hover:bg-slate-850 rounded"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        onClick={() => moveItem('experience', idx, 'down')} 
                        disabled={idx === experience.length - 1}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 hover:bg-slate-850 rounded"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button 
                        onClick={() => duplicateExperience(exp.id)} 
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-850 rounded"
                        title="Duplicate Entry"
                      >
                        <Plus size={14} className="rotate-45" />
                      </button>
                      <button 
                        onClick={() => deleteExperience(exp.id)} 
                        className="p-1 text-red-400 hover:text-red-300 hover:bg-slate-850 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Company</label>
                      <input 
                        type="text" 
                        value={exp.company} 
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Job Title</label>
                      <input 
                        type="text" 
                        value={exp.role} 
                        onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                        className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Dates / Duration</label>
                      <input 
                        type="text" 
                        value={exp.dates} 
                        onChange={(e) => updateExperience(exp.id, 'dates', e.target.value)}
                        className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                        placeholder="e.g. Jan 2021 - Present"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Location</label>
                      <input 
                        type="text" 
                        value={exp.location} 
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-medium text-slate-400">Description & Accomplishments</label>
                        <button
                          onClick={() => handleAiOptimizeBullet(exp.id, exp.description)}
                          disabled={aiLoading[exp.id]}
                          className="text-[9px] font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/20 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <Sparkles size={10} className={aiLoading[exp.id] ? 'animate-spin' : ''} />
                          {aiLoading[exp.id] ? 'Refining...' : 'AI Bullet Optimize'}
                        </button>
                      </div>
                      <textarea 
                        rows={3}
                        value={exp.description} 
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none leading-relaxed resize-none"
                        placeholder="Add bullet points describing key metrics and roles..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {activeSection === 'education' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-250">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Education Details</h3>
              <button 
                onClick={addEducation} 
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
              >
                <Plus size={14} /> Add Degree
              </button>
            </div>

            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={edu.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-slate-950 border-b border-slate-850">
                    <span className="text-xs font-semibold text-white truncate max-w-[200px]">
                      {edu.degree || 'New Degree'} — {edu.school || 'New Institution'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => moveItem('education', idx, 'up')} 
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 hover:bg-slate-850 rounded"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        onClick={() => moveItem('education', idx, 'down')} 
                        disabled={idx === education.length - 1}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 hover:bg-slate-850 rounded"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button 
                        onClick={() => deleteEducation(edu.id)} 
                        className="p-1 text-red-400 hover:text-red-300 hover:bg-slate-850 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">School / University</label>
                      <input 
                        type="text" 
                        value={edu.school} 
                        onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                        className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Degree & Major</label>
                      <input 
                        type="text" 
                        value={edu.degree} 
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Date Period</label>
                      <input 
                        type="text" 
                        value={edu.dates} 
                        onChange={(e) => updateEducation(edu.id, 'dates', e.target.value)}
                        className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Location</label>
                      <input 
                        type="text" 
                        value={edu.location} 
                        onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                        className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {activeSection === 'skills' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-250">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Skills & Tags</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleAiSuggestSkills}
                  className="text-xs font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/20 flex items-center gap-1.5 transition"
                >
                  <Sparkles size={13} /> Suggest Skills
                </button>
                <button 
                  onClick={addSkill} 
                  className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                >
                  <Plus size={14} /> Add Skill
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex justify-between items-center gap-3">
                  <div className="flex-1 space-y-1">
                    <input 
                      type="text" 
                      value={skill.name} 
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      placeholder="e.g. Next.js"
                      className="bg-transparent text-xs font-semibold text-white outline-none w-full border-b border-transparent focus:border-indigo-500 pb-0.5"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-slate-400">Level:</span>
                      <input 
                        type="range" 
                        min={1} 
                        max={5} 
                        value={skill.rating} 
                        onChange={(e) => updateSkill(skill.id, 'rating', parseInt(e.target.value))}
                        className="w-20 h-1 accent-indigo-500 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[9px] font-bold text-indigo-300">{skill.rating}/5</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteSkill(skill.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeSection === 'projects' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-250">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Portfolio Projects</h3>
              <button 
                onClick={addProject} 
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
              >
                <Plus size={14} /> Add Project
              </button>
            </div>

            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-slate-950 border-b border-slate-850">
                    <span className="text-xs font-semibold text-white truncate max-w-[200px]">
                      {proj.name || 'New Project'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => moveItem('projects', idx, 'up')} 
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 hover:bg-slate-850 rounded"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        onClick={() => moveItem('projects', idx, 'down')} 
                        disabled={idx === projects.length - 1}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 hover:bg-slate-850 rounded"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button 
                        onClick={() => deleteProject(proj.id)} 
                        className="p-1 text-red-400 hover:text-red-300 hover:bg-slate-850 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] font-medium text-slate-400 block mb-1">Project Name</label>
                        <input 
                          type="text" 
                          value={proj.name} 
                          onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                          className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400 block mb-1">Role / Contributions</label>
                        <input 
                          type="text" 
                          value={proj.role} 
                          onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                          className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400 block mb-1">Date Period</label>
                        <input 
                          type="text" 
                          value={proj.dates} 
                          onChange={(e) => updateProject(proj.id, 'dates', e.target.value)}
                          className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400 block mb-1">Project URL Link</label>
                        <input 
                          type="text" 
                          value={proj.link} 
                          onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                          className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none"
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Project Details</label>
                      <textarea 
                        rows={2}
                        value={proj.description} 
                        onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                        className="w-full text-xs bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white rounded-lg px-2.5 py-1.5 outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS & CUSTOM */}
        {activeSection === 'certifications' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-250">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Certifications & Licenses</h3>
              <button 
                onClick={addCert} 
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
              >
                <Plus size={14} /> Add Cert
              </button>
            </div>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex gap-4 justify-between items-start">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      value={cert.name} 
                      onChange={(e) => updateCert(cert.id, 'name', e.target.value)}
                      placeholder="Certificate Name"
                      className="bg-slate-900 text-xs text-white px-2 py-1.5 rounded border border-slate-800 outline-none w-full focus:border-indigo-500"
                    />
                    <input 
                      type="text" 
                      value={cert.issuer} 
                      onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                      placeholder="Issuer Authority"
                      className="bg-slate-900 text-xs text-white px-2 py-1.5 rounded border border-slate-800 outline-none w-full focus:border-indigo-500"
                    />
                    <input 
                      type="text" 
                      value={cert.date} 
                      onChange={(e) => updateCert(cert.id, 'date', e.target.value)}
                      placeholder="Date Received"
                      className="bg-slate-900 text-xs text-white px-2 py-1.5 rounded border border-slate-800 outline-none w-full focus:border-indigo-500"
                    />
                  </div>
                  <button 
                    onClick={() => deleteCert(cert.id)} 
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADDITIONAL SECTIONS */}
        {activeSection === 'additional' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-250">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Custom Content Panels</h3>
              <button 
                onClick={addCustomSection} 
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
              >
                <Plus size={14} /> New Custom Section
              </button>
            </div>

            <div className="space-y-4">
              {customSections.map((sec) => (
                <div key={sec.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                    <input 
                      type="text" 
                      value={sec.title} 
                      onChange={(e) => updateCustomSectionTitle(sec.id, e.target.value)}
                      className="bg-transparent text-sm font-bold text-white outline-none w-full focus:border-indigo-500"
                    />
                    <button 
                      onClick={() => deleteCustomSection(sec.id)} 
                      className="p-1 text-red-400 hover:text-red-300 hover:bg-slate-850 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sec.items.map((item) => (
                      <div key={item.id} className="bg-slate-900 border border-slate-800/80 rounded-lg p-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input 
                          type="text" 
                          value={item.title} 
                          onChange={(e) => updateCustomItem(sec.id, item.id, 'title', e.target.value)}
                          placeholder="Title"
                          className="bg-slate-950 text-xs text-white px-2 py-1.5 rounded border border-slate-800 outline-none w-full"
                        />
                        <input 
                          type="text" 
                          value={item.subtitle} 
                          onChange={(e) => updateCustomItem(sec.id, item.id, 'subtitle', e.target.value)}
                          placeholder="Subtitle/Details"
                          className="bg-slate-950 text-xs text-white px-2 py-1.5 rounded border border-slate-800 outline-none w-full"
                        />
                        <input 
                          type="text" 
                          value={item.date} 
                          onChange={(e) => updateCustomItem(sec.id, item.id, 'date', e.target.value)}
                          placeholder="Date"
                          className="bg-slate-950 text-xs text-white px-2 py-1.5 rounded border border-slate-800 outline-none w-full"
                        />
                        <textarea 
                          rows={2}
                          value={item.description} 
                          onChange={(e) => updateCustomItem(sec.id, item.id, 'description', e.target.value)}
                          placeholder="Additional details..."
                          className="sm:col-span-3 bg-slate-950 text-xs text-white px-2 py-1.5 rounded border border-slate-800 outline-none w-full resize-none leading-relaxed"
                        />
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addCustomItem(sec.id)}
                      className="text-xs text-indigo-400 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-1 transition"
                    >
                      <Plus size={12} /> Add Field
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Developer Credit */}
            <div className="pt-8 pb-4 text-center border-t border-slate-850/50 flex flex-col items-center gap-1 text-[10px] text-slate-500 font-medium z-10 mt-8">
              <span>Designed & Developed by</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">Ankush Raja</span>
                <span className="text-slate-800">|</span>
                <span className="text-indigo-500/80 font-medium">Ankush kumar</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Photo Crop Dialog Trigger */}
      {showCropper && (
        <ImageCropper 
          onClose={() => setShowCropper(false)}
          onCropSave={(base64) => {
            handlePersonalInfoChange('photo', base64);
            setShowCropper(false);
          }}
          initialShape={personalInfo.photoCropShape}
        />
      )}
    </div>
  );
};
