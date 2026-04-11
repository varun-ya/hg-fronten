import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../../../theme.dart';

class TutorWelcomeScreen extends StatelessWidget {
  const TutorWelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final pt = MediaQuery.paddingOf(context).top;
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.dark,
        statusBarBrightness: Brightness.light,
        systemNavigationBarColor: HG.surface,
        systemNavigationBarIconBrightness: Brightness.dark,
      ),
      child: Scaffold(
        body: Padding(
          padding: EdgeInsets.fromLTRB(24, pt + 20, 24, 40),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: HG.white,
                    borderRadius: BorderRadius.circular(HG.radius),
                    border: Border.all(color: HG.border),
                  ),
                  child: Center(
                    child: PhosphorIcon(PhosphorIcons.arrowLeft(PhosphorIconsStyle.bold), size: 18, color: HG.grey700),
                  ),
                ),
              ),
              const Spacer(),
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: HG.orangeLight,
                  borderRadius: BorderRadius.circular(HG.radius),
                ),
                child: Center(
                  child: PhosphorIcon(PhosphorIcons.chalkboardTeacher(PhosphorIconsStyle.fill), size: 32, color: HG.orange),
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'Welcome,\nTutor',
                style: TextStyle(fontSize: 32, fontWeight: FontWeight.w700, color: HG.dark, height: 1.15),
              ),
              const SizedBox(height: 12),
              Text(
                'Manage your classes, track student progress, and grow your teaching practice.',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w400, color: HG.textMuted, height: 1.5),
              ),
              const Spacer(flex: 2),
              SizedBox(
                width: double.infinity,
                child: GestureDetector(
                  onTap: () => HapticFeedback.mediumImpact(),
                  child: Container(
                    padding: EdgeInsets.symmetric(vertical: 16),
                    decoration: BoxDecoration(
                      color: HG.orange,
                      borderRadius: BorderRadius.circular(HG.radius),
                      boxShadow: const [
                        BoxShadow(color: HG.orangeDark, offset: Offset(0, 4)),
                      ],
                    ),
                    child: Center(
                      child: Text(
                        'Get Started',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: HG.white),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
