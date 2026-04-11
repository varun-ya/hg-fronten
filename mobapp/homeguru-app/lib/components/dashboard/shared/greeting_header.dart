import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class GreetingHeader extends StatelessWidget {
  final String name;
  final VoidCallback? onNotification;
  final VoidCallback? onWallet;

  const GreetingHeader({super.key, required this.name, this.onNotification, this.onWallet});

  String get _greeting {
    final h = DateTime.now().hour;
    if (h < 12) return 'Good morning,';
    if (h < 17) return 'Good afternoon,';
    return 'Good evening,';
  }

  @override
  Widget build(BuildContext context) {
    return Row(children: [
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(_greeting, style: TextStyle(fontSize: 13, color: HG.textMuted)),
        Text(name, style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: HG.dark, height: 1.2)),
      ])),
      if (onWallet != null) ...[
        _btn(PhosphorIconsRegular.wallet, onWallet),
        const SizedBox(width: 8),
      ],
      _btn(PhosphorIconsRegular.bell, onNotification, badge: true),
    ]);
  }

  Widget _btn(IconData icon, VoidCallback? onTap, {bool badge = false}) => GestureDetector(
    onTap: onTap,
    child: Container(
      width: 38, height: 38,
      decoration: BoxDecoration(color: HG.grey50, shape: BoxShape.circle),
      child: Stack(children: [
        Center(child: Icon(icon, size: 18, color: HG.dark)),
        if (badge) Positioned(top: 9, right: 9, child: Container(width: 7, height: 7, decoration: BoxDecoration(color: HG.orange, shape: BoxShape.circle, border: Border.all(color: HG.white, width: 1.5)))),
      ]),
    ),
  );
}
