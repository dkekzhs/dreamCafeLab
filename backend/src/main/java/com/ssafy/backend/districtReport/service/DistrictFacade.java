package com.ssafy.backend.districtReport.service;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.model.dto.MapCafeInfoRequestDto;
import com.ssafy.backend.districtReport.model.vo.MapDataVo;

import java.util.List;

public interface DistrictFacade {

    List<MapDataVo> getMapCafeInfo(int code);

    List<CafeBrand> getRecommendBrands(int districtId);
}
