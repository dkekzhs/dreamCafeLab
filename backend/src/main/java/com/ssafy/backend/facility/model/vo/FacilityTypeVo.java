package com.ssafy.backend.facility.model.vo;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class FacilityTypeVo {
    private int facilityTypeId;
    private String facilityTypeName;


    @Builder
    public FacilityTypeVo(int facilityTypeId, String facilityTypeName) {
        this.facilityTypeId = facilityTypeId;
        this.facilityTypeName = facilityTypeName;
    }
}
