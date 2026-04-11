import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../theme.dart';
import '../../../models/theme_manager.dart';

class DashboardShell extends StatefulWidget {
  final List<Widget> tabs;
  final List<({IconData icon, IconData activeIcon, String label})> navItems;
  final Widget Function() profileBuilder;
  final Map<int, Widget Function()> routeBuilders;
  final int? centerIndex;
  final Widget? centerWidget;
  const DashboardShell({super.key, required this.tabs, required this.navItems, required this.profileBuilder, this.routeBuilders = const {}, this.centerIndex, this.centerWidget});

  /// Switch to a nav tab programmatically from anywhere in the subtree.
  static void switchTab(BuildContext context, int index) {
    context.findAncestorStateOfType<_DashboardShellState>()?._switchTo(index);
  }

  @override
  State<DashboardShell> createState() => _DashboardShellState();
}

class _DashboardShellState extends State<DashboardShell> {
  int _idx = 0;

  void _switchTo(int i) {
    if (i >= 0 && i < widget.tabs.length && _idx != i) setState(() => _idx = i);
  }

  @override
  void initState() { super.initState(); themeManager.addListener(_onTheme); }
  @override
  void dispose() { themeManager.removeListener(_onTheme); super.dispose(); }
  void _onTheme() { if (mounted) setState(() {}); }

  int get _profileIdx => widget.navItems.length > widget.tabs.length ? widget.navItems.length - 1 : -1;

  void _openRoute(Widget Function() builder) {
    Navigator.push(context, PageRouteBuilder(
      pageBuilder: (_, __, ___) => builder(),
      transitionDuration: const Duration(milliseconds: 350),
      reverseTransitionDuration: const Duration(milliseconds: 300),
      transitionsBuilder: (_, anim, __, child) => SlideTransition(
        position: Tween(begin: const Offset(1, 0), end: Offset.zero).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic)),
        child: child),
    ));
  }

  @override
  Widget build(BuildContext context) {
    final pb = MediaQuery.of(context).padding.bottom;
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        body: IndexedStack(
          key: ValueKey(Theme.of(context).brightness),
          index: _idx, children: widget.tabs),
        bottomNavigationBar: Container(
          decoration: BoxDecoration(color: HG.surface, border: Border(top: BorderSide(color: HG.border, width: 0.5))),
          padding: EdgeInsets.only(bottom: pb),
          child: SizedBox(height: 52, child: Row(
            children: List.generate(widget.navItems.length, (i) {
              final item = widget.navItems[i];
              final isRoute = i == _profileIdx || widget.routeBuilders.containsKey(i);
              final on = _idx == i && !isRoute;
              return Expanded(child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: () {
                  HapticFeedback.selectionClick();
                  if (i == _profileIdx) { _openRoute(widget.profileBuilder); }
                  else if (widget.routeBuilders.containsKey(i)) { _openRoute(widget.routeBuilders[i]!); }
                  else if (_idx == i) {
                    // Already on this tab — scroll to top (Twitter/IG behavior)
                    HapticFeedback.lightImpact();
                    final ctx = widget.tabs[i] is StatefulWidget ? context : null;
                    if (ctx != null) {
                      final sc = PrimaryScrollController.maybeOf(ctx);
                      sc?.animateTo(0, duration: const Duration(milliseconds: 400), curve: Curves.easeOutCubic);
                    }
                  }
                  else { setState(() => _idx = i); }
                },
                child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                  if (i == widget.centerIndex && widget.centerWidget != null)
                    AnimatedScale(
                      scale: on ? 1.15 : 1.0,
                      duration: const Duration(milliseconds: 200),
                      curve: Curves.easeOutCubic,
                      child: widget.centerWidget!,
                    )
                  else
                    AnimatedScale(
                      scale: on ? 1.15 : 1.0,
                      duration: const Duration(milliseconds: 200),
                      curve: Curves.easeOutCubic,
                      child: Icon(on ? item.activeIcon : item.icon, size: 23, color: on ? HG.dark : HG.grey500),
                    ),
                  const SizedBox(height: 4),
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    width: on ? 4 : 0, height: 4,
                    decoration: BoxDecoration(color: on ? HG.dark : Colors.transparent, shape: BoxShape.circle),
                  ),
                ]),
              ));
            }),
          )),
        ),
      ),
    );
  }
}
