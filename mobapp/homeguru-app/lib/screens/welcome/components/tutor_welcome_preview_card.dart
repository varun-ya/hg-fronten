import 'dart:async';
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../widgets/mascot_teach.dart';

class TutorWelcomePreviewCard extends StatefulWidget {
  final double pb;
  final VoidCallback onNext;
  const TutorWelcomePreviewCard({super.key, required this.pb, required this.onNext});

  @override
  State<TutorWelcomePreviewCard> createState() => _TutorWelcomePreviewCardState();
}

class _TutorWelcomePreviewCardState extends State<TutorWelcomePreviewCard> with TickerProviderStateMixin {
  int _doneIdx = -1;
  int _loadingIdx = -1;
  late final List<AnimationController> _checkCtrls;
  late final List<Animation<double>> _checkAnims;

  static const _steps = [
    ('Subjects & Skills', 'Tell us what you can teach'),
    ('Qualification Test', 'Quick assessment of your skills'),
    ('Listing Fee', 'Annual fee to stay listed'),
    ('ID Verification', 'Upload a government-issued ID'),
    ('Go Live', 'Start getting students instantly'),
  ];

  @override
  void initState() {
    super.initState();
    _checkCtrls = List.generate(_steps.length, (_) =>
      AnimationController(vsync: this, duration: const Duration(milliseconds: 500)));
    _checkAnims = _checkCtrls.map((c) =>
      CurvedAnimation(parent: c, curve: Curves.elasticOut)).toList();

    for (int i = 0; i < _steps.length; i++) {
      // start loading
      Timer(Duration(milliseconds: 300 + i * 700), () {
        if (!mounted) return;
        setState(() => _loadingIdx = i);
      });
      // done + play check animation
      Timer(Duration(milliseconds: 300 + i * 700 + 450), () {
        if (!mounted) return;
        setState(() { _doneIdx = i; _loadingIdx = -1; });
        _checkCtrls[i].forward();
      });
    }
  }

  @override
  void dispose() {
    for (final c in _checkCtrls) c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final short = MediaQuery.of(context).size.height < 650;

    return Container(
        decoration: BoxDecoration(
          color: HG.white,
          border: Border.all(color: HG.grey200),
          borderRadius: BorderRadius.circular(28),
        ),
        child: Column(children: [
            SizedBox(height: short ? 20 : 28),

            if (!short) ...[
              RepaintBoundary(child: MascotTeach(size: 56)),
              const SizedBox(height: 12),
            ],

            Padding(
              padding: EdgeInsets.symmetric(horizontal: 28),
              child: RichText(textAlign: TextAlign.center, text: TextSpan(
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3, fontFamily: HG.font, height: 1.3),
                children: [
                  TextSpan(text: 'Your journey to\nbecoming a '),
                  TextSpan(text: 'HomeGuru', style: TextStyle(color: HG.orange)),
                ],
              )),
            ),
            const SizedBox(height: 6),
            Text('5 simple steps. Takes about 10 minutes.', style: TextStyle(fontSize: 13, color: HG.textMuted)),
            SizedBox(height: short ? 16 : 28),

            // Timeline
            Expanded(child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 28),
              child: ListView.builder(
                physics: const NeverScrollableScrollPhysics(),
                padding: EdgeInsets.zero,
                itemCount: _steps.length,
                itemBuilder: (_, i) {
                  final s = _steps[i];
                  final isDone = i <= _doneIdx;
                  final isLoading = i == _loadingIdx;
                  final isLast = i == _steps.length - 1;

                  return IntrinsicHeight(child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Left: number/check + line
                      SizedBox(width: 36, child: Column(children: [
                        _buildIndicator(i, isDone, isLoading),
                        if (!isLast)
                          Expanded(child: Container(
                            width: 1.5, margin: EdgeInsets.symmetric(vertical: 3),
                            color: isDone ? HG.dark.withValues(alpha: 0.15) : HG.grey200,
                          )),
                      ])),
                      const SizedBox(width: 14),

                      // Right: text
                      Expanded(child: AnimatedOpacity(
                        duration: const Duration(milliseconds: 400),
                        opacity: isDone ? 1.0 : isLoading ? 0.7 : 0.3,
                        child: Padding(
                          padding: EdgeInsets.only(bottom: isLast ? 0 : 14, top: 4),
                          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            Text(s.$1, style: TextStyle(
                              fontSize: 15, fontWeight: FontWeight.w600,
                              color: isDone ? HG.dark : HG.grey500,
                            )),
                            const SizedBox(height: 2),
                            Text(s.$2, style: TextStyle(
                              fontSize: 12, color: isDone ? HG.textMuted : HG.grey300,
                            )),
                          ]),
                        ),
                      )),
                    ],
                  ));
                },
              ),
            )),

            // Button
            Padding(
              padding: EdgeInsets.fromLTRB(24, 8, 24, widget.pb + 24),
              child: GestureDetector(
                onTap: widget.onNext,
                child: Container(
                  width: double.infinity,
                  padding: EdgeInsets.symmetric(vertical: 16),
                  decoration: BoxDecoration(
                    color: HG.dark,
                    borderRadius: BorderRadius.circular(100),
                    boxShadow: [BoxShadow(color: HG.dark.withValues(alpha: 0.2), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.dark.withValues(alpha: 0.1), blurRadius: 4, offset: const Offset(0, 1))],
                  ),
                  child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                    Text("Let's Begin", style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white)),
                    const SizedBox(width: 8),
                    Icon(PhosphorIconsBold.arrowRight, size: 16, color: HG.white),
                  ]),
                ),
              ),
            ),
          ]),
    );
  }

  Widget _buildIndicator(int i, bool isDone, bool isLoading) {
    return Container(
      width: 32, height: 32,
      decoration: BoxDecoration(
        color: isDone ? HG.dark : isLoading ? HG.grey100 : HG.white,
        shape: BoxShape.circle,
        border: Border.all(
          color: isDone ? HG.dark : isLoading ? HG.grey300 : HG.grey200,
          width: 1.5,
        ),
      ),
      child: Center(
        child: isDone
            ? ScaleTransition(
                scale: _checkAnims[i],
                child: Icon(Icons.check_rounded, size: 16, color: HG.white),
              )
            : isLoading
                ? SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 1.5, color: HG.grey500))
                : Text('${i + 1}', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.grey300)),
      ),
    );
  }
}
