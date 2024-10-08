package com.example.zhantingtvserver.Mqtt;



import android.annotation.SuppressLint;
import android.content.Context;
import android.text.TextUtils;
import android.util.Log;


import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.Utils.LogUtils;
import com.example.zhantingtvserver.Utils.ThreadManager;

import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;

public class TvMqttClient {

    public final static String TAG = TvMqttClient.class.getSimpleName();

    @SuppressLint("StaticFieldLeak")
    private static volatile TvMqttClient mInstance = null;
    private MqttCallback mCallback;
    private MqttClient client;
    private MqttConnectOptions conOpt;
    private String[] updateTopic;
    private boolean subscribeFlag = true;

    private TvMqttClient(MqttCallback callback) {
        mCallback = callback;
    }

    public static TvMqttClient getInstance(MqttCallback callback) {
        if (mInstance == null) {
            synchronized (TvMqttClient.class) {
                if (mInstance == null) {
                    mInstance = new TvMqttClient(callback);
                }
            }
        }
        return mInstance;
    }

    /**
     * 释放单例, 及其所引用的资源
     */
    public static void release() {
        try {
            if (mInstance != null) {
                mInstance.disConnect();
                mInstance = null;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 创建Mqtt 连接
     *
     * @param brokerUrl Mqtt服务器地址(tcp://xxxx:1863)
     * @param userName  用户名
     * @param password  密码
     * @return
     */
    public boolean createConnect(String brokerUrl, String userName, String password) {
        //topic = new String[]{"/smarthome-test/user/1465218629901819906/doorViewerRequestVideoCall"};
        updateTopic = new String[]{
                Configure.updateTvTopic
        };

        //updateTopic = RobotControl.robotRosMqttList.toArray(new String[0]);
        UUID uuid = UUID.randomUUID();
        String uuidString = uuid.toString();
        String partUUid = uuidString.substring(0, 5);
        String deviceId = "mqttx_516e24" + partUUid;//Utils.getDeviceNo();
        if (client != null &&
                client.isConnected()) {
            return true;
        }
        boolean flag = false;
        try {
            conOpt = new MqttConnectOptions();
            conOpt.setCleanSession(true); //不接收离线期间的消息  每次都是重新登陆
            conOpt.setAutomaticReconnect(true); //自动重连
            if (!TextUtils.isEmpty(password)) {
                conOpt.setPassword(password.toCharArray());
            }
            if (!TextUtils.isEmpty(userName)) {
                conOpt.setUserName(userName);
            }
            client = new MqttClient(brokerUrl, deviceId, new MemoryPersistence());
            if(subscribeFlag){
                client.setCallback(mCallback);
                flag = doConnect();
                if(flag){
                    client.subscribe(updateTopic);
                }
            }
            else {
                doConnect();
            }

        } catch (MqttException e) {
            e.printStackTrace();
            LogUtils.setInfoTagLog(TAG, "tvMqtt连接报错" + e.toString());
            //重连
            //String msg = "exception_reconnect";
            //EventBus.getDefault().post(msg);
        }
        return flag;
    }

    /**
     * 建立连接
     *
     * @return
     */
    private boolean doConnect() {
        boolean flag = false;
        if (client != null) {
            try {
                client.connect(conOpt);
                flag = true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return flag;
    }

    public boolean publish(String topicName, int qos, byte[] payload) {
        boolean flag = false;
        try {
            if (client == null) {
                System.out.println("尚未建立Mqtt连接，请建立后再发布话题");
                return false;
                //createConnect(HOST, "admin", "admin");
            }
            if (!client.isConnected()) {
                flag = this.reconnect();
                if (!flag){
                    return false;
                }
            }
            MqttMessage message = new MqttMessage(payload);
            message.setQos(qos);
            Log.i(TAG,"message is " + message.toString());
            client.publish(topicName, message);
            flag = true;
        } catch (MqttException e) {
            e.printStackTrace();
        }
        return flag;
    }


    private boolean subscribe(String topicName, int qos) {
        boolean flag = false;
        if (client != null &&
                client.isConnected()) {
            try {
                client.subscribe(topicName, qos);
                flag = true;
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }
        return flag;
    }

    private boolean subscribe(String[] topicName, int qos[]) {
        boolean flag = false;
        if (client != null &&
                client.isConnected()) {
            try {
                client.subscribe(topicName, qos);
                flag = true;
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }
        return flag;
    }


    /**
     * 取消连接
     *
     * @throws MqttException
     */
    public void disConnect() throws MqttException {
        if (client != null &&
                client.isConnected()) {
            client.disconnect();
        }
    }

    /**
     * 关闭连接
     */
    public void close() {
        if (client != null &&
                client.isConnected()) {
            try {
                client.disconnect();
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }
    }

    public static boolean openMqttReConnection = false;
    public void reConnectMqtt(){
        if(openMqttReConnection){
            return;
        }
        openMqttReConnection = true;
        ThreadManager.setThreadToPool(new Runnable() {
            @Override
            public void run() {
                //LogUtils.setInfoTagLog(TAG, "一开始连不上就一直监听Mqtt是否可以重连接成功");
                while(true){
                    if(!Configure.connectWideNet){
                        try {
                            Thread.sleep(20 * 1000);
                            LogUtils.setInfoTagLog(TAG, "目前wifi无法连接广域网，tv mqtt重连线程仍在尝试重连");
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        continue;
                    }

                    if(client.isConnected()){
                        System.out.println( "开机后 Mqtt重连接成功");
                        Configure.tvMqttSuccess = true;
                        openMqttReConnection = false;
                        return;
                    }
                    try {
                        Thread.sleep(10 * 1000);
                        LogUtils.setInfoTagLog(TAG, " mqtt重连线程仍在尝试重连");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    reconnect();
                }
            }
        });

    }
    /**
     * 重新连接
     */
    public boolean reconnect() {
        boolean flag = false;
        if (client != null && !client.isConnected()) {
            try {
                if(subscribeFlag){
                    client.setCallback(mCallback);
                    flag = doConnect();
                    if(flag){
                        client.subscribe(updateTopic);
                    }
                }
                else {
                    flag = doConnect();
                }

            } catch (MqttException e) {
                e.printStackTrace();
            }
        }
        return flag;
    }




}