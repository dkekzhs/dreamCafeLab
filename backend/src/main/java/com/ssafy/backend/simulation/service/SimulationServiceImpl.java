package com.ssafy.backend.simulation.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.common.exception.BaseException;
import com.ssafy.backend.facility.model.vo.FacilityVo;
import com.ssafy.backend.simulation.model.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

import static com.ssafy.backend.common.model.response.BaseResponseStatus.NOT_EXIST_REDIS_SIMULATION_KEY;

@Service
@Slf4j
@RequiredArgsConstructor
public class SimulationServiceImpl implements SimulationService{
    @Value("${django.simulations.url}")
    private String simulationsUrl;

    private final RedisTemplate redisTemplate;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    private double[] daysInMonth = {5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5}; // 각 달의 날짜 수
    @Override
    public SimulationTotalDto simulationRedisCacheSave(String UUID, SimulationTotalDto data) {
        redisTemplate.opsForValue().set(UUID, data, 10, TimeUnit.MINUTES);
        log.info("simuldata : {}", data);
        log.info("SIMULATION ID UUID : {}", UUID);
        return data;
    }
    public void simulationRedisCacheUpdate(String UUID, SimulationTotalDto data) {
        redisTemplate.opsForValue().set(UUID, data, 5, TimeUnit.MINUTES);
        log.info("시뮬레이션 데이터를 레디스에 업데이트했습니다. UUID: {}", UUID);
    }

    public SimulationTotalDto simulationGetRedisCache(String UUID) {
        Object data = redisTemplate.opsForValue().get(UUID);
        if (data == null) {
            throw new BaseException(NOT_EXIST_REDIS_SIMULATION_KEY);
        }
        log.info("simulationGetRedisCache UUID 값을 가져옵니다. : {}", UUID);
        return (SimulationTotalDto) data;
    }
    public void updateSimulationEmployee(SimulationUpdateRequestDto updateData, SimulationTotalDto simulationData) {
        if (updateData.getEmployees() != null) {
            simulationData.getInput().setEmployees(updateData.getEmployees());
        }
    }

    @Override
    @SneakyThrows
    public SimulationTotalDto updateSimulation(SimulationUpdateRequestDto dto) {
        SimulationTotalDto simulationData = simulationGetRedisCache(dto.getUuid());

        // dto에서 값을 추출하여 시뮬레이션 데이터 업데이트
        if (dto.getEmployees() != null) {
            simulationData.getInput().setEmployees(dto.getEmployees());
        }

        //퍼실리티 수 갱신
        updateFacility(dto,simulationData);

        List<RevenueSaleDto> revenueList = getRevenueList(simulationData);
        //매출액 갱신
        revenueListUpdate(dto,revenueList,simulationData);


        simulationRedisCacheUpdate(dto.getUuid(), simulationData);


        return simulationData;
    }

    public void updateFacility(SimulationUpdateRequestDto updateData,SimulationTotalDto simulationData) {
        List<FacilityVo> facility = simulationData.getFacilityList().getFacility();
        facility.removeIf(fac -> updateData.getRemoveFacility().contains(fac.getFacilityId()));
        List<FacilityVo> addFacilityList = updateData.getAddFacility();
        for (FacilityVo newFacility : addFacilityList) {
            // 새 Facility가 추가될 위치를 찾아서 추가
            int index = findInsertionIndex(facility, newFacility);
            facility.add(index, newFacility);
        }
    }

    // 새 Facility를 추가할 위치를 찾는 메서드
    private int findInsertionIndex(List<FacilityVo> facilityList, FacilityVo newFacility) {
        // 거리를 비교하여 적절한 위치를 찾음
        for (int i = 0; i < facilityList.size(); i++) {
            FacilityVo currentFacility = facilityList.get(i);
            if (compareDistance(newFacility, currentFacility) < 0) {
                return i; // 현재 Facility보다 거리가 가까우면 해당 위치에 추가
            }
        }
        return facilityList.size(); // 모든 Facility보다 거리가 멀면 리스트의 맨 끝에 추가
    }

    private int compareDistance(FacilityVo newFacility, FacilityVo currentFacility) {
        double distance1 = newFacility.getDistance();
        double distance2 = currentFacility.getDistance();

        if (distance1 < distance2) {
            return -1;
        } else if (distance1 == distance2) {
            return 0;
        } else {
            return 1;
        }
    }

    public void revenueListCreate(SimulationTotalDto dto, List<RevenueSaleDto> revenueList){
        IntStream.range(0, revenueList.size())
                .forEach(idx ->{
                    int revenue = revenueList.get(idx).getRevenue();
                    log.info("{} revenue", revenue);

                    //인건비
                    int numberOfEmployees = dto.getInput().getEmployees(); // 인원수
                    int month = (revenueList.get(idx).getQuarter() - 1) % 12; // 해당 매출이 발생한 달 계산
                    double monthlyPersonnelExpense = daysInMonth[month] * numberOfEmployees * 9870 * 18;
                    log.info(" {} {} SELECT ETC , MATERIAL",dto.getSelectBrand().getLaborEtcCost(),dto.getSelectBrand().getLaborRawMaterialCost());
                    //카페 지출
                    double material = revenue * ((double)dto.getSelectBrand().getLaborRawMaterialCost()/100);
                    double etcCost = revenue * ((double)dto.getSelectBrand().getLaborEtcCost()/100);
                    log.info(" {} {} SELECT ETC , MATERIAL", material, etcCost);
                    double totalCount = material + etcCost;


                    // 월별 rentPrice와 loanPrice 계산
                    double sizeRatio = (double) dto.getInput().getCafeSize() / (dto.getMallAverageRent().getSpec()/ 6.6);
                    double rentPrice = dto.getMallAverageRent().getRentPrc() * sizeRatio * 10000;

                    double loanPrice = dto.getInput().getLoanAmount() * dto.getInput().getInterestRate()/36;
                    totalCount += rentPrice + loanPrice + monthlyPersonnelExpense;

                    int employee = dto.getInput().getEmployees();
                    int salesCount = revenue / dto.getSelectBrand().getBestMenuPrice();

                    dto.getRevenueList().add(
                            ProgressDto.builder()
                                    .employees(employee)
                                    .totalCost(totalCount)
                                    .rentCost(rentPrice)
                                    .loanCost(loanPrice)
                                    .revenue(revenue)
                                    .materialCost(material)
                                    .etcCost(etcCost)
                                    .personCost(monthlyPersonnelExpense)
                                    .salesCount(salesCount)
                                    .month(revenueList.get(idx).getMonth())
                                    .year(revenueList.get(idx).getYear())
                                    .build()
                    );
                });
    }

    public void revenueListUpdate(SimulationUpdateRequestDto dto,List<RevenueSaleDto> revenueList, SimulationTotalDto simulationData) {
        IntStream.range(dto.getProgress(), revenueList.size())
                .forEach(idx ->{
                    int revenue = revenueList.get(idx).getRevenue();

                    //인건비
                    int numberOfEmployees = dto.getEmployees(); // 인원수
                    int month = (revenueList.get(idx).getQuarter() - 1) % 12; // 해당 매출이 발생한 달 계산
                    double monthlyPersonnelExpense = daysInMonth[month] * numberOfEmployees * 9870 * 18;

                    //카페 지출
                    double material = revenue * ((double)simulationData.getSelectBrand().getLaborRawMaterialCost()/100);
                    double etcCost = revenue * ((double)simulationData.getSelectBrand().getLaborEtcCost()/100);

                    double totalCount = material + etcCost;


                    // 월별 rentPrice와 loanPrice 계산
                    double sizeRatio = (double) simulationData.getInput().getCafeSize() / (simulationData.getMallAverageRent().getSpec()/ 6.6);
                    double rentPrice = simulationData.getMallAverageRent().getRentPrc() * sizeRatio * 10000;
                    double loanPrice = simulationData.getInput().getLoanAmount() * simulationData.getInput().getInterestRate()/36;

                    totalCount += rentPrice + loanPrice + monthlyPersonnelExpense;


                    int salesCount = revenue / simulationData.getSelectBrand().getBestMenuPrice();
                    simulationData.getRevenueList().set(idx,
                            ProgressDto.builder()
                                    .employees(numberOfEmployees)
                                    .totalCost(totalCount)
                                    .rentCost(rentPrice)
                                    .loanCost(loanPrice)
                                    .revenue(revenue)
                                    .materialCost(material)
                                    .etcCost(etcCost)
                                    .personCost(monthlyPersonnelExpense)
                                    .salesCount(salesCount)
                                    .month(revenueList.get(idx).getMonth())
                                    .year(revenueList.get(idx).getYear())
                                    .build()
                    );
                });
    }

    @Override
    @SneakyThrows
    public List<RevenueSaleDto> getRevenueList(SimulationTotalDto ret) {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("result", ret);

        // 맵을 JSON 문자열로 직렬화
        String requestJson = objectMapper.writeValueAsString(requestBody);
        // 다른 장고 서버에 요청 보내기
        ResponseEntity<String> response = restTemplate.postForEntity(simulationsUrl, requestJson, String.class);
        // 응답 처리
        String res = response.getBody();
        SimulationResult dtoList = objectMapper.readValue(res, SimulationResult.class);
        List<RevenueSaleDto> progress = dtoList.getResult().getProgress();

        return progress;
    }
}
