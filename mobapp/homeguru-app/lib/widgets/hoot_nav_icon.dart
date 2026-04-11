import 'dart:async';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'sprite_cache.dart';

class HootNavIcon extends StatefulWidget {
  final double size;
  const HootNavIcon({super.key, this.size = 28});
  @override
  State<HootNavIcon> createState() => _HootNavIconState();
}

class _HootNavIconState extends State<HootNavIcon> {
  ui.Image? _sprite;
  int _frame = 0;
  Timer? _timer;
  bool _forward = true;

  static const _frameCount = 3;
  static const _spriteW = 680.0;
  static const _frameH = 238.0;
  static double get _frameW => _spriteW / _frameCount;

  @override
  void initState() {
    super.initState();
    SpriteCache.load('assets/hoot.png').then((img) {
      if (!mounted) return;
      setState(() => _sprite = img);
      _timer = Timer.periodic(const Duration(milliseconds: 400), (_) {
        if (!mounted) return;
        setState(() {
          if (_forward) {
            if (_frame < _frameCount - 1) { _frame++; }
            else { _forward = false; _frame--; }
          } else {
            if (_frame > 0) { _frame--; }
            else { _forward = true; _frame++; }
          }
        });
      });
    });
  }

  @override
  void dispose() { _timer?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    if (_sprite == null) return SizedBox.square(dimension: widget.size);
    final h = widget.size * (_frameH / _frameW);
    return SizedBox(
      width: widget.size,
      height: h,
      child: CustomPaint(painter: _P(sprite: _sprite!, frame: _frame), willChange: true),
    );
  }
}

class _P extends CustomPainter {
  final ui.Image sprite;
  final int frame;
  static final _p = Paint()..filterQuality = FilterQuality.low;
  _P({required this.sprite, required this.frame});

  @override
  void paint(Canvas c, Size s) {
    final fw = _HootNavIconState._frameW;
    final src = Rect.fromLTWH(frame * fw, 0, fw, _HootNavIconState._frameH);
    final dst = Rect.fromLTWH(0, 0, s.width, s.height);
    c.drawImageRect(sprite, src, dst, _p);
  }

  @override
  bool shouldRepaint(_P o) => frame != o.frame;
}
