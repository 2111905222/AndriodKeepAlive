package com.example.zhantingtvserver.Config;

import android.annotation.SuppressLint;
import android.content.Context;


import java.util.HashMap;

public class Configure {
    public static boolean debug = false;
    public static String  localRootPath = "";
    public static String  externalPath;
    public static String  cachePath;
    public static String  controlFun = "控制电视屏幕";
    @SuppressLint("StaticFieldLeak")
    public static Context context = null;
    /**
     * 运行日志存储路径
     * */
    public static String logPath;

    public static String tvName = "案例区大电视";
    public static String tvId = "b0d539ae01";
    public static boolean tvState;


    public static String TVSWANADRESS = "tcp://aliiot.on-bright.com:1883";
    public static String publishTvTopic = "/hall_tv/600508e000000000a414eb4ee2/status/response";
    public static String updateTvTopic = "/hall_tv/600508e000000000a414eb4ee2/control";

    public static boolean tvMqttSuccess = false;


    public static boolean connectWideNet = false;
    public static boolean connectLocalNet = false;
    public static String localAddress = "10.168.1.1";

    public static final HashMap<String, String> clickDevicesList = new HashMap<String, String>() {
        {

            put("公寓区电视","b7d539ae01");
            put("楼宇区电视","b4d539ae01");
            put("AI区电视","aed539ae01");
            put("酒店外区电视","b1d539ae01");
            put("案例区小电视","afd539ae01");
            put("案例区大电视","b0d539ae01");
            put("养老区电视","b5d539ae01");
        }
    };
}
