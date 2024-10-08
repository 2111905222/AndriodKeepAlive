package com.example.zhantingtvserver;

import android.os.Environment;

import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.KeepAlive.Andriod5.OnePixelManager;
import com.example.zhantingtvserver.Utils.FileUtils;

import java.io.File;

public class Application extends android.app.Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configure.externalPath = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator;
        Configure.localRootPath = Configure.externalPath + "OnBright/";
        Configure.logPath = Configure.externalPath + "OnBright/logFile/";
        FileUtils.createDir(Configure.localRootPath);
        FileUtils.createDir(Configure.logPath);
        Configure.tvId = Configure.clickDevicesList.get(Configure.tvName);
        Configure.context = Application.this;
        OnePixelManager.getInstance().registerOnePixelReceiver(this);//注册广播接收者
        if(Configure.debug){
            Configure.localAddress = "10.168.1.1";
        }
        else {
            Configure.localAddress = "172.20.10.1";
        }
    }

}
