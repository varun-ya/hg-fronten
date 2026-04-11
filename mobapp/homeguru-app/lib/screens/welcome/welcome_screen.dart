import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../theme.dart';
import '../../widgets/walkthrough_overlay.dart';
import 'components/step_data.dart';
import 'components/welcome_header.dart';
import 'components/onboarding_header.dart';
import 'components/welcome_card.dart';
import 'components/step_card.dart';
import 'components/credentials_card.dart';
import 'components/profile_card.dart';
import 'components/board_card.dart';
import 'components/aspirant_card.dart';
import 'components/college_card.dart';
import 'components/tutor_profile_card.dart';
import 'components/tutor_welcome_preview_card.dart';
import 'components/tutor_subjects_card.dart';
import 'components/tutor_test_card.dart';
import 'components/tutor_congrats_card.dart';
import 'components/tutor_payment_card.dart';
import 'components/tutor_id_card.dart';
import 'components/tutor_bank_card.dart';
import 'components/tutor_golive_card.dart';
import 'login_screen.dart';
import '../dashboard/dashboard_page.dart';

// ── LEARNER PAGES ──
// 0 = Welcome card
// 1 = Credentials
// 2 = Where did you hear?
// 3 = Academic / Non-Academic
// 4 = Subject (dynamic)
// 5 = How much do you know? (dynamic) / fun fact if Others
// 6 = Fun fact + mascot
// 7 = Profile (name, DOB, gender, category, location)
// 8 = Conditional: Student→Board, Aspirant→Exam, College→Course

// ── TUTOR PAGES ──
// 0 = Welcome card (shared)
// 1 = Credentials (shared)
// 2 = Tutor Profile (name, email, phone, gender, pincode, password)
// 3 = Welcome preview (animated 5-step roadmap)
// 4 = Subjects & Skills
// 5 = Qualification Test (MCQ + written)
// 6 = Congrats
// 7 = Payment (₹499)
// 8 = ID Verification
// 9 = Go Live

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  Role _selected = Role.learner;
  final _pageCtrl = PageController();
  int _page = 0;
  final Map<int, int> _sel = {};
  int? _profileCategory;
  bool _tutorPassed = false;
  bool _showWalkthrough = false;

  // Walkthrough keys
  final _roleToggleKey = GlobalKey();
  final _mascotKey = GlobalKey();
  final _getStartedKey = GlobalKey();
  final _loginKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    _checkFirstLaunch();
  }

  Future<void> _checkFirstLaunch() async {
    final prefs = await SharedPreferences.getInstance();
    final seen = prefs.getBool('walkthrough_seen') ?? false;
    if (!seen && mounted) {
      // Delay to let the first frame render so GlobalKeys have context
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) setState(() => _showWalkthrough = true);
      });
    }
  }

  Future<void> _dismissWalkthrough() async {
    setState(() => _showWalkthrough = false);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('walkthrough_seen', true);
  }

  // ── Role helpers ──
  bool get _isTutor => _selected == Role.tutor;
  String get _roleLabel => _isTutor ? 'Teach' : 'Learn';
  Color get _roleColor => _isTutor ? HG.orange : HG.blue;
  bool get _inOnboarding => _page > 0;

  // ── Learner page count ──
  bool get _needsPage8 => _profileCategory == 0 || _profileCategory == 1 || _profileCategory == 2;
  int get _learnerTotal => _needsPage8 ? 9 : 8;

  // ── Tutor page count ──
  int get _tutorTotal => 11;

  int get _totalPages => _isTutor ? _tutorTotal : _learnerTotal;

  // ── Step colors ──
  Color get _currentStepColor {
    if (_isTutor) return _tutorStepColor;
    switch (_page) {
      case 1: return steps[0].color;
      case 2: return steps[1].color;
      case 3: return steps[2].color;
      case 4: return steps[3].color;
      case 5: return steps[4].color;
      case 6: return steps[5].color;
      case 7: return steps[6].color;
      case 8: return _page8Color;
      default: return HG.blue;
    }
  }

  Color get _tutorStepColor {
    if (_page >= 1 && _page <= 10) return tutorSteps[_page - 1].color;
    return HG.orange;
  }

  Color get _page8Color {
    switch (_profileCategory) {
      case 0: return HG.green;
      case 1: return HG.orange;
      case 2: return const Color(0xFF6366F1);
      default: return HG.green;
    }
  }

  // ── Learner options/messages ──
  bool get _pickedOthers {
    final opts = _optionsForPage(4);
    final s = _sel[4];
    return s != null && s < opts.length && opts[s] == 'Others';
  }

  String? get _chosenSubject {
    if (_pickedOthers) return null;
    final opts = _optionsForPage(4);
    final s = _sel[4];
    return (s != null && s < opts.length) ? opts[s] : null;
  }

  List<String> _optionsForPage(int page) {
    switch (page) {
      case 2: return steps[1].options;
      case 3: return steps[2].options;
      case 4:
        final prev = _sel[3];
        if (prev == 0) return academicSubjects;
        if (prev == 1) return nonAcademicSubjects;
        return [];
      case 5:
        if (_pickedOthers) return [];
        final s = _chosenSubject ?? 'this';
        return ['I\'m new to $s', 'I know some basics', 'I can handle basic $s concepts', 'I can work with various $s topics', 'I can discuss most $s topics in detail'];
      default: return [];
    }
  }

  String _owlMsg(int page) {
    if (_isTutor) return _tutorOwlMsg(page);
    switch (page) {
      case 1: return steps[0].owlSays;
      case 2: return steps[1].owlSays;
      case 3: return steps[2].owlSays;
      case 4:
        final prev = _sel[3];
        if (prev == 0) return 'Nice! Which subject do you want to ace?';
        if (prev == 1) return 'Cool! What skill do you want to pick up?';
        return steps[3].owlSays;
      case 5:
        if (_pickedOthers) return 'No worries! Tell me what you\'re curious about.';
        if (_chosenSubject != null) return 'How much $_chosenSubject do you know? Be honest!';
        return steps[4].owlSays;
      case 6: return steps[5].owlSays;
      case 7: return steps[6].owlSays;
      case 8:
        if (_profileCategory == 0) return 'One more — what board and class are you in?';
        if (_profileCategory == 1) return 'Which exam are you grinding for?';
        if (_profileCategory == 2) return 'Tell me about your college life!';
        return '';
      default: return '';
    }
  }

  String _tutorOwlMsg(int page) {
    if (page >= 1 && page <= 10) return tutorSteps[page - 1].owlSays;
    return '';
  }

  String _title(int page) {
    if (page == 5 && !_isTutor) {
      if (_pickedOthers) return 'What interests you?';
      if (_chosenSubject != null) return 'How much $_chosenSubject do you know?';
    }
    final si = _stepIdxForPage(page);
    return si != null ? steps[si].title : '';
  }

  String _subtitle(int page) {
    if (page == 5 && !_isTutor) {
      if (_pickedOthers) return 'Tell us briefly so we can find the right tutor for you.';
      if (_chosenSubject != null) return 'This helps us find the right starting point.';
    }
    final si = _stepIdxForPage(page);
    return si != null ? steps[si].subtitle : '';
  }

  int? _stepIdxForPage(int page) {
    if (_isTutor) return null;
    if (page >= 2 && page <= 6) return page - 1;
    return null;
  }

  // ── Navigation ──
  void _goToPage(int page) {
    _pageCtrl.animateToPage(page, duration: const Duration(milliseconds: 500), curve: Curves.easeOutCubic);
  }

  void _onGetStarted() {
    HapticFeedback.mediumImpact();
    _goToPage(1);
  }

  void _onNext() {
    if (!_isTutor && _page >= 2 && _page <= 5) {
      final opts = _optionsForPage(_page);
      if (opts.isNotEmpty && !_sel.containsKey(_page)) return;
    }
    HapticFeedback.mediumImpact();
    // Skip step 5 (knowledge level) when Others is picked on step 4
    if (!_isTutor && _page == 4 && _pickedOthers) {
      _goToPage(6);
      return;
    }
    if (_page < _totalPages - 1) _goToPage(_page + 1);
  }

  void _onBack() {
    HapticFeedback.lightImpact();
    if (!_isTutor && _page == 6 && _pickedOthers) {
      _goToPage(4);
      return;
    }
    if (_page > 0) _goToPage(_page - 1);
  }

  void _onFinish() {
    HapticFeedback.mediumImpact();
    final role = _isTutor ? DashboardRole.tutor : DashboardRole.student;
    Navigator.pushAndRemoveUntil(
      context,
      PageRouteBuilder(
        pageBuilder: (_, __, ___) => DashboardPage(role: role),
        transitionDuration: const Duration(milliseconds: 500),
        transitionsBuilder: (_, anim, __, child) {
          final curved = CurvedAnimation(parent: anim, curve: Curves.easeOutCubic);
          return FadeTransition(opacity: curved, child: child);
        },
      ),
      (_) => false,
    );
  }

  @override
  void dispose() { _pageCtrl.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final mq = MediaQuery.of(context);
    final pt = mq.padding.top;
    final pb = mq.padding.bottom;
    final short = mq.size.height < 600;

    return PopScope(
      canPop: !_inOnboarding,
      onPopInvokedWithResult: (didPop, _) { if (!didPop && _inOnboarding) _onBack(); },
      child: AnnotatedRegion<SystemUiOverlayStyle>(
        value: context.hgSystemUi,
        child: Stack(children: [
          Scaffold(
          backgroundColor: HG.surface,
          body: Column(children: [
            Padding(
              padding: EdgeInsets.fromLTRB(20, pt + (short ? 16 : 24), 20, 0),
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 350),
                switchInCurve: Curves.easeOutCubic, switchOutCurve: Curves.easeInCubic,
                transitionBuilder: (child, anim) => FadeTransition(opacity: anim,
                  child: SizeTransition(sizeFactor: anim, axisAlignment: -1, child: child)),
                child: _inOnboarding
                    ? OnboardingHeader(key: const ValueKey('onboarding'), page: _page, totalSteps: _totalPages - 1,
                        stepColor: _currentStepColor, owlSays: _owlMsg(_page), onBack: _onBack)
                    : WelcomeHeader(key: const ValueKey('welcome'), roleLabel: _roleLabel, roleColor: _roleColor,
                        selected: _selected, short: short, roleToggleKey: _roleToggleKey,
                        onSelectLearner: () { if (_selected == Role.learner) return; HapticFeedback.selectionClick(); setState(() { _selected = Role.learner; _resetState(); }); },
                        onSelectTutor: () { if (_selected == Role.tutor) return; HapticFeedback.selectionClick(); setState(() { _selected = Role.tutor; _resetState(); }); }),
              ),
            ),
            SizedBox(height: short ? 12 : 20),
            Expanded(
              flex: 5,
              child: Padding(
                padding: EdgeInsets.fromLTRB(16, 0, 16, 0),
                child: PageView.builder(
                  controller: _pageCtrl, physics: const NeverScrollableScrollPhysics(),
                  onPageChanged: (i) => setState(() => _page = i),
                  itemCount: _totalPages,
                  itemBuilder: (context, index) {
                    return _isTutor ? _buildTutorPage(index, pb, short) : _buildLearnerPage(index, pb, short);
                  },
                ),
              ),
            ),
          ]),
        ),
          if (_showWalkthrough && _page == 0 && !_inOnboarding)
            WalkthroughOverlay(
              steps: [
                WalkthroughStep(
                  targetKey: _roleToggleKey,
                  title: 'You\'re a Learner',
                  description: 'Right now you\'re in Learn mode. This is where students find tutors and start learning.',
                  icon: Icons.school_rounded,
                  onShow: () => setState(() => _selected = Role.learner),
                ),
                WalkthroughStep(
                  targetKey: _roleToggleKey,
                  title: 'Switch to Teach',
                  description: 'Tap Teach to become a tutor! You can earn money by teaching what you know.',
                  icon: Icons.swap_horiz_rounded,
                  onShow: () => setState(() => _selected = Role.tutor),
                ),
                WalkthroughStep(
                  targetKey: _roleToggleKey,
                  title: 'Switch anytime',
                  description: 'You can always switch between Learn and Teach. Let\'s go back to Learn for now.',
                  icon: Icons.toggle_on_rounded,
                  onShow: () => setState(() => _selected = Role.learner),
                ),
                WalkthroughStep(targetKey: _mascotKey, title: 'Meet Hoot! 🦉', description: 'This is Hoot, your learning buddy. He\'ll guide you through the whole setup and cheer you on.', icon: Icons.pets_rounded, above: true),
                WalkthroughStep(targetKey: _getStartedKey, title: 'Ready to begin?', description: 'Tap Get Started to create your account. It only takes a minute!', icon: Icons.rocket_launch_rounded, above: true),
                WalkthroughStep(targetKey: _loginKey, title: 'Already a member?', description: 'If you\'ve signed up before, tap here to log back in.', icon: Icons.login_rounded, above: true),
              ],
              onComplete: _dismissWalkthrough,
            ),
        ]),
      ),
    );
  }

  void _resetState() {
    _sel.clear();
    _profileCategory = null;
    _tutorPassed = false;
    if (_page != 0) {
      _pageCtrl.jumpToPage(0);
      _page = 0;
    }
  }

  // ── LEARNER PAGES ──
  Widget _buildLearnerPage(int index, double pb, bool short) {
    switch (index) {
      case 0:
        return WelcomeCard(selected: _selected, short: short, pb: pb, onGetStarted: _onGetStarted, mascotKey: _mascotKey, getStartedKey: _getStartedKey, loginKey: _loginKey, onLogin: () {
          HapticFeedback.mediumImpact();
          Navigator.push(context, PageRouteBuilder(
            pageBuilder: (_, __, ___) => const LoginScreen(),
            transitionDuration: const Duration(milliseconds: 500), reverseTransitionDuration: const Duration(milliseconds: 400),
            opaque: false,
            transitionsBuilder: (_, anim, __, child) {
              final curved = CurvedAnimation(parent: anim, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic);
              return SlideTransition(position: Tween(begin: const Offset(0, 1), end: Offset.zero).animate(curved), child: child);
            },
          ));
        });

      case 1:
        return CredentialsCard(pb: pb, onNext: _onNext);

      case 7:
        return ProfileCard(
          pb: pb,
          onNext: () {
            HapticFeedback.mediumImpact();
            if (_needsPage8) { _goToPage(8); }
            else { _onFinish(); }
          },
          onCategoryChanged: (cat) => setState(() => _profileCategory = cat),
        );

      case 8:
        if (_profileCategory == 0) return BoardCard(pb: pb, onSubmit: _onFinish);
        if (_profileCategory == 1) return AspirantCard(pb: pb, onSubmit: _onFinish);
        if (_profileCategory == 2) return CollegeCard(pb: pb, onSubmit: _onFinish);
        return const SizedBox();

      default:
        final si = _stepIdxForPage(index);
        if (si == null || si >= steps.length) return const SizedBox();
        final opts = _optionsForPage(index);
        return StepCard(
          step: steps[si], stepIndex: si, isLast: false, pb: pb, options: opts,
          titleOverride: _title(index), subtitleOverride: _subtitle(index),
          selectedOption: _sel[index],
          canContinue: opts.isEmpty ? (index == 5 || index == 6) : _sel.containsKey(index),
          onSelectOption: (opt) {
            HapticFeedback.selectionClick();
            setState(() { _sel[index] = opt; if (index == 3) { _sel.remove(4); _sel.remove(5); } if (index == 4) _sel.remove(5); });
          },
          onNext: _onNext,
        );
    }
  }

  // ── TUTOR PAGES ──
  Widget _buildTutorPage(int index, double pb, bool short) {
    switch (index) {
      case 0:
        return WelcomeCard(selected: _selected, short: short, pb: pb, onGetStarted: _onGetStarted, mascotKey: _mascotKey, getStartedKey: _getStartedKey, loginKey: _loginKey, onLogin: () {
          HapticFeedback.mediumImpact();
          Navigator.push(context, PageRouteBuilder(
            pageBuilder: (_, __, ___) => const LoginScreen(),
            transitionDuration: const Duration(milliseconds: 500), reverseTransitionDuration: const Duration(milliseconds: 400),
            opaque: false,
            transitionsBuilder: (_, anim, __, child) {
              final curved = CurvedAnimation(parent: anim, curve: Curves.easeOutCubic, reverseCurve: Curves.easeInCubic);
              return SlideTransition(position: Tween(begin: const Offset(0, 1), end: Offset.zero).animate(curved), child: child);
            },
          ));
        });
      case 1: return CredentialsCard(pb: pb, onNext: _onNext);
      case 2: return TutorProfileCard(pb: pb, onNext: _onNext);
      case 3: return TutorWelcomePreviewCard(pb: pb, onNext: _onNext);
      case 4: return TutorSubjectsCard(pb: pb, onNext: _onNext);
      case 5: return TutorTestCard(pb: pb, onResult: (passed) {
        setState(() => _tutorPassed = passed);
        _onNext();
      });
      case 6: return TutorCongratsCard(pb: pb, passed: _tutorPassed, onNext: _tutorPassed ? _onNext : () {});
      case 7: return TutorPaymentCard(pb: pb, onNext: _onNext);
      case 8: return TutorIdCard(pb: pb, onNext: _onNext);
      case 9: return TutorBankCard(pb: pb, onNext: _onNext);
      case 10: return TutorGoLiveCard(pb: pb, onFinish: _onFinish);
      default: return const SizedBox();
    }
  }
}
