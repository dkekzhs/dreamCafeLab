package com.ssafy.backend.simulation.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProgressDto {
    private int revenue,salesCount,employees;
    private int totalCost;
    private int year,month;
    private int personCost,etcCost,materialCost,rentCost,loanCost ;

    public ProgressDto() {
    }

    @Builder
    public ProgressDto(int revenue, int salesCount, int employees, double totalCost, int year, int month, double personCost, double etcCost, double materialCost, double rentCost,double loanCost) {
        this.revenue = revenue;
        this.salesCount = salesCount;
        this.employees = employees;
        this.totalCost = (int)totalCost;
        this.year = year;
        this.month = month;
        this.personCost =(int) personCost;
        this.etcCost = (int)etcCost;
        this.materialCost = (int)materialCost;
        this.rentCost = (int)rentCost;
        this.loanCost = (int) loanCost;

    }
}
