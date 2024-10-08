package com.example.zhantingtvserver.Mqtt;

public interface TvMqttListener {
    void LostConnect();
    void ConnectSuccess();
    void ReConnectSuccess();
    void tvInfoUpdate();
    void tvOpen();
    void tvClose();
}
