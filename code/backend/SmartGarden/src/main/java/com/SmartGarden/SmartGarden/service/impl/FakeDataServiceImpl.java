package com.SmartGarden.SmartGarden.service.impl;

import com.SmartGarden.SmartGarden.model.HumiData;
import com.SmartGarden.SmartGarden.model.Sensor;
import com.SmartGarden.SmartGarden.model.TempData;
import com.SmartGarden.SmartGarden.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/*
* 说明：此功能仅供测试使用，使用前请保证gardenId中Id为6的无对应的sensor
* 生成数据：指定gardenId为6，其属于userId为1的用户
* 步骤：
* 1.先拿到对应garden的十个温度传感器，十个湿度传感器，加入sensors中
* 2.先对每个温度传感器设置初始值25℃，每个湿度传感器设置初始值0.3
* 3.每30s，对于每个温度传感器，温度产生1℃内的温差（上限不超过50℃，下限不低于10℃），
* 对于每个湿度传感器，湿度产生3%以内的湿度差（上限不超过90%，下限不低于10%）
* */

//todo 编译报错。。。
/*

@Service
@Component
public class FakeDataServiceImpl implements FakeDataService {

    @Autowired
    HumiService humiService;

    @Autowired
    TempService tempService;

    @Autowired
    GardenService gardenService;

    @Autowired
    SensorService sensorService;

    private static final int GARDEN_ID = 6;
    private static final long SECOND=1*1000;
    private Double [] temps={25.0,25.0,25.0,25.0,25.0,25.0,25.0,25.0,25.0,25.0};
    private Double [] humis={0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3};
    private List<Sensor> humiSensors=sensorService.getHumiSensorByGardenId(GARDEN_ID);
    private List<Sensor> tempSensors=sensorService.getTempSensorByGardenId(GARDEN_ID);

    @Override
    @Scheduled(fixedDelay = SECOND*30)
    public void generateData() {

        for(int i=0;i<10;i++){
            Double deltaTemp=Math.random();
            Double deltaHumi=Math.random()*0.03;
            boolean addDelta= Math.random() > 0.5;
            if(addDelta){
                if(temps[i]+deltaTemp<50.0){
                    temps[i]+=deltaTemp;
                }
                else {
                    temps[i]-=deltaTemp;
                }
                if(humis[i]+deltaHumi<0.9){
                    humis[i]+=deltaHumi;
                }
                else {
                    humis[i]-=deltaHumi;
                }
            }
            else {
                if(temps[i]-deltaTemp>10.0){
                    temps[i]-=deltaTemp;
                }
                else {
                    temps[i]+=deltaTemp;
                }
                if(humis[i]-deltaHumi>0.1){
                    humis[i]-=deltaHumi;
                }
                else {
                    humis[i]+=deltaHumi;
                }
            }
        }

        for(int i=0;i<10;i++){
            HumiData tmpHumiData=new HumiData();
            tmpHumiData.setSendTime(new Date());
            tmpHumiData.setSensor(humiSensors.get(i));
            tmpHumiData.setHumidity(humis[i]);
            tmpHumiData.setPositionX(humiSensors.get(i).getPositionX());
            tmpHumiData.setPositionY(humiSensors.get(i).getPositionY());
            humiService.addHumiData(tmpHumiData,humiSensors.get(i).getSensorId());
            TempData tmpTempData=new TempData();
            tmpTempData.setSendTime(new Date());
            tmpTempData.setSensor(tempSensors.get(i));
            tmpTempData.setTemperature(temps[i]);
            tmpTempData.setPositionX(tempSensors.get(i).getPositionX());
            tmpTempData.setPositionY(tempSensors.get(i).getPositionY());
            tempService.addTempData(tmpTempData,tempSensors.get(i).getSensorId());
        }

    }
}

*/