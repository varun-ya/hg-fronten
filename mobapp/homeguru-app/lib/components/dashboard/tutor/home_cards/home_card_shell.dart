import 'package:flutter/material.dart';
import '../../../../theme.dart';

class HomeCardShell extends StatelessWidget {
  final Color color;
  final Widget child;
  const HomeCardShell({super.key, required this.color, required this.child});

  @override
  Widget build(BuildContext context) {
    final isDark = context.isDark;
    return Container(
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(28),
        border: isDark ? null : Border.all(color: HG.cardOnPowderBorder, width: 1),
        boxShadow: [
          if (!isDark) BoxShadow(color: Colors.black.withValues(alpha: 0.06), blurRadius: 24, offset: const Offset(0, 6)),
          if (!isDark) BoxShadow(color: Colors.black.withValues(alpha: 0.02), blurRadius: 4, offset: const Offset(0, 1)),
          if (isDark) BoxShadow(color: Colors.black.withValues(alpha: 0.12), blurRadius: 16, offset: const Offset(0, 4)),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      margin: EdgeInsets.zero,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
        child: child,
      ),
    );
  }
}
