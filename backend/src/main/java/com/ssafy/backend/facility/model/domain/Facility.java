package com.ssafy.backend.facility.model.domain;

import com.ssafy.backend.facility.model.vo.FacilityVo;
import jakarta.persistence.*;
import lombok.Getter;
import org.locationtech.jts.geom.Point;

@Entity
@Getter
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long facilityId;

    @ManyToOne()
    @JoinColumn(name = "facility_type_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private FacilityType facilityType;

    @Column
    private String facilityName;

    @Column(nullable = true)
    private Integer districtId;

    @Column
    private Point facilityPoint;


    public FacilityVo toVo() {
        return FacilityVo.builder()
                .districtId(districtId)
                .facilityId(facilityId)
                .facilityName(facilityName)
                .facilityPoint(facilityPoint)
                .build();
    }

}
