package com.example.zhantingtvserver;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;

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

import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.util.Timer;
import java.util.TimerTask;

public class TvOnline {
    private  LocalServer localServer;
    private  CommonNetUtils commonNetUtils;
    private  TvMqttListener tvMqttListener;
    private  Timer netWorkTimeTask;//检测网络状态计时器任务
    private  NetWorkUtils netWorkUtils;
    private  WifiListener wifiListener;
    private String TAG = "TvOnline";
    public Context context;
  public TvOnline(Context context){
      this.context = context;
        netWorkUtils = new NetWorkUtils(context);
        initMqttConfig();

        wifiListener = new WifiListener() {
            @Override
            public void LocalNetSuccess() {
                localServer(context);
            }

            @Override
            public void LocalNetLost() {
                if(localServer != null){
                    localServer.stopServer();
                }
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
                    ret = ScreenUtils.screenControl("on");
                    //ret = RootShell.execRootCmd("input keyevent KEYCODE_POWER");
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
                    ret = ScreenUtils.screenControl("off");
//                    ret = RootShell.execRootCmd("input keyevent KEYCODE_POWER");
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
    protected void localServer(Context context) {
        if(localServer == null) {
            LogUtils.setInfoTagLog(TAG , " 初始化局域网");
            localServer = new LocalServer(context);
            localServer.onStart();
        }
    }

    public void closeMq(){
        MqttServer.closeMqtt();
    }
}
