import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../theme.dart';

enum _NType { all, classes, payments, students, system }

class _Notif {
  final String title, body, time, group;
  final IconData icon;
  final bool unread;
  final _NType type;
  const _Notif({required this.title, required this.body, required this.time, required this.group, required this.icon, this.unread = false, required this.type});
}

const _all = [
  _Notif(title: 'Class starting in 10 min', body: 'Meera Iyer \u00b7 English Lit', time: '10 min ago', group: 'Today', icon: PhosphorIconsRegular.videoCamera, unread: true, type: _NType.classes),
  _Notif(title: 'New student request', body: 'Ananya Reddy wants to join Physics', time: '45 min ago', group: 'Today', icon: PhosphorIconsRegular.userPlus, unread: true, type: _NType.students),
  _Notif(title: 'Payment received', body: '\u20b9500 from Aarav Sharma \u00b7 Mathematics', time: '2h ago', group: 'Today', icon: PhosphorIconsRegular.currencyInr, unread: true, type: _NType.payments),
  _Notif(title: 'Assignment submitted', body: 'Aarav Sharma submitted Quadratic Equations', time: '3h ago', group: 'Today', icon: PhosphorIconsRegular.fileText, type: _NType.students),
  _Notif(title: 'Class rescheduled', body: 'Priya Patel moved Physics to 11:30 AM tomorrow', time: '5h ago', group: 'Today', icon: PhosphorIconsRegular.calendarX, type: _NType.classes),
  _Notif(title: 'Payment received', body: '\u20b9800 from Sneha Kapoor \u00b7 JEE Advanced', time: '4:00 PM', group: 'Yesterday', icon: PhosphorIconsRegular.currencyInr, type: _NType.payments),
  _Notif(title: 'Sneha scored 247/300', body: 'JEE Mock Test #8 results are in', time: '3:30 PM', group: 'Yesterday', icon: PhosphorIconsRegular.exam, type: _NType.students),
  _Notif(title: 'Auto-withdraw completed', body: '\u20b98,000 sent to HDFC \u00b7\u00b7\u00b7\u00b7 4521', time: '6:15 PM', group: 'Yesterday', icon: PhosphorIconsRegular.bank, type: _NType.payments),
  _Notif(title: 'Class completed', body: 'Kavya Singh \u00b7 JEE Prep \u00b7 45 min', time: '2:00 PM', group: 'Yesterday', icon: PhosphorIconsRegular.checkCircle, type: _NType.classes),
  _Notif(title: 'Doubt posted', body: 'Rohan Gupta asked about organic chemistry reaction', time: '1:00 PM', group: 'Yesterday', icon: PhosphorIconsRegular.chatCircle, type: _NType.students),
  _Notif(title: 'Weekly summary', body: '14 sessions \u00b7 12.5 hours \u00b7 \u20b94,200 earned', time: '9:00 AM', group: 'Jun 26', icon: PhosphorIconsRegular.chartBar, type: _NType.system),
  _Notif(title: 'Payment received', body: '\u20b9500 from Meera Iyer \u00b7 English Lit', time: '3:00 PM', group: 'Jun 26', icon: PhosphorIconsRegular.currencyInr, type: _NType.payments),
  _Notif(title: 'New review', body: 'Sneha Kapoor rated you 5 stars', time: '11:00 AM', group: 'Jun 26', icon: PhosphorIconsRegular.star, type: _NType.students),
  _Notif(title: 'Profile verified', body: 'Your Aadhaar verification is complete', time: '10:00 AM', group: 'Jun 25', icon: PhosphorIconsRegular.sealCheck, type: _NType.system),
  _Notif(title: 'Reminder', body: 'Update your lesson plan for this week', time: '9:00 AM', group: 'Jun 25', icon: PhosphorIconsRegular.bellRinging, type: _NType.system),
];

class NotificationsPage extends StatefulWidget {
  const NotificationsPage({super.key});
  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
  _NType _filter = _NType.all;

  List<_Notif> get _filtered => _filter == _NType.all ? _all : _all.where((n) => n.type == _filter).toList();

  int get _unreadCount => _all.where((n) => n.unread).length;

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final list = _filtered;
    final grouped = <String, List<_Notif>>{};
    for (final n in list) { grouped.putIfAbsent(n.group, () => []).add(n); }

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: ListView(
          padding: EdgeInsets.zero,
          physics: const BouncingScrollPhysics(),
          children: [
            // Header — same pattern as wallet
            Padding(
              padding: EdgeInsets.fromLTRB(16, pt + 10, 16, 0),
              child: Row(children: [
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: Icon(PhosphorIconsBold.arrowLeft, size: 20),
                  style: IconButton.styleFrom(backgroundColor: HG.grey50),
                ),
                const SizedBox(width: 12),
                Text('Notifications', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: HG.dark)),
                const Spacer(),
                if (_unreadCount > 0) TextButton(
                  onPressed: () {},
                  style: TextButton.styleFrom(
                    foregroundColor: HG.blue,
                    textStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, fontFamily: HG.font),
                    padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  ),
                  child: Text('Mark all read'),
                ),
              ]),
            ),
            const SizedBox(height: 16),

            // Filter chips — same pattern as wallet
            SizedBox(
              height: 38,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: EdgeInsets.symmetric(horizontal: 16),
                physics: const BouncingScrollPhysics(),
                children: _NType.values.map((t) {
                  final label = switch (t) { _NType.all => 'All', _NType.classes => 'Classes', _NType.payments => 'Payments', _NType.students => 'Students', _NType.system => 'System' };
                  final selected = _filter == t;
                  return Padding(
                    padding: EdgeInsets.only(right: 6),
                    child: ChoiceChip(
                      label: Text(label),
                      selected: selected,
                      onSelected: (_) => setState(() => _filter = t),
                      selectedColor: HG.powderBlue,
                      backgroundColor: HG.grey50,
                      side: BorderSide(color: selected ? HG.blue.withValues(alpha: 0.3) : HG.grey200),
                      labelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: selected ? HG.blue : HG.dark, fontFamily: HG.font),
                      shape: const StadiumBorder(),
                      visualDensity: VisualDensity.compact,
                      showCheckmark: false,
                    ),
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 8),

            // Notification list
            if (list.isEmpty)
              Padding(
                padding: EdgeInsets.only(top: 60),
                child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
                  Icon(PhosphorIconsRegular.bellSlash, size: 40, color: HG.grey300),
                  const SizedBox(height: 10),
                  Text('No notifications', style: TextStyle(fontSize: 14, color: HG.textMuted)),
                ])),
              )
            else
              ...grouped.entries.expand((e) => [
                Padding(
                  padding: EdgeInsets.fromLTRB(20, 12, 20, 6),
                  child: Text(e.key, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.textMuted)),
                ),
                ...e.value.map((n) => _notifTile(n, context)),
              ]),

            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  static Widget _notifTile(_Notif n, BuildContext context) => Padding(
    padding: EdgeInsets.symmetric(horizontal: 16),
    child: Card(
      elevation: 0,
      color: n.unread ? HG.grey50 : HG.surface,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14), side: BorderSide(color: HG.grey200)),
      margin: EdgeInsets.only(bottom: 6),
      child: ListTile(
        dense: true,
        contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 4),
        leading: CircleAvatar(
          radius: 20,
          backgroundColor: HG.grey100,
          child: Icon(n.icon, size: 16, color: HG.grey500),
        ),
        title: Text(n.title, style: TextStyle(fontSize: 13, fontWeight: n.unread ? FontWeight.w700 : FontWeight.w500, color: HG.dark)),
        subtitle: Text(n.body, style: TextStyle(fontSize: 12, color: HG.textMuted)),
        trailing: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.end, children: [
          Text(n.time, style: TextStyle(fontSize: 10, color: HG.textLight)),
          if (n.unread) ...[
            const SizedBox(height: 6),
            Container(width: 7, height: 7, decoration: BoxDecoration(color: HG.blue, shape: BoxShape.circle)),
          ],
        ]),
      ),
    ),
  );
}
