package com.SmartGarden.SmartGarden.controller;

import com.SmartGarden.SmartGarden.model.TempData;
import com.SmartGarden.SmartGarden.service.TempService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/*
* 提供了访问温度数据的接口
* */
@Controller
@RequestMapping("/temperature")
public class TempDataController {

    @Autowired
    private TempService tempService;

    @ResponseBody
    @GetMapping("/getLast20TempDataBySensorId")
    public List<TempData> getLast20TempDataBySensorId(int sensorId){
        return tempService.getLast20DataBySensorId(sensorId);
    }

    @ResponseBody
    @GetMapping("/getLastTempDateByGardenId")
    public List<TempData> getLastTempDataByGardenId(int gardenId){
        return tempService.getLastTempDataByGardenId(gardenId);
    }

    @ResponseBody
    @PostMapping("/addTempData")
    public boolean addTempData(TempData tempData){
        return tempService.addTempData(tempData);
    }

    @ResponseBody
    @PostMapping("/deleteByTempDataId")
    public boolean deleteTempData(int tempDataId){
        return tempService.deleteByTempDataId(tempDataId);
    }
}
