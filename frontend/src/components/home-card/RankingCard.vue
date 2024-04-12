<template>
  <div class="q-pa-md" style="max-width: 600px">
    <div class="select-group q-pa-md">
      <!-- 구 선택 -->
      <q-select
        filled
        v-model="selectedGu"
        :options="guOptions"
        option-label="name"
        option-value="name"
        label="구 선택"
        class="custom-select col"
        @update:model-value="updateDongOptions"
      />
      <!-- 동 선택 -->
      <q-select
        filled
        v-model="selectedDong"
        :options="dongOptions"
        option-label="name"
        option-value="name"
        label="동 선택"
        class="custom-select col"
        @update:model-value="updateSangOptions"
      />
      <!-- 상권 선택 -->
      <q-select
        filled
        v-model="selectedSang"
        :options="sangOptions"
        option-label="name"
        option-value="name"
        label="상권 선택"
        class="custom-select col"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedGu: null,
      selectedDong: null,
      selectedSang: null,
      guOptions: [
        { name: "강남구" },
        { name: "서초구" },
        // 다른 구들
      ],
      dongOptions: [],
      sangOptions: [],
      guToDongs: {
        강남구: [{ name: "역삼동" }, { name: "신사동" }],
        서초구: [{ name: "반포동" }, { name: "서초동" }],
        // 다른 구들의 동
      },
      dongToSangs: {
        역삼동: [{ name: "역삼역 상권" }, { name: "강남역 상권" }],
        신사동: [{ name: "가로수길" }],
        반포동: [{ name: "반포시장" }],
        서초동: [{ name: "서초중앙로" }],
        // 다른 동들의 상권
      },
    };
  },
  methods: {
    updateDongOptions(value) {
      this.dongOptions = this.guToDongs[value] || [];
      this.selectedDong = null;
      this.selectedSang = null;
      this.sangOptions = [];
    },
    updateSangOptions(value) {
      this.sangOptions = this.dongToSangs[value] || [];
      this.selectedSang = null;
    },
  },
};
</script>

<style>
.select-group {
  border: 1px solid #e0e0e0; /* 테두리 */
  border-radius: 8px; /* 모서리 둥글게 */
  background-color: #f5f5f5; /* 배경색 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */
}

.custom-select .q-field__control {
  background: #f5f5f5;
  border-radius: 8px;
}

.custom-select .q-field__control:hover {
  border: 2px solid #027be3;
}

.custom-select .q-select__dropdown-icon {
  color: #027be3;
}

.custom-select .q-item--clickable:hover {
  background-color: #e0f7fe;
}

/* Flexbox를 이용한 추가 스타일 조정 */
.row {
  align-items: center; /* 세로 중앙 정렬 */
}
</style>
