// Chat data types matching mobile app structure

export type MessageType = 'text' | 'file' | 'image' | 'class';

export interface TextMessage {
  id: string;
  type: 'text';
  text: string;
  sender: 'tutor' | 'student';
  timestamp: Date;
}

export interface FileMessage {
  id: string;
  type: 'file' | 'image';
  fileName: string;
  fileSize: string;
  fileUrl: string;
  sender: 'tutor' | 'student';
  timestamp: Date;
}

export interface ClassBlock {
  id: string;
  type: 'class';
  topic: string;
  date: string;
  status: 'Completed' | 'Missed';
  summary: string;
  assignments: string[];
  notes: string[];
  recordingUrl?: string;
  transcriptUrl?: string;
  chatMessages: Array<{
    sender: string;
    message: string;
    time: string;
  }>;
  timestamp: Date;
}

export type Message = TextMessage | FileMessage | ClassBlock;

export interface Student {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  grade: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface ChatConversation {
  studentId: string;
  messages: Message[];
}

// Mock data for students
export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Meera Iyer',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Meera',
    subject: 'English Literature',
    grade: 'Class 12',
    lastMessage: 'Thank you for the session!',
    lastMessageTime: '10m ago',
    unreadCount: 0,
  },
  {
    id: '2',
    name: 'Arjun Patel',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Arjun',
    subject: 'Mathematics',
    grade: 'Class 11',
    lastMessage: 'Can we reschedule tomorrow\'s class?',
    lastMessageTime: '1h ago',
    unreadCount: 2,
  },
  {
    id: '3',
    name: 'Priya Sharma',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya',
    subject: 'Physics',
    grade: 'Class 12',
    lastMessage: 'I have a doubt in chapter 5',
    lastMessageTime: '3h ago',
    unreadCount: 1,
  },
  {
    id: '4',
    name: 'Rohan Kumar',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rohan',
    subject: 'Chemistry',
    grade: 'Class 11',
    lastMessage: 'Sent you the assignment',
    lastMessageTime: '5h ago',
    unreadCount: 0,
  },
  {
    id: '5',
    name: 'Sneha Kapoor',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sneha',
    subject: 'Biology',
    grade: 'Class 12',
    lastMessage: 'When is the next class?',
    lastMessageTime: '1d ago',
    unreadCount: 0,
  },
  {
    id: '6',
    name: 'Vikram Reddy',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Vikram',
    subject: 'Computer Science',
    grade: 'Class 11',
    lastMessage: 'Thanks for explaining the concept',
    lastMessageTime: '2d ago',
    unreadCount: 0,
  },
  {
    id: '7',
    name: 'Ananya Singh',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ananya',
    subject: 'Economics',
    grade: 'Class 12',
    lastMessage: 'See you tomorrow!',
    lastMessageTime: '2d ago',
    unreadCount: 0,
  },
];

// Mock chat conversations
export const MOCK_CONVERSATIONS: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      type: 'text',
      text: 'Good morning! Ready for today\'s session?',
      sender: 'tutor',
      timestamp: new Date('2024-01-16T09:00:00'),
    },
    {
      id: 'm2',
      type: 'text',
      text: 'Yes, I\'m ready!',
      sender: 'student',
      timestamp: new Date('2024-01-16T09:02:00'),
    },
    {
      id: 'c1',
      type: 'class',
      topic: 'Shakespeare\'s Macbeth - Act 3 Analysis',
      date: 'Jan 16, 2024',
      status: 'Completed',
      summary: 'Discussed the themes of ambition and guilt in Act 3. Analyzed key scenes and character development.',
      assignments: [
        'Write essay on Lady Macbeth\'s character (500 words)',
        'Read Act 4 and note important quotes',
      ],
      notes: [
        'Key themes: Ambition, Guilt, Power',
        'Important quotes from Act 3',
      ],
      recordingUrl: 'https://example.com/recording1.mp4',
      transcriptUrl: 'https://example.com/transcript1.pdf',
      chatMessages: [
        { sender: 'Meera', message: 'Can you explain the banquet scene?', time: '10:15 AM' },
        { sender: 'Tutor', message: 'Sure! The banquet scene shows...', time: '10:16 AM' },
      ],
      timestamp: new Date('2024-01-16T10:00:00'),
    },
    {
      id: 'm3',
      type: 'text',
      text: 'Thank you for the session!',
      sender: 'student',
      timestamp: new Date('2024-01-16T11:00:00'),
    },
    {
      id: 'm4',
      type: 'text',
      text: 'You\'re welcome! Don\'t forget to complete the assignment.',
      sender: 'tutor',
      timestamp: new Date('2024-01-16T11:02:00'),
    },
  ],
  '2': [
    {
      id: 'm5',
      type: 'text',
      text: 'Hi Arjun! How are you doing with the calculus problems?',
      sender: 'tutor',
      timestamp: new Date('2024-01-15T14:00:00'),
    },
    {
      id: 'm6',
      type: 'text',
      text: 'I\'m struggling with integration by parts',
      sender: 'student',
      timestamp: new Date('2024-01-15T14:05:00'),
    },
    {
      id: 'f1',
      type: 'file',
      fileName: 'Integration_Notes.pdf',
      fileSize: '2.4 MB',
      fileUrl: 'https://example.com/notes.pdf',
      sender: 'tutor',
      timestamp: new Date('2024-01-15T14:10:00'),
    },
    {
      id: 'm7',
      type: 'text',
      text: 'Check out these notes. We\'ll go through examples in our next class.',
      sender: 'tutor',
      timestamp: new Date('2024-01-15T14:11:00'),
    },
    {
      id: 'c2',
      type: 'class',
      topic: 'Calculus - Integration Techniques',
      date: 'Jan 15, 2024',
      status: 'Completed',
      summary: 'Covered integration by parts, substitution method, and partial fractions. Solved 10 practice problems.',
      assignments: [
        'Complete exercise 5.3 (problems 1-15)',
        'Practice integration by parts',
      ],
      notes: [
        'Integration by parts formula: ∫u dv = uv - ∫v du',
        'Choose u using LIATE rule',
      ],
      recordingUrl: 'https://example.com/recording2.mp4',
      transcriptUrl: 'https://example.com/transcript2.pdf',
      chatMessages: [
        { sender: 'Arjun', message: 'Can you repeat the LIATE rule?', time: '2:30 PM' },
        { sender: 'Tutor', message: 'LIATE: Logarithmic, Inverse trig, Algebraic...', time: '2:31 PM' },
      ],
      timestamp: new Date('2024-01-15T15:00:00'),
    },
    {
      id: 'm8',
      type: 'text',
      text: 'Can we reschedule tomorrow\'s class?',
      sender: 'student',
      timestamp: new Date('2024-01-16T10:00:00'),
    },
    {
      id: 'm9',
      type: 'text',
      text: 'I have a family function to attend',
      sender: 'student',
      timestamp: new Date('2024-01-16T10:01:00'),
    },
  ],
  '3': [
    {
      id: 'm10',
      type: 'text',
      text: 'Hi Priya! Ready for physics today?',
      sender: 'tutor',
      timestamp: new Date('2024-01-16T08:00:00'),
    },
    {
      id: 'm11',
      type: 'text',
      text: 'Yes! But I have a doubt in chapter 5',
      sender: 'student',
      timestamp: new Date('2024-01-16T08:05:00'),
    },
    {
      id: 'i1',
      type: 'image',
      fileName: 'doubt_question.jpg',
      fileSize: '1.2 MB',
      fileUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      sender: 'student',
      timestamp: new Date('2024-01-16T08:06:00'),
    },
    {
      id: 'm12',
      type: 'text',
      text: 'Let me check the question',
      sender: 'tutor',
      timestamp: new Date('2024-01-16T08:07:00'),
    },
  ],
};
