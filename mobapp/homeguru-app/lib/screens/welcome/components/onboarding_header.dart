import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../widgets/mascot_walk.dart';
import '../../../widgets/typing_bubble.dart';

class OnboardingHeader extends StatelessWidget {
  final int page;
  final int totalSteps;
  final Color stepColor;
  final String owlSays;
  final VoidCallback onBack;

  const OnboardingHeader({
    super.key,
    required this.page,
    required this.totalSteps,
    required this.stepColor,
    required this.owlSays,
    required this.onBack,
  });

  @override
  Widget build(BuildContext context) {
    final progress = page / totalSteps;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            // M3 icon button
            GestureDetector(
              onTap: onBack,
              child: Container(
                width: 40, height: 40,
                decoration: BoxDecoration(
                  color: HG.grey100,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(PhosphorIconsBold.arrowLeft, size: 18, color: HG.dark),
              ),
            ),
            const SizedBox(width: 14),
            // Progress bar with mascot
            Expanded(
              child: SizedBox(
                height: 40,
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    final barW = constraints.maxWidth;
                    final owlX = (barW * progress).clamp(0.0, barW - 28);
                    return Stack(
                      clipBehavior: Clip.none,
                      children: [
                        // Track
                        Positioned(
                          left: 0, right: 0, bottom: 0,
                          child: Container(
                            height: 6,
                            decoration: BoxDecoration(
                              color: HG.grey200,
                              borderRadius: BorderRadius.circular(3),
                            ),
                            child: AnimatedFractionallySizedBox(
                              duration: const Duration(milliseconds: 500),
                              curve: Curves.easeOutCubic,
                              alignment: Alignment.centerLeft,
                              widthFactor: progress.clamp(0.0, 1.0),
                              child: Container(
                                decoration: BoxDecoration(
                                  color: stepColor,
                                  borderRadius: BorderRadius.circular(3),
                                ),
                              ),
                            ),
                          ),
                        ),
                        // Mascot walking on bar
                        AnimatedPositioned(
                          duration: const Duration(milliseconds: 600),
                          curve: Curves.easeOutCubic,
                          left: owlX,
                          top: 0,
                          child: const RepaintBoundary(child: MascotWalk(size: 32)),
                        ),
                      ],
                    );
                  },
                ),
              ),
            ),
            const SizedBox(width: 14),
            // Step counter chip
            Container(
              padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: stepColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(100),
              ),
              child: Text('$page/$totalSteps',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: stepColor)),
            ),
          ],
        ),
        const SizedBox(height: 12),
        TypingBubble(key: ValueKey(owlSays), text: owlSays),
      ],
    );
  }
}
