package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.ExistCafe;
import com.ssafy.backend.mall.model.Vo.MallAverageVoInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExistCafeRepository extends JpaRepository<ExistCafe, Integer> {
    @Query(value = "SELECT cafe " +
            "FROM ExistCafe as cafe " +
            "WHERE ST_Contains(" +
            "ST_Buffer(ST_GeomFromText(:p, 0), :radius / 111195), " +
            "cafe.cafePoint)")
    List<ExistCafe> findCafePointRadius(String p, int radius);
}
