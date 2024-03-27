package com.ssafy.backend.simulation.service;

import com.ssafy.backend.simulation.model.dto.SimulationUpdateRequestDto;

import java.util.HashMap;
import java.util.Map;

public interface SimulationService {

    String simulationRedisCacheSave(String UUID, String data);
    String simulationGetRedisCache(String UUID);

    void updateSimulation(SimulationUpdateRequestDto dto);
}
