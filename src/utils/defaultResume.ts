import { ResumeData } from '@/types/resume';

export const getDefaultResume = (id = 'default'): ResumeData => {
  return {
    id,
    title: 'My Professional Resume',
    updatedAt: new Date().toISOString(),
    personalInfo: {
      name: 'Alex Morgan',
      title: 'Senior Full Stack Engineer',
      email: 'alex.morgan@dev.com',
      phone: '+1 (555) 019-2834',
      location: 'San Francisco, CA',
      website: 'https://alexmorgan.dev',
      github: 'https://github.com/alexmorgan',
      linkedin: 'https://linkedin.com/in/alexmorgan',
      photo: '', // Empty by default, layout adjusts automatically
      photoCropShape: 'circle',
      photoLayout: 'left',
    },
    summary: 'Highly analytical and detail-oriented Senior Software Engineer with 6+ years of experience designing, building, and deploying scalable web applications. Proven track record of optimizing payment gateway latency by 45% and leading cross-functional teams in agile environments. Expert in React, Next.js, Node.js, and AWS cloud architectures.',
    experience: [
      {
        id: 'exp-1',
        company: 'Stripe',
        role: 'Tech Lead - Core Payments',
        dates: 'Jan 2023 - Present',
        location: 'San Francisco, CA',
        description: 'Led a cross-functional team of 6 engineers to re-architect the high-throughput payment routing microservices.\n• Reduced transaction processing latency by 35% using distributed caching and message queues.\n• Spearheaded the adoption of Next.js and TypeScript for internal operations consoles, increasing internal tool page speeds by 2x.\n• Mentored 4 junior developers and established test coverage standards of >90%.',
        isCollapsed: false,
      },
      {
        id: 'exp-2',
        company: 'Vercel',
        role: 'Senior Software Engineer',
        dates: 'Aug 2021 - Dec 2022',
        location: 'Remote, US',
        description: 'Collaborated on developing core dashboard rendering strategies for high-volume Next.js web deployments.\n• Authored key interactive components of the Vercel analytics panel using React and Tailwind CSS.\n• Improved dev-server memory utilization by 25% and reduced build times for large-scale production sites.',
        isCollapsed: false,
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Stanford University',
        degree: 'M.S. in Computer Science',
        dates: 'Sep 2019 - Jun 2021',
        location: 'Stanford, CA',
        description: 'Specialization in Distributed Systems and Cloud Architectures. Completed thesis on serverless orchestration scheduling algorithms.',
        isCollapsed: false,
      },
      {
        id: 'edu-2',
        school: 'UC Berkeley',
        degree: 'B.S. in Software Engineering',
        dates: 'Sep 2015 - Jun 2019',
        location: 'Berkeley, CA',
        description: 'Graduated Magna Cum Laude. Member of Computer Science Undergraduate Association.',
        isCollapsed: false,
      }
    ],
    skills: [
      { id: 'sk-1', name: 'React / Next.js', category: 'Frontend', rating: 5 },
      { id: 'sk-2', name: 'TypeScript / Node.js', category: 'Frontend/Backend', rating: 5 },
      { id: 'sk-3', name: 'Tailwind CSS', category: 'Frontend', rating: 5 },
      { id: 'sk-4', name: 'Python / Go', category: 'Languages', rating: 4 },
      { id: 'sk-5', name: 'PostgreSQL / Redis', category: 'Databases', rating: 4 },
      { id: 'sk-6', name: 'Docker / AWS Cloud', category: 'DevOps', rating: 4 },
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'AI-Powered Portfolio Builder',
        role: 'Creator & Maintainer',
        dates: 'Mar 2024 - Present',
        description: 'Created a highly modular SaaS application allowing builders to compile rich web experiences using LLM prompts.\n• Integrated client-side canvas engines and standard vector layout generators.\n• Grew organic user base to 15,000+ monthly active developers.',
        link: 'https://github.com/alexmorgan/ai-portfolio',
        isCollapsed: false,
      },
      {
        id: 'proj-2',
        name: 'LiteSync KV Store',
        role: 'Open Source Contributor',
        dates: 'Sep 2023 - Jan 2024',
        description: 'Engineered a light-weight raft-consensus-based key-value store in Go.\n• Implemented custom WAL (Write-Ahead Logging) and state snapshot mechanics achieving 110,000 requests/sec write speeds.',
        isCollapsed: false,
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Solutions Architect Associate',
        issuer: 'Amazon Web Services',
        date: 'Oct 2024',
        description: 'Focus on highly available, fault-tolerant, and scalable distributed cloud systems.',
        isCollapsed: false,
      }
    ],
    awards: [
      {
        id: 'aw-1',
        name: 'Outstanding Engineering Alumni Award',
        issuer: 'UC Berkeley CS Department',
        date: 'May 2023',
        description: 'Awarded for contributions to open-source software and technology leadership.',
        isCollapsed: false,
      }
    ],
    languages: [
      { id: 'lang-1', name: 'English', proficiency: 'Native' },
      { id: 'lang-2', name: 'Spanish', proficiency: 'Conversational' }
    ],
    interests: ['Distributed Computing', 'Generative UI', 'Sailing', 'Coffee Roasting'],
    references: [
      {
        id: 'ref-1',
        name: 'Sarah Jenkins',
        role: 'Director of Engineering',
        company: 'Stripe',
        contact: 'sarah.j@stripe.com | (555) 123-9876',
        isCollapsed: false,
      }
    ],
    volunteer: [
      {
        id: 'vol-1',
        organization: 'Code For America',
        role: 'Volunteer Web Developer',
        dates: 'Jun 2020 - Dec 2021',
        description: 'Built digital applications and tools to improve public services in local communities.',
        isCollapsed: false,
      }
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'ATS Optimisation Benchmark',
        description: 'Ranked in the top 1% for ATS-friendly document structure scores on leading resume checking platforms.',
        date: 'Nov 2024'
      }
    ],
    publications: [
      {
        id: 'pub-1',
        title: 'Optimising Cold Starts in Hydrated Edge Applications',
        publisher: 'IEEE Software Journal',
        date: 'Aug 2022',
        link: 'https://ieee.org/publications/edge-cold-starts',
        description: 'Discussed edge container orchestration algorithms and client-side pre-hydration performance optimizations.',
        isCollapsed: false,
      }
    ],
    customSections: [
      {
        id: 'custom-1',
        title: 'Patent Portfolio',
        items: [
          {
            id: 'item-1',
            title: 'Dynamic Asset Hydration Systems',
            subtitle: 'US Patent Office - US10294829B2',
            date: 'Jun 2023',
            description: 'Co-inventor for next-generation system and method for dynamic edge pre-compilation and asset pre-hydration.'
          }
        ],
        isCollapsed: false,
      }
    ],
    templateId: 'modern-sidebar',
    accentColor: '#6366f1',
    fontFamily: 'font-sans',
    spacing: 'normal',
    showPhoto: true,
    languageCode: 'en',
  };
};
