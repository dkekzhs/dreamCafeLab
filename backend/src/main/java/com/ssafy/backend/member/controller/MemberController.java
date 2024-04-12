package com.ssafy.backend.member.controller;


import com.ssafy.backend.common.model.response.BaseResponse;
import com.ssafy.backend.member.model.dto.RequestMemberLoginDto;
import com.ssafy.backend.member.model.dto.RequestMemberAddUserDto;
import com.ssafy.backend.member.model.vo.MemberVo;
import com.ssafy.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.backend.common.model.response.BaseResponseStatus.SUCCESS;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService userService;

    @PostMapping("/login")
    public BaseResponse<?> login(@RequestBody RequestMemberLoginDto dto) {
        log.debug("sucess는 result가 비어있는 값");
        userService.login(dto);
        return new BaseResponse(SUCCESS);
    }
    @PostMapping("/add")
    public BaseResponse<?> addUser(@RequestBody RequestMemberAddUserDto dto){
        log.debug("sucess는 result가 비어있는 값");
        userService.addUser(dto);
        return new BaseResponse<>(SUCCESS);
    }
    @GetMapping("/list")
    public BaseResponse<?> getUserList(){
        log.debug("BaseResponse 데이터 넘겨주면 result에 해당 데이터 담김");
        List<MemberVo> userList = userService.getUserList();
        return new BaseResponse<>(userList);
    }
}
