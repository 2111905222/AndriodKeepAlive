package com.example.zhantingtvserver.webcontroller;

import com.example.zhantingtvserver.Config.Configure;
import com.example.zhantingtvserver.Utils.CommandExcutorUtils;
import com.example.zhantingtvserver.Utils.LogUtils;
import com.example.zhantingtvserver.Utils.RootShell;
import com.example.zhantingtvserver.Utils.ScreenUtils;
import com.example.zhantingtvserver.Utils.VariableCache;
import com.yanzhenjie.andserver.annotation.Controller;
import com.yanzhenjie.andserver.annotation.GetMapping;
import com.yanzhenjie.andserver.annotation.RequestParam;
import com.yanzhenjie.andserver.annotation.ResponseBody;

import org.json.JSONException;
import org.json.JSONObject;

@Controller
public class WebController {
    private String TAG = "WebController";

    /**
     * @function: 删除指定名字的人脸信息
     * @author smt
     * 2023/4/19
     */
    @ResponseBody
    @GetMapping(path = "/queryDeviceState")
    public String queryDeviceState() {
        JSONObject jsonObject = new JSONObject();
        LogUtils.setInfoTagLog(TAG, "通过局域网查询" + Configure.tvName + "设备状态");
        try {
            jsonObject.put("tvId", Configure.tvId);
            jsonObject.put("tvName", Configure.tvName);
            jsonObject.put("tvState", Configure.tvState);
            //jsonObject.put("result", "success");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();

    }

    @ResponseBody
    @GetMapping(path = "/check")
    public String check() {
        return "Request received";
    }

    @ResponseBody
    @GetMapping(path = "/setDeviceState")
    public String setDeviceState(@RequestParam(name = "state") String state) {
        LogUtils.setInfoTagLog(TAG, "当前操作：" + state + ",当前电视状态" + Configure.tvState);
        if (state.equals("open")) {
            if (Configure.tvState) {
                return "success";
            }
            //Configure.tvState = true;
//            if (VariableCache.getBoolean(Configure.tvId, Configure.context)) {
//                return "success";
//            }
            if (CommandExcutorUtils.executeTaskConfirmInThread(Configure.controlFun)) {
                //int ret = RootShell.execRootCmd("input keyevent KEYCODE_POWER");
                int ret = 0;
                ret = ScreenUtils.screenControl("on");
                LogUtils.setInfoTagLog(TAG, "通过局域网控制开启" + Configure.tvName + "屏幕:" + ret);
            } else {
                LogUtils.setInfoTagLog(TAG, "通过局域网控制开启" + Configure.tvName + "屏幕失败,三秒内控制动作重复");
            }
            return "success";
        } else {
            if (!Configure.tvState) {
                return "success";
            }
            //Configure.tvState = false;
//            if (!VariableCache.getBoolean(Configure.tvId, Configure.context)) {
//                return "success";
//            }
            if (CommandExcutorUtils.executeTaskConfirmInThread(Configure.controlFun)) {
                int ret = 0;
                ret = ScreenUtils.screenControl("off");
                        //RootShell.execRootCmd("input keyevent KEYCODE_POWER");
                LogUtils.setInfoTagLog(TAG, "通过局域网控制关闭" + Configure.tvName + "屏幕:" + ret);
            } else {
                LogUtils.setInfoTagLog(TAG, "通过局域网控制关闭" + Configure.tvName + "屏幕失败,三秒内控制动作重复");
            }
            return "success";
        }
    }
}
