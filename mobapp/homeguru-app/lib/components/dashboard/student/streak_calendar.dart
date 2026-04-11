import 'dart:math';
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class StreakCalendar extends StatelessWidget {
  const StreakCalendar({super.key});

  static const _days = 120;
  static final _data = _gen();

  static List<int> _gen() {
    return List.generate(_days, (i) {
      final day = DateTime.now().subtract(Duration(days: _days - 1 - i));
      final r = Random(day.year * 366 + day.month * 31 + day.day);
      if (day.weekday >= 6) return r.nextInt(2);
      if (i > 50) return r.nextInt(3) + 2;
      if (i > 30) return r.nextInt(4) + 1;
      return r.nextInt(4);
    });
  }

  static int get _streak { int s = 0; for (int i = _data.length - 1; i >= 0; i--) { if (_data[i] > 0) s++; else break; } return s; }
  static int get _active => _data.where((a) => a > 0).length;

  @override
  Widget build(BuildContext context) {
    final dark = context.isDark;
    final weeks = (_days / 7).ceil();

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      padding: EdgeInsets.fromLTRB(14, 12, 14, 12),
      decoration: BoxDecoration(
        color: dark ? const Color(0xFF161616) : Colors.white,
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: dark ? const Color(0xFF2C2C2C) : HG.grey200, width: 1.5),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        // Header
        Row(children: [
          Icon(PhosphorIconsFill.flame, size: 15, color: HG.orange),
          const SizedBox(width: 6),
          Text('$_streak day streak', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
          const Spacer(),
          Text('$_active/$_days days', style: TextStyle(fontSize: 10, color: HG.textLight)),
        ]),
        const SizedBox(height: 10),
        // Grid — fills width
        LayoutBuilder(builder: (_, box) {
          final gap = 2.0;
          final cellW = (box.maxWidth - (weeks - 1) * gap) / weeks;
          final cellH = cellW.clamp(0.0, 12.0);
          return Wrap(
            spacing: gap, runSpacing: gap,
            children: List.generate(weeks, (w) {
              return SizedBox(
                width: cellW,
                child: Column(children: List.generate(7, (d) {
                  final idx = w * 7 + d;
                  final level = idx < _days ? _data[idx] : -1;
                  return Container(
                    width: cellW, height: cellH,
                    margin: EdgeInsets.only(bottom: d < 6 ? gap : 0),
                    decoration: BoxDecoration(
                      color: level < 0 ? Colors.transparent : _c(level, dark),
                      borderRadius: BorderRadius.circular(2.5)),
                  );
                })),
              );
            }),
          );
        }),
        const SizedBox(height: 8),
        // Legend
        Row(children: [
          Text('Less', style: TextStyle(fontSize: 8, color: HG.textLight)),
          const SizedBox(width: 3),
          ...List.generate(5, (i) => Container(
            width: 8, height: 8, margin: EdgeInsets.symmetric(horizontal: 1),
            decoration: BoxDecoration(color: _c(i, dark), borderRadius: BorderRadius.circular(2)),
          )),
          const SizedBox(width: 3),
          Text('More', style: TextStyle(fontSize: 8, color: HG.textLight)),
        ]),
      ]),
    );
  }

  static Color _c(int l, bool d) {
    if (d) return const [Color(0xFF1A1A1A), Color(0xFF2E1B08), Color(0xFF4D2D0E), Color(0xFFB8691E), Color(0xFFE08A3C)][l.clamp(0, 4)];
    return const [Color(0xFFF0EEEB), Color(0xFFFFEDD5), Color(0xFFFFCF8A), Color(0xFFE8A45C), Color(0xFFE08A3C)][l.clamp(0, 4)];
  }
}
