<template>
  <br /><br /><br />
  <div>
    <table>
      <tr v-for="(row, rowIndex) in tiles" :key="rowIndex">
        <td v-for="(tile, colIndex) in row" :key="colIndex">
          <div>
            <div>[{{ rowIndex }},{{ colIndex }}]<br />{{ tile.getModelName() }}</div>
            <button v-if="tile.type === 'cafe'" @click="tileManager.addClerk(rowIndex, colIndex)">
              직원 추가
            </button>
            <button
              v-if="tile.type === 'cafe'"
              @click="tileManager.removeClerk(rowIndex, colIndex)"
            >
              직원 삭제
            </button>
            <button
              v-if="tile.type === 'emptylot'"
              @click="tileManager.addFacility(rowIndex, colIndex, 'bank')"
            >
              건물 추가
            </button>
            <button
              v-if="['building', 'park', 'facility'].includes(tile.type)"
              @click="tileManager.deleteCityObject(rowIndex, colIndex)"
            >
              건물 삭제
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import TileManager from '@/js/simulator/tile/tileManager'
import { CAFE_SIZE, FACILITY_TYPE, SEASON_TYPE } from '@/js/simulator/tile/tileEnum'

export default {
  data() {
    return {
      tiles: [],
      tileManager: null
    }
  },
  mounted() {
    // 사용자가 입력한 값 + 상권 정보로 Tile init

    // nearFacilities 더미 데이터!!!
    let nearFacilities = [
      { id: 1, dist: 100, type: FACILITY_TYPE.BANK },
      { id: 2, dist: 200, type: FACILITY_TYPE.BANK },
      { id: 3, dist: 300, type: FACILITY_TYPE.SCHOOL },
      { id: 4, dist: 400, type: FACILITY_TYPE.SCHOOL },
      { id: 5, dist: 500, type: FACILITY_TYPE.HOSPITAL },
      { id: 6, dist: 600, type: FACILITY_TYPE.HOSPITAL },
      { id: 7, dist: 700, type: FACILITY_TYPE.THEATER },
      { id: 8, dist: 800, type: FACILITY_TYPE.THEATER }
    ]

    this.tileManager = new TileManager()
    this.tiles = this.tileManager.initTile(
      SEASON_TYPE.SPRING,
      9,
      9,
      CAFE_SIZE.SMALL,
      8,
      nearFacilities,
      5,
      1,
      'brandType'
    )
    console.log(this.tiles)
  }
}
</script>
