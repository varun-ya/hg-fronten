import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../theme.dart';
import '../../services/blog_service.dart';
class BlogDetailPage extends StatefulWidget {
  final ({String title, String subtitle, String body, String tag, String readTime, String date, int likes, int comments, String author}) blog;
  final File? avatar;
  final BlogArticle? article;
  const BlogDetailPage({super.key, required this.blog, this.avatar, this.article});
  @override
  State<BlogDetailPage> createState() => _BlogDetailPageState();
}

class _BlogDetailPageState extends State<BlogDetailPage> {
  String _body = '';
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _body = widget.blog.body;
    if (widget.article != null && !widget.article!.hasFullBody && _body.length < 500) _loadFull();
  }

  Future<void> _loadFull() async {
    if (widget.article == null) return;
    setState(() => _loading = true);
    await BlogService.loadFullBody(widget.article!);
    if (mounted) setState(() { _body = widget.article!.fullBody; _loading = false; });
  }

  @override
  Widget build(BuildContext context) {
    final blog = widget.blog;
    final avatar = widget.avatar;
    final pt = MediaQuery.of(context).padding.top;
    return Scaffold(
      backgroundColor: HG.white,
      body: Column(children: [
        Container(
          padding: EdgeInsets.fromLTRB(16, pt + 10, 16, 10),
          decoration: BoxDecoration(border: Border(bottom: BorderSide(color: HG.border, width: 0.5))),
          child: Row(children: [
            GestureDetector(onTap: () => Navigator.pop(context), child: Icon(Icons.arrow_back_rounded, size: 20, color: HG.dark)),
            const SizedBox(width: 12),
            Expanded(child: Text('Blog', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark))),
            Icon(PhosphorIconsRegular.shareFat, size: 18, color: HG.grey500),
            const SizedBox(width: 16),
            Icon(PhosphorIconsRegular.bookmarkSimple, size: 18, color: HG.grey500),
          ]),
        ),
        Expanded(child: ListView(
          padding: EdgeInsets.all(20), physics: const BouncingScrollPhysics(),
          children: [
            Row(children: [
              Container(padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(100)),
                child: Text(blog.tag, style: TextStyle(fontSize: 12, color: HG.dark))),
              const SizedBox(width: 8),
              Text(blog.readTime, style: TextStyle(fontSize: 12, color: HG.textLight)),
            ]),
            const SizedBox(height: 16),
            Text(blog.title, style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: HG.dark, height: 1.25, letterSpacing: -0.3)),
            const SizedBox(height: 16),
            Row(children: [
              Container(width: 36, height: 36, decoration: BoxDecoration(shape: BoxShape.circle, color: HG.orange.withValues(alpha: 0.1)),
                child: avatar != null ? ClipOval(child: Image.file(avatar!, fit: BoxFit.cover))
                    : const Center(child: Text('A', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.orange)))),
              const SizedBox(width: 10),
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(blog.author, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: HG.dark)),
                Text(blog.date, style: TextStyle(fontSize: 12, color: HG.textLight)),
              ]),
            ]),
            const SizedBox(height: 20),
            Container(height: 1, color: HG.grey100),
            const SizedBox(height: 20),
            // Body — rich or plain
            if (widget.article?.deltaJson != null)
              _richBody(widget.article!.deltaJson!)
            else
              renderMarkdown(_body),
            if (_loading) ...[const SizedBox(height: 16), Center(child: SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: HG.blue)))],
            if (widget.article?.sourceUrl != null && widget.article!.sourceUrl!.isNotEmpty) ...[const SizedBox(height: 12), Text('Source: ${widget.article!.source}', style: TextStyle(fontSize: 12, color: HG.textLight))],
            const SizedBox(height: 24),
            Container(height: 1, color: HG.grey100),
            const SizedBox(height: 16),
            Row(children: [
              Icon(PhosphorIconsRegular.handsClapping, size: 20, color: HG.textMuted), const SizedBox(width: 6),
              Text('${blog.likes}', style: TextStyle(fontSize: 14, color: HG.textMuted)),
              const SizedBox(width: 20),
              Icon(PhosphorIconsRegular.chatCircle, size: 20, color: HG.textMuted), const SizedBox(width: 6),
              Text('${blog.comments}', style: TextStyle(fontSize: 14, color: HG.textMuted)),
            ]),
          ],
        )),
      ]),
    );
  }
  Widget _richBody(List<dynamic> deltaJson) {
    final doc = Document.fromJson(deltaJson);
    final ctrl = QuillController(document: doc, selection: const TextSelection.collapsed(offset: 0), readOnly: true);
    return QuillEditor(
      controller: ctrl,
      focusNode: FocusNode(),
      scrollController: ScrollController(),
      config: QuillEditorConfig(
        showCursor: false,
        enableInteractiveSelection: true,
        onLaunchUrl: (url) async {
          try { await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication); } catch (_) {}
        },
        padding: EdgeInsets.zero,
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
        ),
      ),
    );
  }
}

/// Renders markdown-like text into Flutter widgets.
Widget renderMarkdown(String text) {
  final lines = text.split('\n');
  final widgets = <Widget>[];
  for (final line in lines) {
    final t = line.trim();
    if (t.isEmpty) { widgets.add(const SizedBox(height: 12)); }
    else if (t == '---') { widgets.add(Padding(padding: EdgeInsets.symmetric(vertical: 16), child: Divider(color: HG.grey200))); }
    else if (t.startsWith('# ')) { widgets.add(Padding(padding: EdgeInsets.only(top: 20, bottom: 8), child: Text(t.substring(2), style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: HG.dark, height: 1.3, letterSpacing: -0.3)))); }
    else if (t.startsWith('## ')) { widgets.add(Padding(padding: EdgeInsets.only(top: 16, bottom: 6), child: Text(t.substring(3), style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: HG.dark, height: 1.3)))); }
    else if (t.startsWith('> ')) { widgets.add(Container(margin: EdgeInsets.symmetric(vertical: 8), padding: EdgeInsets.fromLTRB(16, 12, 16, 12), decoration: BoxDecoration(border: Border(left: BorderSide(color: HG.blue, width: 3)), color: HG.grey50), child: _richLine(t.substring(2), italic: true))); }
    else if (t.startsWith('\u2022 ') || t.startsWith('- ')) { widgets.add(Padding(padding: EdgeInsets.only(bottom: 4), child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [Padding(padding: EdgeInsets.only(top: 8), child: Container(width: 5, height: 5, decoration: BoxDecoration(color: HG.dark, shape: BoxShape.circle))), const SizedBox(width: 10), Expanded(child: _richLine(t.substring(2)))]))); }
    else if (RegExp(r'^\d+\. ').hasMatch(t)) { final idx = t.indexOf('. '); widgets.add(Padding(padding: EdgeInsets.only(bottom: 4), child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [SizedBox(width: 24, child: Text(t.substring(0, idx + 1), style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.dark, height: 1.75))), const SizedBox(width: 6), Expanded(child: _richLine(t.substring(idx + 2)))]))); }
    else if (t.startsWith('[image:')) { widgets.add(Container(margin: EdgeInsets.symmetric(vertical: 12), height: 160, decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(12)), child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [Icon(PhosphorIconsRegular.image, size: 28, color: HG.grey300), const SizedBox(height: 6), Text('Image', style: TextStyle(fontSize: 12, color: HG.textMuted))])))); }
    else { widgets.add(_richLine(t)); }
  }
  return Column(crossAxisAlignment: CrossAxisAlignment.start, children: widgets);
}

Widget _richLine(String text, {bool italic = false}) {
  final spans = <InlineSpan>[];
  final regex = RegExp(r'\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|~~(.+?)~~|\[(.+?)\]\((.+?)\)');
  int pos = 0;
  for (final match in regex.allMatches(text)) {
    if (match.start > pos) spans.add(TextSpan(text: text.substring(pos, match.start)));
    if (match.group(1) != null) spans.add(TextSpan(text: match.group(1), style: TextStyle(fontWeight: FontWeight.w700)));
    else if (match.group(2) != null) spans.add(TextSpan(text: match.group(2), style: TextStyle(fontStyle: FontStyle.italic)));
    else if (match.group(3) != null) spans.add(WidgetSpan(child: Container(padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2), decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(4)), child: Text(match.group(3)!, style: TextStyle(fontSize: 14, fontFamily: 'monospace', color: HG.dark)))));
    else if (match.group(4) != null) spans.add(TextSpan(text: match.group(4), style: TextStyle(decoration: TextDecoration.lineThrough)));
    else if (match.group(5) != null) {
      final linkText = match.group(5)!;
      final linkUrl = match.group(6) ?? '';
      spans.add(WidgetSpan(
        child: GestureDetector(
          onTap: () async { try { await launchUrl(Uri.parse(linkUrl), mode: LaunchMode.externalApplication); } catch (_) {} },
          child: Text(linkText, style: TextStyle(fontSize: 16, color: HG.blue, fontWeight: FontWeight.w500, decoration: TextDecoration.underline, height: 1.75)),
        ),
      ));
    }
    pos = match.end;
  }
  if (pos < text.length) spans.add(TextSpan(text: text.substring(pos)));
  return Text.rich(TextSpan(children: spans, style: TextStyle(fontSize: 16, color: HG.dark, height: 1.75, fontStyle: italic ? FontStyle.italic : FontStyle.normal, letterSpacing: 0.1)));
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
