package com.example.zhantingtvserver.Config;

import android.content.Context;

import com.yanzhenjie.andserver.annotation.Config;
import com.yanzhenjie.andserver.framework.config.WebConfig;
import com.yanzhenjie.andserver.framework.website.AssetsWebsite;
import com.yanzhenjie.andserver.framework.website.FileBrowser;

@Config
public class AppConfig implements WebConfig {
    @Override
    public void onConfig(Context context, Delegate delegate) {
        // 增加一个位于assets的web目录的网站
        delegate.addWebsite(new AssetsWebsite(context, "/web/"));
        delegate.addWebsite(new FileBrowser(Configure.localRootPath));//本地资源管理
        // 增加一个位于/sdcard/Download/AndServer/目录的网站
//        delegate.addWebsite(new StorageWebsite(context, "/sdcard/Download/AndServer/"));

    }
}
