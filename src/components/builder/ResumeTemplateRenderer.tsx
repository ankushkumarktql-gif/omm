import React from 'react';
import { ResumeData } from '@/types/resume';
import { 
  Mail, Phone, MapPin, Globe, Calendar, ExternalLink, Award as AwardIcon, BookOpen, Languages as LangIcon, Users, CheckCircle2 
} from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ResumeTemplateRenderer: React.FC<TemplateProps> = ({ data }) => {
  const {
    templateId,
    accentColor,
    fontFamily,
    spacing,
    showPhoto,
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
    customSections
  } = data;

  // Design Tokens configuration
  const fontClass = 
    fontFamily === 'font-mono' ? 'font-mono' :
    fontFamily === 'font-serif' ? 'font-serif' :
    fontFamily === 'font-playfair' ? 'font-serif tracking-wide' : 'font-sans';

  const spacingClass = 
    spacing === 'compact' ? 'gap-y-2 text-xs' :
    spacing === 'loose' ? 'gap-y-6 text-sm' : 'gap-y-4 text-xs sm:text-sm';

  const sectionSpacing = 
    spacing === 'compact' ? 'mb-2' :
    spacing === 'loose' ? 'mb-6' : 'mb-4';

  const listSpacing = 
    spacing === 'compact' ? 'space-y-1' :
    spacing === 'loose' ? 'space-y-3' : 'space-y-2';

  const headingClass = "font-bold border-b pb-1 flex items-center gap-2";
  const inlineStyles = { '--accent-color': accentColor } as React.CSSProperties;

  // Photo layout handler
  const renderPhoto = () => {
    if (!showPhoto || !personalInfo.photo) return null;
    const shapeClass = personalInfo.photoCropShape === 'circle' ? 'rounded-full' : 'rounded-lg';
    return (
      <div className={`relative flex-shrink-0 overflow-hidden ${shapeClass} w-24 h-24 sm:w-28 sm:h-28 border-2`} style={{ borderColor: accentColor }}>
        <img 
          src={personalInfo.photo} 
          alt={personalInfo.name || "Profile Photo"} 
          className="object-cover w-full h-full"
        />
      </div>
    );
  };

  // Sections dynamic rendering visibility checks
  const hasExp = experience && experience.length > 0;
  const hasEdu = education && education.length > 0;
  const hasSkills = skills && skills.length > 0;
  const hasProj = projects && projects.length > 0;
  const hasCerts = certifications && certifications.length > 0;
  const hasAwards = awards && awards.length > 0;
  const hasLangs = languages && languages.length > 0;
  const hasInterests = interests && interests.length > 0;
  const hasRefs = references && references.length > 0;
  const hasVol = volunteer && volunteer.length > 0;
  const hasAch = achievements && achievements.length > 0;
  const hasPubs = publications && publications.length > 0;

  // Custom Social Icons helper
  const renderLinks = () => {
    return (
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-90">
        {personalInfo.email && (
          <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline">
            <Mail size={12} /> {personalInfo.email}
          </a>
        )}
        {personalInfo.phone && (
          <span className="flex items-center gap-1">
            <Phone size={12} /> {personalInfo.phone}
          </span>
        )}
        {personalInfo.location && (
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {personalInfo.location}
          </span>
        )}
        {personalInfo.website && (
          <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
            <Globe size={12} /> Website
          </a>
        )}
        {personalInfo.github && (
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            GitHub
          </a>
        )}
        {personalInfo.linkedin && (
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        )}
      </div>
    );
  };

  // Helper template layouts

  /* ----------------------------------------------------
     1. Modern Sidebar Template
     ---------------------------------------------------- */
  const renderModernSidebar = () => {
    const isPhotoLeft = personalInfo.photoLayout === 'left';
    return (
      <div className="grid grid-cols-12 min-h-full" style={inlineStyles}>
        {/* Left/Right Sidebar depending on photo layout selection */}
        <div className={`col-span-4 bg-slate-900 text-slate-100 p-6 flex flex-col gap-6 ${isPhotoLeft ? 'order-1' : 'order-2'}`}>
          <div className="flex flex-col items-center text-center gap-3">
            {renderPhoto()}
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">{personalInfo.name}</h1>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-75 mt-1" style={{ color: accentColor }}>{personalInfo.title}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-1 mb-2">Contact</h2>
              <div className="space-y-2 text-xs">
                {personalInfo.email && <div className="truncate">Email: {personalInfo.email}</div>}
                {personalInfo.phone && <div>Phone: {personalInfo.phone}</div>}
                {personalInfo.location && <div>Loc: {personalInfo.location}</div>}
                {personalInfo.website && <div className="truncate">Web: {personalInfo.website}</div>}
              </div>
            </div>

            {hasSkills && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-1 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(s => (
                    <span key={s.id} className="text-[10px] px-2 py-0.5 bg-slate-800 rounded text-slate-200">{s.name}</span>
                  ))}
                </div>
              </div>
            )}

            {hasLangs && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-1 mb-2">Languages</h2>
                <div className="space-y-1 text-xs">
                  {languages.map(l => (
                    <div key={l.id} className="flex justify-between">
                      <span>{l.name}</span>
                      <span className="opacity-60 text-[10px]">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasInterests && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-1 mb-2">Interests</h2>
                <div className="flex flex-wrap gap-1.5">
                  {interests.map((it, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{it}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Pane */}
        <div className={`col-span-8 p-6 bg-white text-slate-800 flex flex-col ${spacingClass} ${isPhotoLeft ? 'order-2' : 'order-1'}`}>
          {summary && (
            <div className={sectionSpacing}>
              <h2 className={headingClass} style={{ borderColor: accentColor, color: accentColor }}>Profile</h2>
              <p className="text-xs sm:text-sm mt-2 text-slate-600 leading-relaxed whitespace-pre-line">{summary}</p>
            </div>
          )}

          {hasExp && (
            <div className={sectionSpacing}>
              <h2 className={headingClass} style={{ borderColor: accentColor, color: accentColor }}>Work Experience</h2>
              <div className={listSpacing}>
                {experience.map(exp => (
                  <div key={exp.id} className="text-xs sm:text-sm">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{exp.role} @ {exp.company}</span>
                      <span className="text-xs font-normal opacity-75">{exp.dates}</span>
                    </div>
                    {exp.location && <div className="text-[10px] text-slate-500 mb-1">{exp.location}</div>}
                    <p className="text-slate-600 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasEdu && (
            <div className={sectionSpacing}>
              <h2 className={headingClass} style={{ borderColor: accentColor, color: accentColor }}>Education</h2>
              <div className={listSpacing}>
                {education.map(edu => (
                  <div key={edu.id} className="text-xs sm:text-sm">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{edu.degree} - {edu.school}</span>
                      <span className="text-xs font-normal opacity-75">{edu.dates}</span>
                    </div>
                    {edu.description && <p className="text-slate-600 mt-1 text-xs">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasProj && (
            <div className={sectionSpacing}>
              <h2 className={headingClass} style={{ borderColor: accentColor, color: accentColor }}>Projects</h2>
              <div className={listSpacing}>
                {projects.map(proj => (
                  <div key={proj.id} className="text-xs sm:text-sm">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{proj.name}</span>
                      <span className="text-xs font-normal opacity-75">{proj.dates}</span>
                    </div>
                    {proj.link && <div className="text-[10px] text-indigo-600 hover:underline">{proj.link}</div>}
                    <p className="text-slate-600 mt-1 whitespace-pre-line leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ----------------------------------------------------
     2. Minimal Professional Template
     ---------------------------------------------------- */
  const renderMinimalProfessional = () => {
    return (
      <div className={`p-8 bg-white text-slate-800 flex flex-col ${spacingClass}`} style={inlineStyles}>
        <div className="flex justify-between items-start border-b pb-4 mb-4" style={{ borderColor: accentColor }}>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{personalInfo.name}</h1>
            <p className="text-sm font-semibold uppercase tracking-wider mt-1" style={{ color: accentColor }}>{personalInfo.title}</p>
            <div className="mt-2 text-xs text-slate-500 flex flex-wrap gap-3">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </div>
          {renderPhoto()}
        </div>

        {summary && (
          <div className={sectionSpacing}>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">{summary}</p>
          </div>
        )}

        {hasExp && (
          <div className={sectionSpacing}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2" style={{ borderColor: accentColor }}>Experience</h2>
            <div className={listSpacing}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-slate-800 text-xs sm:text-sm">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="text-xs font-medium text-slate-500">{exp.dates}</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasEdu && (
          <div className={sectionSpacing}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2" style={{ borderColor: accentColor }}>Education</h2>
            <div className="grid grid-cols-2 gap-4">
              {education.map(edu => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-800">{edu.school}</div>
                  <div className="text-slate-600">{edu.degree}</div>
                  <div className="text-slate-500 text-[10px]">{edu.dates}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasSkills && (
          <div className={sectionSpacing}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2" style={{ borderColor: accentColor }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s.id} className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">{s.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ----------------------------------------------------
     3. Executive Corporate Template
     ---------------------------------------------------- */
  const renderExecutiveCorporate = () => {
    return (
      <div className={`p-8 bg-white text-slate-900 flex flex-col ${spacingClass}`} style={inlineStyles}>
        <div className="text-center space-y-2 border-b-2 pb-4 mb-4" style={{ borderColor: accentColor }}>
          <h1 className="text-3xl font-serif font-bold tracking-wide">{personalInfo.name}</h1>
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{personalInfo.title}</p>
          <div className="text-xs flex justify-center flex-wrap gap-x-4 gap-y-1">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span className="underline">{personalInfo.linkedin}</span>}
          </div>
        </div>

        {summary && (
          <div className={`${sectionSpacing} text-center max-w-2xl mx-auto`}>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif whitespace-pre-line">{summary}</p>
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-4">
            {hasExp && (
              <div>
                <h2 className="text-sm font-bold uppercase border-b mb-3" style={{ color: accentColor, borderColor: accentColor }}>Professional History</h2>
                <div className="space-y-3">
                  {experience.map(exp => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex justify-between font-bold">
                        <span>{exp.role}</span>
                        <span className="font-medium text-slate-500">{exp.dates}</span>
                      </div>
                      <div className="italic text-slate-600 mb-1">{exp.company}</div>
                      <p className="text-slate-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-4 space-y-4">
            {hasEdu && (
              <div>
                <h2 className="text-sm font-bold uppercase border-b mb-3" style={{ color: accentColor, borderColor: accentColor }}>Academic</h2>
                <div className="space-y-2">
                  {education.map(edu => (
                    <div key={edu.id} className="text-xs">
                      <div className="font-bold">{edu.school}</div>
                      <div className="text-slate-600">{edu.degree}</div>
                      <div className="text-slate-500">{edu.dates}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasSkills && (
              <div>
                <h2 className="text-sm font-bold uppercase border-b mb-3" style={{ color: accentColor, borderColor: accentColor }}>Competencies</h2>
                <div className="flex flex-wrap gap-1">
                  {skills.map(s => (
                    <span key={s.id} className="text-[11px] border px-2 py-0.5 rounded text-slate-700 bg-slate-50">{s.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ----------------------------------------------------
     4. Creative Teal Template
     ---------------------------------------------------- */
  const renderCreativeTeal = () => {
    return (
      <div className={`p-8 bg-teal-50/20 text-slate-800 flex flex-col ${spacingClass}`} style={inlineStyles}>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-teal-950">{personalInfo.name}</h1>
            <p className="text-base font-semibold uppercase mt-1" style={{ color: accentColor }}>{personalInfo.title}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {personalInfo.email && <span className="bg-white/80 border border-teal-200/50 px-2 py-0.5 rounded">{personalInfo.email}</span>}
              {personalInfo.phone && <span className="bg-white/80 border border-teal-200/50 px-2 py-0.5 rounded">{personalInfo.phone}</span>}
              {personalInfo.location && <span className="bg-white/80 border border-teal-200/50 px-2 py-0.5 rounded">{personalInfo.location}</span>}
            </div>
          </div>
          {renderPhoto()}
        </div>

        {summary && (
          <div className="bg-teal-900 text-teal-50 p-4 rounded-xl mb-6 shadow-sm">
            <p className="text-xs sm:text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7 space-y-4">
            {hasExp && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-teal-900 border-l-4 pl-2 mb-3" style={{ borderColor: accentColor }}>Journey</h2>
                <div className="space-y-4 border-l pl-3 ml-2 border-teal-200">
                  {experience.map(exp => (
                    <div key={exp.id} className="relative text-xs">
                      <div className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-teal-600" />
                      <div className="font-bold text-slate-800">{exp.role}</div>
                      <div className="text-[10px] text-slate-500 mb-1">{exp.company} | {exp.dates}</div>
                      <p className="text-slate-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-5 space-y-4">
            {hasSkills && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-teal-900 border-l-4 pl-2 mb-3" style={{ borderColor: accentColor }}>Skills</h2>
                <div className="space-y-2">
                  {skills.map(s => (
                    <div key={s.id} className="text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">{s.name}</span>
                        <span className="text-[10px] opacity-75">{s.rating}/5</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-teal-600 h-full rounded-full" style={{ width: `${s.rating * 20}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasEdu && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-teal-900 border-l-4 pl-2 mb-3" style={{ borderColor: accentColor }}>Learning</h2>
                <div className="space-y-2 text-xs">
                  {education.map(edu => (
                    <div key={edu.id} className="bg-white/80 p-2.5 rounded-lg border border-teal-100">
                      <div className="font-semibold text-slate-800">{edu.school}</div>
                      <div className="text-slate-600">{edu.degree}</div>
                      <div className="text-[10px] opacity-65">{edu.dates}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ----------------------------------------------------
     5. Bold Accent Template
     ---------------------------------------------------- */
  const renderBoldAccent = () => {
    return (
      <div className={`bg-white text-slate-800 flex flex-col ${spacingClass}`} style={inlineStyles}>
        {/* Top Header Block */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">{personalInfo.name}</h1>
            <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: accentColor }}>{personalInfo.title}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </div>
          {renderPhoto()}
        </div>

        <div className="p-6 space-y-4">
          {summary && (
            <div className="border-l-4 pl-3" style={{ borderColor: accentColor }}>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{summary}</p>
            </div>
          )}

          {hasExp && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 border-b pb-1" style={{ borderColor: accentColor }}>Work History</h2>
              <div className="space-y-3">
                {experience.map(exp => (
                  <div key={exp.id} className="text-xs sm:text-sm">
                    <div className="flex justify-between font-bold">
                      <span>{exp.role}</span>
                      <span className="text-xs font-medium text-slate-500">{exp.dates}</span>
                    </div>
                    <div className="font-semibold" style={{ color: accentColor }}>{exp.company}</div>
                    <p className="text-slate-600 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 pt-2">
            {hasEdu && (
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 border-b pb-1" style={{ borderColor: accentColor }}>Education</h2>
                <div className="space-y-2">
                  {education.map(edu => (
                    <div key={edu.id} className="text-xs">
                      <div className="font-bold">{edu.school}</div>
                      <div className="text-slate-600">{edu.degree}</div>
                      <div className="text-[10px] text-slate-500">{edu.dates}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasSkills && (
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 border-b pb-1" style={{ borderColor: accentColor }}>Competencies</h2>
                <div className="flex flex-wrap gap-1">
                  {skills.map(s => (
                    <span key={s.id} className="text-xs bg-slate-900 text-slate-100 px-2 py-0.5 rounded font-medium">{s.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ----------------------------------------------------
     6. Academic CV Template
     ---------------------------------------------------- */
  const renderAcademicCV = () => {
    return (
      <div className={`p-8 bg-white text-slate-900 flex flex-col gap-y-4`} style={inlineStyles}>
        <div className="text-center mb-4">
          <h1 className="text-3xl font-normal tracking-wide text-slate-900 uppercase">{personalInfo.name}</h1>
          <p className="text-xs italic text-slate-500 mt-1">{personalInfo.title}</p>
          <div className="border-t border-b py-2 mt-2 text-xs flex justify-center gap-6 border-slate-200">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        {summary && (
          <div className="text-xs leading-relaxed text-slate-700 whitespace-pre-line mb-2">
            {summary}
          </div>
        )}

        {hasEdu && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider border-b mb-2 pb-0.5">Education</h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id} className="text-xs flex justify-between items-start">
                  <div>
                    <span className="font-bold">{edu.school}</span> — <span className="italic">{edu.degree}</span>
                    {edu.description && <p className="text-slate-600 mt-0.5">{edu.description}</p>}
                  </div>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">{edu.dates}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasExp && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider border-b mb-2 pb-0.5">Academic & Research Appointments</h2>
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between font-bold">
                    <span>{exp.role}</span>
                    <span className="text-[10px] font-normal text-slate-500">{exp.dates}</span>
                  </div>
                  <div className="italic text-slate-600 mb-1">{exp.company}</div>
                  <p className="text-slate-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ----------------------------------------------------
     7. Tech & Startup Template
     ---------------------------------------------------- */
  const renderTechStartup = () => {
    return (
      <div className={`p-6 bg-slate-950 text-emerald-400 font-mono flex flex-col ${spacingClass}`} style={inlineStyles}>
        <div className="border border-emerald-900 p-4 rounded-lg bg-slate-900/60 shadow-inner flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">&lt;{personalInfo.name} /&gt;</h1>
            <p className="text-xs text-slate-400 mt-1">// {personalInfo.title}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 font-sans">
              {personalInfo.email && <span className="text-emerald-500">Email: {personalInfo.email}</span>}
              {personalInfo.phone && <span>Phone: {personalInfo.phone}</span>}
              {personalInfo.location && <span>Loc: {personalInfo.location}</span>}
            </div>
          </div>
          {renderPhoto()}
        </div>

        {summary && (
          <div className="text-slate-300 text-xs font-sans border-l-2 border-emerald-500 pl-3 py-1 my-2">
            {summary}
          </div>
        )}

        {hasExp && (
          <div className="border border-emerald-950/60 p-4 rounded-lg bg-slate-900/20">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-3">~# systemctl start experience</h2>
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id} className="text-xs font-sans">
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>{exp.role} @ {exp.company}</span>
                    <span className="text-[10px] font-mono text-slate-500">{exp.dates}</span>
                  </div>
                  <p className="text-slate-400 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasSkills && (
          <div className="border border-emerald-950/60 p-4 rounded-lg bg-slate-900/20">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2">~# cat skills.txt</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {skills.map(s => (
                <span key={s.id} className="bg-slate-900 border border-emerald-900 text-emerald-300 px-2 py-0.5 rounded">[{s.name}]</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ----------------------------------------------------
     8. Elegant Serif Template
     ---------------------------------------------------- */
  const renderElegantSerif = () => {
    return (
      <div className={`p-8 bg-amber-50/10 text-stone-850 flex flex-col font-serif ${spacingClass}`} style={inlineStyles}>
        <div className="text-center border-b border-stone-200 pb-4 mb-6">
          <h1 className="text-4xl font-normal tracking-wide text-stone-900">{personalInfo.name}</h1>
          <p className="text-xs tracking-widest uppercase text-stone-500 mt-1 italic">{personalInfo.title}</p>
          <div className="mt-3 text-xs text-stone-600 flex justify-center flex-wrap gap-x-6 gap-y-1 font-sans">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        {summary && (
          <div className="max-w-2xl mx-auto text-center italic text-stone-700 leading-relaxed text-xs sm:text-sm mb-4">
            "{summary}"
          </div>
        )}

        {hasExp && (
          <div>
            <h2 className="text-xs uppercase tracking-widest text-stone-500 font-bold border-b mb-3 pb-0.5">Chronology</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between font-bold text-stone-900">
                    <span className="text-sm">{exp.role}</span>
                    <span className="font-sans text-[10px] text-stone-500">{exp.dates}</span>
                  </div>
                  <div className="text-stone-650 italic mb-1">{exp.company}</div>
                  <p className="text-stone-750 font-sans whitespace-pre-line leading-relaxed text-xs">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ----------------------------------------------------
     9. Left Column Classic Template
     ---------------------------------------------------- */
  const renderLeftClassic = () => {
    return (
      <div className={`p-8 bg-white text-slate-800 flex flex-col ${spacingClass}`} style={inlineStyles}>
        <div className="grid grid-cols-12 gap-6 border-b pb-6 mb-6">
          <div className="col-span-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{personalInfo.name}</h1>
            <p className="text-sm font-semibold uppercase mt-1" style={{ color: accentColor }}>{personalInfo.title}</p>
            {summary && <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">{summary}</p>}
          </div>
          <div className="col-span-4 flex flex-col items-end gap-3 text-right">
            {renderPhoto()}
            <div className="text-[11px] text-slate-500 space-y-0.5">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 space-y-4">
            {hasSkills && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2" style={{ borderColor: accentColor }}>Expertise</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(s => (
                    <span key={s.id} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-700">{s.name}</span>
                  ))}
                </div>
              </div>
            )}

            {hasLangs && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2" style={{ borderColor: accentColor }}>Languages</h2>
                <div className="space-y-1 text-xs">
                  {languages.map(l => (
                    <div key={l.id} className="flex justify-between">
                      <span className="font-semibold text-slate-700">{l.name}</span>
                      <span className="opacity-60 text-[10px]">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-8 space-y-4">
            {hasExp && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-3" style={{ borderColor: accentColor }}>Experience</h2>
                <div className="space-y-3">
                  {experience.map(exp => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{exp.role} @ {exp.company}</span>
                        <span className="text-[10px] font-normal text-slate-500">{exp.dates}</span>
                      </div>
                      <p className="text-slate-600 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ----------------------------------------------------
     10. Clean Timeline Template
     ---------------------------------------------------- */
  const renderCleanTimeline = () => {
    return (
      <div className={`p-8 bg-white text-slate-800 flex flex-col ${spacingClass}`} style={inlineStyles}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{personalInfo.name}</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mt-0.5">{personalInfo.title}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </div>
          {renderPhoto()}
        </div>

        {summary && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 whitespace-pre-line">{summary}</p>
        )}

        {hasExp && (
          <div className="relative border-l-2 ml-3 pl-6 pb-2 space-y-4" style={{ borderColor: accentColor }}>
            <h2 className="absolute -left-[9px] -top-6 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">Timeline</h2>
            
            {experience.map(exp => (
              <div key={exp.id} className="relative text-xs">
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 bg-white" style={{ borderColor: accentColor }} />
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{exp.role}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{exp.dates}</span>
                </div>
                <div className="text-slate-600 italic font-medium">{exp.company}</div>
                <p className="text-slate-600 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Switch template rendering trigger mapper
  const renderTemplateBody = () => {
    switch (templateId) {
      case 'modern-sidebar':
        return renderModernSidebar();
      case 'minimal-professional':
        return renderMinimalProfessional();
      case 'executive-corporate':
        return renderExecutiveCorporate();
      case 'creative-teal':
        return renderCreativeTeal();
      case 'bold-accent':
        return renderBoldAccent();
      case 'academic-cv':
        return renderAcademicCV();
      case 'tech-startup':
        return renderTechStartup();
      case 'elegant-serif':
        return renderElegantSerif();
      case 'left-classic':
        return renderLeftClassic();
      case 'clean-timeline':
        return renderCleanTimeline();
      default:
        return renderModernSidebar();
    }
  };

  return (
    <div 
      className={`resume-paper select-text outline-none text-left leading-normal ${fontClass}`}
      style={{ minHeight: '297mm' }}
    >
      {renderTemplateBody()}
    </div>
  );
};
