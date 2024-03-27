package com.ssafy.backend.simulation.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SimulationResult {
    private List<RevenueSaleDto> result;
}
