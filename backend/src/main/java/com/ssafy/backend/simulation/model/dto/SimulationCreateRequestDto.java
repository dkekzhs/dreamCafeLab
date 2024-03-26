package com.ssafy.backend.simulation.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class SimulationCreateRequestDto {
    private double lat,lng;
    private int radius;
    private int initialPrice;
    private double interestRate;
    private int employees;

    private LocalDateTime startTime;

}
