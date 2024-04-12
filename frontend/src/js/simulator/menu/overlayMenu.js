import { useSimulationStore } from '@/stores/simulationStore'
import { useDataStore } from '@/stores/dataStore'
import { requestUpdateSimul } from '@/js/simulator/fetch/request'
const dataStore = useDataStore()
const simulationStore = useSimulationStore()

export default class OverlayMenu {
  constructor(div) {
    this.div = div

    OverlayMenu.I = this

    this.info = null
    this.types = [
      'school',
      'university',
      'theater',
      'cinema',
      'hotel',
      'apartment',
      'bank',
      'publicservice',
      'drugstore',
      'hospital',
      'subway',
      'busstop'
    ]

    this.init()
  }

  init() {
    this.overlayMenuDiv = document.createElement('div')
    this.overlayMenuDiv.id = 'overlayMenu'

    this.div.appendChild(this.overlayMenuDiv)
    this.overlayMenuDiv.innerHTML = this.appendHTML()

    // 툴팁 요소를 찾아서 이벤트 핸들러를 추가합니다.
    // const tooltipElements = this.overlayMenuDiv.querySelectorAll('.ui-button')
    // tooltipElements.forEach((element) => {
    //   element.addEventListener('mouseenter', this.showTooltip.bind(this))
    //   element.addEventListener('mouseleave', this.hideTooltip.bind(this))
    // })

    document.getElementById('population-icon').addEventListener('click', function () {
      OverlayMenu.I.createInfoOverlay()
    })
  }

  createInfoOverlay() {
    if (OverlayMenu.I.info) OverlayMenu.I.info.remove()
    OverlayMenu.I.info = document.createElement('div')
    OverlayMenu.I.info.className = 'overlay'

    const infoText = this.createInfo()

    // infoDiv와 closeButton을 감싸는 div 생성
    const containerDiv = document.createElement('div')
    containerDiv.className = 'info-overlay-container'

    // infoDiv 생성 및 설정
    const infoDiv = document.createElement('div')
    infoDiv.className = 'info-overlay-content'
    infoDiv.innerHTML = infoText

    // closeButton 생성 및 설정
    const closeButton = document.createElement('button')
    closeButton.textContent = '닫기'
    closeButton.className = 'info-button'
    closeButton.addEventListener('click', () => {
      OverlayMenu.I.info.remove()
    })

    // infoDiv와 closeButton을 containerDiv에 추가
    containerDiv.appendChild(infoDiv)
    containerDiv.appendChild(closeButton)

    // containerDiv를 overlay에 추가
    OverlayMenu.I.info.appendChild(containerDiv)

    // overlay를 body에 추가
    document.body.appendChild(OverlayMenu.I.info)
  }

  createInfo() {
    let infoText = ''
    for (let elem of this.types) {
      infoText +=
        '<div>' +
        elem +
        ': ' +
        window.simulate.game.tileManager.getNumOfFacilityByType(elem) +
        '</div>'
    }
    return infoText
  }

  // 툴팁을 숨기는 메서드
  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.remove()
    }
  }

  // 툴팁을 생성하는 메서드
  createTooltip(text) {
    this.tooltip = document.createElement('div')
    this.tooltip.className = 'tooltip'
    this.tooltip.textContent = text
    document.body.appendChild(this.tooltip)

    // 터치 이벤트의 위치에 따라 툴팁을 배치합니다.
    const clientX = event.x
    const clientY = event.y
    this.tooltip.style.left = clientX + 24 + 'px'
    this.tooltip.style.top = clientY + 'px'
  }

  // 툴팁을 보여주는 메서드
  showTooltip(event) {
    event.preventDefault()
    const tooltipText = event.currentTarget.dataset.type
    if (tooltipText) {
      let num = window.simulate.game.tileManager.getNumOfFacilityByType(tooltipText)
      if (num != undefined) {
        this.createTooltip(tooltipText + ': ' + num)
      } else {
        this.createTooltip(tooltipText)
      }
    }
  }

  setMoneyList(moneyList) {
    this.moneyList = moneyList
  }

  appendHTML() {
    let ihtml = []
    let idx = 0

    ihtml[idx++] = '<div id="ui">'
    ihtml[idx++] = '  <div id="title-bar">'
    ihtml[idx++] = '    <div class="title-bar-left-items title-bar-items">'
    ihtml[idx++] = '     <span id="title-money">0</span>원'
    ihtml[idx++] = '    </div>'
    ihtml[idx++] = '    <div class="title-bar-center-items title-bar-items">'
    ihtml[idx++] = '      <span id="city-name"></span>'
    ihtml[idx++] = '      <span id="sim-time"></span>'
    ihtml[idx++] = '    </div>'
    ihtml[idx++] = '    <div class="title-bar-right-items title-bar-items">'
    ihtml[idx++] = '      <img id="population-icon" src="./src/icons/info.png">'
    ihtml[idx++] = '    </div>'
    ihtml[idx++] = '  </div>'
    ihtml[idx++] = '  <div id="ui-toolbar" class="container">'
    ihtml[idx++] =
      '    <button id="button-select" class="ui-button selected" data-type="select" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '      <img class="toolbar-icon" src="./src/icons/select-color.png">'
    ihtml[idx++] = '    </button>'
    ihtml[idx++] =
      '    <button id="button-bulldoze" class="ui-button" data-type="delete" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '      <img class="toolbar-icon" src="./src/icons/bulldozer-color.png">'
    ihtml[idx++] = '    </button>'

    // ihtml[idx++] =
    //   '    <button id="button-residential" class="ui-button" data-type="bank" onclick="window.simulate.game.button.onSelectButton(this)">'
    // ihtml[idx++] = '      <img class="toolbar-icon" src="./src/icons/bank.png">'
    // ihtml[idx++] = '    </button>'

    ihtml[idx++] = '    <div class="dropdown" id="dropdown-residential">'
    ihtml[idx++] = '      <button id="button-residential" class="ui-button">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/school.png">'
    ihtml[idx++] = '      </button>'
    ihtml[idx++] = '      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="university" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/university.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="school" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/school.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] = '      </div>'
    ihtml[idx++] = '    </div>'

    ihtml[idx++] = '    <div class="dropdown" id="dropdown-residential2">'
    ihtml[idx++] = '      <button id="button-residential2" class="ui-button">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/cinema.png">'
    ihtml[idx++] = '      </button>'
    ihtml[idx++] = '      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="theater" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/theater.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="cinema" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/cinema.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] = '      </div>'
    ihtml[idx++] = '    </div>'

    ihtml[idx++] = '    <div class="dropdown" id="dropdown-residential3">'
    ihtml[idx++] = '      <button id="button-residential3" class="ui-button">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/hotel.png">'
    ihtml[idx++] = '      </button>'
    ihtml[idx++] = '      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="apartment" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/apartment.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="hotel" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/hotel.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] = '      </div>'
    ihtml[idx++] = '    </div>'

    ihtml[idx++] = '    <div class="dropdown" id="dropdown-residential4">'
    ihtml[idx++] = '      <button id="button-residential4" class="ui-button">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/hospital.png">'
    ihtml[idx++] = '      </button>'
    ihtml[idx++] = '      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="bank" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/bank.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="publicservice" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/publicservice.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="drugstore" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/drugstore.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="hospital" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/hospital.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] = '      </div>'
    ihtml[idx++] = '    </div>'

    ihtml[idx++] = '    <div class="dropdown" id="dropdown-residential4">'
    ihtml[idx++] = '      <button id="button-residential4" class="ui-button">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/subway.png">'
    ihtml[idx++] = '      </button>'
    ihtml[idx++] = '      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="subway" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/subway.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="busstop" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/busstop.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] = '      </div>'
    ihtml[idx++] = '    </div>'

    ihtml[idx++] = '    <div class="dropdown" id="dropdown-residential4">'
    ihtml[idx++] = '      <button id="button-residential4" class="ui-button">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/clerk.png">'
    ihtml[idx++] = '      </button>'
    ihtml[idx++] = '      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
    ihtml[idx++] =
      '        <button id="button-residential" class="ui-button dropdown-item" data-type="clerk" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] = '        <img class="toolbar-icon" src="./src/icons/clerk.png">'
    ihtml[idx++] = '        </button>'
    ihtml[idx++] = '      </div>'
    ihtml[idx++] = '    </div>'

    ihtml[idx++] =
      '    <button id="button-pause" class="ui-button" data-type="pause" onclick="window.simulate.game.button.onSelectButton(this)">'
    ihtml[idx++] =
      '      <img id="pause-button-icon" class="toolbar-icon" src="./src/icons/play-color.png">'
    ihtml[idx++] = '    </button>'
    ihtml[idx++] = '  </div>'

    return ihtml.join('')
  }

  async onSelectButton(data) {
    let type = data.getAttribute('data-type')

    if (type == 'select') {
      this.selectBuildingType(type)
      window.simulate.game.tileSystem.unvisualizeInsertable()
    } else if (type == 'pause') {
      // 일시정지였던 경우
      this.setPause((window.simulate.game.ui.pause + 1) % 4)
      window.simulate.game.tileSystem.unvisualizeInsertable()
      if (window.simulate.game.ui.pause == 0) {
        // JSON 객체 생성 및 데이터 채우기
        let curprogress = window.simulate.game.ui.month // 0~35
        let curlog = window.simulate.game.tileManager.updateLog[curprogress]
        // for (let i = 0; i < window.simulate.game.tileManager.updateLog.length; ++i) {
        //   if (window.simulate.game.tileManager.updateLog[i].progress == curprogress) {
        //     curlog = window.simulate.game.tileManager.updateLog[i]
        //   }
        // }

        if (curlog.addfacility.length == 0 && curlog.removefacility.length == 0) {
          console.log('update 내역이 없어 api가 호출되지 않음')
        } else {
          const simulationUpdateRequest = {
            uuid: simulationStore.uuid,
            employees: curlog.employees,
            progress: curprogress,
            removeFacility: curlog.removefacility,
            addFacility: curlog.addfacility
          }
          // API로 시뮬레이션 데이터 전송
          await this.sendDataToSimulationAPI(simulationUpdateRequest)
          console.log('update api 호출 끝')
        }
      }
    } else {
      window.simulate.game.tileSystem.visualizeInsertable(type)
      this.setPause(0)
      this.selectBuildingType(type)
    }
  }

  // API 요청 보내기
  // 인스턴스 메서드로 변경
  async sendDataToSimulationAPI(simulationUpdateRequest) {
    try {
      // API로 데이터 전송하여 update 요청을 실행함
      await requestUpdateSimul(simulationUpdateRequest)
    } catch (error) {
      console.error('Error while sending simulation data:', error)
    }
  }

  setPause(pause) {
    window.simulate.game.ui.pause = pause
    switch (pause) {
      case 0:
        {
          document.getElementById('pause-button-icon').src = './src/icons/play-color.png'
        }
        break

      case 1:
        {
          document.getElementById('pause-button-icon').src = './src/icons/play-fast-foward.png'
        }
        break

      case 2:
        {
          document.getElementById('pause-button-icon').src = './src/icons/play-fast-fast-foward.png'
        }
        break
      case 3:
        {
          document.getElementById('pause-button-icon').src = './src/icons/pause-color.png'
        }
        break
    }
  }

  selectBuildingType(buildingType) {
    // 건물 유형에 따른 동작 수행
    console.log('Selected building type:', buildingType)
    if (buildingType == 'select') buildingType = null
    window.simulate.game.tileSystem.setConstructionType(buildingType)
  }
}
