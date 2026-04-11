import 'dart:io';
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';
import '../../blog/blog_detail_page.dart';
export '../../blog/blog_detail_page.dart' show BlogDetailPage;
export '../../blog/blog_editor_page.dart' show BlogEditorPage;

class ProfileActivityTab extends StatelessWidget {
  final File? avatar;
  const ProfileActivityTab({super.key, this.avatar});

  static const _blogs = [
    (
      title: 'How I teach Quadratic Equations differently',
      subtitle: 'Most students memorize formulas. I teach them to see patterns. Here\'s my approach that helped 50+ students ace their exams...',
      body: 'Most students memorize formulas. I teach them to see patterns.\n\nWhen I first started teaching quadratic equations, I noticed that students would blindly apply the formula without understanding what they were actually solving for. The discriminant, the roots, the graph — it was all disconnected in their minds.\n\nSo I changed my approach. Instead of starting with ax² + bx + c = 0, I start with a real problem. "A ball is thrown upward at 20 m/s. When does it hit the ground?" Suddenly, the equation has meaning.\n\nHere\'s my 3-step method:\n\n1. Start with the story — every quadratic has a real-world context\n2. Visualize the parabola — draw it, feel it, understand the shape\n3. Then solve — now the formula makes sense\n\nThis approach has helped 50+ students not just pass, but actually enjoy quadratics. The key is making math feel like a puzzle, not a punishment.',
      tag: 'Mathematics', readTime: '5 min read', date: 'Dec 12, 2024', likes: 24, comments: 5, author: 'Ayush Soni',
    ),
    (
      title: 'Why most students fail at Physics — and how to fix it',
      subtitle: 'Physics isn\'t about memorizing equations. It\'s about understanding the world around you. The biggest mistake students make is...',
      body: 'Physics isn\'t about memorizing equations. It\'s about understanding the world around you.\n\nThe biggest mistake students make is treating physics like a formula sheet. They memorize F=ma, v=u+at, and hope for the best. But physics is fundamentally about asking "why does this happen?"\n\nWhen I teach Newton\'s laws, I don\'t start with the textbook. I start by pushing a chair across the room. "Why did it stop?" "Why did it need a push to start?" These simple questions lead to deep understanding.\n\nMy students who struggled with physics often had the same problem — they were trying to memorize instead of understand. Once we shifted to conceptual thinking, their scores jumped by 30-40% on average.\n\nThe fix is simple: before solving any problem, explain the physics in plain English. If you can\'t explain it simply, you don\'t understand it well enough.',
      tag: 'Physics', readTime: '8 min read', date: 'Dec 5, 2024', likes: 42, comments: 12, author: 'Ayush Soni',
    ),
    (
      title: 'My journey from student to tutor',
      subtitle: 'I was an average student in class 10. Failed my first maths test. But one teacher changed everything for me. This is that story...',
      body: 'I was an average student in class 10. Failed my first maths test.\n\nI remember staring at the red marks on my paper, feeling like mathematics was a language I\'d never speak. My parents were worried. I was frustrated.\n\nThen Mr. Sharma happened. He was a new maths teacher who did something no one else had done — he asked me what I found confusing. Not "study harder" or "pay attention." He actually listened.\n\nHe spent 30 minutes after school showing me that algebra was just like solving a mystery. "x is the suspect. The equation is the clue. Your job is to find x." Something clicked.\n\nBy class 12, I scored 95 in mathematics. I went on to study B.Sc Maths. And now, 5 years later, I\'m doing for my students what Mr. Sharma did for me.\n\nTeaching isn\'t about knowing everything. It\'s about remembering what it felt like to not know — and helping someone through that moment.',
      tag: 'Personal', readTime: '4 min read', date: 'Nov 28, 2024', likes: 18, comments: 3, author: 'Ayush Soni',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: EdgeInsets.fromLTRB(16, 16, 16, 32),
      physics: const ClampingScrollPhysics(),
      itemCount: _blogs.length,
      itemBuilder: (_, i) => _blogCard(context, _blogs[i]),
    );
  }

  Widget _blogCard(BuildContext context, ({String title, String subtitle, String body, String tag, String readTime, String date, int likes, int comments, String author}) blog) {
    return GestureDetector(
      onTap: () => Navigator.push(context, PageRouteBuilder(
        pageBuilder: (_, __, ___) => BlogDetailPage(blog: blog, avatar: avatar),
        transitionDuration: const Duration(milliseconds: 300),
        reverseTransitionDuration: const Duration(milliseconds: 250),
        transitionsBuilder: (_, anim, __, child) {
          final curved = CurvedAnimation(parent: anim, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic);
          return SlideTransition(position: Tween(begin: const Offset(1, 0), end: Offset.zero).animate(curved), child: child);
        },
      )),
      child: Padding(
        padding: EdgeInsets.only(bottom: 16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Container(
              width: 24, height: 24,
              decoration: BoxDecoration(shape: BoxShape.circle, color: HG.orange.withValues(alpha: 0.1)),
              child: avatar != null
                  ? ClipOval(child: Image.file(avatar!, fit: BoxFit.cover))
                  : const Center(child: Text('A', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.orange))),
            ),
            const SizedBox(width: 8),
            Text('Ayush Soni', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark)),
            const SizedBox(width: 6),
            Text(blog.date, style: TextStyle(fontSize: 12, color: HG.textLight)),
          ]),
          const SizedBox(height: 10),
          Text(blog.title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: HG.dark, height: 1.3, letterSpacing: -0.2)),
          const SizedBox(height: 4),
          Text(blog.subtitle, maxLines: 2, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.5)),
          const SizedBox(height: 10),
          Row(children: [
            Container(padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3), decoration: BoxDecoration(color: HG.grey100, borderRadius: BorderRadius.circular(100)),
              child: Text(blog.tag, style: TextStyle(fontSize: 11, color: HG.dark))),
            const SizedBox(width: 8),
            Text(blog.readTime, style: TextStyle(fontSize: 12, color: HG.textLight)),
            const Spacer(),
            Icon(PhosphorIconsRegular.handsClapping, size: 15, color: HG.textLight), const SizedBox(width: 3),
            Text('${blog.likes}', style: TextStyle(fontSize: 12, color: HG.textLight)),
            const SizedBox(width: 12),
            Icon(PhosphorIconsRegular.chatCircle, size: 15, color: HG.textLight), const SizedBox(width: 3),
            Text('${blog.comments}', style: TextStyle(fontSize: 12, color: HG.textLight)),
            const SizedBox(width: 12),
            Icon(PhosphorIconsRegular.bookmarkSimple, size: 15, color: HG.textLight),
          ]),
          const SizedBox(height: 16),
          Container(height: 1, color: HG.grey100),
        ]),
      ),
    );
  }
}
