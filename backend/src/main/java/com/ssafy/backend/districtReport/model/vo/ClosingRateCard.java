package com.ssafy.backend.districtReport.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClosingRateCard {

    int closures;
    int numOfCafe;
    int numOfCafe1;
    int numOfCafe2;
    int numOfCafe3;
    double closureTopPercent;
}
