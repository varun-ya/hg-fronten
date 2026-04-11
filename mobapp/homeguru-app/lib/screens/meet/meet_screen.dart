import 'dart:collection';
import 'dart:convert';
import 'dart:io' show Platform;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../theme.dart';

enum MeetRole { learner, tutor }

class MeetScreen extends StatefulWidget {
  final MeetRole role;
  final String userName;
  final String meetingId;
  const MeetScreen({super.key, required this.role, required this.userName, required this.meetingId});
  @override
  State<MeetScreen> createState() => _MeetScreenState();
}

class _MeetScreenState extends State<MeetScreen> {
  InAppWebViewController? _ctrl;
  bool _loaded = false;
  bool _error = false;
  bool _permOk = false;
  bool _permDone = false;
  bool _joined = false;
  bool _mic = true;
  bool _cam = true;
  double _prog = 0;

  static const _base = 'https://meet.homeguruworld.com';

  String _buildUrl(bool dark) =>
      '$_base/meeting/${widget.meetingId}?name=${Uri.encodeComponent(widget.userName)}&role=${widget.role.name}&dark=${dark ? 1 : 0}';

  @override
  void initState() {
    super.initState();
    _askPerms();
  }

  Future<void> _askPerms() async {
    final r = await [Permission.camera, Permission.microphone].request();
    if (!mounted) return;
    setState(() {
      _permOk = r[Permission.camera]!.isGranted && r[Permission.microphone]!.isGranted;
      _permDone = true;
    });
  }

  // ── Theme helpers ──
  bool get _dark => Theme.of(context).brightness == Brightness.dark;
  Color get _bg => _dark ? Colors.black : const Color(0xFFF5F5F5);
  Color get _dockBg => _dark ? Colors.black : Colors.white;
  Color get _text => _dark ? Colors.white : const Color(0xFF1A1A1A);
  Color get _muted => _dark ? Colors.white60 : const Color(0xFF6B7280);

  String get _themeCss => '';

  // ── Bridge ──
  void _js(String code) => _ctrl?.evaluateJavascript(source: code);
  void _send(String type) => _js('window.postMessage(JSON.stringify({source:"flutter",type:"$type",data:{}}), "*")');

  void _onBridge(String raw) {
    try {
      final m = jsonDecode(raw);
      switch (m['type']) {
        case 'meeting_joined':
          if (mounted) setState(() => _joined = true);
        case 'leave_call':
        case 'meeting_left':
          if (mounted) Navigator.pop(context);
        case 'mic_toggle':
          if (m['data'] != null && mounted) setState(() => _mic = m['data']['micOn'] ?? _mic);
        case 'cam_toggle':
          if (m['data'] != null && mounted) setState(() => _cam = m['data']['cameraOn'] ?? _cam);
      }
    } catch (_) {}
  }

  // ── Leave modal ──
  Future<bool> _onBack() async {
    if (_ctrl == null || !mounted) return true;
    final dark = _dark;
    final sheetBg = dark ? const Color(0xFF1A1A1A) : Colors.white;
    final sheetText = dark ? Colors.white : const Color(0xFF1A1A1A);
    final sheetMuted = dark ? Colors.white60 : const Color(0xFF6B7280);
    final stayBg = dark ? Colors.white10 : const Color(0xFFF3F4F6);
    final stayBorder = dark ? Colors.white12 : const Color(0xFFE5E7EB);

    return await showModalBottomSheet<bool>(
      context: context, backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        decoration: BoxDecoration(color: sheetBg, borderRadius: BorderRadius.vertical(top: Radius.circular(28))),
        padding: EdgeInsets.fromLTRB(24, 0, 24, 32),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          const SizedBox(height: 10),
          Container(width: 40, height: 4, decoration: BoxDecoration(color: sheetMuted.withValues(alpha: 0.3), borderRadius: BorderRadius.circular(2))),
          const SizedBox(height: 20),
          Text('Leave call?', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: sheetText)),
          const SizedBox(height: 6),
          Text('Are you sure you want to leave this meeting?', style: TextStyle(fontSize: 14, color: sheetMuted)),
          const SizedBox(height: 20),
          Row(children: [
            Expanded(child: GestureDetector(onTap: () => Navigator.pop(ctx, false),
              child: Container(height: 48, decoration: BoxDecoration(color: stayBg, borderRadius: BorderRadius.circular(100), border: Border.all(color: stayBorder)),
                child: Center(child: Text('Stay', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: sheetText)))))),
            const SizedBox(width: 12),
            Expanded(child: GestureDetector(onTap: () => Navigator.pop(ctx, true),
              child: Container(height: 48, decoration: BoxDecoration(color: const Color(0xFFDC2626), borderRadius: BorderRadius.circular(100)),
                child: Center(child: Text('Leave', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.white)))))),
          ]),
        ]),
      ),
    ) ?? false;
  }

  // ── Build ──
  @override
  Widget build(BuildContext context) {
    if (!_permDone) return Scaffold(backgroundColor: _bg, body: Center(child: CircularProgressIndicator(color: HG.orange, strokeWidth: 2)));
    if (!_permOk) return _permScreen();

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (d, _) async { if (!d) { final go = await _onBack(); if (go && mounted) Navigator.pop(context); } },
      child: AnnotatedRegion<SystemUiOverlayStyle>(
        value: context.hgSystemUi,
        child: Scaffold(
          backgroundColor: _bg,
          resizeToAvoidBottomInset: false,
          body: Column(children: [
            if (!Platform.isAndroid) SizedBox(height: MediaQuery.of(context).padding.top),
            Expanded(child: ClipRect(child: _webView())),
            if (_joined) _dock(),
          ]),
        ),
      ),
    );
  }

  Widget _webView() {
    return Stack(children: [
      Positioned.fill(
        child: InAppWebView(
          initialUrlRequest: URLRequest(url: WebUri(_buildUrl(_dark))),
          initialUserScripts: UnmodifiableListView([
            UserScript(
              source: 'var m=document.createElement("meta");m.name="viewport";m.content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover";document.head.appendChild(m);',
              injectionTime: UserScriptInjectionTime.AT_DOCUMENT_START,
            ),
          ]),
          initialSettings: InAppWebViewSettings(
            javaScriptEnabled: true,
            domStorageEnabled: true,
            mediaPlaybackRequiresUserGesture: false,
            allowsInlineMediaPlayback: true,
            useHybridComposition: !Platform.isAndroid,
            hardwareAcceleration: true,
            overScrollMode: OverScrollMode.NEVER,
            disableVerticalScroll: true,
            disableHorizontalScroll: true,
            supportZoom: false,
            userAgent: 'Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36 HomeGuruApp/1.0',
          ),
          onWebViewCreated: (c) {
            _ctrl = c;
            c.addJavaScriptHandler(handlerName: 'FlutterBridge', callback: (a) {
              if (a.isNotEmpty) _onBridge(a[0] is String ? a[0] : a[0].toString());
            });
          },
          onLoadStart: (_, __) {
            if (mounted) setState(() { _prog = 0; _error = false; });
          },
          onProgressChanged: (_, p) { if (mounted) setState(() => _prog = p / 100); },
          onLoadStop: (c, __) async {
            if (mounted) setState(() { _prog = 1; _loaded = true; });
            await c.evaluateJavascript(source:
              'document.body.style.cssText="margin:0;padding:0;overflow:hidden;height:100vh;max-height:100vh";'
              'document.documentElement.style.cssText="overflow:hidden;height:100vh;max-height:100vh";'
            );
          },
          onReceivedError: (_, __, ___) { if (mounted) setState(() => _error = true); },
          onPermissionRequest: (_, r) async => PermissionResponse(resources: r.resources, action: PermissionResponseAction.GRANT),
          onConsoleMessage: (_, m) => debugPrint('[Meet] ${m.message}'),
        ),
      ),
      if (!_loaded) Positioned.fill(child: Container(color: _bg, child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
        SizedBox(width: 28, height: 28, child: CircularProgressIndicator(strokeWidth: 2, color: _text)),
        SizedBox(height: 14),
        Text('Connecting...', style: TextStyle(fontSize: 14, color: _muted)),
      ])))),
      if (_error && !_loaded) Positioned.fill(child: Container(color: _bg, child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
        Icon(PhosphorIconsRegular.wifiSlash, size: 40, color: _muted),
        const SizedBox(height: 14),
        Text('Connection failed', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: _text)),
        const SizedBox(height: 16),
        GestureDetector(onTap: () { _ctrl?.reload(); setState(() => _error = false); },
          child: Container(padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10), decoration: BoxDecoration(color: _text.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100)),
            child: Text('Retry', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: _text)))),
      ])))),
      if (_prog < 1 && !_error) Positioned(top: 0, left: 0, right: 0,
        child: LinearProgressIndicator(value: _prog, minHeight: 2, backgroundColor: Colors.transparent, color: HG.orange)),
    ]);
  }

  Widget _dock() {
    final btnOn = _dark ? const Color(0xFF2A2A2A) : const Color(0xFFE5E7EB);
    final btnOff = const Color(0xFFF2D7D5);
    final iconOn = _dark ? Colors.white : const Color(0xFF1A1A1A);
    final iconOff = const Color(0xFF5C2018);

    return Container(
      color: _dockBg,
      height: 64,
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
        _btn(_cam ? PhosphorIconsBold.videoCamera : PhosphorIconsBold.videoCameraSlash, _cam, () { _send('cam_toggle'); setState(() => _cam = !_cam); }, btnOn, btnOff, iconOn, iconOff),
        _btn(_mic ? PhosphorIconsBold.microphone : PhosphorIconsBold.microphoneSlash, _mic, () { _send('mic_toggle'); setState(() => _mic = !_mic); }, btnOn, btnOff, iconOn, iconOff),
        _btn(PhosphorIconsBold.dotsThreeVertical, true, () => _send('more_toggle'), btnOn, btnOff, iconOn, iconOff),
        GestureDetector(
          onTap: () async { final go = await _onBack(); if (go && mounted) Navigator.pop(context); },
          child: Container(height: 44, width: 64, decoration: BoxDecoration(color: const Color(0xFFDC2626), borderRadius: BorderRadius.circular(100)),
            child: Center(child: Icon(PhosphorIconsBold.phoneDisconnect, size: 20, color: Colors.white))),
        ),
      ]),
    );
  }

  Widget _btn(IconData i, bool on, VoidCallback f, Color onBg, Color offBg, Color onIcon, Color offIcon) => GestureDetector(
    onTap: () { HapticFeedback.mediumImpact(); f(); },
    child: Container(width: 48, height: 48, decoration: BoxDecoration(color: on ? onBg : offBg, shape: BoxShape.circle),
      child: Icon(i, size: 20, color: on ? onIcon : offIcon)),
  );

  Widget _permScreen() {
    return Scaffold(backgroundColor: _bg, body: Center(child: Padding(padding: EdgeInsets.all(32), child: Column(mainAxisSize: MainAxisSize.min, children: [
      Icon(PhosphorIconsRegular.videoCameraSlash, size: 48, color: _muted),
      const SizedBox(height: 20),
      Text('Camera & Mic Required', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: _text)),
      const SizedBox(height: 8),
      Text('Allow access to join the meeting.', textAlign: TextAlign.center, style: TextStyle(fontSize: 14, color: _muted)),
      const SizedBox(height: 24),
      GestureDetector(onTap: () => openAppSettings(), child: Container(padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12), decoration: BoxDecoration(color: HG.orange, borderRadius: BorderRadius.circular(100)), child: Text('Open Settings', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.white)))),
      const SizedBox(height: 12),
      GestureDetector(onTap: _askPerms, child: Container(padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12), decoration: BoxDecoration(color: _text.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(100)), child: Text('Try Again', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: _text)))),
      const SizedBox(height: 16),
      GestureDetector(onTap: () => Navigator.pop(context), child: Text('Go Back', style: TextStyle(fontSize: 13, color: _muted.withValues(alpha: 0.5)))),
    ]))));
  }
}
