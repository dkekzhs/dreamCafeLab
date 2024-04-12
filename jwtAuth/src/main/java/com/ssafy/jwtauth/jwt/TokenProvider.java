package com.ssafy.jwtauth.jwt;

import com.ssafy.jwtauth.jwt.model.RefreshToken;
import com.ssafy.jwtauth.jwt.repository.RefreshTokenRepository;
import com.ssafy.jwtauth.oauth2.service.OAuth2UserPrincipal;
import com.ssafy.jwtauth.user.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class TokenProvider {

    public static final long ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS = 1000 * 60 * 30; // 30 min
    public static final long REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONS = 1000 * 60 * 60 * 24 * 15; // 15 days

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final RefreshTokenRepository refreshTokenRepository;

    private Key key;

    @PostConstruct
    public void init() {

        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    public boolean validateToken(String token) {

        try {
            Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return true;
        } catch (UnsupportedJwtException | MalformedJwtException exception) {
            log.error("JWT is not valid");
        } catch (SignatureException exception) {
            log.error("JWT signature validation fails");
        } catch (ExpiredJwtException exception) {
            log.error("JWT is expired");
        } catch (IllegalArgumentException exception) {
            log.error("JWT is null or empty or only whitespace");
        } catch (Exception exception) {
            log.error("JWT validation fails", exception);
        }

        return false;
    }

    public String createToken(Authentication authentication) {

        Date date = new Date();
        Date expiryDate = new Date(date.getTime() + ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS);

        return Jwts.builder()
                .setSubject(authentication.getName())
                .setIssuedAt(date)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateRefreshToken(Authentication authentication) {

        Date date = new Date();
        Date expiryDate = new Date(date.getTime() + REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONS);

        return Jwts.builder()
                .setSubject(authentication.getName())
                .setIssuedAt(date)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String createRefreshToken(Authentication authentication) {
        OAuth2UserPrincipal principal = (OAuth2UserPrincipal) authentication.getPrincipal();


        // 사용자 정보 가져오기
        com.ssafy.jwtauth.user.model.User user = userRepository.findByEmail(principal.getUserInfo().getEmail());
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + principal.getUserInfo().getEmail());
        }

        // 기존 Refresh Token이 있다면 업데이트, 없으면 새로 생성
        Optional<RefreshToken> existingRefreshToken = refreshTokenRepository.findByUserId(user.getId());
        String refreshToken = null;
        if (!existingRefreshToken.isPresent()) {

            // Refresh Token 생성
            refreshToken = generateRefreshToken(authentication);
            RefreshToken newRefreshToken = new RefreshToken();

            newRefreshToken.setToken(refreshToken);
            newRefreshToken.setExpiryDate(Date.from(Instant.now().plus(15, ChronoUnit.DAYS))); // 15일로 설정
            newRefreshToken.setUserId(user.getId());
            refreshTokenRepository.save(newRefreshToken);
        } else {
            refreshToken = existingRefreshToken.get().getToken();
        }

        return refreshToken;
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        UserDetails user = new User(claims.getSubject(), "", Collections.emptyList());

        return new UsernamePasswordAuthenticationToken(user, "", Collections.emptyList());
    }
}
