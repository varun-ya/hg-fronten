const meetUrl = 'o3-HGNav-jcx5rk';

// IST offset — all class times are stored in IST
const istOffset = Duration(hours: 5, minutes: 30);

String _fmt12(int hour, int min) {
  final h = hour % 24;
  final h12 = h % 12 == 0 ? 12 : h % 12;
  final ap = h < 12 ? 'AM' : 'PM';
  return '$h12:${min.toString().padLeft(2, '0')} $ap';
}

class ScheduledClass {
  final String studentName, subject, meetingId;
  final int startHour, startMin, durationMin, ratePerHour;
  final bool isPaid;
  final DateTime date;
  final bool? wasAttended;

  const ScheduledClass({
    required this.studentName, required this.subject, required this.meetingId,
    required this.startHour, this.startMin = 0, this.durationMin = 60,
    this.isPaid = true, required this.date, this.wasAttended, this.ratePerHour = 500,
  });

  DateTime get startTime => DateTime(date.year, date.month, date.day, startHour, startMin);
  DateTime get endTime => startTime.add(Duration(minutes: durationMin));
  bool get isPast => DateTime.now().isAfter(endTime);
  bool get isLive {
    final now = DateTime.now();
    return now.isAfter(startTime.subtract(const Duration(minutes: 5))) && now.isBefore(endTime);
  }
  bool get canJoin {
    final now = DateTime.now();
    return now.isAfter(startTime.subtract(const Duration(minutes: 10))) && now.isBefore(endTime);
  }
  bool get canReschedule => !isPast && startTime.difference(DateTime.now()).inHours >= 3;

  /// Convert IST start time to target timezone
  DateTime converted(Duration tzOffset) => startTime.add(tzOffset - istOffset);

  int convertedHour(Duration tzOffset) => converted(tzOffset).hour;

  /// The date this class falls on in the given timezone
  DateTime convertedDate(Duration tzOffset) {
    final c = converted(tzOffset);
    return DateTime(c.year, c.month, c.day);
  }

  String timeStrIn(Duration tzOffset) {
    final c = converted(tzOffset);
    return _fmt12(c.hour, c.minute);
  }

  String endTimeStrIn(Duration tzOffset) {
    final c = converted(tzOffset).add(Duration(minutes: durationMin));
    return _fmt12(c.hour, c.minute);
  }

  // Default IST display
  String get timeStr => _fmt12(startHour, startMin);
  String get endTimeStr {
    final e = endTime;
    return _fmt12(e.hour, e.minute);
  }
  String get durationStr => durationMin >= 60 ? '${durationMin ~/ 60}hr${durationMin % 60 > 0 ? ' ${durationMin % 60}m' : ''}' : '${durationMin}m';
}

List<ScheduledClass> getScheduledClasses(DateTime date) {
  final today = DateTime.now();
  final d = DateTime(date.year, date.month, date.day);
  final t = DateTime(today.year, today.month, today.day);
  final diff = d.difference(t).inDays;

  if (diff == 0) {
    final nowH = today.hour;
    final nowM = today.minute;
    final joinH = (nowM + 10 >= 60 ? nowH + 1 : nowH) % 24;
    final joinM = (nowM + 10) % 60;
    return [
      if (nowH > 8) ScheduledClass(studentName: 'Kavya Singh', subject: 'JEE Prep', meetingId: meetUrl, startHour: 8, durationMin: 60, ratePerHour: 600, date: date, wasAttended: true),
      ScheduledClass(studentName: 'Meera Iyer', subject: 'English Literature', meetingId: meetUrl, startHour: joinH, startMin: joinM, durationMin: 60, ratePerHour: 400, date: date),
      ScheduledClass(studentName: 'Aarav Sharma', subject: 'Mathematics', meetingId: meetUrl, startHour: 10, durationMin: 60, ratePerHour: 500, date: date),
      ScheduledClass(studentName: 'Priya Patel', subject: 'Physics', meetingId: meetUrl, startHour: 11, startMin: 30, durationMin: 60, ratePerHour: 500, date: date),
      ScheduledClass(studentName: 'Rohan Gupta', subject: 'Chemistry', meetingId: meetUrl, startHour: 14, durationMin: 60, isPaid: false, ratePerHour: 0, date: date),
      ScheduledClass(studentName: 'Sneha Kapoor', subject: 'JEE Advanced', meetingId: meetUrl, startHour: 16, durationMin: 60, ratePerHour: 800, date: date),
    ]..sort((a, b) => a.startHour * 60 + a.startMin - (b.startHour * 60 + b.startMin));
  }
  if (diff == 1) {
    return [
      ScheduledClass(studentName: 'Amit Desai', subject: 'Calculus', meetingId: meetUrl, startHour: 9, durationMin: 60, ratePerHour: 500, date: date),
      ScheduledClass(studentName: 'Kavya Singh', subject: 'JEE Advanced', meetingId: meetUrl, startHour: 15, durationMin: 60, ratePerHour: 800, date: date),
    ];
  }
  if (diff == -1) {
    return [
      ScheduledClass(studentName: 'Aarav Sharma', subject: 'Mathematics', meetingId: meetUrl, startHour: 10, durationMin: 60, ratePerHour: 500, date: date, wasAttended: true),
      ScheduledClass(studentName: 'Priya Patel', subject: 'Physics', meetingId: meetUrl, startHour: 14, durationMin: 60, ratePerHour: 500, date: date, wasAttended: true),
      ScheduledClass(studentName: 'Amit Desai', subject: 'Calculus', meetingId: meetUrl, startHour: 16, durationMin: 60, isPaid: false, ratePerHour: 0, date: date, wasAttended: false),
    ];
  }
  return [];
}

/// Get classes that fall on [viewDate] in the given timezone.
/// Fetches IST classes from viewDate ±1 day and filters by converted date.
List<ScheduledClass> getClassesForDateInTz(DateTime viewDate, Duration tzOffset) {
  if (tzOffset == istOffset) return getScheduledClasses(viewDate);
  final target = DateTime(viewDate.year, viewDate.month, viewDate.day);
  final candidates = <ScheduledClass>[
    ...getScheduledClasses(viewDate.subtract(const Duration(days: 1))),
    ...getScheduledClasses(viewDate),
    ...getScheduledClasses(viewDate.add(const Duration(days: 1))),
  ];
  return candidates.where((c) {
    final cd = c.convertedDate(tzOffset);
    return cd.year == target.year && cd.month == target.month && cd.day == target.day;
  }).toList()
    ..sort((a, b) {
      final at = a.converted(tzOffset);
      final bt = b.converted(tzOffset);
      return (at.hour * 60 + at.minute) - (bt.hour * 60 + bt.minute);
    });
}
