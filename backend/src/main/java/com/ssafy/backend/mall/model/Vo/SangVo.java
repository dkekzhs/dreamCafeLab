package com.ssafy.backend.mall.model.Vo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SangVo {
    private Integer district_code;
    private String trdarSe;
    private String trdarCdName;

    public SangVo() {
    }

    @Builder
    public SangVo(Integer district_code, String trdarSe, String trdarCdName) {
        this.district_code = district_code;
        this.trdarSe = trdarSe;
        this.trdarCdName = trdarCdName;
    }
}
