// Chat types and mock data

export interface Student {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  grade: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

export const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Meera Iyer",
    avatar: "MI",
    subject: "English Literature",
    grade: "Grade 11",
    lastMessage: "Thank you for the session!",
    lastMessageTime: "11:02 AM",
    unreadCount: 2,
    online: true,
  },
  {
    id: "2",
    name: "Arjun Patel",
    avatar: "AP",
    subject: "Mathematics",
    grade: "Grade 10",
    lastMessage: "Can we review the calculus problem?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    online: false,
  },
  {
    id: "3",
    name: "Priya Sharma",
    avatar: "PS",
    subject: "Physics",
    grade: "Grade 12",
    lastMessage: "I understood the concept now!",
    lastMessageTime: "2 days ago",
    unreadCount: 1,
    online: true,
  },
  {
    id: "4",
    name: "Rahul Kumar",
    avatar: "RK",
    subject: "Chemistry",
    grade: "Grade 11",
    lastMessage: "When is our next session?",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
    online: false,
  },
  {
    id: "5",
    name: "Ananya Singh",
    avatar: "AS",
    subject: "Biology",
    grade: "Grade 10",
    lastMessage: "Thanks for explaining photosynthesis!",
    lastMessageTime: "1 week ago",
    unreadCount: 0,
    online: false,
  },
];

export interface Message {
  id: string;
  from: "tutor" | "student";
  text: string;
  time: string;
  date: string;
  type?: "text" | "file" | "class";
  fileName?: string;
  fileSize?: string;
}

export interface ClassBlock {
  id: string;
  topic: string;
  date: string;
  status: "Completed" | "Scheduled" | "Missed";
  duration: string;
  summary?: string;
  assignments?: string[];
  notes?: string[];
  recording?: string;
  transcript?: string;
}

export const MOCK_CONVERSATIONS: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      from: "student",
      text: "Good morning! Ready for today's session?",
      time: "9:00 AM",
      date: "Jan 16, 2024",
    },
    {
      id: "2",
      from: "tutor",
      text: "Yes, I'm ready!",
      time: "9:02 AM",
      date: "Jan 16, 2024",
    },
    {
      id: "3",
      from: "tutor",
      text: "Shakespeare's Macbeth - Act 3 Analysis",
      time: "9:05 AM",
      date: "Jan 16, 2024",
      type: "class",
    },
    {
      id: "4",
      from: "student",
      text: "Thank you for the session!",
      time: "11:00 AM",
      date: "Jan 16, 2024",
    },
    {
      id: "5",
      from: "tutor",
      text: "You're welcome! Don't forget to complete the assignment.",
      time: "11:02 AM",
      date: "Jan 16, 2024",
    },
  ],
};
