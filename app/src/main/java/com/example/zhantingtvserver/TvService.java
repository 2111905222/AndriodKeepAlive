package com.example.zhantingtvserver;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.IBinder;
import android.os.PowerManager;

import androidx.annotation.Nullable;
import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.Mqtt.MqttServer;
import com.example.zhantingtvserver.Mqtt.TvMqttCallbackBus;
import com.example.zhantingtvserver.Mqtt.TvMqttListener;
import com.example.zhantingtvserver.Mqtt.WifiListener;
import com.example.zhantingtvserver.Utils.CommandExcutorUtils;
import com.example.zhantingtvserver.Utils.CommonNetUtils;
import com.example.zhantingtvserver.Utils.LogUtils;
import com.example.zhantingtvserver.Utils.NetWorkUtils;
import com.example.zhantingtvserver.Utils.RootShell;
import com.example.zhantingtvserver.Utils.ScreenUtils;

import java.util.Timer;
import java.util.TimerTask;

public class TvService extends Service {
    @SuppressLint("StaticFieldLeak")
    private static LocalServer localServer;
    private static CommonNetUtils commonNetUtils;
    private static TvMqttListener tvMqttListener;
    private static Timer netWorkTimeTask;//检测网络状态计时器任务
    private static NetWorkUtils netWorkUtils;
    private static WifiListener wifiListener;
    private String TAG = "TvService";
    public static Context context;
    public PowerManager.WakeLock wakeLock = null; //获取电源锁，保持该服务在屏幕熄灭时仍然获取CPU时，保持运行private void acquireWakeLock()
    private static final int NOTIFICATION_ID = 1;
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
    @Override
    public void onCreate() {
        super.onCreate();
        defineaquiceLock();
        context = getBaseContext();
        netWorkUtils = new NetWorkUtils(this);
        initMqttConfig();

        wifiListener = new WifiListener() {
            @Override
            public void LocalNetSuccess() {
                localServer();
            }

            @Override
            public void LocalNetLost() {
                LogUtils.setInfoTagLog(TAG, "Wifi无局域网");
            }

            @Override
            public void WideNetSuccess() {
                if(MqttServer.client == null){
                    LogUtils.setInfoTagLog(TAG, "实例化Mqtt");
                    if(MqttServer.callback == null){
                        MqttServer.callback = new TvMqttCallbackBus();
                        MqttServer.callback.setListener(tvMqttListener);
                    }
                    MqttServer.initTvMqtt();

                }
            }

            @Override
            public void WideNetLost() {
                LogUtils.setInfoTagLog(TAG, "Wifi无广域网");
            }
        };
        commonNetUtils = new CommonNetUtils(wifiListener);
        netWorkTimeTask = new Timer();
        netWorkTimeTask.schedule(new TimerTask() {
            @Override
            public void run() {
                if(netWorkUtils.getNetWorkStatus()) {  // 无线wifi
                    commonNetUtils.LocalandWideNet();
                    //EventBus.getDefault().post(new NetWorkStatus(true));
                }
                else {
                    LogUtils.setInfoTagLog(TAG, "Wifi断开了连接");
                }
            }
        },500,5000) ;

    }

    public void initMqttConfig(){
        LogUtils.setInfoTagLog(TAG, "初始化Mqtt配置");
        tvMqttListener = new TvMqttListener() {
            @Override
            public void LostConnect() {

            }

            @Override
            public void ConnectSuccess() {

            }

            @Override
            public void ReConnectSuccess() {

            }

            @Override
            public void tvInfoUpdate() {
                MqttServer.replyTvState();
            }

            @Override
            public void tvOpen() {
                Configure.tvState = ScreenUtils.getScreenStatus(context); // 获取当前屏幕状态
                if(Configure.tvState){
                    return;
                }
                if(CommandExcutorUtils.executeTaskConfirmInThread(Configure.controlFun)){
                    int ret = 0;
                     ret = RootShell.execRootCmd("input keyevent KEYCODE_POWER");
                    //ScreenUtils.screenOn(context);
                    LogUtils.setInfoTagLog(TAG, "通过Mqtt控制开启" + Configure.tvName + "屏幕:" + ret);
                }
                else{
                    LogUtils.setInfoTagLog(TAG, "通过Mqtt控制开启" + Configure.tvName + "屏幕失败， 三秒内动作重复");
                }
            }

            @Override
            public void tvClose() {
                Configure.tvState = ScreenUtils.getScreenStatus(context); // 获取当前屏幕状态
                if(!Configure.tvState){
                    return;
                }
                if(CommandExcutorUtils.executeTaskConfirmInThread(Configure.controlFun)){
                    int ret = 0;
                     ret = RootShell.execRootCmd("input keyevent KEYCODE_POWER");
                    //ScreenUtils.screenOff(context);
                    LogUtils.setInfoTagLog(TAG, "通过Mqtt控制关闭" + Configure.tvName + "屏幕:" + ret);
                }
                else{
                    LogUtils.setInfoTagLog(TAG, "通过Mqtt控制关闭" + Configure.tvName + "屏幕失败， 三秒内动作重复");
                }
            }
        };
    }
    /**
     *@function:
     *          开启本地后台
     *
     *
     * @author smt
     * 2023/4/6
     * return:
     * null
     * */
    protected void localServer() {
        if(localServer == null) {
            localServer = new LocalServer(this);
            localServer.onStart();
        }
    }

    @SuppressLint("InvalidWakeLockTag")
    public void defineaquiceLock() {

        if (null == wakeLock) {
            PowerManager pm = (PowerManager) this.getSystemService(context.POWER_SERVICE);
            //wakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK | PowerManager.ON_AFTER_RELEASE | PowerManager.FULL_WAKE_LOCK, "TVServer");
            wakeLock = pm.newWakeLock(PowerManager.FULL_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP, "TVServer");
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_STICKY;
    }

    //释放设备电源锁
    private void releaseWakeLock(){
        if(null != wakeLock)
            wakeLock.release();
        wakeLock = null;
    }


    @Override
    public boolean onUnbind(Intent intent) {
        System.out.println("unbind");
        return super.onUnbind(intent);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        LogUtils.setInfoTagLog(TAG , " onDestory");
//        if(localServer != null) {
//            localServer.onStop();
//        }
//        if(MqttServer.client != null){
//            MqttServer.client.close();
//        }
//        if(netWorkTimeTask != null){
//            netWorkTimeTask.cancel();
//            netWorkTimeTask = null;
//        }
    }
}
