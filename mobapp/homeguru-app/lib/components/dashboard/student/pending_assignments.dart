import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../../theme.dart';

class PendingAssignments extends StatelessWidget {
  const PendingAssignments({super.key});

  static const _items = [
    ('Quadratic Equations', 'Maths', 'Due tomorrow', HG.red),
    ('Newton\'s 3rd Law Essay', 'Physics', 'Due in 3 days', HG.orange),
    ('Grammar Worksheet', 'English', 'Due in 5 days', HG.green),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        Text('Pending Assignments', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(width: 8),
        Container(
          padding: EdgeInsets.symmetric(horizontal: 8, vertical: 2),
          decoration: BoxDecoration(color: HG.red.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100)),
          child: Text('${_items.length}', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.red)),
        ),
      ]),
      const SizedBox(height: 12),
      ...List.generate(_items.length, (i) {
        final item = _items[i];
        return Padding(
          padding: EdgeInsets.only(bottom: i < _items.length - 1 ? 8 : 0),
          child: Container(
            padding: EdgeInsets.all(14),
            decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.border)),
            child: Row(children: [
              Container(width: 4, height: 36, decoration: BoxDecoration(color: item.$4, borderRadius: BorderRadius.circular(2))),
              const SizedBox(width: 12),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(item.$1, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark)),
                const SizedBox(height: 2),
                Text('${item.$2}  \u00b7  ${item.$3}', style: TextStyle(fontSize: 12, color: item.$4, fontWeight: FontWeight.w500)),
              ])),
              Icon(PhosphorIconsRegular.caretRight, size: 16, color: HG.grey300),
            ]),
          ),
        );
      }),
    ]);
  }
}
