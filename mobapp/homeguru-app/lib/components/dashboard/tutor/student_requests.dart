import 'package:flutter/material.dart';
import '../../../../theme.dart';

class StudentRequests extends StatelessWidget {
  const StudentRequests({super.key});

  static const _requests = [
    ('Aarav Sharma', 'Mathematics', '2 hrs ago'),
    ('Priya Patel', 'Physics', '5 hrs ago'),
    ('Rohan Gupta', 'Chemistry', '1 day ago'),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        Text('Student Requests', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: HG.textMuted)),
        const SizedBox(width: 6),
        Container(
          padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
          decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100)),
          child: Text('${_requests.length}', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: HG.white)),
        ),
        const Spacer(),
        Text('See all', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: HG.dark)),
      ]),
      const SizedBox(height: 12),
      ...List.generate(_requests.length, (i) {
        final r = _requests[i];
        return Column(children: [
          Padding(
            padding: EdgeInsets.symmetric(vertical: 10),
            child: Row(children: [
              Container(
                width: 40, height: 40,
                decoration: BoxDecoration(color: HG.grey100, shape: BoxShape.circle),
                child: Center(child: Text(r.$1[0], style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: HG.dark))),
              ),
              const SizedBox(width: 12),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(r.$1, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: HG.dark)),
                Text('${r.$2} \u00b7 ${r.$3}', style: TextStyle(fontSize: 12, color: HG.textMuted)),
              ])),
              GestureDetector(child: Container(
                padding: EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                decoration: BoxDecoration(color: HG.dark, borderRadius: BorderRadius.circular(100)),
                child: Text('Accept', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: HG.white)),
              )),
            ]),
          ),
          if (i < _requests.length - 1) Container(height: 1, color: HG.grey100),
        ]);
      }),
    ]);
  }
}
