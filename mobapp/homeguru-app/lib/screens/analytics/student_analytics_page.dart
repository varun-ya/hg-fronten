import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../theme.dart';
import '../../models/student_data.dart';

class StudentAnalyticsPage extends StatelessWidget {
  final StudentData data;
  const StudentAnalyticsPage({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final d = data;
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: ListView(
          padding: EdgeInsets.zero,
          physics: const BouncingScrollPhysics(),
          children: [
            // Header
            Padding(
              padding: EdgeInsets.fromLTRB(8, pt + 6, 16, 0),
              child: Row(children: [
                IconButton(onPressed: () => Navigator.pop(context),
                  icon: Icon(PhosphorIconsBold.arrowLeft, size: 18),
                  style: IconButton.styleFrom(backgroundColor: HG.grey50, foregroundColor: HG.dark, fixedSize: const Size(36, 36))),
                const SizedBox(width: 10),
                Text('Analytics', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: HG.dark)),
              ]),
            ),
            const SizedBox(height: 16),

            // ── Big stat cards ──
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Row(children: [
                _bigStat('${d.streak}', 'Day Streak', PhosphorIconsFill.flame, HG.orange, HG.orange.withValues(alpha: 0.06)),
                const SizedBox(width: 10),
                _bigStat('${d.xp}', 'Total XP', PhosphorIconsFill.star, HG.purple, HG.purple.withValues(alpha: 0.06)),
              ]),
            ),
            const SizedBox(height: 10),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Row(children: [
                _bigStat('${d.sessionsThisWeek}', 'Classes', PhosphorIconsFill.bookOpen, HG.blue, HG.blue.withValues(alpha: 0.06)),
                const SizedBox(width: 10),
                _bigStat('${d.hoursThisWeek}h', 'Hours', PhosphorIconsFill.hourglass, HG.green, HG.green.withValues(alpha: 0.06)),
              ]),
            ),
            const SizedBox(height: 24),

            // ── Weekly breakdown ──
            _section('This Week'),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: HG.grey200)),
                child: Column(children: [
                  _kvRow('Sessions completed', '${d.sessionsThisWeek}'),
                  Divider(height: 20, color: HG.grey200),
                  _kvRow('Hours learned', '${d.hoursThisWeek}h'),
                  Divider(height: 20, color: HG.grey200),
                  _kvRow('XP earned', '85'),
                  Divider(height: 20, color: HG.grey200),
                  _kvRow('Assignments done', '3'),
                  Divider(height: 20, color: HG.grey200),
                  _kvRow('Streak maintained', '${d.streak} days'),
                ]),
              ),
            ),
            const SizedBox(height: 24),

            // ── Weekly bar chart ──
            _section('Weekly Activity'),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: HG.grey200)),
                child: Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
                  _bar('Mon', 0.6, HG.blue),
                  _bar('Tue', 0.8, HG.blue),
                  _bar('Wed', 0.4, HG.blue),
                  _bar('Thu', 1.0, HG.blue),
                  _bar('Fri', 0.7, HG.blue),
                  _bar('Sat', 0.3, HG.blue),
                  _bar('Sun', 0.0, HG.blue),
                ]),
              ),
            ),
            const SizedBox(height: 24),

            // ── Subject-wise progress ──
            _section('Subject Progress'),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Column(children: [
                _progressCard('Mathematics', 'Ch. 5: Quadratics', 0.65, const Color(0xFF4A7CF5)),
                _progressCard('Physics', 'Newton\'s Laws', 0.40, const Color(0xFFE85060)),
                _progressCard('English', 'Essay Writing', 0.80, const Color(0xFF22C55E)),
              ]),
            ),
            const SizedBox(height: 24),

            // ── Tutor-wise sessions ──
            _section('Sessions by Tutor'),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: HG.grey200)),
                child: Column(children: [
                  ...d.tutors.map((t) => Padding(
                    padding: EdgeInsets.only(bottom: d.tutors.last == t ? 0 : 12),
                    child: Row(children: [
                      CircleAvatar(radius: 16, backgroundColor: HG.powderBlue,
                        child: Text(t.avatar, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.blue))),
                      const SizedBox(width: 10),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(t.name, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
                        Text(t.subject, style: TextStyle(fontSize: 11, color: HG.textMuted)),
                      ])),
                      Text('12 sessions', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.dark)),
                    ]),
                  )),
                ]),
              ),
            ),
            const SizedBox(height: 24),

            // ── Achievements ──
            _section('Achievements'),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Column(children: [
                _achievement(PhosphorIconsFill.flame, '7-day streak', 'Learning every day for a week', HG.orange),
                _achievement(PhosphorIconsFill.trophy, 'Top 15%', 'Weekly leaderboard rank', HG.amber),
                _achievement(PhosphorIconsFill.lightning, '1,240 XP', 'Total experience points', HG.purple),
                _achievement(PhosphorIconsFill.bookOpen, '16 classes', 'Sessions completed', HG.blue),
                _achievement(PhosphorIconsFill.checkCircle, '12 assignments', 'Submitted on time', HG.green),
              ]),
            ),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _section(String title) => Padding(
    padding: EdgeInsets.fromLTRB(16, 0, 16, 10),
    child: Text(title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
  );

  Widget _bigStat(String value, String label, IconData icon, Color accent, Color bg) => Expanded(
    child: Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: HG.grey200)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(width: 32, height: 32,
          decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(9)),
          child: Icon(icon, size: 15, color: accent)),
        const SizedBox(height: 12),
        Text(value, style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.5, height: 1)),
        const SizedBox(height: 3),
        Text(label, style: TextStyle(fontSize: 12, color: HG.textMuted)),
      ]),
    ),
  );

  Widget _kvRow(String label, String value) => Row(children: [
    Expanded(child: Text(label, style: TextStyle(fontSize: 13, color: HG.textMuted))),
    Text(value, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
  ]);

  Widget _bar(String day, double fill, Color color) => Expanded(
    child: Padding(
      padding: EdgeInsets.symmetric(horizontal: 4),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        Container(height: 60 * fill.clamp(0.05, 1.0),
          decoration: BoxDecoration(color: fill > 0 ? color.withValues(alpha: 0.15 + fill * 0.5) : HG.grey100, borderRadius: BorderRadius.circular(6))),
        const SizedBox(height: 6),
        Text(day, style: TextStyle(fontSize: 9, color: HG.textMuted)),
      ]),
    ),
  );

  Widget _progressCard(String subject, String chapter, double progress, Color color) => Container(
    margin: EdgeInsets.only(bottom: 8),
    padding: EdgeInsets.all(14),
    decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
    child: Row(children: [
      Container(width: 36, height: 36,
        decoration: BoxDecoration(color: color.withValues(alpha: 0.06), borderRadius: BorderRadius.circular(10)),
        child: Icon(PhosphorIconsFill.bookOpen, size: 15, color: color)),
      const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Text(subject, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
          const Spacer(),
          Text('${(progress * 100).round()}%', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: color)),
        ]),
        const SizedBox(height: 3),
        Text(chapter, style: TextStyle(fontSize: 11, color: HG.textMuted)),
        const SizedBox(height: 6),
        ClipRRect(borderRadius: BorderRadius.circular(3),
          child: LinearProgressIndicator(value: progress, minHeight: 4, backgroundColor: HG.grey200, color: color)),
      ])),
    ]),
  );

  Widget _achievement(IconData icon, String title, String sub, Color color) => Container(
    margin: EdgeInsets.only(bottom: 8),
    padding: EdgeInsets.all(14),
    decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
    child: Row(children: [
      Container(width: 36, height: 36,
        decoration: BoxDecoration(color: color.withValues(alpha: 0.06), borderRadius: BorderRadius.circular(10)),
        child: Icon(icon, size: 15, color: color)),
      const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 2),
        Text(sub, style: TextStyle(fontSize: 11, color: HG.textMuted)),
      ])),
    ]),
  );
}
