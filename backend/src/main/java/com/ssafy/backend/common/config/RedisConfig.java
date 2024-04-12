package com.ssafy.backend.common.config;

import com.ssafy.backend.common.utils.PrefixStringRedisSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    RedisMessageListenerContainer redisMessageListenerContainer(RedisConnectionFactory connectionFactory) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        return container;
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // Key Serializer 설정
        template.setKeySerializer(new StringRedisSerializer());
        PrefixStringRedisSerializer prefixSerializer = new PrefixStringRedisSerializer("simulation:");
        template.setKeySerializer(prefixSerializer);
        // Value Serializer로 GenericJackson2JsonRedisSerializer 사용
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());

        return template;
    }

}
