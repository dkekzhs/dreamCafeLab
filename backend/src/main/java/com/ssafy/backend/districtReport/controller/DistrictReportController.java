package com.ssafy.backend.districtReport.controller;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.model.dto.MapCafeInfoRequestDto;
import com.ssafy.backend.common.model.response.BaseResponse;
import com.ssafy.backend.common.model.response.BaseResponseStatus;
import com.ssafy.backend.districtReport.model.domain.DistrictReport;
import com.ssafy.backend.districtReport.model.vo.DistrictReportCardVO;
import com.ssafy.backend.districtReport.model.vo.MapDataVo;
import com.ssafy.backend.districtReport.service.DistrictFacade;
import com.ssafy.backend.districtReport.service.DistrictService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/district")
public class DistrictReportController {

    private final DistrictService districtService;
    private final DistrictFacade districtFacade;

    @GetMapping("/report/{id}")
    public BaseResponse<?> getReportData(@PathVariable int id){
        DistrictReportCardVO report = districtService.getDistrictReport(id);
        return new BaseResponse<>(report);
    }

    @GetMapping("/map/{dongCode}")
    public BaseResponse<?> getMapCafeInfo(@PathVariable int dongCode) {
        List<MapDataVo> list = districtFacade.getMapCafeInfo(dongCode);
        return new BaseResponse<>(list);
    }

    @GetMapping("/recommend/cafe/{districtId}")
    public BaseResponse<?> getRecommendBrand(@PathVariable int districtId){
        List<CafeBrand> recommendBrands = districtFacade.getRecommendBrands(districtId);
        return new BaseResponse<>(recommendBrands);
    }
    @GetMapping("/recommend/cafe/point")
    public BaseResponse<?> getRecommendBrandByPoint(@RequestParam double lat, @RequestParam double lng) {
        log.info("{} {} ttt", lat,lng);
        List<CafeBrand> recommendBrands = districtFacade.getRecommendBrandsByPoint(lat,lng);
        return new BaseResponse<>(recommendBrands);
    }


}
