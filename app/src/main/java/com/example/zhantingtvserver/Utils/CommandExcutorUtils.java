package com.example.zhantingtvserver.Utils;

import android.os.Handler;

import com.example.zhantingtvserver.Config.Configure;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

/**
 * rf信号较差，会发送多次，此类用于阻断重复接收的信号
 */

public class CommandExcutorUtils {

        private static HashMap<String, Boolean> taskStatusMap = new HashMap<>();

        public static void initTask(){
            taskStatusMap.put(Configure.controlFun, false);
            taskStatusMap.put(Configure.opencloseActivity, false);
        }

        public static boolean executeTaskConfirm(String taskId) {  // 三秒时间内不可重复点击同一个事件
            if (!isTaskExecuting(taskId)) {
                setTaskExecuting(taskId, true);
                // 执行任务的代码
                // 设置一个三秒的计时器
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        setTaskExecuting(taskId, false);
                    }
                }, 3000);
                return true;  // 可执行
            }
            return false;
        }


    public static boolean executeTaskConfirmInThread(String taskId) {  // 三秒时间内不可重复点击同一个事件
        if (!isTaskExecuting(taskId)) {
            setTaskExecuting(taskId, true);
            // 执行任务的代码
            // 设置一个三秒的计时器
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    setTaskExecuting(taskId, false);
                }
            }, 3000);
            return true;  // 可执行
        }
        return false;
    }


        private static boolean isTaskExecuting(String taskId) {
            return taskStatusMap.containsKey(taskId) && taskStatusMap.get(taskId);
        }

        private static void setTaskExecuting(String taskId, boolean isExecuting) {
            taskStatusMap.put(taskId, isExecuting);
        }

        public static void setTaskExecutingTemp(String taskId, boolean isExecuting) {
            if (!isTaskExecuting(taskId)) {
                setTaskExecuting(taskId, true);
                // 执行任务的代码

                // 设置一个三秒的计时器
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        setTaskExecuting(taskId, false);
                    }
                }, 3000);

            }
        }

    public static void setTaskExecutingTempInThread(String taskId, boolean isExecuting) {
        if (!isTaskExecuting(taskId)) {
            setTaskExecuting(taskId, true);
            // 执行任务的代码
            // 设置一个三秒的计时器
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                               @Override
                               public void run() {
                                   setTaskExecuting(taskId, false);
                               }
                           }, 3000);
        }
    }






}
