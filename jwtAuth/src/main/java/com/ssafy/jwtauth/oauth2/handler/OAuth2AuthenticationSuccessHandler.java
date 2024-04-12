package com.ssafy.jwtauth.oauth2.handler;


import com.ssafy.jwtauth.jwt.TokenProvider;
import com.ssafy.jwtauth.jwt.model.RefreshToken;
import com.ssafy.jwtauth.jwt.repository.RefreshTokenRepository;
import com.ssafy.jwtauth.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ssafy.jwtauth.oauth2.service.OAuth2UserPrincipal;
import com.ssafy.jwtauth.oauth2.user.OAuth2Provider;
import com.ssafy.jwtauth.oauth2.user.OAuth2UserUnlinkManager;
import com.ssafy.jwtauth.oauth2.util.CookieUtils;
import com.ssafy.jwtauth.user.model.User;
import com.ssafy.jwtauth.user.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;

import static com.ssafy.jwtauth.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.MODE_PARAM_COOKIE_NAME;
import static com.ssafy.jwtauth.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;


@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final OAuth2UserUnlinkManager oAuth2UserUnlinkManager;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        String targetUrl;

        targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {

        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String mode = CookieUtils.getCookie(request, MODE_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse("");

        OAuth2UserPrincipal principal = getOAuth2UserPrincipal(authentication);

        if (principal == null) {
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("error", "Login failed")
                    .build().toUriString();
        }

        if ("login".equalsIgnoreCase(mode)) {
            // TODO: DB 저장
            // TODO: 액세스 토큰, 리프레시 토큰 발급
            // TODO: 리프레시 토큰 DB 저장
            log.info("email={}, name={}, nickname={}, accessToken={}", principal.getUserInfo().getEmail(),
                    principal.getUserInfo().getName(),
                    principal.getUserInfo().getNickname(),
                    principal.getUserInfo().getAccessToken()
            );

            User user = userRepository.findByEmail(principal.getUserInfo().getEmail());
            if (user == null) {
                user = new User();
                user.setEmail(principal.getUserInfo().getEmail());
                user.setNickname(principal.getUserInfo().getNickname());
                userRepository.save(user);
            }


            String accessToken = tokenProvider.createToken(authentication);
            String refreshToken = tokenProvider.createRefreshToken(authentication);

            RefreshToken token = new RefreshToken();
            token.setToken(refreshToken);
            token.setExpiryDate(Date.from(Instant.now().plus(15, ChronoUnit.DAYS)));

            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("access_token", accessToken)
                    .queryParam("refresh_token", refreshToken)
                    .build().toUriString();

        } else if ("unlink".equalsIgnoreCase(mode)) {

            String accessToken = principal.getUserInfo().getAccessToken();
            OAuth2Provider provider = principal.getUserInfo().getProvider();
            // TODO: 액세스 토큰과 연결된 사용자를 데이터베이스에서 가져옴
            User user = userRepository.findByEmail(principal.getUserInfo().getEmail());

            if (user != null) {
                // TODO: 사용자와 연관된 토큰을 삭제
                refreshTokenRepository.findByUserId(user.getId()).ifPresent(refreshTokenRepository::delete);

                // TODO: 사용자를 데이터베이스에서 삭제
                userRepository.delete(user);

                // OAuth2 프로바이더에서 사용자 연결 해제
                oAuth2UserUnlinkManager.unlink(provider, accessToken);
            }

            return UriComponentsBuilder.fromUriString(targetUrl)
                    .build().toUriString();
        }


        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", "Login failed")
                .build().toUriString();
    }

    private OAuth2UserPrincipal getOAuth2UserPrincipal(Authentication authentication) {
        Object principal = authentication.getPrincipal();

        if (principal instanceof OAuth2UserPrincipal) {
            return (OAuth2UserPrincipal) principal;
        }
        return null;
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }
}
