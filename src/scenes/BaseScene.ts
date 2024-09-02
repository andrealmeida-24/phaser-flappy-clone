import "phaser";
import { MENU_LINE_HEIGHT, MENU_TEXT_OPTIONS } from "../config";

class BaseScene extends Phaser.Scene {
  //config
  config: any;
  // styling
  screenCenter: [number, number];
  theme: string;
  lineHeight: number;

  constructor(key: string, config: any) {
    super(key);
    //config
    this.config = config;
    // styling
    this.screenCenter = [config.width / 2, config.height / 2];
    this.theme = "default";
    this.lineHeight = MENU_LINE_HEIGHT;
  }

  getThemeTextByQueryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const activeTheme = urlParams.get("/theme");

    if (activeTheme) {
      this.theme = activeTheme;
    } else {
      this.theme = "default";
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach((menuItem) => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + lastMenuPositionY,
      ];
      menuItem.textGO = this.add
        .text(
          menuPosition[0],
          menuPosition[1],
          menuItem.text,
          MENU_TEXT_OPTIONS
        )
        .setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    });
  }

  createBackground() {
    let image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "sky"
    );
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
  }

  create() {
    this.createBackground();
  }
}

export default BaseScene;
