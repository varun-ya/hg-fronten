import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'theme.dart';
import 'models/theme_manager.dart';
import 'screens/splash_screen.dart';
import 'screens/welcome/welcome_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  await themeManager.load();
  runApp(const HomeGuruApp());
}

class HomeGuruApp extends StatefulWidget {
  const HomeGuruApp({super.key});
  @override
  State<HomeGuruApp> createState() => _HomeGuruAppState();
}

class _HomeGuruAppState extends State<HomeGuruApp> {
  bool _splashDone = false;

  @override
  void initState() {
    super.initState();
    themeManager.addListener(_rebuild);
    Future.delayed(const Duration(milliseconds: 2500), () {
      if (mounted) setState(() => _splashDone = true);
    });
  }

  @override
  void dispose() { themeManager.removeListener(_rebuild); super.dispose(); }
  void _rebuild() => setState(() {});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HomeGuru',
      debugShowCheckedModeBanner: false,
      theme: hgTheme(),
      darkTheme: hgDarkTheme(),
      themeMode: themeManager.mode,
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        FlutterQuillLocalizations.delegate,
      ],
      supportedLocales: const [Locale('en')],
      builder: (context, child) => ThemeObserver(child: child!),
      home: AnimatedSwitcher(
        duration: const Duration(milliseconds: 500),
        switchInCurve: Curves.easeOut,
        switchOutCurve: Curves.easeIn,
        child: _splashDone
            ? const WelcomeScreen(key: ValueKey('welcome'))
            : const SplashScreen(key: ValueKey('splash')),
      ),
    );
  }
}
