package com.example.zhantingtvserver.Utils;

import android.os.Build;


import com.example.zhantingtvserver.Config.Configure;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * function:
 *          机器人运行日志工具类
 *
 * @author smt
 * 2023/4/6
 *
 * */
public class LogUtils {


    /**
     * params:
     *INFOTAG:普通日志
     *WARNTAG:警告日志
     * BREAKTAG:崩溃日志
     * */
    private static final String INFOTAG = "[INFO]";
    private static final String WARNTAG = "[WARN]";
    private static final String BREAKTAG = "[BREAK]";
    private static final int maxFileSize = 500000;
    private static final String logFileName = "operationLog";
    //private static EmailUtils emailUtils;

    /**
     *
     * */

    /**
     * @function:
     *          写入普通日志
     *@params:
     *  tag:调用写入日志所在类
     *  msg:写入的信息
     * @author smt
     * 2023/4/6
     * @return:
     * null
     * */
    public static void setInfoTagLog(String tag,String msg)
    {
        File logFile = new File(Configure.logPath,logFileName);
        if(logFile.exists())
        {
           if(logFile.length() > maxFileSize)
           {
               logFile.delete();
           }
        }
        System.out.println(tag + INFOTAG + ":\t" + msg );
        msg = getDate() + tag + INFOTAG + ":\t" + msg + "\n";
        try{
            FileOutputStream backupOutputStr = new FileOutputStream(new File(Configure.logPath, logFileName), true);
            backupOutputStr.write(msg.getBytes());
            backupOutputStr.close();
        }catch (IOException e)
        {
           e.printStackTrace();
        }
    }

    /**
     * @function:
     *          写入警告日志
     *@params:
     *  tag:调用写入日志所在类
     *  msg:写入的信息
     * @author smt
     * 2023/4/10
     *
     *
     * @return:
     * null
     * */
    public static void setWarnTagLog(String tag,String msg)
    {
        System.out.println(tag + WARNTAG + ":\t" + msg );
        msg = getDate() + tag + WARNTAG + ":\t" + msg + "\n";
        try{
            FileOutputStream backupOutputStr = new FileOutputStream(new File(Configure.logPath, logFileName), true);
            backupOutputStr.write(msg.getBytes());
            backupOutputStr.close();
        }catch (IOException e)
        {
            e.printStackTrace();
        }
    }

    /**
     * @function:
     *          写入崩溃日志
     *@params:
     *  tag:调用写入日志所在类
     *  msg:写入的信息
     * @author smt
     * 2023/4/10
     * @return:
     * null
     * */
    public static void setBreakTagLog(String tag,String msg)
    {
        System.out.println(tag + BREAKTAG + ":\t" + msg );
        msg = getDate() + tag + BREAKTAG + ":\t" + msg + "\n";
        try{
            FileOutputStream backupOutputStr = new FileOutputStream(new File(Configure.logPath, logFileName), true);
            backupOutputStr.write(msg.getBytes());
            backupOutputStr.close();
        }catch (IOException e)
        {
            e.printStackTrace();
        }
    }






    /**
     * @function:
     *          读取日志
     *@params:
     * null
     * @author smt
     * 2023/4/10
     * @return:
     * String:日志内容
     * */
    public static String readLog()
    {
        StringBuffer logText = new StringBuffer();
        File logFile = new File(Configure.logPath,logFileName);
        if(!logFile.exists())
        {
            return "";
        }
        try {
            BufferedReader bufferedReader = new BufferedReader(new FileReader(logFile));
            String line = "";
            while (line != null)
            {
                line = bufferedReader.readLine();
                logText.append(line + "\n");
            }
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return logText.toString();
    }


    /**
     *@function:
     *          删除日志
     * @author smt
     * 2023/4/10
     *@return:
     * null
     * */
    public static void delLog() {
        File logFile = new File(Configure.logPath,logFileName);
        if(logFile.exists()) {
            logFile.delete();
        }
    }

    /**
     *@function:
     *          获取记录日志时间
     * @author smt
     * 2023/4/10
     *@return:
     * null
     * */
    private static String getDate()
    {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu/MM/dd HH:mm:ss");
            LocalDateTime now = LocalDateTime.now();
            return dtf.format(now) + "\t";
        }
        return "";
    }

}
