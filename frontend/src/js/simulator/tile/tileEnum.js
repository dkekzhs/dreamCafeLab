const CAFE_SIZE = {
  SMALL: 4,
  MEDIUM: 5,
  LARGE: 6
}
Object.freeze(CAFE_SIZE)

const TILE_TYPE = {
  CAFE: 'cafe',
  BUILDING: 'building',
  ROAD: 'road',
  PARK: 'park',
  EMPTYLOT: 'emptylot'
}
Object.freeze(TILE_TYPE)

const INIT_SETTING = {
  RATIO_OF_BUILDING: 0.5,
  RATIO_OF_PARK: 0.3,
  RATIO_OF_EMTPYLOT: 0.2
}
Object.freeze(INIT_SETTING)

export {CAFE_SIZE, TILE_TYPE, INIT_SETTING}