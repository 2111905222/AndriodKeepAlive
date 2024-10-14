package com.example.zhantingtvserver.KeepAlive.Andriod5;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;

import android.util.Log;
import android.view.Gravity;
import android.view.Window;
import android.view.WindowManager;

import androidx.annotation.Nullable;

import com.example.zhantingtvserver.Application;
import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.Utils.ActivityController;

import java.util.Timer;
import java.util.TimerTask;

public class OnePixelActivity extends Activity{
    private static final String TAG = "[OnePixelActivity]";
    public static OnePixelActivity instance = null;
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
        if(OnePixelManager.getInstance() != null){
            System.out.println("注册activity");
            OnePixelManager.getInstance().setKeepAliveReference(this);//将引用传给OnePixelManager
            ActivityController.addActivity(this);
            instance = this;
        }
        else{
            System.out.println("manager为空");
        }
        Log.e(TAG,"onCreate");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.e(TAG,"onDestroy");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.e(TAG,"onStop");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.e(TAG,"onPause");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.e(TAG,"onStart");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.e(TAG,"onResume");
        if(!isKeepAlive){
            isKeepAlive = true;
            System.out.println("屏幕不亮时需要保活");
        }
        else{
            finish();
            System.out.println("屏幕亮时不需要保活");
        }
//        Timer timer = new Timer();
//        timer.schedule(new TimerTask() {
//            @Override
//            public void run() {
//                if(Configure.tvState){
//                    System.out.println("关闭屏关时得保活");
//                    finish();
//                }
//                else {
//                    System.out.println("不需要关闭屏关时得保活");
//                }
//            }
//        }, 3000);
    }
}
