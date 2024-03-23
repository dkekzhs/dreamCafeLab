package com.ssafy.backend.simulation.service;

import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import com.ssafy.backend.simulation.model.vo.SimulationVo;

public interface SimulationFacade{
    SimulationVo getLocation(RequestPointRadiusDto dto);
}
