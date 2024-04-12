package com.ssafy.backend.facility.service;

import com.ssafy.backend.common.utils.GeoConverter;
import com.ssafy.backend.facility.model.domain.Facility;
import com.ssafy.backend.facility.model.domain.FacilityType;
import com.ssafy.backend.facility.model.repository.FacilityRepository;
import com.ssafy.backend.facility.model.repository.FacilityTypeRepository;
import com.ssafy.backend.facility.model.vo.FacilityDistance;
import com.ssafy.backend.facility.model.vo.FacilityDistanceVo;
import com.ssafy.backend.facility.model.vo.FacilityTypeVo;
import com.ssafy.backend.facility.model.vo.FacilityVo;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FacilityServiceImpl implements  FacilityService{
    private final FacilityRepository facilityRepository;
    private final FacilityTypeRepository facilityTypeRepository;
    @Override
    public FacilityDistance getFacilityToPointRadius(RequestPointRadiusDto dto) {
        List<FacilityDistanceVo> facilities = facilityRepository.findFacilityByPointAndType(dto.getLat(), dto.getLng(), dto.getRadius());
        FacilityDistance facilityDistance = new FacilityDistance();

        facilities.forEach(f -> {

            FacilityVo facilityVo = FacilityVo.builder()
                    .facilityId(f.getFacilityId())
                    .facilityName(f.getFacilityName())
                    .districtId(f.getDistrictId())
                    .facilityPoint(GeoConverter.convertGeolattePointToJtsPoint(f.getFacilityPoint()))
                    .distance(f.getDistance())
                    .facilityTypeId(f.getFacilityTypeId())
                    .build();
            facilityDistance.addFacility(facilityVo);

            FacilityTypeVo facilityTypeVo = FacilityTypeVo.builder()
                    .facilityTypeId(f.getFacilityTypeId())
                    .facilityTypeName(f.getFacilityTypeName())
                    .build();
            facilityDistance.addFacilityType(facilityTypeVo);
        });
        return facilityDistance;
    }

    @Override
    public List<FacilityType> getAll() {
        List<FacilityType> all = facilityTypeRepository.findAll();

        return all;
    }

}
