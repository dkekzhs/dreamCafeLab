package com.ssafy.backend.facility.model.vo;


import org.geolatte.geom.Point;

public interface FacilityDistanceVo {
    Long getFacilityId();
    String getFacilityName();
    String getFacilityTypeName();
    Integer getFacilityTypeId();
    Integer getDistrictId();
    Point getFacilityPoint();

    Double getDistance();
}
