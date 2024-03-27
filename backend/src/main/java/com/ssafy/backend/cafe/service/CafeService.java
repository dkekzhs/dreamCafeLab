package com.ssafy.backend.cafe.service;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.model.vo.CafeVo;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;

import java.util.List;

public interface CafeService {

    List<CafeBrand> getBrandList();

    CafeVo getCafeList();

    CafeVo getCafePointRadius(RequestPointRadiusDto dto);
}
