package com.ssafy.backend.cafe.service;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.model.domain.ExistCafe;
import com.ssafy.backend.cafe.model.repository.CafeBrandRepository;
import com.ssafy.backend.cafe.model.repository.ExistCafeRepository;
import com.ssafy.backend.cafe.model.vo.CafeAvg;
import com.ssafy.backend.cafe.model.vo.CafeVo;
import com.ssafy.backend.cafe.model.vo.ExistCafeVo;
import com.ssafy.backend.districtReport.model.domain.DistrictReport;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CafeBrandServiceImpl implements  CafeService{
    private final CafeBrandRepository cafeBrandRepository;
    private final ExistCafeRepository existCafeRepository;
    @Override
    public List<CafeBrand> getBrandList() {
        return cafeBrandRepository.findAll();
    }

    @Override
    public CafeVo getCafeList() {
        List<ExistCafe> all = existCafeRepository.findAll();
        CafeVo cafeVo = new CafeVo();
        all.stream().forEach(cafe ->{
            cafeVo.addCafe(cafe.toVo());
            cafeVo.addBrand(cafe.getCafeBrand());
        });
        return cafeVo;
    }

    @Override
    public CafeVo getCafePointRadius(RequestPointRadiusDto dto) {
        log.info("CafeService getCafePointRadius {}", dto);

        String pointWKT = String.format("POINT(%f %f)", dto.getLat(), dto.getLng());
        List<ExistCafe> all = existCafeRepository.findCafePointRadius(pointWKT, dto.getRadius());
        CafeVo cafeVo = new CafeVo();
        all.stream().forEach(cafe ->{
            ExistCafeVo vo = cafe.toVo();
            double lat = vo.getLat();
            double lng = vo.getLng();
            Double lat1 = dto.getLat();
            Double lng1 = dto.getLng();
            double distance = Math.abs(calculateDistance(lat, lng, lat1, lng1));
            vo.setDistance(distance);
            cafeVo.addCafe(vo);
            if(cafe.getCafeBrand() != null){
                cafeVo.addBrand(cafe.getCafeBrand());
            }
        });
        return cafeVo;
    }

    @Override
    public CafeBrand getCafeBrand(int brandId) {
        Optional<CafeBrand> brand = cafeBrandRepository.findByBrandId(brandId);
        if (brand.isPresent()) {
            return brand.get();
        }
        return null;
    }

    @Override
    public Integer getInitPrice(CafeBrand cafeBrand, Integer cafeSize) {
        int interiorAmount = cafeBrand.getAreaUnitInteriorAmount();
        if(cafeSize != null){
            interiorAmount = interiorAmount * cafeSize *1000;
        }
//        int guaranteedAmount = cafeBrand.getGuaranteedAmount() *1000;
//        int educationAmount = cafeBrand.getEducationAmount() *1000;
//        int franchiseAmount = cafeBrand.getFranchiseAmount() *1000;
//        int etcAmount = cafeBrand.getEtcAmount() *  1000;
//        log.info("{} {} {} {}, ededed", guaranteedAmount, educationAmount, franchiseAmount , interiorAmount);
        int totalAmount = cafeBrand.getTotalAmount();
        totalAmount = (totalAmount - (cafeBrand.getStandardStoreArea() * cafeBrand.getAreaUnitInteriorAmount())) * 1000;
        totalAmount = totalAmount + interiorAmount;

        return totalAmount;
    }

    @Override
    public CafeAvg getCafeAvg(String brandType) {
        CafeAvg cafeAvg = cafeBrandRepository.getCafeAvg(brandType);
        log.info("{} {} cafe VAG", cafeAvg.getEtc(), cafeAvg.getMaterial());
        return cafeAvg;

    }

    @Override
    public List<CafeBrand> getCafeBrandByDistrictReport(List<DistrictReport> districtReportList) {
        List<String> collect = districtReportList.parallelStream().map(DistrictReport::getFirstRecomBrand).collect(Collectors.toList());
        return cafeBrandRepository.findAllByBrandNameIn(collect);
    }

    @Override
    public List<CafeBrand> getRecommendCafe(List<String> brandName) {
        return cafeBrandRepository.findAllByBrandNameIn(brandName);

    }


    public static double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // 위도 및 경도를 라디안 단위로 변환
        double EARTH_RADIUS = 6371; // 지구 반지름 (단위: km)
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        // 위도 및 경도의 차이의 제곱 및 델타 값을 계산
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        // 중심 각도의 2배 아크 탄젠트를 취하여 거리를 계산
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // 실제 거리를 계산
        return EARTH_RADIUS * c * 1000;
    }

}
