package com.ssafy.backend.mall.model.repository;

import com.ssafy.backend.mall.model.domain.Gu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuRepository extends JpaRepository<Gu,Integer> {
}
