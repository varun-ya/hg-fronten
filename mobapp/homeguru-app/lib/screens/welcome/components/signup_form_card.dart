import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../theme.dart';

const _categories = [
  'Primary Student',
  'Secondary Student',
  'Sr. Secondary Student',
  'Competitive Exam Student',
  'Working Professional',
  'Homemaker',
  'Sr. Citizen',
];

class SignupFormCard extends StatefulWidget {
  final double pb;
  final VoidCallback onSubmit;
  const SignupFormCard({super.key, required this.pb, required this.onSubmit});

  @override
  State<SignupFormCard> createState() => _SignupFormCardState();
}

class _SignupFormCardState extends State<SignupFormCard> {
  final _first = TextEditingController();
  final _last = TextEditingController();
  final _email = TextEditingController();
  final _phone = TextEditingController();
  final _pass = TextEditingController();
  final _otp = TextEditingController();

  String _countryCode = '+91';

  DateTime? _dob;
  int? _gender;
  int? _category;
  bool _hide = true;
  bool _otpSent = false;
  bool _otpOk = false;
  bool _emailSent = false;
  bool _tried = false;

  // Validation
  String? _nameErr(String v) => v.trim().length < 2 ? (v.trim().isEmpty ? 'Required' : 'Too short') : null;
  String? get _emailErr {
    final v = _email.text.trim();
    if (v.isEmpty) return 'Required';
    if (!RegExp(r'^[\w\.-]+@[\w\.-]+\.\w{2,}$').hasMatch(v)) return 'Invalid';
    return null;
  }
  String? get _phoneErr {
    final digits = _phone.text.replaceAll(RegExp(r'\D'), '');
    if (digits.length < 7 || digits.length > 15) return 'Invalid number';
    return null;
  }
  String? get _passErr => _pass.text.length < 6 ? 'Min 6 chars' : null;

  bool get _canSubmit =>
      _nameErr(_first.text) == null && _nameErr(_last.text) == null &&
      _emailErr == null && _phoneErr == null && _passErr == null &&
      _dob != null && _gender != null && _category != null && _otpOk;

  int _age(DateTime d) {
    final n = DateTime.now();
    int a = n.year - d.year;
    if (n.month < d.month || (n.month == d.month && n.day < d.day)) a--;
    return a;
  }

  int _guessCategory(int age) {
    if (age <= 10) return 0;
    if (age <= 15) return 1;
    if (age <= 18) return 2;
    if (age <= 25) return 3;
    if (age <= 60) return 4;
    return 6;
  }

  Future<void> _pickDob() async {
    final now = DateTime.now();
    final d = await showDatePicker(
      context: context,
      initialDate: _dob ?? DateTime(now.year - 15),
      firstDate: DateTime(1940), lastDate: now,
    );
    if (d == null || !mounted) return;
    final a = _age(d);
    setState(() {
      _dob = d;
      _category = _guessCategory(a);
      if (_gender == 1 && a > 25 && a <= 60) _category = 5;
    });
  }

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
    _first.dispose(); _last.dispose(); _email.dispose();
    _phone.dispose(); _pass.dispose(); _otp.dispose();
    super.dispose();
  }

  // ── Tile-style input matching option tiles ──
  Widget _tile({
    required TextEditingController ctrl,
    required String hint,
    String? error,
    TextInputType? keyboard,
    bool obscure = false,
    bool enabled = true,
    Widget? trailing,
  }) {
    final hasErr = _tried && error != null;
    return Container(
      decoration: BoxDecoration(
        color: enabled ? HG.white : HG.grey100,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: hasErr ? HG.red : HG.border, width: hasErr ? 1.5 : 1),
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: ctrl,
              keyboardType: keyboard,
              obscureText: obscure && _hide,
              enabled: enabled,
              onChanged: (_) => setState(() {}),
              style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
              decoration: InputDecoration(
                hintText: hint,
                hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
                contentPadding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                border: InputBorder.none,
                suffixIcon: obscure ? GestureDetector(
                  onTap: () => setState(() => _hide = !_hide),
                  child: Icon(_hide ? Icons.visibility_off_outlined : Icons.visibility_outlined, size: 18, color: HG.textLight),
                ) : null,
              ),
            ),
          ),
          if (trailing != null) ...[
            Container(width: 1, height: 28, color: HG.border),
            trailing,
          ],
        ],
      ),
    );
  }

  // ── Small action button inside a tile ──
  Widget _action(String label, Color color, VoidCallback? onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 14),
        child: Text(label, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: onTap != null ? color : HG.textLight)),
      ),
    );
  }

  // ── Selectable chip (gender) ──
  Widget _chip(String label, bool on, VoidCallback onTap) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOutCubic,
          padding: EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(
            color: on ? HG.blue.withValues(alpha: 0.1) : HG.white,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: on ? HG.blue : HG.border, width: on ? 2 : 1),
          ),
          child: Center(
            child: Text(label, style: TextStyle(
              fontSize: 14,
              fontWeight: on ? FontWeight.w600 : FontWeight.w400,
              color: on ? HG.blue : HG.dark,
            )),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
          color: HG.white,
          border: Border.all(color: HG.grey200),
          borderRadius: BorderRadius.circular(28),
        ),
        child: Column(
          children: [
                const SizedBox(height: 28),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 28),
                  child: Text('Create your account', textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: HG.dark)),
                ),
                const SizedBox(height: 6),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 32),
                  child: Text('Takes 30 seconds. No credit card.', textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 13, color: HG.textMuted)),
                ),
                const SizedBox(height: 20),

                Expanded(
                  child: ListView(
                    padding: EdgeInsets.symmetric(horizontal: 24),
                    physics: const BouncingScrollPhysics(),
                    children: [
                      // Name
                      Row(children: [
                        Expanded(child: _tile(ctrl: _first, hint: 'First name', error: _nameErr(_first.text))),
                        const SizedBox(width: 8),
                        Expanded(child: _tile(ctrl: _last, hint: 'Last name', error: _nameErr(_last.text))),
                      ]),
                      const SizedBox(height: 8),

                      // DOB
                      GestureDetector(
                        onTap: _pickDob,
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          padding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                          decoration: BoxDecoration(
                            color: HG.white,
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: _dob != null ? HG.blue : (_tried && _dob == null ? HG.red : HG.border), width: _dob != null ? 2 : 1),
                          ),
                          child: Row(children: [
                            Icon(Icons.cake_outlined, size: 18, color: _dob != null ? HG.blue : HG.textLight),
                            const SizedBox(width: 10),
                            Text(
                              _dob != null ? '${_dob!.day}/${_dob!.month}/${_dob!.year}  ·  ${_age(_dob!)} yrs' : 'Date of birth',
                              style: TextStyle(fontSize: 14, fontWeight: _dob != null ? FontWeight.w600 : FontWeight.w400, color: _dob != null ? HG.blue : HG.textLight),
                            ),
                            if (_dob != null) ...[const Spacer(), Icon(Icons.check_circle_rounded, size: 18, color: HG.blue)],
                          ]),
                        ),
                      ),
                      const SizedBox(height: 8),

                      // Gender
                      Row(children: [
                        _chip('Male', _gender == 0, () { HapticFeedback.selectionClick(); setState(() => _gender = 0); }),
                        const SizedBox(width: 8),
                        _chip('Female', _gender == 1, () { HapticFeedback.selectionClick(); setState(() { _gender = 1; if (_dob != null && _age(_dob!) > 25 && _age(_dob!) <= 60) _category = 5; }); }),
                        const SizedBox(width: 8),
                        _chip('Other', _gender == 2, () { HapticFeedback.selectionClick(); setState(() => _gender = 2); }),
                      ]),
                      const SizedBox(height: 8),

                      // Category
                      AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        padding: EdgeInsets.symmetric(horizontal: 18),
                        decoration: BoxDecoration(
                          color: HG.white,
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: _category != null ? HG.blue : (_tried && _category == null ? HG.red : HG.border), width: _category != null ? 2 : 1),
                        ),
                        child: DropdownButtonHideUnderline(child: DropdownButton<int>(
                          value: _category, isExpanded: true,
                          hint: Text('I am a...', style: TextStyle(fontSize: 14, color: HG.textLight)),
                          icon: Icon(Icons.keyboard_arrow_down_rounded, size: 20, color: HG.textLight),
                          style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
                          borderRadius: BorderRadius.circular(14),
                          items: List.generate(_categories.length, (i) => DropdownMenuItem(value: i, child: Text(_categories[i]))),
                          onChanged: (v) => setState(() => _category = v),
                        )),
                      ),
                      const SizedBox(height: 8),

                      // Phone + OTP
                      Row(children: [
                        // Country code
                        GestureDetector(
                          onTap: () async {
                            final code = await showModalBottomSheet<String>(
                              context: context,
                              backgroundColor: HG.white,
                              shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
                              builder: (_) => const _CountryCodePicker(),
                            );
                            if (code != null && mounted) setState(() => _countryCode = code);
                          },
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                            decoration: BoxDecoration(
                              color: HG.white,
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(color: HG.border),
                            ),
                            child: Row(mainAxisSize: MainAxisSize.min, children: [
                              Text(_countryCode, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: HG.dark)),
                              const SizedBox(width: 4),
                              Icon(Icons.keyboard_arrow_down_rounded, size: 16, color: HG.textLight),
                            ]),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(child: _tile(
                          ctrl: _phone, hint: 'Phone number', error: _phoneErr,
                          keyboard: TextInputType.phone, enabled: !_otpOk,
                        )),
                        const SizedBox(width: 8),
                        GestureDetector(
                          onTap: _otpOk ? null : _sendOtp,
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                            decoration: BoxDecoration(
                              color: _otpOk ? HG.green : HG.blue,
                              borderRadius: BorderRadius.circular(14),
                            ),
                            child: Text(
                              _otpOk ? '✓' : _otpSent ? 'Resend' : 'OTP',
                              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.white),
                            ),
                          ),
                        ),
                      ]),
                      if (_otpSent && !_otpOk) ...[
                        const SizedBox(height: 8),
                        _tile(
                          ctrl: _otp, hint: 'Enter OTP', keyboard: TextInputType.number,
                          trailing: _action('Verify', HG.green, _verifyOtp),
                        ),
                      ],
                      const SizedBox(height: 8),

                      // Email
                      _tile(
                        ctrl: _email, hint: 'Email address', error: _emailErr,
                        keyboard: TextInputType.emailAddress,
                        trailing: _action(
                          _emailSent ? '✓ Sent' : 'Verify',
                          _emailSent ? HG.green : HG.orange,
                          _emailSent ? null : _sendEmailLink,
                        ),
                      ),
                      const SizedBox(height: 8),

                      // Password
                      _tile(ctrl: _pass, hint: 'Password', error: _passErr, obscure: true),
                      const SizedBox(height: 8),
                    ],
                  ),
                ),

                // Submit
                Padding(
                  padding: EdgeInsets.fromLTRB(24, 4, 24, widget.pb + 20),
                  child: GestureDetector(
                    onTap: () {
                      setState(() => _tried = true);
                      if (_canSubmit) { HapticFeedback.mediumImpact(); widget.onSubmit(); }
                    },
                    child: Container(
                      width: double.infinity,
                      padding: EdgeInsets.symmetric(vertical: 16),
                      decoration: BoxDecoration(
                        color: HG.blue,
                        borderRadius: BorderRadius.circular(100),
                        boxShadow: [BoxShadow(color: HG.blueDark, offset: const Offset(0, 4))],
                      ),
                      child: Center(child: Text('Create Account', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.white))),
                    ),
                  ),
                ),
              ],
            ),
    );
  }
}


class _CountryCodePicker extends StatefulWidget {
  const _CountryCodePicker();

  @override
  State<_CountryCodePicker> createState() => _CountryCodePickerState();
}

class _CountryCodePickerState extends State<_CountryCodePicker> {
  static const _codes = [
    ('+91', 'India'),
    ('+1', 'United States'),
    ('+44', 'United Kingdom'),
    ('+61', 'Australia'),
    ('+971', 'UAE'),
    ('+966', 'Saudi Arabia'),
    ('+65', 'Singapore'),
    ('+60', 'Malaysia'),
    ('+977', 'Nepal'),
    ('+94', 'Sri Lanka'),
    ('+880', 'Bangladesh'),
    ('+92', 'Pakistan'),
    ('+86', 'China'),
    ('+81', 'Japan'),
    ('+82', 'South Korea'),
    ('+49', 'Germany'),
    ('+33', 'France'),
    ('+39', 'Italy'),
    ('+34', 'Spain'),
    ('+7', 'Russia'),
    ('+55', 'Brazil'),
    ('+27', 'South Africa'),
    ('+234', 'Nigeria'),
    ('+254', 'Kenya'),
    ('+63', 'Philippines'),
    ('+62', 'Indonesia'),
    ('+66', 'Thailand'),
    ('+84', 'Vietnam'),
    ('+52', 'Mexico'),
    ('+54', 'Argentina'),
  ];

  String _search = '';

  List<(String, String)> get _filtered => _search.isEmpty
      ? _codes
      : _codes.where((c) => c.$1.contains(_search) || c.$2.toLowerCase().contains(_search.toLowerCase())).toList();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.of(context).padding.bottom),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const SizedBox(height: 12),
          Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
          Padding(
            padding: EdgeInsets.fromLTRB(20, 16, 20, 8),
            child: TextField(
              onChanged: (v) => setState(() => _search = v),
              style: TextStyle(fontSize: 14, color: HG.dark),
              decoration: InputDecoration(
                hintText: 'Search country or code',
                hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
                prefixIcon: Icon(Icons.search_rounded, size: 18, color: HG.textLight),
                prefixIconConstraints: const BoxConstraints(minWidth: 42),
                filled: true,
                fillColor: HG.grey100,
                contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
              ),
            ),
          ),
          Flexible(
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: _filtered.length,
              itemBuilder: (_, i) {
                final c = _filtered[i];
                return ListTile(
                  dense: true,
                  title: Text('${c.$2}  ${c.$1}', style: TextStyle(fontSize: 14, color: HG.dark)),
                  onTap: () => Navigator.pop(context, c.$1),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
