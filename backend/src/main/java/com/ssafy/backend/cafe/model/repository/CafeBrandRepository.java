package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.model.vo.CafeAvg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CafeBrandRepository extends JpaRepository<CafeBrand, Integer> {
    Optional<CafeBrand> findByBrandId(int brandId);


    @Query(value = "SELECT avg(brand.laborEtcCost) as etc, avg(brand.laborRawMaterialCost) as material " +
            "FROM CafeBrand  as brand " +
            "WHERE  brand.brandType = :type" +
            " group by brand.brandType")
    CafeAvg getCafeAvg(String type);

    List<CafeBrand> findAllByBrandNameIn(List<String> brandNames);

}
