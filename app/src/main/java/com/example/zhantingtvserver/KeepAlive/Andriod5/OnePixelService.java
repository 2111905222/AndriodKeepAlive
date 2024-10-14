package com.example.zhantingtvserver.KeepAlive.Andriod5;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.example.zhantingtvserver.Application;
import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.Config.ScreenObserver;
import com.example.zhantingtvserver.TvOnline;
import com.example.zhantingtvserver.Utils.LogUtils;

public class OnePixelService extends Service {
    private static final String CHANNEL_ID = NotificationChannel.EDIT_IMPORTANCE;
    TvOnline tvOnline;
    String TAG = "OnePixelService";
    public static final int SERVICE_ID = 0x11;
    private ScreenObserver mScreenObserver;
      // 管理是否打开1像素通知的

    public OnePixelService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void onCreate() {
        super.onCreate();
        LogUtils.setInfoTagLog(TAG, " onCreate");
        tvOnline = new TvOnline(this);
        mScreenObserver = new ScreenObserver(this);
        mScreenObserver.requestScreenStateUpdate(new ScreenObserver.ScreenStateListener() {
            @Override
            public void onScreenOn() {
                System.out.println("屏幕亮了");
            }

            @Override
            public void onScreenOff() {
                System.out.println("屏幕关了");
            }
        });
    }

    @SuppressLint("ForegroundServiceType")
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        LogUtils.setInfoTagLog(TAG, " onStartCommand");
        if (Build.VERSION.SDK_INT < 18) {//Android4.3以下版本
            //将Service设置为前台服务，可以取消通知栏消息
            startForeground(SERVICE_ID, new Notification());
            Log.i(TAG, "onStartCommand: 111");

        } else if (Build.VERSION.SDK_INT < 24) {//Android4.3 - 7.0之间

            Log.i(TAG, "onStartCommand: 222");
            //将Service设置为前台服务，可以取消通知栏消息
            startForeground(SERVICE_ID, new Notification());
            startService(new Intent(this, InnerService.class));
        } else {//Android 8.0以上
            Log.i(TAG, "onStartCommand:333 ");
            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            if (manager != null) {
                NotificationChannel channel = null;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    channel = new NotificationChannel(CHANNEL_ID, "abc", NotificationManager.IMPORTANCE_NONE);
                    manager.createNotificationChannel(channel);
                }
                Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID).build();
                //将Service设置为前台服务,Android 8.0 App启动不会弹出通知栏消息，退出后台会弹出通知消息
                //Android9.0启动时候会立刻弹出通知栏消息
                startForeground(SERVICE_ID, notification);
            }
        }
        return super.onStartCommand(intent, flags, startId);
        //return START_STICKY;  // 如果service进程被kill掉，保留service的状态为开始状态，但不保留递送的intent对象。随后系统会尝试重新创建service，由于服务状态为开始状态，
        // 所以创建服务后一定会调用onStartCommand(Intent,int,int)方法。如果在此期间没有任何启动命令被传递到service，那么参数Intent将为null。
    }

    @Override
    public void onDestroy() {
        LogUtils.setInfoTagLog(TAG, " onDestroy");
        if(OnePixelManager.getInstance() != null){
            OnePixelManager.getInstance().unregisterOnePixelReceiver(Configure.context);
        }
        if(tvOnline != null){
            tvOnline.closeMq();
        }
    }


    public static class InnerService extends Service {
        private static final String TAG = "InnerService";
        @Override
        public IBinder onBind(Intent intent) {

            return null;

        }

        @SuppressLint("ForegroundServiceType")
        @Override

        public int onStartCommand(Intent intent,int flags,int startId) {

            Log.i(TAG,"onStartCommand: 99999999999999");

            startForeground(SERVICE_ID,new Notification());

            stopForeground(true);//移除通知栏消息

            stopSelf();

            return super.onStartCommand(intent,flags,startId);

        }

    }


}