package com.ssafy.backend.facility.model.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Getter
@Setter
public class FacilityDistance {

    private List<FacilityVo> facility = new ArrayList<>();
    private HashSet<FacilityTypeVo> facilityType = new HashSet<>();

    public void addFacility(FacilityVo vo) {
        facility.add(vo);
    }
    public void addFacilityType(FacilityTypeVo vo) {
        facilityType.add(vo);
    }


}
