package com.example.zhantingtvserver.Config;


//接收按钮广播


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.example.zhantingtvserver.Utils.LogUtils;
import com.example.zhantingtvserver.Utils.ScreenUtils;
import com.example.zhantingtvserver.Utils.VariableCache;

import java.util.Objects;


public class ButtonAppReceiver extends BroadcastReceiver {

    private final String TAG = "ButtonAppReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        LogUtils.setInfoTagLog(TAG, "接收到的广播：" + Objects.requireNonNull(intent.getAction()));
        switch (Objects.requireNonNull(intent.getAction())) {
            case Intent.ACTION_SCREEN_ON:
                Configure.tvState = true;
                VariableCache.putBoolean(Configure.tvId, true, Configure.context);
                LogUtils.setInfoTagLog(TAG, "已经改变屏幕状态：" + Configure.tvState);
                break;
            case Intent.ACTION_SCREEN_OFF:
                Configure.tvState = false;
                VariableCache.putBoolean(Configure.tvId, false, Configure.context);
                LogUtils.setInfoTagLog(TAG, "已经改变屏幕状态：" + Configure.tvState);
                break;
        }
    }

}
