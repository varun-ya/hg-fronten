import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../../theme.dart';
import 'scheduled_class.dart';

// ── Past session data ──
class PastSession {
  final String date, topic, notes;
  final bool attended;
  final List<String> assignments, sharedNotes;
  final String? transcript, recordingLabel;
  final List<(String, String)> classChat;
  const PastSession({required this.date, required this.topic, required this.notes, required this.attended, this.assignments = const [], this.sharedNotes = const [], this.transcript, this.recordingLabel, this.classChat = const []});
}

final studentHistory = <String, List<PastSession>>{
  'Aarav Sharma': [
    PastSession(date: 'Jun 28', topic: 'Quadratic Equations \u2014 Discriminant', notes: 'Covered discriminant, nature of roots. Needs practice on word problems.', attended: true, assignments: ['Quadratic word problems (10 Qs)', 'Graph plotting exercise'], transcript: 'AI transcript \u00b7 58 min', recordingLabel: 'Recording \u00b7 58 min \u00b7 720p', sharedNotes: ['Discriminant formula sheet', 'Parabola graph examples'], classChat: [('Aarav', 'Sir, is D>0 always 2 roots?'), ('You', 'Yes, two distinct real roots.'), ('Aarav', 'And D=0 means touching x-axis?'), ('You', 'Exactly. One repeated root.')]),
    PastSession(date: 'Jun 25', topic: 'Quadratic Equations \u2014 Basics', notes: 'Introduced standard form, factoring. Picked up quickly.', attended: true, assignments: ['Factor 20 quadratics', 'NCERT Ex 4.1'], transcript: 'AI transcript \u00b7 60 min', recordingLabel: 'Recording \u00b7 60 min \u00b7 720p', classChat: [('Aarav', 'Can we do more examples?'), ('You', 'Sure, sharing extra problems now.')]),
    PastSession(date: 'Jun 22', topic: 'Linear Equations Revision', notes: 'Quick revision before moving to quadratics.', attended: true, assignments: ['Revision worksheet']),
  ],
  'Priya Patel': [
    PastSession(date: 'Jun 27', topic: 'Thermodynamics Ch. 5 \u2014 Heat Transfer', notes: 'Covered conduction, convection, radiation. Struggled with radiation numericals.', attended: true, assignments: ['5 radiation numericals', 'HC Verma Ch. 5 selected'], transcript: 'AI transcript \u00b7 60 min', recordingLabel: 'Recording \u00b7 60 min \u00b7 720p', sharedNotes: ['Thermodynamics formula sheet'], classChat: [('Priya', 'Radiation formula is confusing'), ('You', 'Let me explain Stefan\'s law again'), ('Priya', 'Oh okay, so T is in Kelvin always?'), ('You', 'Yes, always Kelvin for radiation.')]),
    PastSession(date: 'Jun 24', topic: 'Thermodynamics Ch. 4', notes: 'Second law, entropy. Good understanding.', attended: true, assignments: ['Entropy problems set']),
  ],
  'Rohan Gupta': [
    PastSession(date: 'Jun 26', topic: 'Organic Chemistry \u2014 Reaction Mechanisms', notes: 'SN1 vs SN2 reactions. Finally understood the difference.', attended: true, assignments: ['Mechanism identification (15 Qs)'], transcript: 'AI transcript \u00b7 60 min', classChat: [('Rohan', 'Why does SN1 need stable carbocation?'), ('You', 'It\'s about the intermediate stability.')]),
  ],
  'Meera Iyer': [
    PastSession(date: 'Jun 28', topic: 'Shakespeare \u2014 Merchant of Venice Act 3', notes: 'Analyzed Portia\'s speech. Excellent notes by student.', attended: true, assignments: ['Character analysis essay \u2014 Shylock'], sharedNotes: ['Act 3 summary notes'], classChat: [('Meera', 'Is Shylock a villain or victim?'), ('You', 'That\'s the central debate. What do you think?'), ('Meera', 'I think both honestly')]),
  ],
  // Tutor-keyed entries (for student-side chat history)
  'Ayush Soni': [
    PastSession(date: 'Jun 28', topic: 'Quadratic Equations \u2014 Discriminant', notes: 'Covered discriminant, nature of roots. Needs practice on word problems.', attended: true, assignments: ['Quadratic word problems (10 Qs)', 'Graph plotting exercise'], transcript: 'AI transcript \u00b7 58 min', recordingLabel: 'Recording \u00b7 58 min \u00b7 720p', sharedNotes: ['Discriminant formula sheet', 'Parabola graph examples'], classChat: [('You', 'Sir, is D>0 always 2 roots?'), ('Ayush', 'Yes, two distinct real roots.'), ('You', 'And D=0 means touching x-axis?'), ('Ayush', 'Exactly. One repeated root.')]),
    PastSession(date: 'Jun 25', topic: 'Quadratic Equations \u2014 Basics', notes: 'Introduced standard form, factoring. Picked up quickly.', attended: true, assignments: ['Factor 20 quadratics', 'NCERT Ex 4.1'], transcript: 'AI transcript \u00b7 60 min', recordingLabel: 'Recording \u00b7 60 min \u00b7 720p', classChat: [('You', 'Can we do more examples?'), ('Ayush', 'Sure, sharing extra problems now.')]),
    PastSession(date: 'Jun 22', topic: 'Linear Equations Revision', notes: 'Quick revision before moving to quadratics.', attended: true, assignments: ['Revision worksheet']),
  ],
  'Priya Menon': [
    PastSession(date: 'Jun 27', topic: 'Thermodynamics Ch. 5 \u2014 Heat Transfer', notes: 'Covered conduction, convection, radiation. Struggled with radiation numericals.', attended: true, assignments: ['5 radiation numericals', 'HC Verma Ch. 5 selected'], transcript: 'AI transcript \u00b7 60 min', recordingLabel: 'Recording \u00b7 60 min \u00b7 720p', sharedNotes: ['Thermodynamics formula sheet'], classChat: [('You', 'Radiation formula is confusing'), ('Priya', 'Let me explain Stefan\'s law again'), ('You', 'Oh okay, so T is in Kelvin always?'), ('Priya', 'Yes, always Kelvin for radiation.')]),
    PastSession(date: 'Jun 24', topic: 'Thermodynamics Ch. 4', notes: 'Second law, entropy. Good understanding.', attended: true, assignments: ['Entropy problems set']),
  ],
  'Ankit Kapoor': [
    PastSession(date: 'Jun 28', topic: 'Essay Writing \u2014 Argumentative Essays', notes: 'Covered thesis statements and counter-arguments. Good progress.', attended: true, assignments: ['Write argumentative essay on AI in education'], sharedNotes: ['Essay structure template'], classChat: [('You', 'How do I start the introduction?'), ('Ankit', 'Start with a hook \u2014 a surprising fact or question.')]),
  ],
};

enum SessionTabType { sessions, assignments, recordings, transcripts, notes, classChat }

class StudentProfileSheet extends StatefulWidget {
  final ScheduledClass cls;
  final ScrollController scrollCtrl;
  const StudentProfileSheet({super.key, required this.cls, required this.scrollCtrl});
  @override
  State<StudentProfileSheet> createState() => _StudentProfileSheetState();
}

class _StudentProfileSheetState extends State<StudentProfileSheet> with SingleTickerProviderStateMixin {
  TabController? _tab;

  @override
  void initState() { super.initState(); _tab = TabController(length: 6, vsync: this); }
  @override
  void dispose() { _tab?.dispose(); super.dispose(); }

  List<PastSession> get _sessions => studentHistory[widget.cls.studentName] ?? [];
  bool get _isDemo => !widget.cls.isPaid;

  @override
  Widget build(BuildContext context) {
    final c = widget.cls;
    final sessions = _sessions;
    final avatarUrl = 'https://api.dicebear.com/9.x/lorelei/png?seed=${Uri.encodeComponent(c.studentName)}&size=100';
    if (_tab == null) return const SizedBox.shrink();

    return Column(children: [
      const SizedBox(height: 8),
      Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2)))),
      Flexible(
        flex: 0,
        child: SingleChildScrollView(
          physics: const NeverScrollableScrollPhysics(),
          child: Column(children: [
            const SizedBox(height: 8),
            Padding(padding: EdgeInsets.symmetric(horizontal: 20), child: Row(children: [
              ClipOval(child: Image.network(avatarUrl, width: 50, height: 50,
                errorBuilder: (_, __, ___) => Container(width: 50, height: 50, decoration: BoxDecoration(shape: BoxShape.circle, color: HG.grey100),
                  child: Center(child: Text(c.studentName[0], style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: HG.grey500)))))),
              const SizedBox(width: 12),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Flexible(child: Text(c.studentName, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: HG.dark))),
                  if (_isDemo) ...[const SizedBox(width: 6), Container(
                    padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(color: HG.orange.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(100)),
                    child: Text('Demo', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: HG.orange)),
                  )],
                ]),
                const SizedBox(height: 2),
                Text('${c.subject}  \u00b7  ${sessions.length} classes', style: TextStyle(fontSize: 12, color: HG.textMuted)),
              ])),
              IconButton.filledTonal(
                onPressed: () {},
                icon: Icon(PhosphorIconsFill.chatCircle, size: 17, color: HG.blue),
                style: IconButton.styleFrom(backgroundColor: HG.powderBlue, fixedSize: const Size(38, 38)),
              ),
            ])),
            const SizedBox(height: 6),
            if (!_isDemo) ...[
              Padding(padding: EdgeInsets.symmetric(horizontal: 20), child: Row(children: [
                _stat('${sessions.length}', 'Total'),
                const SizedBox(width: 8),
                _stat('${sessions.where((s) => s.attended).length}', 'Done'),
                const SizedBox(width: 8),
                _stat('${sessions.where((s) => !s.attended).length}', 'Missed'),
                const SizedBox(width: 8),
                _stat('\u20b9${c.ratePerHour}', '/hr'),
              ])),
              const SizedBox(height: 6),
            ],
            Padding(padding: EdgeInsets.symmetric(horizontal: 20), child: SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () {},
                icon: Icon(PhosphorIconsRegular.chatCircle, size: 15, color: HG.blue),
                label: Text('Message ${c.studentName.split(' ')[0]}'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: HG.dark,
                  padding: EdgeInsets.symmetric(vertical: 10),
                  shape: const StadiumBorder(),
                  side: BorderSide(color: HG.grey200),
                  textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, fontFamily: HG.font),
                ),
              ),
            )),
            const SizedBox(height: 6),
          ]),
        ),
      ),
      if (_isDemo) ...[
        Expanded(child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
          Icon(PhosphorIconsRegular.userCircle, size: 40, color: HG.grey300),
          SizedBox(height: 10),
          Text('Demo student', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.textMuted)),
          SizedBox(height: 4),
          Text('No class history available', style: TextStyle(fontSize: 12, color: HG.textLight)),
        ]))),
      ] else ...[
        TabBar(
          controller: _tab, isScrollable: true,
          labelColor: HG.dark, unselectedLabelColor: HG.textLight,
          labelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, fontFamily: HG.font),
          unselectedLabelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, fontFamily: HG.font),
          indicatorColor: HG.blue, indicatorWeight: 2, indicatorSize: TabBarIndicatorSize.label,
          dividerColor: HG.grey200, dividerHeight: 0.5,
          splashFactory: NoSplash.splashFactory, tabAlignment: TabAlignment.start,
          padding: EdgeInsets.symmetric(horizontal: 12),
          tabs: const [Tab(text: 'Sessions'), Tab(text: 'Assignments'), Tab(text: 'Recordings'), Tab(text: 'Transcripts'), Tab(text: 'Notes'), Tab(text: 'Class Chat')],
        ),
        Expanded(child: TabBarView(controller: _tab, children: [
          _buildTab(sessions, SessionTabType.sessions),
          _buildTab(sessions, SessionTabType.assignments),
          _buildTab(sessions, SessionTabType.recordings),
          _buildTab(sessions, SessionTabType.transcripts),
          _buildTab(sessions, SessionTabType.notes),
          _buildTab(sessions, SessionTabType.classChat),
        ])),
      ],
    ]);
  }

  Widget _buildTab(List<PastSession> sessions, SessionTabType type) {
    final filtered = sessions.where((s) {
      switch (type) {
        case SessionTabType.sessions: return true;
        case SessionTabType.assignments: return s.assignments.isNotEmpty;
        case SessionTabType.recordings: return s.recordingLabel != null;
        case SessionTabType.transcripts: return s.transcript != null;
        case SessionTabType.notes: return s.sharedNotes.isNotEmpty;
        case SessionTabType.classChat: return s.classChat.isNotEmpty;
      }
    }).toList();
    if (filtered.isEmpty) return Center(child: Text('No ${type.name} yet', style: TextStyle(fontSize: 13, color: HG.textMuted)));
    return ListView(padding: EdgeInsets.symmetric(vertical: 4), children: filtered.map((s) => _ClassCollapsible(session: s, type: type)).toList());
  }

  static Widget _stat(String value, String label) => Expanded(
    child: Container(padding: EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10)),
      child: Column(children: [
        Text(value, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: HG.dark)),
        const SizedBox(height: 2),
        Text(label, style: TextStyle(fontSize: 9, fontWeight: FontWeight.w500, color: HG.textMuted)),
      ])),
  );
}

class _ClassCollapsible extends StatefulWidget {
  final PastSession session;
  final SessionTabType type;
  const _ClassCollapsible({required this.session, required this.type});
  @override
  State<_ClassCollapsible> createState() => _ClassCollapsibleState();
}

class _ClassCollapsibleState extends State<_ClassCollapsible> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    final s = widget.session;
    return Column(children: [
      GestureDetector(
        onTap: () => setState(() => _open = !_open),
        behavior: HitTestBehavior.opaque,
        child: Padding(padding: EdgeInsets.fromLTRB(20, 10, 20, 10), child: Row(children: [
          Icon(s.attended ? PhosphorIconsFill.checkCircle : PhosphorIconsFill.xCircle, size: 15, color: s.attended ? const Color(0xFF22C55E) : HG.red),
          const SizedBox(width: 10),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(s.topic, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
            Text(s.date, style: TextStyle(fontSize: 11, color: HG.textMuted)),
          ])),
          AnimatedRotation(turns: _open ? 0.5 : 0, duration: const Duration(milliseconds: 200),
            child: Icon(PhosphorIconsRegular.caretDown, size: 15, color: HG.textLight)),
        ])),
      ),
      AnimatedCrossFade(
        firstChild: const SizedBox(width: double.infinity),
        secondChild: Padding(padding: EdgeInsets.fromLTRB(45, 0, 20, 12), child: _content(s)),
        crossFadeState: _open ? CrossFadeState.showSecond : CrossFadeState.showFirst,
        duration: const Duration(milliseconds: 200),
      ),
      Divider(height: 0.5, thickness: 0.5, indent: 20, endIndent: 20, color: HG.grey200),
    ]);
  }

  Widget _content(PastSession s) {
    switch (widget.type) {
      case SessionTabType.sessions:
        return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(s.notes, style: TextStyle(fontSize: 12, color: HG.dark, height: 1.45)),
          if (s.assignments.isNotEmpty) ...[const SizedBox(height: 8), _label('Assignments'), ...s.assignments.map(_bullet)],
          if (s.sharedNotes.isNotEmpty) ...[const SizedBox(height: 6), _label('Notes'), ...s.sharedNotes.map(_bullet)],
          if (s.recordingLabel != null) ...[const SizedBox(height: 6), _label('Recording'), _bullet(s.recordingLabel!)],
        ]);
      case SessionTabType.assignments:
        return Column(crossAxisAlignment: CrossAxisAlignment.start, children: s.assignments.map(_bullet).toList());
      case SessionTabType.recordings:
        return s.recordingLabel != null
          ? Row(children: [
              Container(width: 32, height: 32, decoration: BoxDecoration(color: HG.powderBlue, borderRadius: BorderRadius.circular(8)),
                child: Icon(PhosphorIconsFill.play, size: 14, color: HG.blue)),
              const SizedBox(width: 10),
              Text(s.recordingLabel!, style: TextStyle(fontSize: 12, color: HG.dark)),
            ])
          : const SizedBox.shrink();
      case SessionTabType.transcripts:
        return s.transcript != null
          ? Row(children: [
              Container(width: 32, height: 32, decoration: BoxDecoration(color: HG.powderBlue, borderRadius: BorderRadius.circular(8)),
                child: Icon(PhosphorIconsFill.textAa, size: 14, color: HG.blue)),
              const SizedBox(width: 10),
              Text(s.transcript!, style: TextStyle(fontSize: 12, color: HG.dark)),
            ])
          : const SizedBox.shrink();
      case SessionTabType.notes:
        return Column(crossAxisAlignment: CrossAxisAlignment.start, children: s.sharedNotes.map(_bullet).toList());
      case SessionTabType.classChat:
        return Container(
          padding: EdgeInsets.all(10),
          decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: s.classChat.map((m) => Padding(
            padding: EdgeInsets.only(bottom: 4),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('${m.$1}: ', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: m.$1 == 'You' ? HG.blue : HG.dark)),
              Expanded(child: Text(m.$2, style: TextStyle(fontSize: 11, color: HG.dark, height: 1.35))),
            ]),
          )).toList()),
        );
    }
  }

  static Widget _label(String s) => Padding(padding: EdgeInsets.only(bottom: 4),
    child: Text(s, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.blue)));

  static Widget _bullet(String text) => Padding(
    padding: EdgeInsets.only(bottom: 3),
    child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Container(width: 4, height: 4, margin: EdgeInsets.only(top: 5), decoration: BoxDecoration(color: HG.textLight, shape: BoxShape.circle)),
      const SizedBox(width: 8),
      Expanded(child: Text(text, style: TextStyle(fontSize: 12, color: HG.dark, height: 1.4))),
    ]),
  );
}
