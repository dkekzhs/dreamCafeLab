package com.ssafy.backend.districtReport.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FloatingPopulationCard {
    // 유동인구
    int floating;
    int resident;

    // 유동인구 상위 백분율
    double floatingTopPercent;
    long floating10s;
    long floating20s;
    long floating30s;
    long floating40s;
    long floating50s;

    long resident10s;
    long resident20s;
    long resident30s;
    long resident40s;
    long resident50s;

    // 시간대별 판매량 (00:00-06:00)
    long timeZoneSales0006;
    // 시간대별 판매량 (06:00-11:00)
    long timeZoneSales0611;
    // 시간대별 판매량 (11:00-14:00)
    long timeZoneSales1114;
    // 시간대별 판매량 (14:00-17:00)
    long timeZoneSales1417;
    // 시간대별 판매량 (17:00-21:00)
    long timeZoneSales1721;
    // 시간대별 판매량 (21:00-24:00)
    long timeZoneSales2124;
    // 시간대별 유동인구 (00:00-06:00)
    long floating0006;
    // 시간대별 유동인구 (06:00-11:00)
    long floating0611;
    // 시간대별 유동인구 (11:00-14:00)
    long floating1114;
    // 시간대별 유동인구 (14:00-17:00)
    long floating1417;
    // 시간대별 유동인구 (17:00-21:00)
    long floating1721;
    // 시간대별 유동인구 (21:00-24:00)
    long floating2124;
    // 대표 연령 유동인구
    long ageFloating;
}
