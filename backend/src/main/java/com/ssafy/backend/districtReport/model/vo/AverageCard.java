package com.ssafy.backend.districtReport.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AverageCard {
    // cafes: 카페 수
    int cafes;
    // 서울 평균
    long districtSales;
    long weekdayAverageSales;
    long weekendAverageSales;
    // 카페 판매량
    long cafeSales;
    // 평균 판매량
    long averageSales;
    // 카페 판매량 상위 백분율
    double cafeTopPercent;
    // 주중 판매량
    long weekdaySales;
    // 주말 판매량
    long weekendSales;
    // sales_10s: 10대 판매량
    long sales10s;
    // sales_20s: 20대 판매량
    long sales20s;
    // 30대 판매량
    long sales30s;
    // 40대 판매량
    long sales40s;
    // 50대 이상 판매량
    long sales50s;
    // 남성 판매량
    long salesMale;
    // 여성 판매량
    long salesFemale;
}
