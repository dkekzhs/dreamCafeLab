package com.ssafy.backend.cafe.service;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.model.vo.CafeAvg;
import com.ssafy.backend.cafe.model.vo.CafeVo;
import com.ssafy.backend.districtReport.model.domain.DistrictReport;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;

import java.util.List;

public interface CafeService {

    List<CafeBrand> getBrandList();

    CafeVo getCafeList();

    CafeVo getCafePointRadius(RequestPointRadiusDto dto);

    CafeBrand getCafeBrand(int brandId);

    Integer getInitPrice(CafeBrand cafeBrand, Integer cafeSize);

    CafeAvg getCafeAvg(String brandType);

    List<CafeBrand> getCafeBrandByDistrictReport(List<DistrictReport> districtReportList);


    List<CafeBrand> getRecommendCafe(List<String> brandName);
}
