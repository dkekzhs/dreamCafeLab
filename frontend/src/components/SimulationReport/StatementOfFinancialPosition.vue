<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useSimulationStore } from '@/stores/simulationStore'

const simulation = useSimulationStore()
const props = defineProps(['year'])

const { cash, interior_asset, equity, input, total_net_income, revenueList } = simulation
const year = props.year

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<template>
  <span>{{ revenueList[year * 12 + 11].year }}년 {{ revenueList[year * 12 + 11].month }}월</span>
  <div class="StatementOfFinancialPositionContainer">
    <table>
      <caption>
        재무상태표
      </caption>
      <thead>
        <tr>
          <th style="font-weight: bold; font-size: large">자산</th>
          <th>금액 (₩)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>유동자산</td>
          <td>{{ numberWithCommas(cash[year]) }}</td>
        </tr>
        <tr>
          <td>비유동자산</td>
          <td>{{ numberWithCommas(interior_asset[year] * 1000) }}</td>
        </tr>
        <tr class="result">
          <td>자산 총계</td>
          <td>{{ numberWithCommas(cash[year] + interior_asset[year] * 1000) }}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <td style="font-weight: bold; font-size: large">부채/자본</td>
          <th>금액 (₩)</th>
        </tr>
        <tr>
          <td>부채</td>
          <td>{{ numberWithCommas(input.loanAmount * 10000) }}</td>
        </tr>
        <tr class="result">
          <td class="result">부채 총계</td>
          <td>{{ numberWithCommas(input.loanAmount * 10000) }}</td>
        </tr>
        <tr>
          <td>자본금</td>
          <td>{{ numberWithCommas(equity[year] * 10000) }}</td>
        </tr>
        <tr>
          <td>이익잉여금</td>
          <td>{{ numberWithCommas(total_net_income[year]) }}</td>
        </tr>
        <!-- <tr>
          <td>세금</td>
          <td>{{ numberWithCommas(total_net_income[year]) }}</td>
        </tr> -->
        <tr class="result">
          <td>부채와 자본 총계</td>
          <td>{{ numberWithCommas(equity[year] + total_net_income[year]) }}</td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<style scoped>
.StatementOfFinancialPositionContainer {
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
  text-align: left; /* 셀 안의 텍스트 정렬 설정 */
  font-size: large;
}

.result {
  background-color: #f0f0f0;
  font-weight: bold;
}

span {
  font-size: 20px;
}
</style>
