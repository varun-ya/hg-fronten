import 'package:flutter/material.dart';
import '../../../../theme.dart';

class HomeCardHelpers {
  static String fmtTime(DateTime now) {
    final h = (now.minute + 10 >= 60 ? now.hour + 1 : now.hour) % 24;
    final m = (now.minute + 10) % 60;
    final sh = h % 12 == 0 ? 12 : h % 12;
    return '$sh:${m.toString().padLeft(2, '0')} ${h < 12 ? 'AM' : 'PM'}';
  }

  static Widget statRow(String label, String val) => Row(children: [
    Expanded(child: Text(label, style: TextStyle(fontSize: 12, color: HG.textMuted))),
    Text(val, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.dark)),
  ]);

  static Widget kvRow(String label, String val, String sub) => Row(children: [
    Expanded(child: Text(label, style: TextStyle(fontSize: 13, color: HG.textMuted))),
    Text(val, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
    const SizedBox(width: 8),
    SizedBox(width: 75, child: Text(sub, style: TextStyle(fontSize: 11, color: HG.textLight), textAlign: TextAlign.right)),
  ]);

  /// Standard inner card decoration for cards sitting on powder backgrounds.
  static ShapeDecoration innerCardDeco({double radius = 14}) => ShapeDecoration(
    color: HG.cardOnPowder,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(radius),
      side: BorderSide(color: HG.cardOnPowderBorder, width: 1),
    ),
    shadows: _isDarkMode
        ? null
        : [BoxShadow(color: Colors.black.withValues(alpha: 0.03), blurRadius: 6, offset: const Offset(0, 2))],
  );

  static bool get _isDarkMode => HG.surface == const Color(0xFF000000);
}
