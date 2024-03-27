package com.ssafy.backend.districtReport.model.repository;

import com.ssafy.backend.districtReport.model.domain.DistrictReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DistrictReportRepository extends JpaRepository<DistrictReport,Integer> {

    Optional<DistrictReport> findDistrictReportByDistrictId(int id);
}
