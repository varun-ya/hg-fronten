import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../theme.dart';
import '../../components/dashboard/tutor/schedule/student_profile_sheet.dart';
import '../../components/dashboard/student/class_data_card.dart' show accentForTopic;

class ClassNotesPage extends StatefulWidget {
  final PastSession session;
  final String tutorName;
  const ClassNotesPage({super.key, required this.session, this.tutorName = ''});
  @override
  State<ClassNotesPage> createState() => _ClassNotesPageState();
}

class _ClassNotesPageState extends State<ClassNotesPage> with SingleTickerProviderStateMixin {
  late final TabController _tab;
  late final List<_T> _tabs;

  @override
  void initState() {
    super.initState();
    final s = widget.session;
    _tabs = [
      _T('Summary', PhosphorIconsFill.note),
      if (s.sharedNotes.isNotEmpty) _T('Notes', PhosphorIconsFill.notepad),
      if (s.assignments.isNotEmpty) _T('Assignments', PhosphorIconsFill.fileText),
      if (s.recordingLabel != null || s.transcript != null) _T('Media', PhosphorIconsFill.play),
      if (s.classChat.isNotEmpty) _T('Chat', PhosphorIconsFill.chatCircle),
    ];
    _tab = TabController(length: _tabs.length, vsync: this);
  }

  @override
  void dispose() { _tab.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final s = widget.session;
    final accent = accentForTopic(s.topic);

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: NestedScrollView(
          physics: const ClampingScrollPhysics(),
          headerSliverBuilder: (_, __) => [
            SliverToBoxAdapter(child: _header(pt, s, accent)),
            SliverPersistentHeader(pinned: true, delegate: _TabDel(_tab, _tabs, accent)),
          ],
          body: TabBarView(controller: _tab, physics: const ClampingScrollPhysics(),
            children: _tabs.map((t) => _body(t.label, s, accent)).toList()),
        ),
      ),
    );
  }

  Widget _header(double pt, PastSession s, Color accent) => Container(
    color: HG.surface,
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      // Top bar
      Padding(
        padding: EdgeInsets.fromLTRB(8, pt + 6, 14, 0),
        child: Row(children: [
          IconButton(onPressed: () => Navigator.pop(context),
            icon: Icon(PhosphorIconsBold.arrowLeft, size: 18),
            style: IconButton.styleFrom(backgroundColor: HG.grey50, foregroundColor: HG.dark, fixedSize: const Size(36, 36))),
          const SizedBox(width: 10),
          Expanded(child: Text('Class Notes', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: HG.dark))),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 7, vertical: 3),
            decoration: BoxDecoration(
              color: s.attended ? HG.green.withValues(alpha: 0.08) : HG.red.withValues(alpha: 0.08),
              borderRadius: BorderRadius.circular(100)),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Icon(s.attended ? PhosphorIconsFill.checkCircle : PhosphorIconsFill.xCircle, size: 11,
                color: s.attended ? HG.green : HG.red),
              const SizedBox(width: 3),
              Text(s.attended ? 'Completed' : 'Missed', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700,
                color: s.attended ? HG.green : HG.red)),
            ]),
          ),
        ]),
      ),
      // Info card
      Container(
        margin: EdgeInsets.fromLTRB(16, 14, 16, 14),
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: HG.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: HG.grey200),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          // Topic
          Text(s.topic, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: HG.dark, height: 1.2, letterSpacing: -0.2)),
          const SizedBox(height: 10),
          // Meta
          Row(children: [
            Icon(PhosphorIconsRegular.calendarBlank, size: 13, color: HG.textLight),
            const SizedBox(width: 5),
            Text(s.date, style: TextStyle(fontSize: 12, color: HG.textMuted)),
            if (widget.tutorName.isNotEmpty) ...[
              const SizedBox(width: 12),
              CircleAvatar(radius: 9, backgroundColor: HG.powderBlue,
                child: Text(widget.tutorName[0], style: TextStyle(fontSize: 7, fontWeight: FontWeight.w700, color: HG.blue))),
              const SizedBox(width: 5),
              Text(widget.tutorName, style: TextStyle(fontSize: 12, color: HG.textMuted)),
            ],
          ]),
          const SizedBox(height: 10),
          // Content chips
          Wrap(spacing: 6, runSpacing: 6, children: [
            if (s.assignments.isNotEmpty) _chip(PhosphorIconsRegular.fileText, '${s.assignments.length} assignments'),
            if (s.sharedNotes.isNotEmpty) _chip(PhosphorIconsRegular.notepad, '${s.sharedNotes.length} notes'),
            if (s.recordingLabel != null) _chip(PhosphorIconsRegular.play, 'Recording'),
            if (s.transcript != null) _chip(PhosphorIconsRegular.textAa, 'Transcript'),
            if (s.classChat.isNotEmpty) _chip(PhosphorIconsRegular.chatCircle, '${s.classChat.length} msgs'),
          ]),
        ]),
      ),
    ]),
  );

  Widget _chip(IconData icon, String label) => Container(
    padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
    decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(8), border: Border.all(color: HG.grey200)),
    child: Row(mainAxisSize: MainAxisSize.min, children: [
      Icon(icon, size: 11, color: HG.textMuted),
      const SizedBox(width: 4),
      Text(label, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.dark)),
    ]),
  );

  Widget _body(String label, PastSession s, Color accent) {
    switch (label) {
      case 'Summary': return _Summary(s: s, accent: accent);
      case 'Notes': return _Notes(notes: s.sharedNotes, accent: accent);
      case 'Assignments': return _Assignments(items: s.assignments, accent: accent);
      case 'Media': return _Media(s: s, accent: accent);
      case 'Chat': return _Chat(msgs: s.classChat);
      default: return const SizedBox();
    }
  }
}

class _T { final String label; final IconData icon; const _T(this.label, this.icon); }

class _TabDel extends SliverPersistentHeaderDelegate {
  final TabController ctrl;
  final List<_T> tabs;
  final Color accent;
  _TabDel(this.ctrl, this.tabs, this.accent);
  @override double get minExtent => 44;
  @override double get maxExtent => 44;
  @override Widget build(BuildContext context, double _, bool __) => Container(
    color: HG.surface,
    child: TabBar(
      controller: ctrl, isScrollable: true, tabAlignment: TabAlignment.start,
      labelColor: HG.dark, unselectedLabelColor: HG.textLight,
      labelStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font),
      unselectedLabelStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, fontFamily: HG.font),
      indicatorColor: HG.dark, indicatorWeight: 2.5, indicatorSize: TabBarIndicatorSize.label,
      dividerColor: HG.grey200, dividerHeight: 0.5,
      splashFactory: NoSplash.splashFactory,
      overlayColor: WidgetStateProperty.all(Colors.transparent),
      padding: EdgeInsets.symmetric(horizontal: 14),
      tabs: tabs.map((t) => Tab(child: Row(mainAxisSize: MainAxisSize.min, children: [
        Icon(t.icon, size: 13), const SizedBox(width: 5), Text(t.label),
      ]))).toList(),
    ),
  );
  @override bool shouldRebuild(covariant _TabDel old) => true;
}

// ── Summary ──
class _Summary extends StatelessWidget {
  final PastSession s;
  final Color accent;
  const _Summary({required this.s, required this.accent});

  @override
  Widget build(BuildContext context) {
    return ListView(padding: EdgeInsets.fromLTRB(16, 14, 16, 40), physics: const BouncingScrollPhysics(), children: [
      // Class notes
      Container(
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Icon(PhosphorIconsFill.note, size: 13, color: HG.textMuted),
            const SizedBox(width: 6),
            Text('CLASS NOTES', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.textMuted, letterSpacing: 0.5)),
          ]),
          const SizedBox(height: 10),
          Text(s.notes, style: TextStyle(fontSize: 14, color: HG.dark, height: 1.65)),
        ]),
      ),
      if (s.assignments.isNotEmpty) ...[
        const SizedBox(height: 18),
        _secHead('Assignments', '${s.assignments.length}'),
        ...s.assignments.map((a) => _row(PhosphorIconsFill.fileText, a)),
      ],
      if (s.sharedNotes.isNotEmpty) ...[
        const SizedBox(height: 18),
        _secHead('Shared Notes', '${s.sharedNotes.length}'),
        ...s.sharedNotes.map((n) => _row(PhosphorIconsFill.notepad, n)),
      ],
      if (s.recordingLabel != null) ...[
        const SizedBox(height: 18),
        _secHead('Recording', ''),
        _mediaRow(PhosphorIconsFill.play, 'Class Recording', s.recordingLabel!),
      ],
      if (s.transcript != null) ...[
        const SizedBox(height: 10),
        _mediaRow(PhosphorIconsFill.textAa, 'AI Transcript', s.transcript!),
      ],
    ]);
  }
}

// ── Notes ──
class _Notes extends StatelessWidget {
  final List<String> notes;
  final Color accent;
  const _Notes({required this.notes, required this.accent});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: EdgeInsets.fromLTRB(16, 14, 16, 40),
      physics: const BouncingScrollPhysics(),
      itemCount: notes.length,
      itemBuilder: (_, i) => Container(
        margin: EdgeInsets.only(bottom: 8),
        padding: EdgeInsets.all(14),
        decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
        child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(width: 36, height: 36,
            decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10)),
            child: Icon(PhosphorIconsFill.notepad, size: 16, color: HG.textMuted)),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(notes[i], style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark, height: 1.4)),
            const SizedBox(height: 6),
            Row(children: [
              Icon(PhosphorIconsRegular.download, size: 13, color: HG.blue),
              const SizedBox(width: 4),
              Text('Download', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.blue)),
              const SizedBox(width: 14),
              Icon(PhosphorIconsRegular.eye, size: 13, color: HG.textLight),
              const SizedBox(width: 4),
              Text('Preview', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: HG.textMuted)),
            ]),
          ])),
        ]),
      ),
    );
  }
}

// ── Assignments ──
class _Assignments extends StatelessWidget {
  final List<String> items;
  final Color accent;
  const _Assignments({required this.items, required this.accent});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: EdgeInsets.fromLTRB(16, 14, 16, 40),
      physics: const BouncingScrollPhysics(),
      itemCount: items.length,
      itemBuilder: (_, i) => Container(
        margin: EdgeInsets.only(bottom: 8),
        padding: EdgeInsets.all(14),
        decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
        child: Row(children: [
          Container(width: 36, height: 36,
            decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10)),
            child: Center(child: Text('${i + 1}', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: HG.dark)))),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(items[i], style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark, height: 1.35)),
            const SizedBox(height: 4),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 7, vertical: 2),
              decoration: BoxDecoration(color: HG.amber.withValues(alpha: 0.06), borderRadius: BorderRadius.circular(100),
                border: Border.all(color: HG.amber.withValues(alpha: 0.12))),
              child: Text('Pending', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: HG.amber)),
            ),
          ])),
          Icon(PhosphorIconsRegular.caretRight, size: 16, color: HG.grey300),
        ]),
      ),
    );
  }
}

// ── Media ──
class _Media extends StatelessWidget {
  final PastSession s;
  final Color accent;
  const _Media({required this.s, required this.accent});

  @override
  Widget build(BuildContext context) {
    return ListView(padding: EdgeInsets.fromLTRB(16, 14, 16, 40), physics: const BouncingScrollPhysics(), children: [
      if (s.recordingLabel != null) Container(
        margin: EdgeInsets.only(bottom: 10),
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
        child: Row(children: [
          Container(width: 44, height: 44,
            decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(12)),
            child: Icon(PhosphorIconsFill.play, size: 18, color: HG.dark)),
          const SizedBox(width: 14),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('Class Recording', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
            const SizedBox(height: 2),
            Text(s.recordingLabel!, style: TextStyle(fontSize: 12, color: HG.textMuted)),
          ])),
          FilledButton(onPressed: () {}, style: FilledButton.styleFrom(backgroundColor: HG.dark, foregroundColor: HG.fixedWhite,
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8), shape: const StadiumBorder(),
            textStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, fontFamily: HG.font)),
            child: Text('Play')),
        ]),
      ),
      if (s.transcript != null) Container(
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
        child: Row(children: [
          Container(width: 44, height: 44,
            decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(12)),
            child: Icon(PhosphorIconsFill.textAa, size: 18, color: HG.dark)),
          const SizedBox(width: 14),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('AI Transcript', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
            const SizedBox(height: 2),
            Text(s.transcript!, style: TextStyle(fontSize: 12, color: HG.textMuted)),
          ])),
          OutlinedButton(onPressed: () {}, style: OutlinedButton.styleFrom(foregroundColor: HG.dark,
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8), shape: const StadiumBorder(), side: BorderSide(color: HG.grey200),
            textStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, fontFamily: HG.font)),
            child: Text('Read')),
        ]),
      ),
    ]);
  }
}

// ── Chat ──
class _Chat extends StatelessWidget {
  final List<(String, String)> msgs;
  const _Chat({required this.msgs});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: EdgeInsets.fromLTRB(16, 14, 16, 40),
      physics: const BouncingScrollPhysics(),
      itemCount: msgs.length,
      itemBuilder: (_, i) {
        final m = msgs[i];
        final isYou = m.$1 == 'You';
        return Align(
          alignment: isYou ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
            margin: EdgeInsets.only(bottom: 6),
            padding: EdgeInsets.fromLTRB(12, 8, 12, 8),
            decoration: BoxDecoration(
              color: isYou ? HG.blue : HG.white,
              border: isYou ? null : Border.all(color: HG.grey200),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(16), topRight: Radius.circular(16),
                bottomLeft: Radius.circular(isYou ? 16 : 4),
                bottomRight: Radius.circular(isYou ? 4 : 16)),
            ),
            child: Column(crossAxisAlignment: isYou ? CrossAxisAlignment.end : CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
              Text(m.$1, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: isYou ? HG.fixedWhite.withValues(alpha: 0.55) : HG.blue)),
              const SizedBox(height: 2),
              Text(m.$2, style: TextStyle(fontSize: 14, color: isYou ? HG.fixedWhite : HG.dark, height: 1.4)),
            ]),
          ),
        );
      },
    );
  }
}

// ── Shared helpers ──
Widget _secHead(String title, String count) => Padding(
  padding: EdgeInsets.only(bottom: 8),
  child: Row(children: [
    Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
    if (count.isNotEmpty) ...[const SizedBox(width: 6),
      Container(padding: EdgeInsets.symmetric(horizontal: 6, vertical: 1),
        decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(100)),
        child: Text(count, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.textMuted)))],
  ]),
);

Widget _row(IconData icon, String text) => Container(
  margin: EdgeInsets.only(bottom: 6),
  padding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
  decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
  child: Row(children: [
    Container(width: 30, height: 30,
      decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(8)),
      child: Icon(icon, size: 13, color: HG.textMuted)),
    const SizedBox(width: 10),
    Expanded(child: Text(text, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: HG.dark, height: 1.4))),
    Icon(PhosphorIconsRegular.caretRight, size: 14, color: HG.textLight),
  ]),
);

Widget _mediaRow(IconData icon, String title, String sub) => Container(
  margin: EdgeInsets.only(bottom: 6),
  padding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
  decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
  child: Row(children: [
    Container(width: 34, height: 34,
      decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(9)),
      child: Icon(icon, size: 15, color: HG.dark)),
    const SizedBox(width: 10),
    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
      Text(sub, style: TextStyle(fontSize: 11, color: HG.textMuted)),
    ])),
    Icon(PhosphorIconsRegular.caretRight, size: 14, color: HG.textLight),
  ]),
);
