import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../../theme.dart';
import 'home_card_shell.dart';
import 'home_card_helpers.dart';

class TodayCard extends StatelessWidget {
  const TodayCard({super.key});

  @override
  Widget build(BuildContext context) {
    return HomeCardShell(color: HG.powderBlue, child: ListView(
      padding: EdgeInsets.only(bottom: 20),
      physics: const BouncingScrollPhysics(),
      children: [
        Text('TODAY', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.blue, letterSpacing: 1)),
        const SizedBox(height: 16),
        Row(children: [_numCell('3', 'Classes'), const SizedBox(width: 10), _numCell('2', 'Completed')]),
        const SizedBox(height: 10),
        Row(children: [_numCell('\u20b91,500', 'Earned'), const SizedBox(width: 10), _numCell('1', 'Pending')]),
        const SizedBox(height: 20),
        Row(children: [
          Text('Schedule', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
          const Spacer(),
          GestureDetector(onTap: () {}, child: Text('View all', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.blue))),
        ]),
        const SizedBox(height: 10),
        _schedItem('9:00 AM', 'Meera Iyer', 'English Lit', 'Done'),
        _schedItem('10:30 AM', 'Aarav Sharma', 'Mathematics', 'Done'),
        _schedItem('11:30 AM', 'Priya Patel', 'Physics', 'Next'),
        _schedItem('2:00 PM', 'Rohan Gupta', 'Chemistry', ''),
        _schedItem('4:30 PM', 'Kavya Singh', 'JEE Prep', ''),
        _schedItem('6:00 PM', 'Amit Verma', 'Calculus', ''),
        const SizedBox(height: 16),
        Text('Highlights', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 10),
        _highlightTile(PhosphorIconsFill.trophy, 'Sneha scored 247/300', 'JEE Mock #8', HG.amber),
        _highlightTile(PhosphorIconsFill.checkCircle, '2 assignments submitted', 'Aarav, Rohan', HG.green),
        _highlightTile(PhosphorIconsFill.userPlus, 'New student request', 'Ananya Reddy \u00b7 Physics', HG.blue),
        const SizedBox(height: 20),
      ],
    ));
  }

  static Widget _numCell(String val, String label) => Expanded(
    child: Container(
      decoration: HomeCardHelpers.innerCardDeco(radius: 16),
      padding: EdgeInsets.symmetric(vertical: 18),
      child: Column(children: [
        Text(val, style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.5)),
        const SizedBox(height: 2),
        Text(label, style: TextStyle(fontSize: 11, color: HG.textMuted)),
      ]),
    ),
  );

  static Widget _schedItem(String time, String name, String subject, String status) {
    final isNext = status == 'Next';
    final isDone = status == 'Done';
    return Container(
      margin: EdgeInsets.only(bottom: 4),
      decoration: isNext ? HomeCardHelpers.innerCardDeco(radius: 12) : null,
      padding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      child: Row(children: [
          SizedBox(width: 62, child: Text(time, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: isDone ? HG.textLight : isNext ? HG.blue : HG.textMuted))),
          if (isNext) Container(width: 6, height: 6, margin: EdgeInsets.only(right: 10), decoration: BoxDecoration(color: HG.blue, shape: BoxShape.circle)),
          if (!isNext) const SizedBox(width: 16),
          Expanded(child: Text(name, style: TextStyle(fontSize: 13, fontWeight: isNext ? FontWeight.w600 : FontWeight.w400, color: isDone ? HG.textLight : HG.dark,
            decoration: isDone ? TextDecoration.lineThrough : null, decorationColor: HG.textLight))),
          Text(subject, style: TextStyle(fontSize: 11, color: isDone ? HG.textLight : HG.textMuted)),
        ]),
    );
  }

  static Widget _highlightTile(IconData icon, String title, String sub, Color c) => Container(
    margin: EdgeInsets.only(bottom: 6),
    decoration: HomeCardHelpers.innerCardDeco(),
    child: ListTile(
      dense: true, visualDensity: VisualDensity.compact,
      contentPadding: EdgeInsets.symmetric(horizontal: 14),
      leading: Container(width: 32, height: 32,
        decoration: BoxDecoration(color: c.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(8)),
        child: Icon(icon, size: 15, color: c)),
      title: Text(title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
      subtitle: Text(sub, style: TextStyle(fontSize: 11, color: HG.textMuted)),
    ),
  );
}
