import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../widgets/mascot_walk.dart';
import '../../../widgets/mascot_launch_overlay.dart';

class AiMatchCard extends StatefulWidget {
  const AiMatchCard({super.key});

  @override
  State<AiMatchCard> createState() => _AiMatchCardState();
}

class _AiMatchCardState extends State<AiMatchCard> with SingleTickerProviderStateMixin {
  late final AnimationController _shimmer;

  @override
  void initState() {
    super.initState();
    _shimmer = AnimationController(vsync: this, duration: const Duration(milliseconds: 1000))
      ..repeat();
  }

  @override
  void dispose() { _shimmer.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => MascotLaunchOverlay.show(context),
      child: Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(28),
        gradient: const LinearGradient(
          begin: Alignment.bottomLeft, end: Alignment.topRight,
          colors: [Color(0xFFC8E8F8), Color(0xFFF2BEB4), Color(0xFFF3D5F3)]),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(children: [
        // Shimmer wave
        Positioned.fill(
          child: AnimatedBuilder(
            animation: _shimmer,
            builder: (_, __) {
              return CustomPaint(
                painter: _ShimmerPainter(progress: Curves.easeInOut.transform(_shimmer.value)),
              );
            },
          ),
        ),
        // Content
        Padding(
          padding: EdgeInsets.fromLTRB(20, 22, 20, 22),
          child: Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Icon(PhosphorIconsFill.sparkle, size: 16, color: const Color(0xFF3B2212)),
                const SizedBox(width: 6),
                Text('AI Tutor Match', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: const Color(0xFF3B2212).withValues(alpha: 0.65), letterSpacing: 0.8)),
              ]),
              const SizedBox(height: 10),
              Text('Find your\nperfect tutor',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: const Color(0xFF3B2212), height: 1.2, letterSpacing: -0.5)),
              const SizedBox(height: 6),
              Text('Matched to your learning style, goals & schedule.',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.w400, color: const Color(0xFF3B2212).withValues(alpha: 0.55), height: 1.3)),
            ])),
            const SizedBox(width: 12),
            Stack(
              clipBehavior: Clip.none,
              children: [
                FilledButton(
                  onPressed: () => MascotLaunchOverlay.show(context),
                  style: FilledButton.styleFrom(
                    backgroundColor: const Color(0xFF3B2212),
                    foregroundColor: HG.fixedWhite,
                    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                    shape: StadiumBorder(),
                    textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, fontFamily: HG.font, letterSpacing: -0.2)),
                  child: Text('Try Now'),
                ),
                Positioned(
                  top: -22, left: 0, right: 0,
                  child: Center(child: RepaintBoundary(child: MascotWalk(size: 28))),
                ),
              ],
            ),
          ]),
        ),
      ]),
      ),
    );
  }
}

class _ShimmerPainter extends CustomPainter {
  final double progress;
  const _ShimmerPainter({required this.progress});

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    final bandWidth = w * 0.35;
    // Sweep from left to right with overshoot so it fully exits
    final center = -bandWidth + (w + bandWidth * 2) * progress;

    final paint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          Colors.white.withValues(alpha: 0.0),
          Colors.white.withValues(alpha: 0.5),
          Colors.white.withValues(alpha: 0.0),
        ],
        stops: const [0.0, 0.5, 1.0],
      ).createShader(Rect.fromLTWH(center - bandWidth / 2, 0, bandWidth, h));

    canvas.drawRect(Rect.fromLTWH(0, 0, w, h), paint);
  }

  @override
  bool shouldRepaint(_ShimmerPainter old) => old.progress != progress;
}
