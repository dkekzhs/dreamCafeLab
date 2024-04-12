package com.ssafy.backend.facility.model.repository;

import com.ssafy.backend.facility.model.domain.Facility;
import com.ssafy.backend.facility.model.vo.FacilityDistanceVo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityRepository extends JpaRepository<Facility,Long> {

    @Query(value = "SELECT facility FROM Facility facility " +
            "WHERE ST_Distance(facility.facilityPoint, ST_GeomFromText(:p,0)) * 111195 <= :radius ")
    List<Facility> findFacilityByPoint(String p, int radius);

    @Query(value = "SELECT f.facility_id as facilityId , f.facility_name as facilityName, ft.facility_type_name as FacilityTypeName," +
            "ft.facility_type_id as facilityTypeId, f.district_id as districtId, " +
            "f.facility_point as facilityPoint, " +
            "ST_Distance(f.facility_point, ST_GeomFromText(CONCAT('POINT(', :lat, ' ', :lng, ')'), 0) ) *111195 as distance " +
            "FROM facility f " +
            "JOIN facility_type ft ON f.facility_type_id = ft.facility_type_id " +
            "WHERE ST_Distance(f.facility_point, ST_GeomFromText(CONCAT('POINT(', :lat, ' ', :lng, ')'), 0) ) *111195 <= :radius " +
            "ORDER BY distance ASC",
            nativeQuery = true)
    List<FacilityDistanceVo> findFacilityByPointAndType(double lat, double lng, double radius);

}

//ST_X(f.facility_point) as lat, ST_Y(f.facility_point) as lng