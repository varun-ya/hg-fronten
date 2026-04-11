import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class ProfileReviewsTab extends StatelessWidget {
  const ProfileReviewsTab({super.key});

  static const _reviews = [
    (name: 'Aarav Sharma', stars: 5, text: 'Absolutely brilliant teacher. He made quadratic equations feel like solving a puzzle. My son went from failing maths to scoring 92%. Cannot recommend enough.', time: '2 days ago', subject: 'Mathematics', helpful: 12),
    (name: 'Priya Patel', stars: 4, text: 'Very knowledgeable and patient. Explains physics concepts with real-world examples which makes it easy to remember. Only wish sessions were longer.', time: '1 week ago', subject: 'Physics', helpful: 8),
    (name: 'Rohan Gupta', stars: 5, text: 'Best maths tutor I have ever had. His Vedic maths tricks are amazing — I can do calculations 3x faster now. Worth every rupee.', time: '2 weeks ago', subject: 'Vedic Maths', helpful: 15),
    (name: 'Sneha Kapoor', stars: 5, text: 'Helped me prepare for JEE in just 3 months. His problem-solving approach is unique and very effective. Cleared JEE Mains with 98 percentile.', time: '1 month ago', subject: 'JEE Prep', helpful: 22),
    (name: 'Amit Desai', stars: 4, text: 'Good teacher with deep subject knowledge. Sometimes goes a bit fast but always willing to re-explain. My daughter improved significantly.', time: '1 month ago', subject: 'Mathematics', helpful: 6),
  ];

  @override
  Widget build(BuildContext context) {
    return ListView(padding: EdgeInsets.fromLTRB(16, 16, 16, 32), children: [
      // Rating summary card
      Card(
        elevation: 0, color: HG.grey50,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        child: Padding(
          padding: EdgeInsets.all(20),
          child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Column(children: [
              Text('4.8', style: TextStyle(fontSize: 48, fontWeight: FontWeight.w800, color: HG.dark, height: 1)),
              const SizedBox(height: 6),
              Row(children: List.generate(5, (i) => Padding(
                padding: EdgeInsets.only(right: 2),
                child: Icon(PhosphorIconsFill.star, size: 14, color: HG.amber),
              ))),
              const SizedBox(height: 4),
              Text('24 reviews', style: TextStyle(fontSize: 12, color: HG.textMuted)),
            ]),
            const SizedBox(width: 28),
            Expanded(child: Column(children: [
              _ratingBar(5, 18, 24),
              _ratingBar(4, 4, 24),
              _ratingBar(3, 1, 24),
              _ratingBar(2, 1, 24),
              _ratingBar(1, 0, 24),
            ])),
          ]),
        ),
      ),
      const SizedBox(height: 8),

      // Reviews
      ...List.generate(_reviews.length, (i) {
        final r = _reviews[i];
        return Column(children: [
          Padding(
            padding: EdgeInsets.symmetric(vertical: 16),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              // Author
              Row(children: [
                CircleAvatar(
                  radius: 20,
                  backgroundColor: HSLColor.fromAHSL(1, (i * 67.0) % 360, 0.35, 0.9).toColor(),
                  child: Text(r.name[0], style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HSLColor.fromAHSL(1, (i * 67.0) % 360, 0.5, 0.4).toColor())),
                ),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Text(r.name, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
                    const SizedBox(width: 6),
                    Icon(PhosphorIconsFill.sealCheck, size: 13, color: HG.green),
                  ]),
                  const SizedBox(height: 3),
                  Row(children: [
                    ...List.generate(5, (j) => Padding(
                      padding: EdgeInsets.only(right: 1),
                      child: Icon(j < r.stars ? PhosphorIconsFill.star : PhosphorIconsRegular.star, size: 13, color: HG.amber),
                    )),
                    const SizedBox(width: 8),
                    Text(r.time, style: TextStyle(fontSize: 11, color: HG.textLight)),
                  ]),
                ])),
              ]),
              const SizedBox(height: 12),
              // Subject chip
              Chip(
                label: Text(r.subject),
                labelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: HG.dark, fontFamily: HG.font),
                backgroundColor: HG.grey50,
                side: BorderSide.none,
                shape: const StadiumBorder(),
                visualDensity: VisualDensity.compact,
                materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
              const SizedBox(height: 10),
              // Text
              Text(r.text, style: TextStyle(fontSize: 14, color: HG.dark, height: 1.55)),
              const SizedBox(height: 12),
              // Actions
              Row(children: [
                TextButton.icon(
                  onPressed: () {},
                  icon: Icon(PhosphorIconsRegular.thumbsUp, size: 15, color: HG.textLight),
                  label: Text('Helpful (${r.helpful})', style: TextStyle(fontSize: 12, color: HG.textLight)),
                  style: TextButton.styleFrom(padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                ),
                const SizedBox(width: 16),
                IconButton(
                  onPressed: () {},
                  icon: Icon(PhosphorIconsRegular.flag, size: 14, color: HG.textLight),
                  style: IconButton.styleFrom(padding: EdgeInsets.zero, minimumSize: const Size(24, 24), tapTargetSize: MaterialTapTargetSize.shrinkWrap),
                ),
              ]),
            ]),
          ),
          if (i < _reviews.length - 1) Divider(height: 1),
        ]);
      }),
    ]);
  }

  static Widget _ratingBar(int star, int count, int total) {
    final pct = total > 0 ? count / total : 0.0;
    return Padding(
      padding: EdgeInsets.only(bottom: 6),
      child: Row(children: [
        SizedBox(width: 12, child: Text('$star', style: TextStyle(fontSize: 12, color: HG.textMuted))),
        const SizedBox(width: 6),
        Expanded(child: ClipRRect(
          borderRadius: BorderRadius.circular(3),
          child: LinearProgressIndicator(value: pct, minHeight: 6, backgroundColor: HG.grey200, color: HG.amber),
        )),
        const SizedBox(width: 8),
        SizedBox(width: 20, child: Text('$count', style: TextStyle(fontSize: 11, color: HG.textLight))),
      ]),
    );
  }
}
