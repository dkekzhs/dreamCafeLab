package com.ssafy.backend.simulation.model.dto;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.model.vo.CafeVo;
import com.ssafy.backend.facility.model.domain.FacilityType;
import com.ssafy.backend.facility.model.vo.FacilityDistance;
import com.ssafy.backend.facility.model.vo.FacilityTypeVo;
import com.ssafy.backend.mall.model.Vo.MallAverageVo;
import com.ssafy.backend.mall.model.Vo.SangPercent;
import com.ssafy.backend.mall.model.Vo.SangPercentVo;
import com.ssafy.backend.mall.model.Vo.SangVo;
import com.ssafy.backend.simulation.model.dto.SimulationCreateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class SimulationTotalDto {
    private List<SangPercent> districtPercent;
    private SangVo closeDistrict;
    private MallAverageVo mallAverageRent;
    private FacilityDistance facilityList;
    private List<FacilityType> facilityTypeList;
    private CafeVo cafeList;
    private CafeBrand selectBrand;
    private SimulationCreateRequestDto input;
    private String userId;
    private List<ProgressDto> revenueList;
    private Integer initPrice;
    public SimulationTotalDto() {
        this.revenueList = new ArrayList<>();
    }

    @Builder
    public SimulationTotalDto(List<SangPercent> districtPercent, SangVo sang,
                              MallAverageVo mallAverageRent, FacilityDistance facility
            , CafeVo cafeVo, SimulationCreateRequestDto input, CafeBrand brand,int initPrice
            ,List<FacilityType> facilityTypeList) {
        this.districtPercent = districtPercent;
        this.closeDistrict = sang;
        this.mallAverageRent = mallAverageRent;
        this.facilityList = facility;
        this.cafeList = cafeVo;
        this.input = input;
        this.selectBrand = brand;
        this.revenueList = new ArrayList<>();
        this.initPrice = initPrice;
        this.facilityTypeList = facilityTypeList;
    }
}
