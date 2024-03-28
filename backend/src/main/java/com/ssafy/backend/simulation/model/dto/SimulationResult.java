package com.ssafy.backend.simulation.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimulationResult {
    private int status;
    private String message;
    private Result result;
}
