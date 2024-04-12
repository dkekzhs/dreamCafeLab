package com.ssafy.backend.mall.controller;

import com.ssafy.backend.common.model.response.BaseResponse;
import com.ssafy.backend.mall.model.Vo.MallAverageVoInterface;
import com.ssafy.backend.mall.model.Vo.MallVo;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import com.ssafy.backend.mall.model.dto.RequestPolygonDto;
import com.ssafy.backend.mall.service.MallService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mall")
@RequiredArgsConstructor
@Slf4j
public class MallController {
    private final MallService mallService;

    @GetMapping("/get/malls")
    private BaseResponse<?> getMalls(){
        log.info("[controller] 모든 부동산 매물을 가져 온다.");
        List<MallVo> malls = mallService.getMalls();
        return new BaseResponse(malls);
    }
    @GetMapping("/get/gu/name/{code}")
    private BaseResponse<?> getGuAverageRentsByName(@PathVariable int code){
        log.info("[controller] 해당 구 이름으로 평균을 가져 온다. ");
        log.info("int code :{}",code);
        return new BaseResponse(mallService.getGuAverageRentsByName(code));
    }
    @GetMapping("/get/dong/name/{code}")
    private BaseResponse<?> getDongAverageRentsByName(@PathVariable int code){
        log.info("[controller] 해당 동 이름으로 평균을 가져 온다. ");
        log.info("int code :{}",code);
        return new BaseResponse(mallService.getDongAverageRentsByName(code));
    }

    @GetMapping("/get/gu/code/{code}")
    private BaseResponse<?> getGuAverageMalls(@PathVariable int code){
        log.info("[controller] 해당 구의 평균을 가져 온다.");
        log.info("int code :{}",code);
        return new BaseResponse(mallService.getAverageMallsRentsByPointInGu(code));
    }

    @GetMapping("/get/dong/code/{code}")
    private BaseResponse<?> getDongAverageMalls(@PathVariable int code){
        log.info("[controller] 해당 동의 평균을 가져 온다.");
        log.info("int code :{}",code);
        return new BaseResponse(mallService.getAverageMallsRentsByPointInDong(code));
    }

    @GetMapping("/get/sang/code/{code}")
    private BaseResponse<?> getSangAverageMalls(@PathVariable int code){
        log.info("[controller] 해당 상권의 평균을 가져 온다.");
        log.info("int code :{}",code);
        return new BaseResponse(mallService.getAverageMallsRentsByPointInSang(code));
    }

    @GetMapping("/get/point")
    private BaseResponse<?> getAverageMallsPoint(RequestPointRadiusDto dto) {
        log.info("[controller] 해당 좌표 반경으로 평균을 가져 온다.");
        log.info("int dto :{}",dto);
        return new BaseResponse(mallService.getAverageMallsPoint(dto));
    }
    @PostMapping("/get/polygon")
    public BaseResponse<?> getAverageMallsPolygon(@RequestBody  RequestPolygonDto dto) {
        log.info("[controller] 해당 폴리건으로 평균을 가져 온다.");
        log.info("int dto :{}",dto);
        MallAverageVoInterface averageRent = mallService.getAverageMallPolygon(dto);
        return new BaseResponse(averageRent);
    }
}
