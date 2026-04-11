import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../../theme.dart';

class DailyQuestCard extends StatelessWidget {
  final int xpEarned;
  final int xpGoal;
  final int lessonsToday;
  const DailyQuestCard({super.key, this.xpEarned = 35, this.xpGoal = 50, this.lessonsToday = 1});

  double get _progress => (xpEarned / xpGoal).clamp(0.0, 1.0);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: HG.white, borderRadius: BorderRadius.circular(20),
        border: Border.all(color: HG.border),
      ),
      child: Row(children: [
        // Progress ring
        SizedBox(width: 64, height: 64, child: CustomPaint(
          painter: _RingPainter(_progress),
          child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
            Text('$xpEarned', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: HG.orange)),
            Text('XP', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.textLight)),
          ])),
        )),
        const SizedBox(width: 16),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Daily Quest', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
          const SizedBox(height: 4),
          Text('$xpEarned / $xpGoal XP today', style: TextStyle(fontSize: 13, color: HG.textMuted)),
          const SizedBox(height: 6),
          Row(children: [
            Icon(PhosphorIconsFill.bookOpen, size: 14, color: HG.green),
            const SizedBox(width: 4),
            Text('$lessonsToday lesson${lessonsToday == 1 ? '' : 's'} completed', style: TextStyle(fontSize: 12, color: HG.green, fontWeight: FontWeight.w600)),
          ]),
        ])),
      ]),
    );
  }
}

class _RingPainter extends CustomPainter {
  final double progress;
  _RingPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    final c = size.center(Offset.zero);
    final r = size.width / 2 - 4;
    final bg = Paint()..color = const Color(0xFFF3F4F6)..style = PaintingStyle.stroke..strokeWidth = 6..strokeCap = StrokeCap.round;
    final fg = Paint()..color = HG.orange..style = PaintingStyle.stroke..strokeWidth = 6..strokeCap = StrokeCap.round;
    canvas.drawCircle(c, r, bg);
    canvas.drawArc(Rect.fromCircle(center: c, radius: r), -math.pi / 2, 2 * math.pi * progress, false, fg);
  }

  @override
  bool shouldRepaint(_RingPainter old) => old.progress != progress;
}
