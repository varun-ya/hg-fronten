import 'package:flutter/material.dart';
import '../../../theme.dart';

class StatCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final String? badge;
  const StatCard({super.key, required this.icon, required this.label, required this.value, this.badge});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.border)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Icon(icon, size: 20, color: HG.dark),
        const SizedBox(height: 10),
        Text(value, style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 2),
        Text(label, style: TextStyle(fontSize: 12, color: HG.textMuted)),
        if (badge != null) ...[
          const SizedBox(height: 6),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(100)),
            child: Text(badge!, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.grey500)),
          ),
        ],
      ]),
    );
  }
}
