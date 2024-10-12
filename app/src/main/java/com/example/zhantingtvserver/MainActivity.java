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


public class MainActivity extends AppCompatActivity implements EasyPermissions.PermissionCallbacks, EasyPermissions.RationaleCallbacks {

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

    public void requestPer(){
        String[] permissions = new String[]{
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.INTERNET,
                Manifest.permission.ACCESS_NETWORK_STATE,
                Manifest.permission.ACCESS_WIFI_STATE
        };
        ActivityCompat.requestPermissions(this, permissions, 1);
    }
    public void requestPermissions() {
        String[] perms = {
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.INTERNET,
                Manifest.permission.ACCESS_NETWORK_STATE,
                Manifest.permission.ACCESS_WIFI_STATE};
        if (!EasyPermissions.hasPermissions(this, perms)) {
            EasyPermissions.requestPermissions(this, "this.getResources().getString(R.string.camera_rationale)",
                    124, perms);
        }
    }



    @AfterPermissionGranted( 100 )
    public void doSomethingWithPermissions() {
        if (EasyPermissions.hasPermissions(this,
                Manifest.permission.ACCESS_NETWORK_STATE,
                Manifest.permission.ACCESS_WIFI_STATE,
                Manifest.permission.CHANGE_NETWORK_STATE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.READ_PHONE_STATE,
                Manifest.permission.INTERNET,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.READ_CONTACTS,
                Manifest.permission.READ_SMS,
                Manifest.permission.DISABLE_KEYGUARD)
                ) {

            // 如果有上述权限, 执行该操作
            Toast.makeText(this, "权限申请通过", Toast.LENGTH_LONG).show();
            System.out.println("已有权限");
        } else {
            // 如果没有上述权限 , 那么申请权限
            EasyPermissions.requestPermissions(
                    this,
                    "权限申请原理对话框 : 描述申请权限的原理",
                    100,

                    Manifest.permission.ACCESS_NETWORK_STATE,
                    Manifest.permission.ACCESS_WIFI_STATE,
                    Manifest.permission.CHANGE_NETWORK_STATE,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE,
                    Manifest.permission.READ_EXTERNAL_STORAGE,
                    Manifest.permission.READ_PHONE_STATE,
                    Manifest.permission.INTERNET,
                    Manifest.permission.ACCESS_COARSE_LOCATION,
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.READ_CONTACTS,
                    Manifest.permission.READ_SMS,
                    Manifest.permission.DISABLE_KEYGUARD
            );
            System.out.println("无其中一个");
        }
    }


    @Override
    public void onPermissionsGranted(int requestCode, @NonNull List<String> perms) {
        System.out.println("用户授权成功");
    }

    @Override
    public void onPermissionsDenied(int requestCode, @NonNull List<String> perms) {
        /*
         * 若是在权限弹窗中，用户勾选了'NEVER ASK AGAIN.'或者'不在提示'，且拒绝权限。
         * 这时候，需要跳转到设置界面去，让用户手动开启。
         */
        if (EasyPermissions.somePermissionPermanentlyDenied(this, perms)) {
            new AppSettingsDialog
                    .Builder(this)
                    .setTitle("\"某APP\"权限提示")
                    .setRationale("\"某APP\"需要使用相关权限，是否打开设置")
                    .setPositiveButton("是")
                    .setNegativeButton("否")
                    .build()
                    .show();
        }

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        EasyPermissions.onRequestPermissionsResult(requestCode, permissions, grantResults, this);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            //当从软件设置界面，返回当前程序时候
//            case AppSettingsDialog.DEFAULT_SETTINGS_REQ_CODE:
//                requestPermissions();
//                break;
        }
    }

    @AfterPermissionGranted(value = 0x99)
    public void checkPermissions() {
        String[] perms = {Manifest.permission.CAMERA, Manifest.permission.CHANGE_WIFI_STATE};
        if (EasyPermissions.hasPermissions(this, perms)) {
            //已经授权后的操作
        } else {
            //没有授权后的操作
            EasyPermissions.requestPermissions(this, "getString(R.string.camera_rationale)",
                    0x99, perms);
        }
    }


    @Override
    public void onRationaleAccepted(int requestCode) {

    }

    @Override
    public void onRationaleDenied(int requestCode) {

    }
}