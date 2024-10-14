package com.example.zhantingtvserver.KeepAlive.Andriod5;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.example.zhantingtvserver.Application;
import com.example.zhantingtvserver.Config.Configure;


public class OnePixelReceiver extends BroadcastReceiver {
    private static final String TAG = "[OnePixelReceiver]";
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (OnePixelManager.getInstance() != null) {
            if (Intent.ACTION_SCREEN_ON.equals(action)) {//如果亮屏，则关闭1像素Activity
                System.out.println("[OnePixelReceiver]停止startOnePixelActivity");
                Configure.tvState = true;
                OnePixelManager.getInstance().finishOnePixelActivity();
            } else if (Intent.ACTION_SCREEN_OFF.equals(action)) {//如果息屏，则开启1像素Activity
                System.out.println(TAG + "开始startOnePixelActivity");
                Configure.tvState = false;
                OnePixelManager.getInstance().startOnePixelActivity(context);
            }
        }
    }
}
