export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ProjectEntry = {
  name: string;
  context: string;
  description: string[];
};

export type EducationEntry = {
  degree: string;
  institution: string;
  years: string;
};

export type Resume = {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
  };
  summary: string;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  achievements: string[];
};

export const resume: Resume = {
  name: "Don Ignatius Cyriac",
  title: "Senior Front End Developer",
  contact: {
    email: "cyriacignatius@gmail.com",
    phone: "+91-8281461021",
    linkedin: "https://linkedin.com/in/don-ignatius-cyriac",
  },
  summary:
    "Senior Front End Developer (FE2) with 5+ years of experience designing and building responsive web applications in fintech and healthcare. Proficient with CSS and JS frameworks, with extensive experience in UI/UX and user psychology. Notable achievements include boosting the conversion rate of an existing website by 80% through improved code and design.",
  skills: [
    {
      category: "Tools and Technology",
      items: [
        "React",
        "Next.js",
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "Jest",
        "Webpack",
        "JIRA",
        "Mixpanel",
        "Countly",
        "Pullstate",
        "React Query",
      ],
    },
    {
      category: "Interpersonal Skills",
      items: ["Leadership", "Time Management", "Strategic Planning", "Excellent Communication"],
    },
    {
      category: "Language Skills",
      items: ["English", "Malayalam", "Hindi", "Tamil"],
    },
    {
      category: "Other Skills",
      items: ["Decision Making", "Project Management", "Stakeholder Management"],
    },
  ],
  experience: [
    {
      role: "Front End Developer",
      company: "Qure.ai",
      location: "Bangalore",
      dates: "Mar 2026–Present",
      responsibilities: [
        "Developed and maintained a React/Next.js healthcare platform for radiology workflow management",
        "Contributed to features across patient management, DICOM viewing, AI-assisted reporting, and real-time collaboration",
        "Worked on frontend architecture including state management (Pullstate, React Query)",
        "Implemented analytics instrumentation using Mixpanel and Countly",
      ],
    },
    {
      role: "Front End Developer (FE2)",
      company: "Clear (Cleartax)",
      location: "Bangalore",
      dates: "Aug 2021–Mar 2026",
      responsibilities: [
        "Worked closely with product managers and stakeholders to understand feature requirements and objectives",
        "Collaborated with designers, optimized applications, developed features, and maintained brand consistency for user-facing interfaces",
        "Utilized FE libraries like React to develop modular, reusable code components to streamline development and maintenance",
        "Wrote clean, efficient code to implement features and functionalities based on project requirements",
        "Developed, tested, and deployed features, ensuring adherence to project timelines and quality standards",
        "Troubleshot and debugged front-end issues using browser developer tools and debugging techniques",
        "Identified and addressed performance bottlenecks such as render-blocking resources, large asset sizes, and inefficient code",
        "Collaborated with back-end developers to troubleshoot integration issues and ensure seamless functionality",
        "Implemented performance optimization techniques like image compression, lazy loading, and server-side rendering",
        "Applied HTML5, CSS3, and JavaScript to create dynamic and interactive web experiences",
        "Implemented SEO best practices such as semantic HTML markup, meta tags, and structured data",
        "Monitored and analyzed website performance metrics using tools like Lighthouse and Google PageSpeed Insights",
      ],
    },
    {
      role: "Assistant System Engineer",
      company: "TCS",
      location: "Kochi",
      dates: "Mar 2017–Jul 2018",
      responsibilities: [
        "Created end-to-end user guides and support documents for the product for BFSI clients",
        "Worked with clients to set up the process for automatic web certificate renewal",
      ],
    },
  ],
  projects: [
    {
      name: "TestBuddy",
      context: "Clear Hackathon v3 — Special Mention, ₹10k",
      description: [
        "Built an Electron JS app for semi-technical roles like product and testing team members",
        "No-code, one-time setup app which handles auth, modularization, and storage of generated test cases",
      ],
    },
    {
      name: "Community",
      context: "Clear Hackathon v2",
      description: [
        "Built a comments and replies section to increase engagement on any content",
        "Designed a plug-and-play model where the content and community sections are independent",
      ],
    },
  ],
  education: [
    {
      degree: "M.Tech (CS)",
      institution: "Indian Institute of Technology, Kanpur",
      years: "2019–21 · Incomplete",
    },
    {
      degree: "B.Tech (CS)",
      institution: "Rajiv Gandhi Institute of Technology (RIT), Mahatma Gandhi University",
      years: "2012–16 · CGPA: 6.88",
    },
  ],
  achievements: [
    "Clear Hackathon Special Mention for presenting a solution to reduce time in integrated testing — 2024",
    "Spot Award for taking initiative and demonstrating strong ownership in improving engineering process — 2023",
    "Spartan Award for overachieving targets as a team — 2023",
    "Hall of Fame for delivering strong results year on year as a team — 2023",
  ],
};
