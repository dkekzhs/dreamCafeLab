<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useSimulationStore } from '@/stores/simulationStore'

const simulation = useSimulationStore()
const {
  total_revenue,
  total_gross_profit,
  total_operating_profit,
  total_net_income,
  total_person_cost,
  total_rent_cost,
  depreciation,
  selectBrand,
  total_interest_cost,
  total_etc_cost
} = simulation

const props = defineProps(['year'])
const year = ref(props.year)
console.log('year', year)

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<template>
  <div class="IncomeStatementContainer">
    <table>
      <caption>
        손익계산서
      </caption>
      <thead>
        <tr>
          <th>항목</th>
          <th>금액 (₩)</th>
        </tr>
      </thead>
      <tbody>
        <tr class="result">
          <td>매출액</td>
          <td>{{ numberWithCommas(total_revenue[year]) }}</td>
        </tr>
        <tr>
          <td>매출원가</td>
          <td class="cost">
            ( {{ numberWithCommas(Math.abs(total_gross_profit[year] - total_revenue[year])) }} )
          </td>
        </tr>
        <tr class="result">
          <td>매출총이익</td>
          <td>{{ numberWithCommas(total_gross_profit[year]) }}</td>
        </tr>
        <tr>
          <td>인건비</td>
          <td class="cost">({{ numberWithCommas(total_person_cost[year]) }})</td>
        </tr>
        <tr>
          <td>임차비</td>
          <td class="cost">({{ numberWithCommas(total_rent_cost[year]) }})</td>
        </tr>
        <tr>
          <td>감가삼각비</td>
          <td class="cost">({{ numberWithCommas((selectBrand.interiorAmount * 1000) / 5) }})</td>
        </tr>
        <tr class="result">
          <td>영업이익</td>
          <td>
            {{ numberWithCommas(total_operating_profit[year]) }}
          </td>
        </tr>
        <tr>
          <td>이자비용</td>
          <td class="cost">({{ numberWithCommas(total_interest_cost[year]) }})</td>
        </tr>
        <tr>
          <td>기타비용</td>
          <td class="cost">({{ numberWithCommas(total_etc_cost[year]) }})</td>
        </tr>
        <tr class="result">
          <td>당기순이익</td>
          <td>{{ numberWithCommas(total_net_income[year]) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.IncomeStatementContainer {
  width: 100%;
  /* height: 450px; */
  background-color: white;
  box-shadow: 3px 3px 3px 3px #888888;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 20px;
}

table {
  border-collapse: collapse; /* 테두리가 겹치지 않도록 설정 */
  width: 100%;
}

caption {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #dddddd; /* 테두리 설정 */
  padding: 8px; /* 셀 내부 여백 설정 */
  text-align: center; /* 셀 안의 텍스트 정렬 설정 */
  font-size: large;
}
td {
  text-align: right;
}

.result {
  background-color: #f0f0f0;
  font-weight: bold;
}

.cost {
  color: red;
}

td.cost {
  padding-left: 20px; /* 비용 셀의 왼쪽 여백 추가 */
}
</style>
