import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class TutorGoLiveCard extends StatefulWidget {
  final double pb;
  final VoidCallback onFinish;
  const TutorGoLiveCard({super.key, required this.pb, required this.onFinish});

  @override
  State<TutorGoLiveCard> createState() => _TutorGoLiveCardState();
}

class _TutorGoLiveCardState extends State<TutorGoLiveCard> with SingleTickerProviderStateMixin {
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
          FadeTransition(opacity: _fade, child: SlideTransition(position: _slide, child: Column(children: [
            const Spacer(),
            Icon(PhosphorIconsFill.confetti, size: 32, color: HG.orange),
            const SizedBox(height: 16),
            Text("You're ready to go live!", style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: HG.dark)),
            const SizedBox(height: 8),
            Padding(padding: EdgeInsets.symmetric(horizontal: 36),
              child: Text('Students can now discover you and book sessions. Welcome to HomeGuru!', textAlign: TextAlign.center,
                style: TextStyle(fontSize: 14, color: HG.textMuted, height: 1.5))),
            const SizedBox(height: 28),
            ...['Subjects & skills added', 'Qualification challenge passed', 'Listing fee paid', 'ID verified'].map((t) => Padding(
              padding: EdgeInsets.symmetric(horizontal: 28, vertical: 4),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
                child: Row(children: [
                  Icon(Icons.check_circle_rounded, size: 18, color: HG.green),
                  const SizedBox(width: 12),
                  Text(t, style: TextStyle(fontSize: 14, color: HG.dark)),
                ]),
              ),
            )),
            const Spacer(),
            Padding(
              padding: EdgeInsets.fromLTRB(24, 8, 24, widget.pb + 24),
              child: GestureDetector(
                onTap: widget.onFinish,
                child: Container(
                  width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(100),
                    gradient: const LinearGradient(colors: [Color(0xFFF97316), Color(0xFFEA580C)]),
                    boxShadow: [BoxShadow(color: HG.orange.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.orange.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1))],
                  ),
                  child: Center(child: Text('Go to Dashboard', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white))),
                ),
              ),
            ),
          ]))),
        ]),
    );
  }
}
