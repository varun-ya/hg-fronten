import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/searchable_tutor.dart';
import '../../../models/tutor_data.dart';
import '../../../services/blog_service.dart';
import '../../../services/osmium_ai.dart';
import '../../../components/blog/blog_detail_page.dart';
import '../../../components/dashboard/shared/profile_tab.dart';
import '../../../screens/booking/book_demo_page.dart';

// ── Filter options ──
const _subjectOpts = ['All Subjects', 'Maths', 'Physics', 'Chemistry', 'Biology', 'English'];
const _priceOpts = ['Any Price', 'Under ₹300', 'Under ₹400', 'Under ₹500', '₹500+'];
const _ratingOpts = ['Any Rating', '4.5+', '4.7+', '4.9+'];
const _expOpts = ['Any Experience', '2+ years', '5+ years', '7+ years'];
const _gradeOpts = ['Any Grade', 'Class 9-10', 'Class 11-12'];

class SearchResultsPage extends StatefulWidget {
  final String initialQuery;
  const SearchResultsPage({super.key, this.initialQuery = ''});
  @override
  State<SearchResultsPage> createState() => _SearchResultsPageState();
}

class _SearchResultsPageState extends State<SearchResultsPage> with SingleTickerProviderStateMixin {
  late final TextEditingController _ctrl;
  late final FocusNode _focus;
  late final TabController _tab;
  String _query = '';
  List<BlogArticle> _blogs = BlogService.fallback;
  List<int>? _aiMatches;
  List<int>? _aiSuggestions;
  bool _aiLoading = false;
  int _subjectIdx = 0, _priceIdx = 0, _ratingIdx = 0, _expIdx = 0, _gradeIdx = 0;

  @override
  void initState() {
    super.initState();
    _ctrl = TextEditingController(text: widget.initialQuery);
    _query = widget.initialQuery.toLowerCase();
    _focus = FocusNode();
    _tab = TabController(length: 2, vsync: this);
    if (widget.initialQuery.isEmpty) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _focus.requestFocus());
    } else {
      _debounceAI();
    }
    _loadBlogs();
  }

  Future<void> _loadBlogs() async {
    final blogs = await BlogService.fetch();
    if (mounted) setState(() => _blogs = blogs);
  }

  @override
  void dispose() { _ctrl.dispose(); _focus.dispose(); _tab.dispose(); super.dispose(); }

  void _onChanged(String v) {
    setState(() { _query = v.trim().toLowerCase(); _aiMatches = null; _aiSuggestions = null; });
    _debounceAI();
  }

  DateTime _lastType = DateTime.now();
  void _debounceAI() {
    _lastType = DateTime.now();
    final snap = _lastType;
    Future.delayed(const Duration(milliseconds: 600), () {
      if (_lastType == snap && _query.length >= 3 && mounted) _callAI();
    });
  }

  Future<void> _callAI() async {
    final filtered = _applyFilters(tutorDirectory.toList());
    if (filtered.isEmpty) return;
    setState(() => _aiLoading = true);
    final (m, s) = await OsmiumAI.rankTutors(_query, filtered);
    if (mounted) setState(() { _aiMatches = m; _aiSuggestions = s; _aiLoading = false; });
  }

  List<SearchableTutor> _applyFilters(List<SearchableTutor> list) {
    if (_subjectIdx > 0) {
      final s = _subjectOpts[_subjectIdx].toLowerCase();
      list = list.where((t) => t.subject.toLowerCase().contains(s)).toList();
    }
    if (_priceIdx > 0) {
      final limit = [0, 300, 400, 500, -1][_priceIdx];
      if (limit > 0) {
        list = list.where((t) => t.price <= limit).toList();
      } else {
        list = list.where((t) => t.price >= 500).toList();
      }
    }
    if (_ratingIdx > 0) {
      final min = [0.0, 4.5, 4.7, 4.9][_ratingIdx];
      list = list.where((t) => t.rating >= min).toList();
    }
    if (_expIdx > 0) {
      final min = [0, 2, 5, 7][_expIdx];
      list = list.where((t) => t.experience >= min).toList();
    }
    if (_gradeIdx > 0) {
      final grades = _gradeIdx == 1 ? ['Class 9', 'Class 10'] : ['Class 11', 'Class 12'];
      list = list.where((t) => t.grades.any((g) => grades.contains(g))).toList();
    }
    return list;
  }

  SearchResult get _searchResult {
    final list = _applyFilters(tutorDirectory.toList());
    if (_aiMatches != null && _query.isNotEmpty) {
      final matches = _aiMatches!.where((i) => i < list.length).map((i) => (list[i], TutorScore(100.0 - _aiMatches!.indexOf(i), 1, 1))).toList();
      final suggestions = (_aiSuggestions ?? []).where((i) => i < list.length).map((i) => (list[i], TutorScore(0, 0, 1))).toList();
      return SearchResult(matches: matches, suggestions: suggestions);
    }
    return searchTutors(_query, list);
  }

  // ── Blog filtering ──
  List<BlogArticle> get _filteredBlogs {
    if (_query.isEmpty) return _blogs;
    return _blogs.where((b) =>
      b.title.toLowerCase().contains(_query) ||
      b.author.toLowerCase().contains(_query) ||
      b.tag.toLowerCase().contains(_query) ||
      b.subtitle.toLowerCase().contains(_query)
    ).toList();
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: context.isDark ? HG.surface : const Color(0xFFF8F7F4),
        body: Column(children: [
          // ── Search bar ──
          Container(
            padding: EdgeInsets.fromLTRB(8, pt + 8, 16, 0),
            child: Row(children: [
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Padding(padding: EdgeInsets.all(8), child: Icon(PhosphorIconsBold.arrowLeft, size: 20, color: HG.dark)),
              ),
              const SizedBox(width: 4),
              Expanded(child: Container(
                height: 38,
                decoration: BoxDecoration(
                  color: context.isDark ? const Color(0xFF1A1A1A) : const Color(0xFFEFEDE9),
                  borderRadius: BorderRadius.circular(100),
                ),
                child: Row(children: [
                  const SizedBox(width: 14),
                  Icon(PhosphorIconsRegular.magnifyingGlass, size: 16, color: HG.textMuted),
                  const SizedBox(width: 8),
                  Expanded(child: TextField(
                    controller: _ctrl,
                    focusNode: _focus,
                    onChanged: _onChanged,
                    style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
                    decoration: InputDecoration(
                      hintText: 'e.g. maths tutor for class 12',
                      hintStyle: TextStyle(fontSize: 14, color: HG.textLight, fontFamily: HG.font),
                      border: InputBorder.none, contentPadding: EdgeInsets.zero, isDense: true,
                    ),
                  )),
                  if (_query.isNotEmpty) GestureDetector(
                    onTap: () { _ctrl.clear(); _onChanged(''); },
                    child: Padding(padding: EdgeInsets.only(right: 12), child: Icon(PhosphorIconsFill.xCircle, size: 15, color: HG.textLight)),
                  ),
                ]),
              )),
            ]),
          ),
          const SizedBox(height: 8),
          // ── Tabs ──
          Container(
            decoration: BoxDecoration(border: Border(bottom: BorderSide(color: HG.grey200, width: 0.5))),
            child: TabBar(
              controller: _tab,
              labelColor: HG.dark,
              unselectedLabelColor: HG.textLight,
              labelStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, fontFamily: HG.font),
              unselectedLabelStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, fontFamily: HG.font),
              indicatorColor: HG.dark,
              indicatorWeight: 2.5,
              indicatorSize: TabBarIndicatorSize.label,
              dividerColor: Colors.transparent,
              splashFactory: NoSplash.splashFactory,
              tabs: [
                Tab(child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Text('Tutors'),
                  const SizedBox(width: 6),
                  if (_aiLoading) SizedBox(width: 12, height: 12, child: CircularProgressIndicator(strokeWidth: 1.5, color: HG.blue))
                  else Container(
                    padding: EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                    decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(100)),
                    child: Text('${_searchResult.matches.length}', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.textMuted, fontFamily: HG.font)),
                  ),
                ])),
                Tab(child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Text('Blogs'),
                  const SizedBox(width: 6),
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                    decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(100)),
                    child: Text('${_filteredBlogs.length}', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.textMuted, fontFamily: HG.font)),
                  ),
                ])),
              ],
            ),
          ),
          // ── Tab content ──
          Expanded(child: TabBarView(
            controller: _tab,
            children: [
              _tutorsTab(),
              _blogsTab(),
            ],
          )),
        ]),
      ),
    );
  }

  Widget _tutorsTab() {
    final result = _searchResult;
    final hasM = result.matches.isNotEmpty;
    final hasS = result.suggestions.isNotEmpty;
    return Column(children: [
      SizedBox(height: 44, child: ListView(
        scrollDirection: Axis.horizontal, physics: const BouncingScrollPhysics(),
        padding: EdgeInsets.fromLTRB(16, 8, 16, 0),
        children: [
          _filterChip(_subjectOpts, _subjectIdx, (i) => setState(() => _subjectIdx = i)), const SizedBox(width: 8),
          _filterChip(_priceOpts, _priceIdx, (i) => setState(() => _priceIdx = i)), const SizedBox(width: 8),
          _filterChip(_ratingOpts, _ratingIdx, (i) => setState(() => _ratingIdx = i)), const SizedBox(width: 8),
          _filterChip(_expOpts, _expIdx, (i) => setState(() => _expIdx = i)), const SizedBox(width: 8),
          _filterChip(_gradeOpts, _gradeIdx, (i) => setState(() => _gradeIdx = i)),
        ],
      )),
      if (_aiMatches != null && _query.isNotEmpty) Padding(
        padding: EdgeInsets.fromLTRB(16, 8, 16, 0),
        child: Container(padding: EdgeInsets.symmetric(horizontal: 10, vertical: 6),
          decoration: BoxDecoration(color: HG.powderBlue, borderRadius: BorderRadius.circular(100)),
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            Icon(PhosphorIconsFill.sparkle, size: 11, color: HG.blue), const SizedBox(width: 5),
            Text('Ranked by Osmium AI', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.blue, fontFamily: HG.font)),
          ])),
      ),
      const SizedBox(height: 4),
      Expanded(child: !hasM && !hasS
        ? _empty('No tutors found', 'Try adjusting your filters or search')
        : ListView(padding: EdgeInsets.fromLTRB(16, 8, 16, 100), physics: const BouncingScrollPhysics(), children: [
            if (hasM) ...result.matches.asMap().entries.map((e) =>
              _TutorCard(tutor: e.value.$1, rank: e.key, isTopMatch: e.key < 3 && _query.isNotEmpty && e.value.$2.isStrongMatch)),
            if (!hasM && _query.isNotEmpty) Padding(padding: EdgeInsets.symmetric(vertical: 20), child: Column(children: [
              Icon(PhosphorIconsRegular.magnifyingGlass, size: 36, color: HG.grey300),
              const SizedBox(height: 10),
              Text('No exact matches', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: HG.textMuted)),
              const SizedBox(height: 4),
              Text('Try broadening your search', style: TextStyle(fontSize: 13, color: HG.textLight)),
            ])),
            if (hasS && _query.isNotEmpty) ...[
              Padding(padding: EdgeInsets.only(top: 8, bottom: 12), child: Row(children: [
                Container(width: 3, height: 14, decoration: BoxDecoration(color: HG.blue, borderRadius: BorderRadius.circular(2))),
                const SizedBox(width: 8),
                Text('Suggested for you', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
              ])),
              ...result.suggestions.asMap().entries.map((e) => _TutorCard(tutor: e.value.$1, rank: e.key)),
            ],
          ]),
      ),
    ]);
  }

  // ── Blogs tab ──
  Widget _blogsTab() {
    final blogs = _filteredBlogs;
    return blogs.isEmpty
      ? _empty('No blogs found', 'Try a different search term')
      : ListView.builder(
          padding: EdgeInsets.fromLTRB(16, 12, 16, 100),
          physics: const BouncingScrollPhysics(),
          itemCount: blogs.length,
          itemBuilder: (_, i) => _BlogCard(blog: blogs[i]),
        );
  }

  // ── Filter chip dropdown ──
  Widget _filterChip(List<String> options, int selected, ValueChanged<int> onChanged) {
    final active = selected > 0;
    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        showModalBottomSheet(
          context: context,
          backgroundColor: HG.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
          builder: (ctx) => SafeArea(child: Column(mainAxisSize: MainAxisSize.min, children: [
            const SizedBox(height: 8),
            Container(width: 36, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
            const SizedBox(height: 16),
            ...List.generate(options.length, (i) {
              final on = i == selected;
              return GestureDetector(
                onTap: () { onChanged(i); Navigator.pop(ctx); },
                behavior: HitTestBehavior.opaque,
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 20, vertical: 13),
                  color: on ? HG.powderBlue.withValues(alpha: 0.3) : Colors.transparent,
                  child: Row(children: [
                    Text(options[i], style: TextStyle(fontSize: 14, fontWeight: on ? FontWeight.w700 : FontWeight.w500, color: on ? HG.blue : HG.dark, fontFamily: HG.font)),
                    const Spacer(),
                    if (on) Icon(PhosphorIconsFill.checkCircle, size: 18, color: HG.blue),
                  ]),
                ),
              );
            }),
            const SizedBox(height: 16),
          ])),
        );
      },
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: active ? HG.dark : Colors.transparent,
          borderRadius: BorderRadius.circular(100),
          border: Border.all(color: active ? HG.dark : HG.grey200),
        ),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          Text(options[selected], style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: active ? HG.surface : HG.dark, fontFamily: HG.font)),
          const SizedBox(width: 4),
          Icon(PhosphorIconsRegular.caretDown, size: 10, color: active ? HG.surface : HG.textMuted),
        ]),
      ),
    );
  }

  Widget _empty(String title, String sub) => Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
    Icon(PhosphorIconsRegular.magnifyingGlass, size: 40, color: HG.grey300),
    const SizedBox(height: 12),
    Text(title, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: HG.textMuted)),
    const SizedBox(height: 4),
    Text(sub, style: TextStyle(fontSize: 13, color: HG.textLight)),
  ]));
}

// ═══════════════════════════════════════════════════════════════
// ── Tutor card ──
// ═══════════════════════════════════════════════════════════════

class _TutorCard extends StatelessWidget {
  final SearchableTutor tutor;
  final int rank;
  final bool isTopMatch;
  const _TutorCard({required this.tutor, required this.rank, this.isTopMatch = false});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        Navigator.push(context, PageRouteBuilder(
          pageBuilder: (_, __, ___) => ProfileTab(data: TutorData.fromSearchable(tutor), initialVisitorMode: true),
          transitionDuration: const Duration(milliseconds: 300),
          reverseTransitionDuration: const Duration(milliseconds: 250),
          transitionsBuilder: (_, a, __, c) => SlideTransition(
            position: Tween(begin: const Offset(0, 1), end: Offset.zero).animate(
              CurvedAnimation(parent: a, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)), child: c),
        ));
      },
      child: Container(
      margin: EdgeInsets.only(bottom: 14),
      decoration: BoxDecoration(
        color: HG.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: isTopMatch ? HG.blue.withValues(alpha: 0.3) : HG.grey200, width: isTopMatch ? 1.5 : 1),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        // ── Image hero ──
        SizedBox(
          height: 140,
          child: Stack(fit: StackFit.expand, children: [
            Image.network(tutor.imageUrl, fit: BoxFit.cover, cacheWidth: 600,
              loadingBuilder: (_, child, p) => p == null ? child : Container(color: HG.grey100),
              errorBuilder: (_, __, ___) => Container(color: const Color(0xFF1A1A1A),
                child: Center(child: Text(tutor.avatar, style: TextStyle(fontSize: 36, fontWeight: FontWeight.w800, color: Colors.white.withValues(alpha: 0.08)))))),
            // Gradient
            Positioned.fill(child: DecoratedBox(decoration: BoxDecoration(
              gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter,
                colors: [Colors.black.withValues(alpha: 0.15), Colors.transparent, Colors.black.withValues(alpha: 0.7)],
                stops: const [0.0, 0.4, 1.0]),
            ))),
            // Recommended badge
            if (isTopMatch) Positioned(top: 10, left: 10, child: Container(
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(100),
                boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.1), blurRadius: 8)]),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                Icon(PhosphorIconsFill.sparkle, size: 10, color: HG.blue),
                const SizedBox(width: 3),
                Text('Recommended', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: HG.blue, fontFamily: HG.font)),
              ]),
            )),
            // Price pill
            Positioned(top: 10, right: 10, child: Container(
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(100),
                boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.1), blurRadius: 8)]),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                Text('₹${tutor.price}', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: const Color(0xFF111111))),
                Text('/hr', style: TextStyle(fontSize: 8, color: const Color(0xFF888888))),
              ]),
            )),
            // Rating on image
            Positioned(bottom: 10, right: 10, child: Container(
              padding: EdgeInsets.symmetric(horizontal: 7, vertical: 3),
              decoration: BoxDecoration(color: Colors.black.withValues(alpha: 0.5), borderRadius: BorderRadius.circular(100)),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                Icon(PhosphorIconsFill.star, size: 10, color: const Color(0xFFFBBF24)),
                const SizedBox(width: 3),
                Text('${tutor.rating}', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Colors.white)),
              ]),
            )),
            // Name on image
            Positioned(bottom: 10, left: 12, right: 70, child: Text(tutor.name,
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: Colors.white, letterSpacing: -0.3, height: 1.1),
              maxLines: 1, overflow: TextOverflow.ellipsis)),
          ]),
        ),
        // ── Details section ──
        Padding(
          padding: EdgeInsets.fromLTRB(14, 12, 14, 10),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            // Subject + verified
            Row(children: [
              Icon(PhosphorIconsFill.sealCheck, size: 13, color: HG.blue),
              const SizedBox(width: 5),
              Text(tutor.subject, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
            ]),
            const SizedBox(height: 8),
            // Stats
            Row(children: [
              _statChip(PhosphorIconsRegular.users, '${tutor.students} students'),
              const SizedBox(width: 8),
              _statChip(PhosphorIconsRegular.briefcase, '${tutor.experience} yrs exp'),
              const SizedBox(width: 8),
              _statChip(PhosphorIconsRegular.globe, tutor.languages.split(',').first.trim()),
            ]),
            const SizedBox(height: 10),
            // Bio
            if (tutor.bio.isNotEmpty) Text(tutor.bio, style: TextStyle(fontSize: 12, color: HG.textMuted, height: 1.4), maxLines: 2, overflow: TextOverflow.ellipsis),
            if (tutor.bio.isNotEmpty) const SizedBox(height: 10),
            // Tags
            Wrap(spacing: 5, runSpacing: 5, children: [
              ...tutor.grades.take(2).map((g) => _tag(g)),
              ...tutor.tags.take(3).map((t) => _tag(t)),
            ]),
          ]),
        ),
        // ── Bottom bar ──
        Container(
          padding: EdgeInsets.fromLTRB(14, 10, 14, 12),
          decoration: BoxDecoration(color: HG.grey50, border: Border(top: BorderSide(color: HG.grey200, width: 0.5))),
          child: Row(children: [
            GestureDetector(
              onTap: () {
                HapticFeedback.lightImpact();
                Navigator.push(context, MaterialPageRoute(builder: (_) => BookDemoPage(
                  tutorName: tutor.name, tutorSubject: tutor.subject, tutorAvatar: tutor.avatar,
                  tutorRating: tutor.rating, tutorPrice: tutor.price, tutorStudents: tutor.students)));
              },
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 9),
                decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100)),
                child: Text('Book Trial', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.surface, fontFamily: HG.font)),
              ),
            ),
            const SizedBox(width: 10),
            GestureDetector(
              onTap: () {
                HapticFeedback.lightImpact();
                Navigator.push(context, PageRouteBuilder(
                  pageBuilder: (_, __, ___) => ProfileTab(data: TutorData.fromSearchable(tutor), initialVisitorMode: true),
                  transitionDuration: const Duration(milliseconds: 300),
                  reverseTransitionDuration: const Duration(milliseconds: 250),
                  transitionsBuilder: (_, a, __, c) => SlideTransition(
                    position: Tween(begin: const Offset(0, 1), end: Offset.zero).animate(
                      CurvedAnimation(parent: a, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)), child: c),
                ));
              },
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 9),
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(100), border: Border.all(color: HG.grey200)),
                child: Text('View Profile', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark, fontFamily: HG.font)),
              ),
            ),
            const Spacer(),
            GestureDetector(
              onTap: () => HapticFeedback.lightImpact(),
              child: Container(
                width: 36, height: 36,
                decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: HG.grey200)),
                child: Icon(PhosphorIconsRegular.heart, size: 16, color: HG.textMuted),
              ),
            ),
          ]),
        ),
      ]),
      ),
    );
  }

  static Widget _statChip(IconData icon, String label) => Container(
    padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
    decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(100)),
    child: Row(mainAxisSize: MainAxisSize.min, children: [
      Icon(icon, size: 11, color: HG.textMuted),
      const SizedBox(width: 4),
      Text(label, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w500, color: HG.textMuted)),
    ]),
  );

  static Widget _tag(String label) => Container(
    padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
    decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(100), border: Border.all(color: HG.grey200, width: 0.5)),
    child: Text(label, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w500, color: HG.dark)),
  );
}

// ═══════════════════════════════════════════════════════════════
// ── Blog card ──
// ═══════════════════════════════════════════════════════════════

class _BlogCard extends StatelessWidget {
  final BlogArticle blog;
  const _BlogCard({required this.blog});

  @override
  Widget build(BuildContext context) {
    final local = blog.source == 'HomeGuru';
    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        Navigator.push(context, PageRouteBuilder(
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
        ));
      },
      child: Container(
        margin: EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          color: HG.white,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: HG.grey200),
        ),
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            // Author row
            Row(children: [
              CircleAvatar(radius: 14, backgroundColor: local ? HG.powderBlue : HG.grey100,
                child: Text(blog.author[0], style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: local ? HG.blue : HG.grey500))),
              const SizedBox(width: 10),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Flexible(child: Text(blog.author, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark), overflow: TextOverflow.ellipsis)),
                  if (local) ...[const SizedBox(width: 4), Icon(PhosphorIconsFill.sealCheck, size: 12, color: HG.blue)],
                ]),
                Text(blog.date, style: TextStyle(fontSize: 11, color: HG.textLight)),
              ])),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(100)),
                child: Text(blog.readTime, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w500, color: HG.textMuted, fontFamily: HG.font)),
              ),
            ]),
            const SizedBox(height: 12),
            // Title
            Text(blog.title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: HG.dark, height: 1.3, letterSpacing: -0.2)),
            const SizedBox(height: 6),
            // Subtitle
            Text(blog.subtitle, maxLines: 2, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.45)),
            const SizedBox(height: 12),
            // Bottom row
            Row(children: [
              Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(100), border: Border.all(color: HG.grey200, width: 0.5)),
                child: Text(blog.tag, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.dark, fontFamily: HG.font)),
              ),
              if (blog.source != 'HomeGuru') ...[const SizedBox(width: 6), Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(100), border: Border.all(color: HG.grey200, width: 0.5)),
                child: Text(blog.source, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w500, color: HG.textMuted, fontFamily: HG.font)),
              )],
              const Spacer(),
              Icon(PhosphorIconsRegular.handsClapping, size: 14, color: HG.textLight),
              const SizedBox(width: 4),
              Text('${blog.likes}', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: HG.textMuted)),
              const SizedBox(width: 14),
              Icon(PhosphorIconsRegular.chatCircle, size: 14, color: HG.textLight),
              const SizedBox(width: 4),
              Text('${blog.comments}', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: HG.textMuted)),
              const SizedBox(width: 14),
              Icon(PhosphorIconsRegular.bookmarkSimple, size: 14, color: HG.textLight),
            ]),
          ]),
        ),
      ),
    );
  }
}
