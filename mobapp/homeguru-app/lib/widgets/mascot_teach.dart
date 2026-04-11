import 'dart:async';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'sprite_cache.dart';

class MascotTeach extends StatefulWidget {
  final double size;
  const MascotTeach({super.key, this.size = 160});

  @override
  State<MascotTeach> createState() => _S();
}

class _S extends State<MascotTeach> {
  ui.Image? _img;
  int _f = 0;
  Timer? _t;

  @override
  void initState() {
    super.initState();
    SpriteCache.load('assets/teach.png').then((i) {
      if (!mounted) return;
      setState(() => _img = i);
      _t = Timer.periodic(const Duration(milliseconds: 900), (_) {
        if (mounted) setState(() => _f = (_f + 1) % 4);
      });
    });
  }

  @override
  void dispose() { _t?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    if (_img == null) return SizedBox.square(dimension: widget.size);
    return SizedBox.square(
      dimension: widget.size,
      child: CustomPaint(painter: _P(img: _img!, f: _f), willChange: true),
    );
  }
}

class _P extends CustomPainter {
  final ui.Image img;
  final int f;
  static final _p = Paint()..filterQuality = FilterQuality.low;
  _P({required this.img, required this.f});

  @override
  void paint(Canvas c, Size s) {
    c.drawImageRect(img, Rect.fromLTWH(f * 249, 0, 249, 250), Rect.fromLTWH(0, 0, s.width, s.height), _p);
  }

  @override
  bool shouldRepaint(_P o) => f != o.f;
}
