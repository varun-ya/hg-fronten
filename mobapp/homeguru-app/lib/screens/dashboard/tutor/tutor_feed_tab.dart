import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/tutor_data.dart';
import '../../../models/user_session.dart';
import '../../../components/dashboard/shared/hg_shorts_feed.dart';
import '../../../services/blog_service.dart';
import '../../../components/blog/blog_detail_page.dart';
import '../../../components/blog/blog_editor_page.dart';
import '../../wallet/wallet_page.dart';
import '../../notifications/notifications_page.dart';

const _igGrad = [Color(0xFFFBAA47), Color(0xFFD91A46), Color(0xFFA60F93)];

/// Set this to request a tab switch from outside (e.g. PriorityCard).
final feedTabRequest = ValueNotifier<int?>(null);

class TutorFeedTab extends StatefulWidget {
  const TutorFeedTab({super.key});

  @override
  State<TutorFeedTab> createState() => _TutorFeedTabState();
}

class _TutorFeedTabState extends State<TutorFeedTab> with SingleTickerProviderStateMixin {
  TabController? _tab;

  @override
  void initState() {
    super.initState();
    _tab = TabController(length: 3, vsync: this);
    feedTabRequest.addListener(_onFeedTabRequest);
  }

  void _onFeedTabRequest() {
    final idx = feedTabRequest.value;
    if (idx != null && _tab != null) {
      // Delay to ensure the widget is visible after IndexedStack switch
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted && _tab != null) {
          _tab!.animateTo(idx);
        }
      });
      feedTabRequest.value = null;
    }
  }

  @override
  void dispose() {
    feedTabRequest.removeListener(_onFeedTabRequest);
    _tab?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    if (_tab == null) return const SizedBox.shrink();
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle(statusBarColor: HG.powderBlue, statusBarIconBrightness: Brightness.dark),
      child: Scaffold(
        backgroundColor: HG.surface,
        body: NestedScrollView(
          physics: const ClampingScrollPhysics(),
          headerSliverBuilder: (_, __) => [
            // ── Powder blue header ──
            SliverToBoxAdapter(child: Container(
              color: HG.powderBlue,
              padding: EdgeInsets.fromLTRB(16, pt + 12, 16, 24),
              child: Row(children: [
                Icon(PhosphorIconsRegular.list, size: 22, color: HG.blue),
                const Spacer(),
                Image.asset('assets/profileHeader.png', height: 18, fit: BoxFit.contain),
                const Spacer(),
                GestureDetector(
                  onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const WalletPage())),
                  child: Icon(PhosphorIconsRegular.wallet, size: 21, color: HG.blue),
                ),
                const SizedBox(width: 14),
                GestureDetector(
                  onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const NotificationsPage())),
                  child: Stack(children: [
                    Icon(PhosphorIconsRegular.bell, size: 21, color: HG.blue),
                    Positioned(top: 1, right: 1, child: Container(width: 6, height: 6,
                      decoration: BoxDecoration(color: HG.orange, shape: BoxShape.circle, border: Border.all(color: HG.powderBlue, width: 1.2)))),
                  ]),
                ),
              ]),
            )),
            // ── Stories — white card curving over blue ──
            SliverToBoxAdapter(child: Container(
              color: HG.powderBlue,
              child: Container(
                decoration: BoxDecoration(
                  color: HG.white,
                  borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                ),
                child: const _Stories(),
              ),
            )),
            SliverToBoxAdapter(child: Divider(height: 0.5, thickness: 0.5, color: HG.grey200)),
            // ── Tabs ──
            SliverPersistentHeader(pinned: true, delegate: _PinnedTabs(_tab!)),
          ],
          body: TabBarView(controller: _tab!, physics: const _HighDragThresholdPhysics(), children: const [_ForYouFeed(), HgShortsFeed(), _RequestsFeed()]),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            HapticFeedback.mediumImpact();
            Navigator.push(context, PageRouteBuilder(
              pageBuilder: (_, __, ___) => const BlogEditorPage(),
              transitionDuration: const Duration(milliseconds: 300),
              reverseTransitionDuration: const Duration(milliseconds: 250),
              transitionsBuilder: (_, anim, __, child) => SlideTransition(
                position: Tween(begin: const Offset(0, 1), end: Offset.zero).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic)), child: child),
            ));
          },
          backgroundColor: HG.blue, foregroundColor: HG.white, elevation: 4,
          shape: const CircleBorder(),
          child: Icon(PhosphorIconsBold.pencilSimpleLine, size: 19),
        ),
      ),
    );
  }


}

// ── Stories ──
class _Stories extends StatelessWidget {
  const _Stories();
  static const _names = ['Aarav', 'Priya', 'Rohan', 'Sneha', 'Amit', 'Kavya', 'Rahul'];

  @override
  Widget build(BuildContext context) {
    final you = UserSession.name.isNotEmpty ? UserSession.name[0] : 'T';
    return SizedBox(
      height: 104,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        physics: const ClampingScrollPhysics(),
        padding: EdgeInsets.fromLTRB(14, 10, 14, 6),
        itemCount: _names.length + 1,
        separatorBuilder: (_, __) => const SizedBox(width: 12),
        itemBuilder: (_, i) {
          if (i == 0) return _yours(you);
          return _story(_names[i - 1], seen: i > 4);
        },
      ),
    );
  }

  static Widget _yours(String letter) => SizedBox(
    width: 68,
    child: Column(mainAxisSize: MainAxisSize.min, children: [
      Stack(clipBehavior: Clip.none, children: [
        Container(width: 62, height: 62,
          decoration: BoxDecoration(shape: BoxShape.circle, color: HG.grey50, border: Border.all(color: HG.grey200, width: 1)),
          padding: EdgeInsets.all(3),
          child: CircleAvatar(radius: 28, backgroundColor: HG.grey100,
            child: Text(letter, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: HG.grey500)))),
        Positioned(bottom: 0, right: 2, child: Container(width: 20, height: 20,
          decoration: BoxDecoration(color: HG.blue, shape: BoxShape.circle, border: Border.all(color: HG.fixedWhite, width: 2)),
          child: Icon(PhosphorIconsBold.plus, size: 9, color: HG.fixedWhite))),
      ]),
      const SizedBox(height: 6),
      Text('Your story', style: TextStyle(fontSize: 10, color: HG.textMuted), overflow: TextOverflow.ellipsis),
    ]),
  );

  static Widget _story(String name, {required bool seen}) => SizedBox(
    width: 68,
    child: Column(mainAxisSize: MainAxisSize.min, children: [
      Container(
        width: 62, height: 62,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          gradient: seen ? null : const LinearGradient(begin: Alignment.topRight, end: Alignment.bottomLeft, colors: _igGrad),
          border: seen ? Border.all(color: HG.grey200, width: 1) : null,
        ),
        padding: EdgeInsets.all(seen ? 3 : 2.5),
        child: Container(
          decoration: BoxDecoration(shape: BoxShape.circle, color: HG.white),
          padding: EdgeInsets.all(2),
          child: CircleAvatar(radius: 26, backgroundColor: HG.grey100,
            child: Text(name[0], style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: HG.grey500))),
        ),
      ),
      const SizedBox(height: 6),
      Text(name, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w500, color: seen ? HG.textLight : HG.dark), overflow: TextOverflow.ellipsis),
    ]),
  );
}

// ── Pinned Tabs ──
class _PinnedTabs extends SliverPersistentHeaderDelegate {
  final TabController ctrl;
  _PinnedTabs(this.ctrl);
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
      tabs: const [Tab(text: 'For you'), Tab(text: 'HG Shorts'), Tab(text: 'Requests')],
    ),
  );
  @override bool shouldRebuild(covariant _PinnedTabs old) => false;
}

// ── For You Feed (Blogs — fetched + local) ──
class _ForYouFeed extends StatefulWidget {
  const _ForYouFeed();
  @override
  State<_ForYouFeed> createState() => _ForYouFeedState();
}

class _ForYouFeedState extends State<_ForYouFeed> with AutomaticKeepAliveClientMixin {
  List<BlogArticle> _blogs = BlogService.fallback;
  bool _loadingMore = false;
  final _scrollCtrl = ScrollController();

  @override
  bool get wantKeepAlive => true;

  @override
  void initState() {
    super.initState();
    _scrollCtrl.addListener(_onScroll);
    _load();
  }

  @override
  void dispose() { _scrollCtrl.dispose(); super.dispose(); }

  void _onScroll() {
    if (_scrollCtrl.position.pixels >= _scrollCtrl.position.maxScrollExtent - 300 && !_loadingMore) {
      _loadMore();
    }
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
    super.build(context);
    return ListView.builder(
      controller: _scrollCtrl,
      padding: EdgeInsets.fromLTRB(16, 14, 16, 80),
      physics: const ClampingScrollPhysics(),
      itemCount: _blogs.length,
      itemBuilder: (_, i) {
        final b = _blogs[i];
        final isLocal = b.source == 'HomeGuru';
        return GestureDetector(
          onTap: () => Navigator.push(context, PageRouteBuilder(
            pageBuilder: (_, __, ___) => BlogDetailPage(blog: (
              title: b.title, subtitle: b.subtitle, body: b.body,
              tag: b.tag, readTime: b.readTime, date: b.date,
              likes: b.likes, comments: b.comments, author: b.author,
            ), article: b),
            transitionDuration: const Duration(milliseconds: 300),
            reverseTransitionDuration: const Duration(milliseconds: 250),
            transitionsBuilder: (_, anim, __, child) {
              final curved = CurvedAnimation(parent: anim, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic);
              return SlideTransition(position: Tween(begin: const Offset(1, 0), end: Offset.zero).animate(curved), child: child);
            },
          )),
          child: Card(
            elevation: 0,
            color: HG.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: HG.grey200)),
            margin: EdgeInsets.only(bottom: 12),
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                CircleAvatar(radius: 11, backgroundColor: isLocal ? HG.powderBlue : HG.grey100,
                  child: Text(b.author[0], style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: isLocal ? HG.blue : HG.grey500))),
                const SizedBox(width: 7),
                Text(b.author, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark)),
                if (isLocal) ...[const SizedBox(width: 3), Icon(PhosphorIconsFill.sealCheck, size: 12, color: HG.blue)],
                if (!isLocal) ...[const SizedBox(width: 6), Container(
                  padding: EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                  decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(6)),
                  child: Text(b.source, style: TextStyle(fontSize: 9, fontWeight: FontWeight.w500, color: HG.textMuted)),
                )]
                else ...[const SizedBox(width: 6), Container(
                  padding: EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                  decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(6)),
                  child: Text.rich(TextSpan(children: [
                    TextSpan(text: 'home', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: HG.blue)),
                    TextSpan(text: 'Guru', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: HG.orange)),
                  ])),
                )],
                const Spacer(),
                Text(b.date, style: TextStyle(fontSize: 11, color: HG.textLight)),
              ]),
              const SizedBox(height: 8),
              Text(b.title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: HG.dark, height: 1.3, letterSpacing: -0.2)),
              const SizedBox(height: 4),
              Text(b.subtitle, maxLines: 2, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.45)),
              const SizedBox(height: 10),
              Row(children: [
                Chip(label: Text(b.tag), labelStyle: TextStyle(fontSize: 11, color: HG.dark, fontFamily: HG.font),
                  backgroundColor: HG.grey50, side: BorderSide.none, shape: const StadiumBorder(),
                  visualDensity: VisualDensity.compact, materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  padding: EdgeInsets.zero, labelPadding: EdgeInsets.symmetric(horizontal: 6)),
                const SizedBox(width: 8),
                Text(b.readTime, style: TextStyle(fontSize: 12, color: HG.textLight)),
                if (b.likes > 0) ...[const Spacer(),
                  Icon(PhosphorIconsRegular.handsClapping, size: 14, color: HG.textLight), const SizedBox(width: 3),
                  Text('${b.likes}', style: TextStyle(fontSize: 12, color: HG.textLight)),
                  const SizedBox(width: 10),
                  Icon(PhosphorIconsRegular.chatCircle, size: 14, color: HG.textLight), const SizedBox(width: 3),
                  Text('${b.comments}', style: TextStyle(fontSize: 12, color: HG.textLight)),
                ],
                const SizedBox(width: 10),
                Icon(PhosphorIconsRegular.bookmarkSimple, size: 14, color: HG.textLight),
              ]),
            ]),
            ),
          ),
        );
      },
    );
  }
}

// ── Requests Feed ──
class _RequestsFeed extends StatelessWidget {
  const _RequestsFeed();

  @override
  Widget build(BuildContext context) {
    final d = TutorDataProvider.maybeOf(context);
    final reqs = d?.demoRequests ?? [];
    return ListView(
      padding: EdgeInsets.zero,
      physics: const ClampingScrollPhysics(),
      children: [
        for (int i = 0; i < reqs.length; i++) ...[
          _Req(name: reqs[i].name, handle: reqs[i].handle, time: reqs[i].time, subject: reqs[i].subject, grade: reqs[i].grade, message: reqs[i].message),
          if (i < reqs.length - 1) const _Div(),
        ],
        const SizedBox(height: 80),
      ],
    );
  }
}

class _Req extends StatelessWidget {
  final String name, handle, time, subject, grade, message;
  const _Req({required this.name, required this.handle, required this.time, required this.subject, required this.grade, required this.message});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(16, 12, 14, 14),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        CircleAvatar(radius: 20, backgroundColor: HG.grey100,
          child: Text(name[0], style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.grey500))),
        const SizedBox(width: 10),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Flexible(child: Text(name, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark), overflow: TextOverflow.ellipsis)),
            Text('  @$handle  \u00b7  $time', style: TextStyle(fontSize: 13, color: HG.textLight)),
          ]),
          const SizedBox(height: 4),
          Row(children: [
            Chip(label: Text(subject), labelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: HG.blue, fontFamily: HG.font),
              backgroundColor: HG.powderBlue, side: BorderSide.none, shape: const StadiumBorder(),
              visualDensity: VisualDensity.compact, materialTapTargetSize: MaterialTapTargetSize.shrinkWrap, padding: EdgeInsets.zero, labelPadding: EdgeInsets.symmetric(horizontal: 6)),
            const SizedBox(width: 6),
            Chip(label: Text(grade), labelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: HG.dark, fontFamily: HG.font),
              backgroundColor: HG.grey100, side: BorderSide.none, shape: const StadiumBorder(),
              visualDensity: VisualDensity.compact, materialTapTargetSize: MaterialTapTargetSize.shrinkWrap, padding: EdgeInsets.zero, labelPadding: EdgeInsets.symmetric(horizontal: 6)),
          ]),
          const SizedBox(height: 6),
          Text(message, style: TextStyle(fontSize: 15, color: HG.dark, height: 1.42)),
          const SizedBox(height: 12),
          Row(children: [
            Expanded(child: FilledButton(
                onPressed: () {},
                style: FilledButton.styleFrom(
                  backgroundColor: HG.blue, foregroundColor: HG.white,
                  padding: EdgeInsets.symmetric(vertical: 8),
                  shape: const StadiumBorder(),
                  textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font),
                ),
                child: Text('Accept'),
              )),
            const SizedBox(width: 8),
            Expanded(child: OutlinedButton(
                onPressed: () {},
                style: OutlinedButton.styleFrom(
                  foregroundColor: HG.dark,
                  padding: EdgeInsets.symmetric(vertical: 8),
                  shape: const StadiumBorder(),
                  side: BorderSide(color: HG.grey200),
                  textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, fontFamily: HG.font),
                ),
                child: Text('Decline'),
              )),
          ]),
        ])),
      ]),
    );
  }
}

class _Div extends StatelessWidget {
  const _Div();
  @override
  Widget build(BuildContext context) => Divider(height: 0.5, thickness: 0.5, color: HG.grey200);
}

class _HighDragThresholdPhysics extends ScrollPhysics {
  const _HighDragThresholdPhysics({super.parent});
  @override
  _HighDragThresholdPhysics applyTo(ScrollPhysics? ancestor) => _HighDragThresholdPhysics(parent: buildParent(ancestor));
  @override
  double get dragStartDistanceMotionThreshold => 18.0;
}

