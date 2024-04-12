package com.ssafy.backend.mall.model.repository;

import com.ssafy.backend.mall.model.Vo.MallAverageVoInterface;
import com.ssafy.backend.mall.model.Vo.SangPercentVo;
import com.ssafy.backend.mall.model.domain.Sang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SangRepository extends JpaRepository<Sang,Integer> {

    @Query(value = "SELECT sang.trdarCdName FROM Sang as sang " +
            "WHERE ST_Distance(sang.geometry, ST_GeomFromText(:p,0)) * 111195 <= :radius")
    List<String> findByPointAndRadius(String p, int radius);
    @Query(value = "SELECT trdar_cd as districtId, trdar_cd_name as trdarCdName, " +
            "ST_Area(ST_Intersection(geometry, ST_Buffer(ST_GeomFromText(CONCAT('POINT(', :lat, ' ', :lng, ')')), :radius / 111195))) AS overlapArea, " +
            "ST_Area(ST_Buffer(ST_GeomFromText(CONCAT('POINT(', :lat, ' ', :lng, ')')), :radius / 111195)) AS circleArea, " +
            "(ST_Area(ST_Intersection(geometry, ST_Buffer(ST_GeomFromText(CONCAT('POINT(', :lat, ' ', :lng, ')')), :radius / 111195))) / ST_Area(ST_Buffer(ST_GeomFromText(CONCAT('POINT(', :lat, ' ', :lng, ')')), :radius / 111195)) * 100) AS includePercent " +
            "FROM sang " +
            "WHERE ST_Intersects(geometry, ST_Buffer(ST_GeomFromText(CONCAT('POINT(', :lat, ' ', :lng, ')')), :radius / 111195))",
            nativeQuery = true)
    List<SangPercentVo> findSangOverlapByLocation(@Param("lat") double lat, @Param("lng") double lng, @Param("radius") double radius);

    @Query(value = "SELECT sang FROM Sang sang " +
            "ORDER BY ST_Distance(sang.geometry, ST_GeomFromText(:p,0)) * 111195 ASC ")
    Page<Sang> findFirstSang(String p,Pageable pageable);


    List<Sang> findAllByDong_AdmCd(int code);
}

