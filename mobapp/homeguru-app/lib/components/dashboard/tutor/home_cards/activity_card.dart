import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../../theme.dart';
import 'home_card_shell.dart';
import 'home_card_helpers.dart';

class ActivityCard extends StatelessWidget {
  const ActivityCard({super.key});

  @override
  Widget build(BuildContext context) {
    return HomeCardShell(color: HG.powderPurple, child: ListView(
      padding: EdgeInsets.only(bottom: 20),
      physics: const BouncingScrollPhysics(),
      children: [
        Row(children: [
          Text('STUDENT ACTIVITY', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.purple, letterSpacing: 1)),
          Spacer(),
          Text('Today', style: TextStyle(fontSize: 11, color: HG.textMuted)),
        ]),
        const SizedBox(height: 16),
        _actItem('S', 'Sneha Kapoor', 'scored 247/300 in JEE Mock #8', '45m', PhosphorIconsFill.exam),
        _actItem('A', 'Aarav Sharma', 'submitted Quadratic Equations assignment', '2h', PhosphorIconsFill.fileText),
        _actItem('P', 'Priya Patel', 'rescheduled Physics to 11:30 AM tomorrow', '3h', PhosphorIconsFill.calendarX),
        _actItem('R', 'Rohan Gupta', 'completed Organic Chemistry practice set', '5h', PhosphorIconsFill.checkCircle),
        _actItem('M', 'Meera Iyer', 'started English Literature chapter 8', '6h', PhosphorIconsFill.bookOpen),
        _actItem('K', 'Kavya Singh', 'asked a doubt in JEE Prep group', '8h', PhosphorIconsFill.chatCircle),
        _actItem('A', 'Amit Verma', 'completed Calculus assignment early', '10h', PhosphorIconsFill.checkCircle),
        _actItem('S', 'Sneha Kapoor', 'started revision for JEE Mock #9', '12h', PhosphorIconsFill.bookOpen),
        const SizedBox(height: 14),
        Text('This week', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 10),
        Card(
          elevation: 0, color: HG.cardOnPowder,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: HG.cardOnPowderBorder)),
          margin: EdgeInsets.zero,
          child: Padding(
            padding: EdgeInsets.all(14),
            child: Column(children: [
              HomeCardHelpers.statRow('Assignments submitted', '12'),
              const SizedBox(height: 8),
              HomeCardHelpers.statRow('Doubts asked', '8'),
              const SizedBox(height: 8),
              HomeCardHelpers.statRow('Practice sets completed', '15'),
              const SizedBox(height: 8),
              HomeCardHelpers.statRow('Average score', '78%'),
            ]),
          ),
        ),
        const SizedBox(height: 20),
      ],
    ));
  }

  static Widget _actItem(String initial, String name, String action, String time, IconData icon) => Container(
    margin: EdgeInsets.only(bottom: 6),
    decoration: HomeCardHelpers.innerCardDeco(),
    child: ListTile(
      dense: true, visualDensity: VisualDensity.compact,
      contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 4),
      leading: CircleAvatar(radius: 16, backgroundColor: HG.purple.withValues(alpha: 0.1),
        child: Text(initial, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.purple))),
      title: Row(children: [
        Expanded(child: Text(name, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark))),
        Text(time, style: TextStyle(fontSize: 11, color: HG.textLight)),
      ]),
      subtitle: Row(children: [
        Icon(icon, size: 12, color: HG.purple.withValues(alpha: 0.5)),
        const SizedBox(width: 5),
        Expanded(child: Text(action, style: TextStyle(fontSize: 12, color: HG.textMuted))),
      ]),
    ),
  );
}
