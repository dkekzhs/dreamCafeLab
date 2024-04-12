package com.ssafy.backend.facility.controller;

import com.ssafy.backend.common.model.response.BaseResponse;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import com.ssafy.backend.facility.service.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/facility")
@RequiredArgsConstructor
public class FacilityController {
    private final FacilityService facilityService;

    @PostMapping("/test")
    public BaseResponse<?> testFacility(@RequestBody RequestPointRadiusDto dto) {
        return new BaseResponse<>(facilityService.getFacilityToPointRadius(dto));
    }

    @GetMapping("/getAll/type")
    public BaseResponse<?> getAll() {
        return new BaseResponse<>(facilityService.getAll());
    }

}
