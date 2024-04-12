package com.ssafy.backend.simulation.model.dto;

import com.ssafy.backend.facility.model.vo.FacilityVo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SimulationUpdateRequestDto {
    private String uuid;
    private Integer employees;
    private Integer progress;
    //리스트 형태로 삭제할 Facility Id 값을 넘겨주면 삭제함
    private List<Long> removeFacility;

    //추가할 퍼실리티 데이터를 리스트 형태로 줘야함SimulationUpdateRequestDto
    //facilityId; distance; facilityTypeId 넣어서 리스트 형태로 주면 됨
    // AddFacility : [ {facilityId : null 가능, facilityTypeId : 집객시설아이디, distance : 거리 }]
    private List<FacilityVo> AddFacility;

}
