import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../theme.dart';
import 'step_data.dart';

class BoardCard extends StatefulWidget {
  final double pb;
  final VoidCallback onSubmit;
  const BoardCard({super.key, required this.pb, required this.onSubmit});

  @override
  State<BoardCard> createState() => _BoardCardState();
}

class _BoardCardState extends State<BoardCard> {
  int? _board;
  int? _class;
  final _school = TextEditingController();

  bool get _ok => _board != null && _class != null;
  List<String> get _classes => _board != null ? classesForBoard(_board!) : [];

  @override
  void dispose() { _school.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: HG.white,
        border: Border.all(color: HG.grey200),
        borderRadius: BorderRadius.circular(28),
      ),
      child: Column(children: [
        const SizedBox(height: 28),
        Text('Your school details', textAlign: TextAlign.center,
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: HG.dark, letterSpacing: -0.3)),
        const SizedBox(height: 6),
        Text('So we can match the right syllabus.', textAlign: TextAlign.center,
          style: TextStyle(fontSize: 13, color: HG.textMuted)),
        const SizedBox(height: 24),

        // Board
        Padding(
          padding: EdgeInsets.only(left: 24, bottom: 10),
          child: Align(alignment: Alignment.centerLeft,
            child: Text('BOARD', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.textLight, letterSpacing: 1))),
        ),
        SizedBox(
          height: 44,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: EdgeInsets.symmetric(horizontal: 24),
            itemCount: boards.length,
            separatorBuilder: (_, __) => const SizedBox(width: 8),
            itemBuilder: (_, i) {
              final on = _board == i;
              return GestureDetector(
                onTap: () { HapticFeedback.selectionClick(); setState(() { _board = i; _class = null; }); },
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  decoration: BoxDecoration(
                    color: on ? HG.green.withValues(alpha: 0.08) : HG.grey50,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: on ? HG.green.withValues(alpha: 0.4) : HG.grey200, width: on ? 1.5 : 1),
                  ),
                  alignment: Alignment.center,
                  child: Text(boards[i], style: TextStyle(
                    fontSize: 14, fontWeight: on ? FontWeight.w600 : FontWeight.w400, color: on ? HG.green : HG.dark)),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 20),

        // Class
        if (_board != null) ...[
          Padding(
            padding: EdgeInsets.only(left: 24, bottom: 10),
            child: Align(alignment: Alignment.centerLeft,
              child: Text('CLASS', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: HG.textLight, letterSpacing: 1))),
          ),
          Expanded(
            child: GridView.builder(
              padding: EdgeInsets.symmetric(horizontal: 24),
              physics: const BouncingScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 4, mainAxisSpacing: 8, crossAxisSpacing: 8, childAspectRatio: 1.6,
              ),
              itemCount: _classes.length,
              itemBuilder: (_, i) {
                final on = _class == i;
                return GestureDetector(
                  onTap: () { HapticFeedback.selectionClick(); setState(() => _class = i); },
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    decoration: BoxDecoration(
                      color: on ? HG.green.withValues(alpha: 0.08) : HG.grey50,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: on ? HG.green.withValues(alpha: 0.4) : HG.grey200, width: on ? 1.5 : 1),
                    ),
                    alignment: Alignment.center,
                    child: Text(_classes[i], style: TextStyle(
                      fontSize: 14, fontWeight: on ? FontWeight.w600 : FontWeight.w400, color: on ? HG.green : HG.dark)),
                  ),
                );
              },
            ),
          ),
        ] else
          Expanded(child: Center(
            child: Text('Pick a board first', style: TextStyle(fontSize: 14, color: HG.textLight)),
          )),

        // School name (optional)
        Padding(
          padding: EdgeInsets.fromLTRB(24, 8, 24, 8),
          child: Container(
            decoration: BoxDecoration(
              color: HG.grey50, borderRadius: BorderRadius.circular(14),
              border: Border.all(color: HG.grey200),
            ),
            child: TextField(
              controller: _school,
              textInputAction: TextInputAction.done,
              style: TextStyle(fontSize: 14, color: HG.dark, fontFamily: HG.font),
              decoration: InputDecoration(
                hintText: 'School name (optional)',
                hintStyle: TextStyle(fontSize: 14, color: HG.textLight),
                contentPadding: EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                border: InputBorder.none,
              ),
            ),
          ),
        ),

        // Submit
        Padding(
          padding: EdgeInsets.fromLTRB(24, 4, 24, widget.pb + 20),
          child: _M3SubmitButton(
            enabled: _ok,
            onTap: () { HapticFeedback.mediumImpact(); widget.onSubmit(); },
          ),
        ),
      ]),
    );
  }
}

class _M3SubmitButton extends StatefulWidget {
  final bool enabled;
  final VoidCallback onTap;
  const _M3SubmitButton({required this.enabled, required this.onTap});
  @override
  State<_M3SubmitButton> createState() => _M3SubmitButtonState();
}

class _M3SubmitButtonState extends State<_M3SubmitButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: widget.enabled ? (_) => setState(() => _pressed = true) : null,
      onTapUp: widget.enabled ? (_) { setState(() => _pressed = false); widget.onTap(); } : null,
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.97 : 1.0,
        duration: const Duration(milliseconds: 100),
        curve: Curves.easeOut,
        child: AnimatedOpacity(
          duration: const Duration(milliseconds: 250),
          opacity: widget.enabled ? 1.0 : 0.35,
          child: Container(
            width: double.infinity,
            height: 56,
            decoration: BoxDecoration(
              color: HG.green,
              borderRadius: BorderRadius.circular(100),
              boxShadow: widget.enabled ? [
                BoxShadow(color: HG.green.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4)),
                BoxShadow(color: HG.green.withValues(alpha: 0.15), blurRadius: 4, offset: const Offset(0, 1)),
              ] : null,
            ),
            child: Center(
              child: Text("Let's Go!", style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: HG.white, letterSpacing: 0.1)),
            ),
          ),
        ),
      ),
    );
  }
}
