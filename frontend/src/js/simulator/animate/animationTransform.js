import settings from '@/js/pref/settings'
import * as THREE from 'three'

export class AnimationTransform {
  constructor(simObject, animation, currentTime) {
    this.animation = animation
    this.simObject = simObject

    // Additional properties if needed
    this.currentTime = currentTime
    this.isPlaying = true
    this.aniPlaying = true

    this.totalDuration = this.calculateTotalDuration(animation) + currentTime
  }

  play() {
    this.isPlaying = true
  }

  aniPlay() {
    this.aniPlaying = true
  }

  stop() {
    this.isPlaying = false
  }

  aniStop() {
    this.aniPlaying = false
  }

  update(deltaTime) {
    if (this.isPlaying) {
      // Interpolate and apply keyframes
      this.interpolateKeyframes()
      if (this.aniPlaying) {
        this.animation.mixer.update((deltaTime * 5) / settings.renderer.secperday)
      }
      // Update the current time
      this.currentTime += deltaTime

      // keyframes를 넘어서면 애니메이션 중지
      if (this.currentTime > this.totalDuration) {
        this.stop()
      }
    }
  }

  interpolateKeyframes() {
    const { positionKeyframes, rotationKeyframes, scaleKeyframes, materialKeyframes } =
      this.animation

    let interpolatedPosition = null,
      interpolatedRotation = null,
      interpolatedScale = null,
      interpolatedOpacity = null

    let positionIndex
    // Interpolate position
    if (positionKeyframes.length > 0) {
      positionIndex = this.findKeyframeIndex(positionKeyframes, this.currentTime)
      const nextPositionIndex = (positionIndex + 1) % positionKeyframes.length
      const positionAlpha =
        (this.currentTime - positionKeyframes[positionIndex].time) /
        (positionKeyframes[nextPositionIndex].time - positionKeyframes[positionIndex].time)
      interpolatedPosition = new THREE.Vector3().lerpVectors(
        positionKeyframes[positionIndex].position,
        positionKeyframes[nextPositionIndex].position,
        positionAlpha
      )

      if (positionKeyframes[positionIndex].ani) {
        if (positionKeyframes[positionIndex].ani == 'stop') {
          this.aniStop()
        } else if (positionKeyframes[positionIndex].ani == 'play') {
          this.simObject.remove(this.simObject.children[1])
          this.aniPlay()
        }
      }

      if (positionKeyframes[positionIndex].sound) {
        if (!window.simulate.game.objectManager.sound.isPlaying) {
          window.simulate.game.objectManager.soundLoader.load(
            './src/assets/sound/' + positionKeyframes[positionIndex].sound + '1.mp3',
            function (buffer) {
              window.simulate.game.objectManager.sound.setBuffer(buffer)
              window.simulate.game.objectManager.sound.setVolume(1)
              window.simulate.game.objectManager.sound.play()
            }
          )
        }
      }
    }

    // Interpolate rotation
    if (rotationKeyframes.length > 0) {
      const rotationIndex = this.findKeyframeIndex(rotationKeyframes, this.currentTime)
      const nextRotationIndex = (rotationIndex + 1) % rotationKeyframes.length
      const rotationAlpha =
        (this.currentTime - rotationKeyframes[rotationIndex].time) /
        (rotationKeyframes[nextRotationIndex].time - rotationKeyframes[rotationIndex].time)
      interpolatedRotation = new THREE.Quaternion().slerpQuaternions(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(...rotationKeyframes[rotationIndex].rotation, 'XYZ')
        ),
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(...rotationKeyframes[nextRotationIndex].rotation, 'XYZ')
        ),
        rotationAlpha
      )
    }
    // Interpolate scale
    if (scaleKeyframes.length > 0) {
      const scaleIndex = this.findKeyframeIndex(scaleKeyframes, this.currentTime)
      const nextScaleIndex = (scaleIndex + 1) % scaleKeyframes.length
      const scaleAlpha =
        (this.currentTime - scaleKeyframes[scaleIndex].time) /
        (scaleKeyframes[nextScaleIndex].time - scaleKeyframes[scaleIndex].time)
      interpolatedScale = new THREE.Vector3().lerpVectors(
        scaleKeyframes[scaleIndex].scale,
        scaleKeyframes[nextScaleIndex].scale,
        scaleAlpha
      )
    }

    if (materialKeyframes.length > 0) {
      const opacityIndex = this.findKeyframeIndex(materialKeyframes, this.currentTime)
      const prevOpacityKeyframe = materialKeyframes[opacityIndex]
      const nextOpacityKeyframe = materialKeyframes[(opacityIndex + 1) % materialKeyframes.length]

      if (prevOpacityKeyframe && nextOpacityKeyframe) {
        const t =
          (this.currentTime - prevOpacityKeyframe.time) /
          (nextOpacityKeyframe.time - prevOpacityKeyframe.time)
        interpolatedOpacity = THREE.MathUtils.lerp(
          prevOpacityKeyframe.opacity,
          nextOpacityKeyframe.opacity,
          t
        )
      }
    }
    // Set the interpolated values to the SimObject
    if (interpolatedPosition) {
      this.simObject.position.copy(interpolatedPosition)
    }
    if (interpolatedRotation) {
      this.simObject.rotation.setFromQuaternion(interpolatedRotation)
    }
    if (interpolatedScale) {
      this.simObject.scale.copy(interpolatedScale)
    }
    if (interpolatedOpacity) {
      if (interpolatedOpacity <= 0) {
        this.simObject.visible = false

        window.simulate.game.objectManager.deleteObject(this.simObject)
      }
      // this.simObject.traverse((elem) => {
      //   if(elem.material) {
      //     elem.material.opacity = interpolatedOpacity;
      //   }
      // });
    }
  }

  findKeyframeIndex(keyframes, currentTime) {
    for (let i = 0; i < keyframes.length - 1; i++) {
      if (currentTime >= keyframes[i].time && currentTime < keyframes[i + 1].time) {
        return i
      }
    }
    return keyframes.length - 1
  }

  calculateTotalDuration(animation) {
    let maxDuration = 0

    const { positionKeyframes, rotationKeyframes, scaleKeyframes, materialKeyframes } = animation

    if (positionKeyframes.length > 0) {
      maxDuration = Math.max(maxDuration, positionKeyframes[positionKeyframes.length - 1].time)
    }

    if (rotationKeyframes.length > 0) {
      maxDuration = Math.max(maxDuration, rotationKeyframes[rotationKeyframes.length - 1].time)
    }

    if (scaleKeyframes.length > 0) {
      maxDuration = Math.max(maxDuration, scaleKeyframes[scaleKeyframes.length - 1].time)
    }

    if (materialKeyframes.length > 0) {
      maxDuration = Math.max(maxDuration, materialKeyframes[materialKeyframes.length - 1].time)
    }

    return maxDuration
  }
}
