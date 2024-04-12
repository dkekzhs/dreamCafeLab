package com.ssafy.backend.cafe.controller;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.model.vo.CafeVo;
import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.common.model.response.BaseResponse;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/cafe")
public class CafeTestController {
    private final CafeService cafeService;

    @GetMapping("/brand")
    public BaseResponse<?> getCafeBrands(){
        List<CafeBrand> brandList = cafeService.getBrandList();
        return new BaseResponse(brandList);
    }

    @GetMapping("/cafe")
    public BaseResponse<?> getCafe(){
        CafeVo brandList = cafeService.getCafeList();
        return new BaseResponse(brandList);
    }

    @PostMapping("/point")
    public BaseResponse<?> getCafePointRadius(@RequestBody RequestPointRadiusDto dto) {
        CafeVo cafePointRadius = cafeService.getCafePointRadius(dto);
        return new BaseResponse<>(cafePointRadius);
    }

}
