package com.ssafy.backend.mall.service;

import com.ssafy.backend.mall.model.Vo.MallAverageVo;
import com.ssafy.backend.mall.model.Vo.MallAverageVoInterface;
import com.ssafy.backend.mall.model.Vo.MallVo;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import com.ssafy.backend.mall.model.dto.RequestPolygonDto;

import java.util.List;

public interface MallService {
    List<MallVo> getMalls();

    MallAverageVo getAverageMallsRentsByPointInGu(int code);
    MallAverageVo getAverageMallsRentsByPointInDong(int code);
    MallAverageVo getAverageMallsRentsByPointInSang(int code);

    MallAverageVo getAverageMallsPoint(RequestPointRadiusDto dto);

    MallAverageVo getAverageMallPolygon(RequestPolygonDto dto);

    MallAverageVo getGuAverageRentsByName(int code);
    MallAverageVo getDongAverageRentsByName(int code);

}
