import * as THREE from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import { AnimationData } from './animate/animationData'
import { AnimationTransform } from './animate/animationTransform'
import { TILE_TYPE, CAFE_TILE_TYPE, FACILITY_TYPE } from '@/js/simulator/tile/tileEnum'
import { useSimulationStore } from '@/stores/simulationStore'
import { presetScene, setHuman } from '../pref/sceneData'
import settings from '../pref/settings'

const simulationStore = useSimulationStore()

export default class ObjectManager {
  constructor(assetManager, tileSystem) {
    this.assetManager = assetManager // AssetManager 인스턴스를 받아옴
    this.tileSystem = tileSystem
    this.tileManager = window.simulate.game.tileManager
    this.textureLoader = new THREE.TextureLoader()
    // create an AudioListener and add it to the camera
    this.listener = new THREE.AudioListener()
    window.simulate.game.ui.camera.add(this.listener)
    this.sound = new THREE.Audio(this.listener)
    this.soundLoader = new THREE.AudioLoader()

    this.humans = []
  }

  loadScene(data) {
    this.loadTile()
    this.updateMoney()
    this.updateHuman()

    this.loadHuman(presetScene.human)
    // this.loadHuman(data.human)
    // this.loadEnv();
  }

  // 주어진 확률에 따라 인덱스 선택하는 함수
  selectIndexByProbability(probabilities) {
    const rand = Math.random()
    let cumulativeProbability = 0
    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProbability += probabilities[i]
      if (rand < cumulativeProbability) {
        return i
      }
    }
    return probabilities.length - 1 // 확률의 합이 1이 아닌 경우 마지막 인덱스 반환
  }

  loadTile() {
    // 타일 매니저를 참고하여 에셋 배치하기
    for (let i = 0; i < this.tileManager.numOfRow; i++) {
      for (let j = 0; j < this.tileManager.numOfColumn; j++) {
        let modelName = this.tileManager.tiles[i][j].getModelName()
        // console.log('model name >> ' + modelName)
        if (modelName.includes('empty')) {
          continue
        } else {
          const model = this.assetManager.getModel(modelName)

          const position = this.tileSystem.tiles[i][j].position
          if (model) {
            let object = null
            if (modelName.includes('clerk')) {
              object = SkeletonUtils.clone(model)
              this.addSpriteToMesh(object, 'brand/' + simulationStore.selectBrand.brandId)
            } else {
              object = model.clone()
            }
            object.position.set(position.x, position.y, position.z)
            this.tileSystem.addObject(i, j, object)
          } else {
            console.error(`Model '${modelName}' not found in AssetManager`)
          }
        }
      }
    }
    // for (let i = 0; i < data.length; i++) {
    //   for (let j = 0; j < data[i].length; j++) {
    //     const modelName = data[i][j].getModelName()
    //     if (modelName.includes('empty')) continue
    //     console.log('name >> ' + modelName)
    //     const position = this.tileSystem.tiles[i][j].position

    //     const model = this.assetManager.getModel(modelName).clone()

    //     this.tileSystem.objects[i][j] = model

    //     console.log(modelName + '(' + position.x + ',' + position.z + ')')

    //     if (model) {
    //       model.position.set(position.x, position.y + 0.3, position.z)
    //       window.simulate.game.ui.scene.add(model)
    //     } else {
    //       console.error(`Model '${modelName}' not found in AssetManager`)
    //     }
    //   }
    // }
  }

  updateMoney() {
    presetScene.money = []
    for (let i = 0; i < 36; i++) {
      presetScene.money.push({
        date: 31 * (i + 1),
        // amount: 300
        amount: simulationStore.revenueList[i].revenue - simulationStore.revenueList[i].totalCost // 매출-비용 = 순이익
      })
    }
    console.log('updateMoney')
    console.log(presetScene.money)
    window.simulate.game.button.setMoneyList(presetScene.money)
  }

  loadEnv() {
    let clonedMesh = this.assetManager.getModel('background').clone()
    window.simulate.game.ui.scene.add(clonedMesh)
  }

  addSpriteToMesh(mesh, spriteName) {
    const texture = this.textureLoader.load('./src/assets/img/' + spriteName + '.png')

    // 스프라이트 머티리얼 생성
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture })

    // 스프라이트 생성
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(1, 1, 1) // 스프라이트 크기 설정
    sprite.position.set(0, 2.3, 0)
    mesh.add(sprite)
  }

  // 남성, 여성, 나이대별 사람 생성하기
  loadHuman(data) {
    for (let elem of data) {
      let origin = this.assetManager.getModel(elem.model)
      let clonedMesh = SkeletonUtils.clone(origin)

      // 스프라이트 텍스처 로드
      let chance = Math.random()
      if (chance > 0.5)
        this.addSpriteToMesh(clonedMesh, 'coffee_menu_' + parseInt(Math.random() * 22 + 1))
      else {
        const keys = Object.keys(FACILITY_TYPE)
        const randomKey = keys[Math.floor(Math.random() * keys.length)]
        const randomValue = FACILITY_TYPE[randomKey]
        this.addSpriteToMesh(clonedMesh, randomValue)
      }
      let mixer = new THREE.AnimationMixer(clonedMesh)
      let clips = clonedMesh.animations

      const clip = THREE.AnimationClip.findByName(clips, 'CharacterArmature|Walk')
      const action = mixer.clipAction(clip)

      if (action) action.play()

      let animationData = new AnimationData()

      animationData.mixer = mixer

      clonedMesh.position.set(...elem.position)
      for (let i = 0; i < elem.animation.position.length; i++) {
        animationData.addPositionKeyframe(
          elem.animation.position[i].time,
          new THREE.Vector3(...elem.animation.position[i].at),
          elem.animation.position[i].ani,
          elem.animation.position[i].sound
        )
      }

      for (let i = 0; i < elem.animation.rotation.length; i++) {
        animationData.addRotationKeyframe(
          elem.animation.rotation[i].time,
          elem.animation.rotation[i].turn
        )
      }

      for (let i = 0; i < elem.animation.scale.length; i++) {
        animationData.addScaleKeyframe(
          elem.animation.scale[i].time,
          new THREE.Vector3(...elem.animation.scale[i].size)
        )
      }

      for (let i = 0; i < elem.animation.material.length; i++) {
        animationData.addMaterialKeyframe(
          elem.animation.material[i].time,
          elem.animation.material[i].opacity
        )
      }

      let animationTransform = new AnimationTransform(
        clonedMesh,
        animationData,
        window.simulate.game.ui.time
      )
      window.simulate.game.ui.scene.add(clonedMesh)
      this.humans.push(clonedMesh)
      window.simulate.game.ui.animationList.push(animationTransform)
    }
  }

  deleteHuman() {
    for (let i = 0; i < this.humans.length; i++) {
      this.deleteObject(this.humans[i])
    }

    window.simulate.game.ui.animationList = []
    this.humans = []
  }

  updateHuman() {
    this.deleteHuman()

    presetScene.human = []
    // 이 코드에서 이전 값과 비교한 뒤 salesCount 증감에 따라 손님 수 증감하기
    // 이 코드에서 이전 집객 시설 개수 비교 후 증감에 따라 mesh sprite 변경하기 (좀 어려울 듯 => 마지막까지 안되면 그냥 초기 집객시설 종류 별로 2d 이미지만 띄우기)
    for (let i = 0; i < 36; i++) {
      // before revenue, latest revenue 비교
      // let diff = latestRevenueList[i].salesCount - beforeRevenueList[i].salesCount

      presetScene.stage[i].customer =
        // simulationStore.latestRevenueList[i].salesCount / settings.renderer.divide
        10
      if (presetScene.stage[i].customer > settings.renderer.maxcustomer) {
        presetScene.stage[i].customer = settings.renderer.maxcustomer
      }
    }

    setHuman()
  }

  addObject(x, y, object, type) {
    // to dyne : 타일 매니저 확인 (check 메소드를 통해 x,y 위치가 empty slot 인지 확인해주세요) & 유효한 범위 내의 row, column 위치인지 확인해주세요

    // 유효 범위 요청인지 확인
    if (x < 0 && x >= this.tileManager.numOfRow && y < 0 && y >= this.tileManager.numOfColumn) {
      alert('존재하지 않는 칸입니다.')
      return
    }

    //
    let toastMsg = '토스트!'

    let existType = this.tileManager.tiles[x][y].type
    let existSubType = this.tileManager.tiles[x][y].subType

    let success = false
    // tiles[x][y]가 empty인지 확인
    // 카페의 빈 칸인 경우 > 직원 추가, 공터인 경우 > 집객시설 추가로 가정하고 작성
    if (
      existType == TILE_TYPE.CAFE &&
      existSubType == CAFE_TILE_TYPE.EMPTY &&
      type == CAFE_TILE_TYPE.CLERK
    ) {
      success = this.tileManager.addClerk(x, y)
      toastMsg =
        window.simulate.game.ui.month +
        1 +
        '개월 째에 ' +
        '직원을 1명 더 고용했어요! 총 ' +
        this.tileManager.numOfClerk +
        '명이 되었어요.'
    } else if (existType == TILE_TYPE.EMPTYLOT) {
      success = this.tileManager.addFacility(x, y, type) // type이 집객시설 type이라고 가정함!
      toastMsg =
        window.simulate.game.ui.month +
        1 +
        '개월 째에 ' +
        type +
        '이 새로 생겼어요. 매출이 변동됩니다.'
    } else {
      console.log(existType + '에는 설치할 수 없습니다.')
      return
    }

    if (success) {
      // 추가 가능한 경우 타일 시스템에서 오브젝트 추가
      if (
        existType == TILE_TYPE.CAFE &&
        existSubType == CAFE_TILE_TYPE.EMPTY &&
        type == CAFE_TILE_TYPE.CLERK
      ) {
        this.addSpriteToMesh(object, 'brand/' + simulationStore.selectBrand.brandId)
      }

      // 토스트 띄우기
      window.simulate.game.ui.showToast(toastMsg)

      // tileSystem에서 오브젝트 추가
      this.tileSystem.addObject(x, y, object)
    }
  }

  getObject(x, y) {
    return this.tileSystem.getObjectAt(x, y)
  }

  /**
   * [x,y]의 오브젝트를 삭제한다.
   * @param {number} x x 좌표
   * @param {number} y y 좌표
   */
  deleteObjectByCoord(x, y) {
    // to dyne : 타일 매니저에서 해당 오브젝트가 삭제 가능한 경우에만 아래 문장을 수행하도록 해주세요
    // (카페 영역, 도로 영역 등은 crud 불가)

    if (x < 0 && x >= this.tileManager.numOfRow && y < 0 && y >= this.tileManager.numOfColumn) {
      console.log('잘못된 요청입니다.')
      return
    }

    let toastMsg = '토스트!'

    let existType = this.tileManager.tiles[x][y].type
    let existSubType = this.tileManager.tiles[x][y].facilityType
    let success = false

    if (existType == TILE_TYPE.ROAD || existType == TILE_TYPE.EMPTYLOT) {
      console.log(existType + '은(는) 삭제할 수 없습니다.')
      return
    } else if (existType == TILE_TYPE.BUILDING || existType == TILE_TYPE.PARK) {
      success = this.tileManager.deleteCityObject(x, y)
      toastMsg = '카페 주변의 ' + existType + '이 사라지고 공터가 되었어요.'
    } else if (existType == TILE_TYPE.FACILITY) {
      success = this.tileManager.deleteCityObject(x, y)
      toastMsg =
        window.simulate.game.ui.month +
        1 +
        '개월 째에 카페 주변의 ' +
        existSubType +
        ' 1개가 사라졌어요. 매출이 변동됩니다.'
    } else if (existType == TILE_TYPE.CAFE) {
      success = this.tileManager.removeClerk(x, y)
      toastMsg =
        window.simulate.game.ui.month +
        1 +
        '개월 째에 ' +
        '직원 수를 1명 줄였어요. 앞으로 ' +
        this.tileManager.numOfClerk +
        '명의 직원이 일할 거예요.'
    }

    if (success) {
      let object = this.tileSystem.objects[x][y]
      this.deleteObject(object)

      this.tileSystem.deleteObject(x, y)

      // 토스트 띄우기
      window.simulate.game.ui.showToast(toastMsg)
    }
  }

  /**
   * object를 장면에서 제거하고 메모리 해제한다.
   * @param {THREE.Object3D} object 3.js 오브젝트
   */
  deleteObject(object) {
    console.log('removed >> ' + object)
    window.simulate.game.ui.scene.remove(object)

    object.traverse((component) => {
      if (component.geometry) {
        component.geometry.dispose()
      }
      if (component.material) {
        component.material.dispose()
      }
    })

    object = null
  }
}
