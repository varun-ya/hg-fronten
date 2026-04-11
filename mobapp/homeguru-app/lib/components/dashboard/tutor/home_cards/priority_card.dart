import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../../theme.dart';
import '../../../../models/tutor_data.dart';
import '../../../../models/user_session.dart';
import '../../shared/dashboard_shell.dart';
import '../../../../screens/meet/meet_screen.dart';
import '../../../../components/dashboard/tutor/schedule/scheduled_class.dart' show meetUrl;
import '../../../../screens/dashboard/tutor/tutor_feed_tab.dart' show feedTabRequest;
import 'home_card_shell.dart';
import 'home_card_helpers.dart';

class PriorityCard extends StatelessWidget {
  final DateTime now;
  const PriorityCard({super.key, required this.now});

  @override
  Widget build(BuildContext context) {
    final d = TutorDataProvider.of(context);
    final reqs = d.demoRequests;
    return HomeCardShell(color: HG.powderOrange, child: ListView(
      padding: EdgeInsets.only(bottom: 20),
      physics: const BouncingScrollPhysics(),
      children: [
        _heroCard(context),
        const SizedBox(height: 16),
        _sectionHeader(PhosphorIconsFill.userPlus, 'DEMO REQUESTS', '${reqs.length} new'),
        const SizedBox(height: 10),
        for (final r in reqs.take(2))
          _requestTile(r.name, r.subject, r.grade, r.time),
        const SizedBox(height: 10),
        _viewMoreBtn(context),
        const SizedBox(height: 16),
        _sectionHeader(PhosphorIconsFill.listChecks, 'TO DO', '5 pending'),
        const SizedBox(height: 10),
        _todoTile(PhosphorIconsRegular.fileText, 'Grade ${d.students[0].name.split(' ')[0]}\'s assignment', 'Due today'),
        _todoTile(PhosphorIconsRegular.chatCircle, 'Reply to ${d.students[4].name.split(' ')[0]}', '2h ago'),
        _todoTile(PhosphorIconsRegular.calendarPlus, 'Confirm ${d.students[6].name.split(' ')[0]}\'s session', 'Tomorrow'),
        _todoTile(PhosphorIconsRegular.notebook, 'Update lesson plan', 'This week'),
        _todoTile(PhosphorIconsRegular.exam, 'Create mock test', 'By Friday'),
        const SizedBox(height: 16),
        _sectionHeader(PhosphorIconsFill.chatCircle, 'MESSAGES', '2 unread'),
        const SizedBox(height: 10),
        _msgTile(d.students[2].name, 'Can we reschedule tomorrow\'s class?', '20m'),
        _msgTile(d.students[3].name, 'Doubt in organic chemistry reaction', '1h'),
        const SizedBox(height: 16),
        Row(children: [
          _miniCard('${d.sessionsThisWeek}', 'Sessions\nthis week'),
          const SizedBox(width: 8),
          _miniCard('${d.hoursTaught}', 'Hours\ntaught'),
          const SizedBox(width: 8),
          _miniCard('${d.avgRating}', 'Avg\nrating'),
        ]),
      ],
    ));
  }

  // ── Meeting hero ──
  Widget _heroCard(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(22),
        gradient: const LinearGradient(
          begin: Alignment.topLeft, end: Alignment.bottomRight,
          colors: [Color(0xFF1A1A2E), Color(0xFF16213E)],
        ),
        boxShadow: [
          BoxShadow(color: const Color(0xFF1A1A2E).withValues(alpha: 0.35), blurRadius: 16, offset: const Offset(0, 6)),
        ],
      ),
      child: Stack(children: [
        // Subtle glow accent
        Positioned(top: -20, right: -20, child: Container(
          width: 100, height: 100,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: RadialGradient(colors: [
              const Color(0xFF4ADE80).withValues(alpha: 0.15),
              Colors.transparent,
            ]),
          ),
        )),
        Padding(
          padding: EdgeInsets.all(18),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            // Top row: live badge + subject pill
            Row(children: [
              Container(
                padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  color: const Color(0xFF22C55E).withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(100),
                  border: Border.all(color: const Color(0xFF4ADE80).withValues(alpha: 0.25)),
                ),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Container(width: 6, height: 6, decoration: BoxDecoration(color: Color(0xFF4ADE80), shape: BoxShape.circle)),
                  const SizedBox(width: 6),
                  Text('LIVE in 10 min', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Color(0xFF4ADE80), letterSpacing: 0.3)),
                ]),
              ),
              const Spacer(),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: HG.fixedWhite.withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(100),
                ),
                child: Text('English Lit', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.fixedWhite.withValues(alpha: 0.6))),
              ),
            ]),
            const SizedBox(height: 16),
            // Student info
            Row(children: [
              Container(
                width: 44, height: 44,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14),
                  color: HG.fixedWhite.withValues(alpha: 0.1),
                  border: Border.all(color: HG.fixedWhite.withValues(alpha: 0.08)),
                ),
                child: Center(child: Text('MI', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.fixedWhite))),
              ),
              const SizedBox(width: 14),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('Meera Iyer', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: HG.fixedWhite, height: 1.2)),
                const SizedBox(height: 3),
                Row(children: [
                  Icon(PhosphorIconsRegular.clock, size: 12, color: HG.fixedWhite.withValues(alpha: 0.4)),
                  const SizedBox(width: 4),
                  Text(HomeCardHelpers.fmtTime(now), style: TextStyle(fontSize: 12, color: HG.fixedWhite.withValues(alpha: 0.45))),
                  const SizedBox(width: 10),
                  Icon(PhosphorIconsRegular.timer, size: 12, color: HG.fixedWhite.withValues(alpha: 0.4)),
                  const SizedBox(width: 4),
                  Text('45 min', style: TextStyle(fontSize: 12, color: HG.fixedWhite.withValues(alpha: 0.45))),
                ]),
              ])),
            ]),
            const SizedBox(height: 16),
            // Join button — full width
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: () {
                  HapticFeedback.mediumImpact();
                  final name = UserSession.name.isNotEmpty ? UserSession.name : 'Tutor';
                  Navigator.push(context, MaterialPageRoute(
                    builder: (_) => MeetScreen(role: MeetRole.tutor, userName: name, meetingId: meetUrl),
                  ));
                },
                icon: Icon(PhosphorIconsBold.videoCamera, size: 15),
                label: Text('Join Class'),
                style: FilledButton.styleFrom(
                  backgroundColor: HG.fixedWhite,
                  foregroundColor: HG.fixedDark,
                  padding: EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font),
                ),
              ),
            ),
          ]),
        ),
      ]),
    );
  }

  // ── Demo request tile ──
  static Widget _requestTile(String name, String subject, String grade, String time) => Container(
    margin: EdgeInsets.only(bottom: 6),
    decoration: HomeCardHelpers.innerCardDeco(),
    child: Padding(
      padding: EdgeInsets.all(14),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        CircleAvatar(radius: 18, backgroundColor: HG.blue.withValues(alpha: 0.08),
          child: Text(name[0], style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.blue))),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Expanded(child: Text(name, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark))),
            Text(time, style: TextStyle(fontSize: 11, color: HG.textLight)),
          ]),
          const SizedBox(height: 5),
          Row(children: [
            Container(
              padding: EdgeInsets.symmetric(horizontal: 7, vertical: 2),
              decoration: BoxDecoration(color: HG.powderBlue, borderRadius: BorderRadius.circular(6)),
              child: Text(subject, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.blue)),
            ),
            const SizedBox(width: 6),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 7, vertical: 2),
              decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(6)),
              child: Text(grade, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w500, color: HG.textMuted)),
            ),
          ]),
        ])),
      ]),
    ),
  );

  // ── View more button → Feed tab > Requests ──
  static Widget _viewMoreBtn(BuildContext context) => GestureDetector(
    onTap: () {
      HapticFeedback.mediumImpact();
      DashboardShell.switchTab(context, 3);
      feedTabRequest.value = 2;
    },
    child: Container(
      padding: EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        color: HG.blue.withValues(alpha: 0.06),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: HG.blue.withValues(alpha: 0.12)),
      ),
      child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text('View all requests', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.blue)),
        const SizedBox(width: 6),
        Icon(PhosphorIconsBold.arrowRight, size: 14, color: HG.blue),
      ]),
    ),
  );

  static Widget _sectionHeader(IconData icon, String title, String badge) => Row(children: [
    Icon(icon, size: 14, color: HG.orange),
    const SizedBox(width: 6),
    Text(title, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.orange, letterSpacing: 0.8)),
    const Spacer(),
    Text(badge, style: TextStyle(fontSize: 11, color: HG.orange.withValues(alpha: 0.6))),
  ]);

  static Widget _todoTile(IconData icon, String title, String badge) => Container(
    margin: EdgeInsets.only(bottom: 5),
    decoration: HomeCardHelpers.innerCardDeco(),
    child: ListTile(
      dense: true, visualDensity: VisualDensity.compact,
      contentPadding: EdgeInsets.symmetric(horizontal: 14),
      leading: Icon(icon, size: 16, color: HG.textMuted),
      title: Text(title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: HG.dark)),
      trailing: Text(badge, style: TextStyle(fontSize: 11, color: HG.textLight)),
    ),
  );

  static Widget _msgTile(String name, String msg, String time) => Container(
    margin: EdgeInsets.only(bottom: 5),
    decoration: HomeCardHelpers.innerCardDeco(),
    child: ListTile(
      dense: true, visualDensity: VisualDensity.compact,
      contentPadding: EdgeInsets.symmetric(horizontal: 14),
      leading: CircleAvatar(radius: 14, backgroundColor: HG.orange.withValues(alpha: 0.1),
        child: Text(name[0], style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.orange))),
      title: Text(name, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark)),
      subtitle: Text(msg, style: TextStyle(fontSize: 11, color: HG.textMuted), maxLines: 1, overflow: TextOverflow.ellipsis),
      trailing: Text(time, style: TextStyle(fontSize: 10, color: HG.textLight)),
    ),
  );

  static Widget _miniCard(String val, String label) => Expanded(
    child: Container(
      decoration: HomeCardHelpers.innerCardDeco(),
      padding: EdgeInsets.symmetric(vertical: 14, horizontal: 10),
      child: Column(children: [
        Text(val, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: HG.dark)),
        const SizedBox(height: 4),
        Text(label, style: TextStyle(fontSize: 10, color: HG.textMuted, height: 1.3), textAlign: TextAlign.center),
      ]),
    ),
  );
}
