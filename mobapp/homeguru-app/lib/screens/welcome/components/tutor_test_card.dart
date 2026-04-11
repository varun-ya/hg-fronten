import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class TutorTestCard extends StatefulWidget {
  final double pb;
  final ValueChanged<bool> onResult; // true=passed, false=failed
  const TutorTestCard({super.key, required this.pb, required this.onResult});

  @override
  State<TutorTestCard> createState() => _TutorTestCardState();
}

class _TutorTestCardState extends State<TutorTestCard> {
  // 0=intro, 1=link sent (start now), 2=schedule picker, 3=schedule confirmed, 4=completed
  int _sub = 0;
  bool _passed = false;
  int _countdown = 30;
  Timer? _timer;
  DateTime? _schedDate;
  TimeOfDay? _schedTime;

  void _startNow() {
    HapticFeedback.mediumImpact();
    setState(() { _sub = 1; _passed = true; });
    _startCountdown();
  }

  void _scheduleLater() {
    HapticFeedback.mediumImpact();
    setState(() => _sub = 2);
  }

  void _confirmSchedule() {
    if (_schedDate == null || _schedTime == null) return;
    HapticFeedback.mediumImpact();
    setState(() { _sub = 3; _passed = false; });
    _startCountdown();
  }

  void _startCountdown() {
    _countdown = 30;
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (!mounted) { t.cancel(); return; }
      setState(() => _countdown--);
      if (_countdown <= 0) {
        t.cancel();
        setState(() => _sub = 4);
      }
    });
  }

  Future<void> _pickDate() async {
    final now = DateTime.now();
    final d = await showDatePicker(
      context: context,
      initialDate: now.add(const Duration(days: 1)),
      firstDate: now,
      lastDate: now.add(const Duration(days: 45)),
    );
    if (d != null && mounted) setState(() => _schedDate = d);
  }

  Future<void> _pickTime() async {
    final t = await showTimePicker(context: context, initialTime: const TimeOfDay(hour: 10, minute: 0));
    if (t != null && mounted) setState(() => _schedTime = t);
  }

  @override
  void dispose() { _timer?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(color: HG.white, border: Border.all(color: HG.grey200), borderRadius: BorderRadius.circular(28)),
        child: Stack(children: [
          _sub == 0 ? _buildIntro()
            : _sub == 1 ? _buildLinkSent()
            : _sub == 2 ? _buildSchedulePicker()
            : _sub == 3 ? _buildScheduleWaiting()
            : _buildCompleted(),
        ]),
    );
  }

  // ── Intro ──
  Widget _buildIntro() {
    return Column(children: [
      const SizedBox(height: 28),
      Text('Teaching Assessment', textAlign: TextAlign.center, style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 6),
      Padding(padding: EdgeInsets.symmetric(horizontal: 32),
        child: Text('Complete a short assessment to verify your teaching skills.', textAlign: TextAlign.center, style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.4))),
      const Spacer(),

      // Info card
      Padding(padding: EdgeInsets.symmetric(horizontal: 28), child: Container(
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
        child: Column(children: [
          Row(children: [
            Text('15', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w700, color: HG.dark)),
            const SizedBox(width: 4),
            Text('min', style: TextStyle(fontSize: 13, color: HG.textMuted)),
            const SizedBox(width: 20),
            Container(width: 1, height: 40, color: HG.grey200),
            const SizedBox(width: 20),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('10 MCQs + 2 written', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: HG.dark)),
              SizedBox(height: 2),
              Text('Teaching aptitude & subject knowledge', style: TextStyle(fontSize: 12, color: HG.textMuted)),
            ])),
          ]),
          const SizedBox(height: 14),
          Container(height: 1, color: HG.grey100),
          const SizedBox(height: 14),
          ...[
            'Test link sent to WhatsApp & email',
            'Complete within 45 days',
            '1 attempt per 45-day window',
          ].map((t) => Padding(
            padding: EdgeInsets.only(bottom: 6),
            child: Row(children: [
              Icon(PhosphorIconsRegular.info, size: 14, color: HG.textLight),
              const SizedBox(width: 8),
              Expanded(child: Text(t, style: TextStyle(fontSize: 12, color: HG.textMuted))),
            ]),
          )),
        ]),
      )),

      const Spacer(),

      // Two buttons
      Padding(
        padding: EdgeInsets.fromLTRB(24, 0, 24, widget.pb + 24),
        child: Column(children: [
          GestureDetector(
            onTap: _startNow,
            child: Container(
              width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
              decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100),
                boxShadow: [BoxShadow(color: HG.dark.withValues(alpha: 0.2), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.dark.withValues(alpha: 0.1), blurRadius: 4, offset: const Offset(0, 1))]),
              child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                Text('Start Now', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white)),
                const SizedBox(width: 8),
                Icon(PhosphorIconsBold.arrowRight, size: 16, color: HG.white),
              ]),
            ),
          ),
          const SizedBox(height: 10),
          GestureDetector(
            onTap: _scheduleLater,
            child: Container(
              width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
              decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(100),
                border: Border.all(color: HG.border, width: 2),
                boxShadow: null),
              child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                Icon(PhosphorIconsRegular.calendarBlank, size: 16, color: HG.dark),
                const SizedBox(width: 8),
                Text('Schedule Later', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
              ]),
            ),
          ),
        ]),
      ),
    ]);
  }

  // ── Link sent (Start Now) ──
  Widget _buildLinkSent() {
    return Column(children: [
      const Spacer(),
      Container(
        width: 56, height: 56,
        decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.1), shape: BoxShape.circle),
        child: Icon(PhosphorIconsFill.paperPlaneTilt, size: 24, color: HG.green),
      ),
      const SizedBox(height: 20),
      Text('Test Link Sent!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 10),
      Padding(padding: EdgeInsets.symmetric(horizontal: 36),
        child: Text('The assessment URL has been sent to your WhatsApp and email. Please complete the assessment to move forward.', textAlign: TextAlign.center,
          style: TextStyle(fontSize: 14, color: HG.textMuted, height: 1.5))),
      const SizedBox(height: 28),

      // Countdown
      Container(
        margin: EdgeInsets.symmetric(horizontal: 40),
        padding: EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
        child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          SizedBox(width: 18, height: 18, child: CircularProgressIndicator(
            value: (30 - _countdown) / 30, strokeWidth: 2, color: HG.orange,
            backgroundColor: HG.grey200,
          )),
          const SizedBox(width: 12),
          Text('Waiting for completion... ${_countdown}s', style: TextStyle(fontSize: 13, color: HG.textMuted)),
        ]),
      ),
      const Spacer(flex: 2),
    ]);
  }

  // ── Schedule picker ──
  Widget _buildSchedulePicker() {
    final hasDate = _schedDate != null;
    final hasTime = _schedTime != null;
    return Column(children: [
      const SizedBox(height: 28),
      Text('Schedule Assessment', textAlign: TextAlign.center, style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 6),
      Padding(padding: EdgeInsets.symmetric(horizontal: 32),
        child: Text('Pick a date and time that works for you.', textAlign: TextAlign.center, style: TextStyle(fontSize: 13, color: HG.textMuted))),
      const Spacer(),

      Padding(padding: EdgeInsets.symmetric(horizontal: 28), child: Column(children: [
        GestureDetector(
          onTap: _pickDate,
          child: Container(
            width: double.infinity,
            padding: EdgeInsets.symmetric(horizontal: 18, vertical: 16),
            decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14),
              border: Border.all(color: hasDate ? HG.orange : HG.border, width: hasDate ? 2 : 1)),
            child: Row(children: [
              Icon(PhosphorIconsRegular.calendarBlank, size: 18, color: hasDate ? HG.orange : HG.textLight),
              const SizedBox(width: 12),
              Text(hasDate ? '${_schedDate!.day}/${_schedDate!.month}/${_schedDate!.year}' : 'Select date',
                style: TextStyle(fontSize: 14, fontWeight: hasDate ? FontWeight.w600 : FontWeight.w400, color: hasDate ? HG.orange : HG.textLight)),
            ]),
          ),
        ),
        const SizedBox(height: 10),
        GestureDetector(
          onTap: _pickTime,
          child: Container(
            width: double.infinity,
            padding: EdgeInsets.symmetric(horizontal: 18, vertical: 16),
            decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14),
              border: Border.all(color: hasTime ? HG.orange : HG.border, width: hasTime ? 2 : 1)),
            child: Row(children: [
              Icon(PhosphorIconsRegular.clock, size: 18, color: hasTime ? HG.orange : HG.textLight),
              const SizedBox(width: 12),
              Text(hasTime ? _schedTime!.format(context) : 'Select time',
                style: TextStyle(fontSize: 14, fontWeight: hasTime ? FontWeight.w600 : FontWeight.w400, color: hasTime ? HG.orange : HG.textLight)),
            ]),
          ),
        ),
      ])),

      const Spacer(),

      Padding(
        padding: EdgeInsets.fromLTRB(24, 0, 24, widget.pb + 24),
        child: GestureDetector(
          onTap: (hasDate && hasTime) ? _confirmSchedule : null,
          child: AnimatedOpacity(
            duration: const Duration(milliseconds: 250), opacity: (hasDate && hasTime) ? 1.0 : 0.4,
            child: Container(
              width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
              decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100),
                boxShadow: [BoxShadow(color: HG.dark.withValues(alpha: 0.2), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.dark.withValues(alpha: 0.1), blurRadius: 4, offset: const Offset(0, 1))]),
              child: Center(child: Text('Confirm Schedule', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white))),
            ),
          ),
        ),
      ),
    ]);
  }

  // ── Schedule confirmed, waiting ──
  Widget _buildScheduleWaiting() {
    return Column(children: [
      const Spacer(),
      Container(
        width: 56, height: 56,
        decoration: BoxDecoration(color: HG.orange.withValues(alpha: 0.1), shape: BoxShape.circle),
        child: Icon(PhosphorIconsFill.calendarCheck, size: 24, color: HG.orange),
      ),
      const SizedBox(height: 20),
      Text('Assessment Scheduled', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 10),
      Padding(padding: EdgeInsets.symmetric(horizontal: 36),
        child: Text(
          'Scheduled for ${_schedDate!.day}/${_schedDate!.month}/${_schedDate!.year} at ${_schedTime!.format(context)}.\nWe\'ll send you a reminder.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 14, color: HG.textMuted, height: 1.5),
        )),
      const SizedBox(height: 28),

      Container(
        margin: EdgeInsets.symmetric(horizontal: 40),
        padding: EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
        child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          SizedBox(width: 18, height: 18, child: CircularProgressIndicator(
            value: (30 - _countdown) / 30, strokeWidth: 2, color: HG.orange,
            backgroundColor: HG.grey200,
          )),
          const SizedBox(width: 12),
          Text('Processing... ${_countdown}s', style: TextStyle(fontSize: 13, color: HG.textMuted)),
        ]),
      ),
      const Spacer(flex: 2),
    ]);
  }

  // ── Completed ──
  Widget _buildCompleted() {
    return Column(children: [
      const Spacer(),
      Container(
        width: 56, height: 56,
        decoration: BoxDecoration(color: HG.dark.withValues(alpha: 0.06), shape: BoxShape.circle),
        child: Icon(Icons.check_circle_rounded, size: 28, color: HG.dark),
      ),
      const SizedBox(height: 16),
      Text('Assessment Complete', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 8),
      Padding(padding: EdgeInsets.symmetric(horizontal: 40),
        child: Text(
          _passed ? 'Your results are ready. Tap continue to see them.' : 'Your results are ready. Tap continue to see them.',
          textAlign: TextAlign.center, style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.5),
        )),
      const Spacer(),
      Padding(
        padding: EdgeInsets.fromLTRB(24, 0, 24, widget.pb + 24),
        child: GestureDetector(
          onTap: () => widget.onResult(_passed),
          child: Container(
            width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
            decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100),
              boxShadow: [BoxShadow(color: HG.dark.withValues(alpha: 0.2), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.dark.withValues(alpha: 0.1), blurRadius: 4, offset: const Offset(0, 1))]),
            child: Center(child: Text('Continue', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white))),
          ),
        ),
      ),
    ]);
  }
}
