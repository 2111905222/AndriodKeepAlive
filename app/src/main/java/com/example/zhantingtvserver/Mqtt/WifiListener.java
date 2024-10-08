package com.example.zhantingtvserver.Mqtt;

public interface WifiListener {
    void LocalNetSuccess();
    void LocalNetLost();
    void WideNetSuccess();
    void WideNetLost();

}
