package com.ssafy.backend.mall.model.repository;

import com.ssafy.backend.mall.model.domain.Sang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SangRepository extends JpaRepository<Sang,Integer> {
}
