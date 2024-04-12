package com.ssafy.backend.simulation.model.vo;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.facility.model.domain.FacilityType;
import com.ssafy.backend.facility.model.vo.FacilityDistance;
import com.ssafy.backend.facility.model.vo.FacilityTypeVo;
import com.ssafy.backend.simulation.model.dto.ProgressDto;
import com.ssafy.backend.simulation.model.dto.SimulationCreateRequestDto;
import com.ssafy.backend.simulation.model.dto.SimulationTotalDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SimulationUserVo {
    private String uuid;
    private Integer initPrice;
    private CafeBrand selectBrand;
    private FacilityDistance facilityList;
    private SimulationCreateRequestDto input;
    private List<ProgressDto> revenueList;
    private List<FacilityType> facilityTypeList;
    public SimulationUserVo() {
    }

    @Builder
    public SimulationUserVo(String uuid, Integer initPrice, CafeBrand selectBrand,
                            FacilityDistance facilityList, SimulationCreateRequestDto input,
                            List<ProgressDto> revenueList,  List<FacilityType> facilityTypeList) {
        this.uuid = uuid;
        this.initPrice = initPrice;
        this.selectBrand = selectBrand;
        this.facilityList = facilityList;
        this.input = input;
        this.revenueList = revenueList;
        this.facilityTypeList = facilityTypeList;
    }
}
