package com.ssafy.backend.mall.model.repository;

import com.ssafy.backend.mall.model.Vo.MallAverageVoInterface;
import com.ssafy.backend.mall.model.domain.Mall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MallRepository extends JpaRepository<Mall, Long> {
    @Query(value = "SELECT avg(m.rentPrc) as rentPrc," +
            "avg(m.prc) as prc, " +
            "avg(m.spec) as spec " +
            " FROM Mall as m " +
            "WHERE st_contains((SELECT g.geometry FROM Gu as g WHERE g.sigCd = :code),m.point)")
    List<MallAverageVoInterface> findAverageGu(int code);

    @Query(value = "SELECT avg(m.rentPrc) as rentPrc," +
            "avg(m.prc) as prc, " +
            "avg(m.spec) as spec " +
            " FROM Mall as m " +
            "WHERE st_contains((SELECT d.geometry FROM Dong as d WHERE d.admCd = :code),m.point)")
    List<MallAverageVoInterface> findAverageDong(int code);

    @Query(value = "SELECT avg(m.rentPrc) as rentPrc," +
            "avg(m.prc) as prc, " +
            "avg(m.spec) as spec " +
            " FROM Mall as m " +
            "WHERE st_contains((SELECT s.geometry FROM Sang as s WHERE s.trdarCd = :code),m.point)")
    List<MallAverageVoInterface> findAverageSang(int code);


    @Query(value = "SELECT avg(m.rentPrc) as rentPrc, " +
            "avg(m.prc) as prc, " +
            "avg(m.spec) as spec " +
            "FROM Mall as m " +
            "WHERE ST_Contains(" +
            "ST_Buffer(ST_GeomFromText(:p, 0), :radius / 111195 ), " +
            "m.point)")
    List<MallAverageVoInterface> findAveragePointAndRadius(String p, int radius);

    @Query(value = "SELECT avg(m.rentPrc) as rentPrc," +
            "avg(m.prc) as prc, " +
            "avg(m.spec) as spec " +
            " FROM Mall as m " +
            "WHERE ST_Intersects(ST_GeomFromText(:polygon,0), m.point)")
    List<MallAverageVoInterface> findAveragePolygon(String polygon);


    @Query(value = "SELECT avg(m.rentPrc) as rentPrc," +
            "avg(m.prc) as prc, " +
            "avg(m.spec) as spec " +
            " FROM Mall as m " +
            "LEFT JOIN Gu as g ON " +
            "g.sigKorNm = m.gu AND g.sigCd = :code")
    List<MallAverageVoInterface> findAverageGuByName(int code);

    @Query(value = "SELECT avg(m.rentPrc) as rentPrc," +
            "avg(m.prc) as prc, " +
            "avg(m.spec) as spec " +
            " FROM Mall as m " +
            "LEFT JOIN Dong as d ON " +
            "d.admNm = m.dong AND d.admCd = :code")
    List<MallAverageVoInterface> findAverageDongByName(int code);


}

