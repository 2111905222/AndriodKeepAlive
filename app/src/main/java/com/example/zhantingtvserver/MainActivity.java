package com.example.zhantingtvserver;


import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;


import com.example.zhantingtvserver.Config.ButtonAppReceiver;
import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.KeepAlive.Andriod5.OnePixelManager;
import com.example.zhantingtvserver.KeepAlive.Andriod5.OnePixelService;
import com.example.zhantingtvserver.Utils.NetWorkUtils;
import com.example.zhantingtvserver.Utils.ScreenUtils;
import com.example.zhantingtvserver.Utils.VariableCache;

import pub.devrel.easypermissions.AfterPermissionGranted;
import pub.devrel.easypermissions.AppSettingsDialog;
import pub.devrel.easypermissions.EasyPermissions;
import android.Manifest;
import android.widget.Toast;

import java.util.List;

/**
 * 权限申请码, 作为权限申请的标识
 * 注意 : const val 常量才是 Java 中的 public static final 对等的常量值
 *        const val 常量只能定义在 Kotlin 文件中, 或 object 对象表达式中, 不能定义在类中
 */


public class MainActivity extends AppCompatActivity{

    int PERMISSION_REQUEST_CODE  = 100;
    private ButtonAppReceiver buttonAppReceiver;
    private static final String TAG = "MainActivity";
    private static Intent tvService;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //start_service(); //优化保活程序，使用Service注册广播接收者  实验下来无用
        //tvOnline = new TvOnline(this);

        //doSomethingWithPermissions();
        requestPer();
        start_OnePixelService();
        //NetWorkUtils.setDebug(5555);
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
        if(OnePixelManager.getInstance() != null){
            OnePixelManager.getInstance().unregisterOnePixelReceiver(Configure.context);//Activity退出时解注册
        }

        if(buttonAppReceiver != null){
            unregisterReceiver(buttonAppReceiver);
        }

    }

    @Override
    public void finish() {
        moveTaskToBack(true);
    }

//    public void registerScreenState(){
//        VariableCache.putBoolean(Configure.tvId, ScreenUtils.getScreenStatus(this), Configure.context);
//        Configure.tvState = ScreenUtils.getScreenStatus(this); // 获取当前屏幕状态
//        System.out.println("当前屏幕状态为："+Configure.tvState);
//        buttonAppReceiver = new ButtonAppReceiver();
//        IntentFilter intentFilter = new IntentFilter();
//        intentFilter.addAction(Intent.ACTION_SCREEN_ON);//打开屏幕广播
//        intentFilter.addAction(Intent.ACTION_SCREEN_OFF);//熄屏广播
//        registerReceiver(buttonAppReceiver,intentFilter); //注册按钮事件
//    }

    public void requestPer(){
        String[] permissions = new String[]{
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.INTERNET,
                Manifest.permission.ACCESS_NETWORK_STATE,
                Manifest.permission.ACCESS_WIFI_STATE,
                Manifest.permission.FOREGROUND_SERVICE,
                Manifest.permission.RECEIVE_BOOT_COMPLETED,
                Manifest.permission.WAKE_LOCK,
                Manifest.permission.DISABLE_KEYGUARD,
                Manifest.permission.SYSTEM_ALERT_WINDOW,
        };
        ActivityCompat.requestPermissions(this, permissions, 1);
    }

}