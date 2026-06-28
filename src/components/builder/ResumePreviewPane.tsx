import React, { useRef, useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { ResumeTemplateRenderer } from './ResumeTemplateRenderer';
import { analyzeATSScore } from '@/lib/ai';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Download, Printer, ZoomIn, ZoomOut, Check, Sparkles, FileDown, 
  Palette, Type, AlignLeft, Layers, Gauge, AlertCircle, RefreshCw 
} from 'lucide-react';

const ACCENT_COLORS = [
  '#6366f1', // Indigo
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#ec4899', // Pink
  '#14b8a6', // Teal
  '#0f172a', // Slate/Dark
];

const TEMPLATE_LIST = [
  { id: 'modern-sidebar', name: 'Modern Sidebar' },
  { id: 'minimal-professional', name: 'Minimal Pro' },
  { id: 'executive-corporate', name: 'Executive' },
  { id: 'creative-teal', name: 'Creative Teal' },
  { id: 'bold-accent', name: 'Bold Accent' },
  { id: 'academic-cv', name: 'Academic CV' },
  { id: 'tech-startup', name: 'Tech / Startup' },
  { id: 'elegant-serif', name: 'Elegant Serif' },
  { id: 'left-classic', name: 'Classic Split' },
  { id: 'clean-timeline', name: 'Clean Timeline' }
];

// ----------------------------------------------------------------------
// Color Space Conversions: OKLab / OKLch / CIELAB / CIELCH / Display-P3
// ----------------------------------------------------------------------
const oklabToRgb = (L: number, a: number, bVal: number): [number, number, number] => {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * bVal;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bVal;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * bVal;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const rLinear = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLinear = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLinear = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  const gamma = (c: number): number => {
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };

  const outR = Math.round(Math.max(0, Math.min(1, gamma(rLinear))) * 255);
  const outG = Math.round(Math.max(0, Math.min(1, gamma(gLinear))) * 255);
  const outB = Math.round(Math.max(0, Math.min(1, gamma(bLinear))) * 255);

  return [outR, outG, outB];
};

const oklchToRgb = (l: number, c: number, h: number): [number, number, number] => {
  const hueRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hueRad);
  const bVal = c * Math.sin(hueRad);
  return oklabToRgb(l, a, bVal);
};

const labToRgb = (L: number, a: number, bVal: number): [number, number, number] => {
  const fy = (L + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - bVal / 200;

  const fx3 = fx * fx * fx;
  const fz3 = fz * fz * fz;

  const xr = fx3 > 0.008856 ? fx3 : (fx - 16 / 116) / 7.787;
  const yr = L > 7.9996 ? Math.pow((L + 16) / 116, 3) : L / 903.3;
  const zr = fz3 > 0.008856 ? fz3 : (fz - 16 / 116) / 7.787;

  const X = xr * 95.047;
  const Y = yr * 100.000;
  const Z = zr * 108.883;

  const rLinear = (X * 3.2406 - Y * 1.5372 - Z * 0.4986) / 100;
  const gLinear = (-X * 0.9689 + Y * 1.8758 + Z * 0.0415) / 100;
  const bLinear = (X * 0.0557 - Y * 0.2040 + Z * 1.0570) / 100;

  const gamma = (c: number): number => {
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };

  const outR = Math.round(Math.max(0, Math.min(1, gamma(rLinear))) * 255);
  const outG = Math.round(Math.max(0, Math.min(1, gamma(gLinear))) * 255);
  const outB = Math.round(Math.max(0, Math.min(1, gamma(bLinear))) * 255);

  return [outR, outG, outB];
};

const lchToRgb = (l: number, c: number, h: number): [number, number, number] => {
  const hueRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hueRad);
  const bVal = c * Math.sin(hueRad);
  return labToRgb(l, a, bVal);
};

const parseColorFunction = (colorFnStr: string): string => {
  const cleaned = colorFnStr
    .toLowerCase()
    .replace(/[,/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const match = cleaned.match(/^(oklch|oklab|lch|lab|color)\(([^)]+)\)$/i);
  if (!match) return 'rgb(0, 0, 0)';

  const type = match[1];
  const argsStr = match[2];
  const tokens = argsStr.split(' ').filter(t => t.length > 0);

  const parseValue = (token: string, maxVal: number): number => {
    if (!token) return 0;
    const isPercent = token.endsWith('%');
    const val = parseFloat(token);
    if (isNaN(val)) return 0;
    return isPercent ? (val / 100) * maxVal : val;
  };

  try {
    if (type === 'oklch') {
      const L = tokens[0] && tokens[0].endsWith('%') ? parseFloat(tokens[0]) / 100 : parseFloat(tokens[0] || '0');
      const C = tokens[1] && tokens[1].endsWith('%') ? parseFloat(tokens[1]) / 100 : parseFloat(tokens[1] || '0');
      const H = parseFloat(tokens[2] || '0');
      const alpha = tokens[3] ? parseFloat(tokens[3]) : 1;
      const [resR, resG, resB] = oklchToRgb(L, C, H);
      return alpha < 1 ? `rgba(${resR}, ${resG}, ${resB}, ${alpha})` : `rgb(${resR}, ${resG}, ${resB})`;
    }

    if (type === 'oklab') {
      const L = tokens[0] && tokens[0].endsWith('%') ? parseFloat(tokens[0]) / 100 : parseFloat(tokens[0] || '0');
      const a = parseFloat(tokens[1] || '0');
      const bVal = parseFloat(tokens[2] || '0');
      const alpha = tokens[3] ? parseFloat(tokens[3]) : 1;
      const [resR, resG, resB] = oklabToRgb(L, a, bVal);
      return alpha < 1 ? `rgba(${resR}, ${resG}, ${resB}, ${alpha})` : `rgb(${resR}, ${resG}, ${resB})`;
    }

    if (type === 'lch') {
      const L = parseValue(tokens[0] || '0', 100);
      const C = parseValue(tokens[1] || '0', 150);
      const H = parseFloat(tokens[2] || '0');
      const alpha = tokens[3] ? parseFloat(tokens[3]) : 1;
      const [resR, resG, resB] = lchToRgb(L, C, H);
      return alpha < 1 ? `rgba(${resR}, ${resG}, ${resB}, ${alpha})` : `rgb(${resR}, ${resG}, ${resB})`;
    }

    if (type === 'lab') {
      const L = parseValue(tokens[0] || '0', 100);
      const a = parseFloat(tokens[1] || '0');
      const bVal = parseFloat(tokens[2] || '0');
      const alpha = tokens[3] ? parseFloat(tokens[3]) : 1;
      const [resR, resG, resB] = labToRgb(L, a, bVal);
      return alpha < 1 ? `rgba(${resR}, ${resG}, ${resB}, ${alpha})` : `rgb(${resR}, ${resG}, ${resB})`;
    }

    if (type === 'color') {
      const space = tokens[0];
      const rVal = parseFloat(tokens[1] || '0');
      const gVal = parseFloat(tokens[2] || '0');
      const bVal = parseFloat(tokens[3] || '0');
      const alpha = tokens[4] ? parseFloat(tokens[4]) : 1;

      if (space === 'display-p3') {
        const rLinear = 1.2249 * rVal - 0.2247 * gVal - 0.0020 * bVal;
        const gLinear = -0.0720 * rVal + 1.0429 * gVal - 0.0076 * bVal;
        const bLinear = -0.0079 * rVal - 0.0786 * gVal + 1.1627 * bVal;

        const gamma = (c: number): number => {
          return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
        };

        const r = Math.round(Math.max(0, Math.min(1, gamma(rLinear))) * 255);
        const g = Math.round(Math.max(0, Math.min(1, gamma(gLinear))) * 255);
        const b = Math.round(Math.max(0, Math.min(1, gamma(bLinear))) * 255);

        return alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
      } else {
        const r = Math.round(Math.max(0, Math.min(1, rVal)) * 255);
        const g = Math.round(Math.max(0, Math.min(1, gVal)) * 255);
        const b = Math.round(Math.max(0, Math.min(1, bVal)) * 255);
        return alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
      }
    }
  } catch (e) {
    console.warn("Color parsing failed for:", colorFnStr, e);
  }

  return 'rgb(0, 0, 0)';
};

export const ResumePreviewPane: React.FC = () => {
  const activeResumeId = useResumeStore(state => state.activeResumeId);
  const resumes = useResumeStore(state => state.resumes);
  const updateActiveResume = useResumeStore(state => state.updateActiveResume);
  
  const activeResume = resumes.find(r => r.id === activeResumeId);
  const [zoom, setZoom] = useState<number>(0.85); // Default zoom level
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'design' | 'ats'>('design');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const previewContainerRef = useRef<HTMLDivElement | null>(null);

  if (!activeResume) return null;

  // Run ATS analysis
  const atsResult = analyzeATSScore(activeResume);

  const triggerToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const sanitizeClonedDOM = (original: HTMLElement, clone: HTMLElement) => {
    const originalEls = [original, ...Array.from(original.querySelectorAll('*'))] as HTMLElement[];
    const cloneEls = [clone, ...Array.from(clone.querySelectorAll('*'))] as HTMLElement[];

    const convertColorToRGB = (colorStr: string): string => {
      if (!colorStr) return colorStr;
      
      const modernColorRegex = /(oklch|oklab|lch|lab|color)\((?:[^()]+|\([^()]*\))*\)/gi;
      
      if (modernColorRegex.test(colorStr)) {
        return colorStr.replace(modernColorRegex, (match) => {
          return parseColorFunction(match);
        });
      }
      return colorStr;
    };

    const colorProperties = [
      'color',
      'backgroundColor',
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
      'outlineColor',
      'boxShadow',
      'textShadow',
      'fill',
      'stroke',
      'backgroundImage'
    ];

    originalEls.forEach((origEl, index) => {
      const cloneEl = cloneEls[index];
      if (!cloneEl) return;

      const computed = window.getComputedStyle(origEl);
      colorProperties.forEach((prop) => {
        const value = computed[prop as any] as string;
        if (value && (value.includes('oklch') || value.includes('oklab') || value.includes('lch') || value.includes('lab') || value.includes('color('))) {
          const rgbColor = convertColorToRGB(value);
          cloneEl.style[prop as any] = rgbColor;
        }
      });
    });
  };

  // PDF download generator using html2canvas & jsPDF
  const handleDownloadPDF = async () => {
    setPdfGenerating(true);
    let clone: HTMLElement | null = null;
    
    try {
      const element = document.getElementById('resume-export-capture');
      if (!element) {
        triggerToast("Export capture node not found.", "error");
        return;
      }

      // 1. Clone the resume DOM
      clone = element.cloneNode(true) as HTMLElement;
      clone.id = 'resume-export-capture-clone';
      
      // 2. Mount the cloned node offscreen so styles and layouts resolve correctly
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = '210mm';
      clone.style.minHeight = '297mm';
      clone.style.background = 'white';
      clone.style.opacity = '1';
      clone.style.pointerEvents = 'none';
      document.body.appendChild(clone);

      // 3. Traverse and sanitize all modern colors
      sanitizeClonedDOM(element, clone);

      // Wait for fonts to load for pixel perfect layout render
      if (typeof window !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }

      // 4. Render html2canvas from the sanitized cloned DOM instead of the original DOM
      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 794 // Standard 96 DPI pixel width for A4
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add first A4 page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Clean page boundary splits
      while (heightLeft > 2) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const userName = activeResume.personalInfo.name 
        ? activeResume.personalInfo.name.replace(/\s+/g, '_') 
        : 'User';
      pdf.save(`Resume-${userName}.pdf`);
      triggerToast("Resume downloaded successfully!", "success");
    } catch (err) {
      console.error('PDF compilation failed', err);
      triggerToast("Failed to generate and download PDF.", "error");
    } finally {
      if (clone) {
        clone.remove();
      }
      setPdfGenerating(false);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header controls */}
      <div className="flex justify-between items-center px-6 py-4 bg-slate-950 border-b border-slate-800 flex-wrap gap-3">
        <span className="text-sm font-semibold text-white flex items-center gap-2">
          <Layers size={16} className="text-indigo-400" /> Preview & Styling
        </span>
        <div className="flex items-center gap-3">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-850 rounded-lg border border-slate-700 px-2 py-1 gap-2">
            <button 
              onClick={() => setZoom(prev => Math.max(0.5, prev - 0.05))}
              className="p-1 hover:bg-slate-750 rounded text-slate-400 hover:text-white"
            >
              <ZoomOut size={13} />
            </button>
            <span className="text-[10px] font-mono font-bold text-white whitespace-nowrap">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom(prev => Math.min(1.5, prev + 0.05))}
              className="p-1 hover:bg-slate-750 rounded text-slate-400 hover:text-white"
            >
              <ZoomIn size={13} />
            </button>
          </div>

          <button
            onClick={handleDownloadPDF}
            disabled={pdfGenerating}
            className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/10 cursor-pointer"
          >
            {pdfGenerating ? (
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <FileDown size={14} />
            )}
            {pdfGenerating ? 'Generating...' : 'Download PDF'}
          </button>

          <button
            onClick={handlePrint}
            className="text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-750 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Printer size={14} />
            Print
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/20 px-6 py-2 gap-4">
        <button
          onClick={() => setActiveTab('design')}
          className={`text-xs font-semibold py-1 border-b-2 transition ${
            activeTab === 'design' ? 'text-indigo-400 border-indigo-500' : 'text-slate-400 hover:text-slate-200 border-transparent'
          }`}
        >
          Design Options
        </button>
        <button
          onClick={() => setActiveTab('ats')}
          className={`text-xs font-semibold py-1 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'ats' ? 'text-indigo-400 border-indigo-500' : 'text-slate-400 hover:text-slate-200 border-transparent'
          }`}
        >
          <Gauge size={13} />
          ATS Check ({atsResult.score}%)
        </button>
      </div>

      {/* Styling / Grading options block */}
      <div className="bg-slate-950/40 border-b border-slate-800 p-6">
        {activeTab === 'design' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Color accent selection */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Palette size={13} className="text-indigo-400" /> Accent Color
              </label>
              <div className="flex flex-wrap gap-2">
                {ACCENT_COLORS.map(c => (
                  <button 
                    key={c}
                    onClick={() => updateActiveResume(draft => { draft.accentColor = c })}
                    className="w-5 h-5 rounded-full flex items-center justify-center transition border border-transparent hover:scale-110 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: c }}
                  >
                    {activeResume.accentColor === c && <Check size={11} className="text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography selection */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Type size={13} className="text-indigo-400" /> Font Typography
              </label>
              <select 
                value={activeResume.fontFamily}
                onChange={(e) => updateActiveResume(draft => { draft.fontFamily = e.target.value })}
                className="w-full text-xs bg-slate-900 border border-slate-800 text-white px-2.5 py-1.5 rounded-lg outline-none cursor-pointer focus:border-indigo-500"
              >
                <option value="font-sans">Outfit (Modern Sans)</option>
                <option value="font-serif">Georgia (Classic Serif)</option>
                <option value="font-mono">Geist Mono (Technical)</option>
                <option value="font-playfair">Playfair Display (Editorial)</option>
              </select>
            </div>

            {/* Spacing density selection */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <AlignLeft size={13} className="text-indigo-400" /> Page Spacing Density
              </label>
              <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                {[
                  { id: 'compact', label: 'Compact' },
                  { id: 'normal', label: 'Normal' },
                  { id: 'loose', label: 'Loose' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => updateActiveResume(draft => { draft.spacing = opt.id as any })}
                    className={`flex-1 text-[10px] font-bold py-1 rounded transition ${
                      activeResume.spacing === opt.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Template selector row */}
            <div className="md:col-span-3">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Layers size={13} className="text-indigo-400" /> Active Resume Template Layout
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {TEMPLATE_LIST.map(t => (
                  <button
                    key={t.id}
                    onClick={() => updateActiveResume(draft => { draft.templateId = t.id })}
                    className={`text-[10px] font-semibold p-2 border rounded-lg transition text-center truncate ${
                      activeResume.templateId === t.id 
                        ? 'border-indigo-500 bg-indigo-500/10 text-white' 
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
            {/* Realtime ATS Score radial visualizer */}
            <div className="col-span-12 md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-2">ATS Readiness</span>
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* SVG circular track */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path 
                    className="text-slate-800" 
                    strokeWidth="3" 
                    stroke="currentColor" 
                    fill="none" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                  <path 
                    className="text-indigo-500 transition-all duration-500" 
                    strokeDasharray={`${atsResult.score}, 100`} 
                    strokeWidth="3.2" 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="none" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                </svg>
                <span className="absolute text-sm font-bold text-white">{atsResult.score}%</span>
              </div>
            </div>

            {/* Suggestions Checklist */}
            <div className="col-span-12 md:col-span-8 space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <AlertCircle size={12} className="text-amber-500" /> Optimization Checklist
              </span>
              <div className="max-h-[140px] overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                {atsResult.suggestions.length > 0 ? (
                  atsResult.suggestions.map((suggestion, index) => (
                    <div key={index} className="text-xs flex gap-2 items-start text-slate-300 bg-slate-900 border border-slate-850 p-2.5 rounded-lg">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{suggestion}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg flex items-center gap-2">
                    <Check size={14} /> Perfect optimization score! Your layout is completely ATS-friendly.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main A4 Document Workspace Container */}
      <div id="resume-preview-parent" className="flex-1 overflow-auto bg-slate-950 p-8 flex justify-center items-start border-t border-slate-850">
        <div 
          ref={previewContainerRef}
          id="resume-preview-container"
          className="shadow-2xl origin-top transition-transform overflow-hidden"
          style={{
            transform: `scale(${zoom})`,
            width: '210mm',
            minHeight: '297mm',
            backgroundColor: '#ffffff'
          }}
        >
          <ResumeTemplateRenderer data={activeResume} />
        </div>
      </div>

      {/* Hidden container for A4 PDF download rendering at exact scale 1 */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: 0, 
          width: '210mm', 
          minHeight: '297mm', 
          background: 'white',
          opacity: 0,
          pointerEvents: 'none'
        }}
      >
        <div id="resume-export-capture" style={{ width: '210mm', minHeight: '297mm' }} className="bg-white">
          <ResumeTemplateRenderer data={activeResume} />
        </div>
      </div>

      {/* Floating Toast Notification alerts */}
      {toast && (
        <div 
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-3 duration-200 ${
            toast.type === 'success' 
              ? 'bg-slate-900 border-emerald-500/30 text-emerald-400' 
              : 'bg-slate-900 border-red-500/30 text-red-400'
          }`}
        >
          {toast.type === 'success' ? (
            <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          <span className="text-xs font-semibold text-white">{toast.message}</span>
        </div>
      )}
    </div>
  );
};
