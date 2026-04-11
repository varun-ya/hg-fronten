import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../../theme.dart';

class SessionTile extends StatelessWidget {
  final String subject;
  final String tutor;
  final String time;
  final String duration;
  final bool isLive;
  const SessionTile({super.key, required this.subject, required this.tutor, required this.time, required this.duration, this.isLive = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(14),
      decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.border)),
      child: Row(children: [
        // Time block
        Container(
          width: 48, height: 48,
          decoration: BoxDecoration(color: isLive ? HG.orange.withValues(alpha: 0.08) : HG.grey100, borderRadius: BorderRadius.circular(10)),
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            Text(time.split(':')[0], style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: isLive ? HG.orange : HG.dark)),
            Text(time.contains('PM') ? 'PM' : 'AM', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w600, color: isLive ? HG.orange : HG.textLight)),
          ]),
        ),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Expanded(child: Text(subject, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark))),
            if (isLive) Container(
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(color: HG.green, borderRadius: BorderRadius.circular(100)),
              child: Text('LIVE', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: HG.white, letterSpacing: 0.5)),
            ),
          ]),
          const SizedBox(height: 3),
          Text('with $tutor  \u00b7  $duration', style: TextStyle(fontSize: 12, color: HG.textMuted)),
        ])),
        const SizedBox(width: 8),
        Icon(PhosphorIconsRegular.caretRight, size: 16, color: HG.grey300),
      ]),
    );
  }
}

class UpcomingSessions extends StatelessWidget {
  const UpcomingSessions({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        Text('Upcoming Sessions', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
        const Spacer(),
        Text('See all', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.orange)),
      ]),
      const SizedBox(height: 12),
      const SessionTile(subject: 'Mathematics', tutor: 'Ravi S.', time: '4:00 PM', duration: '45 min', isLive: true),
      const SizedBox(height: 8),
      const SessionTile(subject: 'Physics', tutor: 'Priya M.', time: '5:30 PM', duration: '1 hr'),
      const SizedBox(height: 8),
      const SessionTile(subject: 'English', tutor: 'Ankit K.', time: '7:00 PM', duration: '45 min'),
    ]);
  }
}
