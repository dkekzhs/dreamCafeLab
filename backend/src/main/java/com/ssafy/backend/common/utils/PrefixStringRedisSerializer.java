package com.ssafy.backend.common.utils;

import org.springframework.data.redis.serializer.StringRedisSerializer;

public class PrefixStringRedisSerializer extends StringRedisSerializer {

    private final String prefix;

    public PrefixStringRedisSerializer(String prefix) {
        super();
        this.prefix = prefix;
    }

    @Override
    public byte[] serialize(String string) {
        // 접두사를 추가하여 직렬화
        return super.serialize(prefix + string);
    }

    @Override
    public String deserialize(byte[] bytes) {
        // 역직렬화한 데이터에서 접두사를 제거
        String result = super.deserialize(bytes);
        if (result != null && result.startsWith(prefix)) {
            return result.substring(prefix.length());
        }
        return result;
    }
}
