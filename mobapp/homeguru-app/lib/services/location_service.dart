import 'dart:convert';
import 'package:http/http.dart' as http;

class LocationService {
  static const _base = 'https://countriesnow.space/api/v0.1';

  static List<String>? _countriesCache;
  static final _statesCache = <String, List<String>>{};
  static final _citiesCache = <String, List<String>>{};

  static Future<List<String>> getCountries() async {
    if (_countriesCache != null) return _countriesCache!;
    try {
      final res = await http.get(Uri.parse('$_base/countries/positions')).timeout(const Duration(seconds: 8));
      final body = jsonDecode(res.body);
      if (body['error'] == false) {
        _countriesCache = (body['data'] as List).map<String>((e) => e['name'] as String).toList()..sort();
        return _countriesCache!;
      }
    } catch (_) {}
    // Fallback
    _countriesCache = ['India', 'United States', 'United Kingdom', 'UAE', 'Australia', 'Canada', 'Singapore', 'Germany'];
    return _countriesCache!;
  }

  static Future<List<String>> getStates(String country) async {
    if (_statesCache.containsKey(country)) return _statesCache[country]!;
    try {
      final res = await http.get(Uri.parse('$_base/countries/states/q?country=$country')).timeout(const Duration(seconds: 8));
      final body = jsonDecode(res.body);
      if (body['error'] == false) {
        final states = (body['data']['states'] as List).map<String>((e) => e['name'] as String).toList()..sort();
        _statesCache[country] = states;
        return states;
      }
    } catch (_) {}
    return [];
  }

  static Future<List<String>> getCities(String country, String state) async {
    final key = '$country|$state';
    if (_citiesCache.containsKey(key)) return _citiesCache[key]!;
    try {
      final res = await http.get(Uri.parse('$_base/countries/state/cities/q?country=$country&state=$state')).timeout(const Duration(seconds: 8));
      final body = jsonDecode(res.body);
      if (body['error'] == false) {
        final cities = (body['data'] as List).cast<String>()..sort();
        _citiesCache[key] = cities;
        return cities;
      }
    } catch (_) {}
    return [];
  }
}
