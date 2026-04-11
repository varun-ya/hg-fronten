import 'package:flutter/material.dart';
import 'student/student_dashboard.dart';
import 'tutor/tutor_dashboard.dart';

enum DashboardRole { student, tutor }

class DashboardPage extends StatelessWidget {
  final DashboardRole role;
  const DashboardPage({super.key, required this.role});

  @override
  Widget build(BuildContext context) {
    return switch (role) {
      DashboardRole.student => const StudentDashboard(),
      DashboardRole.tutor => const TutorDashboard(),
    };
  }
}
