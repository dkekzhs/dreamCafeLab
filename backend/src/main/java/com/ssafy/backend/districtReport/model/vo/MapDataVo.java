package com.ssafy.backend.districtReport.model.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MapDataVo {
    private String cafeLogo;
    private String cafeName;
    private String cafeType;
    private long districtId;
    private String recommendReason;

    @Builder
    public MapDataVo(String cafeLogo, String cafeName, String cafeType, long districtId,String recommendReason) {
        this.cafeLogo = cafeLogo;
        this.cafeName = cafeName;
        this.cafeType = cafeType;
        this.districtId = districtId;
        this.recommendReason = recommendReason;
    }
}
