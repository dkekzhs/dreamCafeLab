export default class SceneImporter {
    constructor() {
        window.simulate.game.sceneimporter = this;
        
        SceneImporter.I = this;
    }
}