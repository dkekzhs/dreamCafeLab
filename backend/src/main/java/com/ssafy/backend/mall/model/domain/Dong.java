package com.ssafy.backend.mall.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import org.locationtech.jts.geom.Geometry;

@Entity
@Getter
public class Dong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gu_id")
    private Gu gu;
    // 동 코드
    @Column
    private Integer admCd;
    //동 이름
    @Column
    private String admNm;

    @Column
    private Geometry geometry;
}
