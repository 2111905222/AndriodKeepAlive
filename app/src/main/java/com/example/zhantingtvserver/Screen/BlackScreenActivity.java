package com.example.zhantingtvserver.Screen;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.Window;
import android.view.WindowManager;

import androidx.annotation.Nullable;

import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.KeepAlive.Andriod5.OnePixelActivity;
import com.example.zhantingtvserver.KeepAlive.Andriod5.OnePixelManager;
import com.example.zhantingtvserver.Utils.ActivityController;

public class BlackScreenActivity extends Activity {
    private static final String TAG = "[BlackScreenActivity]";
    public static BlackScreenActivity instance = null;
    public boolean isKeepAlive = false;
    @SuppressLint("RtlHardcoded")
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Window window = getWindow();
        window.setGravity(Gravity.LEFT|Gravity.TOP);
        WindowManager.LayoutParams params = window.getAttributes();
        params.x = 0;
        params.y = 0;
        params.height = 1;
        params.width = 1;
        window.setAttributes(params);
        instance = this;
        Configure.tvState = false;
        System.out.println("设置状态" + Configure.tvState);
    }

    public void hide(){
        finish();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Configure.tvState = true;
        System.out.println("设置状态" + Configure.tvState);

    //    Log.e(TAG,"onDestroy");
    }

    @Override
    protected void onStop() {
        super.onStop();
   //     Log.e(TAG,"onStop");
    }

    @Override
    protected void onPause() {
        super.onPause();
  //      Log.e(TAG,"onPause");
    }

    @Override
    protected void onStart() {
        super.onStart();
    //    Log.e(TAG,"onStart");
    }

    @Override
    protected void onResume() {
        super.onResume();
    //    Log.e(TAG,"onResume");
    }
}
