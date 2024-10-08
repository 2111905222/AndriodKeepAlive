package com.example.zhantingtvserver.KeepAlive.Andriod6;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;

import com.example.zhantingtvserver.R;
import com.example.zhantingtvserver.TvOnline;
import com.example.zhantingtvserver.Utils.LogUtils;

public class KeepLiveService extends Service {

    public static final int NOTIFICATION_ID=0x11;
    private String TAG = "KeepLiveService";
    private TvOnline tvOnline;
    public KeepLiveService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @SuppressLint("ForegroundServiceType")
    @Override
    public void onCreate() {
        super.onCreate();
        //API 18以下，直接发送Notification并将其置为前台
        if (Build.VERSION.SDK_INT <Build.VERSION_CODES.JELLY_BEAN_MR2) {
            startForeground(NOTIFICATION_ID, new Notification());
        } else {
            //API 18以上，发送Notification并将其置为前台后，启动InnerService
            Notification.Builder builder = new Notification.Builder(this);
            builder.setSmallIcon(R.mipmap.ic_launcher);
            startForeground(NOTIFICATION_ID, builder.build());
            LogUtils.setInfoTagLog(TAG, "onCreate：开始显示通知图标");
            //startService(new Intent(this, InnerService.class));
        }

    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        tvOnline = new TvOnline(this);
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        LogUtils.setInfoTagLog(TAG, " onDestroy");
    }

    public  static class  InnerService extends Service{
        private String TAG = "InnerService";
        @Override
        public IBinder onBind(Intent intent) {
            return null;
        }
        @SuppressLint("ForegroundServiceType")
        @Override
        public void onCreate() {
            super.onCreate();
            //发送与KeepLiveService中ID相同的Notification，然后将其取消并取消自己的前台显示
            Notification.Builder builder = new Notification.Builder(this);
            builder.setSmallIcon(R.mipmap.ic_launcher);
            startForeground(NOTIFICATION_ID, builder.build());
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    stopForeground(true);
                    NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
                    manager.cancel(NOTIFICATION_ID);
                    stopSelf();
                }
            },100);

        }

        @Override
        public void onDestroy() {
            super.onDestroy();
            LogUtils.setInfoTagLog(TAG, " onDestroy");
        }
    }
}