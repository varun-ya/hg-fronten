import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../../theme.dart';

class TodaySchedule extends StatelessWidget {
  const TodaySchedule({super.key});

  static const _sessions = [
    ('Aarav S.', 'Mathematics', '10:00', 'AM', '45 min', true),
    ('Priya P.', 'Physics', '11:30', 'AM', '1 hr', false),
    ('Rohan G.', 'Chemistry', '2:00', 'PM', '45 min', false),
    ('Sneha K.', 'English', '4:00', 'PM', '1 hr', false),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        Text("Today's Schedule", style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.textMuted)),
        const Spacer(),
        Text('${_sessions.length} sessions', style: TextStyle(fontSize: 12, color: HG.textLight)),
      ]),
      const SizedBox(height: 12),
      ...List.generate(_sessions.length, (i) {
        final s = _sessions[i];
        return Column(children: [
          Padding(
            padding: EdgeInsets.symmetric(vertical: 10),
            child: Row(children: [
              // Time
              SizedBox(width: 44, child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(s.$3, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: s.$6 ? HG.orange : HG.dark)),
                Text(s.$4, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: s.$6 ? HG.orange : HG.textLight)),
              ])),
              const SizedBox(width: 12),
              // Dot + line
              Container(width: 8, height: 8, decoration: BoxDecoration(color: s.$6 ? HG.orange : HG.grey300, shape: BoxShape.circle)),
              const SizedBox(width: 12),
              // Info
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Text(s.$2, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark)),
                  if (s.$6) ...[
                    const SizedBox(width: 8),
                    Container(padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2), decoration: BoxDecoration(color: HG.green, borderRadius: BorderRadius.circular(4)),
                      child: Text('LIVE', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: HG.white, letterSpacing: 0.5))),
                  ],
                ]),
                Text('${s.$1} \u00b7 ${s.$5}', style: TextStyle(fontSize: 12, color: HG.textMuted)),
              ])),
              Icon(PhosphorIconsRegular.caretRight, size: 14, color: HG.grey300),
            ]),
          ),
          if (i < _sessions.length - 1) Padding(
            padding: EdgeInsets.only(left: 56),
            child: Container(height: 1, color: HG.grey100),
          ),
        ]);
      }),
    ]);
  }
}
