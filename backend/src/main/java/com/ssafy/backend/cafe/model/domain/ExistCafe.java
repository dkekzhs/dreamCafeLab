package com.ssafy.backend.cafe.model.domain;

import com.ssafy.backend.cafe.model.vo.CafeVo;
import com.ssafy.backend.cafe.model.vo.ExistCafeVo;
import jakarta.persistence.*;
import lombok.Getter;
import org.locationtech.jts.geom.Point;

@Entity
@Getter
public class ExistCafe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cafeId;

    @ManyToOne
    @JoinColumn(name = "brandId")
    private CafeBrand cafeBrand;

    @Column
    private String cafeName;

    @Column
    private int districtId;

    @Column
    private Integer floor;

    @Column
    private Point cafePoint;

    public ExistCafeVo toVo(){
        return ExistCafeVo.builder()
                .cafeName(cafeName)
                .brand(cafeBrand)
                .cafeId(cafeId)
                .point(cafePoint)
                .floor(floor)
                .districtId(districtId)
                .build();
    }
}
