package com.example.zhantingtvserver.Utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * function:
 *          文件读写工具类
 *
 * @author smt
 * 2023/4/6
 *
 * */
public class FileUtils {

    private static final String TAG = "FileUtils";


    /***
     * function:
     *          创建文件夹
     *
     * params:
     *      dirName:创建的文件夹名
     *
     * @author smt
     * 2023/4/6
     */
    public static void createDir(String dirName)
    {
        File fileDir = new File(dirName);
        if(!fileDir.exists())
        {
            LogUtils.setInfoTagLog(TAG,"创建配置文件夹:" + dirName);
            if(!fileDir.mkdirs())
            {
                LogUtils.setInfoTagLog(TAG,"创建配置文件夹:" + dirName + "失败");
            }
            else {
                LogUtils.setInfoTagLog(TAG,"创建配置文件夹:" + dirName + "成功");
            }
        }
        else {
            LogUtils.setInfoTagLog(TAG,"配置文件夹:" + dirName + "已存在!");
        }
    }


    public static void createFile(String fileName,byte[] bytes)
    {
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(new File(fileName));
            fileOutputStream.write(bytes);
            fileOutputStream.close();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }

    /***
     * function:
     *          复制文件
     *
     * params:
     *      copyFilePath:复制的文件路径
     *      targetFilePath：目标文件路径
     *
     * @author smt
     * 2023/4/6
     */
    public static void copyFile(String  copyFilePath,String targetFilePath) {
        try {
            InputStream inputStream = new FileInputStream(new File(copyFilePath));
            OutputStream outputStream = new FileOutputStream(new File(targetFilePath));
            byte[] buf = new byte[1024000];
            int bytesRead;
            while ((bytesRead = inputStream.read(buf)) > 0) {
                outputStream.write(buf, 0, bytesRead);
            }
        }
        catch (IOException e)
        {
            LogUtils.setWarnTagLog(TAG,"复制文件IO异常:" + e);
        }
    }


    /***
     * function:
     *          读取文件内容
     *
     * params:
     *      filePath:读取文件的路径
     *
     * @author smt
     * 2023/4/6
     */
    public static String readFile(String  filePath) {
        StringBuffer text = new StringBuffer();
        File file = new File(filePath);
        if(!file.exists())
        {
            return "";
        }
        try {
            BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
            String line = "";
            while (line != null)
            {
                line = bufferedReader.readLine();
                text.append(line);
            }
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return text.toString();
    }

    /***
     * function:
     *          删除文件
     *
     * params:
     *      filePath:读取文件的路径
     *
     * @author smt
     * 2023/4/6
     */
    public static void delFile(String  filePath) {
        File file = new File(filePath);
        if(file.exists())
        {
            LogUtils.setInfoTagLog(TAG,"已删除文件:" + filePath);
           file.delete();
        }
        else {
            LogUtils.setInfoTagLog(TAG,filePath + "不存在");
        }

    }


    /***
     * function:
     *          更改文件名
     *
     * params:
     *      filePath:文件的路径
     *      newFileName:新的文件名
     *
     * @author smt
     * 2023/4/6
     */
    public static void reNameFile(String  filePath,String newFileName) {
        File file = new File(filePath);
        if(file.exists())
        {
           file.renameTo(new File(newFileName));
        }

    }








}
