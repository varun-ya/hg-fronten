import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../theme.dart';
import '../../models/user_session.dart';
import '../dashboard/dashboard_page.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _id = TextEditingController();
  final _pass = TextEditingController();
  final _idFocus = FocusNode();
  final _passFocus = FocusNode();
  bool _hide = true;
  bool _tried = false;
  bool _forgotMode = false;
  bool _resetSent = false;
  String? _loginError;
  bool _loading = false;

  String? get _idErr {
    final v = _id.text.trim();
    if (v.isEmpty) return 'Required';
    if (!RegExp(r'^[\w\.-]+@[\w\.-]+\.\w{2,}$').hasMatch(v) && v.replaceAll(RegExp(r'\D'), '').length < 7) return 'Invalid';
    return null;
  }
  String? get _passErr => _pass.text.length < 6 ? 'Min 6 chars' : null;
  bool get _canLogin => _idErr == null && _passErr == null;
  bool get _canReset => _idErr == null;

  @override
  void dispose() { _id.dispose(); _pass.dispose(); _idFocus.dispose(); _passFocus.dispose(); super.dispose(); }

  void _login() {
    setState(() => _tried = true);
    if (!_canLogin) return;
    HapticFeedback.mediumImpact();
    setState(() { _loading = true; _loginError = null; });
    Future.delayed(const Duration(milliseconds: 800), () {
      if (!mounted) return;
      final email = _id.text.trim().toLowerCase();
      final pass = _pass.text;
      DashboardRole? role;
      if (email == 'tutor@mail.com' && pass == '12345678') {
        role = DashboardRole.tutor;
        UserSession.name = 'Ayush Soni';
        UserSession.email = email;
        UserSession.role = 'tutor';
      }
      if (email == 'student@mail.com' && pass == '12345678') {
        role = DashboardRole.student;
        UserSession.name = 'Ravi Kumar';
        UserSession.email = email;
        UserSession.role = 'student';
      }
      if (role != null) {
        Navigator.pushAndRemoveUntil(context,
          PageRouteBuilder(pageBuilder: (_, __, ___) => DashboardPage(role: role!),
            transitionDuration: const Duration(milliseconds: 500),
            transitionsBuilder: (_, anim, __, child) => FadeTransition(opacity: CurvedAnimation(parent: anim, curve: Curves.easeOutCubic), child: child)),
          (_) => false);
      } else {
        setState(() { _loading = false; _loginError = 'Invalid email or password'; });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final pb = MediaQuery.of(context).padding.bottom;
    return PopScope(
      canPop: !_forgotMode,
      onPopInvokedWithResult: (didPop, _) { if (!didPop && _forgotMode) setState(() { _forgotMode = false; _resetSent = false; _tried = false; }); },
      child: AnnotatedRegion<SystemUiOverlayStyle>(
        value: context.hgSystemUi,
        child: Scaffold(
          backgroundColor: HG.surface,
          resizeToAvoidBottomInset: true,
          body: AnimatedSwitcher(
            duration: const Duration(milliseconds: 300),
            switchInCurve: Curves.easeOutCubic,
            transitionBuilder: (child, anim) => FadeTransition(opacity: anim, child: child),
            child: _forgotMode ? _forgotView(pt, pb) : _loginView(pt, pb),
          ),
        ),
      ),
    );
  }

  Widget _loginView(double pt, double pb) {
    return Padding(
      key: const ValueKey('login'),
      padding: EdgeInsets.fromLTRB(16, pt + 20, 16, 0),
      child: Column(
        children: [
          // Top bar
          Row(
            children: [
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Container(width: 40, height: 40,
                  decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(12)),
                  child: Icon(PhosphorIconsBold.arrowLeft, size: 18, color: HG.dark)),
              ),
              const Spacer(),
              Image.asset('assets/profileHeader.png', height: 20),
              const Spacer(),
              const SizedBox(width: 40),
            ],
          ),
          const SizedBox(height: 24),
          // Card
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: HG.white,
                borderRadius: BorderRadius.circular(28),
                border: Border.all(color: HG.grey200),
              ),
              child: Column(
                children: [
                  // Header + Form
                  Expanded(
                    child: Center(
                      child: ListView(
                        padding: EdgeInsets.fromLTRB(24, 28, 24, 0),
                        physics: const BouncingScrollPhysics(),
                        shrinkWrap: true,
                        children: [
                        Text('Welcome back', textAlign: TextAlign.center, style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
                        const SizedBox(height: 4),
                        Text('Sign in to continue', textAlign: TextAlign.center, style: TextStyle(fontSize: 14, color: HG.textMuted)),
                        const SizedBox(height: 28),
                        _input(_id, 'Email or phone', icon: PhosphorIconsRegular.envelope, err: _idErr, kb: TextInputType.emailAddress, focus: _idFocus, nextFocus: _passFocus),
                        const SizedBox(height: 12),
                        _input(_pass, 'Password', icon: PhosphorIconsRegular.lock, err: _passErr, obscure: true, focus: _passFocus),
                        Align(
                          alignment: Alignment.centerRight,
                          child: Padding(
                            padding: EdgeInsets.only(top: 10),
                            child: GestureDetector(
                              onTap: () => setState(() { _forgotMode = true; _tried = false; _resetSent = false; }),
                              child: Text('Forgot password?', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.blue)),
                            ),
                          ),
                        ),
                        if (_loginError != null) Padding(
                          padding: EdgeInsets.only(top: 14),
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                            decoration: BoxDecoration(
                              color: HG.red.withValues(alpha: 0.06),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: HG.red.withValues(alpha: 0.15)),
                            ),
                            child: Row(children: [
                              Icon(PhosphorIconsFill.warningCircle, size: 16, color: HG.red),
                              const SizedBox(width: 10),
                              Expanded(child: Text(_loginError!, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: HG.red))),
                            ]),
                          ),
                        ),
                      ],
                    ),
                    ),
                  ),
                  // Bottom buttons
                  Padding(
                    padding: EdgeInsets.fromLTRB(24, 12, 24, pb + 20),
                    child: Column(
                      children: [
                        _M3Btn(
                          label: 'Sign in',
                          color: HG.blue,
                          enabled: _canLogin && !_loading,
                          loading: _loading,
                          onTap: _login,
                        ),
                        const SizedBox(height: 12),
                        GestureDetector(
                          onTap: () => Navigator.pop(context),
                          child: Container(
                            width: double.infinity,
                            height: 56,
                            decoration: BoxDecoration(
                              color: HG.grey50,
                              borderRadius: BorderRadius.circular(100),
                              border: Border.all(color: HG.grey200),
                            ),
                            child: Center(
                              child: Text('Create account', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.dark)),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _forgotView(double pt, double pb) {
    return Padding(
      key: const ValueKey('forgot'),
      padding: EdgeInsets.fromLTRB(16, pt + 20, 16, 0),
      child: Column(
        children: [
          Row(
            children: [
              GestureDetector(
                onTap: () => setState(() { _forgotMode = false; _tried = false; }),
                child: Container(width: 40, height: 40,
                  decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(12)),
                  child: Icon(PhosphorIconsBold.arrowLeft, size: 18, color: HG.dark)),
              ),
              const Spacer(),
              Image.asset('assets/profileHeader.png', height: 20),
              const Spacer(),
              const SizedBox(width: 40),
            ],
          ),
          const SizedBox(height: 24),
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: HG.white,
                borderRadius: BorderRadius.circular(28),
                border: Border.all(color: HG.grey200),
              ),
              child: Column(
                children: [
                  Expanded(
                    child: Center(
                      child: ListView(
                        padding: EdgeInsets.fromLTRB(24, 28, 24, 0),
                        physics: const BouncingScrollPhysics(),
                        shrinkWrap: true,
                        children: [
                          Text('Reset password', textAlign: TextAlign.center, style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
                          const SizedBox(height: 4),
                          Text("We'll send a link to your email", textAlign: TextAlign.center, style: TextStyle(fontSize: 14, color: HG.textMuted)),
                          const SizedBox(height: 28),
                        _input(_id, 'Email', icon: PhosphorIconsRegular.envelope, err: _idErr, kb: TextInputType.emailAddress, enabled: !_resetSent),
                        if (_resetSent) Padding(
                          padding: EdgeInsets.only(top: 14),
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                            decoration: BoxDecoration(
                              color: HG.green.withValues(alpha: 0.06),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: HG.green.withValues(alpha: 0.15)),
                            ),
                            child: Row(children: [
                              Icon(PhosphorIconsFill.checkCircle, size: 16, color: HG.green),
                              const SizedBox(width: 10),
                              const Expanded(child: Text('Reset link sent — check your inbox', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: HG.green))),
                            ]),
                          ),
                        ),
                      ],
                    ),
                  )),
                  Padding(
                    padding: EdgeInsets.fromLTRB(24, 12, 24, pb + 20),
                    child: _M3Btn(
                      label: _resetSent ? 'Link sent' : 'Send reset link',
                      color: HG.orange,
                      enabled: _canReset && !_resetSent,
                      loading: false,
                      onTap: () { setState(() => _tried = true); if (_canReset && !_resetSent) { HapticFeedback.mediumImpact(); setState(() => _resetSent = true); } },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _input(TextEditingController c, String hint, {IconData? icon, String? err, TextInputType? kb, bool obscure = false, bool enabled = true, FocusNode? focus, FocusNode? nextFocus}) {
    final hasErr = _tried && err != null;
    return Container(
      decoration: BoxDecoration(
        color: enabled ? HG.grey50 : HG.grey100,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: hasErr ? HG.red : HG.grey200, width: hasErr ? 1.5 : 1),
      ),
      child: TextField(
        controller: c, keyboardType: kb, obscureText: obscure && _hide, enabled: enabled, focusNode: focus,
        textInputAction: nextFocus != null ? TextInputAction.next : TextInputAction.done,
        onSubmitted: (_) { if (nextFocus != null) nextFocus.requestFocus(); },
        onChanged: (_) => setState(() { _loginError = null; }),
        style: TextStyle(fontSize: 15, color: HG.dark, fontFamily: HG.font),
        decoration: InputDecoration(
          hintText: hint, hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
          contentPadding: EdgeInsets.symmetric(horizontal: 18, vertical: 16),
          border: InputBorder.none,
          prefixIcon: icon != null ? Padding(
            padding: EdgeInsets.only(left: 16, right: 12),
            child: Icon(icon, size: 20, color: HG.textLight),
          ) : null,
          prefixIconConstraints: const BoxConstraints(minWidth: 0, minHeight: 0),
          suffixIcon: obscure ? GestureDetector(
            onTap: () => setState(() => _hide = !_hide),
            child: Padding(
              padding: EdgeInsets.only(right: 14),
              child: Icon(_hide ? PhosphorIconsRegular.eyeSlash : PhosphorIconsRegular.eye, size: 20, color: HG.textLight),
            ),
          ) : null,
          suffixIconConstraints: const BoxConstraints(minWidth: 0, minHeight: 0),
        ),
      ),
    );
  }
}

class _M3Btn extends StatefulWidget {
  final String label;
  final Color color;
  final bool enabled;
  final bool loading;
  final VoidCallback onTap;
  const _M3Btn({required this.label, required this.color, required this.enabled, required this.loading, required this.onTap});
  @override
  State<_M3Btn> createState() => _M3BtnState();
}

class _M3BtnState extends State<_M3Btn> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: widget.enabled ? (_) => setState(() => _pressed = true) : null,
      onTapUp: widget.enabled ? (_) { setState(() => _pressed = false); widget.onTap(); } : null,
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.97 : 1.0,
        duration: const Duration(milliseconds: 100),
        curve: Curves.easeOut,
        child: AnimatedOpacity(
          duration: const Duration(milliseconds: 250),
          opacity: widget.enabled ? 1.0 : 0.35,
          child: Container(
            width: double.infinity,
            height: 56,
            decoration: BoxDecoration(
              color: widget.color,
              borderRadius: BorderRadius.circular(100),
              boxShadow: widget.enabled ? [
                BoxShadow(color: widget.color.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)),
                BoxShadow(color: widget.color.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1)),
              ] : null,
            ),
            child: Center(
              child: widget.loading
                  ? SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5, color: HG.white))
                  : Text(widget.label, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white, letterSpacing: 0.1)),
            ),
          ),
        ),
      ),
    );
  }
}
