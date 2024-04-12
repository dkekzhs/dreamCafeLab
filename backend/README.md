# backend
common 만 긁어서 쓰면 됩니다 다른건 필요 X ->  나머지는 리턴 타입, 예외 발생 예시, h2 인메모리 jpa 연결 테스트

## 리턴타입 및 exception 동작 원리 설명

### 리턴 타입
```java
    public BaseResponse(T result) {
        this.isSuccess = BaseResponseStatus.SUCCESS.isSuccess();
        this.message = BaseResponseStatus.SUCCESS.getMessage();
        this.code = BaseResponseStatus.SUCCESS.getCode();
        this.result = result;
    }

    public BaseResponse(BaseResponseStatus status){
        this.isSuccess = status.isSuccess();
        this.message = status.getMessage();
        this.code = status.getCode();
    }
```
```java
    @PostMapping("/add")
    public BaseResponse<?> addUser(@RequestBody RequestMemberAddUserDto dto){
        log.debug("sucess는 result가 비어있는 값");
        userService.addUser(dto);
        return new BaseResponse<>(SUCCESS);
    }
    @GetMapping("/list")
    public BaseResponse<?> getUserList(){
        log.debug("BaseResponse 데이터 넘겨주면 result에 해당 데이터 담김");
        List<MemberVo> userList = userService.getUserList();
        return new BaseResponse<>(userList);
    }
```
1. result를 받으면 SUCCESS 이넘클래스에서 result만 바꿔서 리턴해준다.
2. status를 받으면 그거에 해당하는 이넘클래스를 리턴해준다. 

### exception 동작 과정
1.  BaseResponseStatus 이넘클래스에 에러 메세지를 정의합니다.
2.  throw new BaseException을 발생시킵니다. 이때 타입은 이넘클래스에 정의한 status를 파라미터로 넘겨줍니다.
3. exception이 발생해 GlobalExceptionHandler이 캐치해 해당 exception -> baseResponse로 변환해서 리턴해줍니다.

```java 
1.     
NOT_MATCH_LOGIN_USER(false, 2006, "아이디 혹은 비밀번호를 확인해주세요."),

2.
    @Override
    public void login(RequestMemberLoginDto dto) {
        log.debug("BaseResponseStatus에 이넘클래스로 에러 정의한 후 사용");
        userRepository.findByNameAndPassword(dto.getUserName(),dto.getUserPassword())
                .orElseThrow(() -> {throw new BaseException(NOT_MATCH_LOGIN_USER);
                });
    }
3. 
    @ExceptionHandler(BaseException.class)
    public BaseResponse<BaseResponseStatus> baseException(BaseException e) {
        log.warn("Handle CommonException: {}", e.getStatus());
        return new BaseResponse<>(e.getStatus());
    }


```

## 프로젝트 궂조 및 설명 
```tree
├── gradlew
├── gradlew.bat
├── settings.gradle
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── ssafy
    │   │           └── backend
    │   │               ├── BackendApplication.java
    │   │               ├── common
    │   │               │   ├── config
    │   │               │   │   └── WebMvcConfig.java - 웹 컨피그 설정
    │   │               │   ├── exception
    │   │               │   │   ├── BaseException.java - 공통 exception 
    │   │               │   │   └── GlobalExceptionHandler.java - exception handler 
    │   │               │   └── model
    │   │               │       ├── domain
    │   │               │       │   └── BaseTime.java - created, update jpa 자동 처리
    │   │               │       └── response
    │   │               │           ├── BaseResponse.java - 모든 response 처리
    │   │               │           └── BaseResponseStatus.java - Enum 클래스 정의 에러코드와 메세지 정의
    │   │               └── member -- 테스트 해보려고 만든 맴버 도메인 (도메인 최상위 패키지는 controller, model, service )
    │   │                   ├── controller
    │   │                   │   └── MemberController.java
    │   │                   ├── model 안에는 (domain,dto,repository,vo)
    │   │                   │   ├── domain
    │   │                   │   │   └── Member.java
    │   │                   │   ├── dto
    │   │                   │   │   ├── RequestMemberAddUserDto.java
    │   │                   │   │   └── RequestMemberLoginDto.java
    │   │                   │   ├── repository
    │   │                   │   │   └── MemberRepository.java
    │   │                   │   └── vo
    │   │                   │       └── MemberVo.java
    │   │                   └── service
    │   │                       ├── MemberService.java
    │   │                       └── MemberServiceImpl.java
    │   └── resources
    │       ├── application.yml
    │       ├── static
    │       └── templates

```

## 패키지 구조
1. 도메인 별로 나눈다. -> memeber, board, common(공통 코드 작성) ...
2. 도메인 별 크게 서비스, 모델, 컨트롤러로 나눈다.
3. 모델안에 dto,domain,vo로 나눈다.
구조 끝

## 코드 컨벤션
1. 변수명은 첫글자 소문자 이어지는 문자 대문자로 한다.
2. 클래스명은 첫글자 이어지는 글자를 대문자로 한다.
3. 축약어 쓰지 않는다 예) index -> idx , UserService -> us 등등 
4. 생성,추가,삭제,수정은 정해야 할듯 다들 다르게 쓰면 헷갈릴거 같아요
컨벤션 끝 


