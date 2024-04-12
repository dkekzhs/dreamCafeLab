import * as THREE from 'three'

export default class EventHandler {
  constructor() {
    this.renderer = window.simulate.game.ui.renderer
    this.camera = window.simulate.game.ui.camera
    this.scene = window.simulate.game.ui.scene
    this.tileSystem = window.simulate.game.tileSystem

    EventHandler.I = this

    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector3()

    this.init()
  }

  init() {
    this.renderer.domElement.addEventListener('pointerdown', function (event) {
      event.preventDefault()
      EventHandler.I.onMouseDown(event)
    })

    this.renderer.domElement.addEventListener('pointermove', function (event) {
      event.preventDefault()
      EventHandler.I.onMouseMove(event)
    })
  }

  onMouseDown(event) {
    event.preventDefault()

    const { x, y } = this.getNormalizedDeviceCoordinates(event.clientX, event.clientY)

    // 카메라의 월드 좌표로 변환
    this.raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera)

    // 레이캐스트로부터 교차점을 찾습니다.

    let tiles = window.simulate.game.tileSystem.tiles
    let objects = window.simulate.game.tileSystem.objects
    let l = flattenArray(tiles).concat(flattenArray(objects))
    console.log(l)
    const intersects = this.raycaster.intersectObjects(l, true)

    if (intersects.length > 0) {
      // 첫 번째 교차점의 위치를 가져옵니다.
      const intersectionPoint = intersects[0].point
      const intersectionObject = intersects[0].object

      const object = this.findRootParent(intersectionObject)
      console.log('Clicked at object:', object)

      if (object) {
        window.simulate.game.tileSystem.handleMouseDown(object)
      }

      console.log('Intersection point:', intersectionPoint)
    } else {
      console.log('Clicked at empty space')
    }
  }

  onMouseMove(event) {
    event.preventDefault()

    const { x, y } = this.getNormalizedDeviceCoordinates(event.clientX, event.clientY)

    // 카메라의 월드 좌표로 변환
    const worldCoordinates = this.screenToWorldCoordinates(x, y, this.camera)

    // console.log(worldCoordinates)
  }

  getNormalizedDeviceCoordinates(clientX, clientY) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 2 - 1
    const y = -((clientY - rect.top) / rect.height) * 2 + 1
    return { x, y }
  }

  // 정규화된 장치 좌표를 월드 좌표로 변환합니다.
  screenToWorldCoordinates(normalizedX, normalizedY, camera) {
    const mouseVector = new THREE.Vector3(normalizedX, normalizedY, 0.5)
    mouseVector.unproject(camera)

    const dir = mouseVector.sub(camera.position).normalize()
    const distance = -camera.position.z / dir.z
    const pos = camera.position.clone().add(dir.multiplyScalar(distance))

    return pos
  }

  findRootParent(object) {
    while (object !== null && !(object.parent instanceof THREE.Scene)) {
      object = object.parent
    }
    return object
  }
}

function flattenArray(arr) {
  return arr.reduce(function (flat, toFlatten) {
    if (toFlatten === null) return flat // null 값이면 무시
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten)
  }, [])
}
