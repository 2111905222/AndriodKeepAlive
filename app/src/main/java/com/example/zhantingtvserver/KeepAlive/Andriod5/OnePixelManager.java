package com.example.zhantingtvserver.KeepAlive.Andriod5;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import java.lang.ref.WeakReference;

public class OnePixelManager {
    private static final String TAG = "[OnePixelManager]";
    private static WeakReference<Activity> mActivity;
    private static OnePixelReceiver onePixelReceiver;
    public static OnePixelManager onePixelManager = new OnePixelManager();

    public static OnePixelManager getInstance() {
        if (onePixelManager == null) {
            synchronized (OnePixelManager.class)
            {
                if (onePixelManager == null) {
                    onePixelManager = new OnePixelManager();
                }
            }
        }
        return onePixelManager;
    }
    //getInstance
    /**
     * 一像素广播接收者注册方法。该方法中初始化OnePixelReceiver，并添加了过滤条件
     * 屏幕息屏和亮屏。然后注册该广播接收者
     * @param context
     */
    public void registerOnePixelReceiver(Context context){
        IntentFilter filter = new IntentFilter();
        filter.addAction(Intent.ACTION_SCREEN_OFF);
        filter.addAction(Intent.ACTION_SCREEN_ON);
        onePixelReceiver = new OnePixelReceiver();
        context.registerReceiver(onePixelReceiver,filter);
    }


    /**
     * 对广播接收者进行解注册
     * @param context
     */
    public void unregisterOnePixelReceiver(Context context){
        if (null != onePixelReceiver){
            context.unregisterReceiver(onePixelReceiver);
        }
    }

    /**
     * 开启一像素Activity
     * @param context
     */
    public void startOnePixelActivity(Context context){
        Intent intent = new Intent();
        intent.setClass(context,OnePixelActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK );
        context.startActivity(intent);
    }

    /**
     * 关闭一像素Activity
     */
    public void finishOnePixelActivity(){
        if(null!=mActivity){
            Activity activity = mActivity.get();
            if(null!=activity){
                activity.finish();
                System.out.println("finishOnePixelActivity");
            }
            else{
                System.out.println("activity is null");
            }
            mActivity = null;
        }
        else{
            System.out.println("mActivity is null");
        }
    }

    /**
     * 使用弱引用获取一像素的上下文
     * @param activity
     */
    public void setKeepAliveReference(OnePixelActivity activity){
        mActivity = new WeakReference<Activity>(activity);
    }

}

