import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../theme.dart';
import '../../components/dashboard/tutor/schedule/scheduled_class.dart';

class _DaySlot {
  bool enabled;
  TimeOfDay from;
  TimeOfDay to;
  bool is24;
  _DaySlot({this.enabled = true, this.from = const TimeOfDay(hour: 9, minute: 0), this.to = const TimeOfDay(hour: 21, minute: 0), this.is24 = false});
}

class AvailabilityPage extends StatefulWidget {
  const AvailabilityPage({super.key});
  @override
  State<AvailabilityPage> createState() => _AvailabilityPageState();
}

class _AvailabilityPageState extends State<AvailabilityPage> {
  static const _dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  static const _dayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  late final List<_DaySlot> _days;
  bool _saved = false;

  @override
  void initState() {
    super.initState();
    _days = List.generate(7, (i) => _DaySlot(enabled: i < 6, from: const TimeOfDay(hour: 9, minute: 0), to: const TimeOfDay(hour: 21, minute: 0)));
  }

  String _fmt(TimeOfDay t) {
    final h = t.hourOfPeriod == 0 ? 12 : t.hourOfPeriod;
    return '$h:${t.minute.toString().padLeft(2, '0')} ${t.period == DayPeriod.am ? 'AM' : 'PM'}';
  }

  Future<TimeOfDay?> _pickTime(TimeOfDay initial) => showTimePicker(
    context: context, initialTime: initial,
    builder: (ctx, child) => Theme(
      data: Theme.of(ctx).copyWith(colorScheme: context.isDark
          ? ColorScheme.dark(primary: HG.blue, onPrimary: HG.fixedWhite, surface: HG.grey100)
          : ColorScheme.light(primary: HG.fixedBlue, onPrimary: HG.fixedWhite, surface: HG.fixedWhite)),
      child: child!),
  );

  void _save() {
    HapticFeedback.mediumImpact();
    setState(() => _saved = true);
    Future.delayed(const Duration(seconds: 2), () { if (mounted) setState(() => _saved = false); });
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final pb = MediaQuery.of(context).padding.bottom;
    final today = DateTime.now();
    final classes = getScheduledClasses(today);

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: Column(children: [
          // Header
          Container(
            padding: EdgeInsets.fromLTRB(12, pt + 8, 16, 12),
            decoration: BoxDecoration(color: HG.white, border: Border(bottom: BorderSide(color: HG.border, width: 0.5))),
            child: Row(children: [
              IconButton(onPressed: () => Navigator.pop(context),
                icon: Icon(PhosphorIconsBold.arrowLeft, size: 18),
                style: IconButton.styleFrom(backgroundColor: HG.grey50, fixedSize: const Size(36, 36))),
              const SizedBox(width: 10),
              Expanded(child: Text('Availability', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: HG.dark))),
              AnimatedSwitcher(
                duration: const Duration(milliseconds: 200),
                child: _saved
                    ? Container(key: ValueKey('saved'), padding: EdgeInsets.symmetric(horizontal: 12, vertical: 7),
                        decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100)),
                        child: Row(mainAxisSize: MainAxisSize.min, children: [
                          Icon(PhosphorIconsFill.checkCircle, size: 14, color: HG.green),
                          const SizedBox(width: 5),
                          Text('Saved', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.green)),
                        ]))
                    : GestureDetector(key: ValueKey('save'), onTap: _save,
                        child: Container(padding: EdgeInsets.symmetric(horizontal: 16, vertical: 7),
                          decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100)),
                          child: Text('Save', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.fixedWhite)))),
              ),
            ]),
          ),

          // Content
          Expanded(child: ListView(
            padding: EdgeInsets.fromLTRB(16, 16, 16, pb + 20),
            physics: const BouncingScrollPhysics(),
            children: [
              // Info card
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(color: HG.powderBlue, borderRadius: BorderRadius.circular(16)),
                child: Row(children: [
                  Icon(PhosphorIconsFill.info, size: 18, color: HG.blue),
                  const SizedBox(width: 12),
                  Expanded(child: Text('Set your weekly teaching hours. Students can only book sessions during these times.',
                    style: TextStyle(fontSize: 13, color: HG.blue, height: 1.4))),
                ]),
              ),
              const SizedBox(height: 20),

              // Weekly schedule
              Text('Weekly Schedule', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark)),
              const SizedBox(height: 12),
              ...List.generate(7, (i) => _dayCard(i)),

              const SizedBox(height: 24),

              // Today's occupied slots
              Text('Today\u2019s Schedule', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark)),
              const SizedBox(height: 4),
              Text('${_dayNames[today.weekday - 1]}, ${today.day} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][today.month - 1]}',
                style: TextStyle(fontSize: 12, color: HG.textMuted)),
              const SizedBox(height: 12),

              if (classes.isEmpty)
                Container(
                  padding: EdgeInsets.all(24),
                  decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(16)),
                  child: Column(children: [
                    Icon(PhosphorIconsRegular.calendarBlank, size: 32, color: HG.grey300),
                    const SizedBox(height: 8),
                    Text('No classes today', style: TextStyle(fontSize: 13, color: HG.textMuted)),
                  ]),
                )
              else
                // Timeline
                ...classes.map((c) => _occupiedTile(c)),

              const SizedBox(height: 16),

              // Visual timeline bar
              _timelineBar(classes),
            ],
          )),
        ]),
      ),
    );
  }

  Widget _dayCard(int i) {
    final d = _days[i];
    return Container(
      margin: EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: HG.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: d.enabled ? HG.border : HG.grey200),
      ),
      child: Column(children: [
        // Day header
        Padding(
          padding: EdgeInsets.fromLTRB(16, 12, 12, d.enabled ? 0 : 12),
          child: Row(children: [
            Text(_dayNames[i], style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: d.enabled ? HG.dark : HG.textLight)),
            const Spacer(),
            if (d.enabled && !d.is24) Text('${_fmt(d.from)} – ${_fmt(d.to)}', style: TextStyle(fontSize: 11, color: HG.textMuted)),
            if (d.enabled && d.is24) Text('24 hours', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.blue)),
            const SizedBox(width: 8),
            SizedBox(width: 42, height: 26, child: FittedBox(child: Switch.adaptive(
              value: d.enabled,
              activeColor: HG.blue,
              onChanged: (v) => setState(() => d.enabled = v),
            ))),
          ]),
        ),
        // Time pickers
        if (d.enabled) Padding(
          padding: EdgeInsets.fromLTRB(16, 8, 16, 12),
          child: Row(children: [
            // 24hr toggle
            GestureDetector(
              onTap: () => setState(() => d.is24 = !d.is24),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: d.is24 ? HG.blue.withValues(alpha: 0.08) : HG.grey50,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: d.is24 ? HG.blue.withValues(alpha: 0.2) : HG.grey200),
                ),
                child: Text('24h', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: d.is24 ? HG.blue : HG.textMuted)),
              ),
            ),
            const SizedBox(width: 10),
            if (!d.is24) ...[
              // From
              Expanded(child: _timePill('From', d.from, () async {
                final t = await _pickTime(d.from);
                if (t != null) setState(() => d.from = t);
              })),
              Padding(padding: EdgeInsets.symmetric(horizontal: 8), child: Icon(PhosphorIconsRegular.arrowRight, size: 14, color: HG.textLight)),
              // To
              Expanded(child: _timePill('To', d.to, () async {
                final t = await _pickTime(d.to);
                if (t != null) setState(() => d.to = t);
              })),
            ],
          ]),
        ),
      ]),
    );
  }

  Widget _timePill(String label, TimeOfDay time, VoidCallback onTap) => GestureDetector(
    onTap: onTap,
    child: Container(
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10), border: Border.all(color: HG.grey200)),
      child: Row(children: [
        Text(label, style: TextStyle(fontSize: 10, color: HG.textLight)),
        const Spacer(),
        Text(_fmt(time), style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
      ]),
    ),
  );

  Widget _occupiedTile(ScheduledClass c) => Container(
    margin: EdgeInsets.only(bottom: 6),
    padding: EdgeInsets.all(14),
    decoration: BoxDecoration(
      color: HG.white,
      borderRadius: BorderRadius.circular(14),
      border: Border.all(color: c.isLive ? HG.blue.withValues(alpha: 0.3) : HG.border),
    ),
    child: Row(children: [
      Container(width: 4, height: 36, decoration: BoxDecoration(
        color: c.isLive ? HG.blue : (c.isPast ? HG.grey300 : HG.orange),
        borderRadius: BorderRadius.circular(2))),
      const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(c.studentName, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark)),
        const SizedBox(height: 2),
        Text('${c.subject}  \u00b7  ${c.timeStr} – ${c.endTimeStr}', style: TextStyle(fontSize: 12, color: HG.textMuted)),
      ])),
      if (c.isLive) Container(
        padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
        decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100)),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          Container(width: 5, height: 5, decoration: BoxDecoration(color: HG.green, shape: BoxShape.circle)),
          const SizedBox(width: 4),
          Text('LIVE', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: HG.green)),
        ]),
      ),
      if (c.isPast) Icon(PhosphorIconsFill.checkCircle, size: 16, color: HG.grey300),
    ]),
  );

  Widget _timelineBar(List<ScheduledClass> classes) {
    final d = _days[DateTime.now().weekday - 1];
    if (!d.enabled) return const SizedBox();
    final startH = d.is24 ? 0 : d.from.hour;
    final endH = d.is24 ? 24 : d.to.hour;
    final totalH = (endH - startH).clamp(1, 24);

    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text('Timeline', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.textMuted)),
      const SizedBox(height: 8),
      Container(
        height: 56,
        decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(12), border: Border.all(color: HG.grey200)),
        clipBehavior: Clip.antiAlias,
        child: LayoutBuilder(builder: (_, box) {
          final w = box.maxWidth;
          return Stack(children: [
            // Hour markers
            ...List.generate(totalH + 1, (i) {
              final x = (i / totalH) * w;
              return Positioned(left: x, top: 0, bottom: 0, child: Container(width: 0.5, color: HG.grey200));
            }),
            // Hour labels
            ...List.generate(totalH + 1, (i) {
              if (i % 3 != 0 && i != totalH) return const SizedBox();
              final h = startH + i;
              final label = h == 0 ? '12a' : h < 12 ? '${h}a' : h == 12 ? '12p' : '${h - 12}p';
              return Positioned(left: (i / totalH) * w + 2, bottom: 2,
                child: Text(label, style: TextStyle(fontSize: 8, color: HG.textLight)));
            }),
            // Occupied blocks
            ...classes.map((c) {
              final cStart = c.startHour + c.startMin / 60.0;
              final cEnd = cStart + c.durationMin / 60.0;
              if (cEnd <= startH || cStart >= endH) return const SizedBox();
              final left = ((cStart - startH) / totalH * w).clamp(0.0, w);
              final right = ((endH - cEnd) / totalH * w).clamp(0.0, w);
              return Positioned(left: left, right: right, top: 4, bottom: 16,
                child: Container(
                  decoration: BoxDecoration(
                    color: c.isPast ? HG.grey200 : HG.blue.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: c.isPast ? HG.grey300 : HG.blue.withValues(alpha: 0.4)),
                  ),
                  child: Center(child: Text(c.studentName.split(' ')[0], style: TextStyle(fontSize: 8, fontWeight: FontWeight.w600, color: c.isPast ? HG.textLight : HG.blue), overflow: TextOverflow.ellipsis)),
                ));
            }),
            // Current time indicator
            Builder(builder: (_) {
              final now = DateTime.now();
              final nowH = now.hour + now.minute / 60.0;
              if (nowH < startH || nowH > endH) return const SizedBox();
              final x = ((nowH - startH) / totalH) * w;
              return Positioned(left: x - 1, top: 0, bottom: 0,
                child: Container(width: 2, color: HG.red));
            }),
          ]);
        }),
      ),
    ]);
  }
}
