import { StudentProfile } from '@/types/schedule';

export const STUDENT_PROFILES: Record<string, StudentProfile> = {
  "Meera Iyer": {
    name: "Meera Iyer",
    subject: "English Literature",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Meera Iyer",
    isDemo: false,
    totalClasses: 24,
    completedClasses: 22,
    missedClasses: 2,
    ratePerHour: 800,
    sessions: [
      {
        id: 1,
        topic: "Shakespeare's Hamlet - Act 3 Analysis",
        date: "Jan 15, 2024",
        status: "attended",
        notes: "Discussed the famous 'To be or not to be' soliloquy. Student showed excellent understanding of themes.",
        assignments: ["Essay on Hamlet's character development", "Read Act 4 and 5"],
        sharedNotes: ["Hamlet_Act3_Summary.pdf", "Character_Analysis_Notes.pdf"],
        recordingUrl: "https://example.com/recording/1",
        transcriptUrl: "https://example.com/transcript/1",
        chatMessages: [
          { id: 1, sender: "student", message: "Can you explain the significance of the play within a play?", timestamp: "10:15 AM" },
          { id: 2, sender: "tutor", message: "Great question! The play within a play is Hamlet's way of confirming Claudius's guilt...", timestamp: "10:16 AM" },
          { id: 3, sender: "student", message: "That makes sense now, thank you!", timestamp: "10:18 AM" }
        ]
      },
      {
        id: 2,
        topic: "Poetry Analysis - Romantic Era",
        date: "Jan 12, 2024",
        status: "attended",
        notes: "Covered Wordsworth and Coleridge. Student needs more practice with meter analysis.",
        assignments: ["Analyze 'Tintern Abbey'", "Compare two Romantic poems"],
        sharedNotes: ["Romantic_Poetry_Guide.pdf"],
        recordingUrl: "https://example.com/recording/2",
        transcriptUrl: "https://example.com/transcript/2",
        chatMessages: [
          { id: 4, sender: "student", message: "What's the difference between iambic pentameter and trochaic meter?", timestamp: "3:20 PM" },
          { id: 5, sender: "tutor", message: "Iambic pentameter has unstressed-stressed pattern, while trochaic is stressed-unstressed...", timestamp: "3:21 PM" }
        ]
      },
      {
        id: 3,
        topic: "Essay Writing Techniques",
        date: "Jan 8, 2024",
        status: "missed",
        notes: "Student did not attend. Rescheduled for next week.",
        assignments: [],
        sharedNotes: [],
        chatMessages: []
      }
    ]
  },
  "Arjun Patel": {
    name: "Arjun Patel",
    subject: "Mathematics",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Arjun Patel",
    isDemo: false,
    totalClasses: 18,
    completedClasses: 17,
    missedClasses: 1,
    ratePerHour: 1200,
    sessions: [
      {
        id: 4,
        topic: "Calculus - Integration Techniques",
        date: "Jan 14, 2024",
        status: "attended",
        notes: "Covered integration by parts and substitution. Student grasped concepts quickly.",
        assignments: ["Practice problems 1-20", "Solve application problems"],
        sharedNotes: ["Integration_Formulas.pdf", "Practice_Solutions.pdf"],
        recordingUrl: "https://example.com/recording/4",
        transcriptUrl: "https://example.com/transcript/4",
        chatMessages: [
          { id: 6, sender: "student", message: "When do we use integration by parts vs substitution?", timestamp: "2:30 PM" },
          { id: 7, sender: "tutor", message: "Use substitution when you see a function and its derivative. Use by parts for products...", timestamp: "2:31 PM" }
        ]
      }
    ]
  },
  "Priya Sharma": {
    name: "Priya Sharma",
    subject: "Physics",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya Sharma",
    isDemo: true,
    totalClasses: 2,
    completedClasses: 2,
    missedClasses: 0,
    ratePerHour: 0,
    sessions: [
      {
        id: 6,
        topic: "Newton's Laws of Motion - Demo Class",
        date: "Jan 13, 2024",
        status: "attended",
        notes: "Introductory session covering basic concepts. Student showed strong interest in physics.",
        assignments: ["Read Chapter 1", "Try basic problems"],
        sharedNotes: ["Newtons_Laws_Intro.pdf"],
        recordingUrl: "https://example.com/recording/6",
        transcriptUrl: "https://example.com/transcript/6",
        chatMessages: [
          { id: 10, sender: "student", message: "This is really interesting! Can we do more examples?", timestamp: "4:15 PM" },
          { id: 11, sender: "tutor", message: "Absolutely! Let's work through some real-world applications...", timestamp: "4:16 PM" }
        ]
      }
    ]
  }
};
