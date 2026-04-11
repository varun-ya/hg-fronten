import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/tutor_data.dart';
import '../../wallet/wallet_page.dart';
import '../../notifications/notifications_page.dart';
import '../../../components/dashboard/tutor/home_cards/priority_card.dart';
import '../../../components/dashboard/tutor/home_cards/today_card.dart';
import '../../../components/dashboard/tutor/home_cards/earnings_card.dart';
import '../../../components/dashboard/tutor/home_cards/activity_card.dart';
import '../../../components/dashboard/tutor/home_cards/payments_card.dart';

class TutorHomeTab extends StatefulWidget {
  const TutorHomeTab({super.key});
  @override
  State<TutorHomeTab> createState() => _TutorHomeTabState();
}

class _TutorHomeTabState extends State<TutorHomeTab> {
  final _pageCtrl = PageController(viewportFraction: 0.92);
  int _page = 0;

  static const _cardLabels = ['Priority', 'Today', 'Earnings', 'Activity', 'Payments'];
  static const _cardIcons = [PhosphorIconsFill.lightning, PhosphorIconsFill.calendarCheck, PhosphorIconsFill.chartLineUp, PhosphorIconsFill.users, PhosphorIconsFill.creditCard];

  @override
  void dispose() { _pageCtrl.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final pb = MediaQuery.of(context).padding.bottom;
    final now = DateTime.now();

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: Column(children: [
          _header(pt),
          const SizedBox(height: 14),
          _summaryRow(),
          const SizedBox(height: 16),
          _cardLabel(),
          const SizedBox(height: 8),
          Expanded(child: _pageView(now)),
          _dots(pb),
        ]),
      ),
    );
  }

  Widget _header(double pt) => Padding(
    padding: EdgeInsets.fromLTRB(20, pt + 10, 16, 0),
    child: Row(children: [
      Image.asset('assets/profileHeader.png', height: 16),
      const Spacer(),
      IconButton(
        onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const WalletPage())),
        icon: Icon(PhosphorIconsRegular.wallet, size: 21),
        style: IconButton.styleFrom(backgroundColor: HG.grey50),
      ),
      const SizedBox(width: 4),
      IconButton(
        onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const NotificationsPage())),
        icon: Badge(smallSize: 7, child: Icon(PhosphorIconsRegular.bell, size: 21)),
        style: IconButton.styleFrom(backgroundColor: HG.grey50),
      ),
    ]),
  );

  Widget _summaryRow() {
    final d = TutorDataProvider.of(context);
    final isDark = context.isDark;
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: Row(children: [
        Expanded(child: _summaryCard(
          icon: PhosphorIconsFill.flame,
          iconColor: HG.orange,
          bg: HG.butterYellow,
          borderColor: isDark ? null : HG.amber.withValues(alpha: 0.18),
          topLabel: '${d.streak} day streak',
          topColor: HG.orange,
          value: '\u20b9${_formatNum(d.earnedThisMonth)}',
          bottomLabel: 'Earned this month',
        )),
        const SizedBox(width: 10),
        Expanded(child: _summaryCard(
          icon: PhosphorIconsFill.star,
          iconColor: HG.purple,
          bg: HG.pastelPurple,
          borderColor: isDark ? null : HG.purple.withValues(alpha: 0.14),
          topLabel: '${d.rating} rating',
          topColor: HG.purple,
          value: '${d.activeStudentCount}',
          bottomLabel: 'Active students',
        )),
      ]),
    );
  }

  Widget _summaryCard({
    required IconData icon, required Color iconColor, required Color bg,
    Color? borderColor, required String topLabel, required Color topColor,
    required String value, required String bottomLabel,
  }) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(20),
        border: borderColor != null ? Border.all(color: borderColor) : null,
        boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 12, offset: const Offset(0, 3))],
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Container(
            width: 24, height: 24,
            decoration: BoxDecoration(color: iconColor.withValues(alpha: 0.12), borderRadius: BorderRadius.circular(7)),
            child: Icon(icon, size: 13, color: iconColor),
          ),
          const SizedBox(width: 8),
          Expanded(child: Text(topLabel, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: topColor))),
        ]),
        const SizedBox(height: 12),
        Text(value, style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.5, height: 1)),
        const SizedBox(height: 3),
        Text(bottomLabel, style: TextStyle(fontSize: 11, color: HG.textMuted)),
      ]),
    );
  }

  Widget _cardLabel() => Padding(
    padding: EdgeInsets.symmetric(horizontal: 20),
    child: Row(children: [
      Icon(_cardIcons[_page], size: 14, color: HG.textMuted),
      const SizedBox(width: 6),
      Text(_cardLabels[_page], style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
      const Spacer(),
      Text('${_page + 1}/${_cardLabels.length}', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: HG.textLight)),
    ]),
  );

  Widget _pageView(DateTime now) => PageView.builder(
    controller: _pageCtrl,
    onPageChanged: (i) => setState(() => _page = i),
    itemCount: _cardLabels.length,
    itemBuilder: (context, index) {
      return AnimatedBuilder(
        animation: _pageCtrl,
        builder: (context, child) {
          double v = 0;
          if (_pageCtrl.position.haveDimensions) {
            v = (index - (_pageCtrl.page ?? 0)).clamp(-1.0, 1.0).toDouble();
          }
          return Transform.scale(
            scale: 1.0 - v.abs() * 0.04,
            child: Opacity(opacity: (1.0 - v.abs() * 0.2).clamp(0.0, 1.0), child: child),
          );
        },
        child: Padding(
          padding: EdgeInsets.only(bottom: 8),
          child: switch (index) {
            0 => PriorityCard(now: now),
            1 => const TodayCard(),
            2 => const EarningsCard(),
            3 => const ActivityCard(),
            4 => const PaymentsCard(),
            _ => const SizedBox(),
          },
        ),
      );
    },
  );

  Widget _dots(double pb) => Padding(
    padding: EdgeInsets.only(bottom: pb + 8, top: 2),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(_cardLabels.length, (i) {
        final active = _page == i;
        return GestureDetector(
          onTap: () => _pageCtrl.animateToPage(i, duration: const Duration(milliseconds: 350), curve: Curves.easeOutCubic),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 250),
            curve: Curves.easeOutCubic,
            width: active ? 22 : 6, height: 6,
            margin: EdgeInsets.symmetric(horizontal: 3),
            decoration: BoxDecoration(
              color: active ? HG.dark : HG.grey300,
              borderRadius: BorderRadius.circular(3),
            ),
          ),
        );
      }),
    ),
  );

  String _formatNum(int n) {
    if (n >= 100000) return '${(n / 100000).toStringAsFixed(1)}L';
    if (n >= 1000) return '${(n / 1000).toStringAsFixed(n % 1000 == 0 ? 0 : 1)}K';
    return n.toString();
  }
}
