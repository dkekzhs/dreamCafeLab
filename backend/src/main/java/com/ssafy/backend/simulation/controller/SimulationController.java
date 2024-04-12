package com.ssafy.backend.simulation.controller;

import com.ssafy.backend.common.model.response.BaseResponse;
import com.ssafy.backend.simulation.model.dto.SimulationCreateRequestDto;
import com.ssafy.backend.simulation.model.dto.SimulationTotalDto;
import com.ssafy.backend.simulation.model.dto.SimulationUpdateRequestDto;
import com.ssafy.backend.simulation.service.SimulationFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/simulation")
@RequiredArgsConstructor
@Slf4j
public class SimulationController {
    private final SimulationFacade simulationFacade;
    @PostMapping("/create2")
    public BaseResponse<SimulationTotalDto> test(@RequestBody SimulationCreateRequestDto dto){
        log.info("simulation : 시뮬레이션 시작하기 시 데이터를 조회해서 저장한다. {}",dto);
        return new BaseResponse(simulationFacade.simulationInit(dto));
    }
    @PostMapping("/create")
    public BaseResponse<SimulationTotalDto> createSimulation(@RequestBody SimulationCreateRequestDto dto){
        log.info("simulation : 시뮬레이션 시작하기 시 데이터를 조회해서 저장한다. {}",dto);
        return new BaseResponse(simulationFacade.simulationInitFacade(dto));
    }
    @PostMapping("/update")
    public BaseResponse<SimulationTotalDto> createSimulation(@RequestBody SimulationUpdateRequestDto dto){
        log.info("simulation : 시뮬레이션 시작하기 시 데이터를 조회해서 저장한다. {}",dto);
        return new BaseResponse(simulationFacade.simulationUpdate(dto));
    }

}
