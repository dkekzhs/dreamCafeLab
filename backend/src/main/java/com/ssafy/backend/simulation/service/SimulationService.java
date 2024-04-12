package com.ssafy.backend.simulation.service;

import com.ssafy.backend.simulation.model.dto.RevenueSaleDto;
import com.ssafy.backend.simulation.model.dto.SimulationTotalDto;
import com.ssafy.backend.simulation.model.dto.SimulationUpdateRequestDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface SimulationService {

    SimulationTotalDto simulationRedisCacheSave(String UUID, SimulationTotalDto data);
    SimulationTotalDto simulationGetRedisCache(String UUID);

    void simulationRedisCacheUpdate(String UUID, SimulationTotalDto data);

    SimulationTotalDto updateSimulation(SimulationUpdateRequestDto dto);

    List<RevenueSaleDto> getRevenueList(SimulationTotalDto ret);

    void revenueListCreate(SimulationTotalDto dto, List<RevenueSaleDto> resultList);
    void updateSimulationEmployee(SimulationUpdateRequestDto updateData, SimulationTotalDto simulationData);
    void updateFacility(SimulationUpdateRequestDto updateData,SimulationTotalDto simulationData);

    void revenueListUpdate(SimulationUpdateRequestDto dto, List<RevenueSaleDto> revenueList, SimulationTotalDto simulationData);
}
