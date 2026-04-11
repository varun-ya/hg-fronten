import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/user_session.dart';
import '../../../screens/meet/meet_screen.dart';
import '../tutor/schedule/scheduled_class.dart';

class ClassCard extends StatelessWidget {
  final ScheduledClass cls;
  const ClassCard({super.key, required this.cls});

  void _join(BuildContext context) {
    HapticFeedback.mediumImpact();
    final name = UserSession.name.isNotEmpty ? UserSession.name : 'Student';
    Navigator.push(context, MaterialPageRoute(
      builder: (_) => MeetScreen(role: MeetRole.learner, userName: name, meetingId: cls.meetingId)));
  }

  @override
  Widget build(BuildContext context) {
    final live = cls.isLive && !cls.isPast;
    final past = cls.isPast;
    final attended = cls.wasAttended == true;

    return GestureDetector(
      onTap: cls.canJoin ? () => _join(context) : () => HapticFeedback.lightImpact(),
      child: Opacity(
        opacity: past ? 0.6 : 1.0,
        child: Container(
          width: 220,
          padding: EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: past ? HG.grey50 : HG.white,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: live ? HG.blue.withValues(alpha: 0.3) : HG.grey200, width: live ? 1.5 : 1),
            boxShadow: live ? [BoxShadow(color: HG.blue.withValues(alpha: 0.08), blurRadius: 12, offset: const Offset(0, 3))] : null,
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            // Time row
            Row(children: [
              Icon(PhosphorIconsRegular.clock, size: 13, color: HG.textMuted),
              const SizedBox(width: 5),
              Text('${cls.timeStr} \u2013 ${cls.endTimeStr}', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark)),
              const Spacer(),
              if (live) _liveBadge(),
              if (past) _statusBadge(attended),
            ]),
            const SizedBox(height: 12),
            // Tutor row
            Row(children: [
              CircleAvatar(radius: 16, backgroundColor: live ? HG.powderBlue : HG.grey100,
                child: Text(cls.studentName[0], style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: live ? HG.blue : HG.grey500))),
              const SizedBox(width: 10),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(cls.studentName, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
                Text(cls.subject, style: TextStyle(fontSize: 11, color: HG.textMuted)),
              ])),
            ]),
            const Spacer(),
            // Bottom
            if (live || cls.canJoin)
              SizedBox(width: double.infinity, child: FilledButton.icon(
                onPressed: () => _join(context),
                icon: Icon(PhosphorIconsBold.videoCamera, size: 13),
                label: Text('Join Now'),
                style: FilledButton.styleFrom(backgroundColor: HG.blue, foregroundColor: HG.fixedWhite,
                  padding: EdgeInsets.symmetric(vertical: 9), shape: const StadiumBorder(),
                  textStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, fontFamily: HG.font)),
              ))
            else if (past)
              Row(children: [
                Icon(attended ? PhosphorIconsFill.checkCircle : PhosphorIconsFill.xCircle, size: 13, color: attended ? HG.green : HG.red),
                const SizedBox(width: 4),
                Text(attended ? 'Completed' : 'Missed', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: attended ? HG.green : HG.red)),
              ])
            else
              Row(children: [
                Icon(PhosphorIconsRegular.clock, size: 12, color: HG.textLight),
                const SizedBox(width: 4),
                Text('Starts at ${cls.timeStr}', style: TextStyle(fontSize: 10, color: HG.textLight)),
              ]),
          ]),
        ),
      ),
    );
  }

  static Widget _liveBadge() => Container(
    padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
    decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100)),
    child: Row(mainAxisSize: MainAxisSize.min, children: [
      Container(width: 4, height: 4, decoration: BoxDecoration(color: HG.green, shape: BoxShape.circle)),
      const SizedBox(width: 3),
      Text('LIVE', style: TextStyle(fontSize: 8, fontWeight: FontWeight.w800, color: HG.green, letterSpacing: 0.3)),
    ]),
  );

  static Widget _statusBadge(bool attended) => Container(
    padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
    decoration: BoxDecoration(
      color: attended ? HG.green.withValues(alpha: 0.08) : HG.red.withValues(alpha: 0.08),
      borderRadius: BorderRadius.circular(100)),
    child: Text(attended ? 'Done' : 'Missed', style: TextStyle(fontSize: 8, fontWeight: FontWeight.w700, color: attended ? HG.green : HG.red)),
  );
}
