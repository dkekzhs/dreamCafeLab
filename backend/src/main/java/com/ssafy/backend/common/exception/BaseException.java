package com.ssafy.backend.common.exception;

import com.ssafy.backend.common.model.response.BaseResponseStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseException extends RuntimeException{
    private BaseResponseStatus status;
    public BaseException(BaseResponseStatus status) {
        this.status = status;
    }

}