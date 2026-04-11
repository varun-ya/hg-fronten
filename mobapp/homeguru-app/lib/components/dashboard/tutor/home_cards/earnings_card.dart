import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../../theme.dart';
import '../../../../models/tutor_data.dart';
import 'home_card_shell.dart';
import 'home_card_helpers.dart';

class EarningsCard extends StatelessWidget {
  const EarningsCard({super.key});

  @override
  Widget build(BuildContext context) {
    final d = TutorDataProvider.of(context);
    return HomeCardShell(color: HG.powderGreen, child: ListView(
      padding: EdgeInsets.only(bottom: 20),
      physics: const BouncingScrollPhysics(),
      children: [
        Row(children: [
          Text('EARNINGS', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.green, letterSpacing: 1)),
          const Spacer(),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(color: const Color(0xFF16A34A).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100)),
            child: const Row(mainAxisSize: MainAxisSize.min, children: [
              Icon(PhosphorIconsFill.trendUp, size: 11, color: Color(0xFF16A34A)),
              SizedBox(width: 3),
              Text('+18%', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Color(0xFF16A34A))),
            ]),
          ),
        ]),
        const SizedBox(height: 14),
        Text('\u20b9${d.earnedThisMonth}', style: TextStyle(fontSize: 42, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -1.5, height: 1)),
        const SizedBox(height: 2),
        Text('this month', style: TextStyle(fontSize: 13, color: HG.textMuted)),
        const SizedBox(height: 20),
        Card(
          elevation: 0, color: HG.cardOnPowder,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18), side: BorderSide(color: HG.cardOnPowderBorder)),
          margin: EdgeInsets.zero,
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Column(children: [
              HomeCardHelpers.kvRow('This week', '\u20b9${d.earnedThisWeek}', '${d.sessionsThisWeek} sessions'),
              const SizedBox(height: 12), Divider(height: 1, color: HG.grey200), const SizedBox(height: 12),
              HomeCardHelpers.kvRow('Last week', '\u20b93,800', '12 sessions'),
              const SizedBox(height: 12), Divider(height: 1, color: HG.grey200), const SizedBox(height: 12),
              HomeCardHelpers.kvRow('Pending payout', '\u20b9${d.pendingPayout}', 'Next: Jul 1'),
            ]),
          ),
        ),
        const SizedBox(height: 16),
        Text('Top students', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 10),
        ...d.students.take(4).map((s) => _earnerRow(s.name, '${s.sessions} sessions', '\u20b9${s.totalPaid}')),
        const SizedBox(height: 16),
        Text('Monthly trend', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 10),
        Card(
          elevation: 0, color: HG.cardOnPowder,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: HG.cardOnPowderBorder)),
          margin: EdgeInsets.zero,
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
              _bar('Jan', 0.4), _bar('Feb', 0.55), _bar('Mar', 0.45), _bar('Apr', 0.7), _bar('May', 0.85), _bar('Jun', 1.0),
            ]),
          ),
        ),
        const SizedBox(height: 20),
      ],
    ));
  }

  static Widget _earnerRow(String name, String sessions, String amount) => Container(
    margin: EdgeInsets.only(bottom: 8),
    decoration: HomeCardHelpers.innerCardDeco(radius: 12),
    child: ListTile(
      dense: true, visualDensity: VisualDensity.compact,
      contentPadding: EdgeInsets.symmetric(horizontal: 14),
      leading: CircleAvatar(radius: 14, backgroundColor: HG.green.withValues(alpha: 0.12),
        child: Text(name[0], style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.green))),
      title: Text(name, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
      subtitle: Text(sessions, style: TextStyle(fontSize: 11, color: HG.textMuted)),
      trailing: Text(amount, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
    ),
  );

  static Widget _bar(String label, double fill) => Expanded(
    child: Padding(
      padding: EdgeInsets.symmetric(horizontal: 4),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        Container(height: 60 * fill, decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.2 + fill * 0.6), borderRadius: BorderRadius.circular(6))),
        const SizedBox(height: 6),
        Text(label, style: TextStyle(fontSize: 9, color: HG.textMuted)),
      ]),
    ),
  );
}
