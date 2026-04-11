import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../../models/tutor_data.dart';

class EditProfilePage extends StatefulWidget {
  final TutorData data;
  const EditProfilePage({super.key, required this.data});
  @override
  State<EditProfilePage> createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  late final TextEditingController _name;
  late final TextEditingController _bio;
  late final TextEditingController _about;
  late final TextEditingController _ytLink;
  late final TextEditingController _location;
  late List<String> _languages;
  late Map<String, TextEditingController> _pricingCtrls;
  late List<Map<String, String>> _experience;
  late List<Map<String, String>> _education;

  @override
  void initState() {
    super.initState();
    final p = widget.data;
    _name = TextEditingController(text: p.name);
    _bio = TextEditingController(text: p.bio);
    _about = TextEditingController(text: p.about);
    _ytLink = TextEditingController(text: p.ytLink);
    _location = TextEditingController(text: p.location);
    _languages = List.from(p.languages);
    _pricingCtrls = { for (final s in p.subjects) s: TextEditingController(text: '${p.pricing[s] ?? 500}') };
    _experience = p.experience.map((e) => Map<String, String>.from(e)).toList();
    _education = p.education.map((e) => Map<String, String>.from(e)).toList();
  }

  @override
  void dispose() {
    _name.dispose(); _bio.dispose(); _about.dispose(); _ytLink.dispose(); _location.dispose();
    for (final c in _pricingCtrls.values) c.dispose();
    super.dispose();
  }

  void _save() {
    final p = widget.data;
    p.name = _name.text.trim();
    p.bio = _bio.text.trim();
    p.about = _about.text.trim();
    p.ytLink = _ytLink.text.trim();
    p.location = _location.text.trim();
    p.languages = List.from(_languages);
    p.pricing = { for (final e in _pricingCtrls.entries) e.key: int.tryParse(e.value.text) ?? 500 };
    p.experience = _experience.map((e) => Map<String, String>.from(e)).toList();
    p.education = _education.map((e) => Map<String, String>.from(e)).toList();
    p.update();
    HapticFeedback.mediumImpact();
    Navigator.pop(context);
  }

  void _addLanguage() async {
    final s = await _showAddDialog('Add Language');
    if (s != null && s.isNotEmpty && !_languages.contains(s)) setState(() => _languages.add(s));
  }

  void _addExperience() async {
    final r = await _showEntryDialog('Add Experience');
    if (r != null) setState(() => _experience.add(r));
  }

  void _addEducation() async {
    final r = await _showEntryDialog('Add Education');
    if (r != null) setState(() => _education.add(r));
  }

  Future<String?> _showAddDialog(String title) {
    final ctrl = TextEditingController();
    return showDialog<String>(context: context, builder: (ctx) => Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)), backgroundColor: HG.white,
      child: Padding(padding: EdgeInsets.all(20), child: Column(mainAxisSize: MainAxisSize.min, children: [
        Text(title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 12),
        _dialogInput(ctrl, 'e.g. Hindi \u00b7 Native'),
        const SizedBox(height: 12),
        Row(children: [
          Expanded(child: GestureDetector(onTap: () => Navigator.pop(ctx), child: Center(child: Text('Cancel', style: TextStyle(fontSize: 14, color: HG.textMuted))))),
          const SizedBox(width: 8),
          Expanded(child: GestureDetector(onTap: () => Navigator.pop(ctx, ctrl.text.trim()), child: Container(padding: EdgeInsets.symmetric(vertical: 10), decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100)), child: Center(child: Text('Add', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.white)))))),
        ]),
      ])),
    ));
  }

  Future<Map<String, String>?> _showEntryDialog(String title) {
    final t = TextEditingController(), o = TextEditingController(), p = TextEditingController();
    return showDialog<Map<String, String>>(context: context, builder: (ctx) => Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)), backgroundColor: HG.white,
      child: Padding(padding: EdgeInsets.all(20), child: Column(mainAxisSize: MainAxisSize.min, children: [
        Text(title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 12),
        _dialogInput(t, 'Title'), const SizedBox(height: 8),
        _dialogInput(o, 'Organization'), const SizedBox(height: 8),
        _dialogInput(p, 'Period (e.g. 2020 \u2013 2023)'),
        const SizedBox(height: 12),
        Row(children: [
          Expanded(child: GestureDetector(onTap: () => Navigator.pop(ctx), child: Center(child: Text('Cancel', style: TextStyle(fontSize: 14, color: HG.textMuted))))),
          const SizedBox(width: 8),
          Expanded(child: GestureDetector(onTap: () { if (t.text.trim().isEmpty) return; Navigator.pop(ctx, {'title': t.text.trim(), 'org': o.text.trim(), 'period': p.text.trim()}); },
            child: Container(padding: EdgeInsets.symmetric(vertical: 10), decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100)), child: Center(child: Text('Add', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.white)))))),
        ]),
      ])),
    ));
  }

  Widget _dialogInput(TextEditingController c, String hint) => Container(
    decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10)),
    child: TextField(controller: c, autofocus: true, style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
      decoration: InputDecoration(hintText: hint, hintStyle: TextStyle(fontSize: 14, color: HG.textLight), contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12), border: InputBorder.none)),
  );

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    return Scaffold(
      backgroundColor: HG.white,
      body: Column(children: [
        Container(
          padding: EdgeInsets.fromLTRB(16, pt + 10, 16, 10),
          decoration: BoxDecoration(border: Border(bottom: BorderSide(color: HG.border, width: 0.5))),
          child: Row(children: [
            GestureDetector(onTap: () => Navigator.pop(context), child: Text('Cancel', style: TextStyle(fontSize: 14, color: HG.textMuted))),
            const Spacer(),
            Text('Edit Profile', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark)),
            const Spacer(),
            GestureDetector(onTap: _save, child: Container(padding: EdgeInsets.symmetric(horizontal: 16, vertical: 7), decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100)), child: Text('Save', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.white)))),
          ]),
        ),
        Expanded(child: ListView(padding: EdgeInsets.fromLTRB(16, 20, 16, 40), physics: const BouncingScrollPhysics(), children: [
          _label('Name'), _field(_name),
          const SizedBox(height: 16),
          _label('Username'),
          Container(padding: EdgeInsets.symmetric(horizontal: 14, vertical: 12), decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(10)),
            child: Text('@${widget.data.handle}', style: TextStyle(fontSize: 14, color: HG.textMuted))),
          const SizedBox(height: 16),
          _label('Bio'), _field(_bio, maxLines: 2, hint: 'Short tagline'),
          const SizedBox(height: 16),
          _label('About Me'), _field(_about, maxLines: 5, hint: 'Tell students about yourself...'),
          const SizedBox(height: 16),
          _label('Intro Video (YouTube)'), _field(_ytLink, hint: 'https://youtu.be/...'),
          const SizedBox(height: 16),
          _label('Location'), _field(_location),
          const SizedBox(height: 16),
          _label('Teaching Mode'),
          Container(padding: EdgeInsets.symmetric(horizontal: 14, vertical: 12), decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(10)),
            child: Text('Online only', style: TextStyle(fontSize: 14, color: HG.textMuted))),
          const SizedBox(height: 20),

          // Subjects (read-only)
          _label('Subjects (from onboarding)'),
          Wrap(spacing: 6, runSpacing: 6, children: widget.data.subjects.map((s) => Container(
            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 7),
            decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(8)),
            child: Text(s, style: TextStyle(fontSize: 13, color: HG.textMuted)),
          )).toList()),
          const SizedBox(height: 20),

          // Pricing per subject
          _label('Session Pricing (\u20b9/hr)'),
          ..._pricingCtrls.entries.map((e) => Padding(padding: EdgeInsets.only(bottom: 8), child: Row(children: [
            Expanded(child: Text(e.key, style: TextStyle(fontSize: 13, color: HG.textMuted))),
            SizedBox(width: 80, child: Container(padding: EdgeInsets.symmetric(horizontal: 12), decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(8)),
              child: TextField(controller: e.value, keyboardType: TextInputType.number, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark, fontFamily: HG.font),
                decoration: InputDecoration(border: InputBorder.none, prefixText: '\u20b9', prefixStyle: TextStyle(fontSize: 13, color: HG.textMuted))))),
          ]))),
          const SizedBox(height: 20),

          // Languages
          _sectionHeader('Languages', _addLanguage),
          Wrap(spacing: 6, runSpacing: 6, children: _languages.map((s) => _editChip(s, () => setState(() => _languages.remove(s)))).toList()),
          const SizedBox(height: 20),

          // Experience
          _sectionHeader('Experience', _addExperience),
          ..._experience.asMap().entries.map((e) => _entryTile(e.value, () => setState(() => _experience.removeAt(e.key)))),
          const SizedBox(height: 20),

          // Education
          _sectionHeader('Education', _addEducation),
          ..._education.asMap().entries.map((e) => _entryTile(e.value, () => setState(() => _education.removeAt(e.key)))),
        ])),
      ]),
    );
  }

  Widget _label(String s) => Padding(padding: EdgeInsets.only(bottom: 6), child: Text(s, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.textMuted)));
  Widget _field(TextEditingController c, {int maxLines = 1, String? hint}) => Container(decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(10)),
    child: TextField(controller: c, maxLines: maxLines, style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
      decoration: InputDecoration(hintText: hint, hintStyle: TextStyle(fontSize: 14, color: HG.textLight), contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12), border: InputBorder.none)));
  Widget _sectionHeader(String title, VoidCallback onAdd) => Padding(padding: EdgeInsets.only(bottom: 8), child: Row(children: [
    Text(title, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.textMuted)), const Spacer(),
    GestureDetector(onTap: onAdd, child: Row(mainAxisSize: MainAxisSize.min, children: [Icon(PhosphorIconsBold.plus, size: 12, color: HG.dark), const SizedBox(width: 4), Text('Add', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark))]))]));
  Widget _editChip(String label, VoidCallback onRemove) => Container(padding: EdgeInsets.only(left: 12, right: 4, top: 7, bottom: 7), decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(8)),
    child: Row(mainAxisSize: MainAxisSize.min, children: [Text(label, style: TextStyle(fontSize: 13, color: HG.dark)), const SizedBox(width: 4), GestureDetector(onTap: onRemove, child: Icon(Icons.close_rounded, size: 14, color: HG.textLight))]));
  Widget _entryTile(Map<String, String> entry, VoidCallback onRemove) => Padding(padding: EdgeInsets.only(bottom: 10), child: Row(children: [
    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(entry['title'] ?? '', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)),
      Text('${entry['org']} \u00b7 ${entry['period']}', style: TextStyle(fontSize: 12, color: HG.textMuted))])),
    GestureDetector(onTap: onRemove, child: Icon(Icons.close_rounded, size: 16, color: HG.textLight))]));
}
