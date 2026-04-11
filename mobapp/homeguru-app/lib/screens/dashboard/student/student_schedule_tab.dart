import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/user_session.dart';
import '../../../components/dashboard/tutor/schedule/scheduled_class.dart';
import '../../meet/meet_screen.dart';

/// Student schedule — same layout as tutor schedule, but shows tutor names
/// and Join goes as learner role.

const _timezones = [
  ('IST', 'Asia/Kolkata', Duration(hours: 5, minutes: 30)),
  ('UTC', 'UTC', Duration.zero),
  ('EST', 'America/New_York', Duration(hours: -5)),
  ('PST', 'America/Los_Angeles', Duration(hours: -8)),
  ('GMT', 'Europe/London', Duration.zero),
  ('SGT', 'Asia/Singapore', Duration(hours: 8)),
  ('JST', 'Asia/Tokyo', Duration(hours: 9)),
  ('AEST', 'Australia/Sydney', Duration(hours: 10)),
  ('GST', 'Asia/Dubai', Duration(hours: 4)),
];

class StudentScheduleTab extends StatefulWidget {
  const StudentScheduleTab({super.key});
  @override
  State<StudentScheduleTab> createState() => _StudentScheduleTabState();
}

class _StudentScheduleTabState extends State<StudentScheduleTab> {
  DateTime _selected = DateTime.now();
  DateTime _viewMonth = DateTime(DateTime.now().year, DateTime.now().month);
  ScrollController? _timelineCtrl;
  ScrollController? _dateCtrl;
  List<DateTime>? _dates;
  int _tzIdx = 0;
  Timer? _clockTimer;

  DateTime get _today => DateTime.now();

  @override
  void initState() {
    super.initState();
    _selected = DateTime(_today.year, _today.month, _today.day);
    _viewMonth = DateTime(_today.year, _today.month);
    _dates = _buildDates();
    final offset = ((_today.hour * 60 + _today.minute) / 60 * 80 - 150).clamp(0.0, double.infinity);
    _timelineCtrl = ScrollController(initialScrollOffset: offset);
    _dateCtrl = ScrollController(initialScrollOffset: ((_today.day - 1) * 52.0 - 80).clamp(0.0, double.infinity));
    _clockTimer = Timer.periodic(const Duration(seconds: 30), (_) { if (mounted) setState(() {}); });
  }

  List<DateTime> _buildDates() {
    final daysInMonth = DateTime(_viewMonth.year, _viewMonth.month + 1, 0).day;
    return List.generate(daysInMonth, (i) => DateTime(_viewMonth.year, _viewMonth.month, i + 1));
  }

  @override
  void dispose() { _clockTimer?.cancel(); _timelineCtrl?.dispose(); _dateCtrl?.dispose(); super.dispose(); }

  static const _monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  static const _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  static const _days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  void _joinClass(ScheduledClass c) {
    HapticFeedback.mediumImpact();
    final name = UserSession.name.isNotEmpty ? UserSession.name : 'Student';
    Navigator.push(context, MaterialPageRoute(
      builder: (_) => MeetScreen(role: MeetRole.learner, userName: name, meetingId: c.meetingId),
    ));
  }

  void _showMonthPicker() {
    showModalBottomSheet(
      context: context, backgroundColor: HG.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => SafeArea(child: Column(mainAxisSize: MainAxisSize.min, children: [
        const SizedBox(height: 8),
        Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
        const SizedBox(height: 16),
        Text('Select Month', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 12),
        SizedBox(height: 200, child: Row(children: [
          Expanded(child: ListWheelScrollView.useDelegate(
            itemExtent: 40, perspective: 0.003, diameterRatio: 1.5,
            controller: FixedExtentScrollController(initialItem: _viewMonth.year - 2024),
            onSelectedItemChanged: (i) => setState(() { _viewMonth = DateTime(2024 + i, _viewMonth.month); _dates = _buildDates(); }),
            childDelegate: ListWheelChildBuilderDelegate(childCount: 5,
              builder: (_, i) => Center(child: Text('${2024 + i}', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.dark)))),
          )),
          Expanded(child: ListWheelScrollView.useDelegate(
            itemExtent: 40, perspective: 0.003, diameterRatio: 1.5,
            controller: FixedExtentScrollController(initialItem: _viewMonth.month - 1),
            onSelectedItemChanged: (i) => setState(() { _viewMonth = DateTime(_viewMonth.year, i + 1); _dates = _buildDates(); }),
            childDelegate: ListWheelChildBuilderDelegate(childCount: 12,
              builder: (_, i) => Center(child: Text(_months[i], style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.dark)))),
          )),
        ])),
        const SizedBox(height: 8),
        Padding(padding: EdgeInsets.symmetric(horizontal: 20), child: SizedBox(width: double.infinity, child: FilledButton(
          onPressed: () => Navigator.pop(ctx),
          style: FilledButton.styleFrom(backgroundColor: HG.dark, foregroundColor: HG.white, padding: EdgeInsets.symmetric(vertical: 12), shape: const StadiumBorder(),
            textStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, fontFamily: HG.font)),
          child: Text('Done'),
        ))),
        const SizedBox(height: 16),
      ])),
    );
  }

  void _showTzPicker() {
    showModalBottomSheet(
      context: context, backgroundColor: HG.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => SafeArea(child: Column(mainAxisSize: MainAxisSize.min, children: [
        const SizedBox(height: 8),
        Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
        const SizedBox(height: 16),
        Text('Timezone', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 8),
        ...List.generate(_timezones.length, (i) {
          final tz = _timezones[i];
          final sel = i == _tzIdx;
          return GestureDetector(
            onTap: () { setState(() => _tzIdx = i); Navigator.pop(ctx); },
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              color: sel ? HG.powderBlue.withValues(alpha: 0.3) : Colors.transparent,
              child: Row(children: [
                Text(tz.$1, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: sel ? HG.blue : HG.dark)),
                const SizedBox(width: 8),
                Expanded(child: Text(tz.$2, style: TextStyle(fontSize: 13, color: HG.textMuted))),
                if (sel) Icon(PhosphorIconsFill.checkCircle, size: 18, color: HG.blue),
              ]),
            ),
          );
        }),
        const SizedBox(height: 16),
      ])),
    );
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final tz = _timezones[_tzIdx];
    final tzOff = tz.$3;
    final classes = getClassesForDateInTz(_selected, tzOff);
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: Column(children: [
          // ── Header ──
          Padding(
            padding: EdgeInsets.fromLTRB(16, pt + 12, 12, 8),
            child: Row(children: [
              TextButton.icon(
                onPressed: _showMonthPicker,
                icon: Text('${_monthsShort[_viewMonth.month - 1]} ${_viewMonth.year}', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: HG.dark, fontFamily: HG.font)),
                label: Icon(PhosphorIconsRegular.caretDown, size: 14, color: HG.dark),
                style: TextButton.styleFrom(padding: EdgeInsets.symmetric(horizontal: 8), minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap),
              ),
              const Spacer(),
              ActionChip(
                avatar: Icon(PhosphorIconsRegular.globe, size: 13, color: HG.textMuted),
                label: Text(tz.$1),
                onPressed: _showTzPicker,
                labelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.dark, fontFamily: HG.font),
                backgroundColor: HG.grey50, side: BorderSide(color: HG.grey200),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                visualDensity: VisualDensity.compact, materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
              const SizedBox(width: 6),
              FilledButton.tonal(
                onPressed: () {
                  setState(() { _selected = DateTime(_today.year, _today.month, _today.day); _viewMonth = DateTime(_today.year, _today.month); _dates = _buildDates(); });
                  _timelineCtrl?.animateTo(((_today.hour * 60 + _today.minute) / 60 * 80 - 150).clamp(0.0, double.infinity), duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
                  _dateCtrl?.animateTo(((_today.day - 1) * 52.0 - 80).clamp(0.0, double.infinity), duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
                },
                style: FilledButton.styleFrom(backgroundColor: HG.powderBlue, foregroundColor: HG.blue,
                  padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6), minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  textStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, fontFamily: HG.font),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                child: Text('Today'),
              ),
            ]),
          ),
          // ── Horizontal calendar ──
          SizedBox(
            height: 74,
            child: ListView.builder(
              controller: _dateCtrl, scrollDirection: Axis.horizontal,
              physics: const BouncingScrollPhysics(), padding: EdgeInsets.symmetric(horizontal: 12),
              itemCount: _dates?.length ?? 0,
              itemBuilder: (_, i) {
                final d = _dates![i];
                final isSel = d.day == _selected.day && d.month == _selected.month && d.year == _selected.year;
                final isToday = d.day == _today.day && d.month == _today.month && d.year == _today.year;
                final has = getClassesForDateInTz(d, tzOff).isNotEmpty;
                return Padding(
                  padding: EdgeInsets.symmetric(horizontal: 2, vertical: 4),
                  child: Material(
                    color: isSel ? HG.dark : (isToday ? HG.powderBlue : Colors.transparent),
                    borderRadius: BorderRadius.circular(14), clipBehavior: Clip.antiAlias,
                    child: InkWell(
                      onTap: () => setState(() => _selected = d),
                      borderRadius: BorderRadius.circular(14),
                      child: SizedBox(width: 48, child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                        Text(_days[d.weekday - 1], style: TextStyle(fontSize: 10, fontWeight: FontWeight.w500, color: isSel ? HG.white.withValues(alpha: 0.6) : HG.textLight)),
                        const SizedBox(height: 4),
                        Text('${d.day}', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: isSel ? HG.white : (isToday ? HG.blue : HG.dark))),
                        const SizedBox(height: 4),
                        Container(width: 5, height: 5, decoration: BoxDecoration(color: has ? (isSel ? HG.white.withValues(alpha: 0.5) : HG.blue) : Colors.transparent, shape: BoxShape.circle)),
                      ])),
                    ),
                  ),
                );
              },
            ),
          ),
          Divider(height: 0.5, thickness: 0.5, color: HG.grey200),
          // ── Timeline ──
          Expanded(
            child: classes.isEmpty
                ? Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
                    Icon(PhosphorIconsRegular.calendarBlank, size: 44, color: HG.grey300),
                    const SizedBox(height: 12),
                    Text('No classes scheduled', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: HG.textMuted)),
                    const SizedBox(height: 4),
                    Text('Your upcoming sessions will appear here', style: TextStyle(fontSize: 12, color: HG.textLight)),
                  ]))
                : _buildTimeline(classes, tzOff),
          ),
        ]),
      ),
    );
  }

  Widget _buildTimeline(List<ScheduledClass> classes, Duration tzOff) {
    final classHours = classes.map((c) => c.convertedHour(tzOff)).toList();
    final minH = (classHours.reduce((a, b) => a < b ? a : b) - 1).clamp(0, 23);
    final maxH = (classHours.reduce((a, b) => a > b ? a : b) + 2).clamp(minH + 1, 24);
    const hourHeight = 72.0;

    return SingleChildScrollView(
      controller: _timelineCtrl, physics: const BouncingScrollPhysics(),
      padding: EdgeInsets.only(top: 8, bottom: 80),
      child: Stack(children: [
        Positioned(left: 55, top: 0, bottom: 0, child: Container(width: 1, color: HG.grey200)),
        Column(children: List.generate(maxH - minH, (i) {
          final hour = minH + i;
          final hourClasses = classes.where((c) => c.convertedHour(tzOff) == hour).toList();
          return _hourRow(hour, hourClasses, hourHeight, tzOff);
        })),
      ]),
    );
  }

  Widget _hourRow(int hour, List<ScheduledClass> hourClasses, double height, Duration tzOff) {
    final label = hour == 0 ? '12 AM' : hour < 12 ? '$hour AM' : hour == 12 ? '12 PM' : '${hour - 12} PM';
    final now = DateTime.now();
    final isToday = DateTime(_selected.year, _selected.month, _selected.day) == DateTime(now.year, now.month, now.day);
    final isCurrentHour = isToday && now.hour == hour;

    return SizedBox(
      height: hourClasses.isEmpty ? height : null,
      child: IntrinsicHeight(child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        SizedBox(width: 48, child: Padding(
          padding: EdgeInsets.only(right: 4),
          child: Text(label, style: TextStyle(fontSize: 11, fontWeight: isCurrentHour ? FontWeight.w700 : FontWeight.w400, color: isCurrentHour ? HG.blue : HG.textLight), textAlign: TextAlign.right),
        )),
        SizedBox(width: 16, child: Align(alignment: Alignment.topCenter,
          child: Container(width: 7, height: 7, margin: EdgeInsets.only(top: 2),
            decoration: BoxDecoration(
              color: hourClasses.isNotEmpty ? HG.blue : Colors.transparent, shape: BoxShape.circle,
              border: Border.all(color: hourClasses.isNotEmpty ? HG.blue : HG.grey300, width: 1.5))))),
        Expanded(child: Padding(
          padding: EdgeInsets.only(left: 8, right: 16, bottom: 4),
          child: hourClasses.isEmpty ? const SizedBox() : Column(children: hourClasses.map((c) => _classCard(c, tzOff)).toList()),
        )),
      ])),
    );
  }

  Widget _classCard(ScheduledClass c, Duration tzOff) {
    final past = c.isPast;
    final attended = c.wasAttended == true;
    final live = c.isLive && !past;

    return Padding(
      padding: EdgeInsets.only(bottom: 10),
      child: Card(
        elevation: live ? 2 : 0,
        shadowColor: live ? HG.blue.withValues(alpha: 0.2) : Colors.transparent,
        color: past ? HG.grey50 : HG.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20),
          side: BorderSide(color: live ? HG.blue.withValues(alpha: 0.3) : HG.grey200, width: live ? 1.5 : 1)),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: live && c.canJoin ? () => _joinClass(c) : null,
          child: Opacity(opacity: past ? 0.6 : 1.0, child: Padding(
            padding: EdgeInsets.all(16),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              // Time + badges
              Row(children: [
                Icon(PhosphorIconsRegular.clock, size: 14, color: HG.textMuted),
                const SizedBox(width: 6),
                Text('${c.timeStrIn(tzOff)} \u2013 ${c.endTimeStrIn(tzOff)}', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
                const SizedBox(width: 8),
                Chip(label: Text(c.durationStr), labelStyle: TextStyle(fontSize: 10, fontWeight: FontWeight.w500, color: HG.textMuted, fontFamily: HG.font),
                  backgroundColor: HG.grey50, side: BorderSide.none, padding: EdgeInsets.zero, labelPadding: EdgeInsets.symmetric(horizontal: 4),
                  visualDensity: VisualDensity.compact, materialTapTargetSize: MaterialTapTargetSize.shrinkWrap),
                const Spacer(),
                if (live) _liveBadge(),
                if (past) _statusBadge(attended),
              ]),
              const SizedBox(height: 12),
              // Tutor info (student POV — show tutor name)
              Row(children: [
                CircleAvatar(radius: 20, backgroundColor: live ? HG.powderBlue : HG.grey100,
                  child: Text(c.studentName[0], style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: live ? HG.blue : HG.grey500))),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(c.studentName, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
                  const SizedBox(height: 2),
                  Text(c.subject, style: TextStyle(fontSize: 13, color: HG.textMuted)),
                ])),
                Chip(label: Text(c.isPaid ? 'Paid' : 'Demo'),
                  labelStyle: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: c.isPaid ? HG.blue : HG.orange, fontFamily: HG.font),
                  backgroundColor: c.isPaid ? HG.blue.withValues(alpha: 0.08) : HG.orange.withValues(alpha: 0.08),
                  side: BorderSide.none, padding: EdgeInsets.zero, labelPadding: EdgeInsets.symmetric(horizontal: 6),
                  visualDensity: VisualDensity.compact, materialTapTargetSize: MaterialTapTargetSize.shrinkWrap),
              ]),
              // Actions
              if (!past) ...[
                const SizedBox(height: 14),
                Row(children: [
                  Expanded(child: FilledButton(
                    onPressed: c.canJoin ? () => _joinClass(c) : null,
                    style: FilledButton.styleFrom(backgroundColor: HG.blue, disabledBackgroundColor: HG.grey200,
                      foregroundColor: HG.white, disabledForegroundColor: HG.textLight,
                      padding: EdgeInsets.symmetric(vertical: 10), shape: const StadiumBorder(),
                      textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font)),
                    child: Text('Join'),
                  )),
                  const SizedBox(width: 8),
                  Expanded(child: OutlinedButton(
                    onPressed: c.canReschedule ? () {} : null,
                    style: OutlinedButton.styleFrom(foregroundColor: HG.dark, disabledForegroundColor: HG.textLight,
                      padding: EdgeInsets.symmetric(vertical: 10), shape: const StadiumBorder(),
                      side: BorderSide(color: HG.grey200),
                      textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, fontFamily: HG.font)),
                    child: Text('Reschedule'),
                  )),
                ]),
              ],
              // Past status
              if (past) ...[
                const SizedBox(height: 10),
                Row(children: [
                  const SizedBox(width: 52),
                  Icon(attended ? PhosphorIconsFill.checkCircle : PhosphorIconsFill.xCircle, size: 15, color: attended ? const Color(0xFF22C55E) : HG.red),
                  const SizedBox(width: 5),
                  Text(attended ? 'Completed' : 'Missed', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: attended ? const Color(0xFF22C55E) : HG.red)),
                ]),
              ],
            ]),
          )),
        ),
      ),
    );
  }

  static Widget _liveBadge() => Container(
    padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
    decoration: BoxDecoration(color: const Color(0xFF22C55E).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100)),
    child: Row(mainAxisSize: MainAxisSize.min, children: [
      Container(width: 4, height: 4, decoration: BoxDecoration(color: Color(0xFF22C55E), shape: BoxShape.circle)),
      const SizedBox(width: 3),
      Text('LIVE', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: Color(0xFF22C55E), letterSpacing: 0.3)),
    ]),
  );

  static Widget _statusBadge(bool attended) => Container(
    padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
    decoration: BoxDecoration(
      color: attended ? const Color(0xFF22C55E).withValues(alpha: 0.08) : HG.red.withValues(alpha: 0.08),
      borderRadius: BorderRadius.circular(100)),
    child: Text(attended ? 'Done' : 'Missed', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: attended ? const Color(0xFF22C55E) : HG.red)),
  );
}
