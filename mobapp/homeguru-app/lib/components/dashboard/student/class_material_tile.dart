import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class SharedMaterial {
  final String title, tutor, subject, type;
  final IconData icon;
  final Color color;
  final String time;
  const SharedMaterial({required this.title, required this.tutor, required this.subject, required this.type, required this.icon, required this.color, required this.time});
}

final todayMaterials = [
  SharedMaterial(title: 'JEE Prep — Chapter 5 Notes', tutor: 'Kavya Singh', subject: 'JEE Prep', type: 'PDF', icon: PhosphorIconsFill.filePdf, color: Color(0xFFE85060), time: '8:55 AM'),
  SharedMaterial(title: 'Quadratic Equations Worksheet', tutor: 'Aarav Sharma', subject: 'Mathematics', type: 'PDF', icon: PhosphorIconsFill.filePdf, color: Color(0xFF4A7CF5), time: '10:50 AM'),
  SharedMaterial(title: 'Newton\'s Laws — Video Explanation', tutor: 'Priya Patel', subject: 'Physics', type: 'Video', icon: PhosphorIconsFill.videoCamera, color: Color(0xFF8B5CF6), time: '12:25 PM'),
  SharedMaterial(title: 'Organic Chemistry Formulas', tutor: 'Rohan Gupta', subject: 'Chemistry', type: 'Image', icon: PhosphorIconsFill.image, color: Color(0xFF22C55E), time: '2:50 PM'),
  SharedMaterial(title: 'Essay Writing Tips & Template', tutor: 'Meera Iyer', subject: 'English', type: 'Doc', icon: PhosphorIconsFill.fileDoc, color: Color(0xFFE08A3C), time: '3:45 PM'),
];

class ClassMaterialTile extends StatelessWidget {
  final SharedMaterial material;
  const ClassMaterialTile({super.key, required this.material});

  @override
  Widget build(BuildContext context) {
    final dark = context.isDark;
    return GestureDetector(
      onTap: () => HapticFeedback.lightImpact(),
      child: Container(
        margin: EdgeInsets.fromLTRB(16, 0, 16, 8),
        padding: EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: dark ? const Color(0xFF161616) : Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: dark ? const Color(0xFF2C2C2C) : HG.grey200, width: 1),
        ),
        child: Row(children: [
          // File icon
          Container(
            width: 42, height: 42,
            decoration: BoxDecoration(
              color: material.color.withValues(alpha: 0.08),
              borderRadius: BorderRadius.circular(12)),
            child: Icon(material.icon, size: 20, color: material.color),
          ),
          const SizedBox(width: 12),
          // Info
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(material.title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark), maxLines: 1, overflow: TextOverflow.ellipsis),
            const SizedBox(height: 3),
            Row(children: [
              Text(material.tutor, style: TextStyle(fontSize: 11, color: HG.textMuted)),
              Text('  ·  ', style: TextStyle(fontSize: 11, color: HG.textLight)),
              Text(material.time, style: TextStyle(fontSize: 11, color: HG.textLight)),
            ]),
          ])),
          const SizedBox(width: 8),
          // Type badge + download
          Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
            Container(
              padding: EdgeInsets.symmetric(horizontal: 7, vertical: 2),
              decoration: BoxDecoration(color: material.color.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(100)),
              child: Text(material.type, style: TextStyle(fontSize: 9, fontWeight: FontWeight.w600, color: material.color)),
            ),
            const SizedBox(height: 6),
            Icon(PhosphorIconsRegular.downloadSimple, size: 16, color: HG.textLight),
          ]),
        ]),
      ),
    );
  }
}
