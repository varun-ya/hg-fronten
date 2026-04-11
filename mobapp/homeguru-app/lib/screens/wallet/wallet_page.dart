import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../theme.dart';

enum _TxType { all, received, withdrawn }

class _Tx {
  final String name, sub, amount, time, date;
  final bool isCredit, isWithdraw;
  const _Tx({required this.name, required this.sub, required this.amount, required this.time, required this.date, this.isCredit = true, this.isWithdraw = false});
}

const _allTx = [
  _Tx(name: 'Aarav Sharma', sub: 'Mathematics', amount: '\u20b9500', time: '2:30 PM', date: 'Today'),
  _Tx(name: 'Priya Patel', sub: 'Physics', amount: '\u20b9500', time: '11:00 AM', date: 'Today'),
  _Tx(name: 'Sneha Kapoor', sub: 'JEE Advanced', amount: '\u20b9800', time: '4:00 PM', date: 'Yesterday'),
  _Tx(name: 'Kavya Singh', sub: 'JEE Prep', amount: '\u20b9600', time: '2:00 PM', date: 'Yesterday'),
  _Tx(name: 'Rohan Gupta', sub: 'Chemistry (Demo)', amount: '\u20b90', time: '10:00 AM', date: 'Yesterday', isCredit: false),
  _Tx(name: 'Auto Withdraw', sub: 'HDFC \u00b7\u00b7\u00b7\u00b7 4521', amount: '-\u20b98,000', time: '6:15 PM', date: 'Jun 26', isCredit: false, isWithdraw: true),
  _Tx(name: 'Meera Iyer', sub: 'English Lit', amount: '\u20b9400', time: '3:00 PM', date: 'Jun 26'),
  _Tx(name: 'Aarav Sharma', sub: 'Mathematics', amount: '\u20b9500', time: '10:30 AM', date: 'Jun 26'),
  _Tx(name: 'Auto Withdraw', sub: 'HDFC \u00b7\u00b7\u00b7\u00b7 4521', amount: '-\u20b96,200', time: '6:15 PM', date: 'Jun 19', isCredit: false, isWithdraw: true),
  _Tx(name: 'Priya Patel', sub: 'Physics', amount: '\u20b9500', time: '2:00 PM', date: 'Jun 19'),
  _Tx(name: 'Amit Desai', sub: 'Calculus', amount: '\u20b9500', time: '9:00 AM', date: 'Jun 19'),
  _Tx(name: 'Sneha Kapoor', sub: 'JEE Advanced', amount: '\u20b9800', time: '4:00 PM', date: 'Jun 18'),
  _Tx(name: 'Kavya Singh', sub: 'JEE Prep', amount: '\u20b9600', time: '1:00 PM', date: 'Jun 18'),
];

const _students = ['Aarav Sharma', 'Priya Patel', 'Sneha Kapoor', 'Kavya Singh', 'Rohan Gupta', 'Meera Iyer', 'Amit Desai'];

class WalletPage extends StatefulWidget {
  const WalletPage({super.key});
  @override
  State<WalletPage> createState() => _WalletPageState();
}

class _WalletPageState extends State<WalletPage> {
  _TxType _filter = _TxType.all;
  String? _studentFilter;
  DateTimeRange? _dateRange;

  List<_Tx> get _filtered {
    var list = _allTx.toList();
    if (_filter == _TxType.received) list = list.where((t) => t.isCredit).toList();
    if (_filter == _TxType.withdrawn) list = list.where((t) => t.isWithdraw).toList();
    if (_studentFilter != null) list = list.where((t) => t.name == _studentFilter).toList();
    return list;
  }

  bool get _hasFilters => _filter != _TxType.all || _studentFilter != null || _dateRange != null;

  void _clearFilters() => setState(() { _filter = _TxType.all; _studentFilter = null; _dateRange = null; });

  void _showBankDetails(BuildContext context) {
    showModalBottomSheet(
      context: context, backgroundColor: HG.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => SafeArea(child: SingleChildScrollView(
        padding: EdgeInsets.fromLTRB(20, 0, 20, 20),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          const SizedBox(height: 8),
          Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
          const SizedBox(height: 20),
          Row(children: [
            CircleAvatar(radius: 20, backgroundColor: HG.powderBlue, child: Icon(PhosphorIconsFill.bank, size: 18, color: HG.blue)),
            const SizedBox(width: 12),
            Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('Bank Account', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
              SizedBox(height: 2),
              Text('Auto-withdraw every Monday', style: TextStyle(fontSize: 12, color: HG.textMuted)),
            ]),
          ]),
          const SizedBox(height: 20),
          Card(
            elevation: 0, color: HG.grey50,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Column(children: [
                _bankRow('Account holder', 'Ayush Soni'),
                Divider(height: 20),
                _bankRow('Bank', 'HDFC Bank'),
                Divider(height: 20),
                _bankRow('Account number', '\u00b7\u00b7\u00b7\u00b7 \u00b7\u00b7\u00b7\u00b7 4521'),
                Divider(height: 20),
                _bankRow('IFSC', 'HDFC0001234'),
                Divider(height: 20),
                _bankRow('Branch', 'Andheri West, Mumbai'),
              ]),
            ),
          ),
          const SizedBox(height: 16),
        ]),
      )),
    );
  }

  static Widget _bankRow(String label, String value) => Row(children: [
    Expanded(child: Text(label, style: TextStyle(fontSize: 13, color: HG.textMuted))),
    Text(value, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
  ]);

  void _showStudentPicker() {
    showModalBottomSheet(
      context: context, backgroundColor: HG.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => SafeArea(child: SingleChildScrollView(child: Column(mainAxisSize: MainAxisSize.min, children: [
        const SizedBox(height: 8),
        Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
        const SizedBox(height: 16),
        Text('Filter by student', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 8),
        // All option
        ListTile(
          leading: CircleAvatar(radius: 16, backgroundColor: HG.grey100, child: Icon(PhosphorIconsRegular.users, size: 14, color: HG.grey500)),
          title: Text('All students', style: TextStyle(fontSize: 14, color: HG.dark)),
          trailing: _studentFilter == null ? Icon(PhosphorIconsFill.checkCircle, size: 18, color: HG.blue) : null,
          onTap: () { setState(() => _studentFilter = null); Navigator.pop(ctx); },
        ),
        Divider(height: 1, indent: 56),
        ..._students.map((s) => ListTile(
          leading: CircleAvatar(radius: 16, backgroundColor: HG.powderBlue, child: Text(s[0], style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.blue))),
          title: Text(s, style: TextStyle(fontSize: 14, color: HG.dark)),
          trailing: _studentFilter == s ? Icon(PhosphorIconsFill.checkCircle, size: 18, color: HG.blue) : null,
          onTap: () { setState(() => _studentFilter = s); Navigator.pop(ctx); },
        )),
        const SizedBox(height: 16),
      ]))),
    );
  }

  void _showDatePicker() async {
    final range = await showDateRangePicker(
      context: context,
      firstDate: DateTime(2024),
      lastDate: DateTime.now(),
      initialDateRange: _dateRange,
      builder: (ctx, child) => Theme(
        data: Theme.of(ctx).copyWith(colorScheme: context.isDark
          ? ColorScheme.dark(primary: HG.blue, onPrimary: HG.fixedWhite, surface: HG.grey100)
          : ColorScheme.light(primary: HG.fixedBlue, onPrimary: HG.fixedWhite, surface: HG.fixedWhite)),
        child: child!,
      ),
    );
    if (range != null && mounted) setState(() => _dateRange = range);
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final txList = _filtered;
    // Group by date
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
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: Icon(PhosphorIconsBold.arrowLeft, size: 20),
                  style: IconButton.styleFrom(backgroundColor: HG.grey50),
                ),
                const SizedBox(width: 12),
                Text('Wallet', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: HG.dark)),
              ]),
            ),
            const SizedBox(height: 20),

            // Balance card
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Card(
                elevation: 0, color: HG.powderBlue,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                child: Padding(
                  padding: EdgeInsets.all(24),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Row(children: [
                      Icon(PhosphorIconsFill.wallet, size: 18, color: HG.blue),
                      const SizedBox(width: 8),
                      Text('Available Balance', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.blue)),
                    ]),
                    const SizedBox(height: 12),
                    Text('\u20b912,400', style: TextStyle(fontSize: 38, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -1)),
                    const SizedBox(height: 4),
                    Row(children: [
                      Icon(PhosphorIconsFill.trendUp, size: 13, color: const Color(0xFF16A34A)),
                      const SizedBox(width: 4),
                      Text('+18% from last month', style: TextStyle(fontSize: 12, color: HG.textMuted)),
                    ]),
                    const SizedBox(height: 20),
                    Row(children: [
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text('Next auto-withdraw', style: TextStyle(fontSize: 11, color: HG.textMuted)),
                        const SizedBox(height: 2),
                        Text('Monday, Jul 1', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
                      ])),
                      OutlinedButton.icon(
                        onPressed: () => _showBankDetails(context),
                        icon: Icon(PhosphorIconsRegular.bank, size: 14),
                        label: Text('Bank details'),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: HG.dark,
                          padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                          shape: const StadiumBorder(),
                          side: BorderSide(color: HG.blue.withValues(alpha: 0.3)),
                          textStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, fontFamily: HG.font),
                        ),
                      ),
                    ]),
                  ]),
                ),
              ),
            ),
            const SizedBox(height: 14),

            // Auto-withdraw banner
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Card(
                elevation: 0, color: HG.butterYellow,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                  child: Row(children: [
                    Icon(PhosphorIconsFill.clockClockwise, size: 16, color: HG.amber),
                    const SizedBox(width: 10),
                    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text('Auto-withdraw every Monday', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark)),
                      const SizedBox(height: 1),
                      Text('HDFC \u00b7\u00b7\u00b7\u00b7 4521 \u00b7 Next: Monday, Jul 1', style: TextStyle(fontSize: 11, color: HG.textMuted)),
                    ])),
                    TextButton(
                      onPressed: () {},
                      child: Text('Edit'),
                      style: TextButton.styleFrom(
                        foregroundColor: HG.amber,
                        textStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, fontFamily: HG.font),
                        padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                      ),
                    ),
                  ]),
                ),
              ),
            ),
            const SizedBox(height: 14),

            // Quick stats
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Row(children: [
                _statCard('\u20b94,200', 'This week', PhosphorIconsFill.calendarCheck, HG.powderOrange, HG.orange),
                const SizedBox(width: 10),
                _statCard('\u20b92,400', 'Pending', PhosphorIconsFill.clock, HG.butterYellow, HG.amber),
              ]),
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
                  // Type filter
                  ..._TxType.values.map((t) => Padding(
                    padding: EdgeInsets.only(right: 6),
                    child: ChoiceChip(
                      label: Text(t == _TxType.all ? 'All' : t == _TxType.received ? 'Received' : 'Withdrawn'),
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
                  // Student filter
                  Padding(
                    padding: EdgeInsets.only(right: 6),
                    child: ActionChip(
                      avatar: Icon(PhosphorIconsRegular.user, size: 14, color: _studentFilter != null ? HG.blue : HG.textMuted),
                      label: Text(_studentFilter ?? 'Student'),
                      onPressed: _showStudentPicker,
                      backgroundColor: _studentFilter != null ? HG.powderBlue : HG.grey50,
                      side: BorderSide(color: _studentFilter != null ? HG.blue.withValues(alpha: 0.3) : HG.grey200),
                      labelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: _studentFilter != null ? HG.blue : HG.dark, fontFamily: HG.font),
                      shape: const StadiumBorder(),
                      visualDensity: VisualDensity.compact,
                    ),
                  ),
                  // Date filter
                  ActionChip(
                    avatar: Icon(PhosphorIconsRegular.calendarBlank, size: 14, color: _dateRange != null ? HG.blue : HG.textMuted),
                    label: Text(_dateRange != null ? '${_dateRange!.start.day}/${_dateRange!.start.month} - ${_dateRange!.end.day}/${_dateRange!.end.month}' : 'Date range'),
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

            // Clear filters
            if (_hasFilters) Padding(
              padding: EdgeInsets.only(left: 16, top: 6),
              child: Align(alignment: Alignment.centerLeft, child: TextButton.icon(
                onPressed: _clearFilters,
                icon: Icon(PhosphorIconsRegular.x, size: 14),
                label: Text('Clear filters'),
                style: TextButton.styleFrom(
                  foregroundColor: HG.textMuted,
                  textStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, fontFamily: HG.font),
                  padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
              )),
            ),

            const SizedBox(height: 8),

            // Transaction list
            if (txList.isEmpty)
              Padding(
                padding: EdgeInsets.only(top: 40),
                child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
                  Icon(PhosphorIconsRegular.receipt, size: 40, color: HG.grey300),
                  const SizedBox(height: 10),
                  Text('No transactions found', style: TextStyle(fontSize: 14, color: HG.textMuted)),
                ])),
              )
            else
              ...grouped.entries.map((e) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Padding(
                  padding: EdgeInsets.fromLTRB(20, 12, 20, 6),
                  child: Text(e.key, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.textMuted)),
                ),
                ...e.value.map((t) => _txTile(t)),
              ])),

            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  static Widget _statCard(String amount, String label, IconData icon, Color bg, Color fg) => Expanded(
    child: Card(
      elevation: 0, color: bg,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Icon(icon, size: 16, color: fg),
          const SizedBox(height: 10),
          Text(amount, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: HG.dark)),
          const SizedBox(height: 2),
          Text(label, style: TextStyle(fontSize: 11, color: HG.textMuted)),
        ]),
      ),
    ),
  );

  static Widget _txTile(_Tx t) => Padding(
    padding: EdgeInsets.symmetric(horizontal: 16),
    child: Card(
      elevation: 0, color: HG.surface,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14), side: BorderSide(color: HG.grey200)),
      margin: EdgeInsets.only(bottom: 6),
      child: ListTile(
        dense: true,
        contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 4),
        leading: CircleAvatar(
          radius: 20,
          backgroundColor: t.isWithdraw ? HG.powderOrange : (t.isCredit ? HG.powderBlue : HG.grey100),
          child: Icon(
            t.isWithdraw ? PhosphorIconsFill.arrowDown : (t.isCredit ? PhosphorIconsFill.arrowUp : PhosphorIconsRegular.videoCamera),
            size: 16,
            color: t.isWithdraw ? HG.orange : (t.isCredit ? HG.blue : HG.grey500),
          ),
        ),
        title: Text(t.name, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark)),
        subtitle: Text(t.sub, style: TextStyle(fontSize: 12, color: HG.textMuted)),
        trailing: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.end, children: [
          Text(t.amount, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: t.isWithdraw ? HG.red : HG.dark)),
          Text(t.time, style: TextStyle(fontSize: 10, color: HG.textLight)),
        ]),
      ),
    ),
  );
}
