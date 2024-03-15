package com.ssafy.backend.mall.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RequestPointRadiusDto {
    private Double lat,lng;
    private Integer radius;
}
