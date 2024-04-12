package com.ssafy.backend.cafe.model.vo;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import com.ssafy.backend.cafe.model.domain.ExistCafe;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

@Getter
@Setter
public class ExistCafeVo {
    private int cafeId;
    private String cafeName;
    private Integer brandId;
    private int districtId;
    private Integer floor;
    private double lat,lng;
    private Double distance;
    public ExistCafeVo() {
    }

    @Builder
    public ExistCafeVo(int cafeId,String cafeName, CafeBrand brand, int districtId, Integer floor, Point point,
                       Double distance) {
        this.cafeId = cafeId;
        this.cafeName = cafeName;

        if (brand != null) {
            this.brandId = brand.getBrandId();
        }

        this.districtId = districtId;
        this.floor = floor;

        if(point !=  null){
            this.lat = point.getX();
            this.lng = point.getY();
        }
    }
}


