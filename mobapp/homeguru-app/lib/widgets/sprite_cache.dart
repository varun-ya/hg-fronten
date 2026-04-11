import 'dart:ui' as ui;
import 'package:flutter/services.dart';

class SpriteCache {
  static final _cache = <String, ui.Image>{};
  static final _loading = <String, Future<ui.Image>>{};

  static Future<ui.Image> load(String asset) {
    if (_cache.containsKey(asset)) return Future.value(_cache[asset]!);
    return _loading.putIfAbsent(asset, () async {
      final data = await rootBundle.load(asset);
      final codec = await ui.instantiateImageCodec(data.buffer.asUint8List(), allowUpscaling: false);
      final frame = await codec.getNextFrame();
      codec.dispose();
      _cache[asset] = frame.image;
      _loading.remove(asset);
      return frame.image;
    });
  }
}
