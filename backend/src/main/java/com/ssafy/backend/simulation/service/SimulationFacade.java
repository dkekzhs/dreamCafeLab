package com.ssafy.backend.simulation.service;

import com.ssafy.backend.simulation.model.dto.SimulationCreateRequestDto;
import com.ssafy.backend.simulation.model.dto.SimulationTotalDto;

public interface SimulationFacade{
    SimulationTotalDto simulationInit(SimulationCreateRequestDto dto);
}
