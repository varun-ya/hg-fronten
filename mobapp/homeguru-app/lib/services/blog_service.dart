import 'dart:convert';
import 'package:http/http.dart' as http;

class BlogArticle {
  final String title, subtitle, body, author, tag, readTime, date, source;
  final int likes, comments;
  final String? sourceUrl;
  final List<dynamic>? deltaJson; // flutter_quill Delta for rich rendering
  String? _fullBody;

  BlogArticle({
    required this.title, required this.subtitle, this.body = '', required this.author,
    required this.tag, required this.readTime, required this.date, required this.source,
    this.likes = 0, this.comments = 0, this.sourceUrl, this.deltaJson,
  });

  String get fullBody => _fullBody ?? body;
  bool get hasFullBody => _fullBody != null;
}

class BlogService {
  static List<BlogArticle>? _cached;

  static int _page = 0;
  static final _seen = <String>{};

  static List<BlogArticle> get fallback => _fallback;

  /// Add a locally published blog to both fallback and cache.
  static void addLocal(BlogArticle article) {
    _fallback.insert(0, article);
    _cached?.insert(0, article);
  }

  /// Fetch full article body from source URL
  static Future<void> loadFullBody(BlogArticle article) async {
    if (article.hasFullBody || article.sourceUrl == null || article.sourceUrl!.isEmpty) return;
    try {
      final res = await http.get(Uri.parse(article.sourceUrl!)).timeout(const Duration(seconds: 6));
      if (res.statusCode != 200) return;
      final html = res.body;
      // Extract text from <article> or <p> tags
      var text = '';
      final articleMatch = RegExp(r'<article[^>]*>(.*?)</article>', dotAll: true).firstMatch(html);
      if (articleMatch != null) {
        text = articleMatch.group(1)!;
      } else {
        // Fallback: extract all <p> tags
        final pTags = RegExp(r'<p[^>]*>(.*?)</p>', dotAll: true).allMatches(html);
        text = pTags.map((m) => m.group(1) ?? '').join('\n\n');
      }
      // Strip remaining HTML tags
      text = text.replaceAll(RegExp(r'<[^>]*>'), '').trim();
      // Remove cookie/consent/nav junk
      text = text.replaceAll(RegExp(r'(We use cookies|Accept all|Cookie policy|Privacy policy|Subscribe|Sign up|Newsletter|Advertisement|ADVERTISEMENT|Loading|Please enable|JavaScript)[^.]*\.?', caseSensitive: false), '').trim();
      // Clean up whitespace
      text = text.replaceAll(RegExp(r'\n{3,}'), '\n\n').replaceAll(RegExp(r' {2,}'), ' ').trim();
      if (text.length > article.body.length) {
        article._fullBody = text;
      }
    } catch (_) {}
  }

  static Future<List<BlogArticle>> fetch() async {
    if (_cached != null) return _cached!;
    _page = 0;
    _seen.clear();
    for (final b in _fallback) { _seen.add(b.title.toLowerCase()); }

    final results = <BlogArticle>[..._fallback];

    final futures = await Future.wait([
      _fetchRss('https://blog.ed.gov/feed/', 'US Dept. of Education').catchError((_) => <BlogArticle>[]),
      _fetchRss('https://www.edutopia.org/rss.xml', 'Edutopia').catchError((_) => <BlogArticle>[]),
      _fetchRss('https://feeds.feedburner.com/TeachThought', 'TeachThought').catchError((_) => <BlogArticle>[]),
      _fetchRss('https://www.edsurge.com/feeds/rss', 'EdSurge').catchError((_) => <BlogArticle>[]),
      _fetchRss('https://timesofindia.indiatimes.com/rssfeeds/913168846.cms', 'Times of India').catchError((_) => <BlogArticle>[]),
    ]);

    for (final list in futures) {
      results.addAll(list);
    }

    _cached = results;
    _page++;
    return results;
  }

  static Future<List<BlogArticle>> fetchMore() async {
    _page++;
    final results = <BlogArticle>[];
    final feeds = [
      ('https://blog.ed.gov/feed/', 'US Dept. of Education'),
      ('https://www.edutopia.org/rss.xml', 'Edutopia'),
      ('https://feeds.feedburner.com/TeachThought', 'TeachThought'),
      ('https://www.edsurge.com/feeds/rss', 'EdSurge'),
      ('https://timesofindia.indiatimes.com/rssfeeds/913168846.cms', 'Times of India'),
      ('https://indianexpress.com/section/education/feed/', 'Indian Express'),
      ('https://www.hindustantimes.com/feeds/rss/education/rssfeed.xml', 'Hindustan Times'),
    ];
    final feed = feeds[_page % feeds.length];
    final fetched = await _fetchRss(feed.$1, feed.$2).catchError((_) => <BlogArticle>[]);
    for (final b in fetched) {
      final key = b.title.toLowerCase();
      if (!_seen.contains(key)) { _seen.add(key); results.add(b); }
    }
    if (_cached != null) _cached = [..._cached!, ...results];
    return results;
  }

  static Future<List<BlogArticle>> _fetchRss(String feedUrl, String source) async {
    final uri = Uri.parse('https://api.rss2json.com/v1/api.json?rss_url=${Uri.encodeComponent(feedUrl)}');
    final res = await http.get(uri).timeout(const Duration(seconds: 5));
    if (res.statusCode != 200) return [];
    final data = jsonDecode(res.body);
    if (data['status'] != 'ok') return [];
    final items = data['items'] as List? ?? [];
    return items.take(6).map((a) {
      final title = a['title'] ?? '';
      final rawDesc = (a['description'] ?? '').toString().replaceAll(RegExp(r'<[^>]*>'), '').trim();
      final desc = rawDesc.length > 200 ? rawDesc.substring(0, 200) : rawDesc;
      final rawAuthor = (a['author'] ?? '').toString().trim();
      // Some feeds put author in different fields
      final creator = (a['dc:creator'] ?? a['creator'] ?? '').toString().trim();
      final authorName = rawAuthor.isNotEmpty ? rawAuthor : (creator.isNotEmpty ? creator : source);
      final content = (a['content'] ?? a['description'] ?? '').toString().replaceAll(RegExp(r'<[^>]*>'), '').trim();
      final words = content.split(' ').length;
      final readMin = (words / 200).ceil().clamp(1, 30);
      return BlogArticle(
        title: title,
        subtitle: desc,
        body: content,
        author: authorName,
        tag: _guessTag(title),
        readTime: '$readMin min read',
        date: _formatDate(a['pubDate']),
        source: source,
        sourceUrl: a['link'],
      );
    }).where((b) => b.title.isNotEmpty).toList();
  }

  static String _guessTag(String title) {
    final t = title.toLowerCase();
    if (t.contains('math') || t.contains('algebra') || t.contains('calculus')) return 'Mathematics';
    if (t.contains('physics') || t.contains('science')) return 'Science';
    if (t.contains('jee') || t.contains('neet') || t.contains('exam')) return 'Exams';
    if (t.contains('ai') || t.contains('tech') || t.contains('digital')) return 'EdTech';
    if (t.contains('teacher') || t.contains('teaching') || t.contains('pedagogy')) return 'Teaching';
    if (t.contains('student') || t.contains('learn') || t.contains('study')) return 'Learning';
    if (t.contains('policy') || t.contains('nep') || t.contains('government')) return 'Policy';
    return 'Education';
  }

  static String _formatDate(String? dateStr) {
    if (dateStr == null) return '';
    final dt = DateTime.tryParse(dateStr);
    if (dt == null) return dateStr;
    final months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return '${months[dt.month - 1]} ${dt.day}, ${dt.year}';
  }

  static final _fallback = [
    BlogArticle(title: 'How I teach Quadratic Equations differently', subtitle: 'Most students memorize formulas. I teach them to see patterns. Here\'s my approach that helped 50+ students...', body: 'Most students memorize formulas. I teach them to see patterns.\n\nWhen I first started teaching quadratic equations, I noticed that students would blindly apply the formula without understanding what they were actually solving for.\n\nSo I changed my approach. Instead of starting with ax\u00b2 + bx + c = 0, I start with a real problem.\n\nHere\'s my 3-step method:\n\n1. Start with the story\n2. Visualize the parabola\n3. Then solve\n\nThis approach has helped 50+ students not just pass, but actually enjoy quadratics.', author: 'You', tag: 'Mathematics', readTime: '5 min read', date: 'Dec 12, 2024', source: 'HomeGuru', likes: 24, comments: 5),
    BlogArticle(title: 'Why most students fail at Physics \u2014 and how to fix it', subtitle: 'Physics isn\'t about memorizing equations. It\'s about understanding the world around you...', body: 'Physics isn\'t about memorizing equations. It\'s about understanding the world around you.\n\nThe biggest mistake students make is treating physics like a formula sheet.\n\nWhen I teach Newton\'s laws, I don\'t start with the textbook. I start by pushing a chair across the room. "Why did it stop?"\n\nOnce we shifted to conceptual thinking, their scores jumped by 30-40%.', author: 'You', tag: 'Physics', readTime: '8 min read', date: 'Dec 5, 2024', source: 'HomeGuru', likes: 42, comments: 12),
    BlogArticle(title: 'The Feynman Technique: How to learn anything faster', subtitle: 'Richard Feynman had a simple method for understanding complex topics...', body: 'Step 1: Choose a concept\nStep 2: Teach it to a child\nStep 3: Identify gaps and go back to the source\nStep 4: Simplify and use analogies\n\nI use this in every tutoring session.', author: 'Priya Patel', tag: 'Study Tips', readTime: '4 min read', date: 'Nov 30, 2024', source: 'HomeGuru', likes: 31, comments: 8),
    BlogArticle(title: 'My journey from student to tutor', subtitle: 'I was an average student in class 10. Failed my first maths test. But one teacher changed everything...', body: 'I was an average student in class 10. Failed my first maths test.\n\nThen Mr. Sharma happened. He asked me what I found confusing.\n\nBy class 12, I scored 95 in mathematics. Now I\'m doing for my students what Mr. Sharma did for me.', author: 'You', tag: 'Personal', readTime: '4 min read', date: 'Nov 28, 2024', source: 'HomeGuru', likes: 18, comments: 3),
    BlogArticle(title: 'JEE preparation: A 90-day roadmap that actually works', subtitle: 'After coaching 200+ JEE aspirants, I\'ve distilled the preparation into a focused 90-day plan...', body: 'Days 1-30: Foundation. Revise NCERT thoroughly.\nDays 31-60: Problem solving. HC Verma, Irodov, DC Pandey.\nDays 61-80: Mock tests. One full test every 2 days.\nDays 81-90: Revision only. No new topics.\n\nThe key is consistency, not intensity.', author: 'Rohan Gupta', tag: 'JEE Prep', readTime: '12 min read', date: 'Nov 20, 2024', source: 'HomeGuru', likes: 56, comments: 19),
  ];
}
