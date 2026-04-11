import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/student_data.dart';
import '../../notifications/notifications_page.dart';
import '../../wallet/student_wallet_page.dart';
import 'student_profile_page.dart';
import '../../../components/dashboard/student/ai_match_banner.dart';
import '../../../components/dashboard/student/suggested_tutor_card.dart';
import '../../../components/dashboard/shared/dashboard_shell.dart';
import '../../../components/dashboard/student/class_tile.dart';
import '../../../components/dashboard/student/class_data_card.dart';
import '../../../components/dashboard/student/streak_calendar.dart';
import '../../../components/dashboard/tutor/schedule/student_profile_sheet.dart';
import '../../../components/dashboard/tutor/schedule/scheduled_class.dart';
import '../../analytics/student_analytics_page.dart';

List<(PastSession, String)> _allSessions(StudentData d) {
  final list = <(PastSession, String)>[];
  for (final tutor in d.tutors) {
    final sessions = studentHistory[tutor.name];
    if (sessions != null) {
      for (final s in sessions) { list.add((s, tutor.name)); }
    }
  }
  return list;
}

class StudentHomeTab extends StatelessWidget {
  const StudentHomeTab({super.key});

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final d = StudentDataProvider.of(context);
    final todayClasses = getScheduledClasses(DateTime.now());
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: context.isDark ? HG.surface : const Color(0xFFF8F7F4),
        body: ListView(
          padding: EdgeInsets.zero,
          physics: const BouncingScrollPhysics(),
          children: [
            // Header
            Padding(
              padding: EdgeInsets.fromLTRB(16, pt + 10, 12, 0),
              child: Row(children: [
                GestureDetector(
                  onTap: () {
                    HapticFeedback.selectionClick();
                    Navigator.push(context, PageRouteBuilder(
                      pageBuilder: (_, __, ___) => StudentProfilePage(data: d),
                      transitionDuration: const Duration(milliseconds: 350),
                      reverseTransitionDuration: const Duration(milliseconds: 300),
                      transitionsBuilder: (_, a, __, c) => SlideTransition(
                        position: Tween(begin: const Offset(-1, 0), end: Offset.zero).animate(
                          CurvedAnimation(parent: a, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)),
                        child: c),
                    ));
                  },
                  child: Container(width: 34, height: 34,
                    decoration: BoxDecoration(shape: BoxShape.circle, color: HG.grey100, border: Border.all(color: HG.grey200, width: 1.5)),
                    child: Center(child: Text(d.name.isNotEmpty ? d.name[0] : 'S', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.grey500)))),
                ),
                const Spacer(),
                Image.asset('assets/profileHeader.png', height: 20),
                const Spacer(),
                IconButton(
                  onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const StudentWalletPage())),
                  icon: Icon(PhosphorIconsRegular.wallet, size: 21, color: HG.dark),
                  style: IconButton.styleFrom(padding: EdgeInsets.zero, minimumSize: Size(36, 36)),
                ),
                const SizedBox(width: 2),
                IconButton(
                  onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const NotificationsPage())),
                  icon: Badge(smallSize: 7, child: Icon(PhosphorIconsRegular.bell, size: 22, color: HG.dark)),
                  style: IconButton.styleFrom(padding: EdgeInsets.zero, minimumSize: Size(36, 36)),
                ),
              ]),
            ),
            const SizedBox(height: 14),
            // AI Matchmaking banner
            const AiMatchCard(),
            const SizedBox(height: 14),
            // Stat cards
            SizedBox(
              height: 200,
              child: ListView(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                padding: EdgeInsets.fromLTRB(16, 0, 16, 6),
                children: [
                  _FolderCard(grad: [Color(0xFFD9F0FB), Color(0xFFB8DFF5), Color(0xFF93CFEE)], title: 'Streak', sub: 'Keep going!', desc: 'Days in a row you\'ve been learning', value: '${d.streak}', unit: 'days', icon: PhosphorIconsFill.flame),
                  const SizedBox(width: 12),
                  _FolderCard(grad: [Color(0xFFF8CCC6), Color(0xFFF2B5AC), Color(0xFFEA9A8E)], title: 'XP Earned', sub: 'Total', desc: 'Points from classes & quizzes', value: '${d.xp}', unit: 'XP', icon: PhosphorIconsFill.star),
                  const SizedBox(width: 12),
                  _FolderCard(grad: [Color(0xFFF6DDF6), Color(0xFFF0CDF0), Color(0xFFE8BBE8)], title: 'Classes', sub: 'This week', desc: 'Sessions completed so far', value: '${d.sessionsThisWeek}', unit: 'done', icon: PhosphorIconsFill.bookOpen),
                  const SizedBox(width: 12),
                  _FolderCard(grad: [Color(0xFFDAF2E2), Color(0xFFC2E8CF), Color(0xFFA8DEBB)], title: 'Hours', sub: 'Learning', desc: 'Total time spent this week', value: '${d.hoursThisWeek}', unit: 'hrs', icon: PhosphorIconsFill.hourglass),
                  const SizedBox(width: 12),
                  _SeeMoreCard(data: d),
                ],
              ),
            ),
            const SizedBox(height: 20),
            // Suggested tutors
            Padding(
              padding: EdgeInsets.fromLTRB(16, 0, 16, 8),
              child: Row(children: [
                Text('Suggested Tutors', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
                const Spacer(),
                GestureDetector(
                  onTap: () {},
                  child: Text('See all', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: HG.blue)),
                ),
              ]),
            ),
            SizedBox(
              height: 200,
              child: ListView(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                padding: EdgeInsets.fromLTRB(16, 0, 16, 0),
                children: const [
                  SuggestedTutorCard(name: 'Ayush Soni', subject: 'Maths \u00b7 Physics', rating: 4.9, price: 499, students: 48, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ5vLr3limSJHFZp2LQFUvWFBGKKvK9qZUuw&s', color: Color(0xFF4A7CF5)),
                  SizedBox(width: 12),
                  SuggestedTutorCard(name: 'Priya Menon', subject: 'Physics', rating: 4.8, price: 399, students: 35, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ5vLr3limSJHFZp2LQFUvWFBGKKvK9qZUuw&s', color: Color(0xFFE85060)),
                  SizedBox(width: 12),
                  SuggestedTutorCard(name: 'Ankit Kapoor', subject: 'English \u00b7 Literature', rating: 4.7, price: 349, students: 28, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ5vLr3limSJHFZp2LQFUvWFBGKKvK9qZUuw&s', color: Color(0xFF22C55E)),
                  SizedBox(width: 12),
                  SuggestedTutorCard(name: 'Neha Sharma', subject: 'Chemistry', rating: 4.9, price: 549, students: 52, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ5vLr3limSJHFZp2LQFUvWFBGKKvK9qZUuw&s', color: Color(0xFF8B5CF6)),
                  SizedBox(width: 12),
                  SuggestedTutorCard(name: 'Rohit Verma', subject: 'Biology \u00b7 Botany', rating: 4.6, price: 299, students: 19, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ5vLr3limSJHFZp2LQFUvWFBGKKvK9qZUuw&s', color: Color(0xFFE08A3C)),
                  SizedBox(width: 12),
                  _ExploreTutorsCard(),
                ],
              ),
            ),
            const SizedBox(height: 20),
            // Today's classes
            Padding(
              padding: EdgeInsets.fromLTRB(16, 0, 16, 8),
              child: Row(children: [
                Text('Today\'s Classes', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
                const Spacer(),
                GestureDetector(
                  onTap: () => DashboardShell.switchTab(context, 3),
                  child: Text('View schedule', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: HG.blue)),
                ),
              ]),
            ),
            SizedBox(
              height: 200,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                padding: EdgeInsets.fromLTRB(16, 0, 16, 0),
                itemCount: todayClasses.length,
                separatorBuilder: (_, __) => const SizedBox(width: 12),
                itemBuilder: (_, i) => ClassCard(cls: todayClasses[i]),
              ),
            ),
            const SizedBox(height: 20),
            // Class notes
            Padding(
              padding: EdgeInsets.fromLTRB(16, 0, 16, 8),
              child: Row(children: [
                Text('Class Notes', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
                const Spacer(),
                GestureDetector(
                  onTap: () {
                    Navigator.push(context, PageRouteBuilder(
                      pageBuilder: (_, __, ___) => StudentProfilePage(data: d, initialTab: 2),
                      transitionDuration: const Duration(milliseconds: 350),
                      reverseTransitionDuration: const Duration(milliseconds: 300),
                      transitionsBuilder: (_, a, __, c) => SlideTransition(
                        position: Tween(begin: const Offset(1, 0), end: Offset.zero).animate(
                          CurvedAnimation(parent: a, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)), child: c),
                    ));
                  },
                  child: Text('View all', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: HG.blue)),
                ),
              ]),
            ),
            SizedBox(
              height: 200,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                padding: EdgeInsets.fromLTRB(16, 0, 16, 0),
                itemCount: _allSessions(d).length,
                separatorBuilder: (_, __) => const SizedBox(width: 12),
                itemBuilder: (_, i) {
                  final (session, tutor) = _allSessions(d)[i];
                  return ClassDataCard(session: session, tutorName: tutor);
                },
              ),
            ),
            const SizedBox(height: 20),
            // Streak calendar
            Padding(
              padding: EdgeInsets.fromLTRB(16, 0, 16, 8),
              child: Text('Activity', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
            ),
            const StreakCalendar(),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }
}

// ── Folder Card ──
class _FolderCard extends StatelessWidget {
  final List<Color> grad;
  final String title, sub, desc, value, unit;
  final IconData icon;
  const _FolderCard({required this.grad, required this.title, required this.sub, required this.desc, required this.value, required this.unit, required this.icon});

  @override
  Widget build(BuildContext context) {
    final dark = context.isDark;
    final bg = dark ? const Color(0xFF161616) : Colors.white;
    final border = dark ? const Color(0xFF2C2C2C) : const Color(0xFFE5E7EB);
    final t1 = dark ? Colors.white : const Color(0xFF1A1A1A);
    final t2 = dark ? Colors.white.withValues(alpha: 0.42) : const Color(0xFF6B7280);
    final t3 = dark ? Colors.white.withValues(alpha: 0.5) : const Color(0xFF9CA3AF);
    return Container(
      width: 170,
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(28),
        border: Border.all(color: dark ? border : grad.first.withValues(alpha: 0.3), width: 1.5)),
      clipBehavior: Clip.antiAlias,
      child: Column(children: [
        Expanded(flex: 52, child: Container(
          margin: EdgeInsets.fromLTRB(1, 1, 1, 0),
          decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: grad),
            borderRadius: BorderRadius.vertical(top: Radius.circular(26))),
          child: Center(child: Icon(icon, size: 48, color: Colors.white.withValues(alpha: 0.35))),
        )),
        Expanded(flex: 48, child: Padding(
          padding: EdgeInsets.fromLTRB(14, 4, 14, 10),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: t1, letterSpacing: -0.3, height: 1.2)),
            Text(sub, style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.w400, color: t2)),
            const SizedBox(height: 2),
            Flexible(child: Text(desc, maxLines: 2, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 9.5, fontWeight: FontWeight.w400, color: t3, height: 1.3))),
            const Spacer(),
            Row(children: [
              Row(crossAxisAlignment: CrossAxisAlignment.baseline, textBaseline: TextBaseline.alphabetic, children: [
                Text(value, style: TextStyle(fontSize: 26, fontWeight: FontWeight.w700, color: t1, letterSpacing: -1, height: 1)),
                const SizedBox(width: 4),
                Text(unit, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w400, color: t3)),
              ]),
              const Spacer(),
              Text('\u00b7\u00b7\u00b7', style: TextStyle(fontSize: 14, color: dark ? Colors.white.withValues(alpha: 0.35) : const Color(0xFFD1D5DB), letterSpacing: 2.5)),
            ]),
          ]),
        )),
      ]),
    );
  }
}

// ── See More Card ──
class _SeeMoreCard extends StatelessWidget {
  final StudentData data;
  const _SeeMoreCard({required this.data});

  @override
  Widget build(BuildContext context) {
    final dark = context.isDark;
    final bg = dark ? const Color(0xFF161616) : Colors.white;
    final border = dark ? const Color(0xFF2C2C2C) : const Color(0xFFE5E7EB);
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        Navigator.push(context, MaterialPageRoute(builder: (_) => StudentAnalyticsPage(data: data)));
      },
      child: Container(
        width: 120,
        decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(28),
          border: Border.all(color: dark ? border : const Color(0xFFE8E6E1), width: 1.5)),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Container(
            width: 40, height: 40,
            decoration: BoxDecoration(shape: BoxShape.circle, color: HG.grey100),
            child: Icon(PhosphorIconsRegular.arrowRight, size: 18, color: HG.dark),
          ),
          const SizedBox(height: 8),
          Text('See More', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
        ]),
      ),
    );
  }
}

// ── Explore Tutors Card ──
class _ExploreTutorsCard extends StatelessWidget {
  const _ExploreTutorsCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 120,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(28),
        color: context.isDark ? const Color(0xFF1A1A1A) : const Color(0xFFF0EEEB),
        border: Border.all(color: context.isDark ? const Color(0xFF2C2C2C) : HG.grey200, width: 1.5),
      ),
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Container(
          width: 44, height: 44,
          decoration: BoxDecoration(shape: BoxShape.circle, color: context.isDark ? Colors.white.withValues(alpha: 0.08) : Colors.white),
          child: Icon(PhosphorIconsRegular.magnifyingGlass, size: 20, color: HG.dark),
        ),
        const SizedBox(height: 10),
        Text('Explore', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
        Text('More', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
      ]),
    );
  }
}
