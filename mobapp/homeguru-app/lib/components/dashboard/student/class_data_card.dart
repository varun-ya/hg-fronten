import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../tutor/schedule/student_profile_sheet.dart';
import '../../../screens/class_notes/class_notes_page.dart';

Color accentForTopic(String topic) {
  final t = topic.toLowerCase();
  if (t.contains('math') || t.contains('quadratic') || t.contains('linear')) return const Color(0xFF4A7CF5);
  if (t.contains('physics') || t.contains('thermo')) return const Color(0xFFE85060);
  if (t.contains('chemistry') || t.contains('organic')) return const Color(0xFF8B5CF6);
  if (t.contains('english') || t.contains('essay') || t.contains('shakespeare')) return const Color(0xFF22C55E);
  if (t.contains('jee')) return const Color(0xFFE08A3C);
  return const Color(0xFF6B7280);
}

class ClassDataCard extends StatelessWidget {
  final PastSession session;
  final String tutorName;
  const ClassDataCard({super.key, required this.session, this.tutorName = ''});

  @override
  Widget build(BuildContext context) {
    final s = session;
    final accent = accentForTopic(s.topic);

    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        Navigator.push(context, PageRouteBuilder(
          pageBuilder: (_, __, ___) => ClassNotesPage(session: session, tutorName: tutorName),
          transitionDuration: const Duration(milliseconds: 300),
          reverseTransitionDuration: const Duration(milliseconds: 250),
          transitionsBuilder: (_, a, __, c) => SlideTransition(
            position: Tween(begin: const Offset(1, 0), end: Offset.zero).animate(
              CurvedAnimation(parent: a, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)), child: c),
        ));
      },
      child: Container(
        width: 220,
        padding: EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: HG.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: HG.grey200),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          // Top row: date + status
          Row(children: [
            Icon(PhosphorIconsRegular.calendarBlank, size: 13, color: HG.textMuted),
            const SizedBox(width: 5),
            Text(s.date, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark)),
            const Spacer(),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: s.attended ? HG.green.withValues(alpha: 0.08) : HG.red.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(100)),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                Icon(s.attended ? PhosphorIconsFill.checkCircle : PhosphorIconsFill.xCircle, size: 9,
                  color: s.attended ? HG.green : HG.red),
                const SizedBox(width: 3),
                Text(s.attended ? 'Done' : 'Missed', style: TextStyle(fontSize: 8, fontWeight: FontWeight.w700,
                  color: s.attended ? HG.green : HG.red)),
              ]),
            ),
          ]),
          const SizedBox(height: 12),
          // Tutor row
          if (tutorName.isNotEmpty) ...[
            Row(children: [
              CircleAvatar(radius: 12, backgroundColor: HG.powderBlue,
                child: Text(tutorName[0], style: TextStyle(fontSize: 8, fontWeight: FontWeight.w700, color: HG.blue))),
              const SizedBox(width: 8),
              Expanded(child: Text(tutorName, style: TextStyle(fontSize: 11, color: HG.textMuted), maxLines: 1, overflow: TextOverflow.ellipsis)),
            ]),
            const SizedBox(height: 8),
          ],
          // Topic
          Text(s.topic, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark, height: 1.2), maxLines: 2, overflow: TextOverflow.ellipsis),
          const Spacer(),
          // Content pills + arrow
          Row(children: [
            if (s.assignments.isNotEmpty) _pill(PhosphorIconsRegular.fileText, '${s.assignments.length}', accent),
            if (s.sharedNotes.isNotEmpty) _pill(PhosphorIconsRegular.notepad, '${s.sharedNotes.length}', accent),
            if (s.recordingLabel != null) _pill(PhosphorIconsRegular.play, '', accent),
            if (s.classChat.isNotEmpty) _pill(PhosphorIconsRegular.chatCircle, '${s.classChat.length}', accent),
            const Spacer(),
            Icon(PhosphorIconsRegular.arrowRight, size: 13, color: HG.textLight),
          ]),
        ]),
      ),
    );
  }

  Widget _pill(IconData icon, String label, Color accent) => Container(
    margin: EdgeInsets.only(right: 4),
    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 2),
    decoration: BoxDecoration(color: accent.withValues(alpha: 0.06), borderRadius: BorderRadius.circular(6)),
    child: Row(mainAxisSize: MainAxisSize.min, children: [
      Icon(icon, size: 9, color: accent.withValues(alpha: 0.7)),
      if (label.isNotEmpty) ...[const SizedBox(width: 2), Text(label, style: TextStyle(fontSize: 8, fontWeight: FontWeight.w600, color: accent.withValues(alpha: 0.7)))],
    ]),
  );
}
