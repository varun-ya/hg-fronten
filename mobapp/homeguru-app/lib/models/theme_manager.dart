import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../theme.dart';

const _key = 'hg_theme_mode';

class ThemeManager extends ChangeNotifier {
  ThemeMode _mode = ThemeMode.light;
  ThemeMode get mode => _mode;

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString(_key);
    switch (saved) {
      case 'dark':  _mode = ThemeMode.dark;
      case 'system': _mode = ThemeMode.system;
      default: _mode = ThemeMode.light;
    }
    _syncDarkFlag();
  }

  void setMode(ThemeMode m) {
    if (_mode == m) return;
    _mode = m;
    _syncDarkFlag();
    notifyListeners();
    _save();
  }

  void toggle(BuildContext context) {
    final bright = Theme.of(context).brightness;
    setMode(bright == Brightness.dark ? ThemeMode.light : ThemeMode.dark);
  }

  void _syncDarkFlag() {
    if (_mode == ThemeMode.dark) setDarkMode(true);
    if (_mode == ThemeMode.light) setDarkMode(false);
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    final value = switch (_mode) {
      ThemeMode.dark => 'dark',
      ThemeMode.system => 'system',
      ThemeMode.light => 'light',
    };
    await prefs.setString(_key, value);
  }
}

final themeManager = ThemeManager();
