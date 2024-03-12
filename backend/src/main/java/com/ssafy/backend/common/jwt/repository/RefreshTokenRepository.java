package com.ssafy.backend.common.jwt.repository;


import com.ssafy.backend.common.jwt.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);


    Optional<RefreshToken> findByUserId(Long userId);
}
