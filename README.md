# 드림커피랩

### 프로젝트 개요

예비 카페 창업자 대상으로 서울시 상권 분석과 카페 프랜차이즈 예상 매출 시뮬레이션 기능을 제공해 복잡한 과정없이 손쉽게 카페 창업 정보를 제공하고자 서비스를 개발하였습니다.

### 팀원 소개

- 팀장 : 조현우
  - https://github.com/louis-cho
  - wizardchw0@gmail.com
- 팀원 : 김다인
  - 깃주소
  - 이메일
- 팀원 : 김신영
  - https://github.com/kseenyoung
  - kseenyoung@gmail.com
- 팀원 : 서재화
  - https://github.com/ggramgyo
  - woghk6761@pusan.ac.kr
- 팀원 : 신시원
  - 깃주소
  - 이메일
- 팀원 : 이동재
  - 깃주소
  - 이메일

## 프로젝트 주요 기능 소개

## 1. 상권 선택

### 클러스터링된 geojson polygon 기반 데이터를 간편한 터치를 통해 선택합니다

![상권선택](https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/f80d84b6-2049-41aa-87f3-0c70d0164163)

## 2. 상권 분석

### 현재 선택된 상권에 대한 핵심 정보를 보기 쉽게 제공합니다

![상권분석](https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/ff2239b8-3dd4-4ac4-9c31-bbd453dc05c4)

## 2. 프랜차이즈 카페 브랜드 추천

### 16가지 유형 기반으로 추천된 상권 내 가장 적합한 카페 브랜드를 제시합니다

![프차추천](https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/31e9cffd-c65a-4c6b-afc0-fbb72f2ae785)

## 3. 카페 창업 예측 시뮬레이션

### 3년간의 추이를 그래픽스 애니메이션을 통해 확인할 수 있습니다

![시뮬](https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/21a5e4bc-cc6e-428e-89be-a1b23c94153b)

## 4. 그래픽스 상호 작용

### 건설, 철거 작업을 바탕으로 실제 거리 정보가 반영된 집객 시설을 월 단위로 반영할 수 있습니다

![시설건설](https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/544082f2-c4d0-4fff-ad2b-747ed701ebc6)

## 5. 시뮬레이션 분석 보고서

### 제무제표 분석 보고서를 통해 보다 정확한 결과 분석이 가능합니다

![시뮬리포트](https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/26c3d0c5-7cc1-4e68-b4dd-92af81afb804)

#### 데이터 수집 및 가공

- 서울 열린데이터 광장
  1. 서울시 상권 데이터 (https://data.seoul.go.kr/dataList/OA-15560/S/1/datasetView.do?tab=A)
  2. 서울시 상가 임대료 (https://data.seoul.go.kr/dataList/10614/S/2/datasetView.do)
  3. 서울시 집객 시설 정보 (https://data.seoul.go.kr/dataList/OA-15580/S/1/datasetView.do)
- 공정거래위원회
  1. 공정거래 위원회 정보공개서 : 프랜차이즈 브랜드 별 창업 및 유지비 산출에 활용 (https://franchise.ftc.go.kr/mnu/00013/program/userRqst/list.do?searchCondition=&searchKeyword=&column=brd&selUpjong=21&selIndus=L1&pageUnit=10&pageIndex=1)
- 네이버 부동산
  1. 크롤링을 통해 상가 매물 정보 조회 및 임대료 계산
- 행정 구역 구분
  1. 행정 구역 폴리곤 데이터 (https://github.com/vuski/admdongkor)





## 시뮬레이션 모델 학습

### 사용 모델 및 선택 이유

창업 시 지정한 위치를 기반으로 카페의 매출을 예측하는 랜덤포레스트 회귀 모델 생성
선형 회귀 모델에서 모델의 성능이 좋지 못했고, 비선형 모델 중에서 많이 사용하는 랜덤포레스트 모델을 선택

- 랜덤포레스트 모델 특성 상 스케일링이 필요하지 않아 따로 스케일링 하지 않음
- 변수 중요도를 통해 PCA 등의 방법을 사용하지 않고 변수 선택

### 데이터 전처리

- 크롤링을 통해 카페 위치 정보, 브랜드 등을 확보 후 해당 카페의 예상 매출을 바탕으로 학습을 진행
- 선택한 위치 주변의 정보를 반영하기 위해 500m 이내의 시설들의 수와 최단 거리를 받고 거리의 경우 역수를 취함 (주변에 해당 시설이 없을 때 최단 거리에 대한 영향을 줄이기 위해)
- 500m 내의 상권의 면적을 바탕으로 주변의 매출을 계산하여 사용
- 결측치가 없는 데이터는 제외하고 학습
- 이상치의 경우 사분위수 방법을 사용하여 Q1 - 1.5*IQR과 Q3 + 1.5*IQR 사이에 없는 값들을 제거

### 데이터 학습

- 주변의 매출, 시간대, 요일, 연령대 별 매출 비율, 집객 시설의 수, 집객 시설의 최단 거리 등을 바탕으로 학습
- train data와 test data를 7:3 비율로 split
- 변수 중요도를 통해 변수 선택 (집객 시설 중 유치원 제외, 매출 건 수 등 모델에서 제외)
- 최종 모델 R2 0.975

### 한계점

- 종속 변수로 사용한 카페 당 매출이 추정치이기 때문에 발생하는 한계 (데이터의 부족 문제)
- 일정의 촉박함으로 인한 하이퍼패러미터 튜닝 및 주변 시설 반영 거리 설정에 대한 근거 부족 (반영 거리는 200M와 500M만 진행)



## 그래픽스 시뮬레이션

### 애니메이션 보간 기법

시간에 따라 변화하는 손님 객체 상태를 위치, 회전, 스케일, 머터리얼 4가지를 기준으로 각각의 key frame을 정의했습니다. 이를 바탕으로 보간 기법을 활용해 시간에 따라 자연스러운 움직임을 구현하였습니다.

### 타일 매니저

특정 좌표 반경 500m 내 주변 편의시설 리스트를 지도 데이터로부터 받아와 관리합니다. 타일 매니저를 통해 사용자가 직접 추가 혹은 삭제된 주변 편의시설 정보를 현재 날짜와 함께 시뮬레이션 예측 결과에 반영할 수 있습니다.

### 시간 동기화 & 애니메이션 배속 지원

renderer clock과 동기화한 날짜 시스템, 캐릭터 위치 보간을 사용하여 그래픽스 시뮬레이션 내의 날짜와 사람의 움직임이 일치하도록 개발하였습니다. 이로 인해 delta time의 배수만큼 애니메이션 배속을 제공할 수 있으며, delta time의 생략만큼 애니메이션 생략이 가능합니다.

### 모델 데이터 재활용 및 메모리 관리

수많은 3D 객체를 생성하는데 있어서 매번 3D 모델 데이터를 로드하지 않고, Asset Manager 내에서 이를 관리하여 생성이 필요한 때 복사본을 제공하는 방법을 채택했습니다. 또한 객체 삭제 시 material과 geometry를 dispose하여 메모리 누수를 방지했습니다.


## 상권 분석 페이지

### 1. 폐업률 카드

<div align="center" style="display:flex;">
  <img src="https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/6c8abf9b-a554-4140-94f1-57e1eb259fe4" alt="폐업률 카드" width="100"/>
  <div>
    
    # 선정 근거
    무턱대고 창업을 해서 망하는 일이 없도록 경고의 의미로 선정하게 됐다.

    # 데이터
    서울시 열린 데이터 광장에서 3개월마다 영업 신고 데이터를 분석하여 개업 대비 폐업률을 계산했다.
  
  </div>
</div>

### 2. 매출 카드

<div align="center" style="display:flex;">
  <img src="https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/c4aef97d-7628-46de-aea4-a53e52cd3ddb" alt="매출 카드" width="100"/>
  <div>
  
    # 선정 근거
    해당 상권에서 평균적으로 매출이 얼마나 나오는 지 궁금할 것이라 생각해 선정하게 됐다.

    # 데이터
    서울시 열린 데이터 광장에서 제공해주는 데이터를 사용했다.
  
  </div>
</div>

### 3. 집객 시설 카드

<div align="center" style="display:flex;">
  <img src="https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/553f5d46-66a6-4481-885b-a38334650cfa" alt="집객 시설 카드" width="100"/>
  <div>
  
    # 선정 근거
    요기요 사장님의 개인 경험과 국내 논문을 확인한 결과, 해당 상권에서 분위기를 파악하는 것이 중요하다는 사실을 확인하고, 집객 시설 등을 고려하여 선택하게 되었다.

    # 데이터
     서울시 열린 데이터 광장에서 제공되는 데이터의 부정확성으로부터 대표적인 집객 시설들을 크롤링하여 상권별(geojson)로 나눈 후 처리했다.
  
  </div>
</div>

### 4. 주 고객층 카드

<div align="center" style="display:flex;">
  <img src="https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/04aeec0c-94d4-4af1-9d00-7a6bebe97869" alt="주 고객층 카드" width="100"/>
  <div>
  
    # 선정 근거
    마케팅에서 핵심 고객층으로 이를 참고할 수 있도록 선정했다. 이러한 데이터는 사장님들이 마케팅 전략을 구축하고 효율적인 고객층을 대상으로 프로모션을 계획할 때 중요한 참고 자료가 될 것 입니다.

    # 데이터
    서울시 열린 데이터 광장에서 매출과 유동인구 상주인구 데이터를 비교 분석해 결과를 도출했다.
  
  </div>
</div>

### 5. 임대료 카드

<div align="center" style="display:flex;">
  <img src="https://github.com/louis-cho/WebRTC_Karaoke/assets/38391852/ce5cf4ee-ebaf-49b0-93d6-40dc3abf2620" alt="임대료 카드" width="100"/>
  <div>
  
    # 선정 근거
    임대료가 적정한지를 확인하고 싶은 창업자들을 위해 해당 상권에서의 임대료 적정성을 판단할 수 있게 했다.

    # 데이터
    임대료 정보를 네이버 부동산에서 크롤링하고, 서울시 열린 데이터 광장에서 제공되는 매출 데이터를 활용했다.
  
  </div>
</div>
