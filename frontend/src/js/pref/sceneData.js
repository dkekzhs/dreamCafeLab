export let presetScene = {
    normal: {
      construction: [
        {
          x: 1,
          y: 1,
          type: "power-plant",
        },
      ],
  
      customer: [
        {
          id: 1,
          model: "atm-mechine",
          animation: {
            translation: [
              { time: 0, position: [0, 0, 0] },
              { time: 1500000, position: [10, 0, 10] },
            ],
          },
        },
      ],
    },
    low: {},
    high: {},
  };
  