import {
  BEST_SCORE_SCENE_TEXT_OPTIONS,
  CONTROLS_LIST,
  CONTROLS_LIST_TEXT_OPTIONS,
} from "../config";
import { Controls } from "../types";
import BaseScene from "./BaseScene";

class ControlsScene extends BaseScene {
  backButton: Phaser.GameObjects.Image;
  controls: Controls;

  constructor(config) {
    super("ControlsScene", config);

    this.controls = CONTROLS_LIST;
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

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({ fill: "#F88379" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "black" });
    });

    textGO.on("pointerup", () => {
      menuItem.scene && this.scene.start(menuItem.scene);
    });
  }

  createControlsText(controlsList) {
    let lastMenuPositionY = 0;

    controlsList.forEach((menuItem) => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + lastMenuPositionY,
      ];
      menuItem.textGO = this.add
        .text(
          menuPosition[0],
          menuPosition[1],
          `${menuItem.control} = ${menuItem.text}`,
          CONTROLS_LIST_TEXT_OPTIONS
        )
        .setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
    });
  }

  create() {
    super.create();
    this.createControlsText(this.controls);
    this.createBackButton();
    this.backButtonEventsHandler();
  }
}

export default ControlsScene;
