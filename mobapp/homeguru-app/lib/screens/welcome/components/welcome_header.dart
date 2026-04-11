import 'package:flutter/material.dart';
import '../../../theme.dart';
import 'step_data.dart';
import 'role_toggle.dart';

class WelcomeHeader extends StatelessWidget {
  final String roleLabel;
  final Color roleColor;
  final Role selected;
  final bool short;
  final GlobalKey? roleToggleKey;
  final VoidCallback onSelectLearner;
  final VoidCallback onSelectTutor;

  const WelcomeHeader({
    super.key, required this.roleLabel, required this.roleColor, required this.selected,
    required this.short, this.roleToggleKey, required this.onSelectLearner, required this.onSelectTutor,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Brand logo
        Image.asset('assets/profileHeader.png', height: 22),
        SizedBox(height: short ? 16 : 24),
        // Headline
        RichText(
          textAlign: TextAlign.center,
          text: TextSpan(
            style: TextStyle(fontFamily: HG.font, fontSize: short ? 30 : 36, fontWeight: FontWeight.w800, color: HG.dark, height: 1.15, letterSpacing: -0.5),
            children: [
              const TextSpan(text: 'I want to '),
              TextSpan(text: roleLabel, style: TextStyle(color: roleColor)),
            ],
          ),
        ),
        SizedBox(height: short ? 14 : 20),
        // Toggle
        RoleToggle(key: roleToggleKey, selected: selected, onSelectLearner: onSelectLearner, onSelectTutor: onSelectTutor),
      ],
    );
  }
}
