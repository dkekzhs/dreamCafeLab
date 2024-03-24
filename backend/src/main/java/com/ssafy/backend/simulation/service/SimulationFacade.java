package com.ssafy.backend.simulation.service;

import com.ssafy.backend.simulation.model.dto.SimulationCreateRequestDto;
import com.ssafy.backend.simulation.model.vo.SimulationVo;

public interface SimulationFacade{
    SimulationVo getLocation(SimulationCreateRequestDto dto);
}
