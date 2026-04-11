import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

bool _isDark = false;

class HG {
  // Brand (same in both modes)
  static const orange = Color(0xFFE08A3C);
  static const orangeDark = Color(0xFFB8691E);
  static const orangeLight = Color(0xFFFFF3E6);
  static const amber = Color(0xFFF59E0B);
  static const amberDark = Color(0xFFD97706);
  static const green = Color(0xFF22C55E);
  static const greenDark = Color(0xFF16A34A);
  static const red = Color(0xFFEF4444);
  static const redDark = Color(0xFFDC2626);
  static const purple = Color(0xFF8B5CF6);
  static const purpleDark = Color(0xFF7C3AED);

  // Theme-aware neutrals
  static Color get dark => _isDark ? const Color(0xFFE5E5E5) : const Color(0xFF1A1A1A);
  static Color get text => _isDark ? const Color(0xFFE5E5E5) : const Color(0xFF111111);
  static Color get textMuted => _isDark ? const Color(0xFF8B8B8B) : const Color(0xFF6B7280);
  static Color get textLight => _isDark ? const Color(0xFF5A5A5A) : const Color(0xFF9CA3AF);
  static Color get border => _isDark ? const Color(0xFF1E1E1E) : const Color(0xFFE5E7EB);
  static Color get surface => _isDark ? const Color(0xFF000000) : const Color(0xFFFFFFFF);
  static Color get white => _isDark ? const Color(0xFF000000) : const Color(0xFFFFFFFF);
  static Color get grey50 => _isDark ? const Color(0xFF0A0A0A) : const Color(0xFFF9FAFB);
  static Color get grey100 => _isDark ? const Color(0xFF111111) : const Color(0xFFF3F4F6);
  static Color get grey200 => _isDark ? const Color(0xFF1E1E1E) : const Color(0xFFE5E7EB);
  static Color get grey300 => _isDark ? const Color(0xFF2A2A2A) : const Color(0xFFD1D5DB);
  static Color get grey500 => _isDark ? const Color(0xFF6B6B6B) : const Color(0xFF6B7280);
  static Color get grey700 => _isDark ? const Color(0xFFA0A0A0) : const Color(0xFF374151);
  static Color get grey900 => _isDark ? const Color(0xFFE5E5E5) : const Color(0xFF111827);
  static Color get blue => _isDark ? const Color(0xFF4A7BF7) : const Color(0xFF1E3162);
  static const blueDark = Color(0xFF152347);

  // Powder / pastel — flat grey in dark, colored in light
  static Color get powderBlue => _isDark ? const Color(0xFF111111) : const Color(0xFFEDF3FB);
  static Color get powderOrange => _isDark ? const Color(0xFF111111) : const Color(0xFFFFF7EE);
  static Color get powderGreen => _isDark ? const Color(0xFF111111) : const Color(0xFFEEF9F0);
  static Color get powderPurple => _isDark ? const Color(0xFF111111) : const Color(0xFFF3EFFF);
  static Color get powderAmber => _isDark ? const Color(0xFF111111) : const Color(0xFFFFFBF0);
  static Color get butterYellow => _isDark ? const Color(0xFF111111) : const Color(0xFFFFFBF0);
  static Color get pastelPurple => _isDark ? const Color(0xFF111111) : const Color(0xFFF0ECF9);

  // Inner card on powder bg — slightly elevated in dark, frosted in light
  static Color get cardOnPowder => _isDark ? const Color(0xFF1A1A1A) : const Color(0xFFFFFFFF);
  static Color get cardOnPowderBorder => _isDark ? const Color(0xFF2A2A2A) : const Color(0x12000000);

  static const radius = 8.0;
  static const font = 'Matter';

  // Fixed colors (never change)
  static const fixedWhite = Color(0xFFFFFFFF);
  static const fixedDark = Color(0xFF1A1A1A);
  static const fixedBlue = Color(0xFF1E3162);
}

void setDarkMode(bool dark) => _isDark = dark;

extension HGContext on BuildContext {
  bool get isDark => Theme.of(this).brightness == Brightness.dark;

  SystemUiOverlayStyle get hgSystemUi => isDark
      ? const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.light,
          statusBarBrightness: Brightness.dark,
          systemNavigationBarColor: Colors.black,
          systemNavigationBarIconBrightness: Brightness.light,
        )
      : const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.dark,
          statusBarBrightness: Brightness.light,
          systemNavigationBarColor: Color(0xFFFFFFFF),
          systemNavigationBarIconBrightness: Brightness.dark,
        );
}

class ThemeObserver extends StatelessWidget {
  final Widget child;
  const ThemeObserver({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    setDarkMode(Theme.of(context).brightness == Brightness.dark);
    return child;
  }
}

ThemeData hgTheme() => _build(Brightness.light);
ThemeData hgDarkTheme() => _build(Brightness.dark);

ThemeData _build(Brightness brightness) {
  final d = brightness == Brightness.dark;
  final bg = d ? Colors.black : HG.fixedWhite;
  final card = d ? const Color(0xFF111111) : HG.fixedWhite;
  final txt = d ? const Color(0xFFE5E5E5) : const Color(0xFF1A1A1A);
  final muted = d ? const Color(0xFF8B8B8B) : const Color(0xFF6B7280);
  final light = d ? const Color(0xFF5A5A5A) : const Color(0xFF9CA3AF);
  final bdr = d ? const Color(0xFF1E1E1E) : const Color(0xFFE5E7EB);

  return ThemeData(
    useMaterial3: true,
    brightness: brightness,
    fontFamily: HG.font,
    scaffoldBackgroundColor: bg,
    colorScheme: d
        ? ColorScheme.dark(primary: HG.orange, onPrimary: HG.fixedWhite, secondary: HG.amber, surface: bg, onSurface: txt)
        : const ColorScheme.light(primary: Color(0xFFE08A3C), onPrimary: Color(0xFFFFFFFF), secondary: Color(0xFFF59E0B), surface: Color(0xFFFFFFFF), onSurface: Color(0xFF1A1A1A)),
    appBarTheme: AppBarTheme(backgroundColor: bg, foregroundColor: txt, elevation: 0, scrolledUnderElevation: 0,
      systemOverlayStyle: SystemUiOverlayStyle(statusBarColor: Colors.transparent, statusBarIconBrightness: d ? Brightness.light : Brightness.dark, statusBarBrightness: brightness)),
    splashFactory: NoSplash.splashFactory,
    highlightColor: Colors.transparent,
    cardTheme: CardThemeData(color: card, elevation: 0, margin: EdgeInsets.zero, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(HG.radius))),
    textTheme: TextTheme(
      headlineLarge: TextStyle(fontWeight: FontWeight.w700, fontSize: 28, color: txt, height: 1.2),
      headlineMedium: TextStyle(fontWeight: FontWeight.w700, fontSize: 22, color: txt, height: 1.2),
      titleLarge: TextStyle(fontWeight: FontWeight.w700, fontSize: 18, color: txt),
      titleMedium: TextStyle(fontWeight: FontWeight.w600, fontSize: 16, color: txt),
      titleSmall: TextStyle(fontWeight: FontWeight.w600, fontSize: 14, color: txt),
      bodyLarge: TextStyle(fontWeight: FontWeight.w400, fontSize: 16, color: txt),
      bodyMedium: TextStyle(fontWeight: FontWeight.w400, fontSize: 14, color: txt),
      bodySmall: TextStyle(fontWeight: FontWeight.w400, fontSize: 12, color: muted),
      labelLarge: TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: d ? txt : HG.fixedWhite, letterSpacing: 0.5),
      labelSmall: TextStyle(fontWeight: FontWeight.w600, fontSize: 11, color: light, letterSpacing: 0.5),
    ),
    iconTheme: IconThemeData(color: txt, size: 22),
    dividerTheme: DividerThemeData(color: bdr, thickness: 1, space: 0),
    bottomSheetTheme: BottomSheetThemeData(backgroundColor: d ? const Color(0xFF111111) : HG.fixedWhite),
    dialogTheme: DialogThemeData(backgroundColor: d ? const Color(0xFF111111) : HG.fixedWhite),
    chipTheme: ChipThemeData(backgroundColor: d ? const Color(0xFF111111) : const Color(0xFFF9FAFB)),
    pageTransitionsTheme: const PageTransitionsTheme(builders: {
      TargetPlatform.android: PredictiveBackPageTransitionsBuilder(),
      TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
    }),
  );
}
