package com.example.zhantingtvserver.Utils;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;
import java.util.regex.Pattern;

/**
 * function:
 *          网络工具类
 *
 * @author smt
 * 2023/4/6
 *
 * */
public class NetWorkUtils {

    /**
     * Ipv4 地址检测.
     */
    private static final Pattern IPV4_PATTERN = Pattern.compile(
            "^(" + "([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}" +
                    "([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$");
    private Context context;
    public NetWorkUtils(Context context)
    {
        this.context = context;
    }
    /***
     * function:
     *          获取当前网络状态
     *return:
     *boolean:网络状态 true:在线  false:离线
     * @author smt
     * 2023/4/6
     */
    public boolean getNetWorkStatus()
    {
        ConnectivityManager manager = (ConnectivityManager) this.context.getSystemService(Context.CONNECTIVITY_SERVICE);
        if(manager == null) {
            return false;
        }
        else {
            NetworkInfo info = manager.getActiveNetworkInfo();
            if(info == null || !info.isAvailable())
            {
                return false;
            }
        }
        return true;
    }



    /**
     * function:
     *          检查是否是ipv4地址
     *return:
     *boolean: true:是  false：不是
     * @author smt
     * 2023/4/18
     * **/
    public static boolean isIPv4Address(String input) {
        return IPV4_PATTERN.matcher(input).matches();
    }

    /***
     * function:
     *          获取IP地址
     *return:
     *InetAddress :IP地址
     * @author smt
     * 2023/4/6
     */
    public static InetAddress getLocalIPAddress() {
        Enumeration<NetworkInterface> enumeration = null;
        try {
            enumeration = NetworkInterface.getNetworkInterfaces();
        } catch (SocketException e) {
            e.printStackTrace();
        }
        if (enumeration != null) {
            while (enumeration.hasMoreElements()) {
                NetworkInterface nif = enumeration.nextElement();
                Enumeration<InetAddress> inetAddresses = nif.getInetAddresses();
                if (inetAddresses != null) {
                    while (inetAddresses.hasMoreElements()) {
                        InetAddress inetAddress = inetAddresses.nextElement();
                        if (!inetAddress.isLoopbackAddress() && isIPv4Address(inetAddress.getHostAddress())) {
                            return inetAddress;
                        }
                    }
                }
            }
        }
        return null;
    }





}
