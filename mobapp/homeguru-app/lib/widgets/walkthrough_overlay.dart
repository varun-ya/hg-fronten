import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../theme.dart';

class WalkthroughStep {
  final GlobalKey targetKey;
  final String title;
  final String description;
  final IconData? icon;
  final bool above;
  final VoidCallback? onShow; // called when this step becomes active
  const WalkthroughStep({required this.targetKey, required this.title, required this.description, this.icon, this.above = false, this.onShow});
}

class WalkthroughOverlay extends StatefulWidget {
  final List<WalkthroughStep> steps;
  final VoidCallback onComplete;
  const WalkthroughOverlay({super.key, required this.steps, required this.onComplete});

  @override
  State<WalkthroughOverlay> createState() => _WalkthroughOverlayState();
}

class _WalkthroughOverlayState extends State<WalkthroughOverlay> with TickerProviderStateMixin {
  int _current = 0;
  Rect _spotFrom = Rect.zero;
  Rect _spotTo = Rect.zero;
  bool _visible = false;

  late final AnimationController _enterCtrl;
  late final Animation<double> _enterFade;

  late final AnimationController _spotCtrl;
  late final Animation<double> _spotAnim;

  late final AnimationController _tooltipCtrl;
  late final Animation<double> _tooltipFade;
  late final Animation<Offset> _tooltipSlide;

  late final AnimationController _pulseCtrl;
  late final Animation<double> _pulseAnim;

  @override
  void initState() {
    super.initState();
    // Overlay fade in
    _enterCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 400));
    _enterFade = CurvedAnimation(parent: _enterCtrl, curve: Curves.easeOut);

    // Spotlight move
    _spotCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 450));
    _spotAnim = CurvedAnimation(parent: _spotCtrl, curve: Curves.easeInOutCubic);

    // Tooltip appear
    _tooltipCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 350));
    _tooltipFade = CurvedAnimation(parent: _tooltipCtrl, curve: Curves.easeOut);
    _tooltipSlide = Tween(begin: const Offset(0, 0.15), end: Offset.zero).animate(CurvedAnimation(parent: _tooltipCtrl, curve: Curves.easeOutCubic));

    // Pulse ring
    _pulseCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 1500))..repeat(reverse: true);
    _pulseAnim = Tween(begin: 0.0, end: 1.0).animate(CurvedAnimation(parent: _pulseCtrl, curve: Curves.easeInOut));

    WidgetsBinding.instance.addPostFrameCallback((_) => _showStep(initial: true));
  }

  @override
  void dispose() {
    _enterCtrl.dispose();
    _spotCtrl.dispose();
    _tooltipCtrl.dispose();
    _pulseCtrl.dispose();
    super.dispose();
  }

  Rect? _getRect(int index) {
    final ctx = widget.steps[index].targetKey.currentContext;
    if (ctx == null) return null;
    final box = ctx.findRenderObject() as RenderBox;
    final pos = box.localToGlobal(Offset.zero);
    return Rect.fromLTWH(pos.dx, pos.dy, box.size.width, box.size.height).inflate(10);
  }

  void _showStep({bool initial = false}) {
    final step = widget.steps[_current];
    // Fire onShow callback before measuring (so the UI can update)
    step.onShow?.call();

    // Delay a frame to let any UI changes from onShow settle
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final rect = _getRect(_current);
      if (rect == null) return;

      _tooltipCtrl.reset();

      if (initial) {
        _spotFrom = rect;
        _spotTo = rect;
        _spotCtrl.value = 1;
        setState(() => _visible = true);
        _enterCtrl.forward();
        Future.delayed(const Duration(milliseconds: 200), () {
          if (mounted) _tooltipCtrl.forward();
        });
      } else {
        _spotFrom = _spotTo;
        _spotTo = rect;
        _spotCtrl.forward(from: 0);
        Future.delayed(const Duration(milliseconds: 250), () {
          if (mounted) _tooltipCtrl.forward();
        });
      }
    });
  }

  void _next() {
    HapticFeedback.mediumImpact();
    if (_current < widget.steps.length - 1) {
      _tooltipCtrl.reverse().then((_) {
        if (!mounted) return;
        setState(() => _current++);
        WidgetsBinding.instance.addPostFrameCallback((_) => _showStep());
      });
    } else {
      _dismiss();
    }
  }

  void _dismiss() {
    HapticFeedback.lightImpact();
    _tooltipCtrl.reverse();
    _enterCtrl.reverse().then((_) {
      if (mounted) widget.onComplete();
    });
  }

  Rect get _currentSpot => Rect.lerp(_spotFrom, _spotTo, _spotAnim.value) ?? _spotTo;

  @override
  Widget build(BuildContext context) {
    if (!_visible) return const SizedBox();
    final step = widget.steps[_current];
    final size = MediaQuery.of(context).size;
    final isLast = _current == widget.steps.length - 1;

    return FadeTransition(
      opacity: _enterFade,
      child: Material(
        color: Colors.transparent,
        child: GestureDetector(
          onTap: _next,
          behavior: HitTestBehavior.opaque,
          child: AnimatedBuilder(
            animation: Listenable.merge([_spotAnim, _pulseAnim]),
            builder: (context, _) {
              final spot = _currentSpot;
              return Stack(children: [
                // Overlay + spotlight
                CustomPaint(size: size, painter: _SpotlightPainter(spot: spot)),

                // Pulse ring
                Positioned.fromRect(
                  rect: spot.inflate(4 + _pulseAnim.value * 6),
                  child: IgnorePointer(
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: Colors.white.withValues(alpha: 0.25 + _pulseAnim.value * 0.15),
                          width: 2,
                        ),
                      ),
                    ),
                  ),
                ),

                // Tooltip
                Positioned(
                  left: 20, right: 20,
                  top: step.above ? null : spot.bottom + 20,
                  bottom: step.above ? size.height - spot.top + 20 : null,
                  child: SlideTransition(
                    position: _tooltipSlide,
                    child: FadeTransition(
                      opacity: _tooltipFade,
                      child: _tooltip(step, isLast),
                    ),
                  ),
                ),

                // Skip
                if (!isLast) Positioned(
                  top: MediaQuery.of(context).padding.top + 12,
                  right: 20,
                  child: FadeTransition(
                    opacity: _tooltipFade,
                    child: GestureDetector(
                      onTap: _dismiss,
                      child: Container(
                        padding: EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.12),
                          borderRadius: BorderRadius.circular(100),
                        ),
                        child: Text('Skip', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Colors.white)),
                      ),
                    ),
                  ),
                ),

                // Dots
                Positioned(
                  bottom: MediaQuery.of(context).padding.bottom + 20,
                  left: 0, right: 0,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(widget.steps.length, (i) => AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      curve: Curves.easeOutCubic,
                      width: i == _current ? 22 : 6, height: 6,
                      margin: EdgeInsets.symmetric(horizontal: 3),
                      decoration: BoxDecoration(
                        color: i == _current ? Colors.white : Colors.white.withValues(alpha: 0.25),
                        borderRadius: BorderRadius.circular(3),
                      ),
                    )),
                  ),
                ),
              ]);
            },
          ),
        ),
      ),
    );
  }

  Widget _tooltip(WalkthroughStep step, bool isLast) {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: HG.fixedWhite,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.12), blurRadius: 24, offset: const Offset(0, 8)),
          BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 4, offset: const Offset(0, 1)),
        ],
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
        if (step.icon != null) ...[
          Container(
            width: 38, height: 38,
            decoration: BoxDecoration(color: HG.fixedBlue.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(11)),
            child: Icon(step.icon!, size: 18, color: HG.fixedBlue),
          ),
          const SizedBox(height: 14),
        ],
        Text(step.title, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: HG.fixedDark, height: 1.2, letterSpacing: -0.2)),
        const SizedBox(height: 6),
        Text(step.description, style: TextStyle(fontSize: 14, color: const Color(0xFF6B7280), height: 1.5)),
        const SizedBox(height: 18),
        Row(children: [
          // Progress bar
          Expanded(child: ClipRRect(
            borderRadius: BorderRadius.circular(3),
            child: LinearProgressIndicator(
              value: (_current + 1) / widget.steps.length,
              minHeight: 4,
              backgroundColor: const Color(0xFFF3F4F6),
              color: HG.fixedBlue,
            ),
          )),
          const SizedBox(width: 16),
          GestureDetector(
            onTap: _next,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 22, vertical: 10),
              decoration: BoxDecoration(
                color: HG.fixedDark,
                borderRadius: BorderRadius.circular(100),
              ),
              child: Text(isLast ? 'Let\u2019s go!' : 'Next', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.fixedWhite)),
            ),
          ),
        ]),
      ]),
    );
  }
}

class _SpotlightPainter extends CustomPainter {
  final Rect spot;
  _SpotlightPainter({required this.spot});

  @override
  void paint(Canvas canvas, Size size) {
    final full = Rect.fromLTWH(0, 0, size.width, size.height);
    final rrect = RRect.fromRectAndRadius(spot, Radius.circular(14));

    // Dark overlay
    final path = Path()..addRect(full)..addRRect(rrect)..fillType = PathFillType.evenOdd;
    canvas.drawPath(path, Paint()..color = Colors.black.withValues(alpha: 0.7));

    // Soft glow around spotlight
    canvas.drawRRect(
      rrect.inflate(2),
      Paint()
        ..color = Colors.white.withValues(alpha: 0.08)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 4
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 8),
    );
  }

  @override
  bool shouldRepaint(_SpotlightPainter old) => spot != old.spot;
}
