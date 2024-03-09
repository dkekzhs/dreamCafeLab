package com.ssafy.backend.mall.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import org.locationtech.jts.geom.*;
@Entity
@Getter
public class Gu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 구 코드
    @Column
    private Integer sigCd;

    //구 이름
    @Column
    private String sigKorNm;

    @Column
    private Polygon geometry;




}
