import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:image_picker/image_picker.dart';
import '../../theme.dart';
import '../../services/blog_service.dart';

class BlogEditorPage extends StatefulWidget {
  const BlogEditorPage({super.key});
  @override
  State<BlogEditorPage> createState() => _BlogEditorPageState();
}

class _BlogEditorPageState extends State<BlogEditorPage> {
  final _titleCtrl = TextEditingController();
  final _subtitleCtrl = TextEditingController();
  late final QuillController _quill;
  final _scrollCtrl = ScrollController();
  final _focusNode = FocusNode();
  String _tag = 'Education';
  bool _publishing = false;

  static const _tags = ['Education', 'Mathematics', 'Physics', 'Science', 'Teaching', 'Study Tips', 'JEE Prep', 'Personal', 'EdTech'];

  @override
  void initState() {
    super.initState();
    _quill = QuillController.basic();
    _titleCtrl.addListener(_r);
    _quill.addListener(_r);
  }

  void _r() => setState(() {});

  @override
  void dispose() {
    _titleCtrl.dispose(); _subtitleCtrl.dispose();
    _quill.dispose(); _scrollCtrl.dispose(); _focusNode.dispose();
    super.dispose();
  }

  String get _plainText => _quill.document.toPlainText().trim();
  int get _wordCount { final t = _plainText; return t.isEmpty ? 0 : t.split(RegExp(r'\s+')).length; }
  String get _readTime { final m = (_wordCount / 200).ceil(); return m < 1 ? '<1 min' : '$m min read'; }
  bool get _canPublish => _titleCtrl.text.trim().isNotEmpty && _wordCount > 10;
  bool get _hasContent => _titleCtrl.text.trim().isNotEmpty || _plainText.isNotEmpty;

  Future<bool> _onBack() async {
    if (!_hasContent) return true;
    return await showDialog<bool>(context: context, builder: (ctx) => Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)), backgroundColor: HG.white,
      child: Padding(padding: EdgeInsets.all(24), child: Column(mainAxisSize: MainAxisSize.min, children: [
        Text('Discard draft?', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: HG.dark)),
        const SizedBox(height: 8),
        Text('You have unsaved changes.', style: TextStyle(fontSize: 14, color: HG.textMuted)),
        const SizedBox(height: 20),
        Row(children: [
          Expanded(child: GestureDetector(onTap: () => Navigator.pop(ctx, false),
            child: Container(height: 44, decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(100)),
              child: Center(child: Text('Keep', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.dark)))))),
          const SizedBox(width: 10),
          Expanded(child: GestureDetector(onTap: () => Navigator.pop(ctx, true),
            child: Container(height: 44, decoration: BoxDecoration(color: HG.red, borderRadius: BorderRadius.circular(100)),
              child: Center(child: Text('Discard', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.fixedWhite)))))),
        ]),
      ])),
    )) ?? false;
  }

  void _publish() async {
    if (!_canPublish) return;
    HapticFeedback.mediumImpact();
    setState(() => _publishing = true);
    await Future.delayed(const Duration(milliseconds: 800));
    final now = DateTime.now();
    final months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    final body = _plainText;
    final delta = _quill.document.toDelta().toJson();
    BlogService.addLocal(BlogArticle(
      title: _titleCtrl.text.trim(),
      subtitle: _subtitleCtrl.text.trim().isNotEmpty ? _subtitleCtrl.text.trim() : body.substring(0, body.length.clamp(0, 150)),
      body: body,
      author: 'You', tag: _tag, readTime: _readTime,
      date: '${months[now.month - 1]} ${now.day}, ${now.year}', source: 'HomeGuru',
      deltaJson: delta,
    ));
    if (mounted) { setState(() => _publishing = false); Navigator.pop(context); }
  }

  void _showTagPicker() {
    showModalBottomSheet(context: context, backgroundColor: HG.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => SafeArea(child: Padding(
        padding: EdgeInsets.fromLTRB(20, 0, 20, 20),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          const SizedBox(height: 8),
          Container(width: 40, height: 4, decoration: BoxDecoration(color: HG.grey300, borderRadius: BorderRadius.circular(2))),
          const SizedBox(height: 16),
          Text('Tag', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.dark)),
          const SizedBox(height: 14),
          Wrap(spacing: 8, runSpacing: 8, children: _tags.map((t) {
            final sel = _tag == t;
            return GestureDetector(
              onTap: () { setState(() => _tag = t); Navigator.pop(ctx); },
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(color: sel ? HG.blue : HG.grey50, borderRadius: BorderRadius.circular(100), border: sel ? null : Border.all(color: HG.grey200)),
                child: Text(t, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: sel ? HG.fixedWhite : HG.dark)),
              ),
            );
          }).toList()),
        ]),
      )),
    );
  }

  void _insertImage() async {
    final xfile = await ImagePicker().pickImage(source: ImageSource.gallery, maxWidth: 1024, imageQuality: 80);
    if (xfile != null && mounted) {
      final idx = _quill.selection.baseOffset;
      _quill.document.insert(idx, BlockEmbed.image(xfile.path));
      _quill.updateSelection(TextSelection.collapsed(offset: idx + 1), ChangeSource.local);
    }
  }

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.of(context).padding.top;
    final pb = MediaQuery.of(context).padding.bottom;

    return PopScope(
      canPop: !_hasContent,
      onPopInvokedWithResult: (didPop, _) async { if (!didPop) { final go = await _onBack(); if (go && mounted) Navigator.pop(context); } },
      child: Scaffold(
        backgroundColor: HG.white,
        body: Column(children: [
          // ── Header ──
          Container(
            padding: EdgeInsets.fromLTRB(16, pt + 10, 16, 10),
            decoration: BoxDecoration(border: Border(bottom: BorderSide(color: HG.border, width: 0.5))),
            child: Row(children: [
              GestureDetector(
                onTap: () async { if (!_hasContent) Navigator.pop(context); else { final go = await _onBack(); if (go && mounted) Navigator.pop(context); } },
                child: Icon(Icons.close_rounded, size: 22, color: HG.dark)),
              const SizedBox(width: 12),
              if (_wordCount > 0) Text('$_wordCount words  \u00b7  $_readTime', style: TextStyle(fontSize: 11, color: HG.textLight)),
              const Spacer(),
              GestureDetector(onTap: _showTagPicker, child: Container(
                padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(100), border: Border.all(color: HG.grey200)),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Text(_tag, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.dark)),
                  const SizedBox(width: 4),
                  Icon(PhosphorIconsRegular.caretDown, size: 12, color: HG.textMuted),
                ]),
              )),
              const SizedBox(width: 8),
              GestureDetector(
                onTap: _canPublish && !_publishing ? _publish : null,
                child: AnimatedOpacity(duration: const Duration(milliseconds: 200), opacity: _canPublish ? 1.0 : 0.4,
                  child: Container(padding: EdgeInsets.symmetric(horizontal: 16, vertical: 7),
                    decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100)),
                    child: _publishing
                        ? SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: HG.white))
                        : Text('Publish', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.white)))),
              ),
            ]),
          ),

          // ── Editor ──
          Expanded(child: ListView(
            controller: _scrollCtrl,
            padding: EdgeInsets.fromLTRB(20, 20, 20, 40),
            physics: const BouncingScrollPhysics(),
            children: [
              // Title
              TextField(
                controller: _titleCtrl, maxLines: null, textCapitalization: TextCapitalization.sentences,
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: HG.dark, height: 1.2, letterSpacing: -0.5, fontFamily: HG.font),
                decoration: InputDecoration(hintText: 'Title', hintStyle: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: HG.grey300, fontFamily: HG.font), border: InputBorder.none),
              ),
              // Subtitle
              TextField(
                controller: _subtitleCtrl, maxLines: null, textCapitalization: TextCapitalization.sentences,
                style: TextStyle(fontSize: 16, color: HG.textMuted, height: 1.4, fontFamily: HG.font),
                decoration: InputDecoration(hintText: 'Subtitle (optional)', hintStyle: TextStyle(fontSize: 16, color: HG.grey300, fontFamily: HG.font), border: InputBorder.none),
              ),
              Divider(height: 24, color: HG.grey200),
              // Rich text editor
              QuillEditor(
                controller: _quill,
                focusNode: _focusNode,
                scrollController: ScrollController(),
                config: QuillEditorConfig(
                  placeholder: 'Tell your story...',
                  padding: EdgeInsets.zero,
                  autoFocus: true,
                  expands: false,
                  scrollable: false,
                  embedBuilders: [_ImageEmbedBuilder()],
                  customStyles: DefaultStyles(
                    paragraph: DefaultTextBlockStyle(
                      TextStyle(fontSize: 17, color: HG.dark, height: 1.75, fontFamily: HG.font),
                      HorizontalSpacing.zero, VerticalSpacing(0, 0), VerticalSpacing.zero, null,
                    ),
                    h1: DefaultTextBlockStyle(
                      TextStyle(fontSize: 26, fontWeight: FontWeight.w800, color: HG.dark, height: 1.3, letterSpacing: -0.3, fontFamily: HG.font),
                      HorizontalSpacing.zero, VerticalSpacing(16, 8), VerticalSpacing.zero, null,
                    ),
                    h2: DefaultTextBlockStyle(
                      TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: HG.dark, height: 1.3, fontFamily: HG.font),
                      HorizontalSpacing.zero, VerticalSpacing(12, 6), VerticalSpacing.zero, null,
                    ),
                    h3: DefaultTextBlockStyle(
                      TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: HG.dark, height: 1.3, fontFamily: HG.font),
                      HorizontalSpacing.zero, VerticalSpacing(8, 4), VerticalSpacing.zero, null,
                    ),
                    quote: DefaultTextBlockStyle(
                      TextStyle(fontSize: 17, fontStyle: FontStyle.italic, color: HG.textMuted, height: 1.6, fontFamily: HG.font),
                      HorizontalSpacing.zero, VerticalSpacing(8, 8), VerticalSpacing.zero,
                      BoxDecoration(border: Border(left: BorderSide(color: HG.blue, width: 3))),
                    ),
                    code: DefaultTextBlockStyle(
                      TextStyle(fontSize: 14, color: HG.dark, fontFamily: 'monospace', height: 1.5),
                      HorizontalSpacing.zero, VerticalSpacing(8, 8), VerticalSpacing.zero,
                      BoxDecoration(color: HG.grey50, borderRadius: BorderRadius.circular(8)),
                    ),
                    bold: TextStyle(fontWeight: FontWeight.w700),
                    italic: TextStyle(fontStyle: FontStyle.italic),
                    strikeThrough: TextStyle(decoration: TextDecoration.lineThrough),
                    link: TextStyle(color: HG.blue, decoration: TextDecoration.underline),
                    placeHolder: DefaultTextBlockStyle(
                      TextStyle(fontSize: 17, color: HG.grey300, height: 1.75, fontFamily: HG.font),
                      HorizontalSpacing.zero, VerticalSpacing.zero, VerticalSpacing.zero, null,
                    ),
                  ),
                ),
              ),
            ],
          )),

          // ── Toolbar ──
          Container(
            padding: EdgeInsets.fromLTRB(0, 4, 0, pb + 4),
            decoration: BoxDecoration(color: HG.white, border: Border(top: BorderSide(color: HG.border, width: 0.5))),
            child: QuillSimpleToolbar(
              controller: _quill,
              config: QuillSimpleToolbarConfig(
                showAlignmentButtons: false,
                showBackgroundColorButton: false,
                showCenterAlignment: false,
                showClearFormat: false,
                showColorButton: false,
                showDirection: false,
                showFontFamily: false,
                showFontSize: false,
                showIndent: false,
                showInlineCode: true,
                showJustifyAlignment: false,
                showLeftAlignment: false,
                showRightAlignment: false,
                showSearchButton: false,
                showSmallButton: false,
                showSubscript: false,
                showSuperscript: false,
                showUndo: false,
                showRedo: false,
                showClipboardCopy: false,
                showClipboardCut: false,
                showClipboardPaste: false,
                multiRowsDisplay: false,
                toolbarSize: 40,
                buttonOptions: QuillSimpleToolbarButtonOptions(
                  base: QuillToolbarBaseButtonOptions(
                    iconTheme: QuillIconTheme(
                      iconButtonSelectedData: IconButtonData(color: HG.fixedWhite, style: IconButton.styleFrom(backgroundColor: HG.blue)),
                      iconButtonUnselectedData: IconButtonData(color: HG.grey500),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ]),
      ),
    );
  }
}

class _ImageEmbedBuilder extends EmbedBuilder {
  @override
  String get key => BlockEmbed.imageType;

  @override
  Widget build(BuildContext context, EmbedContext embedContext) {
    final src = embedContext.node.value.data as String;
    final isFile = !src.startsWith('http');
    return Container(
      margin: EdgeInsets.symmetric(vertical: 12),
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(borderRadius: BorderRadius.circular(12)),
      child: isFile
          ? Image.file(File(src), width: double.infinity, fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => _placeholder())
          : Image.network(src, width: double.infinity, fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => _placeholder()),
    );
  }

  Widget _placeholder() => Container(
    height: 160, color: HG.grey100,
    child: Center(child: Icon(PhosphorIconsRegular.image, size: 28, color: HG.grey300)),
  );
}
