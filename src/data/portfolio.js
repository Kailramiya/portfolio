export const portfolioData = {
  personal: {
    name: "Aman Kumar",
    title: "Full-Stack Software Engineer",
    email: "officialamankundu@gmail.com",
    phone: "+91 9466460761",
    location: "Raichur, Karnataka",
    summary: "Full-stack software engineer pursuing B.Tech in Computer Science at IIIT Raichur. Proficient in MERN stack architecture, machine learning algorithms, and scalable system optimization. Smart India Hackathon 2024 finalist with expertise in delivering enterprise-grade solutions.",
    links: {
      linkedin: "https://www.linkedin.com/in/aman-kumar-6082321a9",
      github: "https://github.com/Kailramiya",
      leetcode: "https://leetcode.com/u/Aman_kundu/",
      gfg: "https://www.geeksforgeeks.org/user/amankundu/",
      codeforces: "https://codeforces.com/profile/amankundu",
      
    }
  },
  
  projects: [
    {
  id: 2,
  title: "StayEase – Property Rental & Booking Platform",
  description: "Full-stack property rental and booking platform with AI-assisted listing ranking, caching, and end-to-end booking workflows",
  tech: [
    "React",
    "Vite",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "Redis",
    "JWT",
    "Axios"
  ],
  features: [
    "End-to-end rental flow including property listings, bookings, reviews, and favorites",
    "Secure authentication using JWT with httpOnly cookies",
    "AI-assisted property ranking based on views, ratings, bookings, and recency",
    "Redis caching for read-heavy APIs to improve search and listing performance",
    "Admin-ready backend architecture with modular REST APIs"
  ],
  period: "Sep 2024 – Present",
  status: "Live",
  github: "https://github.com/Kailramiya/StayEase",
  demo: "https://stay-ease-frontend-one.vercel.app/"
},

    {
      id: 2,
      title: "NetworQ - Enterprise Networking Platform",
      description: "LinkedIn-inspired professional platform serving 500+ registered users with real-time messaging capabilities",
      tech: ["React.js", "Node.js", "MongoDB", "JWT", "Tailwind CSS","Express.js","Mongoose","Axios"],
      features: [
        "Responsive React.js frontend with protected routing",
        "Secure JWT authentication with 99.9% uptime",
        "RESTful API handling 1000+ daily requests",
        "Real-time messaging system"
      ],
      period: "Aug 2024 – Present",
      status: "Live",
      github: "https://github.com/Kailramiya/networq",
      demo: "https://networq-black.vercel.app/"
    },
   
    {
      id: 3,
      title: "AI-Powered Security Monitoring System",
      description: "Real-time surveillance solution with facial recognition achieving 95% accuracy",
      tech: ["Python", "OpenCV", "Face Recognition", "Telegram API"],
      features: [
        "95% facial recognition accuracy",
        "Telegram instant alerts",
        "Cloud-based storage",
        "40% reduction in false positives"
      ],
      period: "Aug 2024 – Nov 2024",
      status: "Completed",
      github: "https://github.com/Kailramiya/AutomatedVideoSurveillance",
      demo: "https://github.com/Kailramiya/AutomatedVideoSurveillance/tree/main/results"
    },
    {
      id: 4,
      title: "Vehicle Detection and Counting Using YOLOv3",
      description: "This project detects and counts vehicles in a video using YOLOv3 and Python's OpenCV library.",
      tech: ["Python", "OpenCV", "NumPy", "Tkinter"],
      features: [
        "Detects vehicles: Cars, Motorbikes, Buses, Trucks",
        "Tracks and counts vehicles crossing a line in the frame",
        "Displays real-time frame, count, and video time"
      ],
      period: "Jan 2024 - May 2024", // You can add the project timeline here
      status: "Completed",
      github: "https://github.com/Kailramiya/Vehicle-Detection-and-Counting-using-yolov-",
      demo: "https://github.com/Kailramiya/Vehicle-Detection-and-Counting-using-yolov-/tree/main/results" // Add demo link if available
    },
    {
      id: 5,
      title: "StayEase - Property Rental & Booking Platform",
      description: "Full‑stack property rental and booking platform providing end‑to‑end booking flows for guests and an admin interface for hosts and property managers",
      tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Cloudinary", "Axios", "JWT"],
      features: [
      "End-to-end booking flow with guest & host interfaces",
      "Favorites, reviews, and contact-owner (server-side email)",
      "Cloudinary-powered image uploads for properties",
      "Local/mock payment flow for development and testing (no external keys required)",
      "Cookie-based client auth persistence and axios API wrapper reading tokens from cookies",
      "Admin panel for property and booking management"
      ],
      period: "Aug 2025 - Nov 2025",
      status: "Live (demo placeholder)",
      github: "https://github.com/Kailramiya/StayEase",
      demo: "https://stay-ease-frontend-one.vercel.app"
      },


  ],

  skills: {
    "Programming Languages": ["C", "C++", "Python", "JavaScript", "SQL"],
    "Frontend": ["React.js", "HTML5", "CSS3", "Tailwind CSS", "EJS", "Bootstrap","Responsive Web Optimization"],
    "Backend": ["Node.js", "Express.js", "RESTful APIs", "JWT", "Microservices"],
    "Database": ["MongoDB", "MySQL", "Query Optimization"],
    "AI/ML": ["OpenCV", "YOLOv3", "NumPy", "Pandas", "Computer Vision"],
    "DevOps": ["Git",  "Postman"]
  },

  achievements: [
    "Smart India Hackathon 2024 Finalist — DRDO Project",
    "Global Rank under 3000 in competitive programming",
    "700+ Data Structure problems solved",
    "GeekStreak2024 Top 5% performer",
    "Cybersecurity Certified in Ethical Hacking"
  ],

  education: {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Indian Institute of Information Technology Raichur",
    period: "Aug 2023 – May 2027",
    gpa: "8.3/10.0",
    location: "Raichur, Karnataka",
    coursework:["Data Structures & Algorithms", "Database Management Systems", "Operating Systems"," Software Engineering",
" Machine Learning Fundamentals"]
  }
};
