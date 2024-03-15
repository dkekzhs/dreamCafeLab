package com.ssafy.backend.mall.model.repository;

import com.ssafy.backend.mall.model.domain.Dong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DongRepository extends JpaRepository<Dong,Integer> {
}
