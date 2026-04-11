import 'dart:io' as io;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:image_picker/image_picker.dart';
import 'package:file_picker/file_picker.dart';
import 'package:open_filex/open_filex.dart';
import '../../../theme.dart';
import '../../../models/student_data.dart';
import '../../../components/dashboard/tutor/schedule/student_profile_sheet.dart';

// ── Chat List ──
class StudentChatTab extends StatelessWidget {
  const StudentChatTab({super.key});

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final d = StudentDataProvider.of(context);
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: ListView.builder(
          padding: EdgeInsets.zero,
          physics: const BouncingScrollPhysics(),
          itemCount: d.threads.length + 1,
          itemBuilder: (_, i) {
            if (i == 0) return _header(pt, d.threads.length);
            return _tile(context, d.threads[i - 1]);
          },
        ),
      ),
    );
  }

  Widget _header(double pt, int count) => Padding(
    padding: EdgeInsets.fromLTRB(20, pt + 14, 20, 12),
    child: Row(children: [
      Text('Messages', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(width: 8),
      Container(
        padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
        decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(100)),
        child: Text('$count', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.dark)),
      ),
    ]),
  );

  Widget _tile(BuildContext ctx, ChatThread t) => InkWell(
    onTap: () {
      HapticFeedback.selectionClick();
      Navigator.push(ctx, PageRouteBuilder(
        pageBuilder: (_, __, ___) => _ChatPage(thread: t),
        transitionDuration: const Duration(milliseconds: 300),
        reverseTransitionDuration: const Duration(milliseconds: 250),
        transitionsBuilder: (_, anim, __, child) => SlideTransition(
          position: Tween(begin: const Offset(1, 0), end: Offset.zero).animate(
            CurvedAnimation(parent: anim, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)),
          child: child),
      ));
    },
    child: Padding(
      padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      child: Row(children: [
        CircleAvatar(radius: 26,
          backgroundColor: t.isGroup ? HG.powderOrange : (t.isTutor ? HG.powderBlue : HG.grey100),
          child: t.isGroup
              ? Icon(PhosphorIconsFill.usersThree, size: 18, color: HG.orange)
              : Text(t.avatar, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: t.isTutor ? HG.blue : HG.grey500))),
        const SizedBox(width: 14),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Expanded(child: Text(t.name, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: HG.dark))),
            Text(t.time, style: TextStyle(fontSize: 11, color: HG.textLight)),
          ]),
          const SizedBox(height: 3),
          Text(t.lastMsg, style: TextStyle(fontSize: 13, color: HG.textMuted), maxLines: 1, overflow: TextOverflow.ellipsis),
        ])),
      ]),
    ),
  );
}

// ── Chat items ──
abstract class _Item {}
class _Msg extends _Item { final String text, time; final bool isMe; _Msg(this.text, this.time, this.isMe); }
class _FileMsg extends _Item { final String name, size, time; final bool isMe, isImage; final String? path; _FileMsg({required this.name, required this.size, required this.time, required this.isMe, this.isImage = false, this.path}); }
class _ClassBlock extends _Item { final PastSession data; _ClassBlock(this.data); }
class _DateLabel extends _Item { final String label; _DateLabel(this.label); }

// ── Chat Page ──
class _ChatPage extends StatefulWidget {
  final ChatThread thread;
  const _ChatPage({required this.thread});
  @override
  State<_ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<_ChatPage> {
  final _ctrl = TextEditingController();
  final _items = <_Item>[];
  final _picker = ImagePicker();

  @override
  void initState() { super.initState(); _seed(); }

  void _seed() {
    final t = widget.thread;
    final first = t.name.split(' ')[0];
    // Use studentHistory if available (tutor chats have class history)
    final history = studentHistory[t.name] ?? [];
    if (t.isTutor && history.isNotEmpty) {
      for (int i = history.length - 1; i >= 0; i--) {
        _items.add(_DateLabel(history[i].date));
        _items.add(_Msg('Sir, I\'m ready for today\'s class', '9:50 AM', true));
        _items.add(_Msg('Great, joining now 👍', '9:55 AM', false));
        _items.add(_ClassBlock(history[i]));
        if (i == 0) {
          _items.add(_Msg('That was really helpful sir!', '11:05 AM', true));
          _items.add(_Msg('Keep practicing $first, you\'re doing great 💪', '11:06 AM', false));
        } else {
          _items.add(_Msg('Assignment uploaded sir', '6:30 PM', true));
          _items.add(_Msg('Checked ✅ Good work!', '8:15 PM', false));
        }
      }
    } else if (t.isTutor) {
      _items.add(_DateLabel('Today'));
      _items.add(_Msg('Good morning sir!', '9:30 AM', true));
      _items.add(_Msg('Good morning! Ready for today\'s class?', '9:32 AM', false));
      _items.add(_Msg('Yes sir, I revised the last chapter too 💪', '9:33 AM', true));
      _items.add(_Msg(t.lastMsg, '9:35 AM', false));
    } else if (t.isGroup) {
      _items.add(_DateLabel('Today'));
      _items.add(_Msg('Anyone solved Q.14 from yesterday?', '10:00 AM', false));
      _items.add(_Msg('Yeah I got 42 as the answer', '10:05 AM', true));
      _items.add(_Msg('Same! The trick is to use substitution first', '10:06 AM', false));
      _items.add(_Msg('Can someone share the solution steps?', '10:10 AM', false));
      _items.add(_Msg('Sure, let me type it out', '10:12 AM', true));
    } else {
      _items.add(_DateLabel('Today'));
      _items.add(_Msg('Hey! Did you finish the physics set?', '3:00 PM', false));
      _items.add(_Msg('Almost done, stuck on Q.8', '3:05 PM', true));
      _items.add(_Msg('That one is tricky, use energy conservation', '3:06 PM', false));
      _items.add(_Msg('Oh wait that makes sense, thanks! 🔥', '3:10 PM', true));
    }
  }

  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }

  void _send() {
    final t = _ctrl.text.trim();
    if (t.isEmpty) return;
    HapticFeedback.lightImpact();
    setState(() { _items.add(_Msg(t, TimeOfDay.now().format(context), true)); _ctrl.clear(); });
  }

  void _showAttachMenu() {
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context, backgroundColor: HG.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => SafeArea(child: Column(mainAxisSize: MainAxisSize.min, children: [
        const SizedBox(height: 8),
        Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
        const SizedBox(height: 16),
        Text('Share', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 12),
        Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
          _attachOption(ctx, PhosphorIconsFill.camera, 'Camera', HG.blue, _pickCamera),
          _attachOption(ctx, PhosphorIconsFill.image, 'Photo', HG.purple, _pickImage),
          _attachOption(ctx, PhosphorIconsFill.file, 'File', HG.orange, _pickFile),
        ]),
        const SizedBox(height: 20),
      ])),
    );
  }

  Widget _attachOption(BuildContext ctx, IconData icon, String label, Color color, VoidCallback onTap) => GestureDetector(
    onTap: () { Navigator.pop(ctx); onTap(); },
    child: Column(children: [
      Container(width: 56, height: 56,
        decoration: BoxDecoration(color: color.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(16)),
        child: Icon(icon, size: 24, color: color)),
      const SizedBox(height: 8),
      Text(label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: HG.dark)),
    ]),
  );

  Future<void> _pickCamera() async {
    final xfile = await _picker.pickImage(source: ImageSource.camera, maxWidth: 1024, imageQuality: 80);
    if (xfile != null && mounted) setState(() => _items.add(_FileMsg(name: xfile.name, size: 'Photo', time: TimeOfDay.now().format(context), isMe: true, isImage: true, path: xfile.path)));
  }

  Future<void> _pickImage() async {
    final xfile = await _picker.pickImage(source: ImageSource.gallery, maxWidth: 1024, imageQuality: 80);
    if (xfile != null && mounted) setState(() => _items.add(_FileMsg(name: xfile.name, size: 'Photo', time: TimeOfDay.now().format(context), isMe: true, isImage: true, path: xfile.path)));
  }

  Future<void> _pickFile() async {
    final result = await FilePicker.platform.pickFiles();
    if (result != null && result.files.isNotEmpty && mounted) {
      final f = result.files.first;
      final sizeStr = f.size > 1024 * 1024 ? '${(f.size / 1024 / 1024).toStringAsFixed(1)} MB' : '${(f.size / 1024).toStringAsFixed(0)} KB';
      setState(() => _items.add(_FileMsg(name: f.name, size: sizeStr, time: TimeOfDay.now().format(context), isMe: true, path: f.path)));
    }
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final pb = MediaQuery.of(context).padding.bottom;
    final t = widget.thread;

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: Column(children: [
          // ── App bar ──
          Container(
            padding: EdgeInsets.fromLTRB(8, pt + 6, 14, 8),
            decoration: BoxDecoration(color: HG.white, border: Border(bottom: BorderSide(color: HG.border, width: 0.5))),
            child: Row(children: [
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Padding(padding: EdgeInsets.all(8), child: Icon(PhosphorIconsBold.arrowLeft, size: 20, color: HG.dark)),
              ),
              const SizedBox(width: 6),
              CircleAvatar(radius: 18,
                backgroundColor: t.isGroup ? HG.powderOrange : (t.isTutor ? HG.powderBlue : HG.grey100),
                child: t.isGroup
                    ? Icon(PhosphorIconsFill.usersThree, size: 14, color: HG.orange)
                    : Text(t.avatar, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: t.isTutor ? HG.blue : HG.grey500))),
              const SizedBox(width: 10),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
                Text(t.name, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark, height: 1.2)),
                Text(t.isGroup ? '${t.members} members' : (t.isTutor ? t.name.split(' ').last : ''), style: TextStyle(fontSize: 11, color: HG.textMuted)),
              ])),
            ]),
          ),

          // ── Messages ──
          Expanded(child: ListView.builder(
            reverse: true,
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            physics: const BouncingScrollPhysics(),
            itemCount: _items.length,
            itemBuilder: (_, i) {
              final item = _items[_items.length - 1 - i];
              if (item is _DateLabel) return _dateChip(item.label);
              if (item is _Msg) return _bubble(item);
              if (item is _FileMsg) return _fileBubble(item);
              if (item is _ClassBlock) return _MeetingCard(session: item.data);
              return const SizedBox();
            },
          )),

          // ── Input bar ──
          Container(
            padding: EdgeInsets.fromLTRB(8, 8, 8, pb + 8),
            decoration: BoxDecoration(color: HG.white, border: Border(top: BorderSide(color: HG.border, width: 0.5))),
            child: Row(children: [
              GestureDetector(
                onTap: _showAttachMenu,
                child: Container(width: 40, height: 40,
                  decoration: BoxDecoration(color: HG.grey50, shape: BoxShape.circle),
                  child: Icon(PhosphorIconsBold.plus, size: 18, color: HG.dark)),
              ),
              const SizedBox(width: 8),
              Expanded(child: Container(
                height: 40,
                padding: EdgeInsets.symmetric(horizontal: 14),
                decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(20), border: Border.all(color: HG.grey200)),
                child: Center(child: TextField(
                  controller: _ctrl, onSubmitted: (_) => _send(),
                  style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
                  decoration: InputDecoration(hintText: 'Message', hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
                    border: InputBorder.none, contentPadding: EdgeInsets.zero, isDense: true),
                )),
              )),
              const SizedBox(width: 8),
              GestureDetector(
                onTap: _send,
                child: Container(width: 40, height: 40,
                  decoration: BoxDecoration(color: HG.blue, shape: BoxShape.circle),
                  child: Icon(PhosphorIconsBold.arrowUp, size: 18, color: HG.fixedWhite)),
              ),
            ]),
          ),
        ]),
      ),
    );
  }

  Widget _dateChip(String label) => Center(
    child: Container(
      margin: EdgeInsets.symmetric(vertical: 12),
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(100)),
      child: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: HG.textMuted)),
    ),
  );

  Widget _bubble(_Msg m) => Align(
    alignment: m.isMe ? Alignment.centerRight : Alignment.centerLeft,
    child: Container(
      constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.72),
      margin: EdgeInsets.only(bottom: 4),
      padding: EdgeInsets.fromLTRB(12, 8, 12, 8),
      decoration: BoxDecoration(
        color: m.isMe ? HG.blue : HG.white,
        border: m.isMe ? null : Border.all(color: HG.grey200),
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(18), topRight: Radius.circular(18),
          bottomLeft: Radius.circular(m.isMe ? 18 : 4),
          bottomRight: Radius.circular(m.isMe ? 4 : 18)),
      ),
      child: Column(crossAxisAlignment: m.isMe ? CrossAxisAlignment.end : CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
        Text(m.text, style: TextStyle(fontSize: 15, color: m.isMe ? HG.fixedWhite : HG.dark, height: 1.35)),
        const SizedBox(height: 2),
        Text(m.time, style: TextStyle(fontSize: 10, color: m.isMe ? HG.fixedWhite.withValues(alpha: 0.45) : HG.textLight)),
      ]),
    ),
  );

  Widget _fileBubble(_FileMsg f) => GestureDetector(
    onTap: f.path != null ? () => OpenFilex.open(f.path!) : null,
    child: Align(
      alignment: f.isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.72),
        margin: EdgeInsets.only(bottom: 4),
        decoration: BoxDecoration(
          color: f.isMe ? HG.blue : HG.white,
          border: f.isMe ? null : Border.all(color: HG.grey200),
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(18), topRight: Radius.circular(18),
            bottomLeft: Radius.circular(f.isMe ? 18 : 4),
            bottomRight: Radius.circular(f.isMe ? 4 : 18)),
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
          if (f.isImage && f.path != null)
            ClipRRect(borderRadius: BorderRadius.only(topLeft: Radius.circular(18), topRight: Radius.circular(18)),
              child: Image.file(io.File(f.path!), width: double.infinity, height: 180, fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => Container(height: 80, color: HG.grey100, child: Center(child: Icon(PhosphorIconsRegular.image, color: HG.textLight))))),
          Padding(
            padding: EdgeInsets.fromLTRB(12, f.isImage ? 8 : 10, 12, 10),
            child: Row(children: [
              if (!f.isImage) ...[
                Container(width: 36, height: 36,
                  decoration: BoxDecoration(color: f.isMe ? HG.fixedWhite.withValues(alpha: 0.15) : HG.grey50, borderRadius: BorderRadius.circular(10)),
                  child: Icon(PhosphorIconsFill.file, size: 16, color: f.isMe ? HG.fixedWhite : HG.blue)),
                const SizedBox(width: 10),
              ],
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
                Text(f.name, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: f.isMe ? HG.fixedWhite : HG.dark), maxLines: 1, overflow: TextOverflow.ellipsis),
                Text(f.size, style: TextStyle(fontSize: 11, color: f.isMe ? HG.fixedWhite.withValues(alpha: 0.5) : HG.textMuted)),
              ])),
              const SizedBox(width: 8),
              Text(f.time, style: TextStyle(fontSize: 10, color: f.isMe ? HG.fixedWhite.withValues(alpha: 0.45) : HG.textLight)),
            ]),
          ),
        ]),
      ),
    ),
  );
}

// ── Meeting Card (inline, collapsible) ──
class _MeetingCard extends StatefulWidget {
  final PastSession session;
  const _MeetingCard({required this.session});
  @override
  State<_MeetingCard> createState() => _MeetingCardState();
}

class _MeetingCardState extends State<_MeetingCard> {
  bool _open = false;
  int _section = 0;

  List<_Sec> _sections(PastSession s) {
    final list = <_Sec>[_Sec('Summary', PhosphorIconsFill.note)];
    if (s.assignments.isNotEmpty) list.add(_Sec('Assignments', PhosphorIconsFill.fileText));
    if (s.sharedNotes.isNotEmpty) list.add(_Sec('Notes', PhosphorIconsFill.notepad));
    if (s.recordingLabel != null || s.transcript != null) list.add(_Sec('Media', PhosphorIconsFill.play));
    if (s.classChat.isNotEmpty) list.add(_Sec('Chat', PhosphorIconsFill.chatCircle));
    return list;
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.session;
    final chips = <Widget>[];
    if (s.assignments.isNotEmpty) chips.add(_chip(PhosphorIconsRegular.fileText, '${s.assignments.length}'));
    if (s.sharedNotes.isNotEmpty) chips.add(_chip(PhosphorIconsRegular.notepad, '${s.sharedNotes.length}'));
    if (s.recordingLabel != null) chips.add(_chip(PhosphorIconsRegular.play, ''));
    if (s.transcript != null) chips.add(_chip(PhosphorIconsRegular.textAa, ''));
    if (s.classChat.isNotEmpty) chips.add(_chip(PhosphorIconsRegular.chatCircle, '${s.classChat.length}'));

    return Container(
      margin: EdgeInsets.symmetric(vertical: 6),
      decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
      child: Column(children: [
        GestureDetector(
          onTap: () => setState(() => _open = !_open),
          behavior: HitTestBehavior.opaque,
          child: Padding(
            padding: EdgeInsets.fromLTRB(12, 12, 12, 12),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Container(width: 36, height: 36,
                decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(10)),
                child: Icon(PhosphorIconsFill.videoCamera, size: 16, color: HG.dark)),
              const SizedBox(width: 10),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(s.topic, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark, height: 1.3)),
                const SizedBox(height: 4),
                Row(children: [
                  Icon(s.attended ? PhosphorIconsFill.checkCircle : PhosphorIconsFill.xCircle, size: 11,
                    color: s.attended ? HG.green : HG.red),
                  const SizedBox(width: 4),
                  Text(s.attended ? 'Completed' : 'Missed', style: TextStyle(fontSize: 11, color: s.attended ? HG.green : HG.red, fontWeight: FontWeight.w500)),
                  if (chips.isNotEmpty) ...[
                    Container(width: 1, height: 10, margin: EdgeInsets.symmetric(horizontal: 8), color: HG.grey200),
                    ...chips,
                  ],
                ]),
              ])),
              AnimatedRotation(turns: _open ? 0.5 : 0, duration: const Duration(milliseconds: 200),
                child: Icon(PhosphorIconsRegular.caretDown, size: 16, color: HG.textLight)),
            ]),
          ),
        ),
        AnimatedCrossFade(
          firstChild: const SizedBox(width: double.infinity),
          secondChild: _body(s),
          crossFadeState: _open ? CrossFadeState.showSecond : CrossFadeState.showFirst,
          duration: const Duration(milliseconds: 200),
        ),
      ]),
    );
  }

  Widget _chip(IconData icon, String count) => Padding(
    padding: EdgeInsets.only(right: 6),
    child: Row(mainAxisSize: MainAxisSize.min, children: [
      Icon(icon, size: 11, color: HG.textLight),
      if (count.isNotEmpty) ...[const SizedBox(width: 2), Text(count, style: TextStyle(fontSize: 10, color: HG.textLight))],
    ]),
  );

  Widget _body(PastSession s) {
    final secs = _sections(s);
    if (_section >= secs.length) _section = 0;
    return Container(
      padding: EdgeInsets.fromLTRB(0, 0, 0, 14),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Divider(height: 1, color: HG.grey200),
        SizedBox(
          height: 38,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: EdgeInsets.fromLTRB(12, 8, 12, 0),
            physics: const BouncingScrollPhysics(),
            itemCount: secs.length,
            separatorBuilder: (_, __) => const SizedBox(width: 6),
            itemBuilder: (_, i) {
              final active = _section == i;
              return GestureDetector(
                onTap: () => setState(() => _section = i),
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: active ? HG.blue : HG.grey50,
                    borderRadius: BorderRadius.circular(100),
                    border: active ? null : Border.all(color: HG.grey200),
                  ),
                  child: Row(mainAxisSize: MainAxisSize.min, children: [
                    Icon(secs[i].icon, size: 11, color: active ? HG.fixedWhite : HG.textMuted),
                    const SizedBox(width: 5),
                    Text(secs[i].label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: active ? HG.fixedWhite : HG.dark)),
                  ]),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 10),
        Padding(padding: EdgeInsets.symmetric(horizontal: 12), child: _sectionContent(s, secs)),
      ]),
    );
  }

  Widget _sectionContent(PastSession s, List<_Sec> secs) {
    final label = secs[_section].label;
    switch (label) {
      case 'Summary':
        return Text(s.notes, style: TextStyle(fontSize: 13, color: HG.dark, height: 1.5));
      case 'Assignments':
        return Column(crossAxisAlignment: CrossAxisAlignment.start, children: s.assignments.map((a) => _row(a)).toList());
      case 'Notes':
        return Column(crossAxisAlignment: CrossAxisAlignment.start, children: s.sharedNotes.map((n) => _row(n)).toList());
      case 'Media':
        return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          if (s.recordingLabel != null) _mediaRow(PhosphorIconsFill.play, s.recordingLabel!, 'Play recording'),
          if (s.transcript != null) _mediaRow(PhosphorIconsFill.textAa, s.transcript!, 'View transcript'),
        ]);
      case 'Chat':
        return ConstrainedBox(
          constraints: BoxConstraints(maxHeight: 180),
          child: Scrollbar(thumbVisibility: true, child: ListView.builder(
            padding: EdgeInsets.zero, physics: const BouncingScrollPhysics(), shrinkWrap: true,
            itemCount: s.classChat.length,
            itemBuilder: (_, i) {
              final m = s.classChat[i];
              final isYou = m.$1 == 'You';
              return Padding(padding: EdgeInsets.only(bottom: 6), child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Container(width: 22, height: 22,
                  decoration: BoxDecoration(color: isYou ? HG.blue.withValues(alpha: 0.1) : HG.grey100, borderRadius: BorderRadius.circular(6)),
                  child: Center(child: Text(m.$1[0], style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: isYou ? HG.blue : HG.grey500)))),
                const SizedBox(width: 8),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(m.$1, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: isYou ? HG.blue : HG.dark)),
                  Text(m.$2, style: TextStyle(fontSize: 13, color: HG.dark, height: 1.35)),
                ])),
              ]));
            },
          )),
        );
      default:
        return const SizedBox();
    }
  }

  Widget _row(String text) => Padding(
    padding: EdgeInsets.only(bottom: 6),
    child: Container(
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10)),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Icon(PhosphorIconsRegular.fileText, size: 14, color: HG.textMuted),
        const SizedBox(width: 10),
        Expanded(child: Text(text, style: TextStyle(fontSize: 13, color: HG.dark, height: 1.4))),
      ]),
    ),
  );

  Widget _mediaRow(IconData icon, String text, String action) => Padding(
    padding: EdgeInsets.only(bottom: 6),
    child: Container(
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10)),
      child: Row(children: [
        Container(width: 32, height: 32,
          decoration: BoxDecoration(color: HG.blue.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(8)),
          child: Icon(icon, size: 14, color: HG.blue)),
        const SizedBox(width: 10),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(text, style: TextStyle(fontSize: 13, color: HG.dark)),
          Text(action, style: TextStyle(fontSize: 11, color: HG.blue, fontWeight: FontWeight.w500)),
        ])),
        Icon(PhosphorIconsRegular.caretRight, size: 14, color: HG.textLight),
      ]),
    ),
  );
}

class _Sec {
  final String label;
  final IconData icon;
  const _Sec(this.label, this.icon);
}
