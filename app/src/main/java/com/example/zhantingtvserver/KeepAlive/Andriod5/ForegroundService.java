package com.example.zhantingtvserver.KeepAlive.Andriod5;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

import com.example.zhantingtvserver.R;
import com.example.zhantingtvserver.Utils.LogUtils;

import javax.annotation.Nullable;

public class ForegroundService extends Service {
    private static final int NOTIFICATION_ID = 1001;
    private String TAG = "[ForegroundService]";
    @SuppressLint("ForegroundServiceType")
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Notification notification = new Notification.Builder(this)
                .setContentTitle("App正在运行")
                .setContentText("点击返回App")
                .setSmallIcon(R.drawable.ic_launcher_foreground).build();
        //startForeground(NOTIFICATION_ID, notification);
        Intent intent1 = new Intent(this, GrayInnerService.class);
        startService(intent1);
        startForeground(NOTIFICATION_ID, new Notification());
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        LogUtils.setInfoTagLog(TAG, "onDestory");
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    //给API >= 18 的平台上做灰色保护手段
    public class GrayInnerService extends Service {
        @Override
        public IBinder onBind(Intent intent) {
            return null;
        }


        @SuppressLint("ForegroundServiceType")
        @Override
        public int onStartCommand(Intent intent, int flags, int startId) {
            startForeground(NOTIFICATION_ID, new Notification());
            stopForeground(true);
            stopSelf();

            return super.onStartCommand(intent, flags, startId);
        }
    }

}