package com.ssafy.backend.districtReport.service;


import com.ssafy.backend.districtReport.model.domain.DistrictReport;
import com.ssafy.backend.districtReport.model.vo.DistrictReportCardVO;
import com.ssafy.backend.mall.model.Vo.SangVo;

import java.util.List;

public interface DistrictService {

    DistrictReportCardVO getDistrictReport(int id);

    List<DistrictReport> findBySangCode(List<SangVo> list);
}
