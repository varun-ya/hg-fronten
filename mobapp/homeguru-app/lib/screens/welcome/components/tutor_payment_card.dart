import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import '../../../theme.dart';

class TutorPaymentCard extends StatefulWidget {
  final double pb;
  final VoidCallback onNext;
  const TutorPaymentCard({super.key, required this.pb, required this.onNext});

  @override
  State<TutorPaymentCard> createState() => _TutorPaymentCardState();
}

class _TutorPaymentCardState extends State<TutorPaymentCard> {
  late final Razorpay _razorpay;
  bool _paid = false;
  bool _processing = false;

  @override
  void initState() {
    super.initState();
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _onSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _onError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _onExternal);
  }

  @override
  void dispose() { _razorpay.clear(); super.dispose(); }

  void _onSuccess(PaymentSuccessResponse res) {
    if (mounted) setState(() { _paid = true; _processing = false; });
  }

  void _onError(PaymentFailureResponse res) {
    if (mounted) setState(() => _processing = false);
  }

  void _onExternal(ExternalWalletResponse res) {}

  void _openCheckout() {
    setState(() => _processing = true);
    _razorpay.open({
      'key': 'rzp_test_SaRLWC9tRdlI8U',
      'amount': 49900, // ₹499 in paise
      'name': 'HomeGuru',
      'description': 'Annual Tutor Listing Fee',
      'prefill': {'contact': '', 'email': ''},
      'theme': {'color': '#E08A3C'},
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
          border: Border.all(color: HG.grey200),
          borderRadius: BorderRadius.circular(28),
        ),
        child: Stack(children: [
          // Gradient background
          Positioned.fill(child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(28)),
              gradient: LinearGradient(
                begin: Alignment.topLeft, end: Alignment.bottomRight,
                colors: [Color(0xFFFFFBF5), HG.white, Color(0xFFF5F0FF)],
              ),
            ),
          )),
          _paid ? _buildSuccess() : _buildPayment(),
        ]),
    );
  }

  Widget _buildPayment() {
    return Column(children: [
      const SizedBox(height: 28),
      Text('Annual Listing Fee', textAlign: TextAlign.center, style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 6),
      Padding(padding: EdgeInsets.symmetric(horizontal: 32),
        child: Text('Get visible to thousands of students across India.', textAlign: TextAlign.center, style: TextStyle(fontSize: 13, color: HG.textMuted))),
      const Spacer(),

      // Price card with gradient border
      Padding(padding: EdgeInsets.symmetric(horizontal: 28), child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: const LinearGradient(colors: [Color(0xFFE08A3C), Color(0xFF8B5CF6)]),
          boxShadow: [BoxShadow(color: HG.orange.withValues(alpha: 0.15), blurRadius: 20, offset: const Offset(0, 8))],
        ),
        child: Container(
          margin: EdgeInsets.all(1.5),
          padding: EdgeInsets.all(24),
          decoration: BoxDecoration(color: HG.white, borderRadius: BorderRadius.circular(19)),
          child: Column(children: [
            // Price
            ShaderMask(
              shaderCallback: (bounds) => const LinearGradient(colors: [Color(0xFFE08A3C), Color(0xFF8B5CF6)]).createShader(bounds),
              child: Text('\u20b9499', style: TextStyle(fontSize: 48, fontWeight: FontWeight.w600, color: HG.white, height: 1)),
            ),
            const SizedBox(height: 4),
            Text('per year', style: TextStyle(fontSize: 13, color: HG.textMuted)),
            const SizedBox(height: 20),
            ...['Profile listed on HomeGuru', 'Visible to all students in your area', 'Access to teaching tools & dashboard', 'Priority support from our team'].map((t) => Padding(
              padding: EdgeInsets.symmetric(vertical: 4),
              child: Row(children: [
                Container(
                  width: 18, height: 18,
                  decoration: BoxDecoration(color: HG.green.withValues(alpha: 0.1), shape: BoxShape.circle),
                  child: Icon(Icons.check_rounded, size: 10, color: HG.green),
                ),
                const SizedBox(width: 10),
                Expanded(child: Text(t, style: TextStyle(fontSize: 14, color: HG.dark))),
              ]),
            )),
          ]),
        ),
      )),

      const SizedBox(height: 14),
      Padding(
        padding: EdgeInsets.symmetric(horizontal: 28),
        child: Row(children: [
          Icon(PhosphorIconsFill.shieldCheck, size: 14, color: HG.green),
          const SizedBox(width: 6),
          Text('Secure payment \u00b7 Renews annually', style: TextStyle(fontSize: 12, color: HG.textMuted)),
        ]),
      ),
      const Spacer(),

      // Pay button with gradient
      Padding(
        padding: EdgeInsets.fromLTRB(24, 8, 24, widget.pb + 24),
        child: GestureDetector(
          onTap: _processing ? null : _openCheckout,
          child: AnimatedOpacity(
            duration: const Duration(milliseconds: 250), opacity: _processing ? 0.6 : 1.0,
            child: Container(
              width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(100),
                gradient: const LinearGradient(colors: [Color(0xFFE08A3C), Color(0xFFD97706)]),
                boxShadow: [BoxShadow(color: HG.orange.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.orange.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1))],
              ),
              child: Center(child: _processing
                  ? SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: HG.white))
                  : Row(mainAxisSize: MainAxisSize.min, children: [
                      Icon(PhosphorIconsBold.lock, size: 14, color: HG.white),
                      const SizedBox(width: 8),
                      Text('Pay \u20b9499', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white)),
                    ])),
            ),
          ),
        ),
      ),
    ]);
  }

  Widget _buildSuccess() {
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Container(
        width: 64, height: 64,
        decoration: BoxDecoration(color: Color(0xFFF0FDF4), shape: BoxShape.circle),
        child: Icon(Icons.check_circle_rounded, size: 32, color: HG.green),
      ),
      const SizedBox(height: 20),
      Text('Payment Successful!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
      const SizedBox(height: 8),
      Padding(padding: EdgeInsets.symmetric(horizontal: 40),
        child: Text('Your listing fee has been paid. Just one more step to go live!', textAlign: TextAlign.center, style: TextStyle(fontSize: 13, color: HG.textMuted, height: 1.5))),
      const SizedBox(height: 32),
      Padding(
        padding: EdgeInsets.symmetric(horizontal: 24),
        child: GestureDetector(
          onTap: widget.onNext,
          child: Container(
            width: double.infinity, padding: EdgeInsets.symmetric(vertical: 16),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(100),
              gradient: const LinearGradient(colors: [Color(0xFFE08A3C), Color(0xFFD97706)]),
              boxShadow: [BoxShadow(color: HG.orange.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)), BoxShadow(color: HG.orange.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1))],
            ),
            child: Center(child: Text('Continue', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white))),
          ),
        ),
      ),
    ]);
  }
}
