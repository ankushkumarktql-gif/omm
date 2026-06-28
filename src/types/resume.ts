export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  dates: string;
  location: string;
  description: string;
  isCollapsed?: boolean;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  dates: string;
  location: string;
  description: string;
  isCollapsed?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  rating: number; // 0 to 5
}

export interface Project {
  id: string;
  name: string;
  role: string;
  dates: string;
  description: string;
  link?: string;
  isCollapsed?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  isCollapsed?: boolean;
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  isCollapsed?: boolean;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string; // e.g., Native, Fluent, Intermediate
}

export interface Reference {
  id: string;
  name: string;
  role: string;
  company: string;
  contact: string;
  isCollapsed?: boolean;
}

export interface VolunteerExperience {
  id: string;
  organization: string;
  role: string;
  dates: string;
  description: string;
  isCollapsed?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link?: string;
  description: string;
  isCollapsed?: boolean;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
  isCollapsed?: boolean;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  photo: string; // Base64
  photoCropShape: 'circle' | 'square';
  photoLayout: 'top' | 'left' | 'right';
}

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  languages: Language[];
  interests: string[]; // string list
  references: Reference[];
  volunteer: VolunteerExperience[];
  achievements: Achievement[];
  publications: Publication[];
  customSections: CustomSection[];
  
  // Customization settings
  templateId: string;
  accentColor: string;
  fontFamily: string;
  spacing: 'compact' | 'normal' | 'loose';
  showPhoto: boolean;
  languageCode: string; // 'en', 'es', 'fr', etc.
}

export interface ResumeStoreState {
  resumes: ResumeData[];
  activeResumeId: string | null;
  loading: boolean;
  error: string | null;
}
