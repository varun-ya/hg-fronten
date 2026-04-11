// Schedule-related types

export interface ScheduledClass {
  id: number;
  student: string;
  subject: string;
  time: string;
  endTime: string;
  startHour: number;
  endMinute: number;
  duration: number;
  rate: number;
  isPaid: boolean;
  status: 'upcoming' | 'live' | 'attended' | 'missed';
  canJoin: boolean;
}

export interface SessionDetail {
  id: number;
  topic: string;
  date: string;
  status: 'attended' | 'missed';
  notes: string;
  assignments: string[];
  sharedNotes: string[];
  recordingUrl?: string;
  transcriptUrl?: string;
  chatMessages: ChatMessage[];
}

export interface ChatMessage {
  id: number;
  sender: 'tutor' | 'student';
  message: string;
  timestamp: string;
}

export interface StudentProfile {
  name: string;
  subject: string;
  avatar: string;
  isDemo: boolean;
  totalClasses: number;
  completedClasses: number;
  missedClasses: number;
  ratePerHour: number;
  sessions: SessionDetail[];
}
