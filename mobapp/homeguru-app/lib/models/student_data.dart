import 'package:flutter/material.dart';

class StudentData extends ChangeNotifier {
  // ── Profile ──
  String name = 'Ravi Kumar';
  String handle = 'ravi.learns';
  String bio = 'Class 11 · PCM · JEE 2026 🚀';
  String grade = 'Class 11';
  String board = 'CBSE';

  // ── Stats ──
  int xp = 1240;
  int streak = 7;
  int sessionsThisWeek = 4;
  double hoursThisWeek = 3.5;

  // ── My tutors ──
  final List<MyTutor> tutors = const [
    MyTutor(name: 'Ayush Soni', handle: 'ayush.tutor', subject: 'Maths · Physics', avatar: 'A'),
    MyTutor(name: 'Priya Menon', handle: 'priya.m', subject: 'Physics', avatar: 'P'),
    MyTutor(name: 'Ankit Kapoor', handle: 'ankit.k', subject: 'English', avatar: 'K'),
  ];

  // ── Chat threads ──
  final List<ChatThread> threads = const [
    ChatThread(name: 'Ayush Soni', lastMsg: 'Great work on the assignment! 💪', time: '2m', unread: 2, avatar: 'A', isTutor: true),
    ChatThread(name: 'Priya Menon', lastMsg: 'See you at 5:30 for Physics', time: '1h', unread: 0, avatar: 'P', isTutor: true),
    ChatThread(name: 'JEE 2026 Study Group', lastMsg: 'Aarav: Anyone solved Q.14?', time: '3h', unread: 5, avatar: 'J', isGroup: true, members: 24),
    ChatThread(name: 'Ankit Kapoor', lastMsg: 'Essay feedback uploaded', time: '5h', unread: 1, avatar: 'K', isTutor: true),
    ChatThread(name: 'Sneha Kapoor', lastMsg: 'Did you finish the physics set?', time: '1d', unread: 0, avatar: 'S'),
    ChatThread(name: 'PCM Batch 2026', lastMsg: 'Priya ma\'am: Test on Monday', time: '1d', unread: 0, avatar: 'P', isGroup: true, members: 18),
  ];

  void update() => notifyListeners();
}

class MyTutor {
  final String name, handle, subject, avatar;
  const MyTutor({required this.name, required this.handle, required this.subject, required this.avatar});
}

class ChatThread {
  final String name, lastMsg, time, avatar;
  final int unread, members;
  final bool isTutor, isGroup;
  const ChatThread({required this.name, required this.lastMsg, required this.time, required this.avatar, this.unread = 0, this.isTutor = false, this.isGroup = false, this.members = 0});
}

class StudentDataProvider extends InheritedNotifier<StudentData> {
  const StudentDataProvider({super.key, required StudentData data, required super.child})
      : super(notifier: data);

  static StudentData of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<StudentDataProvider>()!.notifier!;
}
