package com.example.zhantingtvserver.Utils;


import android.util.Log;
import android.widget.Toast;

import com.example.zhantingtvserver.Config.Configure;

import java.io.DataOutputStream;
import java.io.IOException;

/**
 * Android运行linux命令，多麦克风算法才需要，单麦不需要
 */
public final class RootShell {
    private static final String TAG = "RootShell";

    /**
     * 执行adb命令
     */
    public static int execRootCmd(String cmd) {
        //LogUtils.setInfoTagLog(TAG, "run " + cmd);
        int result = -1;
        DataOutputStream dos = null;
        try {
            Process p = Runtime.getRuntime().exec("su");
            dos = new DataOutputStream(p.getOutputStream());
            //LogUtils.setInfoTagLog(TAG, cmd);
            dos.writeBytes(cmd + "\n");
            dos.flush();
            dos.writeBytes("exit\n");
            dos.flush();
            p.waitFor();
            result = p.exitValue();
            LogUtils.setInfoTagLog(TAG, "run " + cmd + " result: " + result);
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(Configure.context,"Can not get root permission",Toast.LENGTH_SHORT).show();
        } finally {
            if (dos != null) {
                try {
                    dos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }


    public static void executeADBCmd(String cmd) {

    }

}
