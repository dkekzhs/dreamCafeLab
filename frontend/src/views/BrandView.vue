<template>
  <q-page class="q-pa-md">
    <div class="brand-recommend-text-comp">
      <div class="brand-recommend-text">강남구 역삼1동</div>
      <div class="brand-recommend-text"><span>역삼멀티캠퍼스</span> 상권</div>
      <div class="brand-recommend-sub-text">에서 창업하기 좋은 프랜차이즈</div>
    </div>

    <div>
      <div class="brand-logo"><img src="../assets/img/brand-logo/바나프레소.png" /></div>
      <div class="brand-name">바나프레소</div>
    </div>

    <div class="brand-recommend-reason">
      <div class="brand-recommend-reason-text">추천해준 <span>근거</span>는 뭔가 ?</div>

      <div class="brand-recommend-reason-text">
        상권 내 동일 브랜드 매장 몇 <span>22개</span> 있다.
      </div>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped>
.q-pa-md {
  position: relative;
}
.brand-recommend-reason-text span {
  color: #c68b59;
}
.brand-recommend-reason-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  text-align: center;

  color: #000000;
}
.brand-recommend-reason {
  position: absolute;
  width: 340px;
  height: 128px;
  left: calc(50% - 340px / 2);
  top: 616px;
  background: white;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.brand-logo {
  /* logo */

  position: absolute;
  left: calc(50% - 240px / 2);
  right: 19.23%;
  top: 32.15%;
  bottom: 40.3%;

  border-radius: 800px;
}
.brand-name {
  /* 바나프레소 */

  position: absolute;
  width: 160px;
  height: 39px;
  left: calc(50% - 160px / 2);
  top: 531px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;

  color: #f1658a;
}

.brand-recommend-text-comp {
  position: absolute;
  left: 37px;
  top: 102px;
}

.brand-recommend-text span {
  font-weight: 1000;
  color: #c68b59;
}

.brand-recommend-text {
  font-size: 35px;
  font-weight: 600;
  color: #000000;
  letter-spacing: -3px;
  margin-bottom: -10px;
}

.brand-recommend-text span {
  /* 상권 */

  font-size: 35px;
  color: #c68b59;
}

.brand-recommend-sub-text {
  /* 에서 창업하기 좋은 프랜차이즈 */
  margin-top: 10px;
  left: 37px;
  top: 552px;
  font-size: 20px;
  font-weight: 600;
  color: #767676;
}
</style>
