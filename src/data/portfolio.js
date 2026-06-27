export const portfolioData = {
  personal: {
    name: "Aman Kumar",
    title: "AI/ML Engineer & Software Developer",
    email: "officialamankundu@gmail.com",
    phone: "+91 9466460761",
    location: "Raichur, Karnataka",
    summary: "AI/ML Engineer pursuing B.Tech in Computer Science at IIIT Raichur. Experienced in NLP, transformer models, real-time computer vision systems, and scalable full-stack development. Currently building healthcare RPA automation bots, AI classification pipelines & multi-tenant platforms at QuickIntell. 1000+ DSA problems solved with global rank under 3000.",
    links: {
      linkedin: "https://www.linkedin.com/in/aman-kumar-6082321a9",
      github: "https://github.com/Kailramiya",
      leetcode: "https://leetcode.com/u/Aman_kundu/",
      gfg: "https://www.geeksforgeeks.org/user/amankundu/",
      codeforces: "https://codeforces.com/profile/amankundu",
      codechef: "https://www.codechef.com/users/kailramiya",
      portfolio: "https://amankumar-seven.vercel.app/"
    }
  },

  experience: [
    {
      id: 1,
      role: "Software Development Intern",
      company: "QuickIntell",
      period: "Feb 2026 – Present",
      status: "active",
      color: "emerald",
      description: [
        "Architected and shipped a production RPA suite of Windows automation bots that verify insurance eligibility & benefits (EVBV) across 3 major U.S. healthcare payers — BCBS California, Kaiser, and Medicare — replacing a fully manual analyst workflow for the client",
        "Automated the end-to-end 8-step pipeline per account: 2FA Windows Virtual Desktop login → Raintree EHR navigation → Waystar/Availity eligibility pull → plan classification → template population → task creation, cutting per-batch manual processing time by ~70% across 50+ patient batch sessions",
        "Built plan-type intelligence that auto-classifies QMB, Traditional Medicare, Medicare Advantage, and Medicare Secondary coverage and applies the correct documentation template or follow-up task — removing analyst decision-making and standardizing output quality",
        "Integrated Amazon Bedrock Nova Pro vision model for coordinate-free OCR on live UI screenshots — extracting Member IDs, deductibles, and therapy benefit amounts straight from the screen, making the bots resilient to EHR/portal layout changes",
        "Designed a zero-trust security architecture: every AI inference call is proxied through an AWS Lambda that validates short-lived JWTs (15-min TTL, 14-min heartbeat) and checks a real-time Appwrite blacklist before invoking Bedrock",
        "Packaged each bot as an obfuscated standalone Windows EXE (Nuitka + PyArmor) with per-client licensing, a remote kill-switch, and an admin activity-monitoring dashboard for fleet oversight across client laptops",
        "Integrated AI classification & scoring into real-time pipelines on AWS with configurable confidence thresholds, served from a multi-tenant PostgreSQL platform supporting data isolation and concurrent task execution"
      ],
      tech: ["Python", "AWS", "Amazon Bedrock", "AWS Lambda", "PostgreSQL", "PyAutoGUI", "OCR", "Nuitka", "Appwrite", "Docker"]
    },
    {
      id: 2,
      role: "AI/ML Software Development Intern",
      company: "AI4Chat",
      period: "Sep 2025 – Jan 2026",
      status: "completed",
      color: "blue",
      description: [
        "Designed scalable AI service pipelines using async processing & multithreading, increasing model inference throughput by ~40% and reducing latency by ~30%",
        "Built fault-tolerant ML serving components with retries, timeouts, and circuit breakers for reliable production performance",
        "Collaborated cross-functionally to integrate AI/ML features into production following SDLC best practices"
      ],
      tech: ["Python", "Async", "Multithreading", "ML Pipelines", "REST APIs"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "GetPrepFly – PTE Exam Practice Platform",
      description: "Multi-tenant PTE prep SaaS auto-scoring all 26 PTE question types with OpenAI Whisper + GPT-4o-mini in under 60s, with a React Native mobile app and Razorpay-based B2B monetization",
      tech: ["Next.js 14", "React Native", "PostgreSQL", "Prisma", "OpenAI Whisper", "GPT-4o-mini", "Razorpay", "Upstash Redis"],
      features: [
        "Architected a multi-tenant SaaS across 77+ API routes with 4-role RBAC (Super Admin, Centre Admin, Teacher, Student) plus per-centre isolation, branding, and question banks — serving both individual students and B2B coaching centres",
        "Built AI auto-grading for all 26 PTE question types using OpenAI Whisper (speech-to-text) + GPT-4o-mini, returning scored feedback with per-error corrections in under 60s; pinned temperature (0.2) and a fixed seed for repeatable scores and kept answer keys server-side to block cheating",
        "Engineered Razorpay monetization with HMAC-verified payments, modular per-module plans, a coupon engine, and 30-day rolling per-student seat allocation for centres — backed by Upstash Redis rate limiting (20 AI calls/min/user)"
      ],
      period: "2025 – Present",
      status: "Live",
      github: "https://github.com/Kailramiya/DSIC",
      demo: "https://getprepfly.com"
    },
    {
      id: 2,
      title: "Empathy Engine – Emotionally Intelligent TTS",
      description: "Emotion-aware multilingual text-to-speech that classifies emotion in text with a DistilRoBERTa transformer and modulates voice prosody for expressive English, Hindi & Hinglish speech",
      tech: ["Python", "HuggingFace Transformers", "FastAPI", "Edge-TTS", "PyTorch", "VADER"],
      features: [
        "Integrated a DistilRoBERTa transformer for 7-class emotion detection (joy, anger, sadness, fear, surprise, disgust, neutral), using model confidence to scale emotional intensity",
        "Built confidence-scaled prosody modulation mapping emotion to speech rate (−40%/+35%), pitch (−30/+35 Hz) and volume (−25%/+40%) over Microsoft Neural Voices, with a pyttsx3 offline fallback and VADER sentiment fallback",
        "Added Hindi/Hinglish support via Devanagari (U+0900–097F) script detection and a Google-Translate pipeline, exposed through both a FastAPI REST API and a web UI"
      ],
      period: "2025",
      status: "Completed",
      github: "https://github.com/Kailramiya/Empathy-engine",
      demo: null
    },
    {
      id: 3,
      title: "AI Security Monitoring System",
      description: "Real-time webcam surveillance that recognizes faces against a dual family/visitor database (dlib) and pushes instant Telegram photo alerts, with multi-threaded capture and recognition",
      tech: ["Python", "OpenCV", "face_recognition (dlib)", "asyncio", "Telegram Bot API"],
      features: [
        "Built a real-time CV pipeline with multi-threaded frame capture and a dedicated recognition thread, encoding faces via the dlib-based face_recognition library against a pre-loaded family database",
        "Designed a visitor-learning system that archives unknown faces into per-visitor folders so repeat visitors are auto-recognized, with a 60s alert cooldown to cut alert fatigue",
        "Integrated an async (asyncio) Telegram bot that sends live photo alerts on unknown-visitor detection and lets the user tag and categorize visitors over chat"
      ],
      period: "Aug 2024 – Nov 2024",
      status: "Completed",
      github: "https://github.com/Kailramiya/AutomatedVideoSurveillance",
      demo: "https://www.linkedin.com/posts/aman-kumar-6082321a9_python-facerecognition-computervision-activity-7342183270278647808-XEHT"
    },
    {
      id: 4,
      title: "StayEase – Property Rental & Booking Platform",
      description: "Full-stack property rental & booking platform with a weighted ranking engine, Redis-cached search, Cloudinary uploads, and end-to-end booking with date-conflict detection",
      tech: ["React 19", "Node.js", "Express", "MongoDB", "Redis", "Cloudinary"],
      features: [
        "Built a transparent ranking engine scoring listings on rating (35%), price competitiveness (25%), demand signals — views + bookings (25%), and availability (15%), surfacing 'Best Value' / 'High Demand' labels",
        "Optimized read-heavy search/listing APIs with a Redis cache layer (60s TTL) and prefix-based invalidation on create/update/delete to keep results fresh",
        "Secured auth with JWT in httpOnly cookies (with header fallback) and role-based admin middleware across modular REST routes for properties, bookings, payments, reviews and favorites"
      ],
      period: "Sep 2024 – Present",
      status: "Live",
      github: "https://github.com/Kailramiya/StayEase",
      demo: "https://stay-ease-frontend-one.vercel.app/"
    },
    {
      id: 5,
      title: "NetworQ – Professional Networking Platform",
      description: "LinkedIn-inspired social platform with JWT-authenticated profiles and a post feed, on a modular Express/MongoDB backend and a React 18 + Zustand frontend",
      tech: ["React 18", "Node.js", "Express", "MongoDB", "Zustand", "JWT"],
      features: [
        "Implemented JWT authentication with bcryptjs password hashing and token validation guarding protected API routes",
        "Built a modular Express + MongoDB (Mongoose) backend with clean separation of controllers, models, routes and middleware for profiles and posts",
        "Developed a responsive React 18 frontend with protected routing, Zustand state management, and Tailwind CSS"
      ],
      period: "Aug 2024 – Present",
      status: "Live",
      github: "https://github.com/Kailramiya/networq",
      demo: "https://networq-black.vercel.app/"
    }
  ],

  skills: {
    "AI / ML": ["PyTorch", "HuggingFace", "OpenCV", "NumPy", "Pandas", "YOLOv3"],
    "Languages": ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL"],
    "Frontend": ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
    "Backend": ["FastAPI", "Node.js", "Express.js", "RESTful APIs", "JWT", "System Design"],
    "Databases": ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    "Cloud & DevOps": ["AWS", "Docker", "Git", "Vercel", "Postman"]
  },

  achievements: [
    {
      title: "1000+ DSA Problems",
      detail: "Across LeetCode, Codeforces, GFG & CodeChef",
      stat: "1000+",
      label: "Problems Solved",
      live: "totalSolved"
    },
    {
      title: "LeetCode Rating 1540",
      detail: "500+ problems solved on LeetCode",
      stat: "1540",
      label: "LC Rating",
      live: "leetcodeRating"
    },
    {
      title: "GFG Score 1422",
      detail: "400+ problems solved on GeeksforGeeks",
      stat: "1422",
      label: "GFG Score",
      live: "gfgScore"
    },
    {
      title: "Global Rank < 3000",
      detail: "Multiple competitive programming contests",
      stat: "<3K",
      label: "Global Rank"
    },
    {
      title: "GeekStreak 2024 Top 5%",
      detail: "Deutsche Bank + GFG among 10,000+ participants",
      stat: "Top 5%",
      label: "GeekStreak"
    },
    {
      title: "Codeforces Max 1130",
      detail: "Competitive programmer on Codeforces",
      stat: "1130",
      label: "CF Max",
      live: "codeforcesMax"
    },
    {
      title: "CodeChef Max 1419",
      detail: "Competitive programmer on CodeChef",
      stat: "1419",
      label: "CC Max",
      live: "codechefMax"
    },
    {
      title: "CGPA 8.16/10",
      detail: "IIIT Raichur - Academic Excellence",
      stat: "8.16",
      label: "CGPA"
    }
  ],

  education: {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Indian Institute of Information Technology Raichur",
    period: "Aug 2023 – May 2027",
    gpa: "8.16/10.0",
    location: "Raichur, Karnataka",
    coursework: [
      "Machine Learning",
      "Design & Analysis of Algorithms",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Computer Architecture",
      "Software Engineering"
    ]
  }
};
