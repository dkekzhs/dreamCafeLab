package com.ssafy.backend.simulation.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RevenueSaleDto {
    private int quarter,month, year, revenue;

    @Builder
    public RevenueSaleDto(int quarter, int year, int revenue) {
        this.quarter = quarter;
        this.year = year;
        this.revenue = revenue;
    }

    public RevenueSaleDto() {
    }
}
