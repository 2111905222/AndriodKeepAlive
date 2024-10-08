package com.example.zhantingtvserver;

import android.content.Context;

import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.Utils.LogUtils;
import com.example.zhantingtvserver.Utils.ScreenUtils;
import com.yanzhenjie.andserver.AndServer;
import com.yanzhenjie.andserver.Server;

import java.util.concurrent.TimeUnit;

/**
 *@function:
 *          本地后台对象类
 *
 *
 * @author smt
 * 2023/4/6
 * return:
 * null
 * */
public class LocalServer {
    private final  static String TAG = "LocalServer";
    private Context context;
    private final static int port = 8080;
    private Server server;
    private final static  int connectTimeOut = 10;
    public LocalServer(Context context)
    {
        this.context = context;
    }

    /**
     *@function:
     *          开启本地后台服务
     *
     *
     * @author smt
     * 2023/4/18
     * return:
     * null
     * */
    public void onStart() {
        server = AndServer.webServer(context).port(port).timeout(connectTimeOut, TimeUnit.SECONDS).build();
        if(!server.isRunning())
        {
            Configure.tvState = ScreenUtils.getScreenStatus(context);
            server.startup();
            LogUtils.setInfoTagLog(TAG,"已启用本地后台服务！");
        }
    }
    /**
     *@function:
     *          关闭本地后台服务
     *
     *
     * @author smt
     * 2023/4/18
     * return:
     * null
     * */
    public void onStop()
    {
        if(server != null){
            if(server.isRunning())
            {
                server.shutdown();
                LogUtils.setInfoTagLog(TAG,"已关闭本地后台服务！");
            }
        }

    }


    public void stopServer() {
        onStop();
    }
}
