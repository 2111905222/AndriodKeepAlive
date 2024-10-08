package com.example.zhantingtvserver.Utils;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.RejectedExecutionException;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

//线程池管理
public class ThreadManager {

    private static String TAG = "ThreadManager";


    public static ThreadPoolExecutor executor = new ThreadPoolExecutor(
            50,
            50,
            5,
            TimeUnit.SECONDS,
            new ArrayBlockingQueue<>(50),
            Executors.defaultThreadFactory(),
            new ThreadPoolExecutor.AbortPolicy()
    );

    //设置线程池任务
    public static void setThreadToPool(Runnable runnable) {
        try{
            //LogUtils.setInfoTagLog(TAG,"开始执行线程池任务");
            executor.submit(runnable);
        }catch (RejectedExecutionException e){
            //LogUtils.setWarnTagLog(TAG,"线程池已满,拒绝加入新任务:" + e);
        }
    }






}