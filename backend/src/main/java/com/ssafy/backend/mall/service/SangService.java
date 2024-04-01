package com.ssafy.backend.mall.service;

import com.ssafy.backend.mall.model.Vo.SangPercent;
import com.ssafy.backend.mall.model.Vo.SangVo;
import com.ssafy.backend.mall.model.domain.Sang;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;

import java.util.List;

public interface SangService {

    List<SangPercent> findByPointAndRadius(RequestPointRadiusDto dto);

    Sang findCloseSangByPoint(RequestPointRadiusDto dto);

    List<SangVo> findByDongCode(int code);
}
