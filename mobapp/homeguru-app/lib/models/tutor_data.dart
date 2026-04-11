import 'dart:io';
import 'package:flutter/material.dart';
import 'searchable_tutor.dart';

/// Single source of truth for all tutor dashboard data.
/// Created once, shared across all tabs via InheritedWidget.
class TutorData extends ChangeNotifier {
  // ── Profile ──
  String name = 'Ayush Soni';
  String bio = 'Mathematics & Physics tutor with 5+ years of experience. Making complex concepts simple and fun.';
  String about = 'Passionate about teaching Mathematics and Physics. I believe every student can excel with the right guidance.\n\nMy approach focuses on building strong fundamentals and problem-solving skills through real-world examples. I have helped 200+ students crack JEE and board exams.';
  String ytLink = 'https://youtu.be/G64LLtnjYlA';
  String location = 'Mumbai, India';
  File? avatar;
  final String handle = 'ayush.tutor';
  final List<String> subjects = ['Mathematics', 'Physics', 'JEE Mains', 'JEE Advanced', 'Vedic Maths', 'Board Exams'];
  List<String> languages = ['Hindi \u00b7 Native', 'English \u00b7 Professional', 'Marathi \u00b7 Good'];
  Map<String, int> pricing = {'Mathematics': 500, 'Physics': 500, 'JEE Prep': 700, 'Vedic Maths': 400};

  /// Create a TutorData populated from a [SearchableTutor] for visitor mode.
  static TutorData fromSearchable(SearchableTutor t) {
    final d = TutorData();
    d.name = t.name;
    d.bio = t.bio.isNotEmpty ? t.bio : '${t.subject} tutor with ${t.experience} years of experience.';
    d.about = '${t.bio}\n\nTeaches ${t.subject} for ${t.grades.join(", ")}. Specialises in ${t.tags.join(", ")}.';
    d.location = 'India';
    d.subjects.clear();
    d.subjects.addAll(t.subject.split('·').map((s) => s.trim()).where((s) => s.isNotEmpty));
    d.subjects.addAll(t.tags);
    d.languages = t.languages.split(',').map((l) => '${l.trim()} · Professional').toList();
    d.pricing = {for (final s in t.subject.split('·').map((s) => s.trim()).where((s) => s.isNotEmpty)) s: t.price};
    return d;
  }
  List<Map<String, String>> experience = [
    {'title': 'Senior Tutor', 'org': 'HomeGuru', 'period': '2023 \u2013 Present'},
    {'title': 'Freelance Tutor', 'org': 'Self-employed', 'period': '2020 \u2013 2023'},
    {'title': 'Teaching Assistant', 'org': 'Mumbai University', 'period': '2019 \u2013 2020'},
  ];
  List<Map<String, String>> education = [
    {'title': 'B.Sc Mathematics (Hons)', 'org': 'Mumbai University', 'period': '2017 \u2013 2020'},
    {'title': 'Higher Secondary (PCM)', 'org': 'DPS Mumbai', 'period': '2015 \u2013 2017'},
  ];

  // ── Students ──
  final List<StudentInfo> students = const [
    StudentInfo(name: 'Aarav Sharma', subject: 'Mathematics', grade: 'Class 11', sessions: 24, totalPaid: 12000),
    StudentInfo(name: 'Priya Patel', subject: 'Physics', grade: 'Class 12', sessions: 16, totalPaid: 8000),
    StudentInfo(name: 'Sneha Kapoor', subject: 'JEE Advanced', grade: 'Class 12', sessions: 18, totalPaid: 14400),
    StudentInfo(name: 'Rohan Gupta', subject: 'Chemistry', grade: 'Class 11', sessions: 12, totalPaid: 6000),
    StudentInfo(name: 'Kavya Singh', subject: 'JEE Prep', grade: 'Class 12', sessions: 10, totalPaid: 6000),
    StudentInfo(name: 'Meera Iyer', subject: 'English Lit', grade: 'Class 10', sessions: 8, totalPaid: 3200),
    StudentInfo(name: 'Amit Desai', subject: 'Calculus', grade: 'Class 12', sessions: 6, totalPaid: 3000),
  ];

  // ── Demo Requests ──
  final List<DemoRequest> demoRequests = const [
    DemoRequest(name: 'Amit Desai', handle: 'amit_d', subject: 'Mathematics', grade: 'Class 11', message: 'Looking for help with Calculus. Struggling with integration by parts and definite integrals. Available weekday evenings.', time: '6h'),
    DemoRequest(name: 'Kavya Singh', handle: 'kavya_s', subject: 'JEE Advanced', grade: 'Class 12', message: 'Need intensive coaching for JEE Advanced. Currently scoring 180/300 in mocks, targeting 250+. Can commit 2 hours daily.', time: '1d'),
    DemoRequest(name: 'Rahul Joshi', handle: 'rahul_j', subject: 'Physics', grade: 'Class 11', message: 'Want to start from basics. Failed last 2 exams. Need someone patient who can explain from scratch.', time: '2d'),
  ];

  // ── Earnings ──
  int get earnedThisMonth => 12400;
  int get earnedThisWeek => 4200;
  int get pendingPayout => 2400;
  int get activeStudentCount => students.length;
  double get rating => 4.8;
  int get streak => 12;

  // ── Stats ──
  int get sessionsThisWeek => 14;
  double get hoursTaught => 12.5;
  double get avgRating => 4.9;

  // ── Availability (per weekday, 0=Mon..6=Sun) ──
  final List<DayAvailability> availability = [
    DayAvailability(enabled: true, fromHour: 9, fromMin: 0, toHour: 21, toMin: 0),
    DayAvailability(enabled: true, fromHour: 9, fromMin: 0, toHour: 21, toMin: 0),
    DayAvailability(enabled: true, fromHour: 9, fromMin: 0, toHour: 21, toMin: 0),
    DayAvailability(enabled: true, fromHour: 9, fromMin: 0, toHour: 21, toMin: 0),
    DayAvailability(enabled: true, fromHour: 9, fromMin: 0, toHour: 21, toMin: 0),
    DayAvailability(enabled: true, fromHour: 10, fromMin: 0, toHour: 18, toMin: 0),
    DayAvailability(enabled: false),
  ];

  void update() => notifyListeners();
}

class DayAvailability {
  bool enabled;
  int fromHour, fromMin, toHour, toMin;
  DayAvailability({this.enabled = true, this.fromHour = 9, this.fromMin = 0, this.toHour = 21, this.toMin = 0});
  TimeOfDay get from => TimeOfDay(hour: fromHour, minute: fromMin);
  TimeOfDay get to => TimeOfDay(hour: toHour, minute: toMin);
  set from(TimeOfDay t) { fromHour = t.hour; fromMin = t.minute; }
  set to(TimeOfDay t) { toHour = t.hour; toMin = t.minute; }
  String get label {
    if (!enabled) return 'Off';
    final f = from; final t = to;
    return '${fmtTime(f)} – ${fmtTime(t)}';
  }
  static String fmtTime(TimeOfDay t) {
    final h = t.hourOfPeriod == 0 ? 12 : t.hourOfPeriod;
    return '$h:${t.minute.toString().padLeft(2, '0')} ${t.period == DayPeriod.am ? 'AM' : 'PM'}';
  }
}

class StudentInfo {
  final String name, subject, grade;
  final int sessions, totalPaid;
  const StudentInfo({required this.name, required this.subject, required this.grade, required this.sessions, required this.totalPaid});
}

class DemoRequest {
  final String name, handle, subject, grade, message, time;
  const DemoRequest({required this.name, required this.handle, required this.subject, required this.grade, required this.message, required this.time});
}

/// InheritedWidget to provide TutorData down the tree without re-creation.
class TutorDataProvider extends InheritedNotifier<TutorData> {
  const TutorDataProvider({super.key, required TutorData data, required super.child})
      : super(notifier: data);

  static TutorData of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<TutorDataProvider>()!.notifier!;
  }

  static TutorData? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<TutorDataProvider>()?.notifier;
  }
}
