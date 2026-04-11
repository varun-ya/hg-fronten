import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../theme.dart';

class BookDemoPage extends StatefulWidget {
  final String tutorName, tutorSubject, tutorAvatar;
  final double tutorRating;
  final int tutorPrice, tutorStudents;
  const BookDemoPage({super.key, required this.tutorName, required this.tutorSubject, required this.tutorAvatar, this.tutorRating = 0, this.tutorPrice = 0, this.tutorStudents = 0});
  @override
  State<BookDemoPage> createState() => _BookDemoPageState();
}

class _BookDemoPageState extends State<BookDemoPage> {
  int? _subjectIdx;
  DateTime? _pickedDate;
  int? _pickedSlot;
  final _msgCtrl = TextEditingController();
  bool _sending = false;
  bool _sent = false;

  List<String> get _subjects => widget.tutorSubject.split('·').map((s) => s.trim()).where((s) => s.isNotEmpty).toList();

  static const _slots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
  ];

  List<bool> get _available {
    final seed = (_pickedDate?.day ?? 0) * 5;
    return List.generate(_slots.length, (i) => (seed + i) % 4 != 0);
  }

  bool get _canSend => _subjectIdx != null && _pickedDate != null && _pickedSlot != null;

  @override
  void dispose() { _msgCtrl.dispose(); super.dispose(); }

  void _send() async {
    if (!_canSend) return;
    HapticFeedback.mediumImpact();
    setState(() => _sending = true);
    await Future.delayed(const Duration(milliseconds: 900));
    if (mounted) setState(() { _sending = false; _sent = true; });
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final pb = MediaQuery.of(context).padding.bottom;

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: Column(children: [
          Container(
            padding: EdgeInsets.fromLTRB(12, pt + 8, 16, 10),
            decoration: BoxDecoration(color: HG.white, border: Border(bottom: BorderSide(color: HG.border, width: 0.5))),
            child: Row(children: [
              IconButton(onPressed: () => Navigator.pop(context),
                icon: Icon(PhosphorIconsBold.arrowLeft, size: 18),
                style: IconButton.styleFrom(backgroundColor: HG.grey50, fixedSize: const Size(36, 36))),
              const SizedBox(width: 10),
              Text('Book Demo', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: HG.dark)),
            ]),
          ),
          Expanded(child: _sent ? _successView(pb) : _formView(pb)),
        ]),
      ),
    );
  }

  Widget _successView(double pb) => Center(child: Padding(
    padding: EdgeInsets.fromLTRB(32, 0, 32, pb),
    child: Column(mainAxisSize: MainAxisSize.min, children: [
      Container(width: 64, height: 64,
        decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.1), shape: BoxShape.circle),
        child: Icon(PhosphorIconsFill.checkCircle, size: 32, color: HG.green)),
      const SizedBox(height: 20),
      Text('Request sent!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark)),
      const SizedBox(height: 8),
      Text('${widget.tutorName} will review your demo request and get back to you soon.', textAlign: TextAlign.center,
        style: TextStyle(fontSize: 14, color: HG.textMuted, height: 1.5)),
      const SizedBox(height: 8),
      Container(
        margin: EdgeInsets.only(top: 4),
        padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(color: HG.powderBlue, borderRadius: BorderRadius.circular(12)),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          Icon(PhosphorIconsRegular.info, size: 14, color: HG.blue),
          const SizedBox(width: 8),
          Text('Demo classes are free', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.blue)),
        ]),
      ),
      const SizedBox(height: 28),
      SizedBox(width: double.infinity, child: FilledButton(
        onPressed: () => Navigator.pop(context),
        style: FilledButton.styleFrom(backgroundColor: HG.dark, foregroundColor: HG.fixedWhite, padding: EdgeInsets.symmetric(vertical: 14), shape: const StadiumBorder(),
          textStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, fontFamily: HG.font)),
        child: Text('Done'),
      )),
    ]),
  ));

  Widget _formView(double pb) => ListView(
    padding: EdgeInsets.fromLTRB(16, 16, 16, pb + 16),
    physics: const BouncingScrollPhysics(),
    children: [
      _tutorHeader(),
      const SizedBox(height: 20),

      _label('What do you need help with?'),
      const SizedBox(height: 8),
      Wrap(spacing: 8, runSpacing: 8, children: List.generate(_subjects.length, (i) {
        final sel = _subjectIdx == i;
        return GestureDetector(
          onTap: () { HapticFeedback.selectionClick(); setState(() => _subjectIdx = i); },
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(color: sel ? HG.blue : HG.grey50, borderRadius: BorderRadius.circular(12),
              border: sel ? null : Border.all(color: HG.grey200)),
            child: Text(_subjects[i], style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: sel ? HG.fixedWhite : HG.dark)),
          ),
        );
      })),
      const SizedBox(height: 20),

      _label('Preferred date'),
      const SizedBox(height: 8),
      GestureDetector(
        onTap: () async {
          final d = await showDatePicker(context: context,
            initialDate: DateTime.now().add(const Duration(days: 1)),
            firstDate: DateTime.now(), lastDate: DateTime.now().add(const Duration(days: 14)),
            builder: (ctx, child) => Theme(
              data: Theme.of(ctx).copyWith(colorScheme: context.isDark
                  ? ColorScheme.dark(primary: HG.blue, onPrimary: HG.fixedWhite, surface: HG.grey100)
                  : ColorScheme.light(primary: HG.fixedBlue, onPrimary: HG.fixedWhite, surface: HG.fixedWhite)),
              child: child!));
          if (d != null) setState(() { _pickedDate = d; _pickedSlot = null; });
        },
        child: Container(
          width: double.infinity, padding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
          child: Row(children: [
            Icon(PhosphorIconsRegular.calendarBlank, size: 18, color: HG.textMuted),
            const SizedBox(width: 10),
            Text(_pickedDate != null
                ? '${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][_pickedDate!.weekday - 1]}, ${_pickedDate!.day} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][_pickedDate!.month - 1]}'
                : 'Pick a date',
              style: TextStyle(fontSize: 14, fontWeight: _pickedDate != null ? FontWeight.w600 : FontWeight.w400, color: _pickedDate != null ? HG.dark : HG.textLight)),
            const Spacer(),
            Icon(PhosphorIconsRegular.caretDown, size: 14, color: HG.textLight),
          ]),
        ),
      ),
      const SizedBox(height: 20),

      if (_pickedDate != null) ...[
        _label('Preferred time'),
        const SizedBox(height: 8),
        GridView.builder(
          shrinkWrap: true, physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 4, mainAxisSpacing: 6, crossAxisSpacing: 6, childAspectRatio: 2.4),
          itemCount: _slots.length,
          itemBuilder: (_, i) {
            final sel = _pickedSlot == i;
            final ok = _available[i];
            return GestureDetector(
              onTap: ok ? () { HapticFeedback.selectionClick(); setState(() => _pickedSlot = i); } : null,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 150),
                decoration: BoxDecoration(color: sel ? HG.blue : (ok ? HG.grey50 : HG.grey100), borderRadius: BorderRadius.circular(10),
                  border: sel ? null : Border.all(color: ok ? HG.grey200 : Colors.transparent)),
                child: Center(child: Text(_slots[i],
                  style: TextStyle(fontSize: 12, fontWeight: sel ? FontWeight.w700 : FontWeight.w500,
                    color: sel ? HG.fixedWhite : (ok ? HG.dark : HG.textLight),
                    decoration: ok ? null : TextDecoration.lineThrough))),
              ),
            );
          },
        ),
        const SizedBox(height: 20),
      ],

      _label('Message (optional)'),
      const SizedBox(height: 8),
      Container(
        padding: EdgeInsets.symmetric(horizontal: 14),
        decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
        child: TextField(controller: _msgCtrl, maxLines: 3, minLines: 2,
          style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
          decoration: InputDecoration(
            hintText: 'Tell the tutor what you need help with, your current level, goals...',
            hintStyle: TextStyle(fontSize: 13, color: HG.textLight, height: 1.4),
            border: InputBorder.none, contentPadding: EdgeInsets.symmetric(vertical: 12))),
      ),
      const SizedBox(height: 12),

      Container(
        padding: EdgeInsets.all(14),
        decoration: BoxDecoration(color: HG.powderBlue, borderRadius: BorderRadius.circular(14)),
        child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Icon(PhosphorIconsFill.info, size: 16, color: HG.blue),
          const SizedBox(width: 10),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('Demo classes are free', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.blue)),
            const SizedBox(height: 2),
            Text('The tutor will confirm the time and send you a meeting link. Sessions are typically 30\u201345 min.', style: TextStyle(fontSize: 11, color: HG.blue.withValues(alpha: 0.7), height: 1.4)),
          ])),
        ]),
      ),
      const SizedBox(height: 20),

      Padding(
        padding: EdgeInsets.symmetric(horizontal: 24),
        child: SizedBox(width: double.infinity, child: FilledButton(
          onPressed: _canSend && !_sending ? _send : null,
          style: FilledButton.styleFrom(
            backgroundColor: HG.dark, disabledBackgroundColor: HG.grey200,
            foregroundColor: HG.fixedWhite, disabledForegroundColor: HG.textLight,
            padding: EdgeInsets.symmetric(vertical: 14), shape: const StadiumBorder(),
            textStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, fontFamily: HG.font)),
          child: _sending
              ? SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: HG.fixedWhite))
              : Text('Send Demo Request'),
        )),
      ),
    ],
  );

  Widget _tutorHeader() => Container(
    padding: EdgeInsets.all(16),
    decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: HG.grey200)),
    child: Row(children: [
      CircleAvatar(radius: 26, backgroundColor: HG.powderBlue,
        child: Text(widget.tutorAvatar, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: HG.blue))),
      const SizedBox(width: 14),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Flexible(child: Text(widget.tutorName, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark))),
          const SizedBox(width: 4),
          Icon(PhosphorIconsFill.sealCheck, size: 14, color: HG.blue),
        ]),
        const SizedBox(height: 3),
        Text(widget.tutorSubject, style: TextStyle(fontSize: 12, color: HG.textMuted)),
        const SizedBox(height: 4),
        Row(children: [
          Icon(PhosphorIconsFill.star, size: 12, color: HG.amber),
          const SizedBox(width: 3),
          Text('${widget.tutorRating}', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.dark)),
          if (widget.tutorStudents > 0) ...[
            const SizedBox(width: 8),
            Icon(PhosphorIconsRegular.users, size: 12, color: HG.textLight),
            const SizedBox(width: 3),
            Text('${widget.tutorStudents} students', style: TextStyle(fontSize: 11, color: HG.textMuted)),
          ],
          if (widget.tutorPrice > 0) ...[
            const SizedBox(width: 8),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(8), border: Border.all(color: HG.green.withValues(alpha: 0.18))),
              child: Text('\u20b9${widget.tutorPrice}/hr', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.green)),
            ),
          ],
        ]),
      ])),
    ]),
  );

  Widget _label(String s) => Text(s, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark));
}
