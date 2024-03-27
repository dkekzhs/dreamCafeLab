package com.ssafy.backend.facility.model.repository;

import com.ssafy.backend.facility.model.domain.FacilityType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityTypeRepository extends JpaRepository<FacilityType,Byte> {
}
