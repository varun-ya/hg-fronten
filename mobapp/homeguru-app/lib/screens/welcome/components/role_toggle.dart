import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import 'step_data.dart';

class RoleToggle extends StatelessWidget {
  final Role selected;
  final VoidCallback onSelectLearner;
  final VoidCallback onSelectTutor;

  const RoleToggle({super.key, required this.selected, required this.onSelectLearner, required this.onSelectTutor});

  @override
  Widget build(BuildContext context) {
    final isLearner = selected == Role.learner;
    return Center(
      child: Container(
        decoration: BoxDecoration(
          color: HG.grey100,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: HG.grey200, width: 1),
        ),
        padding: EdgeInsets.all(4),
        child: IntrinsicWidth(
          child: Stack(
            children: [
              // Sliding indicator
              AnimatedAlign(
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeOutCubic,
                alignment: isLearner ? Alignment.centerLeft : Alignment.centerRight,
                child: FractionallySizedBox(
                  widthFactor: 0.5,
                  child: Container(
                    height: 40,
                    decoration: BoxDecoration(
                      color: HG.white,
                      borderRadius: BorderRadius.circular(11),
                      boxShadow: [
                        BoxShadow(color: Colors.black.withValues(alpha: 0.06), blurRadius: 8, offset: const Offset(0, 2)),
                      ],
                    ),
                  ),
                ),
              ),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  _Segment(
                    icon: PhosphorIconsBold.graduationCap,
                    text: 'Learner',
                    active: isLearner,
                    color: HG.blue,
                    onTap: onSelectLearner,
                  ),
                  _Segment(
                    icon: PhosphorIconsBold.chalkboardTeacher,
                    text: 'Tutor',
                    active: !isLearner,
                    color: HG.orange,
                    onTap: onSelectTutor,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Segment extends StatelessWidget {
  final IconData icon;
  final String text;
  final bool active;
  final Color color;
  final VoidCallback onTap;
  const _Segment({required this.icon, required this.text, required this.active, required this.color, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: 40,
        padding: EdgeInsets.symmetric(horizontal: 24),
        alignment: Alignment.center,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            AnimatedSwitcher(
              duration: const Duration(milliseconds: 200),
              child: Icon(icon, key: ValueKey('$text$active'), size: 16,
                color: active ? color : HG.grey500),
            ),
            const SizedBox(width: 7),
            AnimatedDefaultTextStyle(
              duration: const Duration(milliseconds: 250),
              style: TextStyle(
                fontFamily: HG.font,
                fontSize: 14,
                fontWeight: active ? FontWeight.w700 : FontWeight.w500,
                color: active ? color : HG.grey500,
              ),
              child: Text(text),
            ),
          ],
        ),
      ),
    );
  }
}
