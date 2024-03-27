package com.ssafy.backend.districtReport.service;


import com.ssafy.backend.districtReport.model.domain.DistrictReport;
import com.ssafy.backend.districtReport.model.vo.DistrictReportCardVO;

public interface DistrictService {

    DistrictReportCardVO getDistrictReport(int id);

}
