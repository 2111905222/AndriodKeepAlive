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
        Configure.cachePath = this.getCacheDir().getAbsolutePath() + File.separator;
        System.out.println("初始化外部cacheDirPath" + getExternalCacheDir());
        System.out.println("初始化cachePath：" + Configure.cachePath);  // /data/user/0/com.example.screendemo/cache/
        Configure.externalPath = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator;
        Configure.localRootPath = Configure.cachePath + "OnBright/";
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
