package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CafeBrandRepository extends JpaRepository<CafeBrand, Integer> {
    Optional<CafeBrand> findByBrandId(int brandId);

}
