package com.example.zhantingtvserver.Utils;



import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.Mqtt.WifiListener;

import java.io.IOException;
import java.net.InetAddress;

public class CommonNetUtils {
    private WifiListener wifiListener;
    public String mytype = "";
    public CommonNetUtils(WifiListener wifiListener){
        this.wifiListener = wifiListener;
    }

    public static boolean isPingSuccessful(String ipAddress) {
        try {
            // 执行ping命令
            Process process = Runtime.getRuntime().exec("/system/bin/ping -c 1 -I eth1 " + ipAddress);
            int exitCode = process.waitFor();

            // 检查ping命令的退出码
            if (exitCode == 0) {
                return true;
            } else {
                return false;
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return false;
    }

    public void testWideIP(){
        ThreadManager.setThreadToPool(new Runnable() {
            @Override
            public void run() {
                try {
                    //System.out.println("开始测试wide");
                    InetAddress address = InetAddress.getByName("www.baidu.com");
                    boolean reachable = address.isReachable(1000); // 5000表示超时时间，单位为毫秒
                    //System.out.println("wide测试结果" + reachable);
                    if (reachable) {
                            Configure.connectWideNet = true;
                            wifiListener.WideNetSuccess();
                    } else {
                            Configure.connectWideNet = false;
                            wifiListener.WideNetLost();
                    }
                } catch (IOException e) {
                        Configure.connectWideNet = false;
                        wifiListener.WideNetLost();

                    //System.out.println("进行wide网络测试时报错 " + e.toString());
                }
               // System.out.println("网络测试 wide: " + Configure.connectWideNet);
            }
        });


    }

    public void testLocalIP(){
        ThreadManager.setThreadToPool(new Runnable() {
            @Override
            public void run() {
                try {
                    //System.out.println("开始测试local");
                    InetAddress address = InetAddress.getByName(Configure.localAddress);
                    boolean reachable = address.isReachable(1000); // 5000表示超时时间，单位为毫秒
                    //System.out.println("local测试结果" + reachable);
                    if (reachable) {
                            Configure.connectLocalNet = true;
                            wifiListener.LocalNetSuccess();
                    } else {

                            wifiListener.LocalNetLost();
                            Configure.connectLocalNet = false;
                    }
                } catch (IOException e) {
                        wifiListener.LocalNetLost();
                        Configure.connectLocalNet = false;
                    //System.out.println("进行local网络测试时报错 " + e.toString());
                }
               // System.out.println("网络测试 local: " + Configure.connectLocalNet);
            }
        });

    }

    public void LocalandWideNet(){
        //System.out.println("执行网络测试");
        testWideIP();
        testLocalIP();
    }

    public static boolean testLocalandWideNet(){
        boolean stateChange = false;
        if(isPingSuccessful("www.baidu.com")){
            if(!Configure.connectWideNet){
                Configure.connectWideNet = true;
                stateChange = true;
            }
        }
        else {
            if(Configure.connectWideNet){
                Configure.connectWideNet = false;
                stateChange = true;
            }
        }
        if(isPingSuccessful("10.168.1.1")){
            if(!Configure.connectLocalNet){
                Configure.connectLocalNet = true;
                stateChange = true;
            }
        }
        else{
            if(Configure.connectLocalNet){
                Configure.connectLocalNet = false;
                stateChange = true;
            }
        }
        System.out.println("wide" + Configure.connectWideNet + " local: " + Configure.connectLocalNet);
        return stateChange;
    }
}
