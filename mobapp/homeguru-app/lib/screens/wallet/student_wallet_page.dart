import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../theme.dart';

enum _TxType { all, paid, refunded }

class _Tx {
  final String tutor, subject, amount, time, date;
  final bool isPaid, isRefund;
  const _Tx({required this.tutor, required this.subject, required this.amount, required this.time, required this.date, this.isPaid = true, this.isRefund = false});
}

const _allTx = [
  _Tx(tutor: 'Ayush Soni', subject: 'Mathematics', amount: '\u20b9500', time: '2:30 PM', date: 'Today'),
  _Tx(tutor: 'Priya Menon', subject: 'Physics', amount: '\u20b9500', time: '11:00 AM', date: 'Today'),
  _Tx(tutor: 'Ayush Soni', subject: 'JEE Advanced', amount: '\u20b9700', time: '4:00 PM', date: 'Yesterday'),
  _Tx(tutor: 'Ankit Kapoor', subject: 'English', amount: '\u20b9400', time: '7:00 PM', date: 'Yesterday'),
  _Tx(tutor: 'Ayush Soni', subject: 'Mathematics (Demo)', amount: '\u20b90', time: '10:00 AM', date: 'Yesterday', isPaid: false),
  _Tx(tutor: 'Priya Menon', subject: 'Physics', amount: '\u20b9500', time: '5:30 PM', date: 'Jun 26'),
  _Tx(tutor: 'Ayush Soni', subject: 'Mathematics', amount: '\u20b9500', time: '4:00 PM', date: 'Jun 26'),
  _Tx(tutor: 'Ankit Kapoor', subject: 'English', amount: '\u20b9400', time: '7:00 PM', date: 'Jun 26'),
  _Tx(tutor: 'Priya Menon', subject: 'Physics — Cancelled', amount: '+\u20b9500', time: '2:00 PM', date: 'Jun 22', isPaid: false, isRefund: true),
  _Tx(tutor: 'Ayush Soni', subject: 'JEE Prep', amount: '\u20b9700', time: '4:00 PM', date: 'Jun 19'),
  _Tx(tutor: 'Priya Menon', subject: 'Physics', amount: '\u20b9500', time: '5:30 PM', date: 'Jun 19'),
  _Tx(tutor: 'Ankit Kapoor', subject: 'English', amount: '\u20b9400', time: '7:00 PM', date: 'Jun 18'),
];

const _tutors = [
  ('Ayush Soni', 'Maths · Physics · JEE', 'A'),
  ('Priya Menon', 'Physics', 'P'),
  ('Ankit Kapoor', 'English', 'K'),
];

class StudentWalletPage extends StatefulWidget {
  const StudentWalletPage({super.key});
  @override
  State<StudentWalletPage> createState() => _StudentWalletPageState();
}

class _StudentWalletPageState extends State<StudentWalletPage> {
  _TxType _filter = _TxType.all;
  String? _tutorFilter;
  DateTimeRange? _dateRange;

  List<_Tx> get _filtered {
    var list = _allTx.toList();
    if (_filter == _TxType.paid) list = list.where((t) => t.isPaid).toList();
    if (_filter == _TxType.refunded) list = list.where((t) => t.isRefund).toList();
    if (_tutorFilter != null) list = list.where((t) => t.tutor == _tutorFilter).toList();
    return list;
  }

  bool get _hasFilters => _filter != _TxType.all || _tutorFilter != null || _dateRange != null;
  void _clearFilters() => setState(() { _filter = _TxType.all; _tutorFilter = null; _dateRange = null; });

  void _showDatePicker() async {
    final range = await showDateRangePicker(
      context: context, firstDate: DateTime(2024), lastDate: DateTime.now(), initialDateRange: _dateRange,
      builder: (ctx, child) => Theme(
        data: Theme.of(ctx).copyWith(colorScheme: context.isDark
          ? ColorScheme.dark(primary: HG.blue, onPrimary: HG.fixedWhite, surface: HG.grey100)
          : ColorScheme.light(primary: HG.fixedBlue, onPrimary: HG.fixedWhite, surface: HG.fixedWhite)),
        child: child!),
    );
    if (range != null && mounted) setState(() => _dateRange = range);
  }

  void _showTutorPicker() {
    showModalBottomSheet(
      context: context, backgroundColor: HG.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => SafeArea(child: SingleChildScrollView(child: Column(mainAxisSize: MainAxisSize.min, children: [
        const SizedBox(height: 8),
        Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
        const SizedBox(height: 16),
        Text('Filter by tutor', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 8),
        ListTile(
          leading: CircleAvatar(radius: 16, backgroundColor: HG.grey100, child: Icon(PhosphorIconsRegular.users, size: 14, color: HG.grey500)),
          title: Text('All tutors', style: TextStyle(fontSize: 14, color: HG.dark)),
          trailing: _tutorFilter == null ? Icon(PhosphorIconsFill.checkCircle, size: 18, color: HG.blue) : null,
          onTap: () { setState(() => _tutorFilter = null); Navigator.pop(ctx); },
        ),
        Divider(height: 1, indent: 56),
        ..._tutors.map((t) => ListTile(
          leading: CircleAvatar(radius: 16, backgroundColor: HG.powderBlue, child: Text(t.$3, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.blue))),
          title: Text(t.$1, style: TextStyle(fontSize: 14, color: HG.dark)),
          subtitle: Text(t.$2, style: TextStyle(fontSize: 11, color: HG.textMuted)),
          trailing: _tutorFilter == t.$1 ? Icon(PhosphorIconsFill.checkCircle, size: 18, color: HG.blue) : null,
          onTap: () { setState(() => _tutorFilter = t.$1); Navigator.pop(ctx); },
        )),
        const SizedBox(height: 16),
      ]))),
    );
  }

  void _showTutorProfile(String name) {
    final tutor = _tutors.where((t) => t.$1 == name).firstOrNull;
    if (tutor == null) return;
    final tutorTx = _allTx.where((t) => t.tutor == name).toList();
    final totalPaid = tutorTx.where((t) => t.isPaid).length;
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context, backgroundColor: HG.surface, isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (_) => DraggableScrollableSheet(
        initialChildSize: 0.65, minChildSize: 0.4, maxChildSize: 0.85, expand: false,
        builder: (ctx, scroll) => _TutorProfileSheet(tutor: tutor, transactions: tutorTx, totalPaid: totalPaid, scrollCtrl: scroll),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final txList = _filtered;
    final grouped = <String, List<_Tx>>{};
    for (final t in txList) { grouped.putIfAbsent(t.date, () => []).add(t); }

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: context.hgSystemUi,
      child: Scaffold(
        backgroundColor: HG.surface,
        body: ListView(
          padding: EdgeInsets.zero,
          physics: const BouncingScrollPhysics(),
          children: [
            // Header
            Padding(
              padding: EdgeInsets.fromLTRB(16, pt + 10, 16, 0),
              child: Row(children: [
                IconButton(onPressed: () => Navigator.pop(context), icon: Icon(PhosphorIconsBold.arrowLeft, size: 20), style: IconButton.styleFrom(backgroundColor: HG.grey50)),
                const SizedBox(width: 12),
                Text('Wallet', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: HG.dark)),
              ]),
            ),
            const SizedBox(height: 20),

            // Balance card
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Card(
                elevation: 0, color: HG.powderOrange,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                child: Padding(
                  padding: EdgeInsets.all(24),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Row(children: [
                      Icon(PhosphorIconsFill.wallet, size: 18, color: HG.orange),
                      const SizedBox(width: 8),
                      Text('Total Spent', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.orange)),
                      const Spacer(),
                      Container(
                        padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(color: HG.purple.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(100),
                          border: Border.all(color: HG.purple.withValues(alpha: 0.2))),
                        child: Row(mainAxisSize: MainAxisSize.min, children: [
                          Icon(PhosphorIconsFill.gift, size: 13, color: HG.purple),
                          const SizedBox(width: 5),
                          Text('120 pts', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.purple)),
                        ]),
                      ),
                    ]),
                    const SizedBox(height: 12),
                    Text('\u20b95,200', style: TextStyle(fontSize: 38, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -1)),
                    const SizedBox(height: 4),
                    Text('this month · 12 sessions', style: TextStyle(fontSize: 12, color: HG.textMuted)),
                    const SizedBox(height: 20),
                    Row(children: [
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text('Payment method', style: TextStyle(fontSize: 11, color: HG.textMuted)),
                        const SizedBox(height: 2),
                        Text('UPI · ravi@okaxis', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
                      ])),
                      OutlinedButton.icon(
                        onPressed: () {},
                        icon: Icon(PhosphorIconsRegular.creditCard, size: 14),
                        label: Text('Manage'),
                        style: OutlinedButton.styleFrom(foregroundColor: HG.dark, padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8), shape: const StadiumBorder(),
                          side: BorderSide(color: HG.orange.withValues(alpha: 0.3)), textStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, fontFamily: HG.font)),
                      ),
                    ]),
                  ]),
                ),
              ),
            ),
            const SizedBox(height: 14),

            // Quick stats
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Row(children: [
                _statCard('\u20b91,600', 'This week', PhosphorIconsFill.calendarCheck, HG.powderBlue, HG.blue),
                const SizedBox(width: 10),
                _statCard('3', 'Tutors', PhosphorIconsFill.chalkboardTeacher, HG.powderGreen, HG.green),
              ]),
            ),
            const SizedBox(height: 14),

            // My tutors — horizontal scroll
            Padding(
              padding: EdgeInsets.fromLTRB(20, 6, 20, 0),
              child: Text('My Tutors', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
            ),
            const SizedBox(height: 10),
            SizedBox(
              height: 88,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                padding: EdgeInsets.symmetric(horizontal: 16),
                itemCount: _tutors.length,
                separatorBuilder: (_, __) => const SizedBox(width: 10),
                itemBuilder: (_, i) {
                  final t = _tutors[i];
                  final tutorTx = _allTx.where((tx) => tx.tutor == t.$1 && tx.isPaid).toList();
                  final total = tutorTx.length;
                  return GestureDetector(
                    onTap: () => _showTutorProfile(t.$1),
                    child: Container(
                      width: 160, padding: EdgeInsets.all(12),
                      decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: HG.grey200)),
                      child: Row(children: [
                        CircleAvatar(radius: 22, backgroundColor: HG.powderBlue,
                          child: Text(t.$3, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.blue))),
                        const SizedBox(width: 10),
                        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.center, children: [
                          Text(t.$1.split(' ')[0], style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark), overflow: TextOverflow.ellipsis),
                          Text('$total sessions', style: TextStyle(fontSize: 10, color: HG.textMuted)),
                          const SizedBox(height: 2),
                          Icon(PhosphorIconsRegular.caretRight, size: 12, color: HG.textLight),
                        ])),
                      ]),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 20),

            // Transactions header
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 20),
              child: Text('Transactions', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
            ),
            const SizedBox(height: 10),

            // Filter chips
            SizedBox(
              height: 38,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: EdgeInsets.symmetric(horizontal: 16),
                physics: const BouncingScrollPhysics(),
                children: [
                  ..._TxType.values.map((t) => Padding(
                    padding: EdgeInsets.only(right: 6),
                    child: ChoiceChip(
                      label: Text(t == _TxType.all ? 'All' : t == _TxType.paid ? 'Paid' : 'Refunded'),
                      selected: _filter == t,
                      onSelected: (_) => setState(() => _filter = t),
                      selectedColor: HG.powderBlue,
                      backgroundColor: HG.grey50,
                      side: BorderSide(color: _filter == t ? HG.blue.withValues(alpha: 0.3) : HG.grey200),
                      labelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: _filter == t ? HG.blue : HG.dark, fontFamily: HG.font),
                      shape: const StadiumBorder(),
                      visualDensity: VisualDensity.compact,
                      showCheckmark: false,
                    ),
                  )),
                  Padding(
                    padding: EdgeInsets.only(right: 6),
                    child: ActionChip(
                      avatar: Icon(PhosphorIconsRegular.chalkboardTeacher, size: 14, color: _tutorFilter != null ? HG.blue : HG.textMuted),
                      label: Text(_tutorFilter?.split(' ')[0] ?? 'Tutor'),
                      onPressed: _showTutorPicker,
                      backgroundColor: _tutorFilter != null ? HG.powderBlue : HG.grey50,
                      side: BorderSide(color: _tutorFilter != null ? HG.blue.withValues(alpha: 0.3) : HG.grey200),
                      labelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: _tutorFilter != null ? HG.blue : HG.dark, fontFamily: HG.font),
                      shape: const StadiumBorder(),
                      visualDensity: VisualDensity.compact,
                    ),
                  ),
                  ActionChip(
                    avatar: Icon(PhosphorIconsRegular.calendarBlank, size: 14, color: _dateRange != null ? HG.blue : HG.textMuted),
                    label: Text(_dateRange != null ? '${_dateRange!.start.day}/${_dateRange!.start.month} – ${_dateRange!.end.day}/${_dateRange!.end.month}' : 'Date range'),
                    onPressed: _showDatePicker,
                    backgroundColor: _dateRange != null ? HG.powderBlue : HG.grey50,
                    side: BorderSide(color: _dateRange != null ? HG.blue.withValues(alpha: 0.3) : HG.grey200),
                    labelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: _dateRange != null ? HG.blue : HG.dark, fontFamily: HG.font),
                    shape: const StadiumBorder(),
                    visualDensity: VisualDensity.compact,
                  ),
                ],
              ),
            ),

            if (_hasFilters) Padding(
              padding: EdgeInsets.only(left: 16, top: 6),
              child: Align(alignment: Alignment.centerLeft, child: TextButton.icon(
                onPressed: _clearFilters,
                icon: Icon(PhosphorIconsRegular.x, size: 14),
                label: Text('Clear filters'),
                style: TextButton.styleFrom(foregroundColor: HG.textMuted, textStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, fontFamily: HG.font),
                  padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap),
              )),
            ),
            const SizedBox(height: 8),

            // Transaction list
            if (txList.isEmpty)
              Padding(padding: EdgeInsets.only(top: 40), child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
                Icon(PhosphorIconsRegular.receipt, size: 40, color: HG.grey300),
                const SizedBox(height: 10),
                Text('No transactions found', style: TextStyle(fontSize: 14, color: HG.textMuted)),
              ])))
            else
              ...grouped.entries.map((e) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Padding(padding: EdgeInsets.fromLTRB(20, 12, 20, 6), child: Text(e.key, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.textMuted))),
                ...e.value.map((t) => _txTile(t)),
              ])),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _txTile(_Tx t) => GestureDetector(
    onTap: () => _showTutorProfile(t.tutor),
    child: Padding(
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: Card(
        elevation: 0, color: HG.surface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14), side: BorderSide(color: HG.grey200)),
        margin: EdgeInsets.only(bottom: 6),
        child: ListTile(
          dense: true, contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 4),
          leading: CircleAvatar(radius: 20,
            backgroundColor: t.isRefund ? HG.powderGreen : (t.isPaid ? HG.powderBlue : HG.grey100),
            child: Text(t.tutor[0], style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: t.isRefund ? HG.green : (t.isPaid ? HG.blue : HG.grey500)))),
          title: Text(t.tutor, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark)),
          subtitle: Text(t.subject, style: TextStyle(fontSize: 12, color: HG.textMuted)),
          trailing: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.end, children: [
            Text(t.amount, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: t.isRefund ? HG.green : HG.dark)),
            Text(t.time, style: TextStyle(fontSize: 10, color: HG.textLight)),
          ]),
        ),
      ),
    ),
  );

  static Widget _statCard(String amount, String label, IconData icon, Color bg, Color fg) => Expanded(
    child: Card(elevation: 0, color: bg, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
      child: Padding(padding: EdgeInsets.all(16), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Icon(icon, size: 16, color: fg),
        const SizedBox(height: 10),
        Text(amount, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: HG.dark)),
        const SizedBox(height: 2),
        Text(label, style: TextStyle(fontSize: 11, color: HG.textMuted)),
      ]))),
  );
}

// ── Tutor Profile Sheet ──
class _TutorProfileSheet extends StatelessWidget {
  final (String, String, String) tutor;
  final List<_Tx> transactions;
  final int totalPaid;
  final ScrollController scrollCtrl;
  const _TutorProfileSheet({required this.tutor, required this.transactions, required this.totalPaid, required this.scrollCtrl});

  @override
  Widget build(BuildContext context) {
    return ListView(
      controller: scrollCtrl,
      padding: EdgeInsets.fromLTRB(20, 0, 20, 20),
      children: [
        const SizedBox(height: 8),
        Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2)))),
        const SizedBox(height: 20),
        // Tutor header
        Row(children: [
          CircleAvatar(radius: 28, backgroundColor: HG.powderBlue,
            child: Text(tutor.$3, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: HG.blue))),
          const SizedBox(width: 14),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Text(tutor.$1, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: HG.dark)),
              const SizedBox(width: 4),
              Icon(PhosphorIconsFill.sealCheck, size: 15, color: HG.blue),
            ]),
            const SizedBox(height: 2),
            Text(tutor.$2, style: TextStyle(fontSize: 12, color: HG.textMuted)),
          ])),
        ]),
        const SizedBox(height: 16),
        // Stats
        Card(
          elevation: 0, color: HG.grey50,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(padding: EdgeInsets.symmetric(vertical: 14, horizontal: 12), child: Row(children: [
            _stat('$totalPaid', 'Sessions'),
            _stat('\u20b9${_totalAmount()}', 'Total paid'),
            _stat('${transactions.where((t) => t.isRefund).length}', 'Refunds'),
          ])),
        ),
        const SizedBox(height: 16),
        // Actions
        Row(children: [
          Expanded(child: OutlinedButton.icon(
            onPressed: () {},
            icon: Icon(PhosphorIconsRegular.chatCircle, size: 14),
            label: Text('Message'),
            style: OutlinedButton.styleFrom(foregroundColor: HG.dark, padding: EdgeInsets.symmetric(vertical: 10), shape: const StadiumBorder(), side: BorderSide(color: HG.grey200),
              textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, fontFamily: HG.font)),
          )),
          const SizedBox(width: 8),
          Expanded(child: FilledButton.icon(
            onPressed: () {},
            icon: Icon(PhosphorIconsBold.videoCamera, size: 14),
            label: Text('Book Class'),
            style: FilledButton.styleFrom(backgroundColor: HG.blue, foregroundColor: HG.fixedWhite, padding: EdgeInsets.symmetric(vertical: 10), shape: const StadiumBorder(),
              textStyle: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: HG.font)),
          )),
        ]),
        const SizedBox(height: 20),
        // Transaction history with this tutor
        Text('Payment History', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 10),
        if (transactions.isEmpty)
          Padding(padding: EdgeInsets.only(top: 20), child: Center(child: Text('No transactions yet', style: TextStyle(fontSize: 13, color: HG.textMuted))))
        else
          ..._groupedByDate(),
      ],
    );
  }

  List<Widget> _groupedByDate() {
    final grouped = <String, List<_Tx>>{};
    for (final t in transactions) { grouped.putIfAbsent(t.date, () => []).add(t); }
    final widgets = <Widget>[];
    for (final e in grouped.entries) {
      widgets.add(Padding(padding: EdgeInsets.only(top: widgets.isEmpty ? 0 : 8, bottom: 6),
        child: Text(e.key, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.textLight))));
      for (final t in e.value) {
        widgets.add(Container(
          margin: EdgeInsets.only(bottom: 6),
          padding: EdgeInsets.all(14),
          decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
          child: Row(children: [
            Container(width: 36, height: 36,
              decoration: BoxDecoration(
                color: t.isRefund ? HG.green.withValues(alpha: 0.08) : (t.isPaid ? HG.blue.withValues(alpha: 0.08) : HG.grey100),
                borderRadius: BorderRadius.circular(10)),
              child: Icon(
                t.isRefund ? PhosphorIconsFill.arrowUUpLeft : (t.isPaid ? PhosphorIconsFill.receipt : PhosphorIconsRegular.videoCamera),
                size: 15, color: t.isRefund ? HG.green : (t.isPaid ? HG.blue : HG.grey500))),
            const SizedBox(width: 12),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(t.subject, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
              Text(t.time, style: TextStyle(fontSize: 11, color: HG.textMuted)),
            ])),
            Text(t.amount, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: t.isRefund ? HG.green : HG.dark)),
          ]),
        ));
      }
    }
    return widgets;
  }

  String _totalAmount() {
    var total = 0;
    for (final t in transactions) {
      if (!t.isPaid && !t.isRefund) continue;
      final cleaned = t.amount.replaceAll(RegExp(r'[^\d]'), '');
      final val = int.tryParse(cleaned) ?? 0;
      if (t.isRefund) { total -= val; } else { total += val; }
    }
    if (total >= 1000) return '${(total / 1000).toStringAsFixed(total % 1000 == 0 ? 0 : 1)}K';
    return '$total';
  }

  static Widget _stat(String v, String l) => Expanded(child: Column(children: [
    Text(v, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: HG.dark)),
    const SizedBox(height: 2),
    Text(l, style: TextStyle(fontSize: 10, color: HG.textMuted)),
  ]));
}
