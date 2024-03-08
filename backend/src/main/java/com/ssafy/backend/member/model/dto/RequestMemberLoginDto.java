package com.ssafy.backend.member.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestMemberLoginDto {
    private String userName;
    private String userPassword;
}
