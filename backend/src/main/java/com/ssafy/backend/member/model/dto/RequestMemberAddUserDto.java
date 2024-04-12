package com.ssafy.backend.member.model.dto;

import com.ssafy.backend.member.model.domain.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RequestMemberAddUserDto {
    private String userName;
    private String userPassword;
    private int userAge;

    public Member toEntity() {
        return Member.builder()
                .age(userAge)
                .password(userPassword)
                .name(userName)
                .build();
    }
}
