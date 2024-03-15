package com.ssafy.backend.member.service;

import com.ssafy.backend.member.model.dto.RequestMemberAddUserDto;
import com.ssafy.backend.member.model.dto.RequestMemberLoginDto;
import com.ssafy.backend.member.model.vo.MemberVo;

import java.util.List;

public interface MemberService {
    void login(RequestMemberLoginDto dto);

    void addUser(RequestMemberAddUserDto dto);

    List<MemberVo> getUserList();
}
