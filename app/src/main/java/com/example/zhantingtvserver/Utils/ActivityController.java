package com.example.zhantingtvserver.Utils;

import android.app.Activity;

import java.util.ArrayList;
import java.util.List;

public class ActivityController {
    public static List<Activity> activities = new ArrayList<Activity>();

    public static void clearall(){
        System.out.println("list size:" + activities.size());
        if(!activities.isEmpty()){
            finishAll();
            System.out.println("list finishOnePixelActivity");
        }
        else{
            System.out.println("list is empty");
        }
    }

    public static void finishAll(){
        for(Activity activity: activities){
            if(!activity.isFinishing()){
                activity.finish();
            }
        }
    }
    public static void addActivity(Activity activity){
        activities.add(activity);
    }

}
