import { ResumeData } from '@/types/resume';

const MOCK_SUMMARIES: Record<string, string[]> = {
  software: [
    "Innovative Full Stack Software Engineer with {years} years of experience designing high-scalability web systems. Specialized in Next.js, React, Node.js, and cloud computing. Passionate about writing clean, maintainable code and solving complex performance bottlenecks.",
    "Driven Software Engineer with a strong foundation in algorithms, system design, and distributed networks. Proven ability to optimize application rendering by 40% and collaborate in rapid, agile development teams.",
    "Lead Developer with extensive experience building cloud-native SaaS platforms. Expertise spans Go, TypeScript, PostgreSQL, and Kubernetes. Dedicated to driving engineering excellence and mentoring cross-functional product teams."
  ],
  marketing: [
    "Dynamic Growth Marketing Manager with {years} years of experience executing multi-channel digital campaigns. Proven record of increasing organic traffic by 150% and optimizing conversion funnels for enterprise B2B SaaS applications.",
    "Creative Marketing Specialist adept in brand development, SEO, content marketing, and Google Analytics. Experienced in building brand presence, scaling social media channels, and driving high-converting user acquisition pipelines."
  ],
  product: [
    "User-focused Product Manager with {years} years of experience guiding cross-functional agile squads. Expert at translating market research and technical limitations into high-impact user experiences and growth features.",
    "Technical Product Manager with a track record of delivering SaaS projects from ideation to launch. Skilled in data analytics, roadmapping, UX architecture, and developer communication."
  ]
};

const SUGGESTED_SKILLS: Record<string, string[]> = {
  software: ['React.js', 'Next.js 15', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS Cloud', 'Kubernetes', 'Go', 'GraphQL', 'Tailwind CSS', 'System Design'],
  marketing: ['Google Analytics', 'SEO Optimization', 'Copywriting', 'A/B Testing', 'Growth Hacking', 'Email Marketing', 'Content Strategy', 'Social Media Ads', 'HubSpot'],
  product: ['Agile Roadmapping', 'User Research', 'SQL Analytics', 'Figma Wireframing', 'Jira / Confluence', 'Product Strategy', 'KPI Tracking', 'A/B Testing', 'Stakeholder Management'],
  sales: ['Salesforce', 'B2B Sales', 'Lead Generation', 'Contract Negotiation', 'Relationship Management', 'Pipeline Forecasting', 'Cold Outreach', 'Client Retention'],
  design: ['Figma', 'UI/UX Design', 'Design Systems', 'Typography', 'Wireframing', 'User Research', 'Adobe Creative Suite', 'Prototyping', 'Visual Branding']
};

const COMMON_ATS_KEYWORDS = [
  'KPI', 'optimization', 'latency', 'scaling', 'cross-functional', 'leadership', 'scalability', 'automated testing',
  'collaboration', 'agile', 'CI/CD', 'cloud infrastructure', 'data analytics', 'SaaS', 'ROI', 'growth', 'user acquisition'
];

export const generateSummary = async (role: string, years = '5'): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulating network latency
  const key = role.toLowerCase().includes('soft') || role.toLowerCase().includes('tech') || role.toLowerCase().includes('dev')
    ? 'software'
    : role.toLowerCase().includes('mark')
    ? 'marketing'
    : role.toLowerCase().includes('prod') || role.toLowerCase().includes('pm')
    ? 'product'
    : 'software';
    
  const templates = MOCK_SUMMARIES[key];
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template.replace('{years}', years);
};

export const improveExperienceBullet = async (text: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (!text.trim()) return "Please enter a bullet point first.";
  
  // Strong action verbs replace weak ones
  let improved = text;
  const wordReplacements: Record<string, string> = {
    'worked on': 'Spearheaded the development and integration of',
    'helped with': 'Collaborated on executing complex updates for',
    'managed': 'Orchestrated and managed operations for',
    'built': 'Engineered and scaled',
    'made': 'Designed and implemented',
    'improved': 'Optimized and elevated',
    'fixed': 'Resolved critical defects and enhanced performance in',
    'handled': 'Directed and scaled operations of'
  };

  for (const [key, replacement] of Object.entries(wordReplacements)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    if (regex.test(improved)) {
      improved = improved.replace(regex, replacement);
      break;
    }
  }

  // If no common weak verbs were matched, append dynamic business metric language
  if (improved === text) {
    const metricEndings = [
      ", resulting in a 25% increase in operational efficiency.",
      ", reducing application latency by 15% and increasing system uptime.",
      ", which drove an immediate 10% increase in user engagement metrics.",
      " using clean React hooks and state-management design patterns."
    ];
    improved = text.trim().replace(/[.,]$/, '') + metricEndings[Math.floor(Math.random() * metricEndings.length)];
  }

  return improved;
};

export const suggestSkills = (role: string): string[] => {
  const normalized = role.toLowerCase();
  if (normalized.includes('soft') || normalized.includes('tech') || normalized.includes('dev') || normalized.includes('engineer')) {
    return SUGGESTED_SKILLS.software;
  }
  if (normalized.includes('mark') || normalized.includes('growth')) {
    return SUGGESTED_SKILLS.marketing;
  }
  if (normalized.includes('prod') || normalized.includes('pm')) {
    return SUGGESTED_SKILLS.product;
  }
  if (normalized.includes('design') || normalized.includes('ui') || normalized.includes('ux')) {
    return SUGGESTED_SKILLS.design;
  }
  if (normalized.includes('sale') || normalized.includes('deal')) {
    return SUGGESTED_SKILLS.sales;
  }
  return [...SUGGESTED_SKILLS.software, ...SUGGESTED_SKILLS.product].slice(0, 8);
};

export const analyzeATSScore = (resume: ResumeData) => {
  let score = 40; // Base score
  const suggestions: string[] = [];
  const missingKeywords: string[] = [];
  const foundKeywords: string[] = [];

  // Check personal details
  if (resume.personalInfo.name.trim()) score += 5;
  else suggestions.push("Add your full name to the header.");

  if (resume.personalInfo.title.trim()) score += 5;
  else suggestions.push("Add a professional title targeting your desired role (e.g. Senior Frontend Engineer).");

  if (resume.personalInfo.email.trim() && resume.personalInfo.phone.trim()) score += 5;
  else suggestions.push("Ensure both email and phone contact info are present.");

  if (resume.personalInfo.linkedin.trim()) score += 5;
  else suggestions.push("Include a link to your LinkedIn profile to increase recruiter engagement.");

  // Check summary length
  if (resume.summary.length > 50) {
    score += 10;
    if (resume.summary.length > 300) {
      suggestions.push("Your professional summary is a bit long. Aim to keep it under 3-4 lines.");
    }
  } else {
    suggestions.push("Write a compelling professional summary highlighting your core value.");
  }

  // Check experience count
  if (resume.experience.length >= 2) {
    score += 15;
  } else if (resume.experience.length === 1) {
    score += 5;
    suggestions.push("Add more work history. Resumes with at least 2 roles demonstrate growth.");
  } else {
    suggestions.push("Your experience section is empty. ATS systems rank work history highest.");
  }

  // Check skills count
  if (resume.skills.length >= 5) {
    score += 10;
  } else {
    suggestions.push("Add at least 5 key technical skills to match automated search profiles.");
  }

  // Check projects
  if (resume.projects.length >= 1) {
    score += 5;
  }

  // Check for bullet formatting & metric keywords
  const fullText = JSON.stringify(resume).toLowerCase();
  
  // Search missing keywords
  COMMON_ATS_KEYWORDS.forEach(keyword => {
    if (fullText.includes(keyword.toLowerCase())) {
      score += 2;
      foundKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  // Limit score to max 100
  score = Math.min(score, 100);

  // General suggestions
  if (missingKeywords.length > 5) {
    suggestions.push("Incorporate industry keywords such as: " + missingKeywords.slice(0, 3).join(', ') + " into experience bullets.");
  }

  return {
    score,
    suggestions,
    missingKeywords: missingKeywords.slice(0, 6),
    foundKeywords
  };
};
