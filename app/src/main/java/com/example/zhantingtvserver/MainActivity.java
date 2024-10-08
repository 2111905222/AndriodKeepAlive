package com.example.zhantingtvserver;

import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.example.zhantingtvserver.Config.ButtonAppReceiver;
import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.KeepAlive.Andriod5.ForegroundService;
import com.example.zhantingtvserver.KeepAlive.Andriod5.OnePixelActivity;
import com.example.zhantingtvserver.KeepAlive.Andriod5.OnePixelManager;
import com.example.zhantingtvserver.KeepAlive.Andriod5.OnePixelService;
import com.example.zhantingtvserver.KeepAlive.Andriod6.KeepLiveService;
import com.example.zhantingtvserver.Utils.ScreenUtils;
import com.example.zhantingtvserver.Utils.VariableCache;

public class MainActivity extends AppCompatActivity {


    private ButtonAppReceiver buttonAppReceiver;
    private static final String TAG = "MainActivity";
    private static Intent tvService;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //start_service(); //优化保活程序，使用Service注册广播接收者  实验下来无用
        //tvOnline = new TvOnline(this);
        start_OnePixelService();
        finish();
    }


    // 从Activity改成Service注册广播接收者，在Service中进行
    private void start_OnePixelService(){
        Intent intent = new Intent();
        intent.setClass(MainActivity.this, OnePixelService.class);
        startService(intent);
    }


    @Override
    protected void onPause() {
        super.onPause();
        System.out.println(TAG + " onPause");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        System.out.println(TAG + " onDestroy");
//        if(OnePixelManager.getInstance() != null){
//            OnePixelManager.getInstance().unregisterOnePixelReceiver(Configure.context);//Activity退出时解注册
//        }

        if(buttonAppReceiver != null){
            unregisterReceiver(buttonAppReceiver);
        }

    }

    @Override
    public void finish() {
        moveTaskToBack(true);
    }

    public void registerScreenState(){
        VariableCache.putBoolean(Configure.tvId, ScreenUtils.getScreenStatus(this), Configure.context);
        Configure.tvState = ScreenUtils.getScreenStatus(this); // 获取当前屏幕状态
        System.out.println("当前屏幕状态为："+Configure.tvState);
        buttonAppReceiver = new ButtonAppReceiver();
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(Intent.ACTION_SCREEN_ON);//打开屏幕广播
        intentFilter.addAction(Intent.ACTION_SCREEN_OFF);//熄屏广播
        registerReceiver(buttonAppReceiver,intentFilter); //注册按钮事件

    }


}