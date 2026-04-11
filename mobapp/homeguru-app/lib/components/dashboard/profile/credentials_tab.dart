import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../screens/availability/availability_page.dart';

class ProfileCredentialsTab extends StatelessWidget {
  final bool visitorMode;
  const ProfileCredentialsTab({super.key, this.visitorMode = false});

  @override
  Widget build(BuildContext context) {
    return ListView(padding: EdgeInsets.fromLTRB(16, 16, 16, 32), children: [
      // Documents
      Text('Documents', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
      const SizedBox(height: 12),
      SizedBox(
        height: 210,
        child: ListView(scrollDirection: Axis.horizontal, physics: const BouncingScrollPhysics(), children: [
          _docCard('B.Sc Degree', 'Mumbai University', PhosphorIconsFill.graduationCap, HG.powderBlue, HG.blue, 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=300&h=200&fit=crop'),
          const SizedBox(width: 10),
          _docCard('JEE Scorecard', 'NTA', PhosphorIconsFill.exam, HG.powderGreen, HG.green, 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=300&h=200&fit=crop'),
          const SizedBox(width: 10),
          _docCard('Teaching Cert', 'Coursera', PhosphorIconsFill.certificate, HG.powderOrange, HG.orange, 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=300&h=200&fit=crop'),
          const SizedBox(width: 10),
          _docCard('Top Tutor Award', 'HomeGuru', PhosphorIconsFill.trophy, HG.butterYellow, HG.amber, 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=300&h=200&fit=crop'),
          if (!visitorMode) ...[
            const SizedBox(width: 10),
            GestureDetector(
              onTap: () { HapticFeedback.mediumImpact(); },
              child: Card(
                elevation: 0, color: HG.grey50,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: HG.grey200)),
                child: SizedBox(
                  width: 110, height: 200,
                  child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                    Container(width: 40, height: 40, decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(12)),
                      child: Icon(PhosphorIconsBold.plus, size: 18, color: HG.dark)),
                    const SizedBox(height: 8),
                    Text('Upload', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark)),
                  ]),
                ),
              ),
            ),
          ],
        ]),
      ),
      const SizedBox(height: 28),

      // Awards timeline
      Text('Awards & Certifications', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
      const SizedBox(height: 14),
      _credTile('Top Rated Tutor', 'HomeGuru', 'Jan 2025', 'Awarded for 4.8+ rating across 150+ sessions.'),
      _credTile('B.Sc Mathematics (Hons)', 'Mumbai University', '2017 \u2013 2020', 'First class with distinction.'),
      _credTile('JEE Advanced Qualified', 'NTA', '2017', 'AIR 2450. Top 0.5% of 1.2M candidates.'),
      _credTile('Advanced Teaching Methods', 'Coursera \u00b7 U of Michigan', 'Aug 2023', '6-week program on modern pedagogy.', isLast: true),
      if (!visitorMode) ...[
        const SizedBox(height: 14),
        OutlinedButton.icon(
          onPressed: () { HapticFeedback.mediumImpact(); },
          icon: Icon(PhosphorIconsBold.plus, size: 14),
          label: Text('Add Credential'),
          style: OutlinedButton.styleFrom(
            foregroundColor: HG.dark,
            padding: EdgeInsets.symmetric(vertical: 12),
            shape: const StadiumBorder(),
            side: BorderSide(color: HG.grey200),
            textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, fontFamily: HG.font),
          ),
        ),
      ],

      if (!visitorMode) ...[
        const SizedBox(height: 28),
        Text('Verification', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 8),
        Card(
          elevation: 0, color: HG.grey50,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Column(children: [
            _verifyTile(PhosphorIconsFill.identificationCard, 'Aadhaar', 'Verified', true),
            Divider(height: 1, indent: 56),
            _verifyTile(PhosphorIconsFill.creditCard, 'PAN Card', 'Verified', true),
            Divider(height: 1, indent: 56),
            _verifyTile(PhosphorIconsFill.bank, 'Bank Account', 'HDFC \u00b7\u00b7\u00b7\u00b7 4521', true),
            Divider(height: 1, indent: 56),
            _verifyTile(PhosphorIconsFill.envelope, 'Email', 'Verified', true),
            Divider(height: 1, indent: 56),
            _verifyTile(PhosphorIconsFill.phone, 'Phone', 'Verified', true),
          ]),
        ),

        const SizedBox(height: 28),
        Text('Settings', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 8),
        Card(
          elevation: 0, color: HG.grey50,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Column(children: [
            _settingsTile(PhosphorIconsRegular.calendarCheck, 'Availability', onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const AvailabilityPage()))),
            Divider(height: 1, indent: 56),
            _settingsTile(PhosphorIconsRegular.bellRinging, 'Notifications'),
            Divider(height: 1, indent: 56),
            _settingsTile(PhosphorIconsRegular.lockKey, 'Privacy'),
            Divider(height: 1, indent: 56),
            _settingsTile(PhosphorIconsRegular.gear, 'Account Settings'),
            Divider(height: 1, indent: 56),
            _settingsTile(PhosphorIconsRegular.question, 'Help & Support'),
            Divider(height: 1, indent: 56),
            _settingsTile(PhosphorIconsRegular.signOut, 'Log out', isDestructive: true),
          ]),
        ),
      ],
    ]);
  }

  static Widget _docCard(String title, String org, IconData icon, Color bg, Color fg, String imageUrl) => Card(
    elevation: 0, color: HG.white,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: HG.grey200)),
    clipBehavior: Clip.antiAlias,
    child: SizedBox(
      width: 155, height: 210,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        SizedBox(
          height: 110, width: double.infinity,
          child: Stack(fit: StackFit.expand, children: [
            Image.network(imageUrl, fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(color: bg, child: Center(child: Icon(icon, size: 32, color: fg)))),
            Container(decoration: BoxDecoration(
              gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter,
                colors: [Colors.transparent, Colors.black.withValues(alpha: 0.12)]),
            )),
            Positioned(top: 8, right: 8, child: Container(
              padding: EdgeInsets.symmetric(horizontal: 7, vertical: 3),
              decoration: BoxDecoration(color: HG.white.withValues(alpha: 0.9), borderRadius: BorderRadius.circular(6)),
              child: Text('PDF', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: fg)),
            )),
            Positioned(bottom: 8, left: 8, child: Container(
              width: 28, height: 28,
              decoration: BoxDecoration(color: HG.white.withValues(alpha: 0.9), borderRadius: BorderRadius.circular(8)),
              child: Icon(icon, size: 14, color: fg),
            )),
          ]),
        ),
        Padding(
          padding: EdgeInsets.fromLTRB(12, 10, 12, 10),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark), maxLines: 1, overflow: TextOverflow.ellipsis),
            const SizedBox(height: 2),
            Text(org, style: TextStyle(fontSize: 11, color: HG.textMuted), maxLines: 1, overflow: TextOverflow.ellipsis),
            const SizedBox(height: 8),
            Row(children: [
              Icon(PhosphorIconsFill.sealCheck, size: 12, color: HG.green),
              const SizedBox(width: 4),
              Text('Verified', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.green)),
            ]),
          ]),
        ),
      ]),
    ),
  );

  static Widget _credTile(String title, String org, String date, String desc, {bool isLast = false}) => IntrinsicHeight(child: Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
    SizedBox(width: 20, child: Column(children: [
      Container(width: 10, height: 10, decoration: BoxDecoration(color: HG.dark, shape: BoxShape.circle)),
      if (!isLast) Expanded(child: Container(width: 1.5, color: HG.grey200)),
    ])),
    const SizedBox(width: 14),
    Expanded(child: Padding(padding: EdgeInsets.only(bottom: isLast ? 0 : 24), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(title, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark, height: 1.2)),
      const SizedBox(height: 3), Text(org, style: TextStyle(fontSize: 13, color: HG.dark)),
      const SizedBox(height: 2), Text(date, style: TextStyle(fontSize: 12, color: HG.textLight)),
      const SizedBox(height: 8), Text(desc, style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.45)),
    ]))),
  ]));

  static Widget _verifyTile(IconData icon, String label, String status, bool verified) => ListTile(
    leading: Icon(icon, size: 20, color: HG.dark),
    title: Text(label, style: TextStyle(fontSize: 14, color: HG.dark)),
    trailing: Row(mainAxisSize: MainAxisSize.min, children: [
      if (verified) ...[Icon(PhosphorIconsFill.sealCheck, size: 14, color: HG.green), const SizedBox(width: 4)],
      Text(status, style: TextStyle(fontSize: 12, color: verified ? HG.green : HG.textMuted, fontWeight: verified ? FontWeight.w600 : FontWeight.w400)),
    ]),
    dense: true,
  );

  static Widget _settingsTile(IconData icon, String label, {bool isDestructive = false, VoidCallback? onTap}) => ListTile(
    leading: Icon(icon, size: 20, color: isDestructive ? HG.red : HG.dark),
    title: Text(label, style: TextStyle(fontSize: 14, color: isDestructive ? HG.red : HG.dark)),
    trailing: isDestructive ? null : Icon(PhosphorIconsRegular.caretRight, size: 16, color: HG.grey300),
    dense: true,
    onTap: onTap ?? () {},
  );
}
