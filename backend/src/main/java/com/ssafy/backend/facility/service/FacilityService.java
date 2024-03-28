package com.ssafy.backend.facility.service;

import com.ssafy.backend.facility.model.vo.FacilityDistance;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;

public interface FacilityService {

    FacilityDistance getFacilityToPointRadius(RequestPointRadiusDto dto);
}
