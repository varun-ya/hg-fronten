import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:image_picker/image_picker.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import '../../../theme.dart';
import '../../../models/tutor_data.dart';
import '../../../models/theme_manager.dart';
import '../../../screens/wallet/wallet_page.dart';
import '../../../screens/booking/book_demo_page.dart';
import '../profile/about_tab.dart';
import '../profile/activity_tab.dart';
import '../profile/calendar_tab.dart';
import '../profile/reviews_tab.dart';
import '../profile/credentials_tab.dart';
import '../profile/edit_profile_page.dart';

class ProfileTab extends StatefulWidget {
  final TutorData data;
  final bool initialVisitorMode;
  const ProfileTab({super.key, required this.data, this.initialVisitorMode = false});
  @override
  State<ProfileTab> createState() => _ProfileTabState();
}

class _ProfileTabState extends State<ProfileTab> with TickerProviderStateMixin {
  late final TutorData _data;
  final _picker = ImagePicker();
  late final TabController _tabCtrl;
  YoutubePlayerController? _ytCtrl;
  bool _loading = true;
  int _activeTabIdx = 0;
  bool _visitorMode = false;

  @override
  void initState() {
    super.initState();
    _data = widget.data;
    _visitorMode = widget.initialVisitorMode;
    _tabCtrl = TabController(length: 5, vsync: this);
    _tabCtrl.addListener(_onTabChanged);
    _data.addListener(_onProfileChanged);
    themeManager.addListener(_onThemeChanged);
    Future.delayed(const Duration(milliseconds: 800), () { if (mounted) { setState(() => _loading = false); _initYtIfNeeded(); } });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
  }

  void _onProfileChanged() { if (mounted) setState(() {}); }
  void _onThemeChanged() { if (mounted) setState(() {}); }

  void _onTabChanged() {
    if (_tabCtrl.indexIsChanging) return;
    final idx = _tabCtrl.index;
    if (idx != _activeTabIdx) {
      if (_activeTabIdx == 0 && _ytCtrl != null) _ytCtrl!.pause();
      setState(() => _activeTabIdx = idx);
    }
    _initYtIfNeeded();
  }

  void _initYtIfNeeded() {
    if (_activeTabIdx == 0 && _ytCtrl == null) {
      _ytCtrl = YoutubePlayerController(initialVideoId: YoutubePlayer.convertUrlToId(_data.ytLink) ?? 'G64LLtnjYlA',
        flags: const YoutubePlayerFlags(autoPlay: false, mute: false, showLiveFullscreenButton: false));
      setState(() {});
    }
  }

  @override
  void dispose() {
    _tabCtrl.removeListener(_onTabChanged);
    _data.removeListener(_onProfileChanged);
    themeManager.removeListener(_onThemeChanged);
    _tabCtrl.dispose(); _ytCtrl?.dispose();
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
        _sheetTile(ctx, PhosphorIconsRegular.camera, 'Take a photo', ImageSource.camera),
        _sheetTile(ctx, PhosphorIconsRegular.image, 'Choose from gallery', ImageSource.gallery),
        if (_data.avatar != null) ListTile(
          leading: Icon(PhosphorIconsRegular.trash, size: 20, color: HG.red),
          title: Text('Remove photo', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: HG.red)),
          onTap: () { Navigator.pop(ctx); _data.avatar = null; _data.update(); },
        ),
        const SizedBox(height: 12),
      ])),
    );
    if (source == null || !mounted) return;
    try {
      final xfile = await _picker.pickImage(source: source, maxWidth: 512, maxHeight: 512, imageQuality: 80);
      if (xfile != null && mounted) { _data.avatar = File(xfile.path); _data.update(); }
    } catch (_) {}
  }

  Widget _sheetTile(BuildContext ctx, IconData icon, String label, ImageSource src) => ListTile(
    leading: Icon(icon, size: 20, color: HG.dark),
    title: Text(label, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: HG.dark)),
    onTap: () => Navigator.pop(ctx, src),
  );

  void _openEditProfile() {
    Navigator.push(context, PageRouteBuilder(
      pageBuilder: (_, __, ___) => EditProfilePage(data: _data),
      transitionDuration: const Duration(milliseconds: 300), reverseTransitionDuration: const Duration(milliseconds: 250),
      transitionsBuilder: (_, anim, __, child) => SlideTransition(
        position: Tween(begin: const Offset(0, 1), end: Offset.zero).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)), child: child),
    ));
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final p = _data;
    return Scaffold(
      backgroundColor: HG.surface,
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: context.hgSystemUi,
        child: NestedScrollView(
          physics: const ClampingScrollPhysics(),
          headerSliverBuilder: (_, __) => [
            SliverToBoxAdapter(child: _loading ? _shimmerHeader(pt) : _header(pt, p)),
            SliverPersistentHeader(pinned: true, delegate: _TabDelegate(_tabCtrl)),
          ],
          body: Stack(children: [
            TabBarView(controller: _tabCtrl, physics: const ClampingScrollPhysics(), children: [
              ProfileAboutTab(ytCtrl: _ytCtrl, data: p),
              RepaintBoundary(child: ProfileActivityTab(avatar: p.avatar)),
              RepaintBoundary(child: ProfileCalendarTab(data: p)),
              const RepaintBoundary(child: ProfileReviewsTab()),
              RepaintBoundary(child: ProfileCredentialsTab(visitorMode: _visitorMode)),
            ]),
            if (_activeTabIdx == 1 && !_visitorMode) Positioned(bottom: 20, right: 20, child: _fab()),
          ]),
        ),
      ),
    );
  }

  Widget _fab() => FloatingActionButton(
    onPressed: () { HapticFeedback.mediumImpact(); Navigator.push(context, PageRouteBuilder(
      pageBuilder: (_, __, ___) => const BlogEditorPage(),
      transitionDuration: const Duration(milliseconds: 300), reverseTransitionDuration: const Duration(milliseconds: 250),
      transitionsBuilder: (_, anim, __, child) => SlideTransition(
        position: Tween(begin: const Offset(0, 1), end: Offset.zero).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)), child: child),
    )); },
    backgroundColor: HG.fixedDark, foregroundColor: HG.fixedWhite, elevation: 4,
    shape: const CircleBorder(),
    child: Icon(PhosphorIconsBold.pencilSimpleLine, size: 20),
  );

  Widget _header(double pt, TutorData p) {
    final isDark = context.isDark;
    return RepaintBoundary(child: Stack(children: [
      // Header bg
      Container(height: 140 + pt, color: isDark ? HG.grey100 : HG.powderBlue,
        child: Center(child: Padding(padding: EdgeInsets.only(top: pt * 0.5), child: Image.asset('assets/profileHeader.png', height: 26, fit: BoxFit.contain)))),
      // Content card
      Container(
        margin: EdgeInsets.only(top: 100 + pt),
        decoration: BoxDecoration(color: HG.surface, borderRadius: BorderRadius.vertical(top: Radius.circular(28))),
        padding: EdgeInsets.fromLTRB(20, 56, 20, 16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Expanded(child: Text(p.name, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: HG.dark, height: 1))),
            Chip(
              avatar: Icon(PhosphorIconsFill.sealCheck, size: 12, color: HG.blue),
              label: Text('Verified'),
              labelStyle: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.blue, fontFamily: HG.font),
              backgroundColor: isDark ? HG.grey100 : HG.powderBlue,
              side: BorderSide.none,
              padding: EdgeInsets.zero,
              labelPadding: EdgeInsets.only(right: 6),
              visualDensity: VisualDensity.compact,
              materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
          ]),
          const SizedBox(height: 2),
          Text('@${p.handle}', style: TextStyle(fontSize: 13, color: HG.textMuted)),
          const SizedBox(height: 12),
          Text(p.bio, style: TextStyle(fontSize: 14, color: HG.dark, height: 1.5)),
          const SizedBox(height: 10),
          Row(children: [
            Icon(PhosphorIconsRegular.mapPin, size: 14, color: HG.textLight), const SizedBox(width: 4), Text(p.location, style: TextStyle(fontSize: 12, color: HG.textMuted)),
            const SizedBox(width: 14),
            Icon(PhosphorIconsRegular.calendarBlank, size: 14, color: HG.textLight), const SizedBox(width: 4), Text('Joined Jun 2025', style: TextStyle(fontSize: 12, color: HG.textMuted)),
          ]),
          const SizedBox(height: 18),
          Card(
            elevation: 0,
            color: HG.grey50,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 16, horizontal: 8),
              child: Row(children: [_stat('18', 'Students'), _stat('156', 'Sessions'), _stat('4.8', 'Rating'), _stat('24', 'Reviews'), _stat('3', 'Posts')]),
            ),
          ),
          const SizedBox(height: 16),
          if (p.avatar == null && !_visitorMode) ...[
            GestureDetector(onTap: _pickAvatar, child: Card(
              elevation: 0, color: HG.amber.withValues(alpha: 0.08),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: HG.amber.withValues(alpha: 0.25))),
              child: Padding(padding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                child: Row(children: [Icon(PhosphorIconsFill.warning, size: 16, color: HG.amber), const SizedBox(width: 8), Expanded(child: Text('Profile incomplete \u00b7 Unpublished', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.amber))), Text('Add photo', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.orange))])))),
            const SizedBox(height: 16),
          ],
          Row(children: _visitorMode ? [
            Expanded(child: FilledButton(onPressed: () {}, style: FilledButton.styleFrom(backgroundColor: HG.fixedDark, foregroundColor: HG.fixedWhite, padding: EdgeInsets.symmetric(vertical: 12), shape: const StadiumBorder(), textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font)), child: Text('Follow'))),
            const SizedBox(width: 8),
            Expanded(child: OutlinedButton(onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => BookDemoPage(
                tutorName: p.name, tutorSubject: p.subjects.join(' \u00b7 '), tutorAvatar: p.name[0],
                tutorRating: p.rating, tutorPrice: p.pricing.values.firstOrNull ?? 500, tutorStudents: p.students.length)));
            }, style: OutlinedButton.styleFrom(foregroundColor: HG.dark, padding: EdgeInsets.symmetric(vertical: 12), shape: const StadiumBorder(), side: BorderSide(color: HG.grey200), textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font)), child: Text('Book Demo'))),
          ] : [
            Expanded(child: OutlinedButton(onPressed: _openEditProfile, style: OutlinedButton.styleFrom(foregroundColor: HG.dark, padding: EdgeInsets.symmetric(vertical: 12), shape: const StadiumBorder(), side: BorderSide(color: HG.grey200), textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font)), child: Text('Edit Profile'))),
            const SizedBox(width: 8),
            Expanded(child: OutlinedButton.icon(onPressed: () {}, icon: Icon(PhosphorIconsFill.rocketLaunch, size: 13, color: HG.orange), label: Text('Boost Profile'), style: OutlinedButton.styleFrom(foregroundColor: HG.dark, padding: EdgeInsets.symmetric(vertical: 12), shape: const StadiumBorder(), side: BorderSide(color: HG.grey200), textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font)))),
          ]),
        ]),
      ),
      // Nav buttons
      Positioned(top: pt + 10, left: 16, child: IconButton.filledTonal(
        onPressed: () => Navigator.pop(context), icon: Icon(PhosphorIconsRegular.caretLeft, size: 16),
        style: IconButton.styleFrom(backgroundColor: HG.surface.withValues(alpha: 0.75), foregroundColor: HG.dark, fixedSize: const Size(34, 34)),
      )),
      Positioned(top: pt + 10, right: 16, child: Container(
        padding: EdgeInsets.symmetric(horizontal: 4, vertical: 4),
        decoration: BoxDecoration(
          color: HG.surface.withValues(alpha: 0.75),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          _navBtn(PhosphorIconsRegular.wallet, () => Navigator.push(context, MaterialPageRoute(builder: (_) => const WalletPage()))),
          const SizedBox(width: 2),
          _navBtn(isDark ? PhosphorIconsFill.moon : PhosphorIconsRegular.sun, () { themeManager.toggle(context); }),
          const SizedBox(width: 2),
          _navBtn(PhosphorIconsRegular.shareFat, () {}),
          if (!_visitorMode) ...[const SizedBox(width: 2),
          _navBtn(_visitorMode ? PhosphorIconsFill.eye : PhosphorIconsRegular.eye, () => setState(() => _visitorMode = !_visitorMode))],
        ]),
      )),
      // Avatar
      Positioned(top: 100 + pt - 44, left: 20, child: GestureDetector(onTap: _visitorMode ? null : _pickAvatar, child: Stack(children: [
        Container(width: 88, height: 88, decoration: BoxDecoration(shape: BoxShape.circle, color: HG.surface, border: Border.all(color: HG.surface, width: 4)),
          child: ClipOval(child: p.avatar != null ? Image.file(p.avatar!, width: 80, height: 80, fit: BoxFit.cover, cacheWidth: 160) : Container(color: HG.grey50, child: Icon(PhosphorIconsRegular.user, size: 32, color: HG.grey300)))),
        if (!_visitorMode) Positioned(bottom: 2, right: 2, child: Container(width: 28, height: 28, decoration: BoxDecoration(color: HG.fixedDark, shape: BoxShape.circle, border: Border.all(color: HG.surface, width: 2.5)), child: Icon(PhosphorIconsFill.camera, size: 12, color: HG.fixedWhite))),
      ]))),
    ]));
  }

  Widget _navBtn(IconData icon, VoidCallback onTap) => IconButton(
    onPressed: onTap, icon: Icon(icon, size: 16),
    style: IconButton.styleFrom(
      foregroundColor: HG.dark,
      fixedSize: const Size(32, 32),
      padding: EdgeInsets.zero,
    ),
  );

  Widget _stat(String v, String l) => Expanded(child: Column(children: [Text(v, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: HG.dark)), const SizedBox(height: 2), Text(l, style: TextStyle(fontSize: 11, color: HG.textMuted))]));

  Widget _shimmerBox(double w, double h, {double r = 8}) => Container(width: w, height: h, decoration: BoxDecoration(color: HG.grey200, borderRadius: BorderRadius.circular(r)));
  Widget _shimmerHeader(double pt) {
    final isDark = context.isDark;
    return Stack(children: [
      Container(height: 140 + pt, color: isDark ? HG.grey100 : HG.powderBlue),
      Container(margin: EdgeInsets.only(top: 100 + pt), decoration: BoxDecoration(color: HG.surface, borderRadius: BorderRadius.vertical(top: Radius.circular(28))), padding: EdgeInsets.fromLTRB(20, 56, 20, 16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          _shimmerBox(140, 16, r: 4), const SizedBox(height: 8), _shimmerBox(100, 12, r: 4), const SizedBox(height: 12),
          _shimmerBox(double.infinity, 14, r: 4), const SizedBox(height: 6), _shimmerBox(200, 14, r: 4), const SizedBox(height: 14),
          Row(children: List.generate(5, (_) => Expanded(child: Padding(padding: EdgeInsets.symmetric(horizontal: 4), child: Column(children: [_shimmerBox(30, 18, r: 4), const SizedBox(height: 4), _shimmerBox(40, 10, r: 4)]))))),
          const SizedBox(height: 14),
          Row(children: [Expanded(child: _shimmerBox(double.infinity, 40, r: 100)), const SizedBox(width: 8), Expanded(child: _shimmerBox(double.infinity, 40, r: 100))]),
        ])),
      Positioned(top: 100 + pt - 44, left: 20, child: Container(width: 88, height: 88, decoration: BoxDecoration(color: HG.grey200, shape: BoxShape.circle, border: Border.all(color: HG.surface, width: 4)))),
    ]);
  }
}

class _TabDelegate extends SliverPersistentHeaderDelegate {
  final TabController ctrl;
  _TabDelegate(this.ctrl);
  @override double get minExtent => 46;
  @override double get maxExtent => 46;
  @override Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) => Container(color: HG.surface, child: TabBar(
    controller: ctrl, labelColor: HG.dark, unselectedLabelColor: HG.textLight,
    isScrollable: true, tabAlignment: TabAlignment.start,
    labelStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font),
    unselectedLabelStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, fontFamily: HG.font),
    indicatorColor: HG.dark, indicatorWeight: 2.5, indicatorSize: TabBarIndicatorSize.label,
    dividerColor: HG.grey200, dividerHeight: 1, splashFactory: NoSplash.splashFactory,
    overlayColor: WidgetStateProperty.all(Colors.transparent),
    padding: EdgeInsets.symmetric(horizontal: 12),
    tabs: const [Tab(text: 'About'), Tab(text: 'Activity'), Tab(text: 'Calendar'), Tab(text: 'Reviews'), Tab(text: 'Credentials')],
  ));
  @override bool shouldRebuild(covariant _TabDelegate old) => true;
}
