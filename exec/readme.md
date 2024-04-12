## 🙌 드림커피랩 포팅메뉴얼입니다.

## ❓  프로젝트 개요
<h3>실제로 창업하느라 너무 오래걸렸죠? 간단한 입력과 시뮬레이션 기능으로 창업을 경험해 보세요!</h3>
저희 서비스는 창업을 하고 싶거나 궁금한 사람들에게 상권분석 서비스와 창업 시뮬레이션 기능을 제공하는 서비스입니다.



### 프로젝트 사용 도구
이슈 관리 : JIRA <br>
형상 관리 : Gitlab <br>
커뮤니케이션 : Notion, Mattermost <br>
디자인 : Figma <br>
CI/CD : Jenkins

### 개발환경 
IDEA : Intellj 2023.3.2, visual_studio_code version 1.85 <br>
JDK : corretto-17 <br>
SPRING_BOOT : 2.7.17 <br>
NPM : v20.10.0   <br>
VITE : 5.0.10 <br>
MYSQL : 8.0.33 <br>
REIDS : <br>
QUASAR : <br>


<hr>

## 목차 
[환경설정](#환경설정)
<br>
[빌드하기](#빌드하기)
<br>
[배포하기](#배포하기)


## 환경설정  

### DataBase
1. mySQL 8.0.33 버전을 다운받는다
2. create database backend DB를 생성한다.
3. 현재 폴더에 있는 DB SQL을 실행한다.
### Redis
<a href="https://pamyferret.tistory.com/9">레디스 설치 방법</a><br>
도커가 설치되어있다면  
docker run -itd --name redis-container -p 6379:6379 redis

### 깃 풀 받기
1. git Bash 를 설치한다.
2. git clone "프로젝트url 복사한 주소"

### 프론트 빌드파일 수정하기
서버에 올리기 위해서 프론트엔드 .env를 수정해야 합니다. 프론트엔드 폴더로 가주세요.
#### env
```text
VITE_CLIENT_NAVER_KEY = 네이버 클라이언트
VITE_NAVER_SECRET_KEY = 네이버시크릿키
VITE_MARKER_NAVER_JS = 클러스터링네이버 js 파일 위치
VITE_APP_BACKEND_URL = 백엔드서비스URL

## 개발환경일 떄 public_path 붙어여함 
## 하지만 배포 환경일 떄 public 폴더 데이터가 최상위로 넘어가므로 바꿔여함

##------------------- 개발시 아래꺼 사용----------------------
VITE_GU_GEOJSON_PATH = /public/gu.geojson
VITE_DONG_GEOJSON_PATH = /public/dong.geojson
VITE_SANG_GEOJSON_PATH = /public/sang.geojson
VITE_SI_GEOJSON_PATH =/public/si.geojson
VITE_SANG_IMAGE_PATH = /public/map/

## ------------------ 배포 시 아래꺼 사용 ------------------
# VITE_GU_GEOJSON_PATH =/gu.geojson
# VITE_DONG_GEOJSON_PATH =/dong.geojson
# VITE_SANG_GEOJSON_PATH =/sang.geojson
# VITE_SI_GEOJSON_PATH =/si.geojson
# VITE_SANG_IMAGE_PATH =/map/



```


### 백엔드 빌드파일 수정하기 
```yaml
django:
  simulations:
    url: 장고서버URL
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: t
            client-secret: t
            scope: # 기본 값 openid,profile,email => profile, email 로 설정 변경
              - profile
              - email

          naver:
            client-id: t
            client-secret: t
            client-authentication-method: client_secret_post
            authorization-grant-type: authorization_code
            redirect-uri: "{baseUrl}/{action}/oauth2/code/{registrationId}"
            #            scope:
            #              - name
            #              - email
            #              - profile_image
            client-name: Naver

          kakao:
            client-id: 카카오클라이언트키
            client-secret: 네이버시크릿키
            client-authentication-method: client_secret_post
            authorization-grant-type: authorization_code
            scope: # https://developers.kakao.com/docs/latest/ko/kakaologin/common#user-info
              - profile_nickname
              - profile_image
              - account_email
            redirect-uri: "{baseUrl}/{action}/oauth2/code/{registrationId}"
            client-name: Kakao


        provider:
          naver:
            authorization-uri: https://nid.naver.com/oauth2.0/authorize
            token-uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user-info-authentication-method: header
            user-name-attribute: response # Naver 응답 값 resultCode, message, response 중 response 지정

          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-info-authentication-method: header
            user-name-attribute: id # Kakao 응답 값 id, connected_at, properties, kakao_account 중 id 지정

  h2:
    console:
      enabled: true
      path: /h2-console
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: DBURL
    username: ID
    password: PASSWORD
  jpa:
    hibernate:
      ddl-auto: validate
      show_sql: true
  data:
    redis:
      port: 6379
      host: URL
      password: PASSWORD

logging:
  level:
    org.hibernate.SQL: DEBUG
    #org.hibernate.type: TRACE
    org.hibernate.orm.jdbc.bind: TRACE
    org.hibernate.orm.jdbc.extract: TRACE

jwt:
  secret:

```


## 빌드하기  
### frontend 
exec/frontend 폴더에서 도커파일과 엔지닉스 설정파일이 없다면 프론트 폴더로 복사한다.
```
1. npm install
2. npm run build
3. docker build -t 이름설정.
```
### backend
프론트와 같이 도커파일이 없다면 백엔드폴더에서 도커파일을 복사해 넣는다.
```
1. chmod 777 ./gradlew
2. ./gradlew build
3. docker buildx build --build-arg JAR_FILE=./build/libs/backend*.jar -t 이름설정 . --load
```

### django
```
1. docker build -t  이름설정 .  
```

### 공통
```
docker build 옵션으로 --push 하면 자동 도커허브로 업로드
or 
docker push 저장소이름:태그이름
```

## 배포하기
### 프론트엔드
```
docker run -d -p 5000:80 이미지 이름
```
### 백엔드 
```
docker run -d -p 8080:8080 이미지 이름
```
### 장고
```
docker run -d -p 8000:8000 이미지 이름
```


