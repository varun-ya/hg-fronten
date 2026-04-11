import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/tutor_data.dart';
import '../tutor/schedule/scheduled_class.dart';

class ProfileCalendarTab extends StatefulWidget {
  final TutorData data;
  const ProfileCalendarTab({super.key, required this.data});
  @override
  State<ProfileCalendarTab> createState() => _ProfileCalendarTabState();
}

class _ProfileCalendarTabState extends State<ProfileCalendarTab> {
  late DateTime _viewMonth;
  late DateTime _selected;
  final _today = DateTime.now();
  int _view = 0; // 0=schedule, 1=availability
  bool _calExpanded = false;

  static const _dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  static const _dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  static const _monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  static const _monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  @override
  void initState() {
    super.initState();
    _viewMonth = DateTime(_today.year, _today.month);
    _selected = DateTime(_today.year, _today.month, _today.day);
  }

  bool _isToday(DateTime d) => d.year == _today.year && d.month == _today.month && d.day == _today.day;
  bool _isSel(DateTime d) => d.year == _selected.year && d.month == _selected.month && d.day == _selected.day;

  List<DateTime> get _weekDays {
    final weekStart = _selected.subtract(Duration(days: _selected.weekday - 1));
    return List.generate(7, (i) => weekStart.add(Duration(days: i)));
  }

  List<DateTime> get _gridDays {
    final first = DateTime(_viewMonth.year, _viewMonth.month, 1);
    final start = first.subtract(Duration(days: first.weekday - 1));
    return List.generate(42, (i) => start.add(Duration(days: i)));
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.fromLTRB(16, 8, 16, 32),
      physics: const ClampingScrollPhysics(),
      children: [
        // Header
        Row(children: [
          GestureDetector(
            onTap: () => setState(() => _calExpanded = !_calExpanded),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Text('${_monthNames[_viewMonth.month - 1]} ${_viewMonth.year}',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
              const SizedBox(width: 4),
              AnimatedRotation(turns: _calExpanded ? 0.5 : 0, duration: const Duration(milliseconds: 200),
                child: Icon(PhosphorIconsRegular.caretDown, size: 16, color: HG.dark)),
            ]),
          ),
          const Spacer(),
          GestureDetector(
            onTap: () => setState(() { _viewMonth = DateTime(_today.year, _today.month); _selected = DateTime(_today.year, _today.month, _today.day); _calExpanded = false; }),
            child: Container(padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(color: HG.powderBlue, borderRadius: BorderRadius.circular(100)),
              child: Text('Today', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.blue)))),
        ]),
        const SizedBox(height: 10),

        // Collapsible calendar
        AnimatedCrossFade(
          firstChild: _weekStrip(),
          secondChild: Column(children: [
            // Month nav arrows
            Row(children: [
              GestureDetector(onTap: () => setState(() => _viewMonth = DateTime(_viewMonth.year, _viewMonth.month - 1)),
                child: Icon(PhosphorIconsBold.caretLeft, size: 16, color: HG.textMuted)),
              const Spacer(),
              GestureDetector(onTap: () => setState(() => _viewMonth = DateTime(_viewMonth.year, _viewMonth.month + 1)),
                child: Icon(PhosphorIconsBold.caretRight, size: 16, color: HG.textMuted)),
            ]),
            const SizedBox(height: 6),
            Row(children: _dayLabels.map((l) => Expanded(
              child: Center(child: Text(l, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.textLight))))).toList()),
            const SizedBox(height: 4),
            _monthGrid(),
          ]),
          crossFadeState: _calExpanded ? CrossFadeState.showSecond : CrossFadeState.showFirst,
          duration: const Duration(milliseconds: 250),
        ),
        const SizedBox(height: 14),

        // View toggle
        Container(
          padding: EdgeInsets.all(3),
          decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(12)),
          child: Row(children: [
            _tab('Schedule', 0),
            _tab('Availability', 1),
          ]),
        ),
        const SizedBox(height: 16),

        // Content
        if (_view == 0) _scheduleView()
        else _availabilityView(),
      ],
    );
  }

  Widget _tab(String label, int idx) => Expanded(child: GestureDetector(
    onTap: () => setState(() => _view = idx),
    child: Container(
      padding: EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(color: _view == idx ? HG.white : Colors.transparent, borderRadius: BorderRadius.circular(10),
        boxShadow: _view == idx ? [BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 4)] : null),
      child: Center(child: Text(label, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: _view == idx ? HG.dark : HG.textMuted))),
    ),
  ));

  // ── Month Grid ──
  // ── Week Strip (collapsed) ──
  Widget _weekStrip() {
    final days = _weekDays;
    return Row(children: days.map((d) {
      final today = _isToday(d);
      final sel = _isSel(d);
      final classes = getScheduledClasses(d);
      final count = classes.length.clamp(0, 3);
      return Expanded(child: GestureDetector(
        onTap: () { HapticFeedback.selectionClick(); setState(() => _selected = d); },
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Text(_dayLabels[d.weekday - 1], style: TextStyle(fontSize: 10, fontWeight: FontWeight.w500, color: sel ? HG.blue : HG.textLight)),
          const SizedBox(height: 4),
          AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            width: 38, height: 38,
            decoration: BoxDecoration(color: sel ? HG.blue : (today ? HG.powderBlue : Colors.transparent), shape: BoxShape.circle),
            child: Center(child: Text('${d.day}', style: TextStyle(fontSize: 15,
              fontWeight: sel || today ? FontWeight.w700 : FontWeight.w400,
              color: sel ? HG.fixedWhite : (today ? HG.blue : HG.dark)))),
          ),
          const SizedBox(height: 3),
          if (count > 0) Row(mainAxisAlignment: MainAxisAlignment.center, children: List.generate(count, (i) {
            final c = classes[i];
            final color = c.isPast ? HG.grey300 : (c.isLive ? HG.blue : HG.orange);
            return Container(width: 6, height: 3, margin: EdgeInsets.symmetric(horizontal: 0.5),
              decoration: BoxDecoration(color: sel ? HG.blue.withValues(alpha: 0.4) : color, borderRadius: BorderRadius.circular(1.5)));
          }))
          else const SizedBox(height: 3),
        ]),
      ));
    }).toList());
  }

  // ── Month Grid (expanded) ──
  Widget _monthGrid() {
    final days = _gridDays;
    final rows = <Widget>[];
    for (int r = 0; r < 6; r++) {
      final week = days.sublist(r * 7, r * 7 + 7);
      if (r >= 5 && !week.any((d) => d.month == _viewMonth.month)) continue;
      rows.add(Row(children: week.map((d) => _dayCell(d)).toList()));
    }
    return Column(children: rows);
  }

  Widget _dayCell(DateTime d) {
    final inMonth = d.month == _viewMonth.month;
    final today = _isToday(d);
    final sel = _isSel(d);
    final classes = getScheduledClasses(d);
    final avail = widget.data.availability[d.weekday - 1];
    final isOff = !avail.enabled;

    // Count classes for event bars
    final count = classes.length.clamp(0, 3);

    return Expanded(child: GestureDetector(
      onTap: () { HapticFeedback.selectionClick(); setState(() => _selected = d); },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        height: 52, margin: EdgeInsets.all(1),
        decoration: BoxDecoration(
          color: sel ? HG.blue : (today ? HG.powderBlue : (isOff && inMonth ? HG.grey50.withValues(alpha: 0.5) : Colors.transparent)),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text('${d.day}', style: TextStyle(fontSize: 13,
            fontWeight: sel || today ? FontWeight.w700 : FontWeight.w400,
            color: sel ? HG.fixedWhite : (inMonth ? (today ? HG.blue : HG.dark) : HG.grey300))),
          const SizedBox(height: 3),
          // Event bars (Google Calendar style)
          if (count > 0 && !sel) Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(count, (i) {
              final c = classes[i];
              final color = c.isPast ? HG.grey300 : (c.isLive ? HG.blue : HG.orange);
              return Container(width: 8, height: 3, margin: EdgeInsets.symmetric(horizontal: 0.5),
                decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(1.5)));
            }),
          ),
          if (count > 0 && sel) Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(count, (_) => Container(width: 8, height: 3, margin: EdgeInsets.symmetric(horizontal: 0.5),
              decoration: BoxDecoration(color: HG.fixedWhite.withValues(alpha: 0.5), borderRadius: BorderRadius.circular(1.5)))),
          ),
          if (count == 0) const SizedBox(height: 3),
        ]),
      ),
    ));
  }

  // ── Schedule View ──
  Widget _scheduleView() {
    final classes = getScheduledClasses(_selected);
    final dayName = _dayNames[_selected.weekday - 1];
    final avail = widget.data.availability[_selected.weekday - 1];

    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        Text('$dayName, ${_monthShort[_selected.month - 1]} ${_selected.day}', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark)),
        if (_isToday(_selected)) ...[const SizedBox(width: 8),
          Container(padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100)),
            child: Text('Today', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.green)))],
        const Spacer(),
        Container(padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
          decoration: BoxDecoration(color: avail.enabled ? HG.green.withValues(alpha: 0.08) : HG.grey100, borderRadius: BorderRadius.circular(100)),
          child: Text(avail.enabled ? avail.label : 'Unavailable',
            style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: avail.enabled ? HG.green : HG.textLight))),
      ]),
      Text('${classes.length} class${classes.length == 1 ? '' : 'es'}', style: TextStyle(fontSize: 12, color: HG.textMuted)),
      const SizedBox(height: 12),
      // Full day timeline
      _dayTimeline(classes, avail),
    ]);
  }

  Widget _dayTimeline(List<ScheduledClass> classes, DayAvailability avail) {
    const hourH = 60.0;
    final now = DateTime.now();
    final isToday = _isToday(_selected);
    final nowFrac = now.hour + now.minute / 60.0;
    final availStart = avail.enabled ? avail.fromHour + avail.fromMin / 60.0 : -1.0;
    final availEnd = avail.enabled ? avail.toHour + avail.toMin / 60.0 : -1.0;

    // Show range: 1hr before first class or avail start, to 1hr after last class or avail end
    int rangeStart = 7, rangeEnd = 22;
    if (avail.enabled) { rangeStart = (avail.fromHour - 1).clamp(0, 23); rangeEnd = (avail.toHour + 1).clamp(rangeStart + 1, 24); }
    if (classes.isNotEmpty) {
      final earliest = classes.map((c) => c.startHour).reduce((a, b) => a < b ? a : b);
      final latest = classes.map((c) => c.startHour + (c.durationMin / 60).ceil()).reduce((a, b) => a > b ? a : b);
      rangeStart = (earliest - 1).clamp(0, rangeStart).clamp(0, 23);
      rangeEnd = (latest + 1).clamp(rangeEnd, 24);
    }
    final totalH = rangeEnd - rangeStart;

    return SizedBox(
      height: totalH * hourH,
      child: Stack(children: [
        // Availability background
        if (avail.enabled) Positioned(
          top: ((availStart - rangeStart).clamp(0, totalH.toDouble())) * hourH,
          left: 52, right: 0,
          height: ((availEnd - availStart).clamp(0, totalH.toDouble())) * hourH,
          child: Container(color: HG.green.withValues(alpha: 0.03)),
        ),

        // Hour lines + labels
        ...List.generate(totalH, (i) {
          final h = rangeStart + i;
          final label = h == 0 ? '12 AM' : h < 12 ? '$h AM' : h == 12 ? '12 PM' : '${h - 12} PM';
          return Positioned(top: i * hourH, left: 0, right: 0,
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              SizedBox(width: 44, child: Text(label, style: TextStyle(fontSize: 10, color: HG.textLight), textAlign: TextAlign.right)),
              const SizedBox(width: 8),
              Expanded(child: Container(height: 0.5, color: HG.grey200, margin: EdgeInsets.only(top: 6))),
            ]),
          );
        }),

        // Event blocks
        ...classes.map((c) {
          final top = (c.startHour + c.startMin / 60.0 - rangeStart) * hourH;
          final height = (c.durationMin / 60.0) * hourH;
          final live = c.isLive && !c.isPast;
          final past = c.isPast;
          final color = live ? HG.blue : (past ? HG.grey300 : HG.orange);
          final bg = live ? HG.blue.withValues(alpha: 0.08) : (past ? HG.grey50 : HG.orange.withValues(alpha: 0.06));

          return Positioned(top: top, left: 56, right: 8, height: height.clamp(44, double.infinity),
            child: Container(
              decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(10),
                border: Border(left: BorderSide(color: color, width: 3.5))),
              padding: EdgeInsets.fromLTRB(10, 6, 8, 6),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
                Row(children: [
                  Expanded(child: Text(c.studentName, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: past ? HG.textLight : HG.dark), overflow: TextOverflow.ellipsis)),
                  if (live) Container(padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.12), borderRadius: BorderRadius.circular(100)),
                    child: Row(mainAxisSize: MainAxisSize.min, children: [
                      Container(width: 4, height: 4, decoration: BoxDecoration(color: HG.green, shape: BoxShape.circle)),
                      const SizedBox(width: 3),
                      Text('LIVE', style: TextStyle(fontSize: 8, fontWeight: FontWeight.w800, color: HG.green)),
                    ])),
                  if (past && c.wasAttended == true) Icon(PhosphorIconsFill.checkCircle, size: 13, color: HG.green),
                  if (past && c.wasAttended == false) Icon(PhosphorIconsFill.xCircle, size: 13, color: HG.red),
                ]),
                if (height > 50) ...[const SizedBox(height: 2),
                  Text('${c.subject}  \u00b7  ${c.timeStr} \u2013 ${c.endTimeStr}', style: TextStyle(fontSize: 11, color: past ? HG.textLight : HG.textMuted), overflow: TextOverflow.ellipsis)],
                if (height > 70) ...[const SizedBox(height: 2),
                  Container(padding: EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                    decoration: BoxDecoration(color: c.isPaid ? HG.blue.withValues(alpha: 0.08) : HG.orange.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(4)),
                    child: Text(c.isPaid ? 'Paid' : 'Demo', style: TextStyle(fontSize: 8, fontWeight: FontWeight.w700, color: c.isPaid ? HG.blue : HG.orange)))],
              ]),
            ),
          );
        }),

        // Current time line
        if (isToday && nowFrac >= rangeStart && nowFrac <= rangeEnd) Positioned(
          top: (nowFrac - rangeStart) * hourH - 1, left: 36, right: 0,
          child: Row(children: [
            Container(width: 10, height: 10, decoration: BoxDecoration(color: HG.red, shape: BoxShape.circle)),
            Expanded(child: Container(height: 1.5, color: HG.red)),
          ]),
        ),

        // Empty overlay
        if (classes.isEmpty) Positioned.fill(child: Center(
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            Icon(PhosphorIconsRegular.sunHorizon, size: 32, color: HG.grey300),
            const SizedBox(height: 8),
            Text('No classes', style: TextStyle(fontSize: 14, color: HG.textMuted)),
          ]),
        )),
      ]),
    );
  }

  Widget _classCard(ScheduledClass c) {
    final live = c.isLive && !c.isPast;
    final past = c.isPast;
    final color = live ? HG.blue : (past ? HG.grey300 : HG.orange);
    return Container(
      margin: EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: live ? HG.blue.withValues(alpha: 0.3) : HG.border)),
      child: IntrinsicHeight(child: Row(children: [
        Container(width: 4, decoration: BoxDecoration(color: color, borderRadius: BorderRadius.only(topLeft: Radius.circular(14), bottomLeft: Radius.circular(14)))),
        Expanded(child: Padding(padding: EdgeInsets.all(14), child: Row(children: [
          SizedBox(width: 56, child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(c.timeStr, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: past ? HG.textLight : HG.dark)),
            Text(c.endTimeStr, style: TextStyle(fontSize: 11, color: HG.textLight)),
          ])),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(c.studentName, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: past ? HG.textLight : HG.dark)),
            const SizedBox(height: 2),
            Text(c.subject, style: TextStyle(fontSize: 12, color: HG.textMuted)),
          ])),
          if (live) Container(padding: EdgeInsets.symmetric(horizontal: 6, vertical: 3),
            decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100)),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Container(width: 4, height: 4, decoration: BoxDecoration(color: HG.green, shape: BoxShape.circle)),
              const SizedBox(width: 3),
              Text('LIVE', style: TextStyle(fontSize: 8, fontWeight: FontWeight.w800, color: HG.green)),
            ])),
          if (past && c.wasAttended == true) Icon(PhosphorIconsFill.checkCircle, size: 16, color: HG.green),
          if (past && c.wasAttended == false) Icon(PhosphorIconsFill.xCircle, size: 16, color: HG.red),
        ]))),
      ])),
    );
  }

  Widget _timelineBar(List<ScheduledClass> classes, DayAvailability avail) {
    final startH = avail.enabled ? avail.fromHour : 7;
    final endH = avail.enabled ? (avail.toHour == 0 ? 24 : avail.toHour) : 22;
    final totalH = (endH - startH).clamp(1, 24);

    return Container(
      height: 48, decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10), border: Border.all(color: HG.grey200)),
      clipBehavior: Clip.antiAlias,
      child: LayoutBuilder(builder: (_, box) {
        final w = box.maxWidth;
        return Stack(children: [
          ...List.generate(totalH + 1, (i) => Positioned(left: (i / totalH) * w, top: 0, bottom: 0, child: Container(width: 0.5, color: HG.grey200))),
          ...List.generate(totalH + 1, (i) {
            if (i % 3 != 0) return const SizedBox();
            final h = startH + i;
            final label = h < 12 ? '${h}a' : h == 12 ? '12p' : '${h - 12}p';
            return Positioned(left: (i / totalH) * w + 2, bottom: 2, child: Text(label, style: TextStyle(fontSize: 7, color: HG.textLight)));
          }),
          ...classes.map((c) {
            final s = c.startHour + c.startMin / 60.0;
            final e = s + c.durationMin / 60.0;
            if (e <= startH || s >= endH) return const SizedBox();
            final left = ((s - startH) / totalH * w).clamp(0.0, w);
            final right = ((endH - e) / totalH * w).clamp(0.0, w);
            return Positioned(left: left, right: right, top: 4, bottom: 14,
              child: Container(decoration: BoxDecoration(color: c.isPast ? HG.grey200 : HG.blue.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(4),
                border: Border.all(color: c.isPast ? HG.grey300 : HG.blue.withValues(alpha: 0.4), width: 0.5)),
                child: Center(child: Text(c.studentName.split(' ')[0], style: TextStyle(fontSize: 7, fontWeight: FontWeight.w600, color: c.isPast ? HG.textLight : HG.blue), overflow: TextOverflow.ellipsis))));
          }),
          if (_isToday(_selected)) Builder(builder: (_) {
            final now = DateTime.now();
            final h = now.hour + now.minute / 60.0;
            if (h < startH || h > endH) return const SizedBox();
            return Positioned(left: ((h - startH) / totalH) * w - 1, top: 0, bottom: 0,
              child: Container(width: 2, decoration: BoxDecoration(color: HG.red, borderRadius: BorderRadius.circular(1))));
          }),
        ]);
      }),
    );
  }

  // ── Availability View ──
  Widget _availabilityView() {
    final avail = widget.data.availability;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Container(padding: EdgeInsets.all(14),
        decoration: BoxDecoration(color: HG.powderBlue, borderRadius: BorderRadius.circular(14)),
        child: Row(children: [
          Icon(PhosphorIconsFill.info, size: 16, color: HG.blue),
          const SizedBox(width: 10),
          Expanded(child: Text('Students can only book during your available hours.', style: TextStyle(fontSize: 12, color: HG.blue, height: 1.4))),
        ])),
      const SizedBox(height: 14),
      ...List.generate(7, (i) => _availCard(i, avail[i])),
    ]);
  }

  Widget _availCard(int i, DayAvailability d) {
    return Container(
      margin: EdgeInsets.only(bottom: 8),
      padding: EdgeInsets.fromLTRB(16, 12, 12, 12),
      decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: d.enabled ? HG.border : HG.grey200)),
      child: Column(children: [
        Row(children: [
          Text(_dayNames[i], style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: d.enabled ? HG.dark : HG.textLight)),
          const Spacer(),
          if (d.enabled) Text(d.label, style: TextStyle(fontSize: 11, color: HG.textMuted)),
          const SizedBox(width: 8),
          SizedBox(width: 42, height: 26, child: FittedBox(child: Switch.adaptive(
            value: d.enabled, activeColor: HG.blue,
            onChanged: (v) { setState(() => d.enabled = v); widget.data.update(); },
          ))),
        ]),
        if (d.enabled) ...[
          const SizedBox(height: 8),
          Row(children: [
            Expanded(child: _timePicker('From', d.from, (t) { setState(() => d.from = t); widget.data.update(); })),
            Padding(padding: EdgeInsets.symmetric(horizontal: 8), child: Icon(PhosphorIconsRegular.arrowRight, size: 14, color: HG.textLight)),
            Expanded(child: _timePicker('To', d.to, (t) { setState(() => d.to = t); widget.data.update(); })),
          ]),
        ],
      ]),
    );
  }

  Widget _timePicker(String label, TimeOfDay time, ValueChanged<TimeOfDay> onPick) => GestureDetector(
    onTap: () async {
      final t = await showTimePicker(context: context, initialTime: time,
        builder: (ctx, child) => Theme(
          data: Theme.of(ctx).copyWith(colorScheme: context.isDark
              ? ColorScheme.dark(primary: HG.blue, onPrimary: HG.fixedWhite, surface: HG.grey100)
              : ColorScheme.light(primary: HG.fixedBlue, onPrimary: HG.fixedWhite, surface: HG.fixedWhite)),
          child: child!));
      if (t != null) onPick(t);
    },
    child: Container(
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10), border: Border.all(color: HG.grey200)),
      child: Row(children: [
        Text(label, style: TextStyle(fontSize: 10, color: HG.textLight)),
        const Spacer(),
        Text(DayAvailability.fmtTime(time), style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
      ]),
    ),
  );
}
