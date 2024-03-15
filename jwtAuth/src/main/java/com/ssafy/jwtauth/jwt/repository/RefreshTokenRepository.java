package com.ssafy.jwtauth.jwt.repository;


import com.ssafy.jwtauth.jwt.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);


    Optional<RefreshToken> findByUserId(Long userId);
}
