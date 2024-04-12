package com.ssafy.backend.mall.model.domain;

import com.ssafy.backend.mall.model.Vo.MallVo;
import jakarta.persistence.*;
import lombok.Getter;
import org.locationtech.jts.geom.Point;

@Entity
@Getter
public class Mall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String si;
    @Column
    private String gu;
    @Column
    private String dong;
    @Column
    private String tagList;
    @Column
    private String atclFetrDesc;
    @Column
    private Integer prc;
    @Column
    private Integer rentPrc;
    @Column
    private String rletTpNm;
    @Column
    private String tradTpCd;
    @Column
    private String atclNm;
    @Column
    private String direction;
    @Column
    private Integer spec;
    @Column
    private Point point;


    public MallVo toVo() {
        return MallVo.builder()
                .price(prc)
                .rentPrc(rentPrc)
                .spec(spec)
                .build();
    }
}
