package com.ssafy.backend.simulation.model.vo;

import com.ssafy.backend.simulation.model.dto.SimulationTotalDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimulationVo {
    private String uuid;
    private SimulationTotalDto simulationData;

    public SimulationVo(String uuid, SimulationTotalDto simulationData) {
        this.uuid = uuid;
        this.simulationData = simulationData;
    }
}
