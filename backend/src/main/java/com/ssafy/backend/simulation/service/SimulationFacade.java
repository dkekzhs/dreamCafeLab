package com.ssafy.backend.simulation.service;

import com.ssafy.backend.simulation.model.dto.SimulationCreateRequestDto;
import com.ssafy.backend.simulation.model.dto.SimulationTotalDto;
import com.ssafy.backend.simulation.model.dto.SimulationUpdateRequestDto;
import com.ssafy.backend.simulation.model.vo.SimulationUserVo;

public interface SimulationFacade{
    SimulationTotalDto simulationInit(SimulationCreateRequestDto dto);
    SimulationUserVo simulationInitFacade(SimulationCreateRequestDto RequestDto);
    SimulationUserVo simulationUpdate(SimulationUpdateRequestDto dto);
}
