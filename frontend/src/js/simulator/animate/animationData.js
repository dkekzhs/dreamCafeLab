import * as THREE from 'three';

export class AnimationData {
    constructor() {
      this.positionKeyframes = [];
      this.rotationKeyframes = [];
      this.scaleKeyframes = [];
      this.materialKeyframes = [];
    }
  
    addPositionKeyframe(time, position, ani, sound = null) {
      this.positionKeyframes.push({ time, position, ani, sound });
    }
  
    addRotationKeyframe(time, rotation) {
      this.rotationKeyframes.push({ time, rotation });
    }
  
    addScaleKeyframe(time, scale) {
      this.scaleKeyframes.push({ time, scale });
    }
  
    addMaterialKeyframe(time, opacity) {
      this.materialKeyframes.push({ time, opacity });
    }
  }