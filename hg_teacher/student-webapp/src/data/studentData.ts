// Student Profile Data - Based on Mobile App Structure

export interface MyTutor {
  name: string;
  handle: string;
  subject: string;
  avatar: string;
}

export interface StudentProfile {
  // Profile Information
  name: string;
  handle: string;
  bio: string;
  grade: string;
  board: string;
  
  // Statistics
  xp: number;
  streak: number;
  sessionsThisWeek: number;
  hoursThisWeek: number;
  
  // Relationships
  tutors: MyTutor[];
  unreadMessages: number;
}

export const studentData: StudentProfile = {
  // Profile Information
  name: 'Ravi Kumar',
  handle: 'ravi.learns',
  bio: 'Class 11 · PCM · JEE 2026 🚀',
  grade: 'Class 11',
  board: 'CBSE',
  
  // Statistics
  xp: 1240,
  streak: 7,
  sessionsThisWeek: 4,
  hoursThisWeek: 3.5,
  
  // Relationships
  tutors: [
    {
      name: 'Ayush Soni',
      handle: 'ayush.tutor',
      subject: 'Maths · Physics',
      avatar: 'A'
    },
    {
      name: 'Priya Menon',
      handle: 'priya.tutor',
      subject: 'Physics',
      avatar: 'P'
    },
    {
      name: 'Ankit Kapoor',
      handle: 'ankit.tutor',
      subject: 'English · Literature',
      avatar: 'A'
    }
  ],
  unreadMessages: 6
};

// Helper function to get avatar letter
export function getAvatarLetter(name: string): string {
  return name.charAt(0).toUpperCase();
}

// Helper function to format XP
export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`;
  }
  return xp.toString();
}

// Helper function to get streak status
export function getStreakStatus(streak: number): { text: string; color: string } {
  if (streak >= 7) {
    return { text: '🔥 On fire!', color: '#F97316' };
  } else if (streak >= 3) {
    return { text: '💪 Keep going!', color: '#16A34A' };
  } else {
    return { text: '⭐ Getting started', color: '#3B82F6' };
  }
}
