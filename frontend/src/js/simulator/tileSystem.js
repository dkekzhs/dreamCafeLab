import * as THREE from 'three'
import settings from '../pref/settings'
import { TILE_TYPE, CAFE_TILE_TYPE } from '@/js/simulator/tile/tileEnum'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import { useSimulationStore } from '@/stores/simulationStore'

const simulationStore = useSimulationStore()

export default class TileSystem {
  constructor(numOfRow, numOfColumn) {
    this.numOfRow = numOfRow
    this.numOfColumn = numOfColumn

    TileSystem.I = this

    this.tiles = []
    this.objects = []
    this.init()

    window.simulate.game.tileSystem = this
  }

  init() {
    let scene = window.simulate.game.ui.scene

    const geometry = new THREE.BoxGeometry(...settings.renderer.tile.size)

    for (let i = 0; i < this.numOfRow; i++) {
      this.tiles.push([])
      this.objects.push([])
      for (let j = 0; j < this.numOfColumn; j++) {
        const material = new THREE.MeshBasicMaterial({ color: 0x555555 })
        const tile = new THREE.Mesh(geometry, material)
        tile.name = '' + i + ',' + j + 'tile'
        scene.add(tile)
        this.tiles[this.tiles.length - 1].push(tile)
        tile.position.set(i, 0, j)
        this.objects[this.tiles.length - 1].push(null)
      }
    }
  }

  getConstructionType() {
    return this.currentConstruction
  }

  setConstructionType(model) {
    this.currentConstruction = model
  }

  setConstructionAt(object, i, j) {
    this.objects[i][j] = object
  }

  getConstructionAt(i, j) {
    try {
      return this.objects[i][j]
    } catch (error) {
      return null
    }
  }

  getIndexOf(object) {
    for (let i = 0; i < this.numOfRow; i++) {
      for (let j = 0; j < this.numOfColumn; j++) {
        if (this.tiles[i][j] == object || this.objects[i][j] == object) {
          return [i, j]
        }
      }
    }

    return null
  }

  handleMouseDown(intersectionObject) {
    if (this.getConstructionType() == null) return

    let location = this.getIndexOf(intersectionObject)

    if (location) {
      // 타일 위에 건물이 있는 경우라면
      if (this.getConstructionAt(...location)) {
        if (this.getConstructionType() == 'delete') {
          // delete 하기
          if (this.objects[location[0]][location[1]]) {
            window.simulate.game.objectManager.deleteObjectByCoord(location[0], location[1])
          }
        } else {
          console.log('이미 해당 위치에 건물이 존재합니다.')
        }
      }
      // 타일 위에 건물이 없는 경우라면
      else {
        if (this.getConstructionType() == 'delete') {
          return
        } else if (this.getConstructionType() == 'clerk') {
          let origin = window.simulate.game.assetManager.getModel(
            'cafe_' + this.getConstructionType()
          )
          let newObject = SkeletonUtils.clone(origin)

          window.simulate.game.objectManager.addObject(
            ...location,
            newObject,
            this.getConstructionType()
          )
        } else {
          // 타일에 오브젝트 배치하기
          let modelName =
            'facility_' + this.getConstructionType() + '_' + parseInt(Math.random() * 3 + 1)
          let newObject = window.simulate.game.assetManager.getModel(modelName).clone()

          window.simulate.game.objectManager.addObject(
            ...location,
            newObject,
            this.getConstructionType()
          )
        }
      }
    }

    this.unvisualizeInsertable()
    this.visualizeInsertable(this.getConstructionType())
  }

  deleteObject(x, y) {
    if (this.objects[x][y]) {
      this.objects[x][y] = null
    }
  }

  addObject(x, y, object) {
    this.objects[x][y] = object
    let p = this.tiles[x][y].position
    object.position.set(p.x, p.y + 0.01, p.z)
    window.simulate.game.ui.scene.add(object)
  }

  unvisualizeInsertable() {
    if (!this.bbox3) return
    console.log('바운딩 박스 삭제')
    for (let i = 0; i < this.bbox3.length; i++) {
      window.simulate.game.ui.scene.remove(this.bbox3[i])
      this.bbox3[i].geometry.dispose()
      this.bbox3[i].material.dispose()
      this.bbox3[i] = null
    }

    this.bbox3 = []
  }

  visualizeInsertable(type) {
    console.log('바운딩 박스 가시화')
    this.unvisualizeInsertable()
    this.bbox3 = []

    for (let y = 0; y < this.numOfRow; y++) {
      for (let x = 0; x < this.numOfColumn; x++) {
        let existType = window.simulate.game.tileManager.tiles[x][y].type
        let existSubType = window.simulate.game.tileManager.tiles[x][y].subType

        let success = false
        // tiles[x][y]가 empty인지 확인
        // 카페의 빈 칸인 경우 > 직원 추가, 공터인 경우 > 집객시설 추가로 가정하고 작성
        if (
          existType == TILE_TYPE.CAFE &&
          existSubType == CAFE_TILE_TYPE.EMPTY &&
          type == CAFE_TILE_TYPE.CLERK
        ) {
          success = true
        } else if (type != CAFE_TILE_TYPE.CLERK && existType == TILE_TYPE.EMPTYLOT) {
          success = true
        }
        if (success) {
          // 대상 객체의 bounding box 계산
          let boundingBox
          if (this.objects[x][y] == null) {
            boundingBox = new THREE.Box3(
              new THREE.Vector3(-0.5, 0, -0.5),
              new THREE.Vector3(0.5, 1, 0.5)
            )
          } else {
            boundingBox = new THREE.Box3().setFromObject(this.objects[x][y])
          }

          // bounding box의 크기 계산
          let size = new THREE.Vector3()
          boundingBox.getSize(size)

          // 박스 생성
          let boxGeometry = new THREE.BoxGeometry(size.x, size.y, size.z)
          let boxMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff00, // 적절한 색상 선택
            opacity: 0.5, // 투명도 설정
            transparent: true // 투명도를 활성화합니다.
          })
          let boundingBoxMesh = new THREE.Mesh(boxGeometry, boxMaterial)

          // bounding box의 중심 위치 설정
          let center = this.tiles[x][y].position
          boundingBoxMesh.position.copy(center)

          window.simulate.game.ui.scene.add(boundingBoxMesh)
          this.bbox3.push(boundingBoxMesh)
        }
      }
    }
  }
}
