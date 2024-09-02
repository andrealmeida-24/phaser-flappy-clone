import { BEST_SCORE_SCENE_TEXT_OPTIONS } from "../config";
import BaseScene from "./BaseScene";

class ScoreScene extends BaseScene {
  backButton: Phaser.GameObjects.Image;

  constructor(config) {
    super("ScoreScene", config);
  }

  createBackButton() {
    this.backButton = this.add
      .image(this.config.width - 10, this.config.height - 10, "back")
      .setOrigin(1)
      .setScale(2)
      .setInteractive();
  }

  backButtonEventsHandler() {
    this.backButton.on("pointerup", () => {
      this.scene.start("MenuScene");
    });
  }

  create() {
    super.create();
    this.createBackButton();
    this.backButtonEventsHandler();

    const bestScore = localStorage.getItem("bestScore");
    this.add
      .text(
        this.screenCenter[0],
        this.screenCenter[1],
        `Best Score = ${bestScore || 0}`,
        BEST_SCORE_SCENE_TEXT_OPTIONS
      )
      .setOrigin(0.5);
  }
}

export default ScoreScene;
