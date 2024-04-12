package com.ssafy.backend.common.exception;

import com.ssafy.backend.common.model.response.BaseResponse;
import com.ssafy.backend.common.model.response.BaseResponseStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(BaseException.class)
    public BaseResponse<BaseResponseStatus> baseException(BaseException e) {
        log.warn("Handle CommonException: {}", e.getStatus());
        return new BaseResponse<>(e.getStatus());
    }

//    @ExceptionHandler(value = RuntimeException.class)
//    public BaseResponse<BaseResponseStatus> baseException(RuntimeException e) {
//        log.warn("Handle CommonException: {}", e.getCause());
//        return new BaseResponse<>(BaseResponseStatus.OOPS);
//    }
}