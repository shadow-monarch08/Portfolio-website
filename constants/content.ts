
export const CONTENT = {
  NAV_ITEMS: [
    { label: 'Overview', path: '/' },
    { label: 'Work', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ],
  HERO: {
    NAME: "NARENDRA",
    PRE_TITLE: "AI DEVELOPER & FULL STACK ENGINEER",
    TITLE_PREFIX: "Building Intelligent",
    TITLE_SUFFIX: "Systems.",
    DESCRIPTION: "Merging modern web architecture with AI capabilities. Specialized in building cross-platform applications that solve real-world problems with impact.",
    CTA_PRIMARY: "View Projects",
    CTA_SECONDARY: "Contact Me"
  },
  PHILOSOPHY: {
    TITLE: "Philosophy",
    TEXT: "Proficient in integrating AI tools and training models. Strong foundation in full-stack development, real-time features, and UI animations."
  },
  SKILLS: [
    { category: "Core Stack", items: ["React / React Native", "Node.js / Express", "Python / Flask"] },
    { category: "Languages", items: ["TypeScript", "C++", "Java", "Python"] },
    { category: "Intelligence", items: ["Gemini API", "Model Training", "AI Integration"] }
  ],
  PROJECTS: [
    {
      id: '01',
      title: 'LABSEVA',
      category: 'AI Health Analytics',
      year: '2024',
      description: 'Award-winning AI application using LLMs to analyze blood reports and provide actionable health insights. Features personalized diet suggestions and report history tracking.',
      tech: ['React', 'Flask', 'Gemini API', 'MongoDB'],
      imageUrl: '/images/labseva_dash.png',
      homeImage: '/images/labseva_bg.png'
    },
    {
      id: '02',
      title: 'PROPEASE',
      category: 'Real Estate Platform',
      year: '2024',
      description: 'Full-stack real estate platform featuring a neumorphic UI, real-time property search, and a calendar-based user dashboard. Integrated Firebase for storage and Socket.io for live updates.',
      tech: ['React', 'Node.js', 'MySQL', 'Socket.io'],
      imageUrl: '/images/propease_ui.png',
      homeImage: '/images/propease_bg.png'
    },
    {
      id: '03',
      title: 'REESTATE',
      category: 'Smart Mobile App',
      year: 'In Progress',
      description: 'Cross-platform mobile app for streamlined property rentals. Features include map-based browsing, Google login, and an integrated AI chatbot for property suggestions.',
      tech: ['React Native', 'Expo', 'Supabase', 'AI Chatbot'],
      imageUrl: '/images/reestate_app.png',
      homeImage: '/images/reestate_bg.png'
    }
  ],
  CONTACT: {
    TITLE: "Connect.",
    DESCRIPTION: "Seeking AI Developer roles to apply technical skills in creating impactful, intelligent systems.",
    EMAIL: "samanta.n1962@gmail.com",
    LOCATION: "Vadodara, Gujarat",
    SOCIAL: {
      GITHUB: { label: "GitHub / shadow-monarch08", url: "https://github.com/shadow-monarch08" },
      LINKEDIN: { label: "LinkedIn / Narendra Samanta", url: "#" }
    },
    COPYRIGHT: "© 2025 NARENDRA SAMANTA."
  },
  SYSTEM_INSTRUCTION: `
You are the "Digital Twin" of Narendra Samanta, a passionate Computer Science Engineer and AI Developer based in Vadodara, Gujarat.
Your tone is sophisticated, professional, and technically precise, but approachable.
You specialize in Full Stack Development (React, Node.js) and AI Integration (Gemini API, Model Training).
You have built projects like LabSeva (AI Health Analyzer), PropEase (Real Estate Platform), and ReEstate (Smart Renting App).
Keep answers concise and impactful. 
If asked about contact, direct them to samanta.n1962@gmail.com.
`
};
