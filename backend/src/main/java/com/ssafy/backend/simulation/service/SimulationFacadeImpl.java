package com.ssafy.backend.simulation.service;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.model.vo.CafeAvg;
import com.ssafy.backend.cafe.model.vo.CafeVo;
import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.facility.model.domain.FacilityType;
import com.ssafy.backend.facility.model.vo.FacilityDistance;
import com.ssafy.backend.facility.service.FacilityService;
import com.ssafy.backend.mall.model.Vo.MallAverageVo;
import com.ssafy.backend.mall.model.Vo.SangPercent;
import com.ssafy.backend.mall.model.Vo.SangPercentVo;
import com.ssafy.backend.mall.model.domain.Sang;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import com.ssafy.backend.mall.service.MallService;
import com.ssafy.backend.mall.service.SangService;
import com.ssafy.backend.simulation.model.dto.RevenueSaleDto;
import com.ssafy.backend.simulation.model.dto.SimulationCreateRequestDto;
import com.ssafy.backend.simulation.model.dto.SimulationTotalDto;
import com.ssafy.backend.simulation.model.dto.SimulationUpdateRequestDto;
import com.ssafy.backend.simulation.model.vo.SimulationUserVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class SimulationFacadeImpl implements SimulationFacade{
    private final SangService sangService;
    private final MallService mallService;
    private final FacilityService facilityService;
    private final CafeService cafeService;
    private final SimulationService simulationService;

    @Override
    public SimulationTotalDto simulationInit(SimulationCreateRequestDto RequestDto) {
        RequestPointRadiusDto dto = RequestPointRadiusDto.builder()
                .lng(RequestDto.getLng())
                .lat(RequestDto.getLat())
                .radius(RequestDto.getRadius()).build();

        List<SangPercent> percentList = sangService.findByPointAndRadius(dto);

        Sang sang = sangService.findCloseSangByPoint(dto);


        MallAverageVo averageVo = mallService.getAverageMallsPoint(dto);
        FacilityDistance facility = facilityService.getFacilityToPointRadius(dto);
        CafeVo cafeVo = cafeService.getCafePointRadius(dto);
        CafeBrand cafeBrand = cafeService.getCafeBrand(RequestDto.getBrandId());

        Integer initPrice = cafeService.getInitPrice(cafeBrand, RequestDto.getCafeSize());

        // 평균 임대료 보증금 평수로 비율 계산해 임대료를 계산
        double sizeRatio = (double) RequestDto.getCafeSize() / averageVo.getSpec();
        double adjustedPrc = averageVo.getPrc() * sizeRatio;
        log.info("rent 원래 : {} {} {}",averageVo.getPrc(), averageVo.getRentPrc(), averageVo.getSpec());
        int rentPrice = (int) ((adjustedPrc) * 10000);
        log.info(" rentPrice : {} {} {}", rentPrice,adjustedPrc);
        initPrice = initPrice  + rentPrice;

        List<FacilityType> type = facilityService.getAll();

        return SimulationTotalDto.builder()
                .districtPercent(percentList)
                .sang(sang.toVo())
                .mallAverageRent(averageVo)
                .facility(facility)
                .cafeVo(cafeVo)
                .input(RequestDto)
                .brand(cafeBrand)
                .initPrice(initPrice)
                .facilityTypeList(type)
                .build();
    }


    public SimulationUserVo simulationInitFacade(SimulationCreateRequestDto RequestDto) {
        RequestPointRadiusDto dto = RequestPointRadiusDto.builder()
                .lng(RequestDto.getLng())
                .lat(RequestDto.getLat())
                .radius(RequestDto.getRadius()).build();

        List<SangPercent> percentList = sangService.findByPointAndRadius(dto);

        Sang sang = sangService.findCloseSangByPoint(dto);


        MallAverageVo averageVo = mallService.getAverageMallsPoint(dto);
        FacilityDistance facility = facilityService.getFacilityToPointRadius(dto);
        CafeVo cafeVo = cafeService.getCafePointRadius(dto);
        CafeBrand cafeBrand = cafeService.getCafeBrand(RequestDto.getBrandId());

        Integer initPrice = cafeService.getInitPrice(cafeBrand, RequestDto.getCafeSize());

        // 평균 임대료 보증금 평수로 비율 계산해 임대료를 계산
        double sizeRatio = (double) RequestDto.getCafeSize() / averageVo.getSpec();
        double adjustedPrc = averageVo.getPrc() * sizeRatio;
        log.info("rent 원래 : {} {} {}",averageVo.getPrc(), averageVo.getRentPrc(), averageVo.getSpec());
        int rentPrice = (int) ((adjustedPrc) * 10000);
        log.info(" rentPrice : {} {} {}", rentPrice,adjustedPrc);
        initPrice = initPrice  + rentPrice;

        List<FacilityType> type = facilityService.getAll();

        SimulationTotalDto simulationData = SimulationTotalDto.builder()
                .districtPercent(percentList)
                .sang(sang.toVo())
                .mallAverageRent(averageVo)
                .facility(facility)
                .cafeVo(cafeVo)
                .input(RequestDto)
                .brand(cafeBrand)
                .initPrice(initPrice)
                .facilityTypeList(type)
                .build();
        String uuid = UUID.randomUUID().toString();

        //기타비용, 원재료비 없을 경우 같은 분류의 평균값
        if(simulationData.getSelectBrand().getLaborEtcCost() ==null|| simulationData.getSelectBrand().getLaborRawMaterialCost() ==null){
            CafeAvg cafeAvg = cafeService.getCafeAvg(simulationData.getSelectBrand().getBrandType());
            simulationData.getSelectBrand().updateEtc(cafeAvg.getEtc());
            simulationData.getSelectBrand().updateMaterial(cafeAvg.getMaterial());
        }
        List<RevenueSaleDto> revenueList = simulationService.getRevenueList(simulationData);
        simulationService.revenueListCreate(simulationData, revenueList);
        simulationService.simulationRedisCacheSave(uuid, simulationData);
        return SimulationUserVo
                .builder()
                .facilityList(simulationData.getFacilityList())
                .input(simulationData.getInput())
                .selectBrand(simulationData.getSelectBrand())
                .uuid(uuid)
                .initPrice(simulationData.getInitPrice())
                .revenueList(simulationData.getRevenueList())
                .facilityTypeList(simulationData.getFacilityTypeList())
                .build();
    }
    public SimulationUserVo simulationUpdate(SimulationUpdateRequestDto dto) {
        SimulationTotalDto simulationData = simulationService.simulationGetRedisCache(dto.getUuid());

        simulationService.updateSimulationEmployee(dto,simulationData);
        simulationService.updateFacility(dto,simulationData);
        List<RevenueSaleDto> revenueList = simulationService.getRevenueList(simulationData);
        //매출액 갱신
        simulationService.revenueListUpdate(dto,revenueList,simulationData);
        //캐시 저장
        simulationService.simulationRedisCacheUpdate(dto.getUuid(), simulationData);
        return SimulationUserVo
                .builder()
                .facilityList(simulationData.getFacilityList())
                .input(simulationData.getInput())
                .selectBrand(simulationData.getSelectBrand())
                .uuid(dto.getUuid())
                .initPrice(simulationData.getInitPrice())
                .revenueList(simulationData.getRevenueList())
                .facilityTypeList(simulationData.getFacilityTypeList())
                .build();
    }

}
