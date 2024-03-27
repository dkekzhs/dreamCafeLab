package com.ssafy.backend.facility.model.domain;


import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class FacilityType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Byte facilityTypeId;

    @Column
    private String facilityTypeName;

    @Column
    private String imagePath;


}
