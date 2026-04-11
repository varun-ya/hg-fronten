import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../../theme.dart';

class ContinueLearning extends StatelessWidget {
  const ContinueLearning({super.key});

  static const _items = [
    ('Mathematics', 'Chapter 5: Quadratics', 0.65, Color(0xFF3B82F6)),
    ('Physics', 'Newton\'s Laws', 0.40, Color(0xFF8B5CF6)),
    ('English', 'Essay Writing', 0.80, Color(0xFF22C55E)),
    ('Chemistry', 'Organic Basics', 0.25, HG.orange),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text('Continue Learning', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
      const SizedBox(height: 12),
      SizedBox(
        height: 140,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          physics: const BouncingScrollPhysics(),
          itemCount: _items.length,
          separatorBuilder: (_, __) => const SizedBox(width: 10),
          itemBuilder: (_, i) {
            final item = _items[i];
            return Container(
              width: 150,
              padding: EdgeInsets.all(14),
              decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.border)),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Container(
                  width: 32, height: 32,
                  decoration: BoxDecoration(color: item.$4.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(8)),
                  child: Icon(PhosphorIconsFill.bookOpen, size: 16, color: item.$4),
                ),
                const Spacer(),
                Text(item.$1, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark)),
                const SizedBox(height: 2),
                Text(item.$2, style: TextStyle(fontSize: 11, color: HG.textMuted), maxLines: 1, overflow: TextOverflow.ellipsis),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(3),
                  child: LinearProgressIndicator(value: item.$3, minHeight: 4, backgroundColor: HG.grey100, color: item.$4),
                ),
              ]),
            );
          },
        ),
      ),
    ]);
  }
}
