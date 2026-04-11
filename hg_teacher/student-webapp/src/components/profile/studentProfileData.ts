// Student Profile Data Structure - Based on Mobile App

export interface StudentProfileData {
  // Basic Info
  name: string;
  handle: string;
  bio: string;
  grade: string;
  board: string;
  avatarUrl?: string;
  coverUrl?: string;
  
  // Stats
  xp: number;
  streak: number;
  sessionsThisWeek: number;
  hoursThisWeek: number;
  totalSessions: number;
  totalHours: number;
  
  // Academic
  subjects: string[];
  goals: string[];
  
  // Relationships
  tutorsCount: number;
  studyGroupsCount: number;
  
  // Activity
  joinedDate: string;
  lastActive: string;
}

export const defaultStudentProfile: StudentProfileData = {
  // Basic Info
  name: 'Ravi Kumar',
  handle: 'ravi.learns',
  bio: 'Class 11 · PCM · JEE 2026 🚀',
  grade: 'Class 11',
  board: 'CBSE',
  
  // Stats
  xp: 1240,
  streak: 7,
  sessionsThisWeek: 4,
  hoursThisWeek: 3.5,
  totalSessions: 156,
  totalHours: 89.5,
  
  // Academic
  subjects: ['Mathematics', 'Physics', 'Chemistry', 'JEE Preparation'],
  goals: [
    'Score 95%+ in Board Exams',
    'Crack JEE Advanced 2026',
    'Master Calculus',
    'Complete 200 practice problems'
  ],
  
  // Relationships
  tutorsCount: 3,
  studyGroupsCount: 2,
  
  // Activity
  joinedDate: 'June 2025',
  lastActive: 'Just now'
};

// Achievement badges
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export const studentAchievements: Achievement[] = [
  {
    id: 'streak_7',
    title: '7 Day Streak',
    description: 'Studied for 7 days in a row',
    icon: '🔥',
    earned: true,
    earnedDate: 'Today'
  },
  {
    id: 'xp_1000',
    title: '1000 XP',
    description: 'Earned 1000 experience points',
    icon: '⭐',
    earned: true,
    earnedDate: '2 days ago'
  },
  {
    id: 'sessions_100',
    title: '100 Sessions',
    description: 'Completed 100 learning sessions',
    icon: '📚',
    earned: true,
    earnedDate: '1 week ago'
  },
  {
    id: 'perfect_week',
    title: 'Perfect Week',
    description: 'Attended all scheduled classes',
    icon: '💯',
    earned: false
  }
];

// Recent activity
export interface ActivityItem {
  id: string;
  type: 'session' | 'achievement' | 'assignment' | 'quiz';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export const recentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'session',
    title: 'Completed Mathematics Session',
    description: 'Quadratic Equations with Ayush Soni',
    timestamp: '2 hours ago',
    icon: '📐'
  },
  {
    id: '2',
    type: 'achievement',
    title: 'Earned 7 Day Streak Badge',
    description: 'Keep up the great work!',
    timestamp: 'Today',
    icon: '🔥'
  },
  {
    id: '3',
    type: 'assignment',
    title: 'Submitted Physics Assignment',
    description: 'Newton\'s Laws of Motion',
    timestamp: 'Yesterday',
    icon: '✅'
  },
  {
    id: '4',
    type: 'quiz',
    title: 'Scored 92% in Chemistry Quiz',
    description: 'Organic Chemistry - Chapter 3',
    timestamp: '2 days ago',
    icon: '🎯'
  }
];
