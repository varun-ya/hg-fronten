import 'dart:async';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'sprite_cache.dart';

class MascotWalk extends StatefulWidget {
  final double size;
  const MascotWalk({super.key, this.size = 160});

  @override
  State<MascotWalk> createState() => _MascotWalkState();
}

class _MascotWalkState extends State<MascotWalk> {
  ui.Image? _sprite;
  int _frame = 0;
  Timer? _timer;
  static const _seq = [0, 1, 0, 1];
  static const _flip = [false, false, true, true];

  @override
  void initState() {
    super.initState();
    SpriteCache.load('assets/mascot_walk.png').then((img) {
      if (!mounted) return;
      setState(() => _sprite = img);
      _timer = Timer.periodic(const Duration(milliseconds: 900), (_) {
        if (mounted) setState(() => _frame = (_frame + 1) % _seq.length);
      });
    });
  }

  @override
  void dispose() { _timer?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    if (_sprite == null) return SizedBox.square(dimension: widget.size);
    return SizedBox.square(
      dimension: widget.size,
      child: CustomPaint(painter: _P(sprite: _sprite!, frame: _seq[_frame], flipped: _flip[_frame]), willChange: true),
    );
  }
}

class _P extends CustomPainter {
  final ui.Image sprite;
  final int frame;
  final bool flipped;
  static final _p = Paint()..filterQuality = FilterQuality.low;
  _P({required this.sprite, required this.frame, required this.flipped});

  @override
  void paint(Canvas c, Size s) {
    final src = Rect.fromLTWH(frame * 238, 0, 238, 238);
    final dst = Rect.fromLTWH(0, 0, s.width, s.height);
    if (flipped) { c.save(); c.translate(s.width, 0); c.scale(-1, 1); c.drawImageRect(sprite, src, dst, _p); c.restore(); }
    else { c.drawImageRect(sprite, src, dst, _p); }
  }

  @override
  bool shouldRepaint(_P o) => frame != o.frame || flipped != o.flipped;
}
