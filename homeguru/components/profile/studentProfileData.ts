// ── Student Profile Data Model (matching teacher profile structure) ──

export interface StudentProfile {
  name: string;
  handle: string;
  bio: string;
  about: string;
  ytLink: string;
  location: string;
  avatarUrl: string | null;
  subjects: string[];
  languages: string[];
  grade: string;
  school: string;
  aspirations: { title: string; org: string; period: string }[];
  achievements: { title: string; org: string; period: string }[];
  tutors: number;
  sessions: number;
  rating: number;
  reviewCount: number;
  successRate: string;
  responseTime: string;
  traits: string[];
  website: string;
  level: string;
  students?: number;
}

export const defaultProfile: StudentProfile = {
  name: "Ravi Kumar",
  handle: "ravi.learns",
  bio: "Class 11 student preparing for JEE 2026. Passionate about Mathematics and Physics. Love solving complex problems.",
  about: "I'm a dedicated student currently in Class 11, preparing for JEE 2026. Mathematics and Physics fascinate me, and I enjoy tackling challenging problems.\n\nI believe in consistent learning and practice. My goal is to build strong fundamentals and develop problem-solving skills. I'm working with amazing tutors on HomeGuru who make learning enjoyable.",
  ytLink: "https://youtu.be/G64LLtnjYlA",
  location: "Mumbai, India",
  avatarUrl: null,
  subjects: ["Mathematics", "Physics", "Chemistry", "JEE Prep", "Board Exams"],
  languages: ["Hindi · Native", "English · Professional", "Marathi · Good"],
  grade: "Class 11",
  school: "Delhi Public School",
  aspirations: [
    { title: "Crack JEE 2026", org: "Target: IIT Bombay", period: "2026" },
    { title: "Board Exams", org: "Target: 95%+", period: "2025" },
    { title: "Olympiad Prep", org: "Mathematics Olympiad", period: "2025" },
  ],
  achievements: [
    { title: "7-Day Learning Streak", org: "HomeGuru", period: "Jan 2025" },
    { title: "1000+ XP Earned", org: "HomeGuru", period: "Dec 2024" },
    { title: "Top Performer", org: "School Mathematics", period: "2024" },
  ],
  tutors: 3,
  sessions: 42,
  rating: 4.9,
  reviewCount: 8,
  successRate: "95%",
  responseTime: "within 1 hour",
  traits: ["Dedicated", "Curious", "Problem Solver", "Team Player"],
  website: "ravi-learns.com",
  level: "Active Learner",
};

// ── Blog data (student activity posts) ──

export interface Blog {
  title: string;
  subtitle: string;
  body: string;
  tag: string;
  readTime: string;
  date: string;
  likes: number;
  comments: number;
}

export const blogs: Blog[] = [
  {
    title: "How I improved my Math score from 60% to 90%",
    subtitle: "It wasn't about studying more hours. It was about studying smarter. Here's what changed for me...",
    body: "It wasn't about studying more hours. It was about studying smarter.\n\nWhen I started Class 11, I was struggling with Mathematics. I would spend hours solving problems but my scores weren't improving. I was frustrated and demotivated.\n\nThen I joined HomeGuru and started learning from Ayush Sir. He taught me something crucial — it's not about how many problems you solve, it's about understanding the concept behind each problem.\n\nHere's what changed:\n\n1. Focus on concepts first, then practice\n2. Solve fewer problems but understand them deeply\n3. Review mistakes instead of just moving on\n\nIn just 3 months, my score jumped from 60% to 90%. The key was quality over quantity.",
    tag: "Study Tips",
    readTime: "4 min read",
    date: "Jan 10, 2025",
    likes: 18,
    comments: 4,
  },
  {
    title: "My JEE preparation journey so far",
    subtitle: "Started preparing 6 months ago. Here's what I've learned about consistency, motivation, and dealing with pressure...",
    body: "Started preparing 6 months ago. Here's what I've learned.\n\nJEE preparation is a marathon, not a sprint. When I first started, I tried to study 10 hours a day. I burned out in 2 weeks.\n\nNow I study 5-6 hours daily but with full focus. I take breaks, exercise, and make sure I'm not just memorizing formulas but actually understanding concepts.\n\nMy tutors on HomeGuru have been amazing. They don't just teach — they mentor. When I'm stuck or demotivated, they help me get back on track.\n\nThe journey is tough but I'm learning so much. Not just about Physics and Maths, but about discipline, persistence, and believing in myself.",
    tag: "JEE Prep",
    readTime: "5 min read",
    date: "Jan 5, 2025",
    likes: 24,
    comments: 7,
  },
  {
    title: "Why I love learning Physics",
    subtitle: "Physics isn't just formulas and equations. It's about understanding how the universe works. Here's why I find it fascinating...",
    body: "Physics isn't just formulas and equations. It's about understanding how the universe works.\n\nI used to think Physics was boring — just memorizing F=ma and solving numerical problems. But my tutor Priya Ma'am changed my perspective completely.\n\nShe showed me that Physics is everywhere. When you throw a ball, when you ride a bike, when you look at the stars — it's all Physics. Understanding the 'why' behind everyday phenomena is incredibly satisfying.\n\nNow Physics is my favorite subject. I don't just solve problems to score marks — I solve them because I genuinely enjoy understanding how things work.\n\nIf you're struggling with Physics, try to see it as a way to understand the world, not just another subject to pass.",
    tag: "Physics",
    readTime: "3 min read",
    date: "Dec 28, 2024",
    likes: 15,
    comments: 3,
  },
];

// ── Reviews data (reviews from tutors about the student) ──

export interface Review {
  name: string;
  stars: number;
  text: string;
  time: string;
  subject: string;
  helpful: number;
}

export const reviews: Review[] = [
  { name: "Ayush Soni", stars: 5, text: "Ravi is an exceptional student. Always comes prepared, asks thoughtful questions, and practices regularly. His dedication to Mathematics is impressive.", time: "1 week ago", subject: "Mathematics", helpful: 5 },
  { name: "Priya Menon", stars: 5, text: "Very sincere and hardworking student. Shows genuine interest in Physics concepts. His problem-solving skills have improved significantly.", time: "2 weeks ago", subject: "Physics", helpful: 4 },
  { name: "Ankit Kapoor", stars: 4, text: "Good student with strong fundamentals. Sometimes needs extra time to grasp complex Chemistry concepts but always puts in the effort.", time: "3 weeks ago", subject: "Chemistry", helpful: 3 },
];

// ── Documents data (student achievements/certificates) ──

export interface DocCard {
  title: string;
  org: string;
  iconType: "graduation" | "exam" | "certificate" | "trophy";
  bg: string;
  fg: string;
}

export const documents: DocCard[] = [
  { title: "School ID", org: "DPS Mumbai", iconType: "graduation", bg: "#EFF6FF", fg: "#1E3162" },
  { title: "Math Olympiad", org: "Certificate", iconType: "trophy", bg: "#FFFBEB", fg: "#F59E0B" },
  { title: "Top Performer", org: "School Award", iconType: "certificate", bg: "#F0FDF4", fg: "#22C55E" },
  { title: "7-Day Streak", org: "HomeGuru", iconType: "trophy", bg: "#FFF7ED", fg: "#E08A3C" },
];

// ── Verification rows ──

export interface Verification {
  iconType: "id" | "card" | "bank" | "email" | "phone";
  label: string;
  status: string;
  verified: boolean;
}

export const verifications: Verification[] = [
  { iconType: "email", label: "Email", status: "Verified", verified: true },
  { iconType: "phone", label: "Phone", status: "Verified", verified: true },
  { iconType: "id", label: "School ID", status: "Verified", verified: true },
];

// ── Settings rows ──

export interface SettingsItem {
  iconType: "bell" | "lock" | "gear" | "help" | "logout";
  label: string;
  destructive?: boolean;
}

export const settingsItems: SettingsItem[] = [
  { iconType: "bell", label: "Notifications" },
  { iconType: "lock", label: "Privacy" },
  { iconType: "gear", label: "Account Settings" },
  { iconType: "help", label: "Help & Support" },
  { iconType: "logout", label: "Log out", destructive: true },
];

// ── Similar students (for sidebar) ──

export interface SimilarStudent {
  name: string;
  subject: string;
  grade: string;
  rating: number;
  avatar: string;
}

export const similarStudents: SimilarStudent[] = [
  { name: "Aarav Sharma", subject: "JEE Aspirant", grade: "Class 12", rating: 4.8, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aarav" },
  { name: "Priya Patel", subject: "NEET Prep", grade: "Class 11", rating: 4.9, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya" },
  { name: "Sneha Kapoor", subject: "Board Exams", grade: "Class 10", rating: 4.7, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sneha" },
];
