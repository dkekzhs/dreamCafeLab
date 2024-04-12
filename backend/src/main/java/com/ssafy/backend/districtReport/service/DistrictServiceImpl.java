package com.ssafy.backend.districtReport.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.common.exception.BaseException;
import com.ssafy.backend.districtReport.model.domain.DistrictReport;
import com.ssafy.backend.districtReport.model.repository.DistrictReportRepository;
import com.ssafy.backend.districtReport.model.vo.*;
import com.ssafy.backend.mall.model.Vo.SangVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.backend.common.model.response.BaseResponseStatus.NOT_EXIST__DISTRICT_REPORT;

@Service
@Slf4j
@RequiredArgsConstructor
public class DistrictServiceImpl implements  DistrictService {
    private final DistrictReportRepository districtReportRepository;
    private final ObjectMapper mapper;


    @Override
    public DistrictReportCardVO getDistrictReport(int id) {
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DistrictReport districtReport = districtReportRepository.findDistrictReportByDistrictId(id)
                .orElseThrow(() -> new BaseException(NOT_EXIST__DISTRICT_REPORT));

        log.info("DistrictReport : {}", districtReport);
        AverageCard averageCard = mapper.convertValue(districtReport, AverageCard.class);
        ClosingRateCard closingRateCard = mapper.convertValue(districtReport,
                ClosingRateCard.class);
        SalesCard salesCard = mapper.convertValue(districtReport, SalesCard.class);
        FloatingPopulationCard floatingPopulationCard = mapper.convertValue(districtReport,
                FloatingPopulationCard.class);
        GatheringFacilitiesCard gatheringFacilitiesCard = mapper.convertValue(districtReport,
                GatheringFacilitiesCard.class);
        return DistrictReportCardVO.builder()
                .districtId(districtReport.getDistrictId())
                .districtName(districtReport.getDistrictName())
                .averageCard(averageCard)
                .salesCard(salesCard)
                .closingRateCard(closingRateCard)
                .gatheringFacilitiesCard(gatheringFacilitiesCard)
                .floatingPopulationCard(floatingPopulationCard)
                .build();
    }

    @Override
    public List<DistrictReport> findBySangCode(List<SangVo> list) {
        List<Integer> collect = list.parallelStream().map(SangVo::getDistrict_code).collect(Collectors.toList());
        return districtReportRepository.findAllByDistrictIdIn(collect);
    }

    @Override
    public DistrictReport findByDistrict(int districtId) {
        return districtReportRepository.findById(districtId).orElseThrow(() ->new BaseException(NOT_EXIST__DISTRICT_REPORT));
    }

}
