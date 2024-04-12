package com.ssafy.backend.mall.service;

import com.ssafy.backend.mall.model.Vo.SangPercent;
import com.ssafy.backend.mall.model.Vo.SangPercentVo;
import com.ssafy.backend.mall.model.Vo.SangVo;
import com.ssafy.backend.mall.model.domain.Sang;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import com.ssafy.backend.mall.model.repository.SangRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SangServiceImpl implements SangService{
    private final SangRepository sangRepository;


    @Override
    public List<SangPercent> findByPointAndRadius(RequestPointRadiusDto dto) {
        List<SangPercentVo> list = sangRepository.findSangOverlapByLocation(dto.getLat(),dto.getLng(), dto.getRadius());
        List<SangPercent> realList = new ArrayList<SangPercent>();
        list.stream().forEach(e ->{
            realList.add(SangPercent.builder()
                    .circleArea(e.getCircleArea())
                    .overlapArea(e.getOverlapArea())
                    .trdarCdName(e.getTrdarCdName())
                    .includePercent(e.getIncludePercent())
                    .districtId(e.getDistrictId())
                    .build());
        });
        log.info("sang Service : list {} ", list);
        log.info("현재 geometry 가져오면 오류발생 jackson 지맘대로 파싱해주네");
        return realList;
    }

    @Override
    public Sang findCloseSangByPoint(RequestPointRadiusDto dto) {
        String pointWKT = String.format("POINT(%f %f)", dto.getLat(), dto.getLng());
        Pageable pageable = PageRequest.of(0, 1);
        Page<Sang> page = sangRepository.findFirstSang(pointWKT,pageable);
        return page.getContent().get(0);
    }

    @Override
    public List<SangVo> findByDongCode(int code) {
        List<Sang> list = sangRepository.findAllByDong_AdmCd(code);
        return list.stream().map(Sang::toVo).collect(Collectors.toList());
    }

}
