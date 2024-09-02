import { PAUSE_GAME_MENU } from "../config";
import { Menu } from "../types";
import BaseScene from "./BaseScene";

class PauseScene extends BaseScene {
  menu: Menu;

  constructor(config: any) {
    super("PauseScene", config);

    this.menu = PAUSE_GAME_MENU;
  }

  create() {
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
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
      if (menuItem.scene && menuItem.text === "Continue") {
        this.scene.stop();
        this.scene.resume(menuItem.scene);
      } else {
        this.scene.stop("PlayScene");
        this.scene.start(menuItem.scene);
      }
    });
  }
}

export default PauseScene;
