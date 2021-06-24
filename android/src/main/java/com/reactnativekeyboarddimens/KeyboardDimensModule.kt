package com.reactnativekeyboarddimens

import android.R
import android.content.Context
import android.graphics.Point
import android.graphics.Rect
import android.os.Build
import android.util.DisplayMetrics
import android.view.View
import android.view.ViewTreeObserver.OnGlobalLayoutListener
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

class KeyboardDimensModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

  override fun getName(): String {
    return "KeyboardDimens"
  }

  @ReactMethod
  fun init() {
    reactApplicationContext.addLifecycleEventListener(this)
  }

  override fun onHostResume() {
    UiThreadUtil.runOnUiThread {
      val mRootWindow = currentActivity!!.window
      val mRootView = mRootWindow.decorView.findViewById<View>(R.id.content)
      mRootView.viewTreeObserver
        .addOnGlobalLayoutListener(object : OnGlobalLayoutListener {
          private var systemNavigationBarHeight: Int? = null
          override fun onGlobalLayout() {
            val heightDifference = getHeightDifference(mRootView)
            if (heightDifference > 0) {
              if (systemNavigationBarHeight == null) {
                /* Get layout height when the layout was created at first time */
                systemNavigationBarHeight = heightDifference
              }
            } else {
              systemNavigationBarHeight = 0
            }
            if (heightDifference > getDefaultNavigationBarHeight()) {
              /* Keyboard opened */
              val keyBoardHeight = heightDifference - systemNavigationBarHeight!!
              val dpHeight = convertPixelsToDp(keyBoardHeight.toFloat(), reactApplicationContext)
              reactApplicationContext
                .getJSModule(RCTDeviceEventEmitter::class.java)
                .emit("keyboardHeightChange", dpHeight)
            } else {
              /* Keyboard closed */
            }
          }
        })
    }
  }

  override fun onHostPause() {

  }

  override fun onHostDestroy() {

  }

  private fun getHeightDifference(rootView: View): Int {
    val screenSize = Point()
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
      currentActivity!!.windowManager.defaultDisplay.getRealSize(screenSize)
    } else {
      currentActivity!!.windowManager.defaultDisplay.getSize(screenSize)
    }
    val rect = Rect()
    rootView.getWindowVisibleDisplayFrame(rect)
    return screenSize.y - rect.bottom
  }

  private fun getDefaultNavigationBarHeight(): Int {
    val resourceId = currentActivity!!.resources.getIdentifier("navigation_bar_height", "dimen", "android")
    return if (resourceId > 0) {
      currentActivity!!.resources.getDimensionPixelSize(resourceId)
    } else 100
  }

  private fun convertPixelsToDp(px: Float, context: Context): Float {
    return px / (context.resources.displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
  }

}
