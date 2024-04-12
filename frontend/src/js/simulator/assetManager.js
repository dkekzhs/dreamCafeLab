import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import models from './models.js'
const baseUrl = './src/assets/models/'

export class AssetManager {
  modelLoader = new GLTFLoader()

  models = {}

  constructor(onLoad) {
    this.modelCount = Object.keys(models).length
    this.loadedModelCount = 0

    for (const [name, meta] of Object.entries(models)) {
      this.#loadModel(name, meta)
    }

    this.onLoad = onLoad
  }

  /**
   * Returns a cloned copy of a mesh
   * @param {string} name The name of the mesh to retrieve
   * @param {Object} simObject The SimObject object that corresponds to this mesh
   * @param {boolean} transparent True if materials should be transparent. Default is false.
   * @returns {THREE.Mesh}
   */
  getModel(name, transparent = false) {
    const mesh = this.models[name]

    return mesh
  }

  /**
   * Load the 3D models
   * @param {string} url The URL of the model to load
   */
  #loadModel(name, { filename, scale = 1, rotation = 0 }) {
    this.modelLoader.load(
      `${baseUrl}${filename}`,
      (glb) => {
        let mesh = glb.scene
        mesh.name = filename

        if (glb.animations) {
          mesh.animations = glb.animations
        }
        mesh.rotation.set(0, THREE.MathUtils.degToRad(rotation), 0)
        mesh.scale.set(scale, scale, scale)

        this.models[name] = mesh

        // Once all models are loaded
        this.loadedModelCount++
        if (this.loadedModelCount == this.modelCount) {
          this.onLoad()
        }
      },
      (xhr) => {
        console.log(`${name} ${(xhr.loaded / xhr.total) * 100}% loaded`)
      },
      (error) => {
        console.log('file >> ' + filename)
        console.error(error)
      }
    )
  }
}
