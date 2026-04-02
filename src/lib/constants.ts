export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  appStore?: string;
  playStore?: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export type Education = {
  school: string;
  program: string;
  period: string;
};

export type SkillCategory = {
  title: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "ECMAScript 2024",
      "TypeScript",
      "React.js",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Query",
      "Framer Motion"
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "NestJS", "REST APIs", "GraphQL APIs", "Firebase", "GraphQL", "WebSockets", "Auth (JWT/OAuth)", "Kafka"],
  },
  {
    title: "Database",
    items: ["MongoDB", "PostgreSQL", "SQLite"],
  },
  {
    title: "Deployments",
    items: ["Vercel", "Render", "AWS", "Docker", "Google Play Store", "Apple App Store"],
  },
  {
    title: "Design",
    items: ["Figma", "Visily.ai"],
  },
  {
    title: "AI Tools",
    items: ["ChatGPT", "DeepSeek", "Gemini", "Grok", "Claude", "GitHub Copilot"],
  },
  {
    title: "Agentic AI",
    items: ["GitHub Copilot (Agent Mode)"],
  },
];

export const skills: string[] = skillCategories.flatMap((category) => category.items);

export const projects: Project[] = [
  {
    title: "Apani RadhaKrishna Gaushala",
    description: "Charity app to accept donations/contributions from Users / CSR ,Offline request queue,  push notifications, HTML to pdf for receipt and certificates downloads, and Cashfree integration.",
    tech: ["React Native", "REST APIs", "CashFree Payments"],
    github: "https://github.com/Sai-gaikwad-11",
    live: "https://play.google.com/store/apps/details?id=com.apniRadhaKrishna.gaushala",
    appStore: "https://apps.apple.com/in/app/apani-radhakrishna-gaushala/id6759546171",
    playStore: "https://play.google.com/store/apps/details?id=com.apniRadhaKrishna.gaushala",
  },
  {
    title: "Lupin CSR MIS",
    description: "A Foundation app to get survey of farmers , land and their sappling details, Offline data collection.",
    tech: ["React Native", "REST APIs", "Location tracking"],
    github: "https://github.com/Sai-gaikwad-11",
    live: "https://play.google.com/store/apps/details?id=com.lupincsrmis",
    playStore: "https://play.google.com/store/apps/details?id=com.lupincsrmis",
  },
  {
    title: "BibleAsk",
    description: "Q&A mobile app with WordPress APIs, navigation, and night mode.",
    tech: ["React Native", "WordPress API", "Deployment"],
    github: "https://github.com/Sai-gaikwad-11",
    live: "https://play.google.com/store/apps/details?id=org.bible.ask",
    appStore: "https://apps.apple.com/in/app/bibleask/id1272052738",
    playStore: "https://play.google.com/store/apps/details?id=org.bible.ask",
  },
  {
    title: "AMC (Adventist Media Centre)",
    description: "Podcast listening with audio quality, playback speed, and state management.",
    tech: ["React Native", "Audio", "State Management"],
    github: "https://github.com/Sai-gaikwad-11",
    live: "https://play.google.com/store/search?q=adventist+media+center&c=apps",
    playStore: "https://play.google.com/store/apps/details?id=com.wtt.adventistmediaCentre",
  },
  {
    title: "Bible App",
    description: "Read and bookmark Bible verses; SDK upgrades and deployment.",
    tech: ["React Native", "App Navigation", "Deployment"],
    github: "https://github.com/Sai-gaikwad-11",
    live: "https://play.google.com/store/apps/details?id=org.bibleask.bible",
    appStore: "https://apps.apple.com/in/app/bible-read-and-search-offline/id1610909824",
    playStore: "https://play.google.com/store/apps/details?id=org.bibleask.bible",
  },
  {
    title: "Health Age App",
    description: "Health scoring with IAP, PDF/Excel reports, and multi-language support.",
    tech: ["React Native", "IAP", "PDF", "i18n"],
    github: "https://github.com/Sai-gaikwad-11",
    live: "https://play.google.com/store/apps/details?id=com.wtt.healthAge",
    playStore: "https://play.google.com/store/apps/details?id=com.wtt.healthAge",
  },
  {
    title: "ICE (Indian Christian Entrepreneurs)",
    description: "SME platform for entrepreneurs with curated resources and networking.",
    tech: ["React", "Node.js", "REST APIs"],
    github: "https://github.com/Sai-gaikwad-11",
    live: "https://www.icepreneurs.com/",
  },

  {
    title: "Hydrokleen",
    description: "AC servicing and booking platform with agile delivery and client demos.",
    tech: ["React Native", "Node.js", "Agile", "REST APIs"],
    github: "https://github.com/Sai-gaikwad-11",
    live: "https://hydrokleenglobal.com/",
  },
  {
    title: "SMBEX",
    description: "E-commerce for SMEs with mapping, pagination, and real-time issue handling.",
    tech: ["React Native", "Node.js", "Leaflet", "REST APIs"],
    github: "https://smbexcustomer.wisdomtooth.tech",
    live: "https://smbexvendor.wisdomtooth.tech",
  },

];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Sai-gaikwad-11" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sai-gaikwad-855404243" },
  { label: "YouTube", href: "https://www.youtube.com/@Sigma_Coded11/videos" },
  { label: "Email", href: "mailto:gaikwadsai78@gmail.com" },
];

export const experiences: Experience[] = [
  {
    role: "Sr. Mobile App Developer",
    company: "iAssureIT",
    period: "10 Nov 2025 – Present",
    bullets: [
      "Sole developer collaborating with cross-functional teams for delivery",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Wisdom Tooth Technologies",
    period: "6 Jan 2025 – 22 Jul 2025",
    bullets: [
      "Building and managing end-to-end projects",
      "Teaching, mentoring, and guiding new joiners",
    ],
  },
  {
    role: "Software Developer",
    company: "Davzon",
    period: "1 Oct 2022 – 6 Jan 2025",
    bullets: [
      "Collaborated on multiple projects and led development phases",
      "Conducted technical assessments for new joiners",
    ],
  },
];

export const education: Education[] = [
  {
    school: "ICCS (Indira College Of Commerce & Science)",
    program: "BSC Computer Science",
    period: "2020 – 2024",
  },
  {
    school: "Dr. D.Y. Patil Vidyapeeth's",
    program: "MBA (Project Management)",
    period: "2025 – Present",
  },
];
