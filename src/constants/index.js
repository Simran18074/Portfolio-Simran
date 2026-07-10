import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaDatabase, FaServer, FaTools, FaCode, FaRobot 
} from 'react-icons/fa';
import { 
  SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiMysql, SiWebrtc, SiSocketdotio, SiElectron 
} from 'react-icons/si';

export const HERO_DATA = {
  name: "Simran",
  roles: ["Full Stack Developer", "Software Engineer", "MERN Stack Specialist"],
  resumeUrl: "https://drive.google.com/file/d/1QsGhUIOTuWF3ND5jB6cA0Ed1FLCuNqLr/view?usp=drive_link",
  githubUrl: "https://github.com/Simran18074",
  linkedinUrl: "https://www.linkedin.com/in/simran-52742837a",
};

export const ABOUT_DATA = {
  story: "I am a detail-oriented Software Engineer and Full Stack Developer with hands-on internship experience designing, building, and deploying robust web applications and native desktop structures. Highly proficient across the MERN stack (MongoDB, Express.js, React.js, Node.js) and relational databases (MySQL). I enjoy integrating real-time communication modules, implementing secure JWT authorization layers, and compiling smooth user interfaces that perform efficiently across all devices.",
  stats: [
    { label: "Months of Internship", value: 6, suffix: " Mos" },
    { label: "Projects Completed", value: 8, suffix: "+" },
    { label: "B.Tech Cumulative GPA", value: 8.69, suffix: "/10" },
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Deenbandhu Chhotu Ram University of Science and Technology (DCRUST), Murthal",
      duration: "2022 - 2026",
      description: "Focused on Software Engineering, Data Structures, Relational Databases, Computer Vision, and Web Development. Graduated with a cumulative GPA of 8.69/10.0."
    }
  ]
};

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend",
    icon: FaReact,
    skills: [
      { name: "React.js", percentage: 90, icon: FaReact, color: "#61DAFB" },
      { name: "JavaScript (ES6+)", percentage: 88, icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", percentage: 86, icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML5 / CSS3", percentage: 92, icon: FaHtml5, color: "#E34F26" }
    ]
  },
  {
    id: "backend",
    title: "Backend & RTC",
    icon: FaNodeJs,
    skills: [
      { name: "Node.js", percentage: 85, icon: FaNodeJs, color: "#339933" },
      { name: "Express.js", percentage: 84, icon: SiExpress, color: "#000000" },
      { name: "Socket.IO", percentage: 80, icon: SiSocketdotio, color: "#010101" },
      { name: "WebRTC", percentage: 75, icon: SiWebrtc, color: "#38BDF8" }
    ]
  },
  {
    id: "database",
    title: "Database",
    icon: FaDatabase,
    skills: [
      { name: "MySQL", percentage: 82, icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", percentage: 70, icon: SiMongodb, color: "#47A248" }
    ]
  },
  {
    id: "tools",
    title: "Tools & Automation",
    icon: FaTools,
    skills: [
      { name: "Git & GitHub", percentage: 88, icon: FaGitAlt, color: "#F05032" },
      { name: "Automation & Scraping", percentage: 84, icon: FaRobot, color: "#00FF66" },
      { name: "Electron", percentage: 76, icon: SiElectron, color: "#478CBF" },
      { name: "Postman", percentage: 85, icon: SiPostman, color: "#FF6C37" }
    ]
  }
];

export const PROJECTS_DATA = [
  {
    id: "ai-csv-parser",
    title: "AI-Powered CSV Parser",
    tagline: "Automated schema mapping and data validation dashboard",
    description: "A full-stack utility designed to upload, parse, and validate CSV file data. Leverages AI models to map raw, mismatched columns to target database schemas in real time, featuring an interactive grid to edit validation errors before final injection.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Gemini API"],
    features: [
      "Dynamic header mapping converting user file labels into database targets",
      "Interactive spreadsheet grid rendering validations and editable row fields",
      "High-throughput server pipelines supporting large-file CSV parsing",
      "Comprehensive error logs detailing missing or malformed field errors"
    ],
    github: "https://github.com/Simran18074/AI-CSV-Parser",
    live: "https://github.com/Simran18074/AI-CSV-Parser",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "chat-app",
    title: "Real-Time Chat & Video Platform",
    tagline: "Instant messaging & Peer Video via WebSockets & WebRTC",
    description: "A secure collaborative workspace featuring private real-time text threads, active typing indicators, online user presence status, peer-to-peer video calling, and file sharing buffers.",
    tech: ["React.js", "Node.js", "Express", "Socket.IO", "WebRTC", "MongoDB"],
    features: [
      "Real-time bidirectional messaging powered by Socket.IO with typing indicators",
      "Direct point-to-point browser video calling using WebRTC with media stream controls",
      "Secure user authorization gates leveraging JSON Web Tokens (JWT)",
      "Persistent chat history storage with optimized MongoDB database schemas"
    ],
    github: "https://github.com/Simran18074/chatApp",
    live: "https://github.com/Simran18074/chatApp",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "hand-art",
    title: "HandArt – Gesture Recognition App",
    tagline: "AI computer vision hand tracking interface",
    description: "An AI-powered web canvas incorporating Google's MediaPipe framework to capture video stream inputs, track hand coordinates, and translate gestures into visual actions.",
    tech: ["React.js", "MediaPipe", "HTML5 Canvas", "Web Streams", "Tailwind CSS"],
    features: [
      "Real-time hand skeleton keypoint mapping using MediaPipe tracking pipelines",
      "Optimized canvas drawing buffer interface preventing frame drops during streams",
      "Gesture-triggered cursor controls and brush drawing properties",
      "Responsive panel settings to configure video quality and tracker thresholds"
    ],
    github: "https://github.com/Simran18074",
    live: "https://github.com/Simran18074",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pet-adoption",
    title: "Pet Adoption & Care Hub",
    tagline: "Interactive community matching board",
    description: "A responsive MERN portal allowing users to filter pet listings, fill adopt applications, schedule veterinary coordinates, and make support donations.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Custom multi-criteria search and filter systems for pet breeds and age ranges",
      "Interactive calendar planner to schedule shelter coordinator visits",
      "Secure dashboard panels for shelters to update pet statuses",
      "Smooth layout transitions and modal structures using Framer Motion"
    ],
    github: "https://github.com/Simran18074",
    live: "https://github.com/Simran18074",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "auth-gateway",
    title: "Secure Authentication API Gateway",
    tagline: "JWT and Session Security Service Boilerplate",
    description: "An API gateway template containing password hashing, automated mail verifiers, token rotation cycles, and session logging statistics.",
    tech: ["Node.js", "Express.js", "MongoDB", "Nodemailer", "JWT", "Bcrypt"],
    features: [
      "OAuth 2.0 social logins and secure cookie authorization models",
      "Double-opt-in email activations with verification code hooks",
      "Automatic session termination and token refresh lifecycles",
      "Strict input schemas and API error response parsers"
    ],
    github: "https://github.com/Simran18074",
    live: "https://github.com/Simran18074",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
  }
];

export const EXPERIENCE_DATA = [
  {
    id: "exp-1",
    role: "Full Stack Developer Intern",
    company: "Aarixa Innovix Pvt. Ltd.",
    location: "Hybrid",
    duration: "Jan 2026 - Jul 2026",
    description: "Developed backend REST APIs, designed relational database schemas, and structured responsive UI elements. Built core components for an Electron-based desktop application integrating web pages into native desktop layers.",
    highlights: ["Node.js & Express REST APIs", "React UI components & Tailwind CSS", "Electron desktop native wrappers", "SQL performance tuning"]
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    title: "Academic Excellence Honors",
    issuer: "DCRUST Murthal",
    description: "Maintained a cumulative GPA of 8.69 / 10.0 in Computer Science & Engineering, demonstrating strong technical foundations."
  },
  {
    title: "AI Gesture App Innovations",
    issuer: "MediaPipe Dev Network",
    description: "Engineered real-time hand skeleton trackers with canvas vector drawings, rendering smoothly at 60 FPS in browsers."
  },
  {
    title: "Active Open-Source Contributor",
    issuer: "GitHub Developer Network",
    description: "Contributed real-time WebSocket messaging structures, WebRTC calling scripts, and secure MERN boilers."
  }
];

export const TESTIMONIALS_DATA = [
  {
    quote: "Simran is a talented developer who quickly picks up complex workflows. During the internship, they built core Node.js APIs and integrated web scripts into our Electron desktop shell with absolute precision.",
    author: "Senior Developer",
    role: "Aarixa Innovix Pvt. Ltd.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Working on academic projects alongside Simran was excellent. They possess a deep understanding of React states and Socket.IO servers, taking charge of writing secure user sessions and real-time models.",
    author: "Project Collaborator",
    role: "CS Peer, DCRUST Murthal",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  }
];
