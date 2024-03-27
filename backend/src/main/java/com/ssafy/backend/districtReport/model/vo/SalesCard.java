package com.ssafy.backend.districtReport.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SalesCard {
    // 평균 임대료
    int rentFee;
    // 평균 보증금
    int deposit;

    // 평 수
    int rentSpec;

    // 임대료 대비 카페 당 매출 퍼센트
    double costEffectiveness;
}
