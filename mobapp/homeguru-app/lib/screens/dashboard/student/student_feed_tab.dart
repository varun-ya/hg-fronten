import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../services/blog_service.dart';
import '../../../components/blog/blog_detail_page.dart';
import '../../../components/dashboard/shared/hg_shorts_feed.dart';

class StudentFeedTab extends StatefulWidget {
  const StudentFeedTab({super.key});
  @override
  State<StudentFeedTab> createState() => _StudentFeedTabState();
}

class _StudentFeedTabState extends State<StudentFeedTab> with SingleTickerProviderStateMixin {
  late final TabController _tab;
  List<BlogArticle> _blogs = BlogService.fallback;
  bool _loadingMore = false;
  final _scrollCtrl = ScrollController();

  @override
  void initState() {
    super.initState();
    _tab = TabController(length: 2, vsync: this);
    _scrollCtrl.addListener(_onScroll);
    _load();
  }

  @override
  void dispose() { _tab.dispose(); _scrollCtrl.dispose(); super.dispose(); }

  void _onScroll() {
    if (_scrollCtrl.position.pixels >= _scrollCtrl.position.maxScrollExtent - 400 && !_loadingMore) _loadMore();
  }

  Future<void> _load() async {
    final blogs = await BlogService.fetch();
    if (mounted) setState(() => _blogs = blogs);
  }

  Future<void> _loadMore() async {
    _loadingMore = true;
    final more = await BlogService.fetchMore();
    if (mounted && more.isNotEmpty) setState(() => _blogs = [..._blogs, ...more]);
    _loadingMore = false;
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: NestedScrollView(
          physics: const ClampingScrollPhysics(),
          headerSliverBuilder: (_, __) => [
            SliverToBoxAdapter(child: Padding(
              padding: EdgeInsets.fromLTRB(20, pt + 14, 20, 12),
              child: Text('Feed', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
            )),
            SliverPersistentHeader(pinned: true, delegate: _Tabs(_tab)),
          ],
          body: TabBarView(controller: _tab, children: [
            // For you — blogs
            RefreshIndicator(
              onRefresh: () async { HapticFeedback.mediumImpact(); await _load(); },
              color: HG.blue,
              child: ListView.builder(
                controller: _scrollCtrl,
                padding: EdgeInsets.fromLTRB(16, 14, 16, 80),
                physics: const AlwaysScrollableScrollPhysics(parent: ClampingScrollPhysics()),
                itemCount: _blogs.length + 1,
                itemBuilder: (_, i) {
                  if (i == _blogs.length) return Padding(padding: EdgeInsets.symmetric(vertical: 24),
                    child: Center(child: SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 1.5, color: HG.grey300))));
                  return _BlogCard(blog: _blogs[i]);
                },
              ),
            ),
            // HG Shorts
            const HgShortsFeed(),
          ]),
        ),
      ),
    );
  }
}

class _Tabs extends SliverPersistentHeaderDelegate {
  final TabController ctrl;
  _Tabs(this.ctrl);
  @override double get minExtent => 42;
  @override double get maxExtent => 42;
  @override Widget build(BuildContext ctx, double _, bool __) => Container(
    color: HG.white,
    child: TabBar(
      controller: ctrl,
      labelColor: HG.dark, unselectedLabelColor: HG.textLight,
      labelStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, fontFamily: HG.font),
      unselectedLabelStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, fontFamily: HG.font),
      indicatorColor: HG.blue, indicatorWeight: 2.5, indicatorSize: TabBarIndicatorSize.label,
      dividerColor: HG.grey200, dividerHeight: 0.5,
      splashFactory: NoSplash.splashFactory,
      tabs: const [Tab(text: 'For you'), Tab(text: 'HG Shorts')],
    ),
  );
  @override bool shouldRebuild(covariant _Tabs old) => false;
}

// ── Blog Card with double-tap clap + long-press preview ──
class _BlogCard extends StatefulWidget {
  final BlogArticle blog;
  const _BlogCard({required this.blog});
  @override
  State<_BlogCard> createState() => _BlogCardState();
}

class _BlogCardState extends State<_BlogCard> with SingleTickerProviderStateMixin {
  bool _clapped = false;
  bool _saved = false;
  bool _showClap = false;
  bool _pressed = false;
  late final AnimationController _animCtrl;
  late final Animation<double> _animScale;

  @override
  void initState() {
    super.initState();
    _animCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 600));
    _animScale = TweenSequence<double>([
      TweenSequenceItem(tween: Tween(begin: 0.0, end: 1.2).chain(CurveTween(curve: Curves.easeOutBack)), weight: 40),
      TweenSequenceItem(tween: Tween(begin: 1.2, end: 1.0).chain(CurveTween(curve: Curves.easeInOut)), weight: 20),
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 1.0), weight: 20),
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 0.0).chain(CurveTween(curve: Curves.easeIn)), weight: 20),
    ]).animate(_animCtrl);
    _animCtrl.addStatusListener((s) { if (s == AnimationStatus.completed) setState(() => _showClap = false); });
  }

  @override
  void dispose() { _animCtrl.dispose(); super.dispose(); }

  void _doubleTapClap() {
    HapticFeedback.mediumImpact();
    setState(() { _clapped = true; _showClap = true; });
    _animCtrl.forward(from: 0);
  }

  void _onLongPress(BuildContext context, BlogArticle blog) {
    HapticFeedback.heavyImpact();
    showDialog(
      context: context, barrierDismissible: true, barrierColor: Colors.transparent,
      builder: (ctx) => BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
        child: Container(color: Colors.black38, child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: () => Navigator.pop(ctx),
          child: Center(child: GestureDetector(onTap: () {}, child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 28),
            child: Material(
              elevation: 16, shadowColor: Colors.black26, color: HG.white,
              borderRadius: BorderRadius.circular(24), clipBehavior: Clip.antiAlias,
              child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
                Padding(padding: EdgeInsets.fromLTRB(18, 18, 18, 14), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(blog.author, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
                  const SizedBox(height: 8),
                  Text(blog.title, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: HG.dark, height: 1.3)),
                  const SizedBox(height: 6),
                  Text(blog.subtitle, maxLines: 3, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 14, color: HG.textMuted, height: 1.45)),
                ])),
                Divider(height: 0.5, color: HG.grey200),
                _menuRow(PhosphorIconsFill.handsClapping, _clapped ? 'Clapped' : 'Clap', _clapped ? HG.orange : null, () { Navigator.pop(ctx); _doubleTapClap(); }),
                Divider(height: 0.5, indent: 48, color: HG.grey200),
                _menuRow(PhosphorIconsRegular.bookmarkSimple, _saved ? 'Saved' : 'Save', _saved ? HG.blue : null, () { Navigator.pop(ctx); HapticFeedback.lightImpact(); setState(() => _saved = !_saved); }),
                Divider(height: 0.5, indent: 48, color: HG.grey200),
                _menuRow(PhosphorIconsRegular.shareFat, 'Share', null, () => Navigator.pop(ctx)),
                Divider(height: 0.5, indent: 48, color: HG.grey200),
                _menuRow(PhosphorIconsRegular.arrowSquareOut, 'Open article', HG.blue, () {
                  Navigator.pop(ctx);
                  Navigator.push(context, MaterialPageRoute(builder: (_) => BlogDetailPage(blog: (
                    title: blog.title, subtitle: blog.subtitle, body: blog.body,
                    tag: blog.tag, readTime: blog.readTime, date: blog.date,
                    likes: blog.likes, comments: blog.comments, author: blog.author,
                  ), article: blog)));
                }),
              ]),
            ),
          ))),
        )),
      ),
    );
  }

  static Widget _menuRow(IconData icon, String label, Color? color, VoidCallback onTap) => GestureDetector(
    onTap: () { HapticFeedback.selectionClick(); onTap(); },
    behavior: HitTestBehavior.opaque,
    child: Padding(padding: EdgeInsets.symmetric(horizontal: 18, vertical: 13),
      child: Row(children: [Icon(icon, size: 18, color: color ?? HG.dark), const SizedBox(width: 12), Text(label, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: color ?? HG.dark))])),
  );

  @override
  Widget build(BuildContext context) {
    final blog = widget.blog;
    final local = blog.source == 'HomeGuru';
    return GestureDetector(
      onDoubleTap: _doubleTapClap,
      onLongPress: () => _onLongPress(context, blog),
      onTapDown: (_) => setState(() => _pressed = true),
      onTapUp: (_) => setState(() => _pressed = false),
      onTapCancel: () => setState(() => _pressed = false),
      onTap: () => Navigator.push(context, PageRouteBuilder(
        pageBuilder: (_, __, ___) => BlogDetailPage(blog: (
          title: blog.title, subtitle: blog.subtitle, body: blog.body,
          tag: blog.tag, readTime: blog.readTime, date: blog.date,
          likes: blog.likes, comments: blog.comments, author: blog.author,
        ), article: blog),
        transitionDuration: const Duration(milliseconds: 300),
        reverseTransitionDuration: const Duration(milliseconds: 250),
        transitionsBuilder: (_, a, __, c) => SlideTransition(
          position: Tween(begin: const Offset(1, 0), end: Offset.zero).animate(
            CurvedAnimation(parent: a, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)), child: c),
      )),
      child: AnimatedScale(scale: _pressed ? 0.97 : 1.0, duration: const Duration(milliseconds: 100), curve: Curves.easeOut,
        child: Stack(children: [
          Card(elevation: 0, color: HG.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: HG.grey200)),
            margin: EdgeInsets.only(bottom: 12),
            child: Padding(padding: EdgeInsets.all(16), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                CircleAvatar(radius: 11, backgroundColor: local ? HG.powderBlue : HG.grey100,
                  child: Text(blog.author[0], style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: local ? HG.blue : HG.grey500))),
                const SizedBox(width: 7),
                Text(blog.author, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark)),
                if (local) ...[const SizedBox(width: 3), Icon(PhosphorIconsFill.sealCheck, size: 12, color: HG.blue)],
                const Spacer(),
                Text(blog.date, style: TextStyle(fontSize: 11, color: HG.textLight)),
              ]),
              const SizedBox(height: 8),
              Text(blog.title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: HG.dark, height: 1.3, letterSpacing: -0.2)),
              const SizedBox(height: 4),
              Text(blog.subtitle, maxLines: 2, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.45)),
              const SizedBox(height: 10),
              Row(children: [
                Chip(label: Text(blog.tag), labelStyle: TextStyle(fontSize: 11, color: HG.dark, fontFamily: HG.font),
                  backgroundColor: HG.grey50, side: BorderSide.none, shape: const StadiumBorder(),
                  visualDensity: VisualDensity.compact, materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  padding: EdgeInsets.zero, labelPadding: EdgeInsets.symmetric(horizontal: 6)),
                const SizedBox(width: 8),
                Text(blog.readTime, style: TextStyle(fontSize: 12, color: HG.textLight)),
                const Spacer(),
                GestureDetector(onTap: () { HapticFeedback.lightImpact(); setState(() => _clapped = !_clapped); },
                  child: AnimatedSwitcher(duration: const Duration(milliseconds: 200),
                    transitionBuilder: (child, anim) => ScaleTransition(scale: anim, child: child),
                    child: Icon(_clapped ? PhosphorIconsFill.handsClapping : PhosphorIconsRegular.handsClapping,
                      key: ValueKey(_clapped), size: 16, color: _clapped ? HG.orange : HG.textLight))),
                const SizedBox(width: 4),
                Text('${blog.likes + (_clapped ? 1 : 0)}', style: TextStyle(fontSize: 12, color: _clapped ? HG.orange : HG.textLight)),
                const SizedBox(width: 12),
                GestureDetector(onTap: () { HapticFeedback.lightImpact(); setState(() => _saved = !_saved); },
                  child: AnimatedSwitcher(duration: const Duration(milliseconds: 200),
                    transitionBuilder: (child, anim) => ScaleTransition(scale: anim, child: child),
                    child: Icon(_saved ? PhosphorIconsFill.bookmarkSimple : PhosphorIconsRegular.bookmarkSimple,
                      key: ValueKey(_saved), size: 16, color: _saved ? HG.blue : HG.textLight))),
              ]),
            ])),
          ),
          if (_showClap) Positioned.fill(child: Center(child: AnimatedBuilder(animation: _animScale,
            builder: (_, __) => Transform.scale(scale: _animScale.value,
              child: Icon(PhosphorIconsFill.handsClapping, size: 60, color: HG.orange.withValues(alpha: 0.9)))))),
        ]),
      ),
    );
  }
}
