import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../widgets/mascot_chill.dart';
import 'step_data.dart';

class StepCard extends StatelessWidget {
  final StepData step;
  final int stepIndex;
  final bool isLast;
  final double pb;
  final List<String> options;
  final String? titleOverride;
  final String? subtitleOverride;
  final int? selectedOption;
  final bool canContinue;
  final ValueChanged<int> onSelectOption;
  final VoidCallback onNext;

  const StepCard({
    super.key,
    required this.step, required this.stepIndex, required this.isLast,
    required this.pb, required this.options, this.titleOverride, this.subtitleOverride,
    required this.selectedOption, required this.canContinue,
    required this.onSelectOption, required this.onNext,
  });

  @override
  Widget build(BuildContext context) {
    final hasOptions = options.isNotEmpty;

    return Container(
      decoration: BoxDecoration(
        color: HG.white,
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: HG.grey200),
      ),
      child: Column(
        children: [
          const SizedBox(height: 28),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 28),
            child: Text(titleOverride ?? step.title, textAlign: TextAlign.center,
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
          ),
          const SizedBox(height: 6),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 32),
            child: Text(subtitleOverride ?? step.subtitle, textAlign: TextAlign.center,
              style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.4)),
          ),
          const SizedBox(height: 20),
          if (hasOptions)
            Expanded(
              child: ListView.separated(
                padding: EdgeInsets.symmetric(horizontal: 20),
                physics: const BouncingScrollPhysics(),
                itemCount: options.length,
                separatorBuilder: (_, __) => const SizedBox(height: 8),
                itemBuilder: (_, i) {
                  final isSelected = selectedOption == i;
                  final tonal = step.color.withValues(alpha: 0.08);
                  return GestureDetector(
                    onTap: () => onSelectOption(i),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 250),
                      curve: Curves.easeOutCubic,
                      padding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                      decoration: BoxDecoration(
                        color: isSelected ? tonal : HG.grey50,
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(
                          color: isSelected ? step.color.withValues(alpha: 0.4) : HG.grey200,
                          width: isSelected ? 1.5 : 1,
                        ),
                      ),
                      child: Row(
                        children: [
                          // Radio indicator
                          AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            width: 22, height: 22,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: isSelected ? step.color : Colors.transparent,
                              border: Border.all(
                                color: isSelected ? step.color : HG.grey300,
                                width: isSelected ? 0 : 2,
                              ),
                            ),
                            child: isSelected
                                ? Icon(PhosphorIconsBold.check, size: 13, color: HG.white)
                                : null,
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Text(options[i],
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                                color: isSelected ? step.color : HG.dark,
                              )),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            )
          else
            Expanded(
              child: Center(
                child: RepaintBoundary(
                  child: MascotChill(size: MediaQuery.of(context).size.height < 600 ? 120 : 160),
                ),
              ),
            ),
          // Continue button
          Padding(
            padding: EdgeInsets.fromLTRB(20, 12, 20, pb + 20),
            child: _M3StepButton(
              label: isLast ? 'Let\'s Go!' : 'Continue',
              color: step.color,
              enabled: canContinue,
              onTap: canContinue ? onNext : null,
            ),
          ),
        ],
      ),
    );
  }
}

class _M3StepButton extends StatefulWidget {
  final String label;
  final Color color;
  final bool enabled;
  final VoidCallback? onTap;
  const _M3StepButton({required this.label, required this.color, required this.enabled, this.onTap});
  @override
  State<_M3StepButton> createState() => _M3StepButtonState();
}

class _M3StepButtonState extends State<_M3StepButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: widget.enabled ? (_) => setState(() => _pressed = true) : null,
      onTapUp: widget.enabled ? (_) { setState(() => _pressed = false); widget.onTap?.call(); } : null,
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.97 : 1.0,
        duration: const Duration(milliseconds: 120),
        curve: Curves.easeOut,
        child: AnimatedOpacity(
          duration: const Duration(milliseconds: 250),
          opacity: widget.enabled ? 1.0 : 0.35,
          child: Container(
            width: double.infinity,
            height: 56,
            decoration: BoxDecoration(
              color: widget.color,
              borderRadius: BorderRadius.circular(100),
              boxShadow: widget.enabled ? [
                BoxShadow(color: widget.color.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)),
                BoxShadow(color: widget.color.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1)),
              ] : null,
            ),
            child: Center(
              child: Text(widget.label, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white, letterSpacing: 0.1)),
            ),
          ),
        ),
      ),
    );
  }
}