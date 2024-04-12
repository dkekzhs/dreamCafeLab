package com.ssafy.backend.districtReport.model.domain;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import lombok.ToString;

@Getter
@Setter
@Entity
@ToString
@Table(name = "district_report")
public class DistrictReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "district_id")
    private Long districtId;

    @Column(name = "district_name")
    private String districtName;

    @Column(name = "average_sales")
    private Double averageSales;

    @Column(name = "cafe_top_percent")
    private Double cafeTopPercent;

    @Column(name = "cafes")
    private Double cafes;

    @Column(name = "floating_top_percent")
    private Double floatingTopPercent;

    @Column(name = "rent_fee")
    private Double rentFee;

    @Column(name = "deposit")
    private Double deposit;

    @Column(name = "rent_spec")
    private Double rentSpec;

    @Column(name = "closures")
    private Double closures;

    @Column(name = "num_of_cafe")
    private Double numOfCafe;

    @Column(name = "num_of_cafe_1")
    private Double numOfCafe1;

    @Column(name = "num_of_cafe_2")
    private Double numOfCafe2;

    @Column(name = "num_of_cafe_3")
    private Double numOfCafe3;

    @Column(name = "closure_top_percent")
    private Double closureTopPercent;

    @Column(name = "day_of_week")
    private Double dayOfWeek;

    @Column(name = "time_zone")
    private String timeZone;

    @Column(name = "age")
    private Double age;

    @Column(name = "gender")
    private String gender;

    @Column(name = "age_floating")
    private Double ageFloating;

    @Column(name = "recom_brand_type")
    private String recomBrandType;

    @Column(name = "first_recom_brand")
    private String firstRecomBrand;

    @Column(name = "second_recom_brand")
    private String secondRecomBrand;

    @Column(name = "third_recom_brand")
    private String thirdRecomBrand;

    @Column(name = "cost_effectiveness")
    private Double costEffectiveness;

    @Column(name = "district_sales")
    private Double districtSales;

    @Column(name = "weekday_sales")
    private Double weekdaySales;

    @Column(name = "weekend_sales")
    private Double weekendSales;

    @Column(name = "time_zone_sales_0006")
    private Double timeZoneSales0006;

    @Column(name = "time_zone_sales_0611")
    private Double timeZoneSales0611;

    @Column(name = "time_zone_sales_1114")
    private Double timeZoneSales1114;

    @Column(name = "time_zone_sales_1417")
    private Double timeZoneSales1417;

    @Column(name = "time_zone_sales_1721")
    private Double timeZoneSales1721;

    @Column(name = "time_zone_sales_2124")
    private Double timeZoneSales2124;

    @Column(name = "sales_male")
    private Double salesMale;

    @Column(name = "sales_female")
    private Double salesFemale;

    @Column(name = "sales_10s")
    private Double sales10s;

    @Column(name = "sales_20s")
    private Double sales20s;

    @Column(name = "sales_30s")
    private Double sales30s;

    @Column(name = "sales_40s")
    private Double sales40s;

    @Column(name = "sales_50s")
    private Double sales50s;

    @Column(name = "floating")
    private Double floating;

    @Column(name = "resident")
    private Double resident;

    @Column(name = "floating_weekday")
    private Double floatingWeekday;

    @Column(name = "floating_weekend")
    private Double floatingWeekend;

    @Column(name = "floating_0006")
    private Double floating0006;

    @Column(name = "floating_0611")
    private Double floating0611;

    @Column(name = "floating_1114")
    private Double floating1114;

    @Column(name = "floating_1417")
    private Double floating1417;

    @Column(name = "floating_1721")
    private Double floating1721;

    @Column(name = "floating_2124")
    private Double floating2124;

    @Column(name = "floating_male")
    private Double floatingMale;

    @Column(name = "floating_female")
    private Double floatingFemale;

    @Column(name = "floating_10s")
    private Double floating10s;

    @Column(name = "floating_20s")
    private Double floating20s;

    @Column(name = "floating_30s")
    private Double floating30s;

    @Column(name = "floating_40s")
    private Double floating40s;

    @Column(name = "floating_50s")
    private Double floating50s;

    @Column(name = "resident_10s")
    private Double resident10s;

    @Column(name = "resident_20s")
    private Double resident20s;

    @Column(name = "resident_30s")
    private Double resident30s;

    @Column(name = "resident_40s")
    private Double resident40s;

    @Column(name = "cafe_sales")
    private Double cafeSales;

    @Column(name = "resident_50s")
    private Double resident50s;

    @Column(name = "public_office")
    private Double publicOffice;

    @Column(name = "pharmacy")
    private Double pharmacy;

    @Column(name = "bank")
    private Double bank;

    @Column(name = "university")
    private Double university;

    @Column(name = "theater")
    private Double theater;

    @Column(name = "hotel")
    private Double hotel;

    @Column(name = "subway")
    private Double subway;

    @Column(name = "bus_stop")
    private Double busStop;

    @Column(name = "hospital")
    private Double hospital;

    @Column(name = "facility_type")
    private String facilityType;

    @Column(name = "facility_type_value")
    private Double facilityTypeValue;

    @Column(name = "weekday_average_sales")
    private Double weekdayAverageSales;

    @Column(name = "weekend_average_sales")
    private Double weekendAverageSales;

    @Column(name = "recom_reason")
    private String recomReason;

    @Column(name = "small_theater")
    private Double smallTheater;

    @Column(name = "school")
    private Double school;

}
