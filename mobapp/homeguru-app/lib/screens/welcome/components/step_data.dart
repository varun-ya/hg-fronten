import 'package:flutter/material.dart';
import '../../../theme.dart';

enum Role { learner, tutor }

class StepData {
  final String owlSays;
  final String title, subtitle;
  final List<String> options;
  final Color color;
  const StepData({required this.owlSays, required this.title, required this.subtitle, required this.options, required this.color});
}

final steps = [
  StepData(
    owlSays: 'Let\'s get you signed up first — takes a few seconds.',
    title: 'Create your account',
    subtitle: 'We\'ll send an OTP to your WhatsApp.',
    options: [],
    color: HG.blue,
  ),
  StepData(
    owlSays: 'Hi, I am Hoot! 👋 Quick one — where did you hear about me?',
    title: 'Where did you hear about us?',
    subtitle: 'Just curious — helps us spread the word better.',
    options: ['Instagram', 'YouTube', 'Google Search', 'Friend / Family', 'School / College', 'Other'],
    color: Color(0xFF6366F1),
  ),
  StepData(
    owlSays: 'What gets you excited to learn?',
    title: 'What are you more interested in?',
    subtitle: 'This helps us tailor your learning experience.',
    options: ['Academic', 'Non-Academic'],
    color: HG.purple,
  ),
  StepData(
    owlSays: 'Ooh, pick something fun!',
    title: 'What do you want to focus on?',
    subtitle: 'Pick a subject that excites you the most.',
    options: [],
    color: HG.orange,
  ),
  StepData(
    owlSays: 'No wrong answers here, be honest!',
    title: 'How much do you already know?',
    subtitle: 'So we can start at the right level for you.',
    options: [],
    color: HG.green,
  ),
  StepData(
    owlSays: 'Fun fact — learners who learn 1-on-1 outperform 98% of classroom students. Let that sink in.',
    title: 'One last thing',
    subtitle: 'Sign up for free and we\'ll build a learning path that actually fits you — not some generic syllabus.',
    options: [],
    color: HG.amber,
  ),
  StepData(
    owlSays: 'Almost done! Tell me a bit about yourself.',
    title: 'About you',
    subtitle: 'This helps us personalise everything.',
    options: [],
    color: Color(0xFFEC4899),
  ),
  // Page 8 — conditional: School / Aspirant / College
  StepData(
    owlSays: 'One more — what board and class are you in?',
    title: 'Your school details',
    subtitle: 'So we can match the right syllabus.',
    options: [],
    color: HG.green,
  ),
];

const academicSubjects = [
  'Mathematics', 'Science', 'English', 'Social Studies',
  'Hindi', 'Computer Science', 'Accountancy', 'Economics',
  'Others',
];

const nonAcademicSubjects = [
  'Music', 'Dance', 'Art & Design', 'Coding',
  'Languages', 'Public Speaking', 'Photography', 'Creative Writing',
  'Others',
];

// Category indices:
// 0 = Student (school)
// 1 = Aspirant (competitive exams)
// 2 = College Student
// 3 = Working Professional
// 4 = Homemaker
// 5 = Sr. Citizen
const learnerCategories = [
  'Student',
  'Aspirant',
  'College Student',
  'Working Professional',
  'Homemaker',
  'Sr. Citizen',
];

// ── School ──
const boards = ['CBSE', 'State Board', 'ICSE', 'IB', 'IGCSE'];

const _yearBoards = {'IB', 'IGCSE'};

List<String> classesForBoard(int boardIndex) {
  final board = boards[boardIndex];
  if (_yearBoards.contains(board)) {
    return List.generate(12, (i) => 'Year ${i + 1}');
  }
  return List.generate(12, (i) => 'Grade ${i + 1}');
}

// ── Aspirant exam data is in aspirant_card.dart ──

// ── College Student ──
// Grouped by field for better UI
const collegeCoursesGrouped = <String, List<String>>{
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

// Flat list for backward compat
List<String> get collegeCourses {
  final all = <String>[];
  for (final courses in collegeCoursesGrouped.values) { all.addAll(courses); }
  all.add('Others');
  return all;
}

const collegeBranches = <String, List<String>>{
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
  'MBBS': ['General'],
  'BDS': ['General'],
  'B.Pharm': ['General', 'Others'],
  'Nursing': ['General'],
  'B.Des': ['Product Design', 'Communication Design', 'Fashion Design', 'Others'],
  'M.Des': ['Product Design', 'Communication Design', 'Others'],
  'Fine Arts': ['Painting', 'Sculpture', 'Applied Arts', 'Others'],
  'LLB': ['General', 'Others'],
  'BA LLB': ['General', 'Others'],
  'LLM': ['Constitutional Law', 'Corporate Law', 'Criminal Law', 'Others'],
  'B.Ed': ['General'],
  'M.Ed': ['General'],
};

const collegeYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

// ══════════════════════════════════════════════
// TUTOR ONBOARDING
// ══════════════════════════════════════════════

// Tutor flow pages:
// 0 = Welcome card (shared)
// 1 = Credentials (shared)
// 2 = Profile (name, email, phone, gender, pincode→city/state, password)
// 3 = Welcome preview (animated 5-step roadmap)
// 4 = Subjects & Skills picker
// 5 = Qualification test (MCQ + written)
// 6 = Congrats
// 7 = Payment (₹499)
// 8 = ID Verification (front+back upload)
// 9 = Go Live

final tutorSteps = [
  StepData(
    owlSays: 'Let\'s get you signed up first.',
    title: 'Create your account',
    subtitle: 'We\'ll send an OTP to your WhatsApp.',
    options: [],
    color: HG.orange,
  ),
  StepData(
    owlSays: 'Tell me a bit about yourself.',
    title: 'About you',
    subtitle: 'This helps us set up your tutor profile.',
    options: [],
    color: Color(0xFFEC4899),
  ),
  StepData(
    owlSays: 'Here\'s what\'s ahead — 5 simple steps!',
    title: 'Your journey to becoming a HomeGuru',
    subtitle: '5 simple steps. Takes about 10 minutes.',
    options: [],
    color: HG.blue,
  ),
  StepData(
    owlSays: 'What can you teach? Pick as many as you like!',
    title: 'What can you teach?',
    subtitle: 'Select from popular options or add your own.',
    options: [],
    color: HG.purple,
  ),
  StepData(
    owlSays: 'Time to show your skills! Don\'t worry, you got this.',
    title: 'Qualification Test',
    subtitle: 'Answer questions to demonstrate your teaching knowledge.',
    options: [],
    color: HG.green,
  ),
  StepData(
    owlSays: 'You passed! Welcome to the HomeGuru family!',
    title: 'Congratulations!',
    subtitle: 'You\'ve passed and are now eligible to teach.',
    options: [],
    color: HG.amber,
  ),
  StepData(
    owlSays: 'Annual fee to get your profile listed.',
    title: 'Annual Listing Fee',
    subtitle: 'Get visible to thousands of students.',
    options: [],
    color: HG.orange,
  ),
  StepData(
    owlSays: 'Upload a government ID to verify your identity.',
    title: 'ID Verification',
    subtitle: 'Keeps our platform safe for students.',
    options: [],
    color: HG.blue,
  ),
  StepData(
    owlSays: 'Add your bank details so we can pay you.',
    title: 'Bank Account',
    subtitle: 'For receiving session payments.',
    options: [],
    color: HG.green,
  ),
  StepData(
    owlSays: 'You\'re all set! Let\'s go live!',
    title: 'You\'re ready to go live!',
    subtitle: 'Students can now discover you and book sessions.',
    options: [],
    color: HG.green,
  ),
];

const popularSubjects = [
  'Maths', 'Science', 'English', 'Social Studies', 'Computer Science', 'Hindi',
];

const popularSkills = [
  'Music', 'Dance', 'Art & Design', 'Coding', 'Languages', 'Public Speaking',
];

const allSubjects = [
  'Maths', 'Science', 'English', 'Social Studies', 'Computer Science', 'Hindi',
  'Physics', 'Chemistry', 'Biology', 'Economics', 'Accountancy', 'Business Studies',
  'History', 'Geography', 'Political Science', 'Psychology', 'Sociology',
  'Sanskrit', 'French', 'German', 'Spanish', 'Japanese', 'Mandarin',
  'Environmental Science', 'Statistics', 'Reasoning', 'General Knowledge',
  'IELTS Preparation', 'TOEFL Preparation', 'SAT Preparation', 'GRE Preparation',
  'JEE Preparation', 'NEET Preparation', 'UPSC Preparation', 'CAT Preparation',
  'Vedic Maths', 'Mental Maths', 'Handwriting', 'Spoken English',
];

const allSkills = [
  'Music', 'Dance', 'Art & Design', 'Coding', 'Languages', 'Public Speaking',
  'Guitar', 'Piano', 'Violin', 'Drums', 'Singing', 'Tabla', 'Flute',
  'Classical Dance', 'Hip Hop', 'Contemporary Dance', 'Yoga',
  'Painting', 'Sketching', 'Digital Art', 'Photography', 'Video Editing',
  'Web Development', 'App Development', 'Python', 'JavaScript', 'Data Science', 'AI/ML',
  'Chess', 'Debate', 'Creative Writing', 'Content Writing', 'Calligraphy',
  'Cooking', 'Fitness Training', 'Meditation', 'Financial Literacy',
];

const mcqQuestions = [
  (
    q: 'What is the most effective way to explain a difficult concept?',
    opts: ['Repeat it louder', 'Use analogies and real-world examples', 'Skip it and move on', 'Give them a textbook'],
  ),
  (
    q: 'A student is consistently scoring low. What should you do first?',
    opts: ['Tell them to study harder', 'Identify weak areas through assessment', 'Reduce difficulty', 'Inform parents immediately'],
  ),
  (
    q: 'Which method promotes active learning?',
    opts: ['Lecture-only', 'Interactive problem-solving & discussions', 'Reading aloud from notes', 'Watching videos without discussion'],
  ),
  (
    q: 'How should you handle a distracted student?',
    opts: ['Ignore it', 'Engage them with a relevant question', 'End the session', 'Complain to parents'],
  ),
  (
    q: 'Best way to assess understanding after a lesson?',
    opts: ['Ask "Do you understand?"', 'Quick quiz or ask them to explain back', 'Move to next topic', 'Assign homework only'],
  ),
  (
    q: "A student asks something you don't know. What do you do?",
    opts: ['Make up an answer', "Admit you'll research and follow up", 'Ignore it', "Say it's not important"],
  ),
  (
    q: 'What makes a good lesson plan?',
    opts: ['No prep needed', 'Clear objectives, structure & exercises', 'Just a topic list', 'Whatever comes to mind'],
  ),
  (
    q: 'How do you keep students motivated?',
    opts: ['Threaten bad grades', 'Set achievable goals & celebrate progress', 'More homework', 'Compare with others'],
  ),
  (
    q: 'What is differentiated instruction?',
    opts: ['Teaching everyone the same', 'Adapting to different learning styles', 'Only teaching advanced students', 'Using one textbook'],
  ),
  (
    q: 'How should you give feedback?',
    opts: ['Only point out mistakes', 'Be specific, highlight strengths & suggest improvements', 'Say "good job" always', "Don't give feedback"],
  ),
];

const writtenQuestions = [
  'Describe how you would teach a struggling student a topic for the first time.',
  'A parent says their child isn\'t improving despite regular sessions. How do you handle this?',
];
