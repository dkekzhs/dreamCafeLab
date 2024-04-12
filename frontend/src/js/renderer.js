import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import settings from './pref/settings'
import TileSystem from './simulator/tileSystem'
import { AssetManager } from './simulator/assetManager'
import ObjectManager from './simulator/objectManager'
import Stats from 'stats.js'
import EventHandler from './simulator/eventHandler'
import OverlayMenu from './simulator/menu/overlayMenu'
import { presetScene } from './pref/sceneData'
import { CAFE_SIZE, FACILITY_TYPE, SEASON_TYPE } from '@/js/simulator/tile/tileEnum'
import TileManager from '@/js/simulator/tile/tileManager'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import { useSimulationStore } from '@/stores/simulationStore'
import Render from '@/components/Render.vue'

const simData = useSimulationStore()

export class Renderer {
  constructor(div, name) {
    this.div = div

    this.name = name

    this.start = new Date()
    this.date = new Date()
    this.duration = 0
    this.month = 0

    Renderer.I = this

    Renderer.I.pause = 0

    this.loader = new GLTFLoader()
    // this.createMesh("Hoodie Character");

    this.createCanvas(this.div)

    this.init()

    Renderer.I.renderer.setAnimationLoop(Renderer.I.animation)
  }

  init() {
    window.simulate.game.assetManager = new AssetManager(() => {
      window.simulate.game.tileManager = new TileManager()
      let tiles = window.simulate.game.tileManager.initTile(
        simData.uuid,
        SEASON_TYPE.SPRING,
        window.simulate.game.tileSystem.numOfRow,
        window.simulate.game.tileSystem.numOfColumn,
        CAFE_SIZE.SMALL,
        simData.facilityList.length,
        simData.facilityList,
        simData.input.employees,
        1,
        simData.selectBrand.brandId
      )
      presetScene.tiles = tiles

      window.simulate.game.objectManager = new ObjectManager(
        window.simulate.game.assetManager,
        window.simulate.game.tileSystem
      )
      window.simulate.game.objectManager.loadScene(presetScene)

      this.eventHandler = new EventHandler()
    })
  }

  exportScene() {
    // Instantiate a exporter
    let exporter = new GLTFExporter()
    // GLTF 파일로 내보내기
    exporter.parse(
      Renderer.I.scene,
      function (gltf) {
        console.log(gltf)
        const blob = new Blob([JSON.stringify(gltf)], { type: 'application/octet-stream' })
        const url = URL.createObjectURL(blob)

        // 다운로드 링크 생성
        const link = document.createElement('a')
        link.style.display = 'none'
        document.body.appendChild(link)

        link.href = url
        link.download = 'model.gltf'
        link.click()

        URL.revokeObjectURL(url)
        document.body.removeChild(link)
      },
      {}
    )
  }

  createCanvas(div) {
    const width = window.innerWidth,
      height = window.innerHeight

    Renderer.I.scene = new THREE.Scene()
    Renderer.I.time = null

    Renderer.I.renderer = new THREE.WebGLRenderer({ antialias: false })

    Renderer.I.camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
    Renderer.I.camera.position.y = 7
    Renderer.I.camera.position.x = 10
    Renderer.I.camera.position.z = 10

    Renderer.I.camera.lookAt(new THREE.Vector3(0, 0, 0))

    Renderer.I.camera.far = 1000
    Renderer.I.camera.near = 0.1

    const ambientLight = new THREE.AmbientLight(
      settings.renderer.ambient.color,
      settings.renderer.ambient.intensity
    )
    Renderer.I.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(
      settings.renderer.directional.color,
      settings.renderer.directional.intensity
    )
    directionalLight.position.set(1, 1, 1) // 광원의 방향 설정
    Renderer.I.scene.add(directionalLight)

    Renderer.I.scene.background = new THREE.Color(settings.renderer.background.color)

    Renderer.I.renderer.setSize(width, height)

    Renderer.I.scene.fog = new THREE.FogExp2(Renderer.I.scene.background, 0.01)

    const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `

    const fragmentShader = `
    uniform vec3 uColor;
    varying vec2 vUv;
    
    void main() {
        gl_FragColor = vec4((vUv.y + 0.3) * uColor, 1.0);
    }
    `
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uColor: { value: new THREE.Vector3(0.5, 0.7, 1.0) } // 새로운 uniform 변수 초기값 설정
      }
    })

    // 큐브나 스피어 기하체 생성
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    // ShaderMaterial을 사용하는 메시 생성
    const sky = new THREE.Mesh(geometry, material)
    // 씬에 추가
    Renderer.I.scene.add(sky)

    // this.stats = new Stats()
    // this.stats.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
    // this.div.appendChild(this.stats.dom)
    Renderer.I.controls = new OrbitControls(Renderer.I.camera, Renderer.I.renderer.domElement)

    div.appendChild(Renderer.I.renderer.domElement)

    div.addEventListener('resize', Renderer.I.updateRendererSize)
    this.updateRendererSize()

    window.simulate = {}
    window.simulate.game = {}
    window.simulate.game.ui = this
    window.simulate.game.tileSystem = new TileSystem(9, 9)
    window.simulate.game.button = new OverlayMenu(div)

    // window.simulate.game.button.setMoneyList(presetScene.money)
    window.simulate.game.ui.animationList = []
  }

  // animation
  animation(time) {
    // Renderer.I.stats.begin()

    Renderer.I.renderer.render(Renderer.I.scene, Renderer.I.camera)
    if (!Renderer.I.time) {
      Renderer.I.time = 0
    }

    if (Renderer.I.pause != 0) {
      let deltaTime = time - Renderer.I.time
      if (Renderer.I.pause == 2) {
        deltaTime *= 3
      } else if (Renderer.I.pause == 3) {
        deltaTime *= 10
      }
      for (let ani of Renderer.I.animationList) {
        ani.update(deltaTime)
      }
      Renderer.I.duration += deltaTime

      if (Renderer.I.duration > settings.renderer.secperday) {
        Renderer.I.date.setDate(
          Renderer.I.date.getDate() + Renderer.I.duration / settings.renderer.secperday
        )
        Renderer.I.duration -=
          (Renderer.I.duration / settings.renderer.secperday) * settings.renderer.secperday
      }

      const year = Renderer.I.date.getFullYear() // 연도를 가져옴
      const month = Renderer.I.date.getMonth() + 1 // 월을 가져오지만, JavaScript에서 월은 0부터 시작하므로 1을 더함
      const day = Renderer.I.date.getDate() // 일을 가져옴

      document.getElementById('sim-time').innerHTML = year + '.' + month + '.' + day
      if (window.simulate.game.button.moneyList.length > 0) {
        if (
          Math.ceil(Renderer.I.date - Renderer.I.start) / (1000 * 60 * 60 * 24) >=
          window.simulate.game.button.moneyList[Renderer.I.month].date
        ) {
          document.getElementById('title-money').innerHTML =
            parseInt(document.getElementById('title-money').innerHTML) +
            window.simulate.game.button.moneyList[Renderer.I.month].amount
          // window.simulate.game.button.moneyList.splice(0, 1)
          Renderer.I.month++

          let lastmonth = month - 1
          if (month == 1) {
            lastmonth = 12
          }

          let toastMsg = `
          <h5>${Renderer.I.month}개월차 영업 종료!</h5>
          ${year}년 ${lastmonth}월 영업 결과,<br/>
          ${simData.revenueList[Renderer.I.month - 1].revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원의 매출이 발생했어요.<br/><br/>
          이 중 ${simData.revenueList[Renderer.I.month - 1].totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원이 카페 운영 비용으로 사용되어,<br/>
          <b>${window.simulate.game.button.moneyList[Renderer.I.month - 1].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</b>의 순이익을 얻었어요.
          `

          if (lastmonth == 2) {
            toastMsg += `
            <br/><br/>겨울의 마무리입니다. ❄
            `
          } else if (lastmonth == 3) {
            toastMsg += `
            <br/><br/>봄이 시작됐어요. 🌸
            `
          } else if (lastmonth == 5) {
            toastMsg += `
            <br/><br/>봄이 끝났어요. 🌺
            `
          } else if (lastmonth == 6) {
            toastMsg += `
            <br/><br/>여름의 시작이네요! ⛱🌞
            `
          } else if (lastmonth == 8) {
            toastMsg += `
            <br/><br/>여름도 끝이네요. 🌻
            `
          } else if (lastmonth == 9) {
            toastMsg += `
            <br/><br/>가을의 시작입니다. 🍂
            `
          } else if (lastmonth == 11) {
            toastMsg += `
            <br/><br/>가을도 끝났네요. 🍁
            `
          } else if (lastmonth == 12) {
            toastMsg += `
            <br/><br/>겨울의 시작이에요. ☃
            `
          }

          Renderer.I.showToast(toastMsg)
        }
      }
    }

    Renderer.I.time = time
    // Renderer.I.stats.end()
  }

  updateRendererSize() {
    const width = Renderer.I.renderer.domElement.clientWidth
    const height = Renderer.I.renderer.domElement.clientHeight

    // 카메라 비율 업데이트
    Renderer.I.camera.aspect = width / height
    Renderer.I.camera.updateProjectionMatrix()

    // 렌더러 크기 업데이트
    Renderer.I.renderer.setSize(width, height)
  }

  showToast(message) {
    const toastElement = document.getElementById('toastMessage')
    toastElement.innerHTML = message
    toastElement.style.visibility = 'visible'
    toastElement.style.opacity = '1'

    // 3초 후에 토스트 메시지가 사라지도록 설정
    setTimeout(() => {
      toastElement.style.visibility = 'hidden'
      toastElement.style.opacity = '0'
    }, 3000)
  }

  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
