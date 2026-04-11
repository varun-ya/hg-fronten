import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import 'step_data.dart';

class TutorSubjectsCard extends StatefulWidget {
  final double pb;
  final VoidCallback onNext;
  const TutorSubjectsCard({super.key, required this.pb, required this.onNext});

  @override
  State<TutorSubjectsCard> createState() => _TutorSubjectsCardState();
}

class _TutorSubjectsCardState extends State<TutorSubjectsCard> {
  final _selSubjects = <String>{};
  final _selSkills = <String>{};
  bool _showSubjectSearch = false;
  bool _showSkillSearch = false;
  final _subjectQuery = TextEditingController();
  final _skillQuery = TextEditingController();
  final _subjectFocus = FocusNode();
  final _skillFocus = FocusNode();

  int get _total => _selSubjects.length + _selSkills.length;

  void _toggle(String item, Set<String> set) {
    HapticFeedback.selectionClick();
    setState(() { if (set.contains(item)) set.remove(item); else set.add(item); });
  }

  @override
  void dispose() { _subjectQuery.dispose(); _skillQuery.dispose(); _subjectFocus.dispose(); _skillFocus.dispose(); super.dispose(); }

  // ── Chip ──
  Widget _chip(String label, bool on, VoidCallback onTap) => GestureDetector(
    onTap: onTap,
    child: AnimatedContainer(
      duration: const Duration(milliseconds: 200), curve: Curves.easeOutCubic,
      padding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: on ? HG.dark : HG.white,
        borderRadius: BorderRadius.circular(100),
        border: Border.all(color: on ? HG.dark.withValues(alpha: 0.3) : HG.grey200, width: 1),
      ),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        Text(label, style: TextStyle(fontSize: 13, fontWeight: on ? FontWeight.w600 : FontWeight.w400, color: on ? HG.white : HG.dark)),
        if (on) ...[
          const SizedBox(width: 6),
          Icon(Icons.check_rounded, size: 13, color: HG.white),
        ],
      ]),
    ),
  );

  // ── Custom tag ──
  Widget _tag(String label, VoidCallback onRemove) => Container(
    padding: EdgeInsets.only(left: 12, right: 4, top: 6, bottom: 6),
    decoration: BoxDecoration(
      color: HG.orange.withValues(alpha: 0.08),
      borderRadius: BorderRadius.circular(100),
      border: Border.all(color: HG.orange.withValues(alpha: 0.25)),
    ),
    child: Row(mainAxisSize: MainAxisSize.min, children: [
      Text(label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.orange)),
      const SizedBox(width: 4),
      GestureDetector(
        onTap: onRemove,
        child: Container(
          width: 18, height: 18,
          decoration: BoxDecoration(color: HG.grey200, shape: BoxShape.circle),
          child: Icon(Icons.close_rounded, size: 10, color: HG.grey500),
        ),
      ),
    ]),
  );

  // ── Section header ──
  Widget _section(String text, int count) => Padding(
    padding: EdgeInsets.only(bottom: 10),
    child: Row(children: [
      Text(text.toUpperCase(), style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.dark, letterSpacing: 1)),
      const SizedBox(width: 8),
      Expanded(child: Container(height: 1, color: HG.grey200)),
      if (count > 0) ...[
        const SizedBox(width: 8),
        Container(
          padding: EdgeInsets.symmetric(horizontal: 8, vertical: 2),
          decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100)),
          child: Text('$count', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: HG.white)),
        ),
      ],
    ]),
  );

  // ── Add more button ──
  Widget _addMore(String label, VoidCallback onTap) => GestureDetector(
    onTap: onTap,
    child: Padding(
      padding: EdgeInsets.only(top: 10),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        Icon(PhosphorIconsBold.plus, size: 12, color: HG.orange),
        const SizedBox(width: 4),
        Text(label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.orange)),
      ]),
    ),
  );

  // ── Search dropdown ──
  Widget _searchBox(TextEditingController ctrl, FocusNode focus, List<String> all, Set<String> selected, VoidCallback onClose) {
    final q = ctrl.text.trim().toLowerCase();
    final filtered = q.isEmpty
        ? all.where((s) => !selected.contains(s)).take(6).toList()
        : all.where((s) => !selected.contains(s) && s.toLowerCase().contains(q)).take(6).toList();
    final canAddCustom = q.isNotEmpty && !all.any((s) => s.toLowerCase() == q) && !selected.contains(ctrl.text.trim());

    return Container(
      margin: EdgeInsets.only(top: 8),
      decoration: BoxDecoration(
        color: HG.grey50, borderRadius: BorderRadius.circular(14),
        border: Border.all(color: HG.border),
        boxShadow: [BoxShadow(color: HG.dark.withValues(alpha: 0.05), blurRadius: 12, offset: const Offset(0, 4))],
      ),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        Row(children: [
          const SizedBox(width: 14),
          Icon(PhosphorIconsRegular.magnifyingGlass, size: 15, color: HG.textLight),
          const SizedBox(width: 8),
          Expanded(child: TextField(
            controller: ctrl, focusNode: focus, autofocus: true,
            onChanged: (_) => setState(() {}),
            onSubmitted: (v) {
              final t = v.trim();
              if (t.isNotEmpty && !selected.contains(t)) {
                setState(() => selected.add(t));
                ctrl.clear();
              }
            },
            style: TextStyle(fontSize: 13, color: HG.dark, fontFamily: HG.font),
            decoration: InputDecoration(
              hintText: 'Search or type custom...',
              hintStyle: TextStyle(fontSize: 13, color: HG.textLight),
              border: InputBorder.none,
              contentPadding: EdgeInsets.symmetric(vertical: 12),
            ),
          )),
          GestureDetector(
            onTap: () { onClose(); ctrl.clear(); },
            child: Padding(padding: EdgeInsets.all(12), child: Icon(Icons.close_rounded, size: 16, color: HG.textLight)),
          ),
        ]),
        Container(height: 1, color: HG.grey100),
        ConstrainedBox(
          constraints: const BoxConstraints(maxHeight: 200),
          child: ListView(
            shrinkWrap: true,
            padding: EdgeInsets.zero,
            children: [
              // Custom add option
              if (canAddCustom)
                GestureDetector(
                  onTap: () {
                    final t = ctrl.text.trim();
                    setState(() => selected.add(t));
                    ctrl.clear();
                  },
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    decoration: BoxDecoration(color: HG.orange.withValues(alpha: 0.04)),
                    child: Row(children: [
                      Icon(PhosphorIconsBold.plus, size: 12, color: HG.orange),
                      const SizedBox(width: 8),
                      Expanded(child: Text('Add "${ctrl.text.trim()}"', style: TextStyle(fontSize: 13, color: HG.orange, fontWeight: FontWeight.w600))),
                    ]),
                  ),
                ),
              // Filtered results
              ...filtered.map((s) => GestureDetector(
                onTap: () {
                  _toggle(s, selected);
                  ctrl.clear();
                },
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  child: Row(children: [
                    Expanded(child: Text(s, style: TextStyle(fontSize: 13, color: HG.dark))),
                    if (selected.contains(s))
                      Icon(Icons.check_rounded, size: 14, color: HG.green),
                  ]),
                ),
              )),
              if (filtered.isEmpty && !canAddCustom)
                Padding(padding: EdgeInsets.all(14), child: Text('No results found', style: TextStyle(fontSize: 12, color: HG.textLight))),
            ],
          ),
        ),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    final extraSubjects = _selSubjects.where((s) => !popularSubjects.contains(s)).toList();
    final extraSkills = _selSkills.where((s) => !popularSkills.contains(s)).toList();

    return Container(
        decoration: BoxDecoration(color: HG.white, border: Border.all(color: HG.grey200), borderRadius: BorderRadius.circular(28)),
        child: Column(children: [
            const SizedBox(height: 28),
            Text('What can you teach?', textAlign: TextAlign.center, style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
            const SizedBox(height: 6),
            Padding(padding: EdgeInsets.symmetric(horizontal: 32),
              child: Text('Pick from popular options or add your own. You can always update these later.', textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.4))),
            const SizedBox(height: 24),

            Expanded(child: ListView(
              padding: EdgeInsets.symmetric(horizontal: 24),
              physics: const BouncingScrollPhysics(),
              children: [
                // ── Subjects ──
                _section('Subjects', _selSubjects.length),
                Wrap(spacing: 6, runSpacing: 8, children: popularSubjects.map((s) =>
                  _chip(s, _selSubjects.contains(s), () => _toggle(s, _selSubjects))).toList()),
                if (extraSubjects.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Wrap(spacing: 6, runSpacing: 6, children: extraSubjects.map((s) =>
                    _tag(s, () => setState(() => _selSubjects.remove(s)))).toList()),
                ],
                if (!_showSubjectSearch)
                  _addMore('Add more subjects', () => setState(() => _showSubjectSearch = true))
                else
                  _searchBox(_subjectQuery, _subjectFocus, allSubjects, _selSubjects, () => setState(() => _showSubjectSearch = false)),

                const SizedBox(height: 24),

                // ── Skills ──
                _section('Skills', _selSkills.length),
                Wrap(spacing: 6, runSpacing: 8, children: popularSkills.map((s) =>
                  _chip(s, _selSkills.contains(s), () => _toggle(s, _selSkills))).toList()),
                if (extraSkills.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Wrap(spacing: 6, runSpacing: 6, children: extraSkills.map((s) =>
                    _tag(s, () => setState(() => _selSkills.remove(s)))).toList()),
                ],
                if (!_showSkillSearch)
                  _addMore('Add more skills', () => setState(() => _showSkillSearch = true))
                else
                  _searchBox(_skillQuery, _skillFocus, allSkills, _selSkills, () => setState(() => _showSkillSearch = false)),

                const SizedBox(height: 16),
              ],
            )),

            // Continue
            Padding(
              padding: EdgeInsets.fromLTRB(24, 4, 24, widget.pb + 20),
              child: GestureDetector(
                onTap: _total > 0 ? widget.onNext : null,
                child: AnimatedOpacity(
                  duration: const Duration(milliseconds: 250), opacity: _total > 0 ? 1.0 : 0.4,
                  child: Container(
                    width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
                    decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100),
                      boxShadow: [BoxShadow(color: HG.dark.withValues(alpha: 0.2), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.dark.withValues(alpha: 0.1), blurRadius: 4, offset: const Offset(0, 1))]),
                    child: Center(child: Row(mainAxisSize: MainAxisSize.min, children: [
                      Text('Continue', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white)),
                      if (_total > 0) ...[
                        const SizedBox(width: 8),
                        Container(
                          padding: EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(color: HG.white.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(100)),
                          child: Text('$_total', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.white)),
                        ),
                      ],
                    ])),
                  ),
                ),
              ),
            ),
          ]),
    );
  }
}
