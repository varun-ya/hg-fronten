import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class TutorBankCard extends StatefulWidget {
  final double pb;
  final String prefillName;
  final VoidCallback onNext;
  const TutorBankCard({super.key, required this.pb, this.prefillName = '', required this.onNext});

  @override
  State<TutorBankCard> createState() => _TutorBankCardState();
}

class _TutorBankCardState extends State<TutorBankCard> with SingleTickerProviderStateMixin {
  final _accName = TextEditingController();
  final _accNum = TextEditingController();
  final _confirmNum = TextEditingController();
  final _ifsc = TextEditingController();
  final _accNameF = FocusNode();
  final _accNumF = FocusNode();
  final _confirmNumF = FocusNode();
  final _ifscF = FocusNode();
  bool _tried = false;

  // 0=input, 1=verifying, 2=verified, 3=failed
  int _state = 0;
  int _verifyStep = 0; // 0,1,2 for the 3 loading steps
  Timer? _stepTimer;

  late final AnimationController _checkCtrl;
  late final Animation<double> _checkAnim;

  String? get _nameErr => _accName.text.trim().length < 2 ? 'Required' : null;
  String? get _numErr => _accNum.text.trim().length < 8 ? 'Min 8 digits' : null;
  String? get _confirmErr {
    if (_confirmNum.text.isEmpty) return 'Required';
    if (_confirmNum.text != _accNum.text) return 'Does not match';
    return null;
  }
  String? get _ifscErr => _ifsc.text.trim().length != 11 ? '11 characters' : null;

  bool get _canProceed => _nameErr == null && _numErr == null && _confirmErr == null && _ifscErr == null;

  @override
  void initState() {
    super.initState();
    if (widget.prefillName.isNotEmpty) _accName.text = widget.prefillName;
    _checkCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 600));
    _checkAnim = CurvedAnimation(parent: _checkCtrl, curve: Curves.elasticOut);
  }

  @override
  void dispose() {
    _accName.dispose(); _accNum.dispose(); _confirmNum.dispose(); _ifsc.dispose();
    _accNameF.dispose(); _accNumF.dispose(); _confirmNumF.dispose(); _ifscF.dispose();
    _stepTimer?.cancel(); _checkCtrl.dispose();
    super.dispose();
  }

  void _verify() {
    setState(() => _tried = true);
    if (!_canProceed) return;
    HapticFeedback.mediumImpact();
    setState(() { _state = 1; _verifyStep = 0; });

    // Animate through 3 steps
    _stepTimer = Timer.periodic(const Duration(milliseconds: 1200), (t) {
      if (!mounted) { t.cancel(); return; }
      if (_verifyStep < 2) {
        setState(() => _verifyStep++);
      } else {
        t.cancel();
        Timer(const Duration(milliseconds: 800), () {
          if (!mounted) return;
          setState(() => _state = 2);
          _checkCtrl.forward();
        });
      }
    });
  }

  Widget _input(TextEditingController c, String hint, {String? err, FocusNode? focus, FocusNode? nextFocus, TextInputType? kb, String? helper, bool obscure = false, bool caps = false}) {
    final hasErr = _tried && err != null;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Container(
        decoration: BoxDecoration(
          color: HG.grey50, borderRadius: BorderRadius.circular(14),
          border: Border.all(color: hasErr ? HG.red : HG.grey200, width: hasErr ? 1.5 : 1),
        ),
        child: TextField(
          controller: c, focusNode: focus, keyboardType: kb, obscureText: obscure,
          textCapitalization: caps ? TextCapitalization.characters : TextCapitalization.none,
          inputFormatters: caps ? [_UpperCaseFormatter()] : null,
          textInputAction: nextFocus != null ? TextInputAction.next : TextInputAction.done,
          onSubmitted: (_) { if (nextFocus != null) nextFocus.requestFocus(); },
          onChanged: (_) => setState(() {}),
          style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
          decoration: InputDecoration(
            hintText: hint, hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
            contentPadding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
            border: InputBorder.none,
          ),
        ),
      ),
      if (hasErr) Padding(padding: EdgeInsets.only(top: 4, left: 4),
        child: Text(err!, style: TextStyle(fontSize: 11, color: HG.red))),
      if (helper != null && !hasErr) Padding(padding: EdgeInsets.only(top: 4, left: 4),
        child: Text(helper, style: TextStyle(fontSize: 11, color: HG.textLight))),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(color: HG.white, border: Border.all(color: HG.grey200), borderRadius: BorderRadius.circular(28)),
        child: Stack(children: [
          _state == 0 ? _buildInput()
            : _state == 1 ? _buildVerifying()
            : _state == 2 ? _buildVerified()
            : _buildFailed(),
        ]),
    );
  }

  Widget _buildInput() {
    return Column(children: [
      const SizedBox(height: 28),
      Text('Bank Account', textAlign: TextAlign.center, style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 6),
      Padding(padding: EdgeInsets.symmetric(horizontal: 32),
        child: Text('For receiving session payments.', textAlign: TextAlign.center, style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.4))),
      const SizedBox(height: 20),

      Expanded(child: ListView(
        padding: EdgeInsets.symmetric(horizontal: 24),
        physics: const BouncingScrollPhysics(),
        children: [
          _input(_accName, 'Account holder name', err: _nameErr, focus: _accNameF, nextFocus: _accNumF),
          const SizedBox(height: 10),
          _input(_accNum, 'Account number', err: _numErr, kb: TextInputType.number, focus: _accNumF, nextFocus: _confirmNumF, obscure: true),
          const SizedBox(height: 10),
          _input(_confirmNum, 'Re-enter account number', err: _confirmErr, kb: TextInputType.number, focus: _confirmNumF, nextFocus: _ifscF),
          const SizedBox(height: 10),
          _input(_ifsc, 'IFSC code', err: _ifscErr, focus: _ifscF, helper: 'e.g. SBIN0001234', caps: true),
          const SizedBox(height: 16),

          // Info
          Container(
            padding: EdgeInsets.all(14),
            decoration: BoxDecoration(color: const Color(0xFFFFFBEB), borderRadius: BorderRadius.circular(12), border: Border.all(color: const Color(0xFFFDE68A))),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Icon(PhosphorIconsRegular.info, size: 14, color: const Color(0xFF92400E)),
              const SizedBox(width: 8),
              const Expanded(child: Text('Your bank account details will be verified instantly. Payments for sessions will be credited to this account.', style: TextStyle(fontSize: 12, color: Color(0xFF92400E), height: 1.5))),
            ]),
          ),
          const SizedBox(height: 16),
        ],
      )),

      Padding(
        padding: EdgeInsets.fromLTRB(24, 4, 24, widget.pb + 24),
        child: GestureDetector(
          onTap: _verify,
          child: AnimatedOpacity(
            duration: const Duration(milliseconds: 250), opacity: _canProceed ? 1.0 : 0.4,
            child: Container(
              width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
              decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100),
                boxShadow: [BoxShadow(color: HG.dark.withValues(alpha: 0.2), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.dark.withValues(alpha: 0.1), blurRadius: 4, offset: const Offset(0, 1))]),
              child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                Icon(PhosphorIconsBold.bank, size: 16, color: HG.white),
                const SizedBox(width: 8),
                Text('Verify Account', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white)),
              ]),
            ),
          ),
        ),
      ),
    ]);
  }

  // ── Verifying with stepped animation ──
  Widget _buildVerifying() {
    const steps = [
      'Verifying account details...',
      'Confirming IFSC...',
      'Account verified...',
    ];
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      // Animated bank icon
      TweenAnimationBuilder<double>(
        tween: Tween(begin: 0.0, end: 1.0),
        duration: const Duration(milliseconds: 600),
        curve: Curves.elasticOut,
        builder: (_, v, child) => Transform.scale(scale: v, child: child),
        child: Container(
          width: 72, height: 72,
          decoration: BoxDecoration(color: HG.blue.withValues(alpha: 0.08), shape: BoxShape.circle),
          child: Icon(PhosphorIconsFill.bank, size: 32, color: HG.blue),
        ),
      ),
      const SizedBox(height: 28),

      // Steps
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
        scale: _checkAnim,
        child: Container(
          width: 64, height: 64,
          decoration: BoxDecoration(color: Color(0xFFF0FDF4), shape: BoxShape.circle),
          child: Icon(Icons.check_circle_rounded, size: 32, color: HG.green),
        ),
      ),
      const SizedBox(height: 20),
      Text('Account Verified!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 8),
      Padding(padding: EdgeInsets.symmetric(horizontal: 40),
        child: Text('${_accName.text.trim()}\u2019s bank account has been verified successfully.', textAlign: TextAlign.center,
          style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.5))),
      const SizedBox(height: 24),
      ...['Account number verified', 'IFSC confirmed', 'Ready for payouts'].map((t) => Padding(
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
        child: Text('Could not verify your bank account. Please check the details and try again.', textAlign: TextAlign.center,
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

class _UpperCaseFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue old, TextEditingValue val) {
    return val.copyWith(text: val.text.toUpperCase());
  }
}
