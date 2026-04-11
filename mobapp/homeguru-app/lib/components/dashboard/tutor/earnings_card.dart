import 'package:flutter/material.dart';
import '../../../../theme.dart';

class EarningsCard extends StatelessWidget {
  const EarningsCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(16)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Text('This month', style: TextStyle(fontSize: 13, color: Color(0xFF94A3B8))),
          const Spacer(),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(color: HG.white.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100)),
            child: Text('32 sessions', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.white)),
          ),
        ]),
        const SizedBox(height: 8),
        Text('\u20b912,400', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w800, color: HG.white, height: 1)),
        const SizedBox(height: 12),
        Container(height: 1, color: HG.white.withValues(alpha: 0.08)),
        const SizedBox(height: 12),
        Row(children: [
          _miniStat('\u20b948.6K', 'Total earned'),
          Container(width: 1, height: 28, color: HG.white.withValues(alpha: 0.08)),
          _miniStat('18', 'Students'),
          Container(width: 1, height: 28, color: HG.white.withValues(alpha: 0.08)),
          _miniStat('4.8', 'Rating'),
        ]),
      ]),
    );
  }

  static Widget _miniStat(String value, String label) => Expanded(child: Column(children: [
    Text(value, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.white)),
    const SizedBox(height: 2),
    Text(label, style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
  ]));
}
