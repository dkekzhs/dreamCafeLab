import * as THREE from 'three'
import settings from './settings'

export let presetScene = {
  stage: [
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },

    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },

    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },

    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    },
    {
      customer: 0
    }
  ],

  money: [
    {
      date: 30,
      amount: -3000
    },

    {
      date: 60,
      amount: -3000
    },

    {
      date: 90,
      amount: -3000
    },

    {
      date: 120,
      amount: -3000
    },

    {
      date: 150,
      amount: 33333
    },

    {
      date: 180,
      amount: 3000
    },

    {
      date: 210,
      amount: 1234
    },

    {
      date: 240,
      amount: 1232
    },

    {
      date: 270,
      amount: 3453
    },

    {
      date: 300,
      amount: 3000
    }
  ],
  human: []
}

function addCustomer(t) {
  let x = 8
  let z = 6

  presetScene.human.push({
    model: 'human_' + parseInt(Math.random() * 4 + 1),
    position: [x, 0, z],
    animation: {
      position: [
        {
          time: t,
          at: [x, 0, z]
        },
        {
          time: t + 0.3 * settings.renderer.secperday,
          at: [x - 2, 0, z]
        },
        {
          time: t + 0.45 * settings.renderer.secperday,
          at: [x - 2, 0, z - 1]
        },
        {
          time: t + 0.75 * settings.renderer.secperday,
          at: [x - 4, 0, z - 1],
          ani: 'stop'
        },
        {
          time: t + 0.9 * settings.renderer.secperday,
          at: [x - 4, 0, z - 1],
          ani: 'play',
          sound: 'coin'
        },
        {
          time: t + 1.15 * settings.renderer.secperday,
          at: [x - 6, 0, z - 1]
        },
        {
          time: t + 1.3 * settings.renderer.secperday,
          at: [x - 6, 0, z]
        },
        {
          time: t + 1.6 * settings.renderer.secperday,
          at: [x - 8, 0, z]
        }
      ],
      rotation: [
        {
          time: t,
          turn: [0, THREE.MathUtils.degToRad(-90), 0]
        },
        {
          time: t + 0.3 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(-90), 0]
        },
        {
          time: t + 0.35 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(-180), 0]
        },
        {
          time: t + 0.45 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(-90), 0]
        },
        {
          time: t + 0.65 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(-90), 0]
        },
        {
          time: t + 0.7 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(-180), 0]
        },
        {
          time: t + 0.8 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(-180), 0]
        },
        {
          time: t + 0.85 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(-90), 0]
        },
        {
          time: t + 1.1 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(-90), 0]
        },
        {
          time: t + 1.15 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(0), 0]
        },
        {
          time: t + 1.25 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(-45), 0]
        },
        {
          time: t + 1.3 * settings.renderer.secperday,
          turn: [0, THREE.MathUtils.degToRad(-90), 0]
        }
      ],
      scale: [],
      material: [
        {
          time: t,
          opacity: 1
        },
        {
          time: t + 1.15 * settings.renderer.secperday,
          opacity: 1
        },
        {
          time: t + 1.6 * settings.renderer.secperday,
          opacity: 0
        }
      ]
    }
  })
}

export function setHuman() {
  for (let i = 0; i < presetScene.stage.length; i++) {
    let count = presetScene.stage[i].customer

    for (let j = 0; j < count; j++) {
      addCustomer(
        settings.renderer.secperday * 30 * i +
          parseInt(Math.random() * (settings.renderer.secperday * 30))
      )
    }
  }
}
