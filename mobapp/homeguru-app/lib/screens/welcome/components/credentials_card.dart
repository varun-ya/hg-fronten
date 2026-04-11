import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class CredentialsCard extends StatefulWidget {
  final double pb;
  final VoidCallback onNext;
  const CredentialsCard({super.key, required this.pb, required this.onNext});

  @override
  State<CredentialsCard> createState() => _CredentialsCardState();
}

class _CredentialsCardState extends State<CredentialsCard> {
  final _email = TextEditingController();
  final _phone = TextEditingController();
  final _pass = TextEditingController();
  final _otp = TextEditingController();
  final _emailFocus = FocusNode();
  final _phoneFocus = FocusNode();
  final _passFocus = FocusNode();
  final _otpFocus = FocusNode();

  String _code = '+91';
  bool _hide = true;
  bool _otpSent = false;
  bool _otpOk = false;
  bool _emailSent = false;
  bool _tried = false;

  String? get _emailErr {
    final v = _email.text.trim();
    if (v.isEmpty) return 'Required';
    if (!RegExp(r'^[\w\.-]+@[\w\.-]+\.\w{2,}$').hasMatch(v)) return 'Invalid';
    return null;
  }

  String? get _phoneErr {
    final d = _phone.text.replaceAll(RegExp(r'\D'), '');
    if (d.length < 7 || d.length > 15) return 'Invalid';
    return null;
  }

  String? get _passErr => _pass.text.length < 6 ? 'Min 6 chars' : null;

  bool get _canProceed => _emailErr == null && _phoneErr == null && _passErr == null && _otpOk;

  void _sendOtp() {
    if (_phoneErr != null) return;
    HapticFeedback.mediumImpact();
    setState(() => _otpSent = true);
  }

  void _verifyOtp() {
    if (_otp.text.trim().length < 4) return;
    HapticFeedback.mediumImpact();
    setState(() => _otpOk = true);
  }

  void _sendEmailLink() {
    if (_emailErr != null) return;
    HapticFeedback.lightImpact();
    setState(() => _emailSent = true);
  }

  @override
  void dispose() {
    _email.dispose(); _phone.dispose(); _pass.dispose(); _otp.dispose();
    _emailFocus.dispose(); _phoneFocus.dispose(); _passFocus.dispose(); _otpFocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: HG.white,
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: HG.grey200),
      ),
      child: Column(children: [
        const SizedBox(height: 28),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 28),
          child: Text('Create your account', textAlign: TextAlign.center,
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
        ),
        const SizedBox(height: 6),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 32),
          child: Text('Takes a few seconds. No credit card.', textAlign: TextAlign.center,
            style: TextStyle(fontSize: 13, color: HG.textMuted)),
        ),
        const SizedBox(height: 24),
        Expanded(child: ListView(
          padding: EdgeInsets.symmetric(horizontal: 20),
          physics: const BouncingScrollPhysics(),
          children: [
            // Email
            _label('Email'),
            const SizedBox(height: 6),
            _field(_email, 'you@example.com', err: _emailErr, kb: TextInputType.emailAddress, focus: _emailFocus, nextFocus: _phoneFocus,
              trailing: _actionChip(_emailSent ? 'Sent' : 'Verify', _emailSent ? HG.green : HG.blue, _emailSent ? null : _sendEmailLink, _emailSent)),
            if (_emailSent)
              Padding(padding: EdgeInsets.only(top: 6, left: 4),
                child: Row(children: [
                  Icon(PhosphorIconsFill.checkCircle, size: 13, color: HG.green),
                  const SizedBox(width: 5),
                  Text('Check inbox for verification link', style: TextStyle(fontSize: 11, color: HG.green, fontWeight: FontWeight.w500)),
                ])),
            const SizedBox(height: 14),

            // Phone
            _label('Phone'),
            const SizedBox(height: 6),
            Row(children: [
              GestureDetector(
                onTap: () async {
                  final c = await showModalBottomSheet<String>(
                    context: context, backgroundColor: HG.white,
                    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
                    builder: (_) => const _CodePicker(),
                  );
                  if (c != null && mounted) setState(() => _code = c);
                },
                child: Container(
                  height: 50,
                  padding: EdgeInsets.symmetric(horizontal: 14),
                  decoration: BoxDecoration(
                    color: HG.grey50,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: HG.grey200),
                  ),
                  child: Row(mainAxisSize: MainAxisSize.min, children: [
                    Text(_code, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark)),
                    const SizedBox(width: 2),
                    Icon(PhosphorIconsBold.caretDown, size: 12, color: HG.textLight),
                  ]),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(child: _field(_phone, 'Phone number', err: _phoneErr, kb: TextInputType.phone, enabled: !_otpOk, focus: _phoneFocus, nextFocus: _passFocus,
                trailing: _actionChip(_otpOk ? 'Done' : _otpSent ? 'Resend' : 'OTP', _otpOk ? HG.green : HG.orange, _otpOk ? null : _sendOtp, _otpOk))),
            ]),
            if (_otpSent && !_otpOk) ...[
              const SizedBox(height: 8),
              _field(_otp, 'Enter OTP from WhatsApp', kb: TextInputType.number, focus: _otpFocus, nextFocus: _passFocus,
                trailing: _actionChip('Verify', HG.green, _verifyOtp, false)),
            ],
            if (_otpOk)
              Padding(padding: EdgeInsets.only(top: 6, left: 4),
                child: Row(children: [
                  Icon(PhosphorIconsFill.checkCircle, size: 13, color: HG.green),
                  const SizedBox(width: 5),
                  Text('Phone verified', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.green)),
                ])),
            const SizedBox(height: 14),

            // Password
            _label('Password'),
            const SizedBox(height: 6),
            _field(_pass, 'Min 6 characters', err: _passErr, obscure: true, focus: _passFocus),
            const SizedBox(height: 8),
          ],
        )),

        Padding(
          padding: EdgeInsets.fromLTRB(20, 4, 20, widget.pb + 20),
          child: _M3CredButton(
            label: 'Continue',
            enabled: _canProceed,
            onTap: () {
              setState(() => _tried = true);
              if (_canProceed) widget.onNext();
            },
          ),
        ),
      ]),
    );
  }

  Widget _label(String text) => Text(text, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.textMuted, letterSpacing: 0.3));

  Widget _field(TextEditingController c, String hint, {String? err, TextInputType? kb, bool obscure = false, bool enabled = true, Widget? trailing, FocusNode? focus, FocusNode? nextFocus}) {
    final hasErr = _tried && err != null;
    return Container(
      height: 50,
      decoration: BoxDecoration(
        color: enabled ? HG.grey50 : HG.grey100,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: hasErr ? HG.red : HG.grey200, width: hasErr ? 1.5 : 1),
      ),
      child: Row(children: [
        Expanded(child: TextField(
          controller: c, keyboardType: kb, obscureText: obscure && _hide, enabled: enabled,
          focusNode: focus,
          textInputAction: nextFocus != null ? TextInputAction.next : TextInputAction.done,
          onSubmitted: (_) { if (nextFocus != null) nextFocus.requestFocus(); },
          onChanged: (_) => setState(() {}),
          style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
          decoration: InputDecoration(
            hintText: hint, hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
            contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 15),
            border: InputBorder.none,
            suffixIcon: obscure ? GestureDetector(
              onTap: () => setState(() => _hide = !_hide),
              child: Icon(_hide ? PhosphorIconsRegular.eyeSlash : PhosphorIconsRegular.eye, size: 18, color: HG.textLight),
            ) : null,
          ),
        )),
        if (trailing != null) ...[Container(width: 1, height: 24, color: HG.grey200), trailing],
      ]),
    );
  }

  Widget _actionChip(String label, Color color, VoidCallback? onTap, bool done) => GestureDetector(
    onTap: onTap,
    child: Padding(
      padding: EdgeInsets.symmetric(horizontal: 14),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (done) ...[
            Icon(PhosphorIconsFill.checkCircle, size: 14, color: color),
            const SizedBox(width: 4),
          ],
          Text(label, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: onTap != null ? color : HG.textLight)),
        ],
      ),
    ),
  );
}

// ── Country code picker ──

class _CodePicker extends StatefulWidget {
  const _CodePicker();
  @override
  State<_CodePicker> createState() => _CodePickerState();
}

class _M3CredButton extends StatefulWidget {
  final String label;
  final bool enabled;
  final VoidCallback onTap;
  const _M3CredButton({required this.label, required this.enabled, required this.onTap});
  @override
  State<_M3CredButton> createState() => _M3CredButtonState();
}

class _M3CredButtonState extends State<_M3CredButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => _pressed = true),
      onTapUp: (_) { setState(() => _pressed = false); widget.onTap(); },
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
              color: HG.blue,
              borderRadius: BorderRadius.circular(100),
              boxShadow: widget.enabled ? [
                BoxShadow(color: HG.blue.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)),
                BoxShadow(color: HG.blue.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1)),
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

class _CodePickerState extends State<_CodePicker> {
  static const _codes = [
    ('+91', 'India'), ('+1', 'United States'), ('+44', 'United Kingdom'), ('+61', 'Australia'),
    ('+971', 'UAE'), ('+966', 'Saudi Arabia'), ('+65', 'Singapore'), ('+60', 'Malaysia'),
    ('+977', 'Nepal'), ('+94', 'Sri Lanka'), ('+880', 'Bangladesh'), ('+92', 'Pakistan'),
    ('+86', 'China'), ('+81', 'Japan'), ('+82', 'South Korea'), ('+49', 'Germany'),
    ('+33', 'France'), ('+39', 'Italy'), ('+34', 'Spain'), ('+7', 'Russia'),
    ('+55', 'Brazil'), ('+27', 'South Africa'), ('+234', 'Nigeria'), ('+254', 'Kenya'),
    ('+63', 'Philippines'), ('+62', 'Indonesia'), ('+66', 'Thailand'), ('+84', 'Vietnam'),
    ('+52', 'Mexico'), ('+54', 'Argentina'),
  ];
  String _q = '';
  List<(String, String)> get _filtered => _q.isEmpty ? _codes
      : _codes.where((c) => c.$1.contains(_q) || c.$2.toLowerCase().contains(_q.toLowerCase())).toList();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.of(context).padding.bottom),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        const SizedBox(height: 12),
        Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
        Padding(
          padding: EdgeInsets.fromLTRB(20, 16, 20, 8),
          child: TextField(
            onChanged: (v) => setState(() => _q = v),
            style: TextStyle(fontSize: 14, color: HG.dark),
            decoration: InputDecoration(
              hintText: 'Search country or code', hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
              prefixIcon: Icon(PhosphorIconsRegular.magnifyingGlass, size: 18, color: HG.textLight),
              prefixIconConstraints: const BoxConstraints(minWidth: 42),
              filled: true, fillColor: HG.grey100,
              contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
            ),
          ),
        ),
        Flexible(child: ListView.builder(
          shrinkWrap: true, itemCount: _filtered.length,
          itemBuilder: (_, i) {
            final c = _filtered[i];
            return ListTile(dense: true, title: Text('${c.$2}  ${c.$1}', style: TextStyle(fontSize: 14, color: HG.dark)),
              onTap: () => Navigator.pop(context, c.$1));
          },
        )),
      ]),
    );
  }
}
