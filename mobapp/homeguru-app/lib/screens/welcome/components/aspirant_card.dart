import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../theme.dart';

// Data from competitive_exams_structure.xlsx
const _examData = <String, Map<String, List<String>>>{
  'Engineering': {
    'IIT / NIT Prep': ['JEE Main', 'JEE Advanced'],
    'Private Colleges': ['BITSAT', 'VITEEE', 'SRMJEEE'],
  },
  'Medical': {
    'UG Medical': ['NEET UG'],
    'PG Medical': ['NEET PG', 'AIIMS Entrance'],
  },
  'Govt Jobs': {
    'Civil Services': ['UPSC CSE'],
    'SSC': ['SSC CGL', 'SSC CHSL'],
    'Banking': ['IBPS PO', 'SBI PO'],
    'Railway': ['RRB NTPC'],
  },
  'Law & Commerce': {
    'Law': ['CLAT', 'AILET'],
    'CA / CS': ['CA Foundation', 'CA Inter', 'CS Executive'],
  },
  'MBA': {
    'India': ['CAT', 'XAT'],
    'Global': ['GMAT'],
  },
  'Study Abroad': {
    'English': ['IELTS', 'TOEFL'],
    'UG Abroad': ['SAT', 'ACT'],
    'PG Abroad': ['GRE'],
  },
  'Olympiads': {
    '': ['Olympiad Exams'],
  },
};

class AspirantCard extends StatefulWidget {
  final double pb;
  final VoidCallback onSubmit;
  const AspirantCard({super.key, required this.pb, required this.onSubmit});

  @override
  State<AspirantCard> createState() => _AspirantCardState();
}

class _AspirantCardState extends State<AspirantCard> {
  String? _category;
  String? _exam;
  final _customExam = TextEditingController();

  List<String> get _categories => _examData.keys.toList();

  Map<String, List<String>> get _grouped {
    if (_category == null) return {};
    return _examData[_category]!;
  }

  bool get _pickedOthers => _exam == 'Others';
  bool get _ok => _exam != null && (!_pickedOthers || _customExam.text.trim().isNotEmpty);

  @override
  void dispose() {
    _customExam.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(borderRadius: BorderRadius.circular(28)),
      child: Container(
        decoration: BoxDecoration(color: HG.white, border: Border.all(color: HG.grey200), borderRadius: BorderRadius.circular(28)),
        child: Column(children: [
            const SizedBox(height: 28),
            Text('What are you preparing for?', textAlign: TextAlign.center,
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: HG.dark)),
            const SizedBox(height: 6),
            Padding(padding: EdgeInsets.symmetric(horizontal: 32),
              child: Text('Pick your field, then your exam.', textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13, color: HG.textMuted))),
            const SizedBox(height: 18),

            // Category chips — horizontal scroll
            SizedBox(
              height: 40,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: EdgeInsets.symmetric(horizontal: 24),
                itemCount: _categories.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (_, i) {
                  final cat = _categories[i];
                  final on = _category == cat;
                  return GestureDetector(
                    onTap: () { HapticFeedback.selectionClick(); setState(() { _category = cat; _exam = null; _customExam.clear(); }); },
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: EdgeInsets.symmetric(horizontal: 18),
                      decoration: BoxDecoration(
                        color: on ? HG.orange.withValues(alpha: 0.08) : HG.grey50,
                        borderRadius: BorderRadius.circular(100),
                        border: Border.all(color: on ? HG.orange.withValues(alpha: 0.4) : HG.grey200, width: on ? 1.5 : 1),
                      ),
                      alignment: Alignment.center,
                      child: Text(cat, style: TextStyle(fontSize: 13, fontWeight: on ? FontWeight.w600 : FontWeight.w400, color: on ? HG.orange : HG.dark)),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 16),

            // Exams list — grouped by subcategory
            Expanded(child: _category == null
              ? Center(child: Text('Pick a field above', style: TextStyle(fontSize: 14, color: HG.textLight)))
              : ListView(
                  padding: EdgeInsets.symmetric(horizontal: 24),
                  physics: const BouncingScrollPhysics(),
                  children: [
                    ..._grouped.entries.expand((entry) {
                      final sub = entry.key;
                      final exams = entry.value;
                      return [
                        if (sub.isNotEmpty) Padding(
                          padding: EdgeInsets.only(bottom: 8, top: 4),
                          child: Text(sub.toUpperCase(), style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.textLight, letterSpacing: 1)),
                        ),
                        ...exams.map((exam) {
                          final on = _exam == exam;
                          return Padding(
                            padding: EdgeInsets.only(bottom: 8),
                            child: GestureDetector(
                              onTap: () { HapticFeedback.selectionClick(); setState(() => _exam = exam); },
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                padding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                                decoration: BoxDecoration(
                                  color: on ? HG.orange.withValues(alpha: 0.08) : HG.grey50,
                                  borderRadius: BorderRadius.circular(14),
                                  border: Border.all(color: on ? HG.orange.withValues(alpha: 0.4) : HG.grey200, width: on ? 1.5 : 1),
                                ),
                                child: Row(children: [
                                  Expanded(child: Text(exam, style: TextStyle(fontSize: 14, fontWeight: on ? FontWeight.w600 : FontWeight.w400, color: on ? HG.orange : HG.dark))),
                                  if (on) Icon(Icons.check_circle_rounded, size: 20, color: HG.orange),
                                ]),
                              ),
                            ),
                          );
                        }),
                      ];
                    }),
                    // Others
                    Padding(
                      padding: EdgeInsets.only(bottom: 8),
                      child: GestureDetector(
                        onTap: () { HapticFeedback.selectionClick(); setState(() => _exam = 'Others'); },
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          padding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                          decoration: BoxDecoration(
                            color: _pickedOthers ? HG.orange.withValues(alpha: 0.08) : HG.grey50,
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: _pickedOthers ? HG.orange.withValues(alpha: 0.4) : HG.grey200, width: _pickedOthers ? 1.5 : 1),
                          ),
                          child: Row(children: [
                            Expanded(child: Text('Others', style: TextStyle(fontSize: 14, fontWeight: _pickedOthers ? FontWeight.w600 : FontWeight.w400, color: _pickedOthers ? HG.orange : HG.dark))),
                            if (_pickedOthers) Icon(Icons.check_circle_rounded, size: 20, color: HG.orange),
                          ]),
                        ),
                      ),
                    ),
                    if (_pickedOthers) ...[
                      Container(
                        decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
                        child: TextField(
                          controller: _customExam, onChanged: (_) => setState(() {}), textInputAction: TextInputAction.done,
                          style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
                          decoration: InputDecoration(hintText: 'Type your exam name', hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
                            contentPadding: EdgeInsets.symmetric(horizontal: 18, vertical: 14), border: InputBorder.none),
                        ),
                      ),
                      const SizedBox(height: 8),
                    ],
                  ],
                ),
            ),

            Padding(
              padding: EdgeInsets.fromLTRB(24, 4, 24, widget.pb + 20),
              child: GestureDetector(
                onTap: _ok ? () { HapticFeedback.mediumImpact(); widget.onSubmit(); } : null,
                child: AnimatedOpacity(
                  duration: const Duration(milliseconds: 200), opacity: _ok ? 1.0 : 0.4,
                  child: Container(
                    width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
                    decoration: BoxDecoration(color: HG.orange, borderRadius: BorderRadius.circular(100),
                      boxShadow: [BoxShadow(color: HG.orangeDark, offset: const Offset(0, 4))]),
                    child: Center(child: Text('Let\'s Go!', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.white))),
                  ),
                ),
              ),
            ),
          ]),
        ),
    );
  }
}

class _M3OrangeButton extends StatefulWidget {
  final bool enabled;
  final VoidCallback onTap;
  const _M3OrangeButton({required this.enabled, required this.onTap});
  @override
  State<_M3OrangeButton> createState() => _M3OrangeButtonState();
}

class _M3OrangeButtonState extends State<_M3OrangeButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: widget.enabled ? (_) => setState(() => _pressed = true) : null,
      onTapUp: widget.enabled ? (_) { setState(() => _pressed = false); widget.onTap(); } : null,
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.97 : 1.0,
        duration: const Duration(milliseconds: 100),
        curve: Curves.easeOut,
        child: AnimatedOpacity(
          duration: const Duration(milliseconds: 250),
          opacity: widget.enabled ? 1.0 : 0.35,
          child: Container(
            width: double.infinity,
            height: 56,
            decoration: BoxDecoration(
              color: HG.orange,
              borderRadius: BorderRadius.circular(100),
              boxShadow: widget.enabled ? [
                BoxShadow(color: HG.orange.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)),
                BoxShadow(color: HG.orange.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1)),
              ] : null,
            ),
            child: Center(
              child: Text("Let's Go!", style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white, letterSpacing: 0.1)),
            ),
          ),
        ),
      ),
    );
  }
}
