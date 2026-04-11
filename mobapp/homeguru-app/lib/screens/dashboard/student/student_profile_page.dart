import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:image_picker/image_picker.dart';
import '../../../theme.dart';
import '../../../models/student_data.dart';
import '../../../models/theme_manager.dart';
import '../../wallet/student_wallet_page.dart';
import '../../class_notes/class_notes_page.dart';
import '../../../components/dashboard/tutor/schedule/student_profile_sheet.dart';
import '../../../components/dashboard/student/class_data_card.dart' show accentForTopic;

class StudentProfilePage extends StatefulWidget {
  final StudentData data;
  final int initialTab;
  const StudentProfilePage({super.key, required this.data, this.initialTab = 0});
  @override
  State<StudentProfilePage> createState() => _StudentProfilePageState();
}

class _StudentProfilePageState extends State<StudentProfilePage> with TickerProviderStateMixin {
  late final StudentData _d;
  late final TabController _tab;
  final _picker = ImagePicker();
  File? _avatar;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _d = widget.data;
    _tab = TabController(length: 4, vsync: this, initialIndex: widget.initialTab.clamp(0, 3));
    _d.addListener(_rebuild);
    themeManager.addListener(_rebuild);
    Future.delayed(const Duration(milliseconds: 600), () { if (mounted) setState(() => _loading = false); });
  }

  void _rebuild() { if (mounted) setState(() {}); }

  @override
  void dispose() {
    _d.removeListener(_rebuild);
    themeManager.removeListener(_rebuild);
    _tab.dispose();
    super.dispose();
  }

  Future<void> _pickAvatar() async {
    HapticFeedback.mediumImpact();
    final source = await showModalBottomSheet<ImageSource>(
      context: context,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => SafeArea(child: Column(mainAxisSize: MainAxisSize.min, children: [
        const SizedBox(height: 8),
        Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
        const SizedBox(height: 20),
        Text('Profile Photo', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 16),
        ListTile(leading: Icon(PhosphorIconsRegular.camera, size: 20, color: HG.dark), title: Text('Take a photo', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: HG.dark)), onTap: () => Navigator.pop(ctx, ImageSource.camera)),
        ListTile(leading: Icon(PhosphorIconsRegular.image, size: 20, color: HG.dark), title: Text('Choose from gallery', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: HG.dark)), onTap: () => Navigator.pop(ctx, ImageSource.gallery)),
        if (_avatar != null) ListTile(leading: Icon(PhosphorIconsRegular.trash, size: 20, color: HG.red), title: Text('Remove photo', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: HG.red)), onTap: () { Navigator.pop(ctx); setState(() => _avatar = null); }),
        const SizedBox(height: 12),
      ])),
    );
    if (source == null || !mounted) return;
    try {
      final xfile = await _picker.pickImage(source: source, maxWidth: 512, maxHeight: 512, imageQuality: 80);
      if (xfile != null && mounted) setState(() => _avatar = File(xfile.path));
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    return Scaffold(
      backgroundColor: HG.surface,
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: context.hgSystemUi,
        child: NestedScrollView(
          physics: const ClampingScrollPhysics(),
          headerSliverBuilder: (_, __) => [
            SliverToBoxAdapter(child: _loading ? _shimmer(pt) : _header(pt)),
            SliverPersistentHeader(pinned: true, delegate: _TabDel(_tab)),
          ],
          body: TabBarView(controller: _tab, physics: const ClampingScrollPhysics(), children: [
            _AboutTab(d: _d),
            _TutorsTab(d: _d),
            _ClassNotesTab(d: _d),
            _SettingsTab(),
          ]),
        ),
      ),
    );
  }

  Widget _header(double pt) {
    final isDark = context.isDark;
    return RepaintBoundary(child: Stack(children: [
      Container(height: 130 + pt, color: isDark ? HG.grey100 : HG.powderOrange,
        child: Center(child: Padding(padding: EdgeInsets.only(top: pt * 0.5), child: Image.asset('assets/profileHeader.png', height: 24, fit: BoxFit.contain)))),
      Container(
        margin: EdgeInsets.only(top: 92 + pt),
        decoration: BoxDecoration(color: HG.surface, borderRadius: BorderRadius.vertical(top: Radius.circular(28))),
        padding: EdgeInsets.fromLTRB(20, 52, 20, 16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(_d.name, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: HG.dark, height: 1)),
          const SizedBox(height: 2),
          Text('@${_d.handle}', style: TextStyle(fontSize: 13, color: HG.textMuted)),
          const SizedBox(height: 10),
          Text(_d.bio, style: TextStyle(fontSize: 14, color: HG.dark, height: 1.5)),
          const SizedBox(height: 14),
          // Stats
          Card(
            elevation: 0, color: HG.grey50,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 14, horizontal: 8),
              child: Row(children: [
                _stat('${_d.streak}', 'Streak 🔥'),
                _stat('${_d.xp}', 'XP'),
                _stat('${_d.sessionsThisWeek}', 'This week'),
                _stat('${_d.hoursThisWeek}h', 'Hours'),
                _stat('${_d.tutors.length}', 'Tutors'),
              ]),
            ),
          ),
          const SizedBox(height: 14),
          // Buttons
          Row(children: [
            Expanded(child: OutlinedButton(
              onPressed: () {},
              style: OutlinedButton.styleFrom(foregroundColor: HG.dark, padding: EdgeInsets.symmetric(vertical: 12), shape: const StadiumBorder(), side: BorderSide(color: HG.grey200),
                textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font)),
              child: Text('Edit Profile'),
            )),
            const SizedBox(width: 8),
            Expanded(child: OutlinedButton.icon(
              onPressed: () {},
              icon: Icon(PhosphorIconsFill.shareFat, size: 13, color: HG.blue),
              label: Text('Share Profile'),
              style: OutlinedButton.styleFrom(foregroundColor: HG.dark, padding: EdgeInsets.symmetric(vertical: 12), shape: const StadiumBorder(), side: BorderSide(color: HG.grey200),
                textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font)),
            )),
          ]),
        ]),
      ),
      // Back
      Positioned(top: pt + 10, left: 16, child: IconButton.filledTonal(
        onPressed: () => Navigator.pop(context), icon: Icon(PhosphorIconsRegular.caretLeft, size: 16),
        style: IconButton.styleFrom(backgroundColor: HG.surface.withValues(alpha: 0.75), foregroundColor: HG.dark, fixedSize: const Size(34, 34)),
      )),
      // Nav pill
      Positioned(top: pt + 10, right: 16, child: Container(
        padding: EdgeInsets.symmetric(horizontal: 4, vertical: 4),
        decoration: BoxDecoration(color: HG.surface.withValues(alpha: 0.75), borderRadius: BorderRadius.circular(20)),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          _navBtn(PhosphorIconsRegular.wallet, () => Navigator.push(context, MaterialPageRoute(builder: (_) => const StudentWalletPage()))),
          const SizedBox(width: 2),
          _navBtn(isDark ? PhosphorIconsFill.moon : PhosphorIconsRegular.sun, () => themeManager.toggle(context)),
          const SizedBox(width: 2),
          _navBtn(PhosphorIconsRegular.shareFat, () {}),
        ]),
      )),
      // Avatar
      Positioned(top: 92 + pt - 40, left: 20, child: GestureDetector(onTap: _pickAvatar, child: Stack(children: [
        Container(width: 80, height: 80, decoration: BoxDecoration(shape: BoxShape.circle, color: HG.surface, border: Border.all(color: HG.surface, width: 4)),
          child: ClipOval(child: _avatar != null
              ? Image.file(_avatar!, width: 72, height: 72, fit: BoxFit.cover, cacheWidth: 144)
              : Container(color: HG.grey50, child: Icon(PhosphorIconsRegular.user, size: 28, color: HG.grey300)))),
        Positioned(bottom: 2, right: 2, child: Container(width: 24, height: 24,
          decoration: BoxDecoration(color: HG.fixedDark, shape: BoxShape.circle, border: Border.all(color: HG.surface, width: 2)),
          child: Icon(PhosphorIconsFill.camera, size: 10, color: HG.fixedWhite))),
      ]))),
    ]));
  }

  Widget _navBtn(IconData icon, VoidCallback onTap) => IconButton(
    onPressed: onTap, icon: Icon(icon, size: 16),
    style: IconButton.styleFrom(foregroundColor: HG.dark, fixedSize: const Size(32, 32), padding: EdgeInsets.zero),
  );

  Widget _stat(String v, String l) => Expanded(child: Column(children: [
    Text(v, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: HG.dark)),
    const SizedBox(height: 2),
    Text(l, style: TextStyle(fontSize: 10, color: HG.textMuted)),
  ]));

  Widget _shimmer(double pt) {
    final isDark = context.isDark;
    return Stack(children: [
      Container(height: 130 + pt, color: isDark ? HG.grey100 : HG.powderOrange),
      Container(margin: EdgeInsets.only(top: 92 + pt), decoration: BoxDecoration(color: HG.surface, borderRadius: BorderRadius.vertical(top: Radius.circular(28))),
        padding: EdgeInsets.fromLTRB(20, 52, 20, 16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(width: 120, height: 16, decoration: BoxDecoration(color: HG.grey200, borderRadius: BorderRadius.circular(4))),
          const SizedBox(height: 8),
          Container(width: 90, height: 12, decoration: BoxDecoration(color: HG.grey200, borderRadius: BorderRadius.circular(4))),
          const SizedBox(height: 12),
          Container(width: double.infinity, height: 14, decoration: BoxDecoration(color: HG.grey200, borderRadius: BorderRadius.circular(4))),
          const SizedBox(height: 14),
          Row(children: List.generate(5, (_) => Expanded(child: Padding(padding: EdgeInsets.symmetric(horizontal: 4), child: Column(children: [
            Container(width: 28, height: 16, decoration: BoxDecoration(color: HG.grey200, borderRadius: BorderRadius.circular(4))),
            const SizedBox(height: 4),
            Container(width: 36, height: 10, decoration: BoxDecoration(color: HG.grey200, borderRadius: BorderRadius.circular(4))),
          ]))))),
          const SizedBox(height: 14),
          Row(children: [Expanded(child: Container(height: 40, decoration: BoxDecoration(color: HG.grey200, borderRadius: BorderRadius.circular(100)))), const SizedBox(width: 8), Expanded(child: Container(height: 40, decoration: BoxDecoration(color: HG.grey200, borderRadius: BorderRadius.circular(100))))]),
        ])),
      Positioned(top: 92 + pt - 40, left: 20, child: Container(width: 80, height: 80, decoration: BoxDecoration(color: HG.grey200, shape: BoxShape.circle, border: Border.all(color: HG.surface, width: 4)))),
    ]);
  }
}

class _TabDel extends SliverPersistentHeaderDelegate {
  final TabController ctrl;
  _TabDel(this.ctrl);
  @override double get minExtent => 46;
  @override double get maxExtent => 46;
  @override Widget build(BuildContext context, double _, bool __) => Container(color: HG.surface, child: TabBar(
    controller: ctrl, labelColor: HG.dark, unselectedLabelColor: HG.textLight,
    labelStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font),
    unselectedLabelStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, fontFamily: HG.font),
    indicatorColor: HG.dark, indicatorWeight: 2.5, indicatorSize: TabBarIndicatorSize.label,
    dividerColor: HG.grey200, dividerHeight: 1, splashFactory: NoSplash.splashFactory,
    overlayColor: WidgetStateProperty.all(Colors.transparent),
    isScrollable: true, tabAlignment: TabAlignment.start,
    padding: EdgeInsets.symmetric(horizontal: 12),
    tabs: const [Tab(text: 'About'), Tab(text: 'My Tutors'), Tab(text: 'Class Notes'), Tab(text: 'Settings')],
  ));
  @override bool shouldRebuild(covariant _TabDel old) => true;
}

// ── About Tab ──
class _AboutTab extends StatelessWidget {
  final StudentData d;
  const _AboutTab({required this.d});

  @override
  Widget build(BuildContext context) {
    return ListView(padding: EdgeInsets.fromLTRB(16, 16, 16, 32), physics: const ClampingScrollPhysics(), children: [
      // Learning progress
      _section('Learning Progress'),
      Card(
        elevation: 0, color: HG.grey50,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(padding: EdgeInsets.all(16), child: Column(children: [
          _progressRow('Mathematics', 'Ch. 5: Quadratics', 0.65, Color(0xFF3B82F6)),
          const SizedBox(height: 12),
          _progressRow('Physics', 'Newton\'s Laws', 0.40, Color(0xFF8B5CF6)),
          const SizedBox(height: 12),
          _progressRow('English', 'Essay Writing', 0.80, Color(0xFF22C55E)),
        ])),
      ),
      const SizedBox(height: 20),

      // Interests
      _section('Subjects'),
      Wrap(spacing: 6, runSpacing: 6, children: ['Mathematics', 'Physics', 'English', 'JEE Prep', 'Chemistry'].map((s) => Chip(
        label: Text(s),
        labelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: HG.dark, fontFamily: HG.font),
        backgroundColor: HG.grey50, side: BorderSide.none, shape: const StadiumBorder(),
        visualDensity: VisualDensity.compact, materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
      )).toList()),
      const SizedBox(height: 20),

      // Details
      _section('Details'),
      _detailRow(PhosphorIconsRegular.graduationCap, '${d.grade} · ${d.board}'),
      _detailRow(PhosphorIconsRegular.target, 'JEE 2026 aspirant'),
      _detailRow(PhosphorIconsRegular.calendarBlank, 'Joined Jun 2025'),
      _detailRow(PhosphorIconsRegular.globe, 'Learns online'),
      const SizedBox(height: 20),

      // Achievements
      _section('Achievements'),
      _achievementTile(PhosphorIconsFill.flame, '7-day streak', 'Learning every day for a week', HG.orange),
      _achievementTile(PhosphorIconsFill.trophy, 'Top 15%', 'Weekly leaderboard rank', HG.amber),
      _achievementTile(PhosphorIconsFill.lightning, '1,240 XP', 'Total experience points', HG.purple),
    ]);
  }

  static Widget _section(String s) => Padding(padding: EdgeInsets.only(bottom: 10), child: Text(s, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)));

  static Widget _progressRow(String subject, String chapter, double progress, Color color) => Row(children: [
    Container(width: 32, height: 32, decoration: BoxDecoration(color: color.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(8)),
      child: Icon(PhosphorIconsFill.bookOpen, size: 14, color: color)),
    const SizedBox(width: 12),
    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        Text(subject, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
        const Spacer(),
        Text('${(progress * 100).round()}%', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: color)),
      ]),
      const SizedBox(height: 4),
      Text(chapter, style: TextStyle(fontSize: 11, color: HG.textMuted)),
      const SizedBox(height: 6),
      ClipRRect(borderRadius: BorderRadius.circular(3),
        child: LinearProgressIndicator(value: progress, minHeight: 4, backgroundColor: HG.grey200, color: color)),
    ])),
  ]);

  static Widget _detailRow(IconData icon, String text) => Padding(
    padding: EdgeInsets.only(bottom: 12),
    child: Row(children: [
      Icon(icon, size: 18, color: HG.textMuted), const SizedBox(width: 12),
      Text(text, style: TextStyle(fontSize: 13, color: HG.dark)),
    ]),
  );

  static Widget _achievementTile(IconData icon, String title, String sub, Color color) => Container(
    margin: EdgeInsets.only(bottom: 8),
    padding: EdgeInsets.all(14),
    decoration: BoxDecoration(color: color.withValues(alpha: 0.04), borderRadius: BorderRadius.circular(14), border: Border.all(color: color.withValues(alpha: 0.1))),
    child: Row(children: [
      Container(width: 36, height: 36, decoration: BoxDecoration(color: color.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(10)),
        child: Icon(icon, size: 16, color: color)),
      const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 2),
        Text(sub, style: TextStyle(fontSize: 12, color: HG.textMuted)),
      ])),
    ]),
  );
}

// ── My Tutors Tab ──
class _TutorsTab extends StatelessWidget {
  final StudentData d;
  const _TutorsTab({required this.d});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 32),
      physics: const ClampingScrollPhysics(),
      itemCount: d.tutors.length,
      itemBuilder: (_, i) {
        final t = d.tutors[i];
        return Container(
          margin: EdgeInsets.only(bottom: 10),
          padding: EdgeInsets.all(16),
          decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(18), border: Border.all(color: HG.grey200)),
          child: Row(children: [
            CircleAvatar(radius: 24, backgroundColor: HG.powderBlue,
              child: Text(t.avatar, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.blue))),
            const SizedBox(width: 14),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Text(t.name, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark)),
                const SizedBox(width: 4),
                Icon(PhosphorIconsFill.sealCheck, size: 13, color: HG.blue),
              ]),
              const SizedBox(height: 2),
              Text(t.subject, style: TextStyle(fontSize: 12, color: HG.textMuted)),
              const SizedBox(height: 2),
              Text('@${t.handle}', style: TextStyle(fontSize: 11, color: HG.textLight)),
            ])),
            OutlinedButton(
              onPressed: () {},
              style: OutlinedButton.styleFrom(foregroundColor: HG.blue, padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8), shape: const StadiumBorder(), side: BorderSide(color: HG.blue.withValues(alpha: 0.3)),
                textStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, fontFamily: HG.font)),
              child: Text('Message'),
            ),
          ]),
        );
      },
    );
  }
}

// ── Settings Tab ──
class _SettingsTab extends StatelessWidget {
  const _SettingsTab();

  @override
  Widget build(BuildContext context) {
    return ListView(padding: EdgeInsets.fromLTRB(16, 16, 16, 32), physics: const ClampingScrollPhysics(), children: [
      Text('Account', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
      const SizedBox(height: 8),
      Card(
        elevation: 0, color: HG.grey50,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Column(children: [
          _tile(PhosphorIconsRegular.envelope, 'Email', sub: 'ravi@mail.com'),
          Divider(height: 1, indent: 56),
          _tile(PhosphorIconsRegular.phone, 'Phone', sub: 'Verified'),
          Divider(height: 1, indent: 56),
          _tile(PhosphorIconsRegular.lockKey, 'Password', sub: 'Change'),
        ]),
      ),
      const SizedBox(height: 20),
      Text('Preferences', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
      const SizedBox(height: 8),
      Card(
        elevation: 0, color: HG.grey50,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Column(children: [
          _tile(PhosphorIconsRegular.bellRinging, 'Notifications'),
          Divider(height: 1, indent: 56),
          _tile(PhosphorIconsRegular.globe, 'Language', sub: 'English'),
          Divider(height: 1, indent: 56),
          _tile(PhosphorIconsRegular.lockKey, 'Privacy'),
        ]),
      ),
      const SizedBox(height: 20),
      Text('Support', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
      const SizedBox(height: 8),
      Card(
        elevation: 0, color: HG.grey50,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Column(children: [
          _tile(PhosphorIconsRegular.question, 'Help & Support'),
          Divider(height: 1, indent: 56),
          _tile(PhosphorIconsRegular.info, 'About HomeGuru'),
          Divider(height: 1, indent: 56),
          _tile(PhosphorIconsRegular.signOut, 'Log out', isRed: true),
        ]),
      ),
    ]);
  }

  static Widget _tile(IconData icon, String label, {String? sub, bool isRed = false}) => ListTile(
    leading: Icon(icon, size: 20, color: isRed ? HG.red : HG.dark),
    title: Text(label, style: TextStyle(fontSize: 14, color: isRed ? HG.red : HG.dark)),
    trailing: sub != null
        ? Text(sub, style: TextStyle(fontSize: 12, color: HG.textMuted))
        : (isRed ? null : Icon(PhosphorIconsRegular.caretRight, size: 16, color: HG.grey300)),
    dense: true,
    onTap: () {},
  );
}

// ── Class Notes Tab ──
class _ClassNotesTab extends StatelessWidget {
  final StudentData d;
  const _ClassNotesTab({required this.d});

  List<(PastSession, String)> get _all {
    final list = <(PastSession, String)>[];
    for (final t in d.tutors) {
      final sessions = studentHistory[t.name];
      if (sessions != null) {
        for (final s in sessions) list.add((s, t.name));
      }
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    final items = _all;
    if (items.isEmpty) return Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
      Icon(PhosphorIconsRegular.notebook, size: 40, color: HG.grey300),
      const SizedBox(height: 10),
      Text('No class notes yet', style: TextStyle(fontSize: 14, color: HG.textMuted)),
    ]));

    // Group by tutor
    final grouped = <String, List<PastSession>>{};
    for (final (s, t) in items) { grouped.putIfAbsent(t, () => []).add(s); }

    return ListView(padding: EdgeInsets.fromLTRB(16, 14, 16, 40), physics: const ClampingScrollPhysics(), children: [
      ...grouped.entries.expand((e) {
        final tutor = e.key;
        final sessions = e.value;
        return [
          // Tutor header
          Padding(
            padding: EdgeInsets.only(top: grouped.keys.first == tutor ? 0 : 12, bottom: 10),
            child: Row(children: [
              CircleAvatar(radius: 14, backgroundColor: HG.powderBlue,
                child: Text(tutor[0], style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.blue))),
              const SizedBox(width: 8),
              Text(tutor, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
              const SizedBox(width: 6),
              Icon(PhosphorIconsFill.sealCheck, size: 12, color: HG.blue),
              const Spacer(),
              Text('${sessions.length} classes', style: TextStyle(fontSize: 11, color: HG.textMuted)),
            ]),
          ),
          // Session cards
          ...sessions.map((s) {
            final accent = accentForTopic(s.topic);
            return GestureDetector(
              onTap: () {
                HapticFeedback.lightImpact();
                Navigator.push(context, PageRouteBuilder(
                  pageBuilder: (_, __, ___) => ClassNotesPage(session: s, tutorName: tutor),
                  transitionDuration: const Duration(milliseconds: 300),
                  reverseTransitionDuration: const Duration(milliseconds: 250),
                  transitionsBuilder: (_, a, __, c) => SlideTransition(
                    position: Tween(begin: const Offset(1, 0), end: Offset.zero).animate(
                      CurvedAnimation(parent: a, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)), child: c),
                ));
              },
              child: Container(
                margin: EdgeInsets.only(bottom: 8),
                padding: EdgeInsets.all(14),
                decoration: BoxDecoration(color: HG.cardOnPowder, borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: HG.cardOnPowderBorder)),
                child: Row(children: [
                  Container(width: 38, height: 38,
                    decoration: BoxDecoration(color: accent.withValues(alpha: 0.06), borderRadius: BorderRadius.circular(11)),
                    child: Icon(PhosphorIconsFill.notebook, size: 16, color: accent)),
                  const SizedBox(width: 12),
                  Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(s.topic, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark, height: 1.2), maxLines: 1, overflow: TextOverflow.ellipsis),
                    const SizedBox(height: 3),
                    Row(children: [
                      Text(s.date, style: TextStyle(fontSize: 11, color: HG.textMuted)),
                      if (s.assignments.isNotEmpty) ...[const SizedBox(width: 8),
                        Icon(PhosphorIconsRegular.fileText, size: 10, color: HG.textLight),
                        const SizedBox(width: 2),
                        Text('${s.assignments.length}', style: TextStyle(fontSize: 10, color: HG.textLight))],
                      if (s.sharedNotes.isNotEmpty) ...[const SizedBox(width: 6),
                        Icon(PhosphorIconsRegular.notepad, size: 10, color: HG.textLight),
                        const SizedBox(width: 2),
                        Text('${s.sharedNotes.length}', style: TextStyle(fontSize: 10, color: HG.textLight))],
                      if (s.recordingLabel != null) ...[const SizedBox(width: 6),
                        Icon(PhosphorIconsRegular.play, size: 10, color: HG.textLight)],
                    ]),
                  ])),
                  Icon(s.attended ? PhosphorIconsFill.checkCircle : PhosphorIconsFill.xCircle, size: 14,
                    color: s.attended ? HG.green : HG.red),
                  const SizedBox(width: 6),
                  Icon(PhosphorIconsRegular.caretRight, size: 14, color: HG.textLight),
                ]),
              ),
            );
          }),
        ];
      }),
    ]);
  }
}
