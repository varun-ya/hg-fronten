import 'dart:async';
import 'package:flutter/material.dart';
import '../theme.dart';

class TypingBubble extends StatefulWidget {
  final String text;

  const TypingBubble({
    super.key,
    required this.text,
  });

  @override
  State<TypingBubble> createState() => _TypingBubbleState();
}

class _TypingBubbleState extends State<TypingBubble> with SingleTickerProviderStateMixin {
  String _displayed = '';
  int _charIndex = 0;
  Timer? _timer;
  bool _done = false;

  late final AnimationController _popCtrl;
  late final Animation<double> _scaleAnim;
  late final Animation<double> _fadeAnim;
  late final Animation<double> _slideAnim;

  @override
  void initState() {
    super.initState();
    _popCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 550));
    _scaleAnim = Tween(begin: 0.92, end: 1.0).animate(
      CurvedAnimation(parent: _popCtrl, curve: Curves.easeOutBack),
    );
    _fadeAnim = Tween(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _popCtrl, curve: const Interval(0, 0.5, curve: Curves.easeOut)),
    );
    _slideAnim = Tween(begin: 8.0, end: 0.0).animate(
      CurvedAnimation(parent: _popCtrl, curve: Curves.easeOutCubic),
    );
    _popCtrl.forward();
    Future.delayed(const Duration(milliseconds: 500), _startTyping);
  }

  @override
  void didUpdateWidget(TypingBubble old) {
    super.didUpdateWidget(old);
    if (old.text != widget.text) {
      _timer?.cancel();
      _displayed = '';
      _charIndex = 0;
      _done = false;
      _popCtrl.forward(from: 0);
      Future.delayed(const Duration(milliseconds: 500), _startTyping);
    }
  }

  void _startTyping() {
    if (!mounted) return;
    _scheduleNext();
  }

  void _scheduleNext() {
    if (_charIndex >= widget.text.length) {
      if (mounted) setState(() => _done = true);
      return;
    }
    final char = widget.text[_charIndex];
    int ms = 40;
    if (char == '.' || char == '!' || char == '?') {
      ms = 280;
    } else if (char == ',') {
      ms = 160;
    } else if (char == ' ') {
      ms = 25;
    } else if (char == '\n') {
      ms = 200;
    }

    _timer = Timer(Duration(milliseconds: ms), () {
      if (!mounted) return;
      setState(() {
        _charIndex++;
        _displayed = widget.text.substring(0, _charIndex);
      });
      _scheduleNext();
    });
  }

  void _skipToEnd() {
    _timer?.cancel();
    setState(() {
      _displayed = widget.text;
      _charIndex = widget.text.length;
      _done = true;
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _popCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _popCtrl,
      builder: (_, child) => Transform.translate(
        offset: Offset(0, _slideAnim.value),
        child: Transform.scale(
          scale: _scaleAnim.value,
          alignment: Alignment.topLeft,
          child: Opacity(opacity: _fadeAnim.value, child: child),
        ),
      ),
      child: GestureDetector(
        onTap: _done ? null : _skipToEnd,
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.fromLTRB(16, 14, 16, 14),
          decoration: BoxDecoration(
            color: HG.white,
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(4),
              topRight: Radius.circular(20),
              bottomLeft: Radius.circular(20),
              bottomRight: Radius.circular(20),
            ),
            border: Border.all(color: HG.border),
            boxShadow: [
              BoxShadow(
                color: HG.dark.withValues(alpha: 0.06),
                blurRadius: 16,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                children: [
                  Text('Hoot',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.orange)),
                  const SizedBox(width: 6),
                  if (!_done)
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: HG.green.withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text('typing',
                        style: TextStyle(fontSize: 9, fontWeight: FontWeight.w600, color: HG.green)),
                    ),
                ],
              ),
              const SizedBox(height: 6),
              Text.rich(
                TextSpan(
                  text: _displayed,
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.w400, color: HG.dark, height: 1.45),
                  children: [
                    if (!_done)
                      WidgetSpan(
                        alignment: PlaceholderAlignment.middle,
                        child: _BlinkingCursor(),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _BlinkingCursor extends StatefulWidget {
  @override
  State<_BlinkingCursor> createState() => _BlinkingCursorState();
}

class _BlinkingCursorState extends State<_BlinkingCursor> with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  late final Animation<double> _anim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 700))
      ..repeat(reverse: true);
    _anim = CurvedAnimation(parent: _ctrl, curve: Curves.easeInOut);
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _anim,
      child: Container(
        width: 2,
        height: 16,
        margin: EdgeInsets.only(left: 1),
        decoration: BoxDecoration(
          color: HG.orange,
          borderRadius: BorderRadius.circular(1),
        ),
      ),
    );
  }
}
