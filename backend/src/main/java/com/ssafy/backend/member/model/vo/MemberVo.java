package com.ssafy.backend.member.model.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberVo {
    private String userName;
    private String userPassword;
    private int userAge;

    @Builder
    public MemberVo(String userName, int userAge) {
        this.userName = userName;
        this.userAge = userAge;
    }
}
