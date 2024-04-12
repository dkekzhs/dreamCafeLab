package com.ssafy.backend.mall.model.domain;

import com.ssafy.backend.mall.model.Vo.SangVo;
import jakarta.persistence.*;
import lombok.Getter;
import org.locationtech.jts.geom.Geometry;

@Entity
@Getter
public class Sang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dong_id")
    private Dong dong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gu_id")
    private Gu gu;

    //상권코드
    private Integer trdarCd;
    //상권 종류
    private String trdarSe;
    //trdarCdN 이름
    private String trdarCdName;
    private Geometry geometry;

    public SangVo toVo(){
        return SangVo.builder()
                .district_code(trdarCd)
                .trdarCdName(trdarCdName)
                .trdarSe(trdarSe)
                .build();
    }


}