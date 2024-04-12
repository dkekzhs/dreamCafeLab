package com.ssafy.backend.facility.model.vo;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

@Getter
@Setter
public class FacilityVo {
    private Long facilityId;
    private String facilityName;
    private Integer districtId;
    private double lat, lng;
    private Double distance;
    private int facilityTypeId;

    public FacilityVo() {
    }

    @Builder
    public FacilityVo(Long facilityId, String facilityName, Integer districtId, Point facilityPoint,Double distance, int facilityTypeId) {
        this.facilityId = facilityId;
        this.facilityName = facilityName;
        this.districtId = districtId;
        if(facilityPoint != null){
            this.lat = facilityPoint.getX();
            this.lng = facilityPoint.getY();
        }
        this.distance = distance;
        this.facilityTypeId = facilityTypeId;
    }
}