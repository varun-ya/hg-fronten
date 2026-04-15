const { gql } = require('graphql-tag');

const typeDefs = gql`
  scalar DateTime
  scalar JSON

  # ============================================
  # ENUMS
  # ============================================

  enum UserRole {
    STUDENT
    TUTOR
    ADMIN
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
    PREFER_NOT_TO_SAY
  }

  enum StudentCategory {
    STUDENT
    ASPIRANT
    COLLEGE_STUDENT
    WORKING_PROFESSIONAL
    HOMEMAKER
    SENIOR_CITIZEN
  }

  enum SessionStatus {
    SCHEDULED
    ONGOING
    COMPLETED
    CANCELLED
    RESCHEDULED
  }

  enum BookingStatus {
    PENDING
    ACCEPTED
    REJECTED
    COMPLETED
  }

  enum PaymentStatus {
    PENDING
    COMPLETED
    FAILED
    REFUNDED
  }

  enum AssignmentStatus {
    PENDING
    SUBMITTED
    GRADED
    OVERDUE
  }

  # ============================================
  # USER TYPES
  # ============================================

  type User {
    id: ID!
    email: String!
    phone: String!
    countryCode: String!
    role: UserRole!
    isEmailVerified: Boolean!
    isPhoneVerified: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    student: Student
    tutor: Tutor
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type OTPResponse {
    success: Boolean!
    message: String!
    expiresAt: DateTime
  }

  # ============================================
  # STUDENT TYPES
  # ============================================

  type Student {
    id: ID!
    userId: ID!
    user: User!
    name: String!
    dateOfBirth: DateTime
    gender: Gender
    category: StudentCategory!
    location: String
    
    # Onboarding data
    heardFrom: String
    interest: String
    subject: String
    knowledgeLevel: String
    
    # Academic details (for students)
    board: String
    grade: String
    
    # Aspirant details
    examCategory: String
    examName: String
    
    # College details
    course: String
    branch: String
    year: String
    
    # Stats
    xp: Int!
    streak: Int!
    sessionsCompleted: Int!
    hoursLearned: Float!
    
    # Relations
    tutors: [Tutor!]!
    sessions: [Session!]!
    assignments: [Assignment!]!
    bookings: [Booking!]!
    
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # ============================================
  # TUTOR TYPES
  # ============================================

  type Tutor {
    id: ID!
    userId: ID!
    user: User!
    name: String!
    bio: String
    about: String
    location: String
    avatar: String
    
    # Professional details
    subjects: [String!]!
    languages: [String!]!
    experience: [Experience!]!
    education: [Education!]!
    pricing: JSON
    
    # Verification
    isVerified: Boolean!
    idVerified: Boolean!
    bankVerified: Boolean!
    qualificationTestPassed: Boolean!
    
    # Stats
    rating: Float!
    totalReviews: Int!
    totalSessions: Int!
    totalEarnings: Float!
    activeStudents: Int!
    
    # Availability
    availability: JSON
    
    # Relations
    students: [Student!]!
    sessions: [Session!]!
    bookings: [Booking!]!
    
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Experience {
    title: String!
    organization: String!
    period: String!
  }

  type Education {
    degree: String!
    institution: String!
    period: String!
  }

  # ============================================
  # SESSION TYPES
  # ============================================

  type Session {
    id: ID!
    tutorId: ID!
    studentId: ID!
    tutor: Tutor!
    student: Student!
    
    subject: String!
    scheduledAt: DateTime!
    duration: Int!
    status: SessionStatus!
    
    meetingLink: String
    recordingLink: String
    
    notes: [Note!]!
    
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # ============================================
  # BOOKING TYPES
  # ============================================

  type Booking {
    id: ID!
    studentId: ID!
    tutorId: ID!
    student: Student!
    tutor: Tutor!
    
    subject: String!
    message: String
    preferredTime: DateTime
    status: BookingStatus!
    
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # ============================================
  # MESSAGE TYPES
  # ============================================

  type Message {
    id: ID!
    threadId: ID!
    senderId: ID!
    sender: User!
    content: String!
    attachments: [String!]
    isRead: Boolean!
    createdAt: DateTime!
  }

  type ChatThread {
    id: ID!
    participants: [User!]!
    lastMessage: Message
    unreadCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # ============================================
  # PAYMENT TYPES
  # ============================================

  type Payment {
    id: ID!
    userId: ID!
    user: User!
    amount: Float!
    currency: String!
    status: PaymentStatus!
    razorpayOrderId: String
    razorpayPaymentId: String
    description: String
    createdAt: DateTime!
  }

  type Wallet {
    userId: ID!
    balance: Float!
    totalEarned: Float!
    totalSpent: Float!
    pendingPayout: Float!
    transactions: [Payment!]!
  }

  # ============================================
  # ASSIGNMENT TYPES
  # ============================================

  type Assignment {
    id: ID!
    tutorId: ID!
    studentId: ID!
    tutor: Tutor!
    student: Student!
    
    title: String!
    description: String!
    subject: String!
    dueDate: DateTime!
    status: AssignmentStatus!
    
    attachments: [String!]
    submissionUrl: String
    submittedAt: DateTime
    grade: String
    feedback: String
    
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # ============================================
  # NOTE TYPES
  # ============================================

  type Note {
    id: ID!
    sessionId: ID!
    session: Session!
    title: String!
    content: String!
    attachments: [String!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # ============================================
  # ANALYTICS TYPES
  # ============================================

  type StudentAnalytics {
    totalSessions: Int!
    hoursLearned: Float!
    assignmentsCompleted: Int!
    assignmentsPending: Int!
    averageScore: Float!
    streak: Int!
    xp: Int!
    weeklyProgress: [WeeklyProgress!]!
  }

  type TutorAnalytics {
    totalEarnings: Float!
    thisMonthEarnings: Float!
    thisWeekEarnings: Float!
    totalSessions: Int!
    activeStudents: Int!
    rating: Float!
    totalReviews: Int!
    weeklyEarnings: [WeeklyEarnings!]!
  }

  type WeeklyProgress {
    week: String!
    sessions: Int!
    hours: Float!
    score: Float!
  }

  type WeeklyEarnings {
    week: String!
    earnings: Float!
    sessions: Int!
  }

  # ============================================
  # QUERIES
  # ============================================

  type Query {
    # Auth
    me: User!
    
    # Users
    user(id: ID!): User
    
    # Students
    student(id: ID!): Student
    myStudentProfile: Student
    searchTutors(
      subject: String
      minRating: Float
      maxPrice: Int
      location: String
      limit: Int
      offset: Int
    ): [Tutor!]!
    
    # Tutors
    tutor(id: ID!): Tutor
    myTutorProfile: Tutor
    myStudents: [Student!]!
    demoRequests: [Booking!]!
    
    # Sessions
    session(id: ID!): Session
    mySessions(status: SessionStatus, limit: Int, offset: Int): [Session!]!
    upcomingSessions: [Session!]!
    
    # Bookings
    booking(id: ID!): Booking
    myBookings(status: BookingStatus): [Booking!]!
    
    # Messages
    myChats: [ChatThread!]!
    chatThread(threadId: ID!): ChatThread
    messages(threadId: ID!, limit: Int, offset: Int): [Message!]!
    
    # Payments
    myWallet: Wallet!
    payment(id: ID!): Payment
    myPayments(limit: Int, offset: Int): [Payment!]!
    
    # Assignments
    assignment(id: ID!): Assignment
    myAssignments(status: AssignmentStatus): [Assignment!]!
    
    # Notes
    note(id: ID!): Note
    sessionNotes(sessionId: ID!): [Note!]!
    
    # Analytics
    myStudentAnalytics: StudentAnalytics!
    myTutorAnalytics: TutorAnalytics!
  }

  # ============================================
  # MUTATIONS
  # ============================================

  type Mutation {
    # Auth
    signup(input: SignupInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    sendOTP(phone: String!, countryCode: String!): OTPResponse!
    verifyOTP(phone: String!, countryCode: String!, otp: String!): OTPResponse!
    sendEmailVerification(email: String!): OTPResponse!
    verifyEmail(token: String!): OTPResponse!
    
    # Student Onboarding
    completeStudentOnboarding(input: StudentOnboardingInput!): Student!
    updateStudentProfile(input: UpdateStudentInput!): Student!
    
    # Tutor Onboarding
    completeTutorOnboarding(input: TutorOnboardingInput!): Tutor!
    updateTutorProfile(input: UpdateTutorInput!): Tutor!
    updateTutorAvailability(availability: JSON!): Tutor!
    
    # Sessions
    scheduleSession(input: ScheduleSessionInput!): Session!
    updateSession(id: ID!, input: UpdateSessionInput!): Session!
    cancelSession(id: ID!, reason: String): Session!
    completeSession(id: ID!): Session!
    
    # Bookings
    createBooking(input: CreateBookingInput!): Booking!
    acceptBooking(id: ID!): Booking!
    rejectBooking(id: ID!, reason: String): Booking!
    
    # Messages
    sendMessage(input: SendMessageInput!): Message!
    markMessageAsRead(id: ID!): Message!
    
    # Payments
    createPaymentOrder(amount: Float!, description: String): Payment!
    verifyPayment(
      paymentId: String!
      orderId: String!
      signature: String!
    ): Payment!
    
    # Assignments
    createAssignment(input: CreateAssignmentInput!): Assignment!
    submitAssignment(id: ID!, submissionUrl: String!): Assignment!
    gradeAssignment(id: ID!, grade: String!, feedback: String): Assignment!
    
    # Notes
    createNote(input: CreateNoteInput!): Note!
    updateNote(id: ID!, input: UpdateNoteInput!): Note!
    deleteNote(id: ID!): Boolean!
  }

  # ============================================
  # INPUT TYPES
  # ============================================

  input SignupInput {
    email: String!
    phone: String!
    countryCode: String!
    password: String!
    role: UserRole!
  }

  input StudentOnboardingInput {
    name: String!
    dateOfBirth: DateTime
    gender: Gender
    category: StudentCategory!
    location: String
    heardFrom: String
    interest: String
    subject: String
    knowledgeLevel: String
    board: String
    grade: String
    examCategory: String
    examName: String
    course: String
    branch: String
    year: String
  }

  input UpdateStudentInput {
    name: String
    dateOfBirth: DateTime
    gender: Gender
    location: String
    board: String
    grade: String
  }

  input TutorOnboardingInput {
    name: String!
    bio: String
    about: String
    location: String
    subjects: [String!]!
    languages: [String!]!
    experience: [ExperienceInput!]
    education: [EducationInput!]
    pricing: JSON
  }

  input UpdateTutorInput {
    name: String
    bio: String
    about: String
    location: String
    subjects: [String!]
    languages: [String!]
    pricing: JSON
  }

  input ExperienceInput {
    title: String!
    organization: String!
    period: String!
  }

  input EducationInput {
    degree: String!
    institution: String!
    period: String!
  }

  input ScheduleSessionInput {
    tutorId: ID!
    studentId: ID!
    subject: String!
    scheduledAt: DateTime!
    duration: Int!
  }

  input UpdateSessionInput {
    scheduledAt: DateTime
    duration: Int
    status: SessionStatus
  }

  input CreateBookingInput {
    tutorId: ID!
    subject: String!
    message: String
    preferredTime: DateTime
  }

  input SendMessageInput {
    threadId: ID
    recipientId: ID
    content: String!
    attachments: [String!]
  }

  input CreateAssignmentInput {
    studentId: ID!
    title: String!
    description: String!
    subject: String!
    dueDate: DateTime!
    attachments: [String!]
  }

  input CreateNoteInput {
    sessionId: ID!
    title: String!
    content: String!
    attachments: [String!]
  }

  input UpdateNoteInput {
    title: String
    content: String
    attachments: [String!]
  }
`;

module.exports = typeDefs;
