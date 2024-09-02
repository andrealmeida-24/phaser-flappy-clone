import * as Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.pack("assetPack", "assets/themes/default.json");
  }

  create() {
    this.scene.start("MenuScene");
  }
}

export default PreloadScene;
