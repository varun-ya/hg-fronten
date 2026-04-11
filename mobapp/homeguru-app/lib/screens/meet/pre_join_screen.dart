import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../theme.dart';
import 'meet_screen.dart';

// Fixed colors — meet screens always look the same regardless of theme
const _bg = Color(0xFFFFFFFF);
const _card = Color(0xFFF9FAFB);
const _dark = Color(0xFF1A1A1A);
const _muted = Color(0xFF6B7280);
const _light = Color(0xFF9CA3AF);
const _border = Color(0xFFE5E7EB);
const _red = Color(0xFFEF4444);

class PreJoinScreen extends StatefulWidget {
  final MeetRole role;
  final String userName;
  final String? prefillCode;
  const PreJoinScreen({super.key, required this.role, required this.userName, this.prefillCode});

  @override
  State<PreJoinScreen> createState() => _PreJoinScreenState();
}

class _PreJoinScreenState extends State<PreJoinScreen> {
  final _code = TextEditingController();
  int _mode = 0;
  bool _loading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    if (widget.prefillCode != null) {
      _code.text = widget.prefillCode!;
      _mode = 1;
    }
  }

  static const _api = 'https://kdsbg9ngh4.execute-api.ap-south-1.amazonaws.com/prod';

  Future<void> _createMeeting() async {
    HapticFeedback.mediumImpact();
    setState(() { _loading = true; _error = null; });
    try {
      final res = await http.post(Uri.parse('$_api/rooms'), headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'hostName': widget.userName})).timeout(const Duration(seconds: 8));
      final data = jsonDecode(res.body);
      if (data['roomId'] != null && mounted) {
        Navigator.push(context, MaterialPageRoute(builder: (_) => MeetScreen(role: widget.role, userName: widget.userName, meetingId: data['roomId'])));
      } else {
        setState(() => _error = 'Failed to create meeting');
      }
    } catch (_) {
      setState(() => _error = 'Network error. Try again.');
    }
    if (mounted) setState(() => _loading = false);
  }

  Future<void> _joinMeeting() async {
    final code = _code.text.trim();
    if (code.isEmpty) return;
    HapticFeedback.mediumImpact();
    setState(() { _loading = true; _error = null; });
    try {
      final res = await http.get(Uri.parse('$_api/rooms/$code')).timeout(const Duration(seconds: 8));
      if (res.statusCode == 200 && mounted) {
        Navigator.push(context, MaterialPageRoute(builder: (_) => MeetScreen(role: widget.role, userName: widget.userName, meetingId: code)));
      } else {
        setState(() => _error = 'Meeting not found');
      }
    } catch (_) {
      setState(() => _error = 'Meeting not found');
    }
    if (mounted) setState(() => _loading = false);
  }

  @override
  void dispose() { _code.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: const SystemUiOverlayStyle(
        statusBarColor: _bg, statusBarIconBrightness: Brightness.dark,
        systemNavigationBarColor: _bg, systemNavigationBarIconBrightness: Brightness.dark,
      ),
      child: Scaffold(
        backgroundColor: _bg,
        body: ListView(
          padding: EdgeInsets.fromLTRB(24, pt + 16, 24, 40),
          physics: const BouncingScrollPhysics(),
          children: [
            Align(alignment: Alignment.centerLeft, child: GestureDetector(
              onTap: () => Navigator.pop(context),
              child: Container(width: 36, height: 36, decoration: BoxDecoration(color: _card, shape: BoxShape.circle),
                child: Icon(Icons.arrow_back_rounded, size: 16, color: _dark)),
            )),
            const SizedBox(height: 32),
            Center(child: Container(
              width: 56, height: 56,
              decoration: BoxDecoration(color: _card, borderRadius: BorderRadius.circular(16)),
              child: Icon(PhosphorIconsFill.videoCamera, size: 24, color: _dark),
            )),
            const SizedBox(height: 16),
            Center(child: Text('OneOnOne', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: _dark))),
            const SizedBox(height: 4),
            Center(child: Text('HomeGuru \u00b7 Video Conferencing', style: TextStyle(fontSize: 12, color: _light))),
            const SizedBox(height: 4),
            Center(child: Container(
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(color: widget.role == MeetRole.tutor ? HG.orange.withValues(alpha: 0.08) : HG.fixedBlue.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(100)),
              child: Text(widget.role == MeetRole.tutor ? 'Tutor' : 'Learner',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: widget.role == MeetRole.tutor ? HG.orange : HG.fixedBlue)),
            )),
            const SizedBox(height: 28),
            Container(
              height: 50, padding: EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(color: _card, borderRadius: BorderRadius.circular(14)),
              child: Align(alignment: Alignment.centerLeft, child: Text(widget.userName, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: _dark))),
            ),
            const SizedBox(height: 12),
            Container(
              padding: EdgeInsets.all(3),
              decoration: BoxDecoration(color: _card, borderRadius: BorderRadius.circular(14)),
              child: Row(children: [_tab('New Meeting', 0), _tab('Join Meeting', 1)]),
            ),
            const SizedBox(height: 12),
            if (_error != null) Padding(
              padding: EdgeInsets.only(bottom: 12),
              child: Row(children: [
                Container(width: 6, height: 6, decoration: BoxDecoration(color: _red, shape: BoxShape.circle)),
                const SizedBox(width: 8),
                Text(_error!, style: TextStyle(fontSize: 12, color: _red)),
              ]),
            ),
            if (_mode == 0)
              GestureDetector(
                onTap: _loading ? null : _createMeeting,
                child: Container(
                  height: 50,
                  decoration: BoxDecoration(color: _loading ? _border : _dark, borderRadius: BorderRadius.circular(14)),
                  child: Center(child: _loading
                      ? SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : Text('Start Meeting', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Colors.white))),
                ),
              )
            else ...[
              Container(
                height: 50,
                decoration: BoxDecoration(color: _card, borderRadius: BorderRadius.circular(14)),
                child: TextField(
                  controller: _code,
                  onSubmitted: (_) => _joinMeeting(),
                  onChanged: (_) => setState(() => _error = null),
                  style: TextStyle(fontSize: 14, color: _dark, fontFamily: HG.font),
                  decoration: InputDecoration(
                    hintText: 'Meeting code', hintStyle: TextStyle(fontSize: 14, color: _light),
                    contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 15), border: InputBorder.none,
                  ),
                ),
              ),
              const SizedBox(height: 10),
              GestureDetector(
                onTap: _loading || _code.text.trim().isEmpty ? null : _joinMeeting,
                child: Container(
                  height: 50,
                  decoration: BoxDecoration(color: _loading || _code.text.trim().isEmpty ? _border : _dark, borderRadius: BorderRadius.circular(14)),
                  child: Center(child: _loading
                      ? SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : Text('Join Meeting', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Colors.white))),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _tab(String label, int idx) => Expanded(child: GestureDetector(
    onTap: () => setState(() { _mode = idx; _error = null; }),
    child: Container(
      padding: EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(color: _mode == idx ? _dark : Colors.transparent, borderRadius: BorderRadius.circular(10)),
      child: Center(child: Text(label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: _mode == idx ? Colors.white : _muted))),
    ),
  ));
}
