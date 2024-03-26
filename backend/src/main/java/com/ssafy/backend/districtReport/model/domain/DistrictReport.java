package com.ssafy.backend.districtReport.model.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Getter
@Entity
public class DistrictReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer districtId;

}
