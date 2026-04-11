import 'dart:async';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'sprite_cache.dart';
import '../theme.dart';
import '../screens/dashboard/student/ai_chat_tab.dart';

class MascotLaunchOverlay {
  MascotLaunchOverlay._();

  static Future<void> show(BuildContext context) {
    return Navigator.of(context).push(PageRouteBuilder(
      opaque: false,
      barrierDismissible: false,
      barrierColor: Colors.transparent,
      transitionDuration: Duration.zero,
      reverseTransitionDuration: Duration.zero,
      pageBuilder: (_, __, ___) => const _Overlay(),
    ));
  }
}

class _Overlay extends StatefulWidget {
  const _Overlay();
  @override
  State<_Overlay> createState() => _OverlayState();
}

class _OverlayState extends State<_Overlay> with TickerProviderStateMixin {
  ui.Image? _sprite;
  late final AnimationController _backdrop;
  late final AnimationController _enter;
  late final AnimationController _page;
  int _frame = 0;
  Timer? _frameTimer;
  bool _showPage = false;

  static const _frameCount = 6;
  static const _spriteW = 1250.0;
  static const _frameH = 199.0;
  static double get _frameW => _spriteW / _frameCount;

  @override
  void initState() {
    super.initState();
    _backdrop = AnimationController(vsync: this, duration: const Duration(milliseconds: 300));
    _enter = AnimationController(vsync: this, duration: const Duration(milliseconds: 2800));
    _page = AnimationController(vsync: this, duration: const Duration(milliseconds: 800));

    SpriteCache.load('assets/open.png').then((img) {
      if (!mounted) return;
      setState(() => _sprite = img);
      _start();
    });
  }

  Future<void> _start() async {
    // Backdrop fades in quickly
    await _backdrop.forward();
    if (!mounted) return;

    // Phase 1: mascot enters with 6 sprite frames
    _frameTimer = Timer.periodic(const Duration(milliseconds: 450), (_) {
      if (!mounted) return;
      if (_frame < _frameCount - 1) setState(() => _frame++);
    });
    await _enter.forward();
    _frameTimer?.cancel();
    if (!mounted) return;

    // Brief hold
    await Future.delayed(const Duration(milliseconds: 300));
    if (!mounted) return;

    // Phase 2: page slides up, mascot rides on top then fades
    setState(() => _showPage = true);
    await _page.forward();
  }

  @override
  void dispose() {
    _frameTimer?.cancel();
    _backdrop.dispose();
    _enter.dispose();
    _page.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screen = MediaQuery.of(context).size;
    final mascotSize = screen.width * 0.35;

    return AnimatedBuilder(
      animation: Listenable.merge([_backdrop, _enter, _page]),
      builder: (_, __) {
        final mascotH = mascotSize * (_frameH / _frameW);

        // Page slide — spring-like deceleration
        final pageT = _showPage ? Curves.easeOutQuart.transform(_page.value) : 0.0;
        final pageTop = screen.height * (1 - pageT);

        // Mascot position — locked to page top
        double mascotY;
        double scale = 1.0;
        if (_showPage) {
          mascotY = pageTop - mascotH + 8;
          // Gentle scale up as it rides
          final t = Curves.easeOutQuart.transform(_page.value);
          scale = 1.0 + t * 0.1;
        } else {
          // Smooth deceleration entering from bottom
          final t = Curves.easeOutQuart.transform(_enter.value);
          final startY = screen.height + mascotH;
          final endY = screen.height - mascotH;
          mascotY = startY + (endY - startY) * t;
          scale = 0.6 + t * 0.4;
        }
        final mascotX = (screen.width - mascotSize) / 2;

        // Mascot fades out in the last 40% of the page slide
        final mascotOpacity = _showPage
            ? (1.0 - Curves.easeInQuad.transform((_page.value - 0.6).clamp(0.0, 1.0) / 0.4)).clamp(0.0, 1.0)
            : 1.0;

        // Backdrop fades out as page covers screen
        final backdropOpacity = _showPage
            ? (0.45 * (1.0 - _page.value)).clamp(0.0, 0.45)
            : 0.45 * _backdrop.value;

        return Stack(children: [
          // Backdrop
          if (backdropOpacity > 0)
            Positioned.fill(
              child: BackdropFilter(
                filter: ui.ImageFilter.blur(
                  sigmaX: 14 * (_backdrop.value.clamp(0.0, 1.0)),
                  sigmaY: 14 * (_backdrop.value.clamp(0.0, 1.0)),
                ),
                child: Container(color: Colors.black.withValues(alpha: backdropOpacity)),
              ),
            ),

          // Full page sliding up
          if (_showPage)
            Positioned(
              left: 0, right: 0,
              top: pageTop,
              height: screen.height,
              child: const AiChatTab(),
            ),

          // Mascot on top
          if (_sprite != null && mascotOpacity > 0)
            Positioned(
              left: mascotX,
              top: mascotY,
              child: Opacity(
                opacity: mascotOpacity,
                child: Transform.scale(
                  scale: scale,
                  alignment: Alignment.bottomCenter,
                  child: SizedBox(
                    width: mascotSize,
                    height: mascotH,
                    child: CustomPaint(
                      painter: _SpritePainter(sprite: _sprite!, frame: _frame),
                      willChange: true,
                    ),
                  ),
                ),
              ),
            ),
        ]);
      },
    );
  }
}

/// Wrapper that pushes AiChatTab as a full page with back navigation.
class AiChatPage extends StatelessWidget {
  const AiChatPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const AiChatTab();
  }
}

class _SpritePainter extends CustomPainter {
  final ui.Image sprite;
  final int frame;
  static final _p = Paint()..filterQuality = FilterQuality.low;
  _SpritePainter({required this.sprite, required this.frame});

  @override
  void paint(Canvas c, Size s) {
    final src = Rect.fromLTWH(frame * _OverlayState._frameW, 0, _OverlayState._frameW, _OverlayState._frameH);
    final dst = Rect.fromLTWH(0, 0, s.width, s.height);
    c.drawImageRect(sprite, src, dst, _p);
  }

  @override
  bool shouldRepaint(_SpritePainter o) => frame != o.frame;
}
