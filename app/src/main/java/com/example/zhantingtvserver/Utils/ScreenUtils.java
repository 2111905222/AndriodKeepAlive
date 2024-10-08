package com.example.zhantingtvserver.Utils;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.PowerManager;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.KeepAlive.Andriod5.OnePixelService;

public class ScreenUtils {

    public static String TAG = "ScreenUtils";
    //获取当前屏幕的状态 true:亮屏   false:熄屏
    public static boolean getScreenStatus(Context context)
    {
        PowerManager pm = (PowerManager)context.getSystemService(Context.POWER_SERVICE);
        boolean screenOn = pm.isScreenOn();
        return screenOn;
    }

    public static int screenControl(String control){
//        if (Build.VERSION.SDK_INT < 18) {//Android4.3以下版本
//
//
//        } else if (Build.VERSION.SDK_INT < 24) {//Android4.3 - 7.0之间
//
//
//        } else
        if(Build.VERSION.SDK_INT <= 29){//Android 10.0以下
            if(control.equals("on")){
                return screenOn();
            }else if(control.equals("off")){
                return screenOff();
            }
        }
        else{
            if(control.equals("on")){
                return screenOnOrOffAndroid10_12();
            }else if(control.equals("off")){
                return screenOnOrOffAndroid10_12();
            }
        }
        return 0;
    }

    /**
     * Andriod10-12的亮屏操作
     */
    public static int screenOnOrOffAndroid10_12() {
        return RootShell.execRootCmd("input keyevent KEYCODE_POWER");
    }
    /**
     * 亮屏
     */
    public static int screenOn(){

        PowerManager pm = (PowerManager) Configure.context.getSystemService(Context.POWER_SERVICE);
        @SuppressLint("InvalidWakeLockTag") PowerManager.WakeLock wakeLock = pm.newWakeLock(PowerManager.SCREEN_BRIGHT_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP, TAG);
        try {
            wakeLock.acquire(10*1000L /*10 minutes*/);
        }
        catch (RuntimeException e){
            LogUtils.setInfoTagLog(TAG, "点亮屏幕超时 ");
            return 0;
        }
        wakeLock.release();
        System.out.println("已点亮屏幕");
        return 1;
    }

    /**
     *@function:
     *        熄屏
     * @author smt
     * 2023/10/19
     *
     * */
    public static int screenOff() {
       // ComponentName adminReceiver = new ComponentName(context, ScreenOffAdminReceiver.class);;
        DevicePolicyManager policyManager = (DevicePolicyManager) Configure.context.getSystemService(Context.DEVICE_POLICY_SERVICE);
        try {
            policyManager.lockNow();
        }
        catch (RuntimeException e){
            LogUtils.setInfoTagLog(TAG, "关闭屏幕超时 ");
            return 0;
        }

        return 1;
    }
}
