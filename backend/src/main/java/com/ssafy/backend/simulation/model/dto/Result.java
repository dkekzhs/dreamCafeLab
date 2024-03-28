package com.ssafy.backend.simulation.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Result {
    List<RevenueSaleDto> progress = new ArrayList<RevenueSaleDto>();
}
