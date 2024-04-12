import * as THREE from "three";

const SELECTED_COLOR = 0xaaaa55;
const HIGHLIGHTED_COLOR = 0x555555;

/**
 * 시뮬레이션 객체를 나타냅니다.
 */
export class SimObject extends THREE.Object3D {
  /**
   * @type {THREE.Mesh?}
   */
  #mesh = null;
  /**
   * 객체의 세계 좌표
   * @type {THREE.Vector3}
   */
  #worldPos = new THREE.Vector3();

  /**
   * @param {number} x - 객체의 x 좌표
   * @param {number} y - 객체의 y 좌표
   */
  constructor(x = 0, y = 0) {
    super();
    this.name = "SimObject";
    this.position.x = x;
    this.position.z = y;
  }

  get x() {
    this.getWorldPosition(this.#worldPos);
    return Math.floor(this.#worldPos.x);
  }

  get y() {
    this.getWorldPosition(this.#worldPos);
    return Math.floor(this.#worldPos.z);
  }

  /**
   * @type {THREE.Mesh?}
   */
  get mesh() {
    return this.#mesh;
  }

  /**
   * @type {THREE.Mesh} value
   */
  setMesh(value) {
    // 기존 메시에 대한 리소스 제거
    if (this.#mesh) {
      this.dispose();
      this.remove(this.#mesh);
    }

    this.#mesh = value;

    // 씬 그래프에 추가
    if (this.#mesh) {
      this.add(this.#mesh);
    }
  }

  setSelected(value) {
    if (value) {
      this.#setMeshEmission(SELECTED_COLOR);
    } else {
      this.#setMeshEmission(0);
    }
  }

  setFocused(value) {
    if (value) {
      this.#setMeshEmission(HIGHLIGHTED_COLOR);
    } else {
      this.#setMeshEmission(0);
    }
  }

  /**
   * 메시의 발광 색상을 설정합니다.
   * @param {number} color
   */
  #setMeshEmission(color) {
    if (!this.mesh) return;
    this.mesh.traverse((obj) => obj.material?.emissive?.setHex(color));
  }

  /**
   * 객체가 제거되기 전에 필요한 모든 정리를 처리합니다.
   */
  dispose() {
    this.#mesh.traverse((obj) => {
      if (obj.material) {
        obj.material?.dispose();
      }
    });
  }
}
