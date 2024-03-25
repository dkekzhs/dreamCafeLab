package com.ssafy.backend.mall.service;

import com.ssafy.backend.mall.model.Vo.SangPercentVo;
import com.ssafy.backend.mall.model.domain.Sang;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;

import java.util.List;
import java.util.Optional;

public interface SangService {

    List<SangPercentVo> findByPointAndRadius(RequestPointRadiusDto dto);

    Sang findCloseSangByPoint(RequestPointRadiusDto dto);
}
