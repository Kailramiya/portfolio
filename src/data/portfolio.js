export const portfolioData = {
  personal: {
    name: "Aman Kumar",
    title: "AI/ML Engineer & Software Developer",
    email: "officialamankundu@gmail.com",
    phone: "+91 9466460761",
    location: "Raichur, Karnataka",
    summary: "AI/ML Engineer pursuing B.Tech in Computer Science at IIIT Raichur. Experienced in NLP, transformer models, real-time computer vision systems, and scalable full-stack development. Currently building AI classification pipelines & multi-tenant platforms at QuickIntell. 1000+ DSA problems solved with global rank under 3000.",
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
        "Integrated AI models for automated classification & scoring into real-time data processing pipelines on AWS, implementing configurable confidence thresholds to balance precision and recall",
        "Built a multi-tenant platform with modular architecture and PostgreSQL, supporting data isolation and concurrent task execution for scalable ML model serving",
        "Engineered a production Medicare eligibility verification bot automating an 8-step EHR workflow across 5+ plan types, cutting per-batch manual processing time by ~70% across 50+ patient batch sessions",
        "Integrated Amazon Bedrock Nova Pro vision model for dynamic OCR on live UI screenshots — extracting Member IDs and subscriber fields without hardcoded coordinates, making it resilient to UI layout changes",
        "Designed a zero-trust security architecture: every AI inference call is proxied through an AWS Lambda function that validates JWT tokens (15-min TTL, 14-min heartbeat) and checks a real-time Appwrite blacklist before invoking Bedrock"
      ],
      tech: ["Python", "AWS", "Amazon Bedrock", "PostgreSQL", "FastAPI", "PyAutoGUI", "Appwrite", "Docker"]
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
      description: "Multi-tenant SaaS with AI-powered auto-scoring across 20+ question types, GPT-4o-mini grading in under 60s, and Razorpay-based B2B subscription monetization",
      tech: ["Next.js 14", "PostgreSQL", "OpenAI Whisper", "GPT-4o-mini", "Razorpay", "JWT"],
      features: [
        "Architected multi-tenant SaaS supporting 20+ question types with subdomain-isolated environments and 4-role RBAC, serving individual students and B2B coaching centres",
        "Integrated OpenAI Whisper and GPT-4o-mini to auto-score spoken and written responses across 6 dimensions within 60s, reducing manual grading overhead by ~80%",
        "Built Razorpay subscription engine with modular plans, per-user rate limits, and centre-managed seat allocation for scalable B2B monetization without per-feature engineering overhead"
      ],
      period: "2025 – Present",
      status: "Live",
      github: "https://github.com/Kailramiya/DSIC",
      demo: "https://getprepfly.com"
    },
    {
      id: 3,
      title: "Empathy Engine – Emotionally Intelligent TTS",
      description: "Fine-tuned DistilRoBERTa for 7-class emotion classification with dynamic prosody modulation for emotionally expressive text-to-speech synthesis",
      tech: ["Python", "HuggingFace Transformers", "FastAPI", "Edge-TTS", "NLP"],
      features: [
        "Fine-tuned DistilRoBERTa for 7-class emotion classification (joy, anger, sadness, fear, surprise, disgust, neutral) with confidence-based intensity scaling",
        "Built multilingual processing with auto Hindi/Hinglish detection via Devanagari script analysis, supporting emotion analysis across 3 languages",
        "Designed dynamic prosody modulation mapping emotions to vocal parameters (rate, pitch, volume) with triple-fallback TTS architecture"
      ],
      period: "2025",
      status: "Completed",
      github: "https://github.com/Kailramiya/Empathy-engine",
      demo: null
    },
    {
      id: 4,
      title: "AI Security Monitoring System",
      description: "Real-time computer vision pipeline with multi-threaded frame processing, achieving 95% face recognition accuracy and 2.1x faster inference",
      tech: ["Python", "OpenCV", "YOLOv3", "Face Recognition", "Telegram API"],
      features: [
        "Built real-time CV pipeline with multi-threaded frame processing, achieving 95% face recognition accuracy and 2.1x faster inference",
        "Reduced false positives by 40% through optimized face embedding techniques and intelligent frame sampling",
        "Integrated real-time Telegram alerts with sub-second latency for automated incident reporting"
      ],
      period: "Aug 2024 – Nov 2024",
      status: "Completed",
      github: "https://github.com/Kailramiya/AutomatedVideoSurveillance",
      demo: "https://www.linkedin.com/posts/aman-kumar-6082321a9_python-facerecognition-computervision-activity-7342183270278647808-XEHT"
    },
    {
      id: 5,
      title: "StayEase – Property Rental & Booking Platform",
      description: "Full-stack property rental platform with AI-assisted listing ranking, Redis caching, and end-to-end booking workflows",
      tech: ["React", "Node.js", "MongoDB", "Redis", "Express.js", "JWT"],
      features: [
        "Implemented AI-assisted ranking & recommendation using weighted scoring based on user behavior signals",
        "Optimized backend with Redis caching for read-heavy APIs to improve search and listing performance",
        "Built secure authentication using JWT with httpOnly cookies and admin-ready modular REST APIs"
      ],
      period: "Sep 2024 – Present",
      status: "Live",
      github: "https://github.com/Kailramiya/StayEase",
      demo: "https://stay-ease-frontend-one.vercel.app/"
    },
    {
      id: 6,
      title: "NetworQ – Professional Networking Platform",
      description: "LinkedIn-inspired professional platform with RESTful APIs handling 1k+ daily requests with sub-150ms latency",
      tech: ["React.js", "Node.js", "MongoDB", "JWT", "Express.js"],
      features: [
        "Designed RESTful APIs handling 1k+ daily requests with sub-150ms latency, improving availability by 22%",
        "Implemented JWT-based auth with OOP principles and separation of concerns in backend design",
        "Built responsive React.js frontend with protected routing and real-time messaging"
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
      label: "Problems Solved"
    },
    {
      title: "LeetCode Rating 1540",
      detail: "500+ problems solved on LeetCode",
      stat: "1540",
      label: "LC Rating"
    },
    {
      title: "GFG Score 1422",
      detail: "400+ problems solved on GeeksforGeeks",
      stat: "1422",
      label: "GFG Score"
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
      label: "CF Max"
    },
    {
      title: "CodeChef Max 1419",
      detail: "Competitive programmer on CodeChef",
      stat: "1419",
      label: "CC Max"
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
