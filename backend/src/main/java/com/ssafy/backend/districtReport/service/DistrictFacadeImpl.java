package com.ssafy.backend.districtReport.service;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.districtReport.model.domain.DistrictReport;
import com.ssafy.backend.districtReport.model.vo.MapDataVo;
import com.ssafy.backend.mall.model.Vo.SangVo;
import com.ssafy.backend.mall.model.domain.Sang;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import com.ssafy.backend.mall.service.SangService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DistrictFacadeImpl implements  DistrictFacade{
    private final DistrictService districtService;
    private final SangService sangService;
    private final CafeService cafeService;
    @Override
    public List<MapDataVo> getMapCafeInfo(int dongCode) {
        List<SangVo> list = sangService.findByDongCode(dongCode);
        List<DistrictReport> districtReportList = districtService.findBySangCode(list);
        List<CafeBrand> cafeBrandList = cafeService.getCafeBrandByDistrictReport(districtReportList);
        List<MapDataVo> mapDataList = new ArrayList<>();
        districtReportList.stream().forEach(district ->{

            for (CafeBrand brand :cafeBrandList) {
                if (district.getFirstRecomBrand().equals(brand.getBrandName())) {
                    mapDataList.add(MapDataVo.builder()
                            .cafeLogo(brand.getCafeLogo())
                            .districtId(district.getDistrictId())
                            .cafeName(brand.getBrandName())
                            .cafeType(brand.getBrandType())
                            .recommendReason(district.getRecomReason())
                            .build());
                    break;
                }
            }
        });
        return mapDataList;
    }

    @Override
    public List<CafeBrand> getRecommendBrands(int districtId) {
        DistrictReport district = districtService.findByDistrict(districtId);
        List<String> brandName = new ArrayList<>();
        brandName.add(district.getFirstRecomBrand());
        brandName.add(district.getSecondRecomBrand());
        brandName.add(district.getThirdRecomBrand());

        List<CafeBrand> cafeBrandList = cafeService.getRecommendCafe(brandName);

        List<CafeBrand> sortedCafeBrandList = brandName.stream()
                .map(brand -> cafeBrandList.stream()
                        .filter(cafeBrand -> cafeBrand.getBrandName().equals(brand))
                        .findFirst()
                        .orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return sortedCafeBrandList;
    }

    @Override
    public List<CafeBrand> getRecommendBrandsByPoint(double lat, double lng) {
        RequestPointRadiusDto dto = RequestPointRadiusDto.builder().lat(lat).lng(lng).radius(0).build();
        Sang closeSang = sangService.findCloseSangByPoint(dto);

        DistrictReport district = districtService.findByDistrict(closeSang.getTrdarCd());
        List<String> brandName = new ArrayList<>();
        brandName.add(district.getFirstRecomBrand());
        brandName.add(district.getSecondRecomBrand());
        brandName.add(district.getThirdRecomBrand());

        List<CafeBrand> cafeBrandList = cafeService.getRecommendCafe(brandName);

        List<CafeBrand> sortedCafeBrandList = brandName.stream()
                .map(brand -> cafeBrandList.stream()
                        .filter(cafeBrand -> cafeBrand.getBrandName().equals(brand))
                        .findFirst()
                        .orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return sortedCafeBrandList;
    }
}
