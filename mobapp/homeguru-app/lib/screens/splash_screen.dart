import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../widgets/sprite_cache.dart';
import '../theme.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  late final Animation<double> _scale;
  late final Animation<double> _fade;
  late final Animation<double> _frameAnim;
  late final Animation<double> _logoFade;
  late final Animation<Offset> _logoSlide;

  ui.Image? _sprite;

  static const _totalFrames = 5;
  static const _frameW = 207;
  static const _frameH = 238;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 2000));

    _scale = Tween(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _ctrl, curve: const Interval(0, 0.45, curve: Curves.elasticOut)),
    );

    _fade = Tween(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _ctrl, curve: const Interval(0, 0.12, curve: Curves.easeOut)),
    );

    _frameAnim = Tween(begin: 0.0, end: _totalFrames.toDouble()).animate(
      CurvedAnimation(parent: _ctrl, curve: Curves.linear),
    );

    _logoFade = Tween(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _ctrl, curve: const Interval(0.4, 0.65, curve: Curves.easeOut)),
    );

    _logoSlide = Tween(begin: const Offset(0, 0.3), end: Offset.zero).animate(
      CurvedAnimation(parent: _ctrl, curve: const Interval(0.4, 0.65, curve: Curves.easeOutCubic)),
    );

    _loadAndStart();
  }

  Future<void> _loadAndStart() async {
    final img = await SpriteCache.load('assets/rotate.png');
    if (!mounted) return;
    setState(() => _sprite = img);
    _ctrl.forward();
  }

  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: _sprite == null
            ? const SizedBox()
            : AnimatedBuilder(
                animation: _ctrl,
                builder: (context, _) {
                  final frame = _frameAnim.value.floor().clamp(0, _totalFrames - 1);

                  return Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // Mascot
                        Opacity(
                          opacity: _fade.value,
                          child: Transform.scale(
                            scale: _scale.value,
                            child: SizedBox(
                              width: 140,
                              height: 140 * (_frameH / _frameW),
                              child: CustomPaint(
                                painter: _RotatePainter(sprite: _sprite!, frame: frame),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Logo
                        SlideTransition(
                          position: _logoSlide,
                          child: FadeTransition(
                            opacity: _logoFade,
                            child: Image.asset('assets/profileHeader.png', height: 22),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
      ),
    );
  }
}

class _RotatePainter extends CustomPainter {
  final ui.Image sprite;
  final int frame;
  static final _paint = Paint()..filterQuality = FilterQuality.medium;

  _RotatePainter({required this.sprite, required this.frame});

  @override
  void paint(Canvas canvas, Size size) {
    final src = Rect.fromLTWH(
      frame * _SplashScreenState._frameW.toDouble(), 0,
      _SplashScreenState._frameW.toDouble(), _SplashScreenState._frameH.toDouble(),
    );
    final dst = Rect.fromLTWH(0, 0, size.width, size.height);
    canvas.drawImageRect(sprite, src, dst, _paint);
  }

  @override
  bool shouldRepaint(_RotatePainter old) => frame != old.frame;
}
