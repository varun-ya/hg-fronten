import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../theme.dart';

class StudentOnboardingScreen extends StatefulWidget {
  StudentOnboardingScreen({super.key});

  @override
  State<StudentOnboardingScreen> createState() => _StudentOnboardingScreenState();
}

class _StudentOnboardingScreenState extends State<StudentOnboardingScreen> {
  final _controller = PageController();
  int _page = 0;

  static final _steps = [
    _StepData(
      title: 'What do you want to learn?',
      subtitle: 'Pick subjects you\'re interested in',
      icon: Icons.menu_book_rounded,
      color: HG.blue,
    ),
    _StepData(
      title: 'What\'s your grade?',
      subtitle: 'So we can match the right content',
      icon: Icons.school_rounded,
      color: HG.purple,
    ),
    _StepData(
      title: 'Set your goals',
      subtitle: 'How many lessons per week?',
      icon: Icons.flag_rounded,
      color: HG.green,
    ),
    _StepData(
      title: 'Preferred language',
      subtitle: 'Learn in the language you\'re comfortable with',
      icon: Icons.translate_rounded,
      color: HG.orange,
    ),
    _StepData(
      title: 'When do you study?',
      subtitle: 'We\'ll remind you at the right time',
      icon: Icons.schedule_rounded,
      color: HG.amber,
    ),
    _StepData(
      title: 'Your learning style',
      subtitle: 'Visual, reading, or practice-based?',
      icon: Icons.psychology_rounded,
      color: HG.red,
    ),
    _StepData(
      title: 'You\'re all set!',
      subtitle: 'Let\'s start your learning journey',
      icon: Icons.rocket_launch_rounded,
      color: HG.blue,
    ),
  ];

  void _next() {
    HapticFeedback.mediumImpact();
    if (_page < _steps.length - 1) {
      _controller.nextPage(
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeOutCubic,
      );
    }
  }

  void _back() {
    HapticFeedback.lightImpact();
    if (_page > 0) {
      _controller.previousPage(
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeOutCubic,
      );
    } else {
      Navigator.pop(context);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final mq = MediaQuery.of(context);
    final pt = mq.padding.top;
    final pb = mq.padding.bottom;
    final short = mq.size.height < 600;

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.dark,
        statusBarBrightness: Brightness.light,
        systemNavigationBarColor: HG.white,
        systemNavigationBarIconBrightness: Brightness.dark,
      ),
      child: Scaffold(
        body: Column(
          children: [
            // Top bar
            Padding(
              padding: EdgeInsets.fromLTRB(20, pt + 12, 20, 0),
              child: Row(
                children: [
                  GestureDetector(
                    onTap: _back,
                    child: Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: HG.white,
                        borderRadius: BorderRadius.circular(HG.radius),
                        border: Border.all(color: HG.border),
                      ),
                      child: Icon(Icons.arrow_back_rounded, size: 18, color: HG.grey700),
                    ),
                  ),
                  const SizedBox(width: 16),
                  // Progress dots
                  Expanded(
                    child: Row(
                      children: List.generate(_steps.length, (i) {
                        return Expanded(
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 300),
                            curve: Curves.easeOutCubic,
                            height: 4,
                            margin: EdgeInsets.only(right: i < _steps.length - 1 ? 4 : 0),
                            decoration: BoxDecoration(
                              color: i <= _page ? HG.blue : HG.grey200,
                              borderRadius: BorderRadius.circular(2),
                            ),
                          ),
                        );
                      }),
                    ),
                  ),
                  const SizedBox(width: 16),
                  // Step counter
                  Text(
                    '${_page + 1}/${_steps.length}',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.textMuted),
                  ),
                ],
              ),
            ),

            SizedBox(height: short ? 16 : 28),

            // Card area with rotating page transition
            Expanded(
              child: Padding(
                padding: EdgeInsets.fromLTRB(16, 0, 16, 0),
                child: PageView.builder(
                  controller: _controller,
                  physics: const NeverScrollableScrollPhysics(),
                  onPageChanged: (i) => setState(() => _page = i),
                  itemCount: _steps.length,
                  itemBuilder: (context, index) {
                    return AnimatedBuilder(
                      animation: _controller,
                      builder: (context, child) {
                        double value = 0;
                        if (_controller.position.haveDimensions) {
                          value = index - (_controller.page ?? _controller.initialPage.toDouble());
                          value = value.clamp(-1.0, 1.0);
                        }
                        // Rotate out to the left, new card comes from right
                        final angle = value * math.pi / 6; // 30 degrees max
                        final opacity = (1 - value.abs()).clamp(0.0, 1.0);
                        final scale = 1.0 - (value.abs() * 0.1);

                        return Transform(
                          alignment: Alignment.bottomCenter,
                          transform: Matrix4.identity()
                            ..setEntry(3, 2, 0.001)
                            ..rotateZ(angle)
                            ..scaleByDouble(scale, scale, 1, 1),
                          child: Opacity(
                            opacity: opacity,
                            child: child,
                          ),
                        );
                      },
                      child: _StepCard(
                        step: _steps[index],
                        stepIndex: index,
                        isLast: index == _steps.length - 1,
                        pb: pb,
                        onNext: _next,
                      ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StepData {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color color;
  const _StepData({required this.title, required this.subtitle, required this.icon, required this.color});
}

class _StepCard extends StatelessWidget {
  final _StepData step;
  final int stepIndex;
  final bool isLast;
  final double pb;
  final VoidCallback onNext;

  const _StepCard({
    required this.step,
    required this.stepIndex,
    required this.isLast,
    required this.pb,
    required this.onNext,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFFAFAFA),
        border: Border.all(color: const Color(0xFFEBEBEB)),
        borderRadius: BorderRadius.circular(40),
      ),
      child: Column(
        children: [
          const Spacer(),
          // Icon
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              color: step.color.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Icon(step.icon, size: 40, color: step.color),
          ),
          const SizedBox(height: 28),
          // Title
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 32),
            child: Text(
              step.title,
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: HG.dark),
            ),
          ),
          const SizedBox(height: 10),
          // Subtitle
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 40),
            child: Text(
              step.subtitle,
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 14, color: HG.textMuted, height: 1.4),
            ),
          ),
          const Spacer(flex: 2),
          // Button
          Padding(
            padding: EdgeInsets.fromLTRB(24, 0, 24, pb + 24),
            child: GestureDetector(
              onTap: onNext,
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  color: step.color,
                  borderRadius: BorderRadius.circular(100),
                  boxShadow: [
                    BoxShadow(
                      color: step.color.withValues(alpha: 0.4),
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Center(
                  child: Text(
                    isLast ? 'Let\'s Go!' : 'Continue',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.white),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
