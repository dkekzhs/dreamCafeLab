package com.ssafy.backend.common.model.response;

import lombok.Getter;

@Getter
public enum BaseResponseStatus {
    /**
     * 1000 : 요청 성공
     */
    SUCCESS(true, 1000, "요청에 성공하였습니다."),

    /**
     * 2000 : Request 오류
     */
    NOT_MATCH_LOGIN_USER(false, 2000, "유저가 존재하지 않습니다"),
    ALREADY_EXIST_EMAIL(false, 2000, "이미 존재하는 이메일입니다."),
    NOT_EXIST__DISTRICT_REPORT(false, 2001, "보고서가 존재하지 않습니다."),
    NOT_EXIST_REDIS_SIMULATION_KEY(false, 2100, "시뮬레이션 키를 찾지 못했습니다."),
    NOT_EXIST_REDIS_SIMULATION(false, 2100, "시뮬레이션을 찾을 수 없습니다."),
    /**
     * 2500 : Request 성공
     */
    IMAGE_UPLOAD_SUCCESS(true, 2500, "이미지 업로드에 성공하였습니다."),
    SEND_MESSAGE_SUCCESS(true, 2501, "인증 번호 발송에 성공했습니다."),
    PHONE_NUMBER_AUTH_SUCCESS(true, 2502, "핸드폰 번호 인증에 성공하였습니다."),
    EMAIL_AUTH_SUCCESS(true, 2502, "핸드폰 번호 인증에 성공하였습니다."),



    /**
     * 3000 : Response 오류
     */
    VALIDATED_ERROR(false, 3000, "VALIDATED_ERROR"), // @Valid 예외 처리
    SEND_MESSAGE_ERROR(false, 3001, "메시지를 발송하는 과정 중 오류가 발생했습니다."),

    /**
     * 4000 : Database, Server 오류
     */
    INTERNAL_SERVER_ERROR(false, 4000, "서버 오류입니다"),
    JSON_PROCESSING_ERROR(false, 4001, "JSON을 처리하는 과정 중 오류가 발생했습니다."),
    FILE_UPLOAD_ERROR(false, 4002, "파일을 업로드 하는 과정 중에 에러가 발생했습니다."),

    /**
     * 5000 : 잡지 못 한 서버 오류
     */
    OOPS(false, 5000, "Oops...");


    private final boolean isSuccess;
    private final int code;
    private final String message;

    BaseResponseStatus(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }

}
