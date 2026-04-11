import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../components/dashboard/shared/dashboard_shell.dart';
import '../../../models/student_data.dart';
import 'student_home_tab.dart';
import 'student_search_tab.dart';
import 'student_schedule_tab.dart';
import 'student_feed_tab.dart';
import 'student_chat_tab.dart';
import 'student_profile_page.dart';
import '../../../widgets/hoot_nav_icon.dart';

import 'ai_chat_tab.dart';

class StudentDashboard extends StatefulWidget {
  const StudentDashboard({super.key});
  @override
  State<StudentDashboard> createState() => _StudentDashboardState();
}

class _StudentDashboardState extends State<StudentDashboard> {
  final _data = StudentData();

  @override
  void dispose() { _data.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return StudentDataProvider(
      data: _data,
      child: DashboardShell(
        navItems: [
          (icon: PhosphorIconsRegular.house, activeIcon: PhosphorIconsFill.house, label: 'Home'),
          (icon: PhosphorIconsRegular.magnifyingGlass, activeIcon: PhosphorIconsFill.magnifyingGlass, label: 'Search'),
          (icon: PhosphorIconsRegular.sparkle, activeIcon: PhosphorIconsFill.sparkle, label: 'Guru AI'),
          (icon: PhosphorIconsRegular.calendarDots, activeIcon: PhosphorIconsFill.calendarDots, label: 'Schedule'),
          (icon: PhosphorIconsRegular.newspaper, activeIcon: PhosphorIconsFill.newspaper, label: 'Feed'),
          (icon: PhosphorIconsRegular.chatCircle, activeIcon: PhosphorIconsFill.chatCircle, label: 'Chat'),
        ],
        tabs: const [
          StudentHomeTab(),
          StudentSearchTab(),
          AiChatTab(),
          StudentScheduleTab(),
          StudentFeedTab(),
          StudentChatTab(),
        ],
        centerIndex: 2,
        centerWidget: const HootNavIcon(size: 30),
        profileBuilder: () => StudentProfilePage(data: _data),
      ),
    );
  }
}
