import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/searchable_tutor.dart';

/// Osmium AI — powered by Sarvam, used for intelligent search ranking.
class OsmiumAI {
  static const _apiKey = '<OSMIUM_AI_API_KEY>';
  static const _baseUrl = 'https://api.sarvam.ai/v1/chat/completions';
  static const _model = 'sarvam-m';

  /// Rank tutors by relevance. Returns two lists:
  /// [0] = matched indices (relevant), [1] = remaining indices (suggestions).
  static Future<(List<int>, List<int>)> rankTutors(String query, List<SearchableTutor> tutors) async {
    if (query.trim().length < 3) {
      return (List.generate(tutors.length, (i) => i), <int>[]);
    }

    final summaries = tutors.asMap().entries.map((e) => {
      'i': e.key, 'name': e.value.name, 'subject': e.value.subject,
      'price': e.value.price, 'rating': e.value.rating, 'exp': e.value.experience,
      'grades': e.value.grades, 'tags': e.value.tags, 'bio': e.value.bio,
    }).toList();

    try {
      final res = await http.post(
        Uri.parse(_baseUrl),
        headers: {'Authorization': 'Bearer $_apiKey', 'Content-Type': 'application/json'},
        body: jsonEncode({
          'model': _model, 'temperature': 0,
          'messages': [
            {'role': 'system', 'content': _systemPrompt},
            {'role': 'user', 'content': 'Query: $query\n\nTutors:\n${jsonEncode(summaries)}'},
          ],
        }),
      ).timeout(const Duration(seconds: 8));

      if (res.statusCode != 200) return _fallback(tutors.length);

      final data = jsonDecode(res.body);
      final content = (data['choices']?[0]?['message']?['content'] ?? '') as String;

      // Parse JSON: {"matches":[0,2],"suggestions":[1,3]}
      final jsonMatch = RegExp(r'\{[^}]+\}').firstMatch(content);
      if (jsonMatch != null) {
        final parsed = jsonDecode(jsonMatch.group(0)!);
        final matches = (parsed['matches'] as List?)?.cast<int>() ?? [];
        final suggestions = (parsed['suggestions'] as List?)?.cast<int>() ?? [];
        final validM = matches.where((i) => i >= 0 && i < tutors.length).toList();
        final validS = suggestions.where((i) => i >= 0 && i < tutors.length).toList();
        // Add any missing to suggestions
        for (int i = 0; i < tutors.length; i++) {
          if (!validM.contains(i) && !validS.contains(i)) validS.add(i);
        }
        return (validM, validS);
      }

      // Fallback: try plain array
      final arrMatch = RegExp(r'\[[\d,\s]+\]').firstMatch(content);
      if (arrMatch != null) {
        final indices = (jsonDecode(arrMatch.group(0)!) as List).cast<int>();
        final valid = indices.where((i) => i >= 0 && i < tutors.length).toList();
        final rest = <int>[];
        for (int i = 0; i < tutors.length; i++) {
          if (!valid.contains(i)) rest.add(i);
        }
        return (valid, rest);
      }

      return _fallback(tutors.length);
    } catch (_) {
      return _fallback(tutors.length);
    }
  }

  static (List<int>, List<int>) _fallback(int count) => (List.generate(count, (i) => i), <int>[]);

  static const _systemPrompt = '''You are Osmium AI, a strict search ranking engine for a tutoring platform.

Given a user query and JSON tutor list, determine which tutors ACTUALLY match the query.
Consider: subject match, price constraints, grade level, experience, tags, and natural language intent.

STRICT RULES:
- A tutor must match the CORE subject/topic in the query to be a "match"
- If query mentions a price limit, tutors above that price are NOT matches
- If query mentions a grade, tutors who don't teach that grade are NOT matches
- "jee mains english 200 rupee" means: tutor who teaches BOTH JEE Mains AND English AND costs ≤200/hr
- If NO tutor matches ALL criteria, return empty matches

Return ONLY this JSON (no explanation):
{"matches":[indices of relevant tutors, best first],"suggestions":[remaining indices, best rated first]}''';
}
