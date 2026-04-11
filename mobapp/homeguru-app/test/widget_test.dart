import 'package:flutter_test/flutter_test.dart';

import 'package:homeguru/main.dart';

void main() {
  testWidgets('App renders WelcomeScreen with role chips', (WidgetTester tester) async {
    await tester.pumpWidget(const HomeGuruApp());
    expect(find.text('Learner'), findsOneWidget);
    expect(find.text('Tutor'), findsOneWidget);
    expect(find.text('Get Started'), findsOneWidget);
  });
}
