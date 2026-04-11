import 'dart:math';

/// Rich tutor model used by the search/explore system.
class SearchableTutor {
  final String name, subject, imageUrl, bio, languages;
  final double rating;
  final int students, price, experience;
  final List<String> grades;
  final List<String> tags;
  // Expanded fields
  final String gender;       // 'Male', 'Female', 'Other'
  final String mode;         // 'Online', 'Offline', 'Both'
  final String board;        // 'CBSE', 'ICSE', 'State', 'IB', 'Multiple'
  final String city;         // 'Mumbai', 'Delhi', 'Online', etc.
  final int sessions;        // total sessions completed
  final String responseTime; // 'Within 1 hr', 'Within 6 hrs', etc.

  const SearchableTutor({
    required this.name, required this.subject, required this.imageUrl,
    required this.rating, required this.students, required this.price,
    required this.experience, required this.grades, required this.tags,
    this.bio = '', this.languages = 'English, Hindi',
    this.gender = 'Male', this.mode = 'Online', this.board = 'CBSE',
    this.city = 'Online', this.sessions = 0, this.responseTime = 'Within 1 hr',
  });

  String get avatar => name.isNotEmpty ? name[0] : '?';

  // ── Searchable fields ──
  List<String> get _subjectWords => subject.toLowerCase().split(RegExp(r'[·,\s]+'));
  List<String> get _tagWords => [...tags, board, mode, city].map((t) => t.toLowerCase()).toList();
  String get _blob => '$name $subject $bio $board $city $mode ${grades.join(' ')} ${tags.join(' ')}'.toLowerCase();

  /// Score tutor against query.
  TutorScore scoreFor(String query) {
    final parsed = _ParsedQuery.from(query);
    if (parsed.keywords.isEmpty && parsed.priceLimit == null) return TutorScore(1, 0, 0);

    double score = 0;
    int matched = 0;
    final total = parsed.keywords.length;

    // Hard filters — instant disqualify
    if (parsed.priceLimit != null && price > parsed.priceLimit!) return TutorScore(-100, 0, total);
    if (parsed.minExp != null && experience < parsed.minExp!) return TutorScore(-100, 0, total);

    // Price match bonus
    if (parsed.priceLimit != null && price <= parsed.priceLimit!) { score += 5; matched++; }

    for (final kw in parsed.keywords) {
      final best = _bestMatch(kw);
      if (best >= 0.9) { score += best * 10; matched++; }
      else if (best >= 0.7) { score += best * 5; matched++; }
      else { score -= 3; }
    }

    if (matched == total && total > 0) score += 5;

    return TutorScore(score, matched, total);
  }

  /// Best fuzzy match score for [keyword] across tutor fields.
  /// Languages are NOT searched (prevents "english" matching every tutor).
  double _bestMatch(String keyword) {
    // Subject words — exact contains
    if (_subjectWords.any((w) => w.contains(keyword) || keyword.contains(w))) return 1.0;
    // Tags — exact contains
    if (_tagWords.any((t) => t.contains(keyword) || keyword.contains(t))) return 1.0;
    // Grade — handle compound keywords like "class12" matching "class 12"
    final gradeNorm = keyword.replaceAll(' ', '');
    if (grades.any((g) {
      final gNorm = g.toLowerCase().replaceAll(' ', '');
      return gNorm == gradeNorm || gNorm.contains(gradeNorm) || gradeNorm.contains(gNorm);
    })) return 1.0;
    // Name
    if (name.toLowerCase().contains(keyword)) return 0.95;
    // Bio only (not languages)
    if (bio.toLowerCase().contains(keyword)) return 0.85;

    // Fuzzy: only against subject + tags (not blob)
    double best = 0;
    for (final field in [..._subjectWords, ..._tagWords]) {
      final sim = _similarity(keyword, field);
      if (sim > best) best = sim;
    }
    return best;
  }

  /// Normalized similarity (0..1) using Levenshtein distance.
  static double _similarity(String a, String b) {
    if (a == b) return 1.0;
    if (a.isEmpty || b.isEmpty) return 0.0;
    final maxLen = max(a.length, b.length);
    final dist = _levenshtein(a, b);
    return 1.0 - (dist / maxLen);
  }

  static int _levenshtein(String a, String b) {
    final m = a.length, n = b.length;
    final d = List.generate(m + 1, (_) => List.filled(n + 1, 0));
    for (int i = 0; i <= m; i++) { d[i][0] = i; }
    for (int j = 0; j <= n; j++) { d[0][j] = j; }
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        final cost = a[i - 1] == b[j - 1] ? 0 : 1;
        d[i][j] = [d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost].reduce(min);
      }
    }
    return d[m][n];
  }

  static const _fillers = {
    'a', 'an', 'the', 'for', 'of', 'in', 'to', 'and', 'or', 'with',
    'i', 'me', 'my', 'want', 'need', 'find', 'get', 'looking', 'search',
    'tutor', 'teacher', 'sir', 'mam', 'madam', 'best', 'good', 'top',
    'class', 'grade', 'online', 'offline', 'home',
  };
}

class TutorScore {
  final double score;
  final int matched, total;
  const TutorScore(this.score, this.matched, this.total);
  bool get isMatch => score > 0 && (total <= 1 ? matched >= 1 : matched > (total / 2));
  bool get isStrongMatch => score >= 8 && matched >= (total * 0.6).ceil();
}

/// Parsed search query with extracted intent.
class _ParsedQuery {
  final List<String> keywords;
  final int? priceLimit;
  final int? minExp;

  const _ParsedQuery({required this.keywords, this.priceLimit, this.minExp});

  factory _ParsedQuery.from(String raw) {
    final q = raw.toLowerCase().trim();

    // Extract price: "200 rupee", "under 500", "below 300"
    int? priceLimit;
    var cleaned = q;
    final pricePatterns = [
      RegExp(r'(?:under|below|less than|max|upto|up to)\s*(\d+)'),
      RegExp(r'(\d+)\s*(?:rupee|rupees|rs|₹|inr|per\s*hour|/hr)'),
    ];
    for (final p in pricePatterns) {
      final m = p.firstMatch(cleaned);
      if (m != null) {
        priceLimit = int.tryParse(m.group(1)!);
        cleaned = cleaned.replaceFirst(m.group(0)!, ' ');
        break;
      }
    }
    // Standalone number 100-2000 likely a price
    if (priceLimit == null) {
      final numMatch = RegExp(r'\b(\d{3,4})\b').firstMatch(cleaned);
      if (numMatch != null) {
        final n = int.tryParse(numMatch.group(1)!);
        if (n != null && n >= 100 && n <= 2000) {
          priceLimit = n;
          cleaned = cleaned.replaceFirst(numMatch.group(0)!, ' ');
        }
      }
    }

    // Extract experience: "5 years", "3 yr"
    int? minExp;
    final expMatch = RegExp(r'(\d+)\s*(?:year|years|yr|yrs)').firstMatch(cleaned);
    if (expMatch != null) {
      minExp = int.tryParse(expMatch.group(1)!);
      cleaned = cleaned.replaceFirst(expMatch.group(0)!, ' ');
    }

    // Extract grade: "class 12", "12th", "grade 10" — replace with compound keyword
    final gradeMatch = RegExp(r'(?:class|grade)\s*(\d+)(?:th|st|nd|rd)?').firstMatch(cleaned);
    if (gradeMatch != null) {
      final gradeNum = gradeMatch.group(1)!;
      cleaned = cleaned.replaceFirst(gradeMatch.group(0)!, ' class$gradeNum ');
    }
    // Also handle standalone "12th", "10th"
    final thMatch = RegExp(r'\b(\d+)(?:th|st|nd|rd)\b').firstMatch(cleaned);
    if (thMatch != null) {
      final n = int.tryParse(thMatch.group(1)!);
      if (n != null && n >= 1 && n <= 12) {
        cleaned = cleaned.replaceFirst(thMatch.group(0)!, ' class${thMatch.group(1)} ');
      }
    }

    // Split remaining into keywords, remove fillers
    final words = cleaned.split(RegExp(r'[\s,]+'))
        .where((w) => w.length > 1 && !SearchableTutor._fillers.contains(w))
        .toList();

    return _ParsedQuery(keywords: words, priceLimit: priceLimit, minExp: minExp);
  }
}

/// Search result with matches and suggestions separated.
class SearchResult {
  final List<(SearchableTutor, TutorScore)> matches;
  final List<(SearchableTutor, TutorScore)> suggestions;
  const SearchResult({required this.matches, required this.suggestions});
}

/// Run local search: returns matches (score > 0) and suggestions (top-rated fallbacks).
SearchResult searchTutors(String query, List<SearchableTutor> tutors) {
  if (query.trim().isEmpty) {
    return SearchResult(
      matches: tutors.map((t) => (t, TutorScore(1, 0, 0))).toList(),
      suggestions: [],
    );
  }

  final scored = tutors.map((t) => (t, t.scoreFor(query))).toList();
  final matches = scored.where((e) => e.$2.isMatch).toList()
    ..sort((a, b) => b.$2.score.compareTo(a.$2.score));
  final matchedNames = matches.map((e) => e.$1.name).toSet();

  // Suggestions: top-rated tutors not in matches
  final suggestions = scored
      .where((e) => !matchedNames.contains(e.$1.name))
      .toList()
    ..sort((a, b) => b.$1.rating.compareTo(a.$1.rating));

  return SearchResult(matches: matches, suggestions: suggestions.take(5).toList());
}

// ── Directory ──
const tutorDirectory = [
  SearchableTutor(name: 'Ayush Soni', subject: 'Maths · Physics', rating: 4.9, students: 48, price: 499, experience: 6, grades: ['Class 11', 'Class 12'], tags: ['JEE', 'JEE Mains', 'CBSE', 'Advanced'], bio: 'IIT Delhi alumnus, 6 yrs coaching JEE aspirants', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'),
  SearchableTutor(name: 'Priya Menon', subject: 'Physics', rating: 4.8, students: 35, price: 399, experience: 4, grades: ['Class 11', 'Class 12'], tags: ['NEET', 'CBSE'], bio: 'MSc Physics, specialises in mechanics & optics', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'),
  SearchableTutor(name: 'Ankit Kapoor', subject: 'English · Literature', rating: 4.7, students: 28, price: 349, experience: 5, grades: ['Class 9', 'Class 10', 'Class 11', 'Class 12'], tags: ['CBSE', 'ICSE', 'Creative Writing'], bio: 'MA English Lit, published author', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'),
  SearchableTutor(name: 'Neha Sharma', subject: 'Chemistry', rating: 4.9, students: 52, price: 549, experience: 8, grades: ['Class 11', 'Class 12'], tags: ['JEE', 'JEE Mains', 'NEET', 'Organic', 'Inorganic'], bio: 'PhD Chemistry, 8 yrs experience, top-rated', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'),
  SearchableTutor(name: 'Rohit Verma', subject: 'Biology · Botany', rating: 4.6, students: 19, price: 299, experience: 3, grades: ['Class 11', 'Class 12'], tags: ['NEET', 'CBSE'], bio: 'MBBS, teaches biology for NEET prep', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'),
  SearchableTutor(name: 'Sneha Iyer', subject: 'Maths · JEE Advanced', rating: 4.8, students: 41, price: 449, experience: 5, grades: ['Class 11', 'Class 12'], tags: ['JEE', 'JEE Mains', 'JEE Advanced', 'Olympiad'], bio: 'IIT Bombay, JEE AIR 340, competitive math coach', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'),
  SearchableTutor(name: 'Vikram Das', subject: 'Physics · JEE', rating: 4.5, students: 22, price: 379, experience: 4, grades: ['Class 11', 'Class 12'], tags: ['JEE', 'JEE Mains', 'CBSE'], bio: 'NIT Trichy, focuses on problem-solving approach', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'),
  SearchableTutor(name: 'Kavya Nair', subject: 'Chemistry · NEET', rating: 4.7, students: 33, price: 429, experience: 5, grades: ['Class 11', 'Class 12'], tags: ['NEET', 'CBSE', 'Organic'], bio: 'MSc Organic Chem, NEET specialist', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'),
  SearchableTutor(name: 'Arjun Mehta', subject: 'Maths', rating: 4.4, students: 15, price: 279, experience: 2, grades: ['Class 8', 'Class 9', 'Class 10'], tags: ['CBSE', 'ICSE', 'Foundation'], bio: 'BSc Maths, great with younger students', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'),
  SearchableTutor(name: 'Divya Reddy', subject: 'Biology · Zoology', rating: 4.6, students: 27, price: 359, experience: 4, grades: ['Class 11', 'Class 12'], tags: ['NEET', 'AIIMS'], bio: 'AIIMS graduate, teaches with clinical examples', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'),
  SearchableTutor(name: 'Siddharth Joshi', subject: 'Physics · Maths', rating: 4.3, students: 12, price: 249, experience: 2, grades: ['Class 9', 'Class 10'], tags: ['CBSE', 'Foundation', 'Olympiad'], bio: 'BITS Pilani, foundation-level specialist', imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400'),
  SearchableTutor(name: 'Meera Krishnan', subject: 'English · IELTS', rating: 4.8, students: 44, price: 499, experience: 7, grades: ['Class 11', 'Class 12'], tags: ['IELTS', 'TOEFL', 'SAT', 'Creative Writing'], bio: '7 yrs IELTS coaching, British Council certified', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'),
];
