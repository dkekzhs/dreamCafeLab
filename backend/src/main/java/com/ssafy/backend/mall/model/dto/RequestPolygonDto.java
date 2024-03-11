package com.ssafy.backend.mall.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RequestPolygonDto {
    private List<List<Double>> coordinates;

}
