package com.awesomeproject;

import android.widget.Toast;

import com.awesomeproject.JSBridgeLibrary.Android.Log.JJRNBLog;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

<<<<<<< HEAD
class AA extends ReactContextBaseJavaModule
{
    public AA(ReactApplicationContext reactContext)
    {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AA";
    }

    @ReactMethod
    public void show()
    {
        Toast.makeText(getReactApplicationContext(), "1234", Toast.LENGTH_LONG).show();
    }

    @ReactMethod void callBack(String text, Callback callback)
    {
        callback.invoke("1234");
    }
}

=======
>>>>>>> origin/master
class AnExampleReactPackage implements ReactPackage
{
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new JJRNBLog(reactContext));
        return modules;
    }
}

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "WeatherTestApp";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(), new AnExampleReactPackage()
        );
    }
}
