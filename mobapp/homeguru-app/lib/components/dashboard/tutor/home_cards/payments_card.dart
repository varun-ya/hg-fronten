import 'package:flutter/material.dart';
import '../../../../theme.dart';
import 'home_card_shell.dart';
import 'home_card_helpers.dart';

class PaymentsCard extends StatelessWidget {
  const PaymentsCard({super.key});

  @override
  Widget build(BuildContext context) {
    return HomeCardShell(color: HG.powderAmber, child: ListView(
      padding: EdgeInsets.only(bottom: 20),
      physics: const BouncingScrollPhysics(),
      children: [
        Row(children: [
          Text('PAYMENTS', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.amber, letterSpacing: 1)),
          const Spacer(),
          GestureDetector(onTap: () {}, child: Text('See all', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.blue))),
        ]),
        const SizedBox(height: 14),
        Card(
          elevation: 0, color: HG.cardOnPowder,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18), side: BorderSide(color: HG.cardOnPowderBorder)),
          margin: EdgeInsets.zero,
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Row(children: [
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('Received', style: TextStyle(fontSize: 11, color: HG.textMuted)),
                const SizedBox(height: 2),
                Text('\u20b910,000', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark)),
              ])),
              Container(width: 1, height: 36, color: HG.amber.withValues(alpha: 0.2)),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
                Text('Pending', style: TextStyle(fontSize: 11, color: HG.textMuted)),
                const SizedBox(height: 2),
                Text('\u20b92,400', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.orange)),
              ])),
            ]),
          ),
        ),
        const SizedBox(height: 16),
        Text('Recent', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 10),
        _payItem('A', 'Aarav Sharma', 'Mathematics', '\u20b9500', 'Today'),
        _payItem('P', 'Priya Patel', 'Physics', '\u20b9500', 'Today'),
        _payItem('S', 'Sneha Kapoor', 'JEE Advanced', '\u20b9800', 'Yesterday'),
        _payItem('K', 'Kavya Singh', 'JEE Prep', '\u20b9600', 'Yesterday'),
        _payItem('R', 'Rohan Gupta', 'Chemistry', '\u20b90', 'Demo'),
        _payItem('M', 'Meera Iyer', 'English Lit', '\u20b9500', 'Mon'),
        _payItem('A', 'Amit Verma', 'Calculus', '\u20b9600', 'Mon'),
        const SizedBox(height: 14),
        Text('This month', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 10),
        Card(
          elevation: 0, color: HG.cardOnPowder,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: HG.cardOnPowderBorder)),
          margin: EdgeInsets.zero,
          child: Padding(
            padding: EdgeInsets.all(14),
            child: Column(children: [
              HomeCardHelpers.statRow('Total sessions', '42'),
              const SizedBox(height: 8),
              HomeCardHelpers.statRow('Paid sessions', '38'),
              const SizedBox(height: 8),
              HomeCardHelpers.statRow('Demo sessions', '4'),
              const SizedBox(height: 8),
              HomeCardHelpers.statRow('Avg per session', '\u20b9450'),
            ]),
          ),
        ),
        const SizedBox(height: 20),
      ],
    ));
  }

  static Widget _payItem(String initial, String name, String subject, String amount, String time) => Container(
    margin: EdgeInsets.only(bottom: 6),
    decoration: HomeCardHelpers.innerCardDeco(),
    child: ListTile(
      dense: true, visualDensity: VisualDensity.compact,
      contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 4),
      leading: CircleAvatar(radius: 16, backgroundColor: HG.amber.withValues(alpha: 0.15),
        child: Text(initial, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.amber))),
      title: Text(name, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
      subtitle: Text(subject, style: TextStyle(fontSize: 11, color: HG.textMuted)),
      trailing: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.end, children: [
        Text(amount, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
        Text(time, style: TextStyle(fontSize: 10, color: HG.textLight)),
      ]),
    ),
  );
}
