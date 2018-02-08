package com.reactnativeframework;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by jincieryi on 16/7/26.
 */

public class JJRNBLog extends ReactContextBaseJavaModule {
    public JJRNBLog(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "JJRNBLog";
    }

    @ReactMethod
    public void debug(String message){
        Log.d("", message);
    }
}
