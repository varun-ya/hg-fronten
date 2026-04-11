import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class TutorCongratsCard extends StatefulWidget {
  final double pb;
  final bool passed;
  final VoidCallback onNext;
  const TutorCongratsCard({super.key, required this.pb, required this.passed, required this.onNext});

  @override
  State<TutorCongratsCard> createState() => _TutorCongratsCardState();
}

class _TutorCongratsCardState extends State<TutorCongratsCard> with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  late final Animation<double> _fade;
  late final Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 700));
    _fade = CurvedAnimation(parent: _ctrl, curve: Curves.easeOut);
    _slide = Tween(begin: const Offset(0, 0.05), end: Offset.zero).animate(CurvedAnimation(parent: _ctrl, curve: Curves.easeOutCubic));
    _ctrl.forward();
  }

  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(color: HG.white, border: Border.all(color: HG.grey200), borderRadius: BorderRadius.circular(28)),
        child: Stack(children: [
          FadeTransition(opacity: _fade, child: SlideTransition(position: _slide,
            child: widget.passed ? _buildPassed() : _buildFailed(),
          )),
        ]),
    );
  }

  Widget _buildPassed() {
    return Column(children: [
      const Spacer(),
      Container(
        width: 64, height: 64,
        decoration: BoxDecoration(color: Color(0xFFFFFBEB), shape: BoxShape.circle),
        child: Icon(PhosphorIconsFill.trophy, size: 32, color: HG.amber),
      ),
      const SizedBox(height: 20),
      Text('Congratulations!', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: HG.dark)),
      const SizedBox(height: 8),
      Padding(padding: EdgeInsets.symmetric(horizontal: 36),
        child: Text("You've passed and are now eligible to become a HomeGuru Tutor.", textAlign: TextAlign.center,
          style: TextStyle(fontSize: 14, color: HG.textMuted, height: 1.5))),
      const SizedBox(height: 28),
      ...[
        ('Qualification challenge cleared', HG.green, const Color(0xFFF0FDF4)),
        ('You are eligible to teach on HomeGuru', HG.amber, const Color(0xFFFFFBEB)),
      ].map((t) => Padding(
        padding: EdgeInsets.symmetric(horizontal: 28, vertical: 4),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
          child: Row(children: [
            Container(
              width: 32, height: 32,
              decoration: BoxDecoration(color: t.$3, borderRadius: BorderRadius.circular(8)),
              child: Icon(Icons.check_circle_rounded, size: 16, color: t.$2),
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(t.$1, style: TextStyle(fontSize: 14, color: HG.dark))),
          ]),
        ),
      )),
      const SizedBox(height: 16),
      Padding(padding: EdgeInsets.symmetric(horizontal: 32),
        child: Text('Just a few more steps \u2014 complete the payment and verify your ID to go live.', textAlign: TextAlign.center,
          style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.5))),
      const Spacer(),
      Padding(
        padding: EdgeInsets.fromLTRB(24, 8, 24, widget.pb + 24),
        child: GestureDetector(
          onTap: widget.onNext,
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

  Widget _buildFailed() {
    return Column(children: [
      const Spacer(),
      Container(
        width: 64, height: 64,
        decoration: BoxDecoration(color: HG.red.withValues(alpha: 0.08), shape: BoxShape.circle),
        child: Icon(PhosphorIconsFill.xCircle, size: 32, color: HG.red),
      ),
      const SizedBox(height: 20),
      Text("Didn't pass this time", style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: HG.dark)),
      const SizedBox(height: 8),
      Padding(padding: EdgeInsets.symmetric(horizontal: 36),
        child: Text("Don't worry \u2014 you can retake the assessment after 45 days. Keep preparing and come back stronger!", textAlign: TextAlign.center,
          style: TextStyle(fontSize: 14, color: HG.textMuted, height: 1.5))),
      const SizedBox(height: 28),
      ...[
        ('Assessment completed', HG.dark, HG.grey100),
        ('Result: Did not qualify', HG.red, const Color(0xFFFEF2F2)),
        ('Retake available in 45 days', HG.orange, const Color(0xFFFFF7ED)),
      ].map((t) => Padding(
        padding: EdgeInsets.symmetric(horizontal: 28, vertical: 4),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
          child: Row(children: [
            Container(
              width: 32, height: 32,
              decoration: BoxDecoration(color: t.$3, borderRadius: BorderRadius.circular(8)),
              child: Icon(
                t.$2 == HG.red ? PhosphorIconsFill.xCircle : PhosphorIconsRegular.info,
                size: 16, color: t.$2,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(t.$1, style: TextStyle(fontSize: 14, color: HG.dark))),
          ]),
        ),
      )),
      const Spacer(),
      Padding(
        padding: EdgeInsets.fromLTRB(24, 8, 24, widget.pb + 24),
        child: Container(
          width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
          decoration: BoxDecoration(color: HG.grey200, borderRadius: BorderRadius.circular(100)),
          child: Center(child: Text('Cannot proceed', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.grey500))),
        ),
      ),
    ]);
  }
}
