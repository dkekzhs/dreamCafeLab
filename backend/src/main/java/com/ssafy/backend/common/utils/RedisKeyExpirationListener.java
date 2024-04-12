package com.ssafy.backend.common.utils;

import com.ssafy.backend.simulation.service.SimulationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class RedisKeyExpirationListener implements MessageListener {
    private final SimulationService simulationService;
    private final String redisKey = "Simulation";
    @Autowired
    public RedisKeyExpirationListener(RedisMessageListenerContainer listenerContainer, SimulationService simulationService) {
        this.simulationService = simulationService;
        listenerContainer.addMessageListener(this, new ChannelTopic("__keyevent@0__:expired"));
    }
    @Override
    public void onMessage(Message message, byte[] pattern) {
        // 키 만료 이벤트가 발생했을 때의 처리 로직
        String expiredKey = new String(message.getBody());
        log.info("expiredKey {}", expiredKey);
        if (redisKey.equals(expiredKey)) {
            log.info("redisKey 시뮬레이션 종료 호출 {}", expiredKey);
        }

    }
}
