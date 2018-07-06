package com.SmartGarden.SmartGarden.repository;

import com.SmartGarden.SmartGarden.model.HumiData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HumiRepository extends JpaRepository<HumiData,Integer> {
    List<HumiData> findTop20BySensor_SensorIdOrderBySendTimeDesc(int sensorId);
    HumiData findTopBySensor_SensorIdOrderBySendTimeDesc(int sensorId);
}