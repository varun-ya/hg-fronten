export interface TutorProfile {
  name: string;
  handle: string;
  bio: string;
  about: string;
  ytLink: string;
  location: string;
  avatarUrl: string | null;
  subjects: string[];
  languages: string[];
  pricing: Record<string, number>;
  experience: { title: string; org: string; period: string }[];
  education: { title: string; org: string; period: string }[];
  level: string;
  responseTime: string;
  successRate: string;
  website: string;
  students: number;
  sessions: number;
  rating: number;
  reviewCount: number;
  posts: number;
  highlights: string[];
  traits: string[];
  speaks: { lang: string; level: string }[];
  ratingBreakdown: Record<string, number>;
}

export const defaultProfile: TutorProfile = {
  name: 'Ayush Soni',
  handle: 'ayush.tutor',
  bio: 'Mathematics & Physics tutor with 5+ years of experience. Making complex concepts simple and fun.',
  about: 'Passionate about teaching Mathematics and Physics. I believe every student can excel with the right guidance.\n\nMy approach focuses on building strong fundamentals and problem-solving skills through real-world examples. I have helped 200+ students crack JEE and board exams.',
  ytLink: 'https://youtu.be/G64LLtnjYlA',
  location: 'Mumbai, India',
  avatarUrl: null,
  subjects: ['Mathematics', 'Physics', 'JEE Mains', 'JEE Advanced', 'Vedic Maths', 'Board Exams'],
  languages: ['Hindi · Native', 'English · Professional', 'Marathi · Good'],
  pricing: { Mathematics: 500, Physics: 500, 'JEE Prep': 700, 'Vedic Maths': 400 },
  experience: [
    { title: 'Senior Tutor', org: 'HomeGuru', period: '2023 – Present' },
    { title: 'Freelance Tutor', org: 'Self-employed', period: '2020 – 2023' },
    { title: 'Teaching Assistant', org: 'Mumbai University', period: '2019 – 2020' },
  ],
  education: [
    { title: 'B.Sc Mathematics (Hons)', org: 'Mumbai University', period: '2017 – 2020' },
    { title: 'Higher Secondary (PCM)', org: 'DPS Mumbai', period: '2015 – 2017' },
  ],
  level: 'Expert',
  responseTime: '< 1 hour',
  successRate: '98%',
  website: 'ayushsoni.com',
  students: 18,
  sessions: 156,
  rating: 4.8,
  reviewCount: 24,
  posts: 3,
  highlights: ['156+ sessions completed', '18 active students', '98% success rate', 'Expert in JEE & Boards'],
  traits: ['Patient', 'Conceptual', 'Problem-solver'],
  speaks: [
    { lang: 'Hindi', level: 'Native / Fluent' },
    { lang: 'English', level: 'Professional' },
    { lang: 'Marathi', level: 'Conversational' },
  ],
  ratingBreakdown: { clarity: 4.9, preparation: 4.8, punctuality: 5.0, engagement: 4.7 },
};

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
    title: 'How I teach Quadratic Equations differently',
    subtitle: 'Most students memorize formulas. I teach them to see patterns. Here\'s my approach that helped 50+ students ace their exams...',
    body: 'Most students memorize formulas. I teach them to see patterns.\n\nWhen I first started teaching quadratic equations, I noticed that students would blindly apply the formula without understanding what they were actually solving for. The discriminant, the roots, the graph — it was all disconnected in their minds.\n\nSo I changed my approach. Instead of starting with ax² + bx + c = 0, I start with a real problem. "A ball is thrown upward at 20 m/s. When does it hit the ground?" Suddenly, the equation has meaning.\n\nHere\'s my 3-step method:\n\n1. Start with the story — every quadratic has a real-world context\n2. Visualize the parabola — draw it, feel it, understand the shape\n3. Then solve — now the formula makes sense\n\nThis approach has helped 50+ students not just pass, but actually enjoy quadratics. The key is making math feel like a puzzle, not a punishment.',
    tag: 'Mathematics', readTime: '5 min read', date: 'Dec 12, 2024', likes: 24, comments: 5,
  },
  {
    title: 'Why most students fail at Physics — and how to fix it',
    subtitle: 'Physics isn\'t about memorizing equations. It\'s about understanding the world around you. The biggest mistake students make is...',
    body: 'Physics isn\'t about memorizing equations. It\'s about understanding the world around you.\n\nThe biggest mistake students make is treating physics like a formula sheet. They memorize F=ma, v=u+at, and hope for the best. But physics is fundamentally about asking "why does this happen?"\n\nWhen I teach Newton\'s laws, I don\'t start with the textbook. I start by pushing a chair across the room. "Why did it stop?" "Why did it need a push to start?" These simple questions lead to deep understanding.\n\nMy students who struggled with physics often had the same problem — they were trying to memorize instead of understand. Once we shifted to conceptual thinking, their scores jumped by 30-40% on average.\n\nThe fix is simple: before solving any problem, explain the physics in plain English. If you can\'t explain it simply, you don\'t understand it well enough.',
    tag: 'Physics', readTime: '8 min read', date: 'Dec 5, 2024', likes: 42, comments: 12,
  },
  {
    title: 'My journey from student to tutor',
    subtitle: 'I was an average student in class 10. Failed my first maths test. But one teacher changed everything for me. This is that story...',
    body: 'I was an average student in class 10. Failed my first maths test.\n\nI remember staring at the red marks on my paper, feeling like mathematics was a language I\'d never speak. My parents were worried. I was frustrated.\n\nThen Mr. Sharma happened. He was a new maths teacher who did something no one else had done — he asked me what I found confusing. Not "study harder" or "pay attention." He actually listened.\n\nHe spent 30 minutes after school showing me that algebra was just like solving a mystery. "x is the suspect. The equation is the clue. Your job is to find x." Something clicked.\n\nBy class 12, I scored 95 in mathematics. I went on to study B.Sc Maths. And now, 5 years later, I\'m doing for my students what Mr. Sharma did for me.\n\nTeaching isn\'t about knowing everything. It\'s about remembering what it felt like to not know — and helping someone through that moment.',
    tag: 'Personal', readTime: '4 min read', date: 'Nov 28, 2024', likes: 18, comments: 3,
  },
];

export interface Review {
  name: string;
  stars: number;
  text: string;
  time: string;
  subject: string;
  helpful: number;
}

export const reviews: Review[] = [
  { name: 'Aarav Sharma', stars: 5, text: 'Absolutely brilliant teacher. He made quadratic equations feel like solving a puzzle. My son went from failing maths to scoring 92%. Cannot recommend enough.', time: '2 days ago', subject: 'Mathematics', helpful: 12 },
  { name: 'Priya Patel', stars: 4, text: 'Very knowledgeable and patient. Explains physics concepts with real-world examples which makes it easy to remember. Only wish sessions were longer.', time: '1 week ago', subject: 'Physics', helpful: 8 },
  { name: 'Rohan Gupta', stars: 5, text: 'Best maths tutor I have ever had. His Vedic maths tricks are amazing — I can do calculations 3x faster now. Worth every rupee.', time: '2 weeks ago', subject: 'Vedic Maths', helpful: 15 },
  { name: 'Sneha Kapoor', stars: 5, text: 'Helped me prepare for JEE in just 3 months. His problem-solving approach is unique and very effective. Cleared JEE Mains with 98 percentile.', time: '1 month ago', subject: 'JEE Prep', helpful: 22 },
  { name: 'Amit Desai', stars: 4, text: 'Good teacher with deep subject knowledge. Sometimes goes a bit fast but always willing to re-explain. My daughter improved significantly.', time: '1 month ago', subject: 'Mathematics', helpful: 6 },
];

export interface DocCard {
  title: string;
  org: string;
  icon: string;
  bg: string;
  fg: string;
}

export const documents: DocCard[] = [
  { title: 'B.Sc Degree', org: 'Mumbai University', icon: 'graduation', bg: '#EFF6FF', fg: '#1E3162' },
  { title: 'JEE Scorecard', org: 'NTA', icon: 'exam', bg: '#F0FDF4', fg: '#22C55E' },
  { title: 'Teaching Cert', org: 'Coursera', icon: 'certificate', bg: '#FFF7ED', fg: '#E08A3C' },
  { title: 'Top Tutor Award', org: 'HomeGuru', icon: 'trophy', bg: '#FFFBEB', fg: '#F59E0B' },
];

export const credentials = [
  { title: 'Top Rated Tutor', org: 'HomeGuru', date: 'Jan 2025', desc: 'Awarded for 4.8+ rating across 150+ sessions.' },
  { title: 'B.Sc Mathematics (Hons)', org: 'Mumbai University', date: '2017 – 2020', desc: 'First class with distinction.' },
  { title: 'JEE Advanced Qualified', org: 'NTA', date: '2017', desc: 'AIR 2450. Top 0.5% of 1.2M candidates.' },
  { title: 'Advanced Teaching Methods', org: 'Coursera · U of Michigan', date: 'Aug 2023', desc: '6-week program on modern pedagogy.' },
];

export const verifications = [
  { icon: 'id', label: 'Aadhaar', status: 'Verified', verified: true },
  { icon: 'card', label: 'PAN Card', status: 'Verified', verified: true },
  { icon: 'bank', label: 'Bank Account', status: 'HDFC ····4521', verified: true },
  { icon: 'email', label: 'Email', status: 'Verified', verified: true },
  { icon: 'phone', label: 'Phone', status: 'Verified', verified: true },
];

export const settingsItems = [
  { icon: 'bell', label: 'Notifications' },
  { icon: 'lock', label: 'Privacy' },
  { icon: 'gear', label: 'Account Settings' },
  { icon: 'help', label: 'Help & Support' },
  { icon: 'logout', label: 'Log out', destructive: true },
];

export interface SimilarTutor {
  name: string;
  subject: string;
  price: number;
  rating: number;
  avatar: string;
}

export const similarTutors: SimilarTutor[] = [
  { name: 'Priya Menon', subject: 'Python & AI', price: 1200, rating: 4.8, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya' },
  { name: 'Ravi Kumar', subject: 'Guitar', price: 600, rating: 5.0, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ravi' },
  { name: 'Sneha Patel', subject: 'IELTS English', price: 900, rating: 4.7, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sneha' },
];
