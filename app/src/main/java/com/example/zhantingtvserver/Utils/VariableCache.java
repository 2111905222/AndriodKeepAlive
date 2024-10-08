package com.example.zhantingtvserver.Utils;

import android.content.Context;
import android.content.SharedPreferences;

import java.util.HashSet;
import java.util.Set;

/**
 * function:
 *          app变量缓存工具类
 *
 * @author smt
 * 2023/4/6
 *
 * */
public class VariableCache {
    private static SharedPreferences sharedPreferences;
    private static final String ShareName = "ScreenRobot";
    private static final String DefString = null;


    /**
     * @function:
     *          实例化对象
     *
     * @author smt
     * 2023/4/6
     *
     * */
    private static void instance(Context context)
    {
        if(sharedPreferences == null)
        {
            sharedPreferences = context.getSharedPreferences(ShareName, Context.MODE_PRIVATE);
        }
    }
    /**
     * @function:
     *          变量缓存载入String类型
     * @params key:键
     *          value:值
     *          context:环境
     * @author smt
     * 2023/4/6
     *
     * */
    public static void putString(String key,String value,Context context)
    {
            instance(context);
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putString(key,value);
            editor.apply();
    }

    /**
     * @function:
     *          变量缓存载入int类型
     * @params key:键
     *          value:值
     *          context:环境
     * @author smt
     * 2023/4/6
     *
     * */
    public static void putInt(String key, int value, Context context) {
        instance(context);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putInt(key, value);
        editor.apply();
    }

    /**
     * @function:
     *          变量缓存载入float类型
     * @params key:键
     *          value:值
     *          context:环境
     * @author smt
     * 2023/4/6
     *
     * */
    public static void putFloat(String key, float value, Context context) {
        instance(context);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putFloat(key, value);
        editor.apply();
    }


    /**
     * @function:
     *          从变量缓存获取float类型
     * @params key:键
     *          defaultValue:默认值
     *          context:环境
     * @author smt
     * 2023/4/6
     *
     * */
    public static float getFloat(String key, Context context, float defaultValue) {
        instance(context);
        return sharedPreferences.getFloat(key, defaultValue);
    }

    /**
     * @function:
     *          从变量缓存获取float类型
     * @params key:键
     *          defaultValue:默认值
     *          context:环境
     * @author smt
     * 2023/4/6
     *
     * */
    public static int getInt(String key, Context context, int defaultValue) {
        instance(context);
        return sharedPreferences.getInt(key, defaultValue);
    }

    /**
     * @function:
     *          从变量缓存获取String类型
     * @params key:键
     *          context:环境
     * @author smt
     * 2023/4/6
     *
     * */
    public static String getString(Context context,String key) {
        instance(context);
        return sharedPreferences.getString(key, DefString);
    }

    /**
     * @function
     *          自定义缺省值的方式获取数据
     *
     * @param context     环境
     * @param key          键
     * @param defaultValue 缺省值
     * @return un
     */
    public static String getString(Context context, String key, String defaultValue) {
        instance(context);
        return sharedPreferences.getString(key, defaultValue);
    }

    /**
     * @param key     键
     * @param value   值
     * @param context 环境
     */
    public static void putStrings(Context context, String key, Set<String> value) {
        instance(context);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putStringSet(key, value);
        editor.apply();
    }

    /**
     * @param context un
     * @param key     un
     * @return 字符串集
     */
    public static Set<String> getStrings(Context context, String key) {
        instance(context);
        return sharedPreferences.getStringSet(key, new HashSet<String>());
    }

    /**
     * @function:
     *          变量缓存载入boolean类型
     * @params key:键
     *          value:值
     *          context:环境
     * @author smt
     * 2023/4/6
     *
     * */
    public static void putBoolean(String key, boolean value, Context context) {
        instance(context);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putBoolean(key, value);
        editor.apply();
    }

    /**
     * @function:
     *          从变量缓存获取boolean类型
     * @params key:键
     *          context:环境
     * @author smt
     * 2023/4/6
     *
     * */
    public static boolean getBoolean(String key, Context context) {
        instance(context);
        return sharedPreferences.getBoolean(key, false);
    }

    public static boolean getBoolean(String key, Context context, boolean defultvalue) {
        instance(context);
        return sharedPreferences.getBoolean(key, defultvalue);
    }



}
