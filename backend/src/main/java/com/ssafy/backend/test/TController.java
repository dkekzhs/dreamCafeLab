package com.ssafy.backend.test;

import com.ssafy.backend.common.model.response.BaseResponse;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import com.ssafy.backend.mall.service.SangService;
import com.ssafy.backend.simulation.model.dto.RevenueSaleDto;
import com.ssafy.backend.simulation.model.dto.SimulationCreateRequestDto;
import com.ssafy.backend.simulation.model.dto.SimulationUpdateRequestDto;
import com.ssafy.backend.simulation.model.dto.SimulationTotalDto;
import com.ssafy.backend.simulation.model.vo.SimulationUserVo;
import com.ssafy.backend.simulation.service.SimulationFacade;
import com.ssafy.backend.simulation.service.SimulationService;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static com.ssafy.backend.common.model.response.BaseResponseStatus.SUCCESS;

@RestController
@RequestMapping("/test")
@Slf4j
public class TController {
    private final SimulationFacade simulationFacade;
    private final SangService sangService;
    private final SimulationService simulationService;
    @Autowired
    public TController(SimulationFacade simulationFacade, SangService sangService, SimulationService simulationService) {
        this.simulationFacade = simulationFacade;
        this.sangService = sangService;
        this.simulationService = simulationService;

    }

    @PostMapping("/createTest")
    @SneakyThrows
    public BaseResponse<?> simulationTest(@RequestBody SimulationCreateRequestDto dto) {
        SimulationTotalDto ret = simulationFacade.simulationInit(dto);
        List<RevenueSaleDto> res = simulationService.getRevenueList(ret);
        // 응답 처리
        String uuid = UUID.randomUUID().toString();
        log.info("아 장고에서 가져온거 {} simualtionService에서 dto에 set함" ,res);
        simulationService.revenueListCreate(ret, res);

        log.info("매출액과 현재 잔고정보로 계산해야됨");

        simulationService.simulationRedisCacheSave(uuid,ret);
        // UUID랑 정보를 클라이언트에게 넘겨줌

        return new BaseResponse<>(SimulationUserVo
                .builder()
                .facilityList(ret.getFacilityList())
                .input(ret.getInput())
                .selectBrand(ret.getSelectBrand())
                .uuid(uuid)
                .initPrice(ret.getInitPrice())
                .revenueList(ret.getRevenueList())
                .facilityTypeList(ret.getFacilityTypeList())
                .build()
        );
    }

    @PostMapping("/updateTest")
    @SneakyThrows
    public BaseResponse<?> simulationUpdate(@RequestBody SimulationUpdateRequestDto dto) {

        SimulationTotalDto total = simulationService.updateSimulation(dto);
        log.info("사용자에게 업데이트 된 시뮬레이션 데이터를 전달한다");
        return new BaseResponse<>(SimulationUserVo
                .builder()
                .facilityList(total.getFacilityList())
                .input(total.getInput())
                .selectBrand(total.getSelectBrand())
                .uuid(dto.getUuid())
                .initPrice(total.getInitPrice())
                .revenueList(total.getRevenueList())
                .facilityTypeList(total.getFacilityTypeList())
                .build()
        );
    }

    @PostMapping("/saveTest")
    public BaseResponse<?> simulationSave(@RequestBody String uuid) {
        SimulationTotalDto simulationTotalDto = simulationService.simulationGetRedisCache(uuid);
        log.info("저장할 시뮬레이션 데이터 {}", simulationTotalDto);

        log.info("시뮬레이션 서비스에서 시뮬레이션 데이터를 가지고 계산해 저장하는 로직이 있어야함");

        return new BaseResponse<>(SUCCESS);
    }

    @SneakyThrows
    @PostMapping("/fetch")
    public BaseResponse<?> test() {
        // 클라이언트로부터 받은 요청을 처리
        SimulationCreateRequestDto dto = new SimulationCreateRequestDto();
        dto.setEmployees(3);
        dto.setLng(127.0478832);
        dto.setLat(37.50567504);
        dto.setRadius(100);
        dto.setInitialPrice(5000);
        dto.setInterestRate(5);
        dto.setStartTime(LocalDateTime.now());

        SimulationTotalDto ret = simulationFacade.simulationInit(dto);
        List<RevenueSaleDto> revenueList = simulationService.getRevenueList(ret);

        return new BaseResponse<>(revenueList);
    }

    @PostMapping("/pointToSang")
    public BaseResponse<?> pointToSang(@RequestBody RequestPointRadiusDto dto){
        log.info("test : 좌표 기준으로 상권을 찾는다. {}",dto);
        return new BaseResponse<>(sangService.findByPointAndRadius(dto));
    }

    @PostMapping("/closeSang")
    public BaseResponse<?> closeSang(@RequestBody RequestPointRadiusDto dto){
        log.info("test : 좌표 기준으로 가장 가까운 상권을 찾는다. {}",dto);
        return new BaseResponse<>(sangService.findCloseSangByPoint(dto));
    }

    @PostMapping("/test")
    public BaseResponse<?> test(@RequestBody SimulationCreateRequestDto dto){
        log.info("test : 좌표 기준으로 주변상권,집객시설 등등을 찾는다. {}",dto);

        return new BaseResponse<>(simulationFacade.simulationInit(dto));
    }
}
