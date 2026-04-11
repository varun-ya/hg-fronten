import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/user_session.dart';
import '../../../services/location_service.dart';
import 'step_data.dart';

const _pink = Color(0xFFEC4899);

class ProfileCard extends StatefulWidget {
  final double pb;
  final VoidCallback onNext;
  final ValueChanged<int> onCategoryChanged;
  const ProfileCard({super.key, required this.pb, required this.onNext, required this.onCategoryChanged});

  @override
  State<ProfileCard> createState() => _ProfileCardState();
}

class _ProfileCardState extends State<ProfileCard> {
  final _first = TextEditingController();
  final _last = TextEditingController();
  final _firstFocus = FocusNode();
  final _lastFocus = FocusNode();
  DateTime? _dob;
  int? _gender;
  int? _category;
  String? _country, _state, _city;
  final _languages = <String>[];
  bool _tried = false;
  bool _sheetOpen = false;

  String? _nameErr(String v) => v.trim().length < 2 ? (v.trim().isEmpty ? 'Required' : 'Too short') : null;

  bool get _canProceed =>
      _nameErr(_first.text) == null && _nameErr(_last.text) == null &&
      _dob != null && _gender != null && _category != null && _country != null &&
      _languages.isNotEmpty;

  int _age(DateTime d) {
    final n = DateTime.now();
    int a = n.year - d.year;
    if (n.month < d.month || (n.month == d.month && n.day < d.day)) a--;
    return a;
  }

  int _guessCategory(int age) {
    if (age <= 22) return 0;
    if (age <= 60) return 1;
    return 3;
  }

  Future<void> _pickDob() async {
    final now = DateTime.now();
    final d = await showDatePicker(
      context: context,
      initialDate: _dob ?? DateTime(now.year - 15),
      firstDate: DateTime(1940), lastDate: now,
    );
    if (d == null || !mounted) return;
    final a = _age(d);
    setState(() {
      _dob = d;
      _category = _guessCategory(a);
      if (_gender == 1 && a > 25 && a <= 60) _category = 2;
      widget.onCategoryChanged(_category!);
    });
  }

  Future<void> _pickCountry() async {
    if (_sheetOpen) return;
    _sheetOpen = true;
    final items = await LocationService.getCountries();
    if (!mounted) { _sheetOpen = false; return; }
    final v = await _showSearchSheet('Select country', items);
    _sheetOpen = false;
    if (v != null && mounted) setState(() { _country = v; _state = null; _city = null; });
  }

  Future<void> _pickState() async {
    if (_country == null || _sheetOpen) return;
    _sheetOpen = true;
    final items = await LocationService.getStates(_country!);
    if (!mounted || items.isEmpty) { _sheetOpen = false; return; }
    final v = await _showSearchSheet('Select state', items);
    _sheetOpen = false;
    if (v != null && mounted) setState(() { _state = v; _city = null; });
  }

  Future<void> _pickCity() async {
    if (_country == null || _state == null || _sheetOpen) return;
    _sheetOpen = true;
    final items = await LocationService.getCities(_country!, _state!);
    if (!mounted || items.isEmpty) { _sheetOpen = false; return; }
    final v = await _showSearchSheet('Select city', items);
    _sheetOpen = false;
    if (v != null && mounted) setState(() => _city = v);
  }

  Future<String?> _showSearchSheet(String title, List<String> items) {
    return showDialog<String>(
      context: context,
      builder: (_) => _SearchModal(title: title, items: items),
    );
  }

  Widget _chip(String label, bool on, VoidCallback onTap) => Expanded(
    child: GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: on ? _pink.withValues(alpha: 0.08) : HG.grey50,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: on ? _pink.withValues(alpha: 0.4) : HG.grey200, width: on ? 1.5 : 1),
        ),
        child: Center(child: Text(label, style: TextStyle(
          fontSize: 14, fontWeight: on ? FontWeight.w600 : FontWeight.w400, color: on ? _pink : HG.dark))),
      ),
    ),
  );

  Widget _input(TextEditingController c, String hint, {String? err, FocusNode? focus, FocusNode? nextFocus}) {
    final hasErr = _tried && err != null;
    return Container(
      decoration: BoxDecoration(
        color: HG.grey50, borderRadius: BorderRadius.circular(14),
        border: Border.all(color: hasErr ? HG.red : HG.grey200, width: hasErr ? 1.5 : 1),
      ),
      child: TextField(
        controller: c, onChanged: (_) => setState(() {}),
        focusNode: focus,
        textInputAction: nextFocus != null ? TextInputAction.next : TextInputAction.done,
        onSubmitted: (_) { if (nextFocus != null) nextFocus.requestFocus(); },
        style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
        decoration: InputDecoration(
          hintText: hint, hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
          contentPadding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          border: InputBorder.none,
        ),
      ),
    );
  }

  Widget _picker(String? value, String hint, VoidCallback onTap, {bool enabled = true}) {
    final hasVal = value != null;
    return GestureDetector(
      onTap: enabled ? onTap : null,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
        decoration: BoxDecoration(
          color: enabled ? HG.grey50 : HG.grey100,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: hasVal ? _pink.withValues(alpha: 0.4) : HG.grey200, width: hasVal ? 1.5 : 1),
        ),
        child: Row(children: [
          Expanded(child: Text(value ?? hint, style: TextStyle(
            fontSize: 14, fontWeight: hasVal ? FontWeight.w600 : FontWeight.w400,
            color: hasVal ? _pink : HG.textLight))),
          Icon(PhosphorIconsBold.caretDown, size: 12, color: HG.textLight),
        ]),
      ),
    );
  }

  // ── Language picker ──
  Future<void> _addLanguage() async {
    if (_sheetOpen) return;
    _sheetOpen = true;
    final lang = await showDialog<String>(context: context, builder: (_) => const _LanguageSearchModal());
    _sheetOpen = false;
    if (lang == null || !mounted || _languages.contains(lang)) return;
    setState(() => _languages.add(lang));
  }

  Widget _sectionLabel(String text) => Padding(
    padding: EdgeInsets.only(bottom: 8),
    child: Row(children: [
      Text(text.toUpperCase(), style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.dark, letterSpacing: 1)),
      const SizedBox(width: 8),
      Expanded(child: Container(height: 1, color: HG.border)),
    ]),
  );

  @override
  void dispose() { _first.dispose(); _last.dispose(); _firstFocus.dispose(); _lastFocus.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: HG.white, border: Border.all(color: HG.grey200), borderRadius: BorderRadius.circular(28)),
      child: Column(children: [
            const SizedBox(height: 28),
            Text('About you', textAlign: TextAlign.center, style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
            const SizedBox(height: 6),
            Padding(padding: EdgeInsets.symmetric(horizontal: 32),
              child: Text('This helps us personalise everything.', textAlign: TextAlign.center, style: TextStyle(fontSize: 13, color: HG.textMuted))),
            const SizedBox(height: 20),
            Expanded(child: ListView(
              padding: EdgeInsets.symmetric(horizontal: 24),
              physics: const BouncingScrollPhysics(),
              children: [
                Row(children: [
                  Expanded(child: _input(_first, 'First name', err: _nameErr(_first.text), focus: _firstFocus, nextFocus: _lastFocus)),
                  const SizedBox(width: 8),
                  Expanded(child: _input(_last, 'Last name', err: _nameErr(_last.text), focus: _lastFocus)),
                ]),
                const SizedBox(height: 10),
                GestureDetector(
                  onTap: _pickDob,
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                    decoration: BoxDecoration(
                      color: HG.grey50, borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: _dob != null ? _pink.withValues(alpha: 0.4) : (_tried && _dob == null ? HG.red : HG.grey200), width: _dob != null ? 1.5 : 1),
                    ),
                    child: Row(children: [
                      Icon(PhosphorIconsRegular.cake, size: 18, color: _dob != null ? _pink : HG.textLight),
                      const SizedBox(width: 10),
                      Text(_dob != null ? '${_dob!.day}/${_dob!.month}/${_dob!.year}  ·  ${_age(_dob!)} yrs' : 'Date of birth',
                        style: TextStyle(fontSize: 14, fontWeight: _dob != null ? FontWeight.w600 : FontWeight.w400, color: _dob != null ? _pink : HG.textLight)),
                      if (_dob != null) ...[const Spacer(), Icon(PhosphorIconsFill.checkCircle, size: 18, color: _pink)],
                    ]),
                  ),
                ),
                const SizedBox(height: 10),
                Row(children: [
                  _chip('Male', _gender == 0, () { HapticFeedback.selectionClick(); setState(() => _gender = 0); }),
                  const SizedBox(width: 8),
                  _chip('Female', _gender == 1, () { HapticFeedback.selectionClick(); setState(() { _gender = 1; if (_dob != null && _age(_dob!) > 25 && _age(_dob!) <= 60) { _category = 2; widget.onCategoryChanged(2); } }); }),
                  const SizedBox(width: 8),
                  _chip('Other', _gender == 2, () { HapticFeedback.selectionClick(); setState(() => _gender = 2); }),
                ]),
                const SizedBox(height: 10),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 18),
                  decoration: BoxDecoration(
                    color: HG.grey50, borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: _category != null ? _pink.withValues(alpha: 0.4) : (_tried && _category == null ? HG.red : HG.grey200), width: _category != null ? 1.5 : 1),
                  ),
                  child: DropdownButtonHideUnderline(child: DropdownButton<String>(
                    value: _category != null ? learnerCategories[_category!] : null,
                    isExpanded: true,
                    hint: Text('I am a...', style: TextStyle(fontSize: 14, color: HG.textLight)),
                    icon: Icon(Icons.keyboard_arrow_down_rounded, size: 20, color: HG.textLight),
                    style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
                    borderRadius: BorderRadius.circular(14),
                    items: learnerCategories.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                    onChanged: (v) {
                      if (v == null) return;
                      final idx = learnerCategories.indexOf(v);
                      setState(() => _category = idx);
                      widget.onCategoryChanged(idx);
                    },
                  )),
                ),
                const SizedBox(height: 12),

                // Preferred languages
                _sectionLabel('Preferred Languages'),
                if (_languages.isNotEmpty)
                  Wrap(
                    spacing: 6, runSpacing: 6,
                    children: _languages.map((lang) => Container(
                      padding: EdgeInsets.only(left: 14, right: 4, top: 8, bottom: 8),
                      decoration: BoxDecoration(color: _pink.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(100),
                        border: Border.all(color: _pink.withValues(alpha: 0.25))),
                      child: Row(mainAxisSize: MainAxisSize.min, children: [
                        Text(lang, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: _pink)),
                        const SizedBox(width: 4),
                        GestureDetector(
                          onTap: () => setState(() => _languages.remove(lang)),
                          child: Container(
                            width: 20, height: 20,
                            decoration: BoxDecoration(color: HG.grey200, shape: BoxShape.circle),
                            child: Icon(Icons.close_rounded, size: 10, color: HG.grey500),
                          ),
                        ),
                      ]),
                    )).toList(),
                  ),
                if (_languages.isNotEmpty) const SizedBox(height: 8),
                GestureDetector(
                  onTap: _addLanguage,
                  child: Container(
                    padding: EdgeInsets.symmetric(vertical: 12),
                    decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: HG.border)),
                    child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                      Icon(PhosphorIconsBold.plus, size: 14, color: _pink),
                      const SizedBox(width: 6),
                      Text('Add language', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: _pink)),
                    ]),
                  ),
                ),
                if (_tried && _languages.isEmpty)
                  const Padding(padding: EdgeInsets.only(top: 4, left: 4),
                    child: Text('Add at least one language', style: TextStyle(fontSize: 11, color: HG.red))),
                const SizedBox(height: 12),

                // Location — cascading pickers
                _picker(_country, 'Country', _pickCountry),
                const SizedBox(height: 8),
                Row(children: [
                  Expanded(child: _picker(_state, 'State', _pickState, enabled: _country != null)),
                  const SizedBox(width: 8),
                  Expanded(child: _picker(_city, 'City', _pickCity, enabled: _state != null)),
                ]),
                const SizedBox(height: 12),
              ],
            )),

            Padding(
              padding: EdgeInsets.fromLTRB(24, 4, 24, widget.pb + 20),
              child: _M3ProfileButton(
                enabled: _canProceed,
                onTap: () { setState(() => _tried = true); if (_canProceed) { HapticFeedback.mediumImpact(); UserSession.name = '${_first.text.trim()} ${_last.text.trim()}'; widget.onNext(); } },
              ),
            ),
          ]),
    );
  }
}

class _M3ProfileButton extends StatefulWidget {
  final bool enabled;
  final VoidCallback onTap;
  const _M3ProfileButton({required this.enabled, required this.onTap});
  @override
  State<_M3ProfileButton> createState() => _M3ProfileButtonState();
}

class _M3ProfileButtonState extends State<_M3ProfileButton> {
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
              color: _pink,
              borderRadius: BorderRadius.circular(100),
              boxShadow: widget.enabled ? [
                BoxShadow(color: _pink.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)),
                BoxShadow(color: _pink.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1)),
              ] : null,
            ),
            child: Center(
              child: Text('Continue', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white, letterSpacing: 0.1)),
            ),
          ),
        ),
      ),
    );
  }
}

class _LanguageSearchModal extends StatefulWidget {
  const _LanguageSearchModal();
  @override
  State<_LanguageSearchModal> createState() => _LanguageSearchModalState();
}

class _LanguageSearchModalState extends State<_LanguageSearchModal> {
  String _q = '';

  static const _languages = [
    'Assamese', 'Bengali', 'Bodo', 'Dogri', 'English', 'French', 'German',
    'Gujarati', 'Hindi', 'Japanese', 'Kannada', 'Kashmiri', 'Konkani',
    'Korean', 'Maithili', 'Malayalam', 'Mandarin', 'Manipuri', 'Marathi',
    'Nepali', 'Odia', 'Portuguese', 'Punjabi', 'Russian', 'Sanskrit',
    'Santali', 'Sindhi', 'Spanish', 'Tamil', 'Telugu', 'Urdu',
  ];

  List<String> get _filtered => _q.isEmpty ? _languages
      : _languages.where((e) => e.toLowerCase().contains(_q.toLowerCase())).toList();

  @override
  Widget build(BuildContext context) {
    return Dialog(
      insetPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 40),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      backgroundColor: HG.white,
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        Padding(
          padding: EdgeInsets.fromLTRB(20, 20, 20, 8),
          child: TextField(
            onChanged: (v) => setState(() => _q = v),
            autofocus: true,
            style: TextStyle(fontSize: 14, color: HG.dark),
            decoration: InputDecoration(
              hintText: 'Search language',
              hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
              prefixIcon: Icon(Icons.search_rounded, size: 18, color: HG.textLight),
              prefixIconConstraints: const BoxConstraints(minWidth: 42),
              filled: true, fillColor: HG.grey100,
              contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
            ),
          ),
        ),
        Flexible(
          child: _filtered.isEmpty
              ? _q.trim().isNotEmpty
                  ? GestureDetector(
                      onTap: () => Navigator.pop(context, _q.trim()),
                      child: Padding(padding: EdgeInsets.all(16),
                        child: Row(children: [
                          Icon(PhosphorIconsBold.plus, size: 14, color: _pink),
                          const SizedBox(width: 8),
                          Text('Add "${_q.trim()}"', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: _pink)),
                        ])),
                    )
                  : Padding(padding: EdgeInsets.all(24), child: Text('No results', style: TextStyle(fontSize: 14, color: HG.textLight)))
              : ListView.builder(
                  shrinkWrap: true, padding: EdgeInsets.only(bottom: 12),
                  itemCount: _filtered.length,
                  itemBuilder: (_, i) => ListTile(
                    dense: true,
                    title: Text(_filtered[i], style: TextStyle(fontSize: 14, color: HG.dark)),
                    onTap: () => Navigator.pop(context, _filtered[i]),
                  ),
                ),
        ),
      ]),
    );
  }
}

class _SearchModal extends StatefulWidget {
  final String title;
  final List<String> items;
  const _SearchModal({required this.title, required this.items});

  @override
  State<_SearchModal> createState() => _SearchModalState();
}

class _SearchModalState extends State<_SearchModal> {
  String _q = '';
  List<String> get _filtered => _q.isEmpty ? widget.items
      : widget.items.where((e) => e.toLowerCase().contains(_q.toLowerCase())).toList();

  @override
  Widget build(BuildContext context) {
    return Dialog(
      insetPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 40),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      backgroundColor: HG.white,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: EdgeInsets.fromLTRB(20, 20, 20, 8),
            child: TextField(
              onChanged: (v) => setState(() => _q = v),
              autofocus: true,
              style: TextStyle(fontSize: 14, color: HG.dark),
              decoration: InputDecoration(
                hintText: 'Search ${widget.title.toLowerCase().replaceAll('select ', '')}',
                hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
                prefixIcon: Icon(Icons.search_rounded, size: 18, color: HG.textLight),
                prefixIconConstraints: const BoxConstraints(minWidth: 42),
                filled: true, fillColor: HG.grey100,
                contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
              ),
            ),
          ),
          Flexible(
            child: _filtered.isEmpty
                ? Padding(
                    padding: EdgeInsets.all(24),
                    child: Text('No results', style: TextStyle(fontSize: 14, color: HG.textLight)),
                  )
                : ListView.builder(
                    shrinkWrap: true,
                    padding: EdgeInsets.only(bottom: 12),
                    itemCount: _filtered.length,
                    itemBuilder: (_, i) => ListTile(
                      dense: true,
                      title: Text(_filtered[i], style: TextStyle(fontSize: 14, color: HG.dark)),
                      onTap: () => Navigator.pop(context, _filtered[i]),
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}
