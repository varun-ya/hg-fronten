import 'package:flutter/material.dart';
import 'dart:ui' as ui;
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/tutor_data.dart';
import '../../../screens/booking/book_demo_page.dart';
import '../shared/profile_tab.dart';

class SuggestedTutorCard extends StatelessWidget {
  final String name, subject, imageUrl;
  final double rating;
  final int price, students;
  final Color color;
  const SuggestedTutorCard({
    super.key,
    required this.name,
    required this.subject,
    required this.rating,
    required this.price,
    required this.students,
    required this.imageUrl,
    required this.color,
  });

  void _openProfile(BuildContext context) {
    HapticFeedback.lightImpact();
    final data = TutorData()
      ..name = name
      ..bio = subject
      ..subjects.clear()
      ..subjects.addAll(subject.split('\u00b7').map((s) => s.trim()).where((s) => s.isNotEmpty));
    Navigator.push(context, PageRouteBuilder(
      pageBuilder: (_, __, ___) => ProfileTab(data: data, initialVisitorMode: true),
      transitionDuration: const Duration(milliseconds: 300),
      reverseTransitionDuration: const Duration(milliseconds: 250),
      transitionsBuilder: (_, a, __, c) => SlideTransition(
        position: Tween(begin: const Offset(0, 1), end: Offset.zero).animate(
          CurvedAnimation(parent: a, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)), child: c),
    ));
  }

  void _openBookDemo(BuildContext context) {
    HapticFeedback.mediumImpact();
    Navigator.push(context, MaterialPageRoute(builder: (_) => BookDemoPage(
      tutorName: name, tutorSubject: subject, tutorAvatar: name[0],
      tutorRating: rating, tutorPrice: price, tutorStudents: students)));
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => _openProfile(context),
      child: Container(
        width: 170,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(28),
          color: const Color(0xFF111111),
          border: Border.all(color: context.isDark ? const Color(0xFF2C2C2C) : HG.grey200, width: 1.5),
        ),
        clipBehavior: Clip.antiAlias,
        child: Stack(children: [
          Positioned.fill(
            child: Image.network(imageUrl, fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(color: color.withValues(alpha: 0.15))),
          ),
          Positioned.fill(
            top: null,
            child: ClipRRect(
              borderRadius: BorderRadius.vertical(bottom: Radius.circular(28)),
              child: SizedBox(
                height: 110,
                child: BackdropFilter(
                  filter: ui.ImageFilter.blur(sigmaX: 6, sigmaY: 6),
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter, end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withValues(alpha: 0.0),
                          Colors.black.withValues(alpha: 0.15),
                          Colors.black.withValues(alpha: 0.5),
                          Colors.black.withValues(alpha: 0.85),
                        ],
                        stops: const [0.0, 0.25, 0.55, 1.0],
                      )),
                  ),
                ),
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(12),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8)),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Text('\u20b9$price', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: const Color(0xFF111111))),
                  Text('/hr', style: TextStyle(fontSize: 8, color: const Color(0xFF888888))),
                ]),
              ),
              const Spacer(),
              Text(name, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Colors.white, height: 1.15)),
              const SizedBox(height: 3),
              Row(children: [
                Flexible(child: Text(subject, style: TextStyle(fontSize: 10, color: Colors.white.withValues(alpha: 0.55)), maxLines: 1, overflow: TextOverflow.ellipsis)),
                const SizedBox(width: 6),
                Icon(PhosphorIconsFill.star, size: 9, color: const Color(0xFFFBBF24)),
                const SizedBox(width: 2),
                Text('$rating', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: Colors.white.withValues(alpha: 0.8))),
              ]),
              const SizedBox(height: 10),
              GestureDetector(
                onTap: () => _openBookDemo(context),
                child: Container(
                  width: double.infinity,
                  padding: EdgeInsets.symmetric(vertical: 9),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
                  child: Center(child: Text('Book Trial', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: const Color(0xFF111111)))),
                ),
              ),
            ]),
          ),
        ]),
      ),
    );
  }
}
