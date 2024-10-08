package com.example.zhantingtvserver.Mqtt;

import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.Utils.LogUtils;
import com.example.zhantingtvserver.Utils.ThreadManager;

import org.json.JSONObject;

import java.nio.charset.StandardCharsets;

public class MqttServer {


    public static TvMqttClient client;
    public static TvMqttCallbackBus callback;
    public static String TAG = "MqttServer";

    public static void replyTvState(){
        if(client != null){
            JSONObject topicJSON = new JSONObject();
            try{
                topicJSON.put("tvId", Configure.tvId);
                topicJSON.put("tvState", Configure.tvState);

            }catch (Exception e){
                e.printStackTrace();
            }
            client.publish(Configure.publishTvTopic, 1, topicJSON.toString().getBytes(StandardCharsets.UTF_8));
        }
    }
    /**
     * mqtt控制
     */
    public static void initTvMqtt(){
        ThreadManager.setThreadToPool(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                if(client == null){
                    client = TvMqttClient.getInstance(callback);
                    if(client != null)
                    {
                        String username = "tv_" + Configure.clickDevicesList.get(Configure.tvName);
                        String password = "tv_" + Configure.clickDevicesList.get(Configure.tvName);


                        Configure.tvMqttSuccess = client.createConnect(Configure.TVSWANADRESS,username,password);
                        if(Configure.tvMqttSuccess){
                            LogUtils.setInfoTagLog(TAG, "TvMqtt连接成功");

                        }
                        else {
                            try {
                                Thread.sleep(3000);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                            LogUtils.setInfoTagLog(TAG,"Tv连接失败， 打开重新连接Mqtt的监听线程");

                            client.reConnectMqtt();

//                        success = client.reconnect();
//                        if (success){
//                            System.out.println("RobotMqtt重连接成功");
//
//                        }
                        }
                    }
                }

            }
        });
    }
}
