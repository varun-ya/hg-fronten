import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import '../../../theme.dart';
import '../../../models/tutor_data.dart';

const _defaultVideoId = 'G64LLtnjYlA';

class ProfileAboutTab extends StatelessWidget {
  final YoutubePlayerController? ytCtrl;
  final TutorData data;
  const ProfileAboutTab({super.key, this.ytCtrl, required this.data});

  @override
  Widget build(BuildContext context) {
    final p = data;
    return ListView(padding: EdgeInsets.fromLTRB(16, 16, 16, 32), children: [
      // Video
      if (ytCtrl != null) Card(
        elevation: 0, clipBehavior: Clip.antiAlias,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: YoutubePlayer(controller: ytCtrl!, showVideoProgressIndicator: true, progressIndicatorColor: HG.orange,
          progressColors: const ProgressBarColors(playedColor: HG.orange, handleColor: HG.orange)),
      )
      else GestureDetector(onTap: () {}, child: Card(
        elevation: 0, clipBehavior: Clip.antiAlias,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Stack(children: [
          Image.network(YoutubePlayer.getThumbnail(videoId: YoutubePlayer.convertUrlToId(p.ytLink) ?? _defaultVideoId, quality: ThumbnailQuality.max),
            height: 200, width: double.infinity, fit: BoxFit.cover, errorBuilder: (_, __, ___) => Container(height: 200, color: HG.grey100)),
          Positioned.fill(child: Container(color: HG.dark.withValues(alpha: 0.3))),
          Positioned.fill(child: Center(child: Container(width: 52, height: 52, decoration: BoxDecoration(color: HG.white.withValues(alpha: 0.9), shape: BoxShape.circle),
            child: Icon(Icons.play_arrow_rounded, size: 28, color: HG.dark)))),
          Positioned(bottom: 10, left: 12, child: Container(padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(color: HG.dark.withValues(alpha: 0.7), borderRadius: BorderRadius.circular(6)),
            child: Text('Intro Video', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: HG.white)))),
        ]),
      )),
      const SizedBox(height: 20),

      // About
      Text(p.about, style: TextStyle(fontSize: 14, color: HG.dark, height: 1.65)),
      const SizedBox(height: 24),

      // Experience
      _section('Experience'),
      Card(
        elevation: 0, color: HG.grey50,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(children: [
            for (int i = 0; i < p.experience.length; i++) ...[
              _expTile(p.experience[i]['title'] ?? '', p.experience[i]['org'] ?? '', p.experience[i]['period'] ?? ''),
              if (i < p.experience.length - 1) Divider(height: 20),
            ],
          ]),
        ),
      ),
      const SizedBox(height: 20),

      // Education
      _section('Education'),
      Card(
        elevation: 0, color: HG.grey50,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(children: [
            for (int i = 0; i < p.education.length; i++) ...[
              _expTile(p.education[i]['title'] ?? '', p.education[i]['org'] ?? '', p.education[i]['period'] ?? ''),
              if (i < p.education.length - 1) Divider(height: 20),
            ],
          ]),
        ),
      ),
      const SizedBox(height: 20),

      // Subjects
      _section('Subjects'),
      Wrap(spacing: 6, runSpacing: 6, children: p.subjects.map((s) => Chip(
        label: Text(s),
        labelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: HG.dark, fontFamily: HG.font),
        backgroundColor: HG.grey50,
        side: BorderSide.none,
        shape: const StadiumBorder(),
        visualDensity: VisualDensity.compact,
        materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
      )).toList()),
      const SizedBox(height: 20),

      // Pricing
      _section('Session Pricing'),
      Card(
        elevation: 0, color: HG.grey50,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Column(children: [
            for (int i = 0; i < p.pricing.entries.length; i++) ...[
              Padding(
                padding: EdgeInsets.symmetric(vertical: 8),
                child: Row(children: [
                  Text(p.pricing.entries.elementAt(i).key, style: TextStyle(fontSize: 13, color: HG.textMuted)),
                  const Spacer(),
                  Text('\u20b9${p.pricing.entries.elementAt(i).value}/hr', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)),
                ]),
              ),
              if (i < p.pricing.entries.length - 1) Divider(height: 1),
            ],
          ]),
        ),
      ),
      const SizedBox(height: 20),

      // Languages
      _section('Languages'),
      Wrap(spacing: 6, runSpacing: 6, children: p.languages.map((s) => Chip(
        label: Text(s),
        labelStyle: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: HG.dark, fontFamily: HG.font),
        backgroundColor: HG.grey50,
        side: BorderSide.none,
        shape: const StadiumBorder(),
        visualDensity: VisualDensity.compact,
        materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
      )).toList()),
      const SizedBox(height: 24),

      // Details
      Divider(),
      const SizedBox(height: 12),
      _detailRow(PhosphorIconsRegular.mapPin, p.location),
      _detailRow(PhosphorIconsRegular.graduationCap, '5+ years teaching \u00b7 200+ students'),
      _detailRow(PhosphorIconsRegular.calendarBlank, 'Joined June 2025'),
      _detailRow(PhosphorIconsRegular.globe, 'Teaches online'),
    ]);
  }

  static Widget _section(String s) => Padding(padding: EdgeInsets.only(bottom: 10), child: Text(s, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: HG.dark)));

  static Widget _expTile(String title, String org, String period) => Row(children: [
    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark)),
      const SizedBox(height: 2),
      Text('$org \u00b7 $period', style: TextStyle(fontSize: 12, color: HG.textMuted)),
    ])),
  ]);

  static Widget _detailRow(IconData icon, String text) => Padding(
    padding: EdgeInsets.only(bottom: 14),
    child: Row(children: [
      Icon(icon, size: 18, color: HG.textMuted),
      const SizedBox(width: 12),
      Expanded(child: Text(text, style: TextStyle(fontSize: 13, color: HG.dark))),
    ]),
  );
}
