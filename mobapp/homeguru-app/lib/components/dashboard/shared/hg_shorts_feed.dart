import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import '../../../theme.dart';
import '../../../services/news_service.dart';

class HgShortsFeed extends StatefulWidget {
  const HgShortsFeed({super.key});
  @override
  State<HgShortsFeed> createState() => _HgShortsFeedState();
}

class _HgShortsFeedState extends State<HgShortsFeed> with AutomaticKeepAliveClientMixin {
  final _articles = <NewsArticle>[];
  bool _error = false;
  bool _loading = false;
  PageController? _pageCtrl;
  double _currentPage = 0;
  double _scrollPage = 0;

  @override bool get wantKeepAlive => true;

  @override
  void initState() {
    super.initState();
    _pageCtrl = PageController();
    _pageCtrl!.addListener(() { if (_pageCtrl != null) _scrollPage = _pageCtrl!.page ?? 0; });
    NewsService.reset();
    _articles.addAll(NewsService.fallback);
  }

  void _onPageChanged(int page) {
    if (!mounted) return;
    setState(() => _currentPage = page.toDouble());
    if (page >= _articles.length - 3 && !_loading) _loadMore();
  }

  @override void dispose() { _pageCtrl?.dispose(); super.dispose(); }

  Future<void> _loadMore() async {
    if (_loading) return;
    _loading = true;
    try {
      final a = await NewsService.fetchPage();
      if (mounted) setState(() { _articles.addAll(a); _error = false; });
    } catch (_) {
      if (mounted && _articles.isEmpty) setState(() { _error = true; });
    }
    _loading = false;
  }

  String _timeAgo(DateTime? dt) {
    if (dt == null) return '';
    final d = DateTime.now().difference(dt);
    if (d.inMinutes < 60) return '${d.inMinutes}m ago';
    if (d.inHours < 24) return '${d.inHours}h ago';
    return '${d.inDays}d ago';
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    if (_error && _articles.isEmpty) {
      return Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
        Icon(PhosphorIconsRegular.wifiSlash, size: 32, color: HG.textLight),
        const SizedBox(height: 10),
        Text('Could not load shorts', style: TextStyle(fontSize: 14, color: HG.textMuted)),
        const SizedBox(height: 12),
        GestureDetector(
          onTap: () { setState(() { _error = false; }); NewsService.reset(); _articles.addAll(NewsService.fallback); _loadMore(); },
          child: Container(padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(color: HG.blue, borderRadius: BorderRadius.circular(100)),
            child: Text('Retry', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.fixedWhite))),
        ),
      ]));
    }
    if (_articles.isEmpty) return Center(child: SizedBox(width: 24, height: 24, child: CircularProgressIndicator(strokeWidth: 2, color: HG.blue)));
    if (_pageCtrl == null) return const SizedBox.shrink();
    return LayoutBuilder(builder: (context, constraints) {
      final h = constraints.maxHeight, halfH = h / 2;
      return AnimatedBuilder(animation: _pageCtrl!, builder: (context, _) {
        double page = 0;
        try { page = _pageCtrl!.page ?? 0; } catch (_) { page = _scrollPage; }
        final cur = page.floor().clamp(0, _articles.length - 1);
        final nxt = (cur + 1).clamp(0, _articles.length - 1);
        final t = page - page.floor();
        if (t < 0.001) return Stack(children: [Positioned.fill(child: _card(_articles[cur])), _indicator(), _gesture()]);
        return Stack(clipBehavior: Clip.hardEdge, children: [
          Positioned.fill(child: _card(_articles[nxt])),
          Positioned(top: 0, left: 0, right: 0, height: halfH,
            child: ClipRect(child: OverflowBox(alignment: Alignment.topCenter, maxHeight: h, child: _card(_articles[cur])))),
          Positioned(top: halfH, left: 0, right: 0, height: halfH,
            child: Transform(alignment: Alignment.topCenter,
              transform: Matrix4.identity()..setEntry(3, 2, 0.001)..rotateX(-t * math.pi * 0.5),
              child: ClipRect(child: OverflowBox(alignment: Alignment.bottomCenter, maxHeight: h, child: _card(_articles[cur]))))),
          Positioned(left: 0, right: 0, top: halfH - 1, height: 3,
            child: Opacity(opacity: (t * 0.5).clamp(0.0, 0.5), child: Container(color: Colors.black26))),
          _indicator(), _gesture(),
        ]);
      });
    });
  }

  Widget _indicator() => Positioned(right: 14, top: 0, bottom: 0, child: Center(
    child: Column(mainAxisSize: MainAxisSize.min, children: [
      Icon(PhosphorIconsRegular.caretUp, size: 14, color: HG.white.withValues(alpha: _currentPage > 0 ? 0.7 : 0.2)),
      const SizedBox(height: 4),
      Text('${(_currentPage.round() + 1)}', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.white.withValues(alpha: 0.7))),
      const SizedBox(height: 4),
      Icon(PhosphorIconsRegular.caretDown, size: 14, color: HG.white.withValues(alpha: 0.7)),
    ]),
  ));

  Widget _gesture() => PageView.builder(
    controller: _pageCtrl, scrollDirection: Axis.vertical, pageSnapping: true,
    onPageChanged: _onPageChanged, itemCount: _articles.length + 1,
    itemBuilder: (_, i) => const SizedBox.expand(),
  );

  Widget _card(NewsArticle a) => GestureDetector(
    onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => ShortsDetailPage(article: a))),
    child: Padding(padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      child: Card(elevation: 2, shadowColor: Colors.black26,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        clipBehavior: Clip.antiAlias, color: const Color(0xFF0F1A2E),
        child: Stack(fit: StackFit.expand, children: [
          const ShortsCanvasPlaceholder(),
          if (a.imageUrl != null) Image.network(a.imageUrl!, fit: BoxFit.cover,
            frameBuilder: (_, child, frame, loaded) => loaded ? child : AnimatedOpacity(opacity: frame != null ? 1.0 : 0.0, duration: const Duration(milliseconds: 400), curve: Curves.easeOut, child: child),
            errorBuilder: (_, __, ___) => const SizedBox.shrink()),
          Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Color(0x22000000), Color(0xBB000000)], stops: [0.3, 0.9]))),
          Padding(padding: EdgeInsets.fromLTRB(20, 20, 40, 24),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.end, children: [
              Container(padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(color: HG.white.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(100), border: Border.all(color: HG.white.withValues(alpha: 0.1))),
                child: Text(a.source, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.fixedWhite, letterSpacing: 0.2))),
              const SizedBox(height: 12),
              Flexible(child: Text(a.title, maxLines: 3, overflow: TextOverflow.ellipsis,
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.fixedWhite, height: 1.2, letterSpacing: -0.3))),
              const SizedBox(height: 8),
              Text(a.description, maxLines: 2, overflow: TextOverflow.ellipsis,
                style: TextStyle(fontSize: 13, color: HG.white.withValues(alpha: 0.75), height: 1.4)),
              const SizedBox(height: 12),
              Row(children: [
                Text(_timeAgo(a.publishedAt), style: TextStyle(fontSize: 12, color: HG.white.withValues(alpha: 0.5))),
                const Spacer(),
                Icon(PhosphorIconsRegular.bookmarkSimple, size: 18, color: HG.white.withValues(alpha: 0.6)),
                const SizedBox(width: 16),
                Icon(PhosphorIconsRegular.shareFat, size: 18, color: HG.white.withValues(alpha: 0.6)),
              ]),
            ])),
        ]),
      ),
    ),
  );
}

class ShortsDetailPage extends StatelessWidget {
  final NewsArticle article;
  const ShortsDetailPage({super.key, required this.article});
  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final hasUrl = article.url.isNotEmpty;
    return AnnotatedRegion<SystemUiOverlayStyle>(value: context.hgSystemUi, child: Scaffold(backgroundColor: HG.surface,
      body: Column(children: [
        Container(padding: EdgeInsets.fromLTRB(12, pt + 8, 16, 10),
          decoration: BoxDecoration(color: HG.white, border: Border(bottom: BorderSide(color: HG.border, width: 0.5))),
          child: Row(children: [
            IconButton(onPressed: () => Navigator.pop(context), icon: Icon(PhosphorIconsBold.arrowLeft, size: 18),
              style: IconButton.styleFrom(backgroundColor: HG.grey50, fixedSize: const Size(36, 36))),
            const SizedBox(width: 10),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(article.source, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
              Text(article.title, style: TextStyle(fontSize: 11, color: HG.textMuted), maxLines: 1, overflow: TextOverflow.ellipsis),
            ])),
            Icon(PhosphorIconsRegular.shareFat, size: 18, color: HG.dark),
          ])),
        Expanded(child: hasUrl
          ? InAppWebView(initialUrlRequest: URLRequest(url: WebUri(article.url)),
              initialSettings: InAppWebViewSettings(javaScriptEnabled: true, domStorageEnabled: true, supportZoom: true, useHybridComposition: true))
          : ListView(padding: EdgeInsets.all(20), physics: const BouncingScrollPhysics(), children: [
              if (article.imageUrl != null) ...[
                ClipRRect(borderRadius: BorderRadius.circular(16),
                  child: Image.network(article.imageUrl!, height: 200, width: double.infinity, fit: BoxFit.cover, errorBuilder: (_, __, ___) => const SizedBox())),
                const SizedBox(height: 20),
              ],
              Align(alignment: Alignment.centerLeft, child: Container(padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(100)),
                child: Text(article.source, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.dark)))),
              const SizedBox(height: 12),
              Text(article.title, style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: HG.dark, height: 1.25, letterSpacing: -0.3)),
              const SizedBox(height: 12),
              Text(article.description, style: TextStyle(fontSize: 16, color: HG.dark, height: 1.7)),
              const SizedBox(height: 20),
              Text('Full article not available offline.', style: TextStyle(fontSize: 13, color: HG.textMuted)),
            ])),
      ])));
  }
}

class ShortsCanvasPlaceholder extends StatelessWidget {
  const ShortsCanvasPlaceholder({super.key});
  @override
  Widget build(BuildContext context) => Container(color: const Color(0xFF0F1A2E),
    child: Stack(fit: StackFit.expand, children: [
      const RepaintBoundary(child: CustomPaint(painter: _CanvasPainter())),
      Center(child: Opacity(opacity: 0.55, child: Image.asset('assets/profileHeader.png', width: 180, fit: BoxFit.contain))),
    ]));
}

class _CanvasPainter extends CustomPainter {
  const _CanvasPainter();
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width, h = size.height;
    canvas.drawRect(Rect.fromLTWH(0, 0, w, h), Paint()..color = const Color(0xFF0F1A2E));
    canvas.drawCircle(Offset(w * 0.85, h * 0.15), w * 0.5, Paint()..shader = RadialGradient(colors: [const Color(0xFFDCE8F5).withValues(alpha: 0.18), Colors.transparent]).createShader(Rect.fromCircle(center: Offset(w * 0.85, h * 0.15), radius: w * 0.5)));
    canvas.drawCircle(Offset(w * 0.1, h * 0.85), w * 0.45, Paint()..shader = RadialGradient(colors: [const Color(0xFFE08A3C).withValues(alpha: 0.12), Colors.transparent]).createShader(Rect.fromCircle(center: Offset(w * 0.1, h * 0.85), radius: w * 0.45)));
    canvas.drawCircle(Offset(w * 0.5, h * 0.5), w * 0.4, Paint()..shader = RadialGradient(colors: [const Color(0xFF8B5CF6).withValues(alpha: 0.08), Colors.transparent]).createShader(Rect.fromCircle(center: Offset(w * 0.5, h * 0.5), radius: w * 0.4)));
  }
  @override bool shouldRepaint(covariant CustomPainter old) => false;
}
