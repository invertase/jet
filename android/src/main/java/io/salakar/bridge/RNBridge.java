package io.salakar.bridge;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class RNBridge extends ReactContextBaseJavaModule {
    RNBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private ReactInstanceManager getReactInstanceManager() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) return null;
        ReactApplication reactApplication = (ReactApplication) currentActivity.getApplication();
        return reactApplication.getReactNativeHost().getReactInstanceManager();
    }


    /**
     * Reload JS Bundle
     */
    @ReactMethod
    public void reload() {
        final ReactInstanceManager instanceManager = getReactInstanceManager();
        if (instanceManager == null) return;

        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                instanceManager.recreateReactContextInBackground();
            }
        });
    }

    /**
     * Toggle remote debugging
     *
     * @param value true/false
     */
    @ReactMethod
    public void debug(Boolean value) {
        final ReactInstanceManager instanceManager = getReactInstanceManager();
        if (instanceManager == null) return;

        instanceManager.getDevSupportManager().getDevSettings().setRemoteJSDebugEnabled(value);
        reload();
    }

    @Override
    public String getName() {
        return "RNBridge";
    }

}
