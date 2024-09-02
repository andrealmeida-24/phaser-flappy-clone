import {
  FLAP_VELOCITY,
  GAME_MENU,
  MENU_TITLE_OPTIONS,
  THEME_TEXT_OPTIONS,
} from "../config";
import { Menu } from "../types";
import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {
  // config
  menu: Menu;
  // game assets
  bird: Phaser.Physics.Arcade.Sprite;

  constructor(config) {
    super("MenuScene", config);
    // config
    this.menu = GAME_MENU;
    // game assets
    this.bird = null;
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

  // this code should only be enabled for integration purposes
  // createThemeText() {
  //   this.add
  //     .text(
  //       this.screenCenter[0] + this.config.width * 0.4,
  //       this.screenCenter[1] + this.config.height * 0.48,
  //       `Theme: ${this.theme}`,
  //       THEME_TEXT_OPTIONS
  //     )
  //     .setOrigin(0.5, 1);
  // }

  createGameText() {
    this.add
      .text(
        this.screenCenter[0],
        this.screenCenter[1] - this.config.height * 0.2,
        "Flappy Bird",
        MENU_TITLE_OPTIONS
      )
      .setOrigin(0.5, 1);
  }

  createBird() {
    this.bird = this.physics.add
      .sprite(
        this.screenCenter[0] - this.config.width * 0.3,
        this.screenCenter[1] - this.config.height * 0.28,
        "bird"
      )
      .setScale(2)
      .setOrigin(0);

    this.bird.body.setSize(this.bird.width - 2, this.bird.height - 4);
  }

  create() {
    super.create();
    this.createBird();
    this.getThemeTextByQueryString();
    // this line of code should only be enabled for integration purposes
    // this.createThemeText();
    this.createGameText();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));

    this.anims.create({
      key: "birdFlap",
      frames: this.anims.generateFrameNumbers("bird", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.bird.play("birdFlap");
  }
}
export default MenuScene;
