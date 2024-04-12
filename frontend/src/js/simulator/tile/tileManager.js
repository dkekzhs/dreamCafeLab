import {
  TILE_TYPE,
  FACILITY_TYPE,
  ROAD_TYPE,
  INIT_SETTING,
  CAFE_TILE_TYPE,
  FACILITY_TYPE_ORDER
  // CAFE_SIZE
} from '@/js/simulator/tile/tileEnum'
import { requestUpdateSimul } from '@/js/simulator/fetch/request.js'
import { useSimulationStore } from '@/stores/simulationStore'

/////

class Tile {
  constructor(type, subType, scale) {
    this.type = type
    this.subType = subType
    this.scale = scale
  }

  getModelName() {
    return this.type + '_' + this.subType
  }
}

class CafeTile extends Tile {
  // CAFE_TILE_TYPE: CLERK, COUNTER, COUNTER_CENTER, TABLE, EMPTY

  constructor(subType, brandType) {
    super(TILE_TYPE.CAFE, subType, null)
    this.brandType = brandType
  }

  getModelName() {
    return this.type + '_' + this.subType
  }
}

class RoadTile extends Tile {
  constructor(subType) {
    super(TILE_TYPE.ROAD, subType, null)
  }

  getModelName() {
    return this.type + '_' + this.subType
  }
}

class BuildingTile extends Tile {
  constructor(scale) {
    super(TILE_TYPE.BUILDING, getRandomInt(1, INIT_SETTING.BUILDING_TYPE), scale)
  }
}

class ParkTile extends Tile {
  constructor(season) {
    super(TILE_TYPE.PARK, getRandomInt(1, INIT_SETTING.PARK_TYPE), null)
    this.season = season // 분기 OR 계절
  }

  getModelName() {
    return this.type + '_' + this.season + '_' + this.subType
  }
}

class EmptylotTile extends Tile {
  constructor() {
    super(TILE_TYPE.EMPTYLOT, null, null)
  }

  getModelName() {
    return this.type
  }
}

class FacilityTile extends Tile {
  constructor(scale, facilityType, facilityId /*, dist, posx, posy*/) {
    super(TILE_TYPE.FACILITY, null, scale)
    super.subType = this.setSubType(facilityType)

    this.facilityType = facilityType // 집객시설 타입 (ex. 학교, 은행, 병원 ...)
    this.facilityId = facilityId
    // this.dist = dist
    // this.posx = posx
    // this.posy = posy
  }

  setSubType(facilityType) {
    if (facilityType === FACILITY_TYPE.BANK) {
      return getRandomInt(1, INIT_SETTING.BANK_TYPE)
    } else if (facilityType === FACILITY_TYPE.HOSPITAL) {
      return getRandomInt(1, INIT_SETTING.HOSPITAL_TYPE)
    } else if (facilityType === FACILITY_TYPE.SCHOOL) {
      return getRandomInt(1, INIT_SETTING.SCHOOL_TYPE)
    } else if (facilityType === FACILITY_TYPE.THEATER) {
      return getRandomInt(1, INIT_SETTING.THEATER_TYPE)
    } else if (facilityType === FACILITY_TYPE.GOVERNMENT_OFFICE) {
      return getRandomInt(1, INIT_SETTING.GOVERNMENT_OFFICE_TYPE)
    } else if (facilityType === FACILITY_TYPE.PHARMACY) {
      return getRandomInt(1, INIT_SETTING.PHARMACY_TYPE)
    } else if (facilityType === FACILITY_TYPE.UNIVERSITY) {
      return getRandomInt(1, INIT_SETTING.UNIVERSITY_TYPE)
    } else if (facilityType === FACILITY_TYPE.CINEMA) {
      return getRandomInt(1, INIT_SETTING.CINEMA_TYPE)
    } else if (facilityType === FACILITY_TYPE.HOTEL) {
      return getRandomInt(1, INIT_SETTING.HOTEL_TYPE)
    } else if (facilityType === FACILITY_TYPE.SUBWAY_STATION) {
      return getRandomInt(1, INIT_SETTING.SUBWAY_STATION_TYPE)
    } else if (facilityType === FACILITY_TYPE.BUS_STOP) {
      return getRandomInt(1, INIT_SETTING.BUS_STOP_TYPE)
    } else if (facilityType === FACILITY_TYPE.APARTMENT) {
      return getRandomInt(1, INIT_SETTING.APARTMENT_TYPE)
    }
  }

  getModelName() {
    return this.type + '_' + this.facilityType + '_' + this.subType
  }
}

/////

class Facility {
  constructor(type, /*id,*/ dist, posx, posy, order) {
    this.facilityType = type
    // this.facilityId = id
    this.distance = dist
    this.posx = posx
    this.posy = posy
    this.order = order
  }
}

/////

class Log {
  constructor(uuid, progress, numOfClerk, numOfFacility) {
    this.uuid = uuid
    this.progress = progress
    this.employees = numOfClerk
    this.removefacility = []
    this.addfacility = []
    this.numOfFacility = numOfFacility
  }

  addClerk() {
    this.employees++
  }

  removeClerk() {
    this.employees--
  }

  addFacility(facility) {
    this.addfacility.push(facility)
    this.numOfFacility++
  }

  subtractFacility(facilityId) {
    this.removefacility.push(facilityId)
    this.numOfFacility--
  }
}

/////

export default class TileManager {
  constructor() {
    // 빈 객체 생성한 뒤 initTile로 tiles 초기화
  }

  // addFacility할 때 부여할 id
  nextFacilityId = 50001

  // simulation info
  uuid
  updateLog = [] // 시뮬레이션 update 요청 보낼 때 사용할 dto 형태 + numOfFacility 로 구성.

  // tiles
  tiles
  tileOrder = []

  // immutable
  numOfRow
  numOfColumn
  startSeason
  cafeSize
  cafex
  cafey
  trafficLv
  brandType
  nearFacilities = []

  // variable
  season
  facilityList = []
  numOfFacilityPerType = [
    [FACILITY_TYPE.GOVERNMENT_OFFICE, 0],
    [FACILITY_TYPE.PHARMACY, 0],
    [FACILITY_TYPE.BANK, 0],
    [FACILITY_TYPE.UNIVERSITY, 0],
    [FACILITY_TYPE.HOSPITAL, 0],
    [FACILITY_TYPE.THEATER, 0],
    [FACILITY_TYPE.CINEMA, 0],
    [FACILITY_TYPE.SCHOOL, 0],
    [FACILITY_TYPE.HOTEL, 0],
    [FACILITY_TYPE.SUBWAY_STATION, 0],
    [FACILITY_TYPE.BUS_STOP, 0],
    [FACILITY_TYPE.APARTMENT, 0]
  ]
  minDist
  maxDist
  numOfFacility // 타일에 표시된 집객시설 수
  originNumOfFacility // 실제 집객시설 수
  numOfClerk

  initTile(
    uuid,
    season,
    numOfRow,
    numOfColumn,
    cafeSize,
    numOfFacility,
    nearFacilities,
    numOfClerk,
    trafficLv,
    brandType
  ) {
    this.uuid = uuid
    this.season = season
    this.numOfRow = numOfRow
    this.numOfColumn = numOfColumn
    this.cafeSize = cafeSize
    this.originNumOfFacility = numOfFacility
    this.nearFacilities = nearFacilities
    this.numOfClerk = numOfClerk
    this.trafficLv = trafficLv
    this.brandType = brandType

    // 0. numOfRow * numOfColumn 크기의 빈 배열 tiles 생성
    this.tiles = new Array(this.numOfRow)
      .fill(null)
      .map(() => new Array(this.numOfColumn).fill(null))

    // 1. 정중앙에 카페 영역 지정하기
    this.cafex = Math.floor((this.numOfRow - this.cafeSize) / 2)
    this.cafey = Math.floor((this.numOfColumn - this.cafeSize) / 2)
    this.setCafeArea()

    // 2. 도로 영역 지정하기
    this.setRoadArea()

    // 3. 전체 타일 영역에 index 부여하기
    this.initTileOrder()
    console.log(this.tileOrder) // ok

    // 4. 집객시설 타입별 개수 세기
    this.setNumOfFacilityPerType(nearFacilities)
    console.log(this.numOfFacilityPerType)

    // 5. 집객시설 영역 지정하기
    console.log('originnumoffacility: ' + this.originNumOfFacility)
    // 5-1 numOfFacility가 tileOrder.length의 1/2 값을 넘는 경우 nearFacilities와 numOfFacility를 잘라내기
    if (this.tileOrder.length / 2 < numOfFacility) {
      this.numOfFacility = Math.floor(this.tileOrder.length / 2)
      console.log('splited nearFacilities: ' + this.numOfFacility)
    } else {
      this.numOfFacility = numOfFacility
    }
    // 5-2 집객시설 영역 설정
    this.setFacilityArea(nearFacilities)
    console.log(this.facilityList)

    // 6. 건물, 공터, 공원 영역 지정하기
    this.setCityArea()

    // 7. updateLog 36개 설정하기
    this.initUpdateLog()
    console.log(this.updateLog)

    return this.tiles
  }

  initUpdateLog() {
    for (let i = 0; i < 36; ++i) {
      this.updateLog.push(new Log(this.uuid, i, this.numOfClerk, this.originNumOfFacility))
    }
  }

  setCafeArea() {
    // tiles의 정중앙에 cafeSize*cafeSize 크기의 카페 영역을 배치

    // *****세로열 기준*****

    ///// SMALL /////
    // 1: EMPTY
    // 2: COUNTER / COUNTER_CENTER / COUNTER (중앙 1칸만 COUNTER_CENTER으로 배치)
    // 3: AISLE
    // 로 배치 후, numOfClerk 만큼 EMPTY를 CLERK으로 채운다.

    ///// MEDIUM /////
    // 1: EMPTY
    // 2: COUNTER
    // 3: AISLE
    // else: EMPTY

    ///// LARGE /////
    // 1: EMPTY
    // 2: COUNTER
    // 3: AISLE
    // else: EMPTY

    let cnt = 0

    for (let j = this.cafey; j < this.cafey + this.cafeSize; ++j) {
      for (let i = this.cafex; i < this.cafex + this.cafeSize; ++i) {
        // line 1: EMPTY로 채우기
        if (j == this.cafey) {
          if (cnt++ < this.numOfClerk) {
            // numOfClerk만큼의 tile을 Clerk로 채우기
            this.tiles[i][j] = new CafeTile(CAFE_TILE_TYPE.CLERK, this.brandType)
          } else {
            // 나머지는 empty로 두기
            this.tiles[i][j] = new CafeTile(CAFE_TILE_TYPE.EMPTY, this.brandType)
          }
        }
        // line 2: COUNTER로 채우기 + 가운데만 COUNTER_CENTER 만들기
        else if (j == this.cafey + 1) {
          if (i == this.cafex + Math.floor(this.cafeSize / 2)) {
            this.tiles[i][j] = new CafeTile(CAFE_TILE_TYPE.COUNTER_CENTER, this.brandType)
          } else {
            this.tiles[i][j] = new CafeTile(CAFE_TILE_TYPE.COUNTER, this.brandType)
          }
        }
        // line 3: AISLE로 채우기
        else if (j == this.cafey + 2) {
          this.tiles[i][j] = new CafeTile(CAFE_TILE_TYPE.AISLE, this.brandType)
        }
        // else: EMPTY로 채우기
        else {
          if (cnt++ < this.numOfClerk) {
            // numOfClerk만큼의 tile을 Clerk로 채우기
            this.tiles[i][j] = new CafeTile(CAFE_TILE_TYPE.CLERK, this.brandType)
          } else {
            // 나머지는 empty로 두기
            this.tiles[i][j] = new CafeTile(CAFE_TILE_TYPE.EMPTY, this.brandType)
          }
        }
      }
    }
  }

  setRoadArea() {
    // 일직선 형태 도로 배치.
    // 카페 주변을 둘러싸는 # 모양으로 배치

    for (let i = 0; i < this.numOfColumn; ++i) {
      if (i == this.cafey - 1 || i == this.cafey + this.cafeSize) {
        this.tiles[this.cafex - 1][i] = new RoadTile(ROAD_TYPE.CROSS) // 십자 모양 도로
        this.tiles[this.cafex + this.cafeSize][i] = new RoadTile(ROAD_TYPE.CROSS)
      } else {
        this.tiles[this.cafex - 1][i] = new RoadTile(ROAD_TYPE.HORIZONTAL) // 가로 모양 도로
        this.tiles[this.cafex + this.cafeSize][i] = new RoadTile(ROAD_TYPE.HORIZONTAL)
      }
    }

    for (let i = 0; i < this.numOfRow; ++i) {
      if (i == this.cafex - 1 || i == this.cafex + this.cafeSize) {
        this.tiles[i][this.cafey - 1] = new RoadTile(ROAD_TYPE.CROSS) // 십자 모양 도로
        this.tiles[i][this.cafey + this.cafeSize] = new RoadTile(ROAD_TYPE.CROSS)
      } else {
        this.tiles[i][this.cafey - 1] = new RoadTile(ROAD_TYPE.VERTICAL) // 세로 모양 도로
        this.tiles[i][this.cafey + this.cafeSize] = new RoadTile(ROAD_TYPE.VERTICAL)
      }
    }
  }

  setNumOfFacilityPerType(nearFacilities) {
    // 집객시설 종류별 개수 map에 반영
    for (let i = 0; i < this.originNumOfFacility; ++i) {
      let nearFacilityType = FACILITY_TYPE_ORDER[nearFacilities[i].facilityTypeId - 1]
      for (let j = 0; j < INIT_SETTING.TYPE_OF_FACILITIES; ++j) {
        if (nearFacilityType == this.numOfFacilityPerType[j][0]) {
          this.numOfFacilityPerType[j][1]++
        }
      }
    }
  }

  setFacilityArea(nearFacilities) {
    // 남은 칸 중 numOfFacility개의 facility를 랜덤 배정

    // 2. 타일에 남은 칸 수 만큼의 list 중, 랜덤 numOfFacility개 고르기
    let indexsOfFacility = getRandomNumbers(this.tileOrder.length, this.numOfFacility)
    indexsOfFacility.sort(function (a, b) {
      return a - b
    })

    // 3. tileOrder 순서대로 돌면서,
    let idx = 0
    for (let i = 0; i < this.tileOrder.length; ++i) {
      if (indexsOfFacility.includes(i + 1)) {
        let nearFacilityType = FACILITY_TYPE_ORDER[nearFacilities[idx].facilityTypeId - 1]
        // console.log(nearFacilityType) // ok

        // 집객시설 타일 설치
        this.tiles[this.tileOrder[i][0]][this.tileOrder[i][1]] = new FacilityTile(
          getRandomFloat(this.trafficLv),
          nearFacilityType,
          nearFacilities[idx].facilityId
        )
        // 주변 집객시설 리스트에 추가
        // console.log('i: ' + i + ', dist: ' + nearFacilities[idx].distance)
        this.facilityList.push(
          new Facility(
            nearFacilityType,
            nearFacilities[idx].distance,
            this.tileOrder[i][0],
            this.tileOrder[i][1],
            i
          )
        )

        idx++
      }
    }
  }

  setCityArea() {
    // 남은 칸에 building/park/emptylot을 랜덤 배정

    for (let i = 0; i < this.numOfRow; ++i) {
      for (let j = 0; j < this.numOfColumn; ++j) {
        if (this.tiles[i][j] === null) {
          // 빈 칸인 경우

          // 배정할 타일 종류 랜덤 배정
          let type = getRandomWithRatio3(
            INIT_SETTING.RATIO_OF_BUILDING,
            INIT_SETTING.RATIO_OF_PARK,
            INIT_SETTING.RATIO_OF_EMTPYLOT
          )

          if (type == 0) {
            this.tiles[i][j] = new BuildingTile(getRandomFloat(this.trafficLv))
          } else if (type == 1) {
            this.tiles[i][j] = new ParkTile(this.season)
          } else if (type == 2) {
            this.tiles[i][j] = new EmptylotTile()
          }
        }
      }
    }
  }

  /////

  initTileOrder() {
    let iter = 3
    // if (this.cafeSize == CAFE_SIZE.SMALL) {
    //   iter = 3
    // } else if (this.cafeSize == CAFE_SIZE.MEDIUM) {
    //   iter = 3
    // } else if (this.cafeSize == CAFE_SIZE.LARGE) {
    //   iter = 3
    // }

    let dx = [0, 1, 0, -1]
    let dy = [1, 0, -1, 0]

    let iter2 = this.cafeSize + 1

    for (let t = 1; t <= iter; ++t) {
      let x = this.cafex - t // x좌표
      let y = this.cafey - t // y좌표

      for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < iter2; ++j) {
          x = x + dx[i]
          y = y + dy[i]
          if (this.tiles[x][y] === null) this.tileOrder.push([x, y])
        }
      }

      iter2 += 2
      // console.log(this.tileOrder.length)
    }
  }

  /////

  addClerk(posx, posy) {
    // 진행상황 값 받아오기
    let progress = window.simulate.game.ui.month

    if (this.tiles[posx][posy].subType == CAFE_TILE_TYPE.EMPTY) {
      this.tiles[posx][posy].subType = CAFE_TILE_TYPE.CLERK
      this.numOfClerk++

      // 직원 수 업데이트 로그 갱신
      for (let i = progress; i < 36; ++i) {
        this.updateLog[i].employees = this.numOfClerk
        this.updateLog[i].numOfFacility = this.originNumOfFacility
      }

      console.log('addClerk: ' + this.numOfClerk + ' : ' + posx + ',' + posy)
      console.log(this.updateLog)
      return true
    } else {
      console.log(
        this.tiles[posx][posy].type +
          '의 ' +
          this.tiles[posx][posy].subType +
          '에는 직원을 놓을 수 없습니다.'
      )
      return false
    }
  }

  removeClerk(posx, posy) {
    // 진행상황 값 받아오기
    let progress = window.simulate.game.ui.month

    if (this.tiles[posx][posy].subType == CAFE_TILE_TYPE.CLERK) {
      this.tiles[posx][posy].subType = CAFE_TILE_TYPE.EMPTY
      this.numOfClerk--

      // 직원 수 업데이트 로그 갱신
      for (let i = progress; i < 36; ++i) {
        this.updateLog[i].employees = this.numOfClerk
        this.updateLog[i].numOfFacility = this.originNumOfFacility
      }

      console.log('removeClerk: ' + this.numOfClerk + ' : ' + posx + ',' + posy)
      return true
    } else {
      console.log(
        this.tiles[posx][posy].type +
          '의 ' +
          this.tiles[posx][posy].subType +
          '는 삭제할 수 없습니다.'
      )
      return false
    }
  }

  addFacility(posx, posy, facilityType) {
    // 진행상황 값 받아오기
    let progress = window.simulate.game.ui.month

    if (this.tiles[posx][posy].type == TILE_TYPE.EMPTYLOT) {
      // 추가할 집객시설의 거리값 저장할 dist 선언
      let dist = -1

      // facilityType 에 따른 facilityTypeId 찾기
      let facilityTypeId = 0
      for (let i = 0; i < INIT_SETTING.TYPE_OF_FACILITIES; ++i) {
        if (FACILITY_TYPE_ORDER[i] == facilityType) {
          facilityTypeId = i + 1
          break
        }
      }

      let order = this.tileOrder.findIndex(
        (subArray) => JSON.stringify(subArray) === JSON.stringify([posx, posy])
      )
      console.log('order of this tile : ' + order + ', ' + this.tileOrder[order])

      if (this.facilityList.length == 0) {
        // 집객시설이 하나도 없는 경우
        dist = (order / this.tileOrder.length) * INIT_SETTING.DISTANCE_RANGE
        this.facilityList.push(new Facility(facilityType, dist, posx, posy, order))
      } else {
        // 1. minDist와 maxDist에 해당하는 집객시설들이 몇 번째 order에 있는지 확인
        // 2. 현재 Fac 추가하려는 칸이 몇 번째 order에 있는지 확인
        // 3. order-mindistOrder / maxdistOrder-mindistOrder 값에 따라 dist값 부여
        let minDist = this.facilityList[0].distance
        let minDistOrder = this.facilityList[0].order
        let maxDist = this.facilityList[this.numOfFacility - 1].distance
        let maxDistOrder = this.facilityList[this.numOfFacility - 1].order
        console.log(minDist + '.' + minDistOrder + '.' + maxDist + '.' + maxDistOrder)

        let index = -1

        if (order < minDistOrder) {
          // 첫 번째 순서가 되는 경우
          if (order == 0) {
            dist = minDist / minDistOrder
            console.log(dist)
          } else {
            dist = minDist * (order / minDistOrder)
            console.log(dist)
          }
          index = 0
        } else if (order > maxDistOrder) {
          // 마지막 순서가 되는 경우
          if (order == this.tileOrder.length - 1) {
            dist = INIT_SETTING.DISTANCE_RANGE
            console.log(dist)
          } else {
            dist =
              ((INIT_SETTING.DISTANCE_RANGE - maxDist) * (order - maxDistOrder)) /
                (this.tileOrder.length - 1 - maxDistOrder) +
              maxDist
            console.log(dist)
          }
          index = this.facilityList.length
        } else {
          // 두 번째~끝에서 두 번째가 되는 경우
          for (let i = 0; i < this.facilityList.length; ++i) {
            if (this.facilityList[i].order > order) {
              dist =
                ((this.facilityList[i].distance - this.facilityList[i - 1].distance) *
                  (order - this.facilityList[i - 1].order)) /
                  (this.facilityList[i].order - this.facilityList[i - 1].order) +
                this.facilityList[i - 1].distance
              index = i
              break
            }
          }
          console.log(dist)
        }

        let newFac = new Facility(facilityType, dist, posx, posy, order)
        console.log(newFac)
        // facilityList에 넣기
        // this.facilityList.push(newFac)
        this.facilityList.splice(index, 0, newFac)
      }

      // tiles[][] 정보 업데이트
      this.tiles[posx][posy] = new FacilityTile(
        getRandomFloat(this.trafficLv),
        facilityType,
        this.nextFacilityId
      )

      ///////////// facilityUpdateLog에 반영
      this.updateLog[progress].addFacility({
        facilityId: this.nextFacilityId,
        facilityTypeId: facilityTypeId,
        distance: dist
      })

      this.nextFacilityId++

      // 총 집객시설 수 업데이트
      this.numOfFacility++
      this.originNumOfFacility++

      for (let i = progress; i < 36; ++i) {
        this.updateLog[i].employees = this.numOfClerk
        this.updateLog[i].numOfFacility = this.originNumOfFacility
      }

      // numOfFacilityPerType에 반영
      this.numOfFacilityPerType[facilityTypeId - 1][1]++

      console.log(
        'addFacility: ' + facilityType + ' ' + this.originNumOfFacility + ' : ' + posx + ',' + posy
      )

      console.log(this.facilityList)

      console.log(this.numOfFacilityPerType)
      console.log(this.updateLog)
      console.log('facilitytypeid: ' + this.getNumOfFacilityByType(facilityType))

      return true
    } else {
      return false
    }
  }

  deleteCityObject(posx, posy) {
    // 진행상황 값 받아오기
    let progress = window.simulate.game.ui.month

    let existType = this.tiles[posx][posy].type

    if (existType == TILE_TYPE.FACILITY) {
      // 집객시설을 삭제하는 경우

      // 1. facilityList에서 몇 번째에 해당하는 facility인지 확인하기 -> existIndex
      let existIndex = this.findfacilityIndexByPosition(posx, posy)

      // facilityType 에 따른 facilityTypeId 찾기
      let facilityTypeId = 0
      for (let i = 0; i < INIT_SETTING.TYPE_OF_FACILITIES; ++i) {
        if (FACILITY_TYPE_ORDER[i] == this.tiles[posx][posy].facilityType) {
          facilityTypeId = i + 1
          break
        }
      }

      console.log('facilityTypeId: ' + facilityTypeId)

      // 2. facilityList에서 i번째 idx에 해당하는 원소 삭제하기
      this.deleteFacilityByIndex(existIndex)

      ///////////// updateLog에 반영
      this.updateLog[progress].subtractFacility(this.tiles[posx][posy].facilityId)
      console.log("this tile's facility id: " + this.tiles[posx][posy].facilityId)

      // 3. numOfFacility--
      this.numOfFacility--
      this.originNumOfFacility--

      for (let i = progress; i < 36; ++i) {
        this.updateLog[i].employees = this.numOfClerk
        this.updateLog[i].numOfFacility = this.originNumOfFacility
      }

      // numOfFacilityPerType에 삭제 내용 반영
      this.numOfFacilityPerType[facilityTypeId - 1][1]--

      this.tiles[posx][posy] = new EmptylotTile() // 공터로 만들기

      // 로그 확인!!
      console.log('delete ' + existType + ' from ' + posx + '.' + posy + ' : ' + this.numOfFacility)
      console.log(this.facilityList)
      console.log(this.numOfFacilityPerType)
      console.log(this.updateLog)

      return true
    } else if (existType == TILE_TYPE.CAFE) {
      return this.removeClerk(posx, posy)
    } else if (existType == TILE_TYPE.BUILDING || existType == TILE_TYPE.PARK) {
      // 빌딩 또는 나무였던 경우
      this.tiles[posx][posy] = new EmptylotTile()
      console.log('delete ' + existType + ' from ' + posx + '.' + posy)

      return true
    } else if (existType == TILE_TYPE.EMPTYLOT || existType == TILE_TYPE.ROAD) {
      // 이미 공터였던 경우 or 도로인 경우
      console.log('cant delete. already ' + existType + ' : ' + posx + '.' + posy)

      return false
    }
  }

  findfacilityIndexByPosition(posx, posy) {
    for (let i = 0; i < this.facilityList.length; ++i) {
      let facility = this.facilityList[i]
      if (facility.posx == posx && facility.posy == posy) {
        return i
      }
    }
    // 좌표값과 일치하는 Facility 객체가 없을 경우 -1 반환
    return -1
  }

  deleteFacilityByIndex(index) {
    if (index >= 0 && index < this.facilityList.length) {
      this.facilityList.splice(index, 1)
      return true // 삭제 성공
    }
    return false // 삭제 실패
  }

  getNumOfFacilityByType(facilityType) {
    for (let i = 0; i < INIT_SETTING.TYPE_OF_FACILITIES; ++i) {
      if (facilityType == this.numOfFacilityPerType[i][0]) {
        return this.numOfFacilityPerType[i][1]
      }
    }
  }
}

/////

// 주어진 범위에서 랜덤 정수 생성
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// n ~ n+1 범위에서 랜덤 실수 생성
function getRandomFloat(n) {
  return Math.random() + n // Math.random()은 0 이상 1 미만의 값을 반환하므로 n을 더하여 n 이상 n+1 미만의 값을 반환합니다.
}

function getRandomWithRatio3(ratio1, ratio2, ratio3) {
  // 0에서 1 사이의 랜덤한 값 생성
  const randomValue = Math.random()

  // 생성된 랜덤한 값에 따라 0, 1, 2를 반환
  if (randomValue < ratio1) {
    return 0
  } else if (ratio1 <= randomValue && randomValue < ratio1 + ratio2) {
    return 1
  } else if (ratio1 + ratio2 <= randomValue && randomValue < ratio1 + ratio2 + ratio3) {
    return 2
  }
}

function getRandomNumbers(maxNum, cntToPick) {
  if (maxNum < cntToPick) {
    throw new Error('maxNum는 cntToPick보다 같거나 커야 합니다.')
  }

  // 1부터 maxNum까지의 수를 배열에 저장
  const availableNumbers = Array.from({ length: maxNum }, (_, index) => index + 1)

  // 배열을 섞기 위해 Fisher-Yates 알고리즘 사용
  for (let i = availableNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]]
  }

  // 처음부터 cntToPick 개의 수를 잘라내서 반환
  return availableNumbers.slice(0, cntToPick)
}
