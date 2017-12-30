package com.Android;

/**
 * Created by jincieryi on 16/7/26.
 */

public class JJRNBLog {
    public JJRNBLog(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void debug(String message){
        Log.d(message);
    }
}
