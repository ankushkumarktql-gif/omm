import { create } from 'zustand';
import { ResumeData } from '@/types/resume';
import { getDefaultResume } from '@/utils/defaultResume';

interface ResumeStore {
  resumes: ResumeData[];
  activeResumeId: string | null;
  loading: boolean;
  error: string | null;
  
  // History for undo/redo (holds active resume states)
  history: ResumeData[];
  historyIndex: number;

  // Actions
  loadResumes: () => void;
  setActiveResumeId: (id: string | null) => void;
  addResume: (title?: string, templateId?: string) => string;
  duplicateResume: (id: string) => void;
  renameResume: (id: string, title: string) => void;
  deleteResume: (id: string) => void;
  updateActiveResume: (updater: (draft: ResumeData) => void) => void;
  
  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const LOCAL_STORAGE_KEY = 'ai_resume_builder_resumes';
const ACTIVE_ID_KEY = 'ai_resume_builder_active_id';
const HISTORY_LIMIT = 30;

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumes: [],
  activeResumeId: null,
  loading: true,
  error: null,
  history: [],
  historyIndex: -1,

  loadResumes: () => {
    try {
      if (typeof window === 'undefined') return;
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const activeId = localStorage.getItem(ACTIVE_ID_KEY);
      
      let loadedResumes: ResumeData[] = [];
      if (stored) {
        loadedResumes = JSON.parse(stored);
      }
      
      if (loadedResumes.length === 0) {
        // Create initial default resume if none exists
        const initial = getDefaultResume('default-id-' + Math.random().toString(36).substr(2, 9));
        loadedResumes = [initial];
      }
      
      let currentActiveId = activeId;
      if (!currentActiveId || !loadedResumes.some(r => r.id === currentActiveId)) {
        currentActiveId = loadedResumes[0].id;
      }
      
      const activeResume = loadedResumes.find(r => r.id === currentActiveId);
      const historyStack = activeResume ? [JSON.parse(JSON.stringify(activeResume))] : [];

      set({
        resumes: loadedResumes,
        activeResumeId: currentActiveId,
        loading: false,
        history: historyStack,
        historyIndex: 0
      });
    } catch (e) {
      console.error('Failed to load resumes from localStorage', e);
      set({ loading: false, error: 'Failed to load data.' });
    }
  },

  setActiveResumeId: (id) => {
    if (typeof window !== 'undefined' && id) {
      localStorage.setItem(ACTIVE_ID_KEY, id);
    }
    
    const activeResume = get().resumes.find(r => r.id === id);
    const historyStack = activeResume ? [JSON.parse(JSON.stringify(activeResume))] : [];
    
    set({
      activeResumeId: id,
      history: historyStack,
      historyIndex: 0
    });
  },

  addResume: (title = 'Untitled Resume', templateId = 'modern-sidebar') => {
    const id = 'resume-' + Math.random().toString(36).substr(2, 9);
    const newResume = getDefaultResume(id);
    newResume.title = title;
    newResume.templateId = templateId;
    newResume.updatedAt = new Date().toISOString();

    const updatedResumes = [newResume, ...get().resumes];
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedResumes));
      localStorage.setItem(ACTIVE_ID_KEY, id);
    }

    set({
      resumes: updatedResumes,
      activeResumeId: id,
      history: [JSON.parse(JSON.stringify(newResume))],
      historyIndex: 0
    });

    return id;
  },

  duplicateResume: (id) => {
    const target = get().resumes.find(r => r.id === id);
    if (!target) return;

    const duplicatedId = 'resume-' + Math.random().toString(36).substr(2, 9);
    const duplicated: ResumeData = {
      ...JSON.parse(JSON.stringify(target)),
      id: duplicatedId,
      title: `${target.title} (Copy)`,
      updatedAt: new Date().toISOString()
    };

    const updatedResumes = [duplicated, ...get().resumes];
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedResumes));
    }

    set({ resumes: updatedResumes });
  },

  renameResume: (id, title) => {
    const updatedResumes = get().resumes.map(r => {
      if (r.id === id) {
        return { ...r, title, updatedAt: new Date().toISOString() };
      }
      return r;
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedResumes));
    }

    set({ resumes: updatedResumes });
  },

  deleteResume: (id) => {
    const updatedResumes = get().resumes.filter(r => r.id !== id);
    let nextActiveId = get().activeResumeId;

    if (nextActiveId === id) {
      nextActiveId = updatedResumes.length > 0 ? updatedResumes[0].id : null;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedResumes));
      if (nextActiveId) {
        localStorage.setItem(ACTIVE_ID_KEY, nextActiveId);
      } else {
        localStorage.removeItem(ACTIVE_ID_KEY);
      }
    }

    const activeResume = updatedResumes.find(r => r.id === nextActiveId);
    const historyStack = activeResume ? [JSON.parse(JSON.stringify(activeResume))] : [];

    set({
      resumes: updatedResumes,
      activeResumeId: nextActiveId,
      history: historyStack,
      historyIndex: activeResume ? 0 : -1
    });
  },

  updateActiveResume: (updater) => {
    const activeId = get().activeResumeId;
    if (!activeId) return;

    const updatedResumes = get().resumes.map(r => {
      if (r.id === activeId) {
        const copy = JSON.parse(JSON.stringify(r)) as ResumeData;
        updater(copy);
        copy.updatedAt = new Date().toISOString();
        return copy;
      }
      return r;
    });

    const currentActiveResume = updatedResumes.find(r => r.id === activeId)!;

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedResumes));
    }

    // Handle history push
    const currentHistory = get().history.slice(0, get().historyIndex + 1);
    const updatedHistory = [...currentHistory, JSON.parse(JSON.stringify(currentActiveResume))];
    
    // Cap history length
    if (updatedHistory.length > HISTORY_LIMIT) {
      updatedHistory.shift();
    }

    set({
      resumes: updatedResumes,
      history: updatedHistory,
      historyIndex: updatedHistory.length - 1
    });
  },

  undo: () => {
    const { history, historyIndex, activeResumeId, resumes } = get();
    if (historyIndex <= 0 || !activeResumeId) return;

    const nextIndex = historyIndex - 1;
    const prevResumeState = JSON.parse(JSON.stringify(history[nextIndex])) as ResumeData;

    const updatedResumes = resumes.map(r => {
      if (r.id === activeResumeId) {
        return {
          ...prevResumeState,
          id: r.id, // Preserve ID
          title: r.title, // Preserve title
          updatedAt: new Date().toISOString()
        };
      }
      return r;
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedResumes));
    }

    set({
      resumes: updatedResumes,
      historyIndex: nextIndex
    });
  },

  redo: () => {
    const { history, historyIndex, activeResumeId, resumes } = get();
    if (historyIndex >= history.length - 1 || !activeResumeId) return;

    const nextIndex = historyIndex + 1;
    const nextResumeState = JSON.parse(JSON.stringify(history[nextIndex])) as ResumeData;

    const updatedResumes = resumes.map(r => {
      if (r.id === activeResumeId) {
        return {
          ...nextResumeState,
          id: r.id,
          title: r.title,
          updatedAt: new Date().toISOString()
        };
      }
      return r;
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedResumes));
    }

    set({
      resumes: updatedResumes,
      historyIndex: nextIndex
    });
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,
}));
