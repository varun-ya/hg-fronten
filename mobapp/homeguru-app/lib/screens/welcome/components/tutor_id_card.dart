import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class TutorIdCard extends StatefulWidget {
  final double pb;
  final VoidCallback onNext;
  const TutorIdCard({super.key, required this.pb, required this.onNext});

  @override
  State<TutorIdCard> createState() => _TutorIdCardState();
}

class _TutorIdCardState extends State<TutorIdCard> with SingleTickerProviderStateMixin {
  final _aadhaar = TextEditingController();
  final _aadhaarF = FocusNode();
  bool _tried = false;
  int _state = 0; // 0=input, 1=verifying, 2=verified, 3=failed
  int _verifyStep = 0;
  Timer? _stepTimer;

  AnimationController? _checkCtrl;
  Animation<double>? _checkAnim;

  String? get _aadhaarErr {
    final d = _aadhaar.text.replaceAll(RegExp(r'\D'), '');
    if (d.length != 12) return '12 digits required';
    return null;
  }

  @override
  void initState() {
    super.initState();
    _checkCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 600));
    _checkAnim = CurvedAnimation(parent: _checkCtrl!, curve: Curves.elasticOut);
  }

  void _verify() {
    setState(() => _tried = true);
    if (_aadhaarErr != null) return;
    HapticFeedback.mediumImpact();
    setState(() { _state = 1; _verifyStep = 0; });

    _stepTimer = Timer.periodic(const Duration(milliseconds: 1200), (t) {
      if (!mounted) { t.cancel(); return; }
      if (_verifyStep < 2) {
        setState(() => _verifyStep++);
      } else {
        t.cancel();
        Timer(const Duration(milliseconds: 800), () {
          if (!mounted) return;
          setState(() => _state = 2);
          _checkCtrl?.forward();
        });
      }
    });
  }

  @override
  void dispose() { _aadhaar.dispose(); _aadhaarF.dispose(); _stepTimer?.cancel(); _checkCtrl?.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(color: HG.white, border: Border.all(color: HG.grey200), borderRadius: BorderRadius.circular(28)),
        child: Stack(children: [
          _state == 0 ? _buildInput() : _state == 1 ? _buildVerifying() : _state == 2 ? _buildVerified() : _buildFailed(),
        ]),
    );
  }

  Widget _buildInput() {
    final hasErr = _tried && _aadhaarErr != null;
    return Column(children: [
      const SizedBox(height: 28),
      Text('Identity Verification', textAlign: TextAlign.center, style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 6),
      Padding(padding: EdgeInsets.symmetric(horizontal: 32),
        child: Text('Verify your identity via DigiLocker to keep our platform safe.', textAlign: TextAlign.center, style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.4))),
      const SizedBox(height: 20),

      Expanded(child: ListView(
        padding: EdgeInsets.symmetric(horizontal: 28),
        physics: const BouncingScrollPhysics(),
        children: [
          // DigiLocker info
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
            child: Column(children: [
              Row(children: [
                Container(
                  width: 40, height: 40,
                  decoration: BoxDecoration(color: HG.blue.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(10)),
                  child: Icon(PhosphorIconsFill.shieldCheck, size: 20, color: HG.blue),
                ),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('DigiLocker Verification', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
                  SizedBox(height: 2),
                  Text('Aadhaar-based identity check', style: TextStyle(fontSize: 12, color: HG.textMuted)),
                ])),
              ]),
              const SizedBox(height: 14),
              Container(height: 1, color: HG.grey100),
              const SizedBox(height: 14),
              ...[
                'Instant verification via DigiLocker',
                'Your data is encrypted & secure',
                'No physical documents needed',
              ].map((t) => Padding(
                padding: EdgeInsets.only(bottom: 6),
                child: Row(children: [
                  Icon(Icons.check_circle_rounded, size: 14, color: HG.green),
                  const SizedBox(width: 8),
                  Expanded(child: Text(t, style: TextStyle(fontSize: 12, color: HG.textMuted))),
                ]),
              )),
            ]),
          ),

          const SizedBox(height: 20),

          // Aadhaar input
          Text('AADHAAR NUMBER', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.dark, letterSpacing: 1)),
          const SizedBox(height: 8),
          Container(
            decoration: BoxDecoration(
              color: HG.grey50, borderRadius: BorderRadius.circular(14),
              border: Border.all(color: hasErr ? HG.red : HG.grey200, width: hasErr ? 1.5 : 1),
            ),
            child: TextField(
              controller: _aadhaar, focusNode: _aadhaarF, autofocus: true,
              keyboardType: TextInputType.number,
              maxLength: 14,
              inputFormatters: [_AadhaarFormatter()],
              onChanged: (_) => setState(() {}),
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.dark, fontFamily: HG.font, letterSpacing: 2),
              decoration: InputDecoration(
                hintText: 'XXXX XXXX XXXX',
                hintStyle: TextStyle(fontSize: 16, color: HG.textLight, letterSpacing: 2, fontWeight: FontWeight.w400),
                contentPadding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                border: InputBorder.none,
                counterText: '',
              ),
            ),
          ),
          if (hasErr) Padding(padding: EdgeInsets.only(top: 4, left: 4),
            child: Text(_aadhaarErr!, style: TextStyle(fontSize: 11, color: HG.red))),
          const SizedBox(height: 16),
        ],
      )),

      Padding(
        padding: EdgeInsets.fromLTRB(24, 8, 24, widget.pb + 24),
        child: GestureDetector(
          onTap: _verify,
          child: AnimatedOpacity(
            duration: const Duration(milliseconds: 250),
            opacity: _aadhaar.text.replaceAll(RegExp(r'\D'), '').length == 12 ? 1.0 : 0.4,
            child: Container(
              width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
              decoration: BoxDecoration(color: HG.blue, borderRadius: BorderRadius.circular(100),
                boxShadow: [BoxShadow(color: HG.blue.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.blue.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1))]),
              child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                Icon(PhosphorIconsBold.shieldCheck, size: 16, color: HG.white),
                const SizedBox(width: 8),
                Text('Verify with DigiLocker', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white)),
              ]),
            ),
          ),
        ),
      ),
    ]);
  }

  Widget _buildVerifying() {
    const steps = [
      'Connecting to DigiLocker...',
      'Fetching Aadhaar & PAN details...',
      'Verifying identity...',
    ];
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      TweenAnimationBuilder<double>(
        tween: Tween(begin: 0.0, end: 1.0),
        duration: const Duration(milliseconds: 600),
        curve: Curves.elasticOut,
        builder: (_, v, child) => Transform.scale(scale: v, child: child),
        child: Container(
          width: 72, height: 72,
          decoration: BoxDecoration(color: HG.blue.withValues(alpha: 0.08), shape: BoxShape.circle),
          child: Icon(PhosphorIconsFill.shieldCheck, size: 32, color: HG.blue),
        ),
      ),
      const SizedBox(height: 28),
      ...List.generate(3, (i) {
        final done = i < _verifyStep;
        final active = i == _verifyStep;
        return Padding(
          padding: EdgeInsets.symmetric(horizontal: 48, vertical: 6),
          child: Row(children: [
            SizedBox(width: 24, height: 24, child: Center(
              child: done
                  ? Icon(Icons.check_circle_rounded, size: 18, color: HG.green)
                  : active
                      ? SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: HG.blue))
                      : Container(width: 8, height: 8, decoration: BoxDecoration(color: HG.grey200, shape: BoxShape.circle)),
            )),
            const SizedBox(width: 12),
            AnimatedDefaultTextStyle(
              duration: const Duration(milliseconds: 300),
              style: TextStyle(
                fontSize: 14, fontFamily: HG.font,
                fontWeight: active ? FontWeight.w600 : FontWeight.w400,
                color: done ? HG.green : active ? HG.dark : HG.grey300,
              ),
              child: Text(steps[i]),
            ),
          ]),
        );
      }),
    ]);
  }

  Widget _buildVerified() {
    return Column(children: [
      const Spacer(),
      ScaleTransition(
        scale: _checkAnim ?? const AlwaysStoppedAnimation(1.0),
        child: Container(
          width: 64, height: 64,
          decoration: BoxDecoration(color: Color(0xFFF0FDF4), shape: BoxShape.circle),
          child: Icon(Icons.check_circle_rounded, size: 32, color: HG.green),
        ),
      ),
      const SizedBox(height: 20),
      Text('Identity Verified!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 8),
      Padding(padding: EdgeInsets.symmetric(horizontal: 40),
        child: Text('Your Aadhaar and PAN card have been verified successfully via DigiLocker.', textAlign: TextAlign.center,
          style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.5))),
      const SizedBox(height: 24),
      ...['Aadhaar verified', 'PAN card fetched', 'Identity confirmed'].map((t) => Padding(
        padding: EdgeInsets.symmetric(horizontal: 28, vertical: 4),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 18, vertical: 12),
          decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(12), border: Border.all(color: HG.grey200)),
          child: Row(children: [
            Icon(Icons.check_circle_rounded, size: 16, color: HG.green),
            const SizedBox(width: 10),
            Text(t, style: TextStyle(fontSize: 14, color: HG.dark)),
          ]),
        ),
      )),
      const Spacer(),
      Padding(
        padding: EdgeInsets.fromLTRB(24, 8, 24, widget.pb + 24),
        child: GestureDetector(
          onTap: widget.onNext,
          child: Container(
            width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
            decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100),
              boxShadow: [BoxShadow(color: HG.dark.withValues(alpha: 0.2), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.dark.withValues(alpha: 0.1), blurRadius: 4, offset: const Offset(0, 1))]),
            child: Center(child: Text('Continue', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white))),
          ),
        ),
      ),
    ]);
  }

  Widget _buildFailed() {
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Container(
        width: 64, height: 64,
        decoration: BoxDecoration(color: HG.red.withValues(alpha: 0.08), shape: BoxShape.circle),
        child: Icon(PhosphorIconsFill.xCircle, size: 32, color: HG.red),
      ),
      const SizedBox(height: 20),
      Text('Verification Failed', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 8),
      Padding(padding: EdgeInsets.symmetric(horizontal: 40),
        child: Text('We could not verify your Aadhaar. Please check the number and try again.', textAlign: TextAlign.center,
          style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.5))),
      const SizedBox(height: 24),
      GestureDetector(
        onTap: () => setState(() { _state = 0; _tried = false; }),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100)),
          child: Text('Try Again', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.white)),
        ),
      ),
    ]);
  }
}

// Formats input as XXXX XXXX XXXX
class _AadhaarFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue old, TextEditingValue val) {
    final digits = val.text.replaceAll(RegExp(r'\D'), '');
    if (digits.length > 12) return old;
    final buf = StringBuffer();
    for (int i = 0; i < digits.length; i++) {
      if (i > 0 && i % 4 == 0) buf.write(' ');
      buf.write(digits[i]);
    }
    final text = buf.toString();
    return TextEditingValue(text: text, selection: TextSelection.collapsed(offset: text.length));
  }
}
