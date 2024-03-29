package com.ssafy.backend.facility.service;

import com.ssafy.backend.facility.model.domain.FacilityType;
import com.ssafy.backend.facility.model.vo.FacilityDistance;
import com.ssafy.backend.facility.model.vo.FacilityVo;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;

import java.util.List;

public interface FacilityService {

    FacilityDistance getFacilityToPointRadius(RequestPointRadiusDto dto);
    List<FacilityType> getAll();
}
