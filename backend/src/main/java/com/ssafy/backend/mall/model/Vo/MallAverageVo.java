package com.ssafy.backend.mall.model.Vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@AllArgsConstructor
@Builder
public class MallAverageVo implements MallAverageVoInterface {

    private Double rentPrc;
    private Double prc;
    private Double spec;

    public MallAverageVo() {
    }

    public Double getRentPrc() {
        return rentPrc;
    }

    public Double getPrc() {
        return prc;
    }

    public Double getSpec() {
        return spec;
    }
}

