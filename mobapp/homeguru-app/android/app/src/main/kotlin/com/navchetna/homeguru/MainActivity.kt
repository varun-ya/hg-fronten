package com.navchetna.homeguru

import android.app.Activity
import android.app.PictureInPictureParams
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.media.projection.MediaProjectionManager
import android.os.Build
import android.util.Rational
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity() {
    private val PIP_CHANNEL = "com.navchetna.homeguru/pip"
    private val SCREEN_CHANNEL = "com.navchetna.homeguru/screen"
    private var inCall = false

    private var screenCaptureResult: MethodChannel.Result? = null
    private val SCREEN_CAPTURE_REQUEST = 1001

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        // PiP channel
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, PIP_CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "setInCall" -> {
                    inCall = call.argument<Boolean>("active") ?: false
                    result.success(null)
                }
                "enterPip" -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        val params = PictureInPictureParams.Builder()
                            .setAspectRatio(Rational(16, 9))
                            .build()
                        enterPictureInPictureMode(params)
                        result.success(true)
                    } else {
                        result.success(false)
                    }
                }
                else -> result.notImplemented()
            }
        }

        // Screen capture channel
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, SCREEN_CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "requestScreenCapture" -> {
                    screenCaptureResult = result
                    val mpm = getSystemService(Context.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
                    startActivityForResult(mpm.createScreenCaptureIntent(), SCREEN_CAPTURE_REQUEST)
                }
                else -> result.notImplemented()
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == SCREEN_CAPTURE_REQUEST) {
            if (resultCode == Activity.RESULT_OK) {
                screenCaptureResult?.success(mapOf("granted" to true))
            } else {
                screenCaptureResult?.success(mapOf("granted" to false))
            }
            screenCaptureResult = null
        }
    }

    override fun onUserLeaveHint() {
        super.onUserLeaveHint()
        if (inCall && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val params = PictureInPictureParams.Builder()
                .setAspectRatio(Rational(16, 9))
                .build()
            enterPictureInPictureMode(params)
        }
    }

    override fun onPictureInPictureModeChanged(isInPictureInPictureMode: Boolean, newConfig: Configuration) {
        super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig)
        flutterEngine?.dartExecutor?.binaryMessenger?.let { messenger ->
            MethodChannel(messenger, PIP_CHANNEL).invokeMethod(
                "onPipChanged",
                mapOf("isInPip" to isInPictureInPictureMode)
            )
        }
    }
}
