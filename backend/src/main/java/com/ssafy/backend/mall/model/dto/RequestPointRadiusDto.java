package com.ssafy.backend.mall.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RequestPointRadiusDto {
    private Double lat,lng;
    private Integer radius;

    @Builder
    public RequestPointRadiusDto(Double lat, Double lng, Integer radius) {
        this.lat = lat;
        this.lng = lng;
        this.radius = radius;
    }
}
