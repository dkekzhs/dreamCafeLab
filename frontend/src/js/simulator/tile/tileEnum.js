const CAFE_SIZE = {
  SMALL: 3,
  MEDIUM: 5,
  LARGE: 7
}
Object.freeze(CAFE_SIZE)

///

const TILE_TYPE = {
  CAFE: 'cafe',
  FACILITY: 'facility',
  BUILDING: 'building',
  ROAD: 'road',
  PARK: 'park',
  EMPTYLOT: 'emptylot'
}
Object.freeze(TILE_TYPE)

///

const FACILITY_TYPE = {
  GOVERNMENT_OFFICE: 'publicservice',
  PHARMACY: 'drugstore',
  BANK: 'bank',
  UNIVERSITY: 'university',
  HOSPITAL: 'hospital',
  THEATER: 'theater',
  CINEMA: 'cinema',
  SCHOOL: 'school',
  HOTEL: 'hotel',
  SUBWAY_STATION: 'subway',
  BUS_STOP: 'busstop',
  APARTMENT: 'apartment'
}
Object.freeze(FACILITY_TYPE)

const FACILITY_TYPE_NAME = {
  GOVERNMENT_OFFICE: '관공서',
  PHARMACY: '약국',
  BANK: '은행',
  UNIVERSITY: '대학교',
  HOSPITAL: '병원',
  THEATER: '소극장',
  CINEMA: '영화관',
  SCHOOL: '학교',
  HOTEL: '숙박업소',
  SUBWAY_STATION: '지하철역',
  BUS_STOP: '버스정류장',
  APARTMENT: '아파트단지수'
}
Object.freeze(FACILITY_TYPE_NAME)

const FACILITY_TYPE_ORDER = [
  FACILITY_TYPE.GOVERNMENT_OFFICE,
  FACILITY_TYPE.PHARMACY,
  FACILITY_TYPE.BANK,
  FACILITY_TYPE.UNIVERSITY,
  FACILITY_TYPE.HOSPITAL,
  FACILITY_TYPE.THEATER,
  FACILITY_TYPE.CINEMA,
  FACILITY_TYPE.SCHOOL,
  FACILITY_TYPE.HOTEL,
  FACILITY_TYPE.SUBWAY_STATION,
  FACILITY_TYPE.BUS_STOP,
  FACILITY_TYPE.APARTMENT
]
Object.freeze(FACILITY_TYPE_ORDER)

const SEASON_TYPE = {
  SPRING: 'spring',
  SUMMER: 'summer',
  AUTUMN: 'autumn',
  WINTER: 'winter'
}
Object.freeze(SEASON_TYPE)

const ROAD_TYPE = {
  HORIZONTAL: 1, // 가로 도로
  VERTICAL: 2, // 세로 도로
  CROSS: 3 // 십자 도로
}
Object.freeze(ROAD_TYPE)

const CAFE_TILE_TYPE = {
  CLERK: 'clerk',
  COUNTER: 'counter_empty',
  COUNTER_CENTER: 'counter_center',
  AISLE: 'aisle_empty',
  TABLE: 'table',
  EMPTY: 'empty'
}
Object.freeze(CAFE_TILE_TYPE)

///

const INIT_SETTING = {
  DISTANCE_RANGE: 500,
  RATIO_OF_BUILDING: 0.5,
  RATIO_OF_PARK: 0.3,
  RATIO_OF_EMTPYLOT: 0.2,
  BUILDING_TYPE: 3,
  PARK_TYPE: 3,
  TYPE_OF_FACILITIES: 12,
  GOVERNMENT_OFFICE_TYPE: 1,
  PHARMACY_TYPE: 1,
  BANK_TYPE: 3,
  UNIVERSITY_TYPE: 1,
  HOSPITAL_TYPE: 1,
  THEATER_TYPE: 1,
  CINEMA_TYPE: 1,
  SCHOOL_TYPE: 1,
  HOTEL_TYPE: 1,
  SUBWAY_STATION_TYPE: 1,
  BUS_STOP_TYPE: 1,
  APARTMENT_TYPE: 1
}
Object.freeze(INIT_SETTING)

export {
  CAFE_SIZE,
  TILE_TYPE,
  FACILITY_TYPE,
  FACILITY_TYPE_NAME,
  FACILITY_TYPE_ORDER,
  SEASON_TYPE,
  ROAD_TYPE,
  CAFE_TILE_TYPE,
  INIT_SETTING
}
