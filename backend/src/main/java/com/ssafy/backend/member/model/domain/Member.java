package com.ssafy.backend.member.model.domain;

import com.ssafy.backend.common.model.domain.BaseTime;
import com.ssafy.backend.member.model.vo.MemberVo;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Column
    private String password;

    @Column
    private int age;

    @Builder
    public Member(String name, String password, int age) {
        this.name = name;
        this.password = password;
        this.age = age;
    }


    public MemberVo toVo(){
        return MemberVo.builder()
                .userAge(age)
                .userName(name)
                .build();
    }
}
