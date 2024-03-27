package com.ssafy.backend.simulation.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SimulationUpdateRequestDto {
    private String uuid;
    private Integer employees;
    private Integer progress;
//    private List<Integer> removeFacility;
//    private List<Integer> AddFacility;

}
