package com.ssafy.backend.districtReport.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GatheringFacilitiesCard {
    // 대표 집객시설
    String facilityType;
    double facilityTypeValue;
    double bank;
    double busStop;
    double subway;
    double apartment;
    double hotel;
    double school;
    double university;
    double smallTheater;
    double theater;
    double hospital;
    double publicOffice;
    double pharmacy;
}
