package com.ssafy.backend.common.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        // Java 8 날짜/시간 타입을 처리할 수 있는 모듈 등록
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper;
    }
}