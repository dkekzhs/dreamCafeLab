package com.ssafy.backend.cafe.model.vo;

import com.ssafy.backend.cafe.model.domain.CafeBrand;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class CafeVo {
    private List<ExistCafeVo> list = new ArrayList<>();
    private Set<CafeBrand> brand = new HashSet<>();

    public void addCafe(ExistCafeVo vo) {
        list.add(vo);
    }

    public void addBrand(CafeBrand vo) {
        brand.add(vo);

    }

}
