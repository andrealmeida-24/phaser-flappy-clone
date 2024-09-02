import * as Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import ScoreScene from "./scenes/ScoreScene";
import PauseScene from "./scenes/PauseScene";
import ControlsScene from "./scenes/Controls";

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION,
};

interface AppScene extends Phaser.Scene {
  new (c: typeof SHARED_CONFIG);
}

const Scenes = [
  PreloadScene,
  ScoreScene,
  MenuScene,
  PlayScene,
  PauseScene,
  ControlsScene,
];
const createScene = (Scene: AppScene) => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  render: {
    pixelArt: true,
  },
  // the following scale config can be commented out for dev purposes
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  },

  physics: {
    default: "arcade",
  },
  scene: initScenes(),
};

new Phaser.Game(config);
