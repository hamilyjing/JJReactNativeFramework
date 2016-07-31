package com.Android;

/**
 * Created by jincieryi on 16/7/26.
 */

public class JJRNBLog {
    public JJRNBLogModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void jjLogFromJS(String message){
        Log.d(message);
    }
}
