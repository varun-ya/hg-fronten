import 'dart:async';
import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:file_picker/file_picker.dart';
import 'package:image_picker/image_picker.dart';
import '../../../theme.dart';
import '../../../widgets/sprite_cache.dart';

class AiChatTab extends StatefulWidget {
  const AiChatTab({super.key});
  @override
  State<AiChatTab> createState() => _AiChatTabState();
}

class _AiChatTabState extends State<AiChatTab> {
  final _controller = TextEditingController();
  final _focus = FocusNode();
  final _scroll = ScrollController();
  final List<_ChatMsg> _messages = [];
  final _imagePicker = ImagePicker();
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  bool _hasText = false;
  bool _typing = false;

  @override
  void initState() {
    super.initState();
    _controller.addListener(() {
      final has = _controller.text.trim().isNotEmpty;
      if (has != _hasText) setState(() => _hasText = has);
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _focus.dispose();
    _scroll.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scroll.hasClients) {
        _scroll.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
      }
    });
  }

  void _send() {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    HapticFeedback.lightImpact();
    setState(() {
      _messages.add(_ChatMsg(text: text, isUser: true, time: DateTime.now()));
      _controller.clear();
      _typing = true;
    });
    _scrollToBottom();
    // Simulate AI reply
    _simulateReply(text);
  }

  void _simulateReply(String query) {
    final delay = 800 + (query.length * 15).clamp(0, 2000);
    Future.delayed(Duration(milliseconds: delay), () {
      if (!mounted) return;
      setState(() {
        _typing = false;
        _messages.add(_ChatMsg(text: _getReply(query), isUser: false, time: DateTime.now()));
      });
      _scrollToBottom();
    });
  }

  String _getReply(String q) {
    final lower = q.toLowerCase();
    if (lower.contains('photosynthesis')) {
      return 'Photosynthesis is how plants make food! 🌱\n\nThey use sunlight, water (H₂O), and carbon dioxide (CO₂) to produce glucose and oxygen.\n\n**Formula:**\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\nWant me to explain any part in more detail?';
    }
    if (lower.contains('math') || lower.contains('quadratic') || lower.contains('equation')) {
      return 'I\'d love to help with math! 📐\n\nFor quadratic equations (ax² + bx + c = 0), use the quadratic formula:\n\nx = (-b ± √(b²-4ac)) / 2a\n\nSend me a specific equation and I\'ll solve it step by step!';
    }
    if (lower.contains('quiz') || lower.contains('history')) {
      return 'Let\'s do a quick quiz! 🧠\n\n**Q: Who was the first Emperor of the Maurya dynasty?**\n\nA) Ashoka\nB) Chandragupta Maurya\nC) Bindusara\nD) Brihadratha\n\nType your answer!';
    }
    if (lower.contains('hello') || lower.contains('hi') || lower.contains('hey')) {
      return 'Hey there! 👋 How can I help you today? I can explain concepts, solve problems, or quiz you on any subject!';
    }
    return 'Great question! 🤔\n\nI\'m still learning, but I\'ll do my best to help. Could you give me a bit more detail about what you\'d like to know?\n\nYou can ask me to:\n• Explain a concept\n• Solve a problem step-by-step\n• Quiz you on a topic';
  }

  void _pickPhoto() async {
    Navigator.pop(context);
    final picked = await _imagePicker.pickImage(source: ImageSource.gallery, imageQuality: 80);
    if (picked == null || !mounted) return;
    _addFile(File(picked.path), picked.name, isImage: true);
  }

  void _pickCamera() async {
    Navigator.pop(context);
    final picked = await _imagePicker.pickImage(source: ImageSource.camera, imageQuality: 80);
    if (picked == null || !mounted) return;
    _addFile(File(picked.path), picked.name, isImage: true);
  }

  void _pickDocument() async {
    Navigator.pop(context);
    final result = await FilePicker.platform.pickFiles();
    if (result == null || result.files.isEmpty || !mounted) return;
    final f = result.files.first;
    if (f.path == null) return;
    _addFile(File(f.path!), f.name);
  }

  void _addFile(File file, String name, {bool isImage = false}) {
    HapticFeedback.lightImpact();
    setState(() {
      _messages.add(_ChatMsg(text: '', isUser: true, time: DateTime.now(), file: file, fileName: name, isImage: isImage));
      _typing = true;
    });
    _scrollToBottom();
    _simulateReply('I uploaded a file: $name');
  }

  void _showAttachSheet() {
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context,
      backgroundColor: HG.surface,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => SafeArea(
        child: Padding(
          padding: EdgeInsets.fromLTRB(24, 8, 24, 16),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            Container(width: 36, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
            const SizedBox(height: 20),
            Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
              _attachOption(PhosphorIconsFill.image, 'Photo', HG.green, _pickPhoto),
              _attachOption(PhosphorIconsFill.camera, 'Camera', HG.blue, _pickCamera),
              _attachOption(PhosphorIconsFill.file, 'Document', HG.orange, _pickDocument),
            ]),
          ]),
        ),
      ),
    );
  }

  Widget _attachOption(IconData icon, String label, Color color, VoidCallback onTap) => GestureDetector(
    onTap: onTap,
    child: Column(children: [
      Container(
        width: 56, height: 56,
        decoration: BoxDecoration(color: color.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(16)),
        child: Icon(icon, size: 24, color: color),
      ),
      const SizedBox(height: 8),
      Text(label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: HG.dark)),
    ]),
  );

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final pb = MediaQuery.of(context).padding.bottom;
    final empty = _messages.isEmpty;

    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: context.isDark ? HG.surface : const Color(0xFFF8F7F4),
      endDrawer: _ChatDrawer(onNewChat: () {
        Navigator.pop(context);
        setState(() { _messages.clear(); _typing = false; });
      }),
      body: Column(children: [
        _header(pt),
        Expanded(child: empty ? _emptyState() : _messageList()),
        if (_typing) _typingIndicator(),
        _inputBar(pb),
      ]),
    );
  }

  Widget _header(double pt) => Container(
    padding: EdgeInsets.fromLTRB(16, pt + 8, 12, 8),
    decoration: BoxDecoration(color: context.isDark ? HG.surface : const Color(0xFFF8F7F4)),
    child: Row(children: [
      // Back button if navigated here
      if (Navigator.of(context).canPop())
        GestureDetector(
          onTap: () => Navigator.pop(context),
          child: Container(
            width: 34, height: 34, margin: EdgeInsets.only(right: 10),
            decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(10)),
            child: Icon(PhosphorIconsRegular.arrowLeft, size: 17, color: HG.dark),
          ),
        ),
      Container(
        width: 34, height: 34,
        decoration: BoxDecoration(
          color: HG.powderOrange,
          borderRadius: BorderRadius.circular(10)),
        child: Center(child: Text('G', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: HG.orange))),
      ),
      const SizedBox(width: 10),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Text('Guru AI', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark)),
          const SizedBox(width: 6),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(color: HG.powderOrange, borderRadius: BorderRadius.circular(100)),
            child: Text('Beta', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w600, color: HG.orange)),
          ),
        ]),
        Row(children: [
          Container(width: 6, height: 6, decoration: BoxDecoration(color: HG.green, shape: BoxShape.circle)),
          const SizedBox(width: 5),
          Text(_typing ? 'Typing...' : 'Online', style: TextStyle(fontSize: 11, color: _typing ? HG.orange : HG.textMuted)),
        ]),
      ])),
      GestureDetector(
        onTap: () {
          HapticFeedback.lightImpact();
          _scaffoldKey.currentState?.openEndDrawer();
        },
        child: Container(
          width: 34, height: 34,
          decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(10)),
          child: Icon(PhosphorIconsRegular.list, size: 17, color: HG.dark),
        ),
      ),
    ]),
  );

  Widget _emptyState() => Center(
    child: SingleChildScrollView(
      padding: EdgeInsets.symmetric(horizontal: 28),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        const _HootMascot(size: 90),
        const SizedBox(height: 14),
        Text('Hey! I\'m Hoot 👋', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
        const SizedBox(height: 6),
        Text('Your Guru AI study buddy',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.4)),
        const SizedBox(height: 24),
        ..._suggestions.map((s) => Padding(
          padding: EdgeInsets.only(bottom: 8),
          child: GestureDetector(
            onTap: () { _controller.text = s.query; _send(); },
            child: Container(
              width: double.infinity,
              padding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              decoration: BoxDecoration(
                color: HG.grey50,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: HG.grey200)),
              child: Row(children: [
                Container(
                  width: 32, height: 32,
                  decoration: BoxDecoration(color: s.color.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(9)),
                  child: Icon(s.icon, size: 16, color: s.color),
                ),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(s.title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
                  Text(s.sub, style: TextStyle(fontSize: 11, color: HG.textMuted)),
                ])),
                Icon(PhosphorIconsRegular.caretRight, size: 14, color: HG.textLight),
              ]),
            ),
          ),
        )),
      ]),
    ),
  );

  Widget _messageList() => ListView.builder(
    controller: _scroll,
    padding: EdgeInsets.fromLTRB(14, 12, 14, 4),
    reverse: true,
    physics: const BouncingScrollPhysics(),
    itemCount: _messages.length,
    itemBuilder: (_, i) {
      final msg = _messages[_messages.length - 1 - i];
      final isUser = msg.isUser;
      final time = '${msg.time.hour.toString().padLeft(2, '0')}:${msg.time.minute.toString().padLeft(2, '0')}';

      return Padding(
        padding: EdgeInsets.only(bottom: 6),
        child: Row(
          mainAxisAlignment: isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            if (!isUser) ...[
              Container(
                width: 26, height: 26,
                decoration: BoxDecoration(
                  color: HG.powderOrange,
                  borderRadius: BorderRadius.circular(8)),
                child: Center(child: Text('G', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: HG.orange))),
              ),
              const SizedBox(width: 8),
            ],
            Flexible(child: Column(
              crossAxisAlignment: isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
              children: [
                if (msg.isImage && msg.file != null)
                  ClipRRect(
                    borderRadius: BorderRadius.circular(14),
                    child: Image.file(msg.file!, width: 200, height: 160, fit: BoxFit.cover),
                  )
                else if (msg.file != null)
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    decoration: BoxDecoration(
                      color: isUser ? HG.blue : HG.grey100,
                      borderRadius: BorderRadius.circular(14)),
                    child: Row(mainAxisSize: MainAxisSize.min, children: [
                      Icon(PhosphorIconsRegular.file, size: 18, color: isUser ? HG.fixedWhite : HG.orange),
                      const SizedBox(width: 8),
                      Flexible(child: Text(msg.fileName ?? 'File', overflow: TextOverflow.ellipsis,
                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: isUser ? HG.fixedWhite : HG.dark))),
                    ]),
                  )
                else
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(
                      color: isUser ? HG.blue : HG.grey100,
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(18), topRight: Radius.circular(18),
                        bottomLeft: Radius.circular(isUser ? 18 : 4),
                        bottomRight: Radius.circular(isUser ? 4 : 18)),
                    ),
                    child: Text(msg.text, style: TextStyle(fontSize: 14, color: isUser ? HG.fixedWhite : HG.dark, height: 1.45)),
                  ),
                const SizedBox(height: 3),
                Text(time, style: TextStyle(fontSize: 10, color: HG.textLight)),
              ],
            )),
            if (isUser) const SizedBox(width: 34),
          ],
        ),
      );
    },
  );

  Widget _typingIndicator() => Padding(
    padding: EdgeInsets.fromLTRB(14, 0, 14, 8),
    child: Row(children: [
      Container(
        width: 26, height: 26,
        decoration: BoxDecoration(
          color: HG.powderOrange,
          borderRadius: BorderRadius.circular(8)),
        child: Center(child: Text('G', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: HG.orange))),
      ),
      const SizedBox(width: 8),
      Container(
        padding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(18)),
        child: const _TypingDots(),
      ),
    ]),
  );

  Widget _inputBar(double pb) => Container(
    padding: EdgeInsets.fromLTRB(8, 8, 8, pb + 8),
    decoration: BoxDecoration(color: context.isDark ? HG.surface : const Color(0xFFF8F7F4)),
    child: Row(children: [
      GestureDetector(
        onTap: _showAttachSheet,
        child: Container(
          width: 40, height: 40,
          decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(12)),
          child: Icon(PhosphorIconsRegular.plus, size: 20, color: HG.textMuted),
        ),
      ),
      const SizedBox(width: 8),
      Expanded(child: Container(
        decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(22)),
        child: TextField(
          controller: _controller,
          focusNode: _focus,
          style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
          textInputAction: TextInputAction.send,
          onSubmitted: (_) => _send(),
          maxLines: 4,
          minLines: 1,
          decoration: InputDecoration(
            hintText: 'Message Guru AI...',
            hintStyle: TextStyle(fontSize: 14, color: HG.textLight, fontFamily: HG.font),
            border: InputBorder.none,
            contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 10)),
        ),
      )),
      const SizedBox(width: 8),
      GestureDetector(
        onTap: _hasText ? _send : null,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: 40, height: 40,
          decoration: BoxDecoration(
            color: _hasText ? HG.blue : HG.grey200,
            shape: BoxShape.circle),
          child: AnimatedRotation(
            turns: _hasText ? 0 : 0.15,
            duration: const Duration(milliseconds: 200),
            child: Icon(PhosphorIconsFill.paperPlaneRight, size: 17, color: _hasText ? HG.fixedWhite : HG.textLight),
          ),
        ),
      ),
    ]),
  );

  static List<({IconData icon, String title, String sub, String query, Color color})> get _suggestions => [
    (icon: PhosphorIconsRegular.atom, title: 'Explain a concept', sub: 'Break down any topic simply', query: 'Explain photosynthesis in simple terms', color: HG.green),
    (icon: PhosphorIconsRegular.mathOperations, title: 'Solve a problem', sub: 'Step-by-step math help', query: 'Help me solve quadratic equations', color: HG.blue),
    (icon: PhosphorIconsRegular.exam, title: 'Quiz me', sub: 'Test your knowledge', query: 'Quiz me on Indian history', color: HG.purple),
    (icon: PhosphorIconsRegular.bookOpen, title: 'Summarize a chapter', sub: 'Quick revision notes', query: 'Summarize the chapter on cell biology', color: HG.orange),
  ];
}

// ── Typing dots animation ──
class _TypingDots extends StatefulWidget {
  const _TypingDots();
  @override
  State<_TypingDots> createState() => _TypingDotsState();
}

class _TypingDotsState extends State<_TypingDots> with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 1200))..repeat();
  }

  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _ctrl,
      builder: (_, __) => Row(mainAxisSize: MainAxisSize.min, children: List.generate(3, (i) {
        final delay = i * 0.2;
        final t = ((_ctrl.value - delay) % 1.0).clamp(0.0, 1.0);
        final y = -3.0 * (t < 0.5 ? t * 2 : (1 - t) * 2);
        return Transform.translate(
          offset: Offset(0, y),
          child: Container(
            width: 7, height: 7,
            margin: EdgeInsets.symmetric(horizontal: 2),
            decoration: BoxDecoration(color: HG.textLight, shape: BoxShape.circle),
          ),
        );
      })),
    );
  }
}

// ── Chat sidebar drawer ──
class _ChatDrawer extends StatelessWidget {
  final VoidCallback onNewChat;
  const _ChatDrawer({required this.onNewChat});

  static final _history = [
    (title: 'Photosynthesis explained', sub: 'Today', icon: PhosphorIconsRegular.leaf),
    (title: 'Quadratic equations', sub: 'Today', icon: PhosphorIconsRegular.mathOperations),
    (title: 'Indian history quiz', sub: 'Yesterday', icon: PhosphorIconsRegular.exam),
    (title: 'Cell biology summary', sub: 'Yesterday', icon: PhosphorIconsRegular.dna),
    (title: 'Newton\'s laws of motion', sub: '2 days ago', icon: PhosphorIconsRegular.atom),
    (title: 'English essay review', sub: '3 days ago', icon: PhosphorIconsRegular.pencilLine),
  ];

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    return Drawer(
      backgroundColor: HG.surface,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.horizontal(left: Radius.circular(24))),
      child: Column(children: [
        Padding(
          padding: EdgeInsets.fromLTRB(20, pt + 16, 16, 12),
          child: Row(children: [
            Text('Chat History', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: HG.dark)),
            const Spacer(),
            GestureDetector(
              onTap: onNewChat,
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(color: HG.blue, borderRadius: BorderRadius.circular(100)),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Icon(PhosphorIconsBold.plus, size: 13, color: HG.fixedWhite),
                  const SizedBox(width: 4),
                  Text('New', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.fixedWhite)),
                ]),
              ),
            ),
          ]),
        ),
        Divider(height: 0.5, color: HG.grey200),
        Expanded(child: ListView.builder(
          padding: EdgeInsets.symmetric(vertical: 8),
          itemCount: _history.length,
          itemBuilder: (_, i) {
            final h = _history[i];
            return ListTile(
              dense: true,
              contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 0),
              leading: Container(
                width: 34, height: 34,
                decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(10)),
                child: Icon(h.icon, size: 16, color: HG.textMuted),
              ),
              title: Text(h.title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark), maxLines: 1, overflow: TextOverflow.ellipsis),
              subtitle: Text(h.sub, style: TextStyle(fontSize: 11, color: HG.textLight)),
              onTap: () => Navigator.pop(context),
            );
          },
        )),
      ]),
    );
  }
}

// ── Chat message model ──
class _ChatMsg {
  final String text;
  final bool isUser;
  final DateTime time;
  final File? file;
  final String? fileName;
  final bool isImage;
  const _ChatMsg({required this.text, required this.isUser, required this.time, this.file, this.fileName, this.isImage = false});
}

// ── Hoot mascot ping-pong sprite ──
class _HootMascot extends StatefulWidget {
  final double size;
  const _HootMascot({this.size = 160});
  @override
  State<_HootMascot> createState() => _HootMascotState();
}

class _HootMascotState extends State<_HootMascot> {
  ui.Image? _sprite;
  int _frame = 0;
  Timer? _timer;
  bool _forward = true;

  static const _frameCount = 3;
  static const _spriteW = 680.0;
  static const _frameH = 238.0;
  static double get _frameW => _spriteW / _frameCount;

  @override
  void initState() {
    super.initState();
    SpriteCache.load('assets/hoot.png').then((img) {
      if (!mounted) return;
      setState(() => _sprite = img);
      _timer = Timer.periodic(const Duration(milliseconds: 350), (_) {
        if (!mounted) return;
        setState(() {
          if (_forward) {
            if (_frame < _frameCount - 1) { _frame++; }
            else { _forward = false; _frame--; }
          } else {
            if (_frame > 0) { _frame--; }
            else { _forward = true; _frame++; }
          }
        });
      });
    });
  }

  @override
  void dispose() { _timer?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    if (_sprite == null) return SizedBox.square(dimension: widget.size);
    final h = widget.size * (_frameH / _frameW);
    return SizedBox(width: widget.size, height: h,
      child: CustomPaint(painter: _HootPainter(sprite: _sprite!, frame: _frame), willChange: true));
  }
}

class _HootPainter extends CustomPainter {
  final ui.Image sprite;
  final int frame;
  static final _p = Paint()..filterQuality = FilterQuality.low;
  _HootPainter({required this.sprite, required this.frame});

  @override
  void paint(Canvas c, Size s) {
    final fw = _HootMascotState._frameW;
    final src = Rect.fromLTWH(frame * fw, 0, fw, _HootMascotState._frameH);
    final dst = Rect.fromLTWH(0, 0, s.width, s.height);
    c.drawImageRect(sprite, src, dst, _p);
  }

  @override
  bool shouldRepaint(_HootPainter o) => frame != o.frame;
}
