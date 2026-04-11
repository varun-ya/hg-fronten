import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/searchable_tutor.dart';
import '../../../models/tutor_data.dart';
import '../../../services/blog_service.dart';
import '../../../components/blog/blog_detail_page.dart';
import '../../../components/dashboard/shared/profile_tab.dart';
import 'search_results_page.dart';

// ── Explore categories ──
const _topics = [
  (icon: PhosphorIconsFill.mathOperations, label: 'Maths', query: 'maths'),
  (icon: PhosphorIconsFill.atom, label: 'Physics', query: 'physics'),
  (icon: PhosphorIconsFill.flask, label: 'Chemistry', query: 'chemistry'),
  (icon: PhosphorIconsFill.bookOpen, label: 'English', query: 'english'),
  (icon: PhosphorIconsFill.dna, label: 'Biology', query: 'biology'),
  (icon: PhosphorIconsFill.graduationCap, label: 'JEE', query: 'jee'),
  (icon: PhosphorIconsFill.firstAid, label: 'NEET', query: 'neet'),
  (icon: PhosphorIconsFill.code, label: 'Coding', query: 'coding'),
];

// Grid item union
enum _Kind { tutor, blog }
class _GridItem {
  final _Kind kind;
  final SearchableTutor? tutor;
  final BlogArticle? blog;
  const _GridItem.tutor(this.tutor) : kind = _Kind.tutor, blog = null;
  const _GridItem.blog(this.blog) : kind = _Kind.blog, tutor = null;
}

class StudentSearchTab extends StatefulWidget {
  const StudentSearchTab({super.key});
  @override
  State<StudentSearchTab> createState() => _StudentSearchTabState();
}

class _StudentSearchTabState extends State<StudentSearchTab> {
  List<BlogArticle> _blogs = BlogService.fallback;

  @override
  void initState() { super.initState(); _loadBlogs(); }

  Future<void> _loadBlogs() async {
    final blogs = await BlogService.fetch();
    if (mounted) setState(() => _blogs = blogs);
  }

  void _openSearch({String initial = ''}) {
    HapticFeedback.selectionClick();
    Navigator.push(context, PageRouteBuilder(
      pageBuilder: (_, __, ___) => SearchResultsPage(initialQuery: initial),
      transitionDuration: const Duration(milliseconds: 280),
      reverseTransitionDuration: const Duration(milliseconds: 240),
      transitionsBuilder: (_, a, __, c) => FadeTransition(opacity: a, child: c),
    ));
  }

  // Interleave tutors and blogs: tutor, blog, blog, tutor, blog, blog...
  List<_GridItem> get _gridItems {
    final tutors = tutorDirectory;
    final blogs = _blogs.take(14).toList();
    final items = <_GridItem>[];
    int ti = 0, bi = 0;
    while (ti < tutors.length || bi < blogs.length) {
      if (ti < tutors.length) { items.add(_GridItem.tutor(tutors[ti++])); }
      if (bi < blogs.length) { items.add(_GridItem.blog(blogs[bi++])); }
      if (bi < blogs.length) { items.add(_GridItem.blog(blogs[bi++])); }
    }
    return items;
  }

  // Build IG-style grid rows
  List<Widget> _buildGrid() {
    final items = _gridItems;
    if (items.isEmpty) return [];
    final rows = <Widget>[];
    int i = 0, rowIdx = 0;
    const gap = 1.5;

    while (i < items.length) {
      if (rowIdx % 3 == 0 && i + 2 < items.length) {
        // Featured row: 1 big + 2 stacked
        final flip = rowIdx % 6 != 0;
        final big = _buildTile(items[i], big: true);
        final sm1 = _buildTile(items[i + 1]);
        final sm2 = _buildTile(items[i + 2]);
        final col = Column(children: [Expanded(child: sm1), SizedBox(height: gap), Expanded(child: sm2)]);
        rows.add(SizedBox(height: 260, child: Row(children: flip
          ? [Expanded(child: col), SizedBox(width: gap), Expanded(flex: 2, child: big)]
          : [Expanded(flex: 2, child: big), SizedBox(width: gap), Expanded(child: col)])));
        i += 3;
      } else {
        // Normal row: 3 equal
        final count = (items.length - i).clamp(0, 3);
        final children = <Widget>[];
        for (int j = 0; j < count; j++) {
          if (j > 0) children.add(SizedBox(width: gap));
          children.add(Expanded(child: _buildTile(items[i + j])));
        }
        for (int j = count; j < 3; j++) { children.add(SizedBox(width: gap)); children.add(Expanded(child: SizedBox())); }
        rows.add(SizedBox(height: 160, child: Row(children: children)));
        i += count;
      }
      rows.add(SizedBox(height: gap));
      rowIdx++;
    }
    return rows;
  }

  Widget _buildTile(_GridItem item, {bool big = false}) {
    if (item.kind == _Kind.tutor) return _TutorGridTile(tutor: item.tutor!, big: big);
    return _BlogGridTile(blog: item.blog!, big: big);
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final grid = _buildGrid();

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: context.isDark ? HG.surface : const Color(0xFFF8F7F4),
        body: ListView(
          padding: EdgeInsets.zero,
          physics: const BouncingScrollPhysics(),
          children: [
            // ── Search bar ──
            GestureDetector(
              onTap: () => _openSearch(),
              child: Container(
                margin: EdgeInsets.fromLTRB(16, pt + 10, 16, 0),
                height: 42,
                decoration: BoxDecoration(
                  color: context.isDark ? const Color(0xFF1A1A1A) : const Color(0xFFEFEDE9),
                  borderRadius: BorderRadius.circular(100),
                ),
                child: Row(children: [
                  const SizedBox(width: 16),
                  Icon(PhosphorIconsRegular.magnifyingGlass, size: 17, color: HG.textMuted),
                  const SizedBox(width: 10),
                  Text('Search tutors, subjects, blogs...', style: TextStyle(fontSize: 14, color: HG.textLight, fontFamily: HG.font)),
                ]),
              ),
            ),
            const SizedBox(height: 16),
            // ── Topic chips ──
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Text('Browse topics', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark)),
            ),
            const SizedBox(height: 10),
            SizedBox(
              height: 38,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                padding: EdgeInsets.symmetric(horizontal: 16),
                itemCount: _topics.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (_, i) {
                  final t = _topics[i];
                  return GestureDetector(
                    onTap: () => _openSearch(initial: t.query),
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: HG.white,
                        borderRadius: BorderRadius.circular(100),
                        border: Border.all(color: HG.grey200),
                      ),
                      child: Row(mainAxisSize: MainAxisSize.min, children: [
                        Icon(t.icon, size: 13, color: HG.dark),
                        const SizedBox(width: 6),
                        Text(t.label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark, fontFamily: HG.font)),
                      ]),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 20),
            // ── Explore grid ──
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Text('Explore', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark)),
            ),
            const SizedBox(height: 10),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 1.5),
              child: Column(children: grid),
            ),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════
// ── Tutor grid tile — image-based with details overlay ──
// ═══════════════════════════════════════════════════════════════

class _TutorGridTile extends StatelessWidget {
  final SearchableTutor tutor;
  final bool big;
  const _TutorGridTile({required this.tutor, this.big = false});

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
        color: const Color(0xFF111111),
        child: Stack(fit: StackFit.expand, children: [
          // Image
          Image.network(tutor.imageUrl, fit: BoxFit.cover, cacheWidth: big ? 600 : 400,
            loadingBuilder: (_, child, p) => p == null ? child : Container(color: const Color(0xFF1A1A1A)),
            errorBuilder: (_, __, ___) => Container(color: const Color(0xFF1A1A1A),
              child: Center(child: Text(tutor.avatar, style: TextStyle(fontSize: big ? 40 : 28, fontWeight: FontWeight.w800, color: Colors.white.withValues(alpha: 0.08)))))),
          // Gradient
          Positioned.fill(child: DecoratedBox(decoration: BoxDecoration(
            gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter,
              colors: [Colors.transparent, Colors.transparent, Colors.black.withValues(alpha: 0.6), Colors.black.withValues(alpha: 0.92)],
              stops: const [0.0, 0.3, 0.65, 1.0]),
          ))),
          // Recommended tag (top-rated tutors)
          if (tutor.rating >= 4.7) Positioned(top: 8, left: 8, child: Container(
            padding: EdgeInsets.symmetric(horizontal: 7, vertical: 3),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(100)),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Icon(PhosphorIconsFill.sparkle, size: 9, color: HG.blue),
              const SizedBox(width: 3),
              Text('Recommended', style: TextStyle(fontSize: 8, fontWeight: FontWeight.w700, color: HG.blue, fontFamily: HG.font)),
            ]),
          )),
          // Price pill
          Positioned(top: 8, right: 8, child: Container(
            padding: EdgeInsets.symmetric(horizontal: 6, vertical: 3),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(100)),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Text('₹${tutor.price}', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: const Color(0xFF111111))),
              Text('/hr', style: TextStyle(fontSize: 7, color: const Color(0xFF888888))),
            ]),
          )),
          // Bottom info
          Positioned(left: 8, right: 8, bottom: 8, child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
            Text(tutor.name, style: TextStyle(fontSize: big ? 14 : 12, fontWeight: FontWeight.w700, color: Colors.white, height: 1.15), maxLines: 1, overflow: TextOverflow.ellipsis),
            const SizedBox(height: 3),
            Text(tutor.subject, style: TextStyle(fontSize: big ? 11 : 9, color: Colors.white.withValues(alpha: 0.6)), maxLines: 1, overflow: TextOverflow.ellipsis),
            const SizedBox(height: 4),
            // Stats
            Row(children: [
              Icon(PhosphorIconsFill.star, size: 9, color: const Color(0xFFFBBF24)),
              const SizedBox(width: 2),
              Text('${tutor.rating}', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: Colors.white)),
              _wDot(),
              Text('${tutor.students} students', style: TextStyle(fontSize: 9, color: Colors.white.withValues(alpha: 0.5))),
              _wDot(),
              Text('${tutor.experience} yrs', style: TextStyle(fontSize: 9, color: Colors.white.withValues(alpha: 0.5))),
            ]),
            if (big) ...[
              const SizedBox(height: 6),
              Text(tutor.bio, style: TextStyle(fontSize: 10, color: Colors.white.withValues(alpha: 0.45), height: 1.3), maxLines: 1, overflow: TextOverflow.ellipsis),
            ],
          ])),
        ]),
      ),
    );
  }

  static Widget _wDot() => Padding(
    padding: EdgeInsets.symmetric(horizontal: 4),
    child: Container(width: 2, height: 2, decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.3), shape: BoxShape.circle)),
  );
}

// ═══════════════════════════════════════════════════════════════
// ── Blog grid tile ──
// ═══════════════════════════════════════════════════════════════

class _BlogGridTile extends StatelessWidget {
  final BlogArticle blog;
  final bool big;
  const _BlogGridTile({required this.blog, this.big = false});

  @override
  Widget build(BuildContext context) {
    final dark = context.isDark;
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
        color: dark ? const Color(0xFF111111) : Colors.white,
        padding: EdgeInsets.all(big ? 14 : 10),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          // Top row: tag + read time
          Row(children: [
            Container(
              padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(color: dark ? Colors.white.withValues(alpha: 0.06) : const Color(0xFFF3F4F6), borderRadius: BorderRadius.circular(100)),
              child: Text(blog.tag, style: TextStyle(fontSize: 8, fontWeight: FontWeight.w600, color: HG.textMuted)),
            ),
            const Spacer(),
            Text(blog.readTime, style: TextStyle(fontSize: 8, color: HG.textLight)),
          ]),
          const Spacer(),
          // Title
          Text(blog.title, style: TextStyle(fontSize: big ? 13 : 11, fontWeight: FontWeight.w700, color: HG.dark, height: 1.25, letterSpacing: -0.1), maxLines: big ? 4 : 3, overflow: TextOverflow.ellipsis),
          if (big) ...[
            const SizedBox(height: 4),
            Text(blog.subtitle, style: TextStyle(fontSize: 11, color: HG.textMuted, height: 1.3), maxLines: 2, overflow: TextOverflow.ellipsis),
          ],
          const SizedBox(height: 6),
          // Author row
          Row(children: [
            CircleAvatar(radius: 7, backgroundColor: local ? HG.powderBlue : HG.grey100,
              child: Text(blog.author[0], style: TextStyle(fontSize: 6, fontWeight: FontWeight.w700, color: local ? HG.blue : HG.grey500))),
            const SizedBox(width: 5),
            Flexible(child: Text(blog.author, style: TextStyle(fontSize: 9, fontWeight: FontWeight.w500, color: HG.textLight), maxLines: 1, overflow: TextOverflow.ellipsis)),
            if (local) ...[const SizedBox(width: 2), Icon(PhosphorIconsFill.sealCheck, size: 8, color: HG.blue)],
            if (blog.likes > 0) ...[
              const Spacer(),
              Icon(PhosphorIconsFill.heart, size: 8, color: HG.grey300),
              const SizedBox(width: 2),
              Text('${blog.likes}', style: TextStyle(fontSize: 8, color: HG.textLight)),
            ],
          ]),
        ]),
      ),
    );
  }
}
