import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../theme.dart';
import 'step_data.dart';

class CollegeCard extends StatefulWidget {
  final double pb;
  final VoidCallback onSubmit;
  const CollegeCard({super.key, required this.pb, required this.onSubmit});

  @override
  State<CollegeCard> createState() => _CollegeCardState();
}

class _CollegeCardState extends State<CollegeCard> {
  String? _field; // category like "Engineering & Tech"
  String? _course;
  int? _branch;
  int? _year;
  final _customCourse = TextEditingController();
  final _customBranch = TextEditingController();

  static const _accent = Color(0xFF6366F1);

  List<String> get _fields => collegeCoursesGrouped.keys.toList();
  List<String> get _courses => _field != null ? [...collegeCoursesGrouped[_field]!, 'Others'] : [];
  bool get _courseIsOthers => _course == 'Others';
  List<String> get _branches => (_course != null && !_courseIsOthers && collegeBranches.containsKey(_course)) ? collegeBranches[_course]! : [];
  bool get _branchIsOthers => _branch != null && _branches.isNotEmpty && _branches[_branch!] == 'Others';

  bool get _ok {
    if (_course == null && !_courseIsOthers) return false;
    if (_courseIsOthers && _customCourse.text.trim().isEmpty) return false;
    if (_branches.isNotEmpty && _branch == null) return false;
    if (_branchIsOthers && _customBranch.text.trim().isEmpty) return false;
    if (_year == null) return false;
    return true;
  }

  @override
  void dispose() { _customCourse.dispose(); _customBranch.dispose(); super.dispose(); }

  Widget _label(String t) => Padding(
    padding: EdgeInsets.only(bottom: 8, top: 4),
    child: Text(t, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.textLight, letterSpacing: 1)),
  );

  Widget _tile(String label, bool on, VoidCallback onTap) => Padding(
    padding: EdgeInsets.only(bottom: 8),
    child: GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
        decoration: BoxDecoration(
          color: on ? _accent.withValues(alpha: 0.08) : HG.grey50,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: on ? _accent.withValues(alpha: 0.4) : HG.grey200, width: on ? 1.5 : 1),
        ),
        child: Row(children: [
          Expanded(child: Text(label, style: TextStyle(fontSize: 14, fontWeight: on ? FontWeight.w600 : FontWeight.w400, color: on ? _accent : HG.dark))),
          if (on) Icon(Icons.check_circle_rounded, size: 20, color: _accent),
        ]),
      ),
    ),
  );

  Widget _textInput(TextEditingController c, String hint) => Container(
    margin: EdgeInsets.only(bottom: 8),
    decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(14), border: Border.all(color: HG.grey200)),
    child: TextField(
      controller: c, onChanged: (_) => setState(() {}), textInputAction: TextInputAction.done,
      style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
      decoration: InputDecoration(hintText: hint, hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
        contentPadding: EdgeInsets.symmetric(horizontal: 18, vertical: 14), border: InputBorder.none),
    ),
  );

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(color: HG.white, border: Border.all(color: HG.grey200), borderRadius: BorderRadius.circular(28)),
        child: Column(children: [
            const SizedBox(height: 28),
            Text('Your college details', textAlign: TextAlign.center,
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
            const SizedBox(height: 6),
            Padding(padding: EdgeInsets.symmetric(horizontal: 32),
              child: Text('Pick your field, course, and year.', textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13, color: HG.textMuted))),
            const SizedBox(height: 18),

            // Field chips — horizontal
            SizedBox(
              height: 40,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: EdgeInsets.symmetric(horizontal: 24),
                itemCount: _fields.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (_, i) {
                  final f = _fields[i];
                  final on = _field == f;
                  return GestureDetector(
                    onTap: () { HapticFeedback.selectionClick(); setState(() { _field = f; _course = null; _branch = null; _customCourse.clear(); _customBranch.clear(); }); },
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        color: on ? _accent.withValues(alpha: 0.08) : HG.grey50,
                        borderRadius: BorderRadius.circular(100),
                        border: Border.all(color: on ? _accent.withValues(alpha: 0.4) : HG.grey200, width: on ? 1.5 : 1),
                      ),
                      alignment: Alignment.center,
                      child: Text(f, style: TextStyle(fontSize: 12, fontWeight: on ? FontWeight.w600 : FontWeight.w400, color: on ? _accent : HG.dark)),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 14),

            // Content
            Expanded(child: _field == null
              ? Center(child: Text('Pick a field above', style: TextStyle(fontSize: 14, color: HG.textLight)))
              : ListView(
                  padding: EdgeInsets.symmetric(horizontal: 24),
                  physics: const BouncingScrollPhysics(),
                  children: [
                    _label('COURSE'),
                    ..._courses.map((c) => _tile(c, _course == c, () {
                      HapticFeedback.selectionClick();
                      setState(() { _course = c; _branch = null; _customCourse.clear(); _customBranch.clear(); });
                    })),
                    if (_courseIsOthers) _textInput(_customCourse, 'Type your course'),

                    // Branch
                    if (_course != null && !_courseIsOthers && _branches.isNotEmpty) ...[
                      _label('BRANCH / SPECIALIZATION'),
                      ...List.generate(_branches.length, (i) => _tile(_branches[i], _branch == i, () {
                        HapticFeedback.selectionClick();
                        setState(() { _branch = i; _customBranch.clear(); });
                      })),
                      if (_branchIsOthers) _textInput(_customBranch, 'Type your branch'),
                    ],

                    // Year
                    _label('YEAR'),
                    Wrap(
                      spacing: 8, runSpacing: 8,
                      children: List.generate(collegeYears.length, (i) {
                        final on = _year == i;
                        return GestureDetector(
                          onTap: () { HapticFeedback.selectionClick(); setState(() => _year = i); },
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                            decoration: BoxDecoration(
                              color: on ? _accent.withValues(alpha: 0.08) : HG.grey50,
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(color: on ? _accent.withValues(alpha: 0.4) : HG.grey200, width: on ? 1.5 : 1),
                            ),
                            child: Text(collegeYears[i], style: TextStyle(fontSize: 14, fontWeight: on ? FontWeight.w600 : FontWeight.w400, color: on ? _accent : HG.dark)),
                          ),
                        );
                      }),
                    ),
                    const SizedBox(height: 8),
                  ],
                ),
            ),

            Padding(
              padding: EdgeInsets.fromLTRB(24, 4, 24, widget.pb + 20),
              child: _M3AccentButton(
                enabled: _ok,
                onTap: () { HapticFeedback.mediumImpact(); widget.onSubmit(); },
              ),
            ),
          ]),
    );
  }
}

class _M3AccentButton extends StatefulWidget {
  final bool enabled;
  final VoidCallback onTap;
  const _M3AccentButton({required this.enabled, required this.onTap});
  @override
  State<_M3AccentButton> createState() => _M3AccentButtonState();
}

class _M3AccentButtonState extends State<_M3AccentButton> {
  bool _pressed = false;
  static const _accent = Color(0xFF6366F1);

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
              color: _accent,
              borderRadius: BorderRadius.circular(100),
              boxShadow: widget.enabled ? [
                BoxShadow(color: _accent.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)),
                BoxShadow(color: _accent.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1)),
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
