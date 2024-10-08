package com.example.zhantingtvserver.Config;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;


import com.example.zhantingtvserver.MainActivity;
import com.example.zhantingtvserver.Utils.LogUtils;

import java.util.Objects;

/**
 * function:
 *         开机自动启动APP
 *
 * @author smt
 * 2023/4/6
 *
 * */
public class AutoStartAppReceiver extends BroadcastReceiver {
    private final String BOOT = "android.intent.action.BOOT_COMPLETED";

    private final String TAG = "AutoStartAppReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        LogUtils.setInfoTagLog(TAG,"执行开机自动启动APP！");
        if (Objects.requireNonNull(intent.getAction()).equals(BOOT)) {
            Intent startIntent = new Intent(context, MainActivity.class);
            startIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(startIntent);
        }
    }
}
