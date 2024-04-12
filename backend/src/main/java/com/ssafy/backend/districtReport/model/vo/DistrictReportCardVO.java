package com.ssafy.backend.districtReport.model.vo;

import com.ssafy.backend.districtReport.model.domain.DistrictReport;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class DistrictReportCardVO {
    private Long districtId;
    private String districtName;
    AverageCard averageCard;
    ClosingRateCard closingRateCard;
    GatheringFacilitiesCard gatheringFacilitiesCard;
    FloatingPopulationCard floatingPopulationCard;
    SalesCard salesCard;
}
