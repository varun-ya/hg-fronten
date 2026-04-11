import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../widgets/mascot_note.dart';
import '../../../widgets/mascot_teach.dart';
import 'step_data.dart';

class WelcomeCard extends StatelessWidget {
  final Role selected;
  final bool short;
  final double pb;
  final VoidCallback onGetStarted;
  final VoidCallback onLogin;
  final GlobalKey? mascotKey;
  final GlobalKey? getStartedKey;
  final GlobalKey? loginKey;

  const WelcomeCard({super.key, required this.selected, required this.short, required this.pb, required this.onGetStarted, required this.onLogin, this.mascotKey, this.getStartedKey, this.loginKey});

  @override
  Widget build(BuildContext context) {
    final isLearner = selected == Role.learner;
    final accent = isLearner ? HG.blue : HG.orange;
    final powder = isLearner ? HG.powderBlue : HG.powderOrange;

    return ClipRRect(
      borderRadius: BorderRadius.circular(32),
      child: Container(
        decoration: BoxDecoration(
          color: powder,
          borderRadius: BorderRadius.circular(32),
        ),
        child: Column(
          children: [
            // Hero — mascot area
            Expanded(
              child: Stack(
                children: [
                  // Decorative circles — clipped by parent ClipRRect
                  Positioned(
                    top: -40, right: -40,
                    child: Container(
                      width: 150, height: 150,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: accent.withValues(alpha: 0.06),
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 20, left: -30,
                    child: Container(
                      width: 100, height: 100,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: accent.withValues(alpha: 0.05),
                      ),
                    ),
                  ),
                  // Mascot
                  Center(
                    child: RepaintBoundary(
                      child: Container(
                        key: mascotKey,
                        child: AnimatedSwitcher(
                          duration: const Duration(milliseconds: 400),
                          switchInCurve: Curves.easeOutCubic,
                          switchOutCurve: Curves.easeInCubic,
                          child: isLearner
                              ? MascotNote(key: const ValueKey('note'), size: short ? 140 : 180)
                              : MascotTeach(key: const ValueKey('teach'), size: short ? 140 : 180),
                        ),
                      ),
                    ),
                  ),
                  // Feature pills at bottom
                  Positioned(
                    left: 14, right: 14, bottom: 14,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _featurePill(PhosphorIconsFill.videoCamera, isLearner ? '1-on-1 Live' : 'Teach Live', accent),
                        const SizedBox(width: 6),
                        _featurePill(PhosphorIconsFill.chalkboardTeacher, isLearner ? 'Expert Tutors' : 'Earn Money', accent),
                        const SizedBox(width: 6),
                        _featurePill(PhosphorIconsFill.star, isLearner ? 'Personalised' : 'Flexible Hours', accent),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            // Buttons area — white bottom section
            Container(
              padding: EdgeInsets.fromLTRB(20, 20, 20, pb + 20),
              decoration: BoxDecoration(
                color: HG.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: Column(
                children: [
                  Container(key: getStartedKey, child: _M3FilledButton(label: 'Get Started', color: accent, onTap: onGetStarted)),
                  const SizedBox(height: 10),
                  Container(key: loginKey, child: _M3TonalButton(label: 'Log in', onTap: onLogin)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _featurePill(IconData icon, String label, Color accent) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: HG.white.withValues(alpha: 0.85),
        borderRadius: BorderRadius.circular(100),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: accent),
          const SizedBox(width: 5),
          Text(label, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: accent)),
        ],
      ),
    );
  }
}

// ── M3 Filled Button ──
class _M3FilledButton extends StatefulWidget {
  final String label;
  final Color color;
  final VoidCallback onTap;
  const _M3FilledButton({required this.label, required this.color, required this.onTap});
  @override
  State<_M3FilledButton> createState() => _M3FilledButtonState();
}

class _M3FilledButtonState extends State<_M3FilledButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => _pressed = true),
      onTapUp: (_) { setState(() => _pressed = false); widget.onTap(); },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.97 : 1.0,
        duration: const Duration(milliseconds: 120),
        curve: Curves.easeOut,
        child: Container(
          width: double.infinity,
          height: 56,
          decoration: BoxDecoration(
            color: widget.color,
            borderRadius: BorderRadius.circular(100),
            boxShadow: [
              BoxShadow(color: widget.color.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)),
              BoxShadow(color: widget.color.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1)),
            ],
          ),
          child: Center(
            child: Text(widget.label, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white, letterSpacing: 0.1)),
          ),
        ),
      ),
    );
  }
}

// ── M3 Tonal Button ──
class _M3TonalButton extends StatefulWidget {
  final String label;
  final VoidCallback onTap;
  const _M3TonalButton({required this.label, required this.onTap});
  @override
  State<_M3TonalButton> createState() => _M3TonalButtonState();
}

class _M3TonalButtonState extends State<_M3TonalButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => _pressed = true),
      onTapUp: (_) { setState(() => _pressed = false); widget.onTap(); },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.97 : 1.0,
        duration: const Duration(milliseconds: 120),
        curve: Curves.easeOut,
        child: Container(
          width: double.infinity,
          height: 56,
          decoration: BoxDecoration(
            color: HG.grey100,
            borderRadius: BorderRadius.circular(100),
          ),
          child: Center(
            child: Text(widget.label, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.dark, letterSpacing: 0.1)),
          ),
        ),
      ),
    );
  }
}
