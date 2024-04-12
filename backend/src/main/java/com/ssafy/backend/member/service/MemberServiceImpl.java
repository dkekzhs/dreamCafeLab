package com.ssafy.backend.member.service;


import com.ssafy.backend.common.exception.BaseException;
import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.dto.RequestMemberAddUserDto;
import com.ssafy.backend.member.model.dto.RequestMemberLoginDto;
import com.ssafy.backend.member.model.repository.MemberRepository;
import com.ssafy.backend.member.model.vo.MemberVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.backend.common.model.response.BaseResponseStatus.ALREADY_EXIST_EMAIL;
import static com.ssafy.backend.common.model.response.BaseResponseStatus.NOT_MATCH_LOGIN_USER;


@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
    private final MemberRepository userRepository;

    @Override
    public void login(RequestMemberLoginDto dto) {
        log.debug("BaseResponseStatus에 이넘클래스로 에러 정의한 후 사용");
        userRepository.findByNameAndPassword(dto.getUserName(),dto.getUserPassword())
                .orElseThrow(() -> {throw new BaseException(NOT_MATCH_LOGIN_USER);
                });
    }

    @Override
    public void addUser(RequestMemberAddUserDto dto) {
        userRepository.findByName(dto.getUserName())
                .ifPresent(e-> {throw new BaseException(ALREADY_EXIST_EMAIL);});
        userRepository.save(dto.toEntity());
    }

    @Override
    public List<MemberVo> getUserList() {
        List<Member> userList = userRepository.findAll();
        return userList.parallelStream().map(Member::toVo).collect(Collectors.toList());
    }
}
