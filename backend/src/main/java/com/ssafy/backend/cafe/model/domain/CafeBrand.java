package com.ssafy.backend.cafe.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;


@Entity
@Getter
public class CafeBrand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id")
    private int brandId;

    @Column(name = "brand_name", length = 100, nullable = false)
    private String brandName;

    @Column(name = "brand_type", length = 50)
    private String brandType;

    @Column(name = "desposit_amount")
    private int depositAmount;

    @Column(name = "desposit_amount_yn")
    private boolean depositAmountYn;

    @Column(name = "debt_grantee_contract_yn")
    private boolean debtGranteeContractYn;

    @Column(name = "extended_contract_year")
    private byte extendedContractYear;

    @Column(name = "first_contract_year")
    private byte firstContractYear;

    @Column(name = "insurance_yn")
    private boolean insuranceYn;

    @Column(name = "interior_amount")
    private int interiorAmount;

    @Column(name = "guaranteed_amount")
    private int guaranteedAmount;

    @Column(name = "education_amount")
    private int educationAmount;

    @Column(name = "etc_amount")
    private int etcAmount;

    @Column(name = "franchise_amount")
    private int franchiseAmount;

    @Column(name = "total_amount")
    private int totalAmount;

    @Column(name = "standard_store_area")
    private int standardStoreArea;

    @Column(name = "area_unit_interior_amount")
    private int areaUnitInteriorAmount;

    @Column(name = "merchant_store_count")
    private int merchantStoreCount;

    @Column(name = "exit_contract_count")
    private int exitContractCount;

    @Column(name = "cancel_contract_count")
    private int cancelContractCount;

    @Column(name = "area_unit_average_sale")
    private int areaUnitAverageSale;

    @Column(name = "name_change_count")
    private int nameChangeCount;

    @Column(name = "new_franchise_regist_count")
    private int newFranchiseRegistCount;

    @Column(name = "average_sale")
    private int averageSale;

    @Column(name = "labor_personnel_expense")
    private Integer laborPersonnelExpense;

    @Column(name = "labor_raw_material_cost")
    private Integer laborRawMaterialCost;

    @Column(name = "labor_etc_cost")
    private Integer laborEtcCost;

    @Column(name = "best_menu_price")
    private Integer bestMenuPrice;

    @Column(name = "cafe_logo")
    private String cafeLogo;

    public void updateMaterial(Double laborRawMaterialCost) {
        this.laborRawMaterialCost = laborRawMaterialCost.intValue();
    }

    public void updateEtc(Double laborEtcCost) {
        this.laborEtcCost = laborEtcCost.intValue();
    }
}
