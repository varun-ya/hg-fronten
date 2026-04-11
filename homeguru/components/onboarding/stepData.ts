// Matches mobile app's step_data.dart exactly

export interface StepData {
  owlSays: string;
  title: string;
  subtitle: string;
  options: string[];
  color: string;
}

export const STEPS: StepData[] = [
  {
    owlSays: "Let's get you signed up first — takes a few seconds.",
    title: 'Create your account',
    subtitle: "We'll send an OTP to your WhatsApp.",
    options: [],
    color: '#1E3162',
  },
  {
    owlSays: 'Hi, I am Hoot! 👋 Quick one — where did you hear about me?',
    title: 'Where did you hear about us?',
    subtitle: 'Just curious — helps us spread the word better.',
    options: ['Instagram', 'YouTube', 'Google Search', 'Friend / Family', 'School / College', 'Other'],
    color: '#6366F1',
  },
  {
    owlSays: 'What gets you excited to learn?',
    title: 'What are you more interested in?',
    subtitle: 'This helps us tailor your learning experience.',
    options: ['Academic', 'Non-Academic'],
    color: '#8B5CF6',
  },
  {
    owlSays: 'Ooh, pick something fun!',
    title: 'What do you want to focus on?',
    subtitle: 'Pick a subject that excites you the most.',
    options: [],
    color: '#F97316',
  },
  {
    owlSays: 'No wrong answers here, be honest!',
    title: 'How much do you already know?',
    subtitle: 'So we can start at the right level for you.',
    options: [],
    color: '#22C55E',
  },
  {
    owlSays: 'Fun fact — learners who learn 1-on-1 outperform 98% of classroom students. Let that sink in.',
    title: 'One last thing',
    subtitle: "Sign up for free and we'll build a learning path that actually fits you — not some generic syllabus.",
    options: [],
    color: '#F59E0B',
  },
  {
    owlSays: 'Almost done! Tell me a bit about yourself.',
    title: 'About you',
    subtitle: 'This helps us personalise everything.',
    options: [],
    color: '#EC4899',
  },
  {
    owlSays: 'One more — what board and class are you in?',
    title: 'Your school details',
    subtitle: 'So we can match the right syllabus.',
    options: [],
    color: '#22C55E',
  },
];

export const ACADEMIC_SUBJECTS = [
  'Mathematics', 'Science', 'English', 'Social Studies',
  'Hindi', 'Computer Science', 'Accountancy', 'Economics',
  'Others',
];

export const NON_ACADEMIC_SUBJECTS = [
  'Music', 'Dance', 'Art & Design', 'Coding',
  'Languages', 'Public Speaking', 'Photography', 'Creative Writing',
  'Others',
];

export const LEARNER_CATEGORIES = ['Student', 'Aspirant', 'College Student', 'Working Professional', 'Homemaker', 'Sr. Citizen'];

export const BOARDS = ['CBSE', 'State Board', 'ICSE', 'IB', 'IGCSE'];

const YEAR_BOARDS = new Set(['IB', 'IGCSE']);

export function classesForBoard(boardIndex: number): string[] {
  const board = BOARDS[boardIndex];
  return Array.from({ length: 12 }, (_, i) =>
    YEAR_BOARDS.has(board) ? `Year ${i + 1}` : `Grade ${i + 1}`
  );
}

// ── Aspirant exam data ──
export const EXAM_DATA: Record<string, Record<string, string[]>> = {
  'Engineering': {
    'IIT / NIT Prep': ['JEE Main', 'JEE Advanced'],
    'Private Colleges': ['BITSAT', 'VITEEE', 'SRMJEEE'],
  },
  'Medical': {
    'UG Medical': ['NEET UG'],
    'PG Medical': ['NEET PG', 'AIIMS Entrance'],
  },
  'Govt Jobs': {
    'Civil Services': ['UPSC CSE'],
    'SSC': ['SSC CGL', 'SSC CHSL'],
    'Banking': ['IBPS PO', 'SBI PO'],
    'Railway': ['RRB NTPC'],
  },
  'Law & Commerce': {
    'Law': ['CLAT', 'AILET'],
    'CA / CS': ['CA Foundation', 'CA Inter', 'CS Executive'],
  },
  'MBA': {
    'India': ['CAT', 'XAT'],
    'Global': ['GMAT'],
  },
  'Study Abroad': {
    'English': ['IELTS', 'TOEFL'],
    'UG Abroad': ['SAT', 'ACT'],
    'PG Abroad': ['GRE'],
  },
  'Olympiads': {
    '': ['Olympiad Exams'],
  },
};

// ── College data ──
export const COLLEGE_COURSES_GROUPED: Record<string, string[]> = {
  'Engineering & Tech': ['B.Tech / BE', 'M.Tech'],
  'Computer Applications': ['BCA', 'MCA'],
  'Commerce & Business': ['B.Com', 'M.Com', 'BBA', 'MBA'],
  'Law': ['LLB', 'BA LLB', 'LLM'],
  'Science': ['B.Sc', 'M.Sc'],
  'Humanities & Arts': ['BA', 'MA'],
  'Education': ['B.Ed', 'M.Ed'],
  'Medical & Healthcare': ['MBBS', 'BDS', 'B.Pharm', 'Nursing'],
  'Design & Creative': ['B.Des', 'M.Des', 'Fine Arts'],
  'Professional Courses': ['CA Foundation', 'CA Intermediate', 'CS Executive', 'CFA'],
};

export const COLLEGE_BRANCHES: Record<string, string[]> = {
  'B.Tech / BE': ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics', 'IT', 'Chemical', 'Others'],
  'M.Tech': ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics', 'Others'],
  'B.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Others'],
  'M.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Others'],
  'B.Com': ['General', 'Honours', 'Accounting', 'Finance', 'Others'],
  'M.Com': ['General', 'Finance', 'Others'],
  'BA': ['English', 'History', 'Political Science', 'Psychology', 'Economics', 'Sociology', 'Others'],
  'MA': ['English', 'History', 'Political Science', 'Psychology', 'Economics', 'Others'],
  'BBA': ['General', 'Finance', 'Marketing', 'HR', 'Others'],
  'MBA': ['Finance', 'Marketing', 'HR', 'Operations', 'IT', 'Others'],
  'BCA': ['General', 'Others'],
  'MCA': ['General', 'Others'],
  'B.Des': ['Product Design', 'Communication Design', 'Fashion Design', 'Others'],
  'M.Des': ['Product Design', 'Communication Design', 'Others'],
  'Fine Arts': ['Painting', 'Sculpture', 'Applied Arts', 'Others'],
  'LLB': ['General', 'Others'],
  'BA LLB': ['General', 'Others'],
  'LLM': ['Constitutional Law', 'Corporate Law', 'Criminal Law', 'Others'],
};

export const COLLEGE_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

export const COUNTRY_CODES: [string, string][] = [
  ['+91', 'India'], ['+1', 'United States'], ['+44', 'United Kingdom'], ['+61', 'Australia'],
  ['+971', 'UAE'], ['+966', 'Saudi Arabia'], ['+65', 'Singapore'], ['+60', 'Malaysia'],
  ['+977', 'Nepal'], ['+94', 'Sri Lanka'], ['+880', 'Bangladesh'], ['+92', 'Pakistan'],
  ['+86', 'China'], ['+81', 'Japan'], ['+82', 'South Korea'], ['+49', 'Germany'],
  ['+33', 'France'], ['+39', 'Italy'], ['+34', 'Spain'], ['+7', 'Russia'],
  ['+55', 'Brazil'], ['+27', 'South Africa'], ['+234', 'Nigeria'], ['+254', 'Kenya'],
  ['+63', 'Philippines'], ['+62', 'Indonesia'], ['+66', 'Thailand'], ['+84', 'Vietnam'],
  ['+52', 'Mexico'], ['+54', 'Argentina'],
];
