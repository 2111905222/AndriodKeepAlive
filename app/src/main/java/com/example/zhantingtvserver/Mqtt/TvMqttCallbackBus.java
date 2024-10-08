package com.example.zhantingtvserver.Mqtt;

import android.util.Log;


import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.Utils.LogUtils;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONException;
import org.json.JSONObject;

public class TvMqttCallbackBus implements MqttCallbackExtended {
    private TvMqttListener tvMqttListener;
    private String TAG = "TvMqttCallbackBus";

    public TvMqttCallbackBus() {

    }
    public void setListener(TvMqttListener tvMqttListener){
        this.tvMqttListener = tvMqttListener;
    }

    @Override
    public void connectComplete(boolean reconnect, String serverURI) {
        Log.e("TvMqttCallbackBus", "TvMQTT_connectComplete:" + serverURI);

        //断开连接必须重新订阅才能收到之前订阅的session连接的消息
        if (reconnect) {
            LogUtils.setInfoTagLog("TvMqttCallbackBus_重连订阅主题", "TvMQTT_connectComplete:");
            //这里是发送消息去重新订阅)
            tvMqttListener.ReConnectSuccess();
        }
        else{
            System.out.println("TvMQTT_connectComplete:第一次连接成功");
            tvMqttListener.ConnectSuccess();
        }
    }

    @Override
    public void connectionLost(Throwable cause) { //掉线
        LogUtils.setInfoTagLog("MqttCallbackBus", "MQTT_connectionLost 掉线原因:" + cause.getMessage());
        tvMqttListener.LostConnect();
        cause.printStackTrace();
    }


    // 获取长连接的update
    @Override
    public void messageArrived(String topic, MqttMessage message)  {
        JSONObject jsonObject = null;
        try {
            jsonObject = new JSONObject(message.toString());
            LogUtils.setInfoTagLog(TAG, "收到话题: " + topic +"收到信息jsonObject:" + jsonObject);
            if (jsonObject.has("serialId")){
                String clientID = jsonObject.getString("serialId");
                if(!Configure.tvId.equals(clientID)){
                    return;
                }
                if(jsonObject.has("messType")){
                    String messType = jsonObject.getString("messType");
                    switch (messType){
                        case "info":
                            tvMqttListener.tvInfoUpdate();
                            break;
                        case "open":
                            tvMqttListener.tvOpen();
                            break;
                        case "close":
                            tvMqttListener.tvClose();
                            break;
                    }

                }
            }
        } catch (JSONException | AssertionError e) {
            e.printStackTrace();
        }
        //System.out.println("收到的机器人消息" + jsonObject);
    }


    @Override
    public void deliveryComplete(IMqttDeliveryToken token) { //&#xff08;发布&#xff09;publish后会执行到这里,发送状态 token.isComplete()
        try {
            Log.e("MqttCallbackBus", "MQTT_deliveryComplete:"+token.isComplete());
        }catch ( Exception e)
        {
            e.printStackTrace();
        }

    }
}
