import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../components/dashboard/shared/dashboard_shell.dart';
import '../../../components/dashboard/shared/profile_tab.dart';
import '../../../models/tutor_data.dart';
import 'tutor_home_tab.dart';
import 'tutor_feed_tab.dart';
import 'tutor_schedule_tab.dart';
import 'tutor_students_tab.dart';

class TutorDashboard extends StatefulWidget {
  const TutorDashboard({super.key});
  @override
  State<TutorDashboard> createState() => _TutorDashboardState();
}

class _TutorDashboardState extends State<TutorDashboard> {
  final _data = TutorData();

  @override
  void dispose() { _data.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return TutorDataProvider(
      data: _data,
      child: DashboardShell(
        navItems: [
          (icon: PhosphorIconsRegular.house, activeIcon: PhosphorIconsFill.house, label: 'Home'),
          (icon: PhosphorIconsRegular.videoCamera, activeIcon: PhosphorIconsFill.videoCamera, label: 'Meet'),
          (icon: PhosphorIconsRegular.usersThree, activeIcon: PhosphorIconsFill.usersThree, label: 'Students'),
          (icon: PhosphorIconsRegular.newspaper, activeIcon: PhosphorIconsFill.newspaper, label: 'Feed'),
          (icon: PhosphorIconsRegular.user, activeIcon: PhosphorIconsFill.user, label: 'Profile'),
        ],
        tabs: [
          const TutorHomeTab(),
          const TutorScheduleTab(),
          const TutorStudentsTab(),
          const TutorFeedTab(),
        ],
        profileBuilder: () => ProfileTab(data: _data),
      ),
    );
  }
}
