package com.ssafy.backend.mall.model.Vo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SangPercent {
    private Integer districtId;
    private String trdarCdName;
    private Double overlapArea,circleArea,includePercent;

    public SangPercent() {
    }

    @Builder
    public SangPercent(Integer districtId, String trdarCdName, Double overlapArea, Double circleArea, Double includePercent) {
        this.districtId = districtId;
        this.trdarCdName = trdarCdName;
        this.overlapArea = overlapArea;
        this.circleArea = circleArea;
        this.includePercent = includePercent;
    }
}
