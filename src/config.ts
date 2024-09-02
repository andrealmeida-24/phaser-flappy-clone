import { Controls, Difficulties, GameDifficulty, Menu } from "./types";

// game config
export const FLAP_VELOCITY: number = 250;
export const BIRD_GRAVITY: number = 400;
export const PIPES_TO_RENDER: number = 4;
export const PIPES_X_VELOCITY: number = -200;
export const INITIAL_DIFFICULTY: GameDifficulty = "easy";
export const GAME_DIFFICULTIES: Difficulties = {
  easy: {
    pipeVerticalDistanceRange: [150, 250],
    pipeHorizontalDistanceRange: [300, 350],
  },
  normal: {
    pipeVerticalDistanceRange: [140, 190],
    pipeHorizontalDistanceRange: [280, 330],
  },
  hard: {
    pipeVerticalDistanceRange: [120, 170],
    pipeHorizontalDistanceRange: [250, 310],
  },
};

// pause-game config
export const DELAY_UNTIL_GAME_RESTART_AFTER_GAME_OVER_IN_MS: number = 1000;
export const COUNTDOWN_INITIAL_TIME: number = 3;
export const PAUSE_GAME_MENU: Menu = [
  { scene: "PlayScene", text: "Continue" },
  { scene: "MenuScene", text: "Exit" },
];

// menu config
export const GAME_MENU: Menu = [
  { scene: "PlayScene", text: "New Game" },
  { scene: "ScoreScene", text: "Best Score" },
  { scene: "ControlsScene", text: "Controls" },
];

// controls config
export const CONTROLS_LIST: Controls = [
  { control: "Flap", text: "Tab or Mouse Left Click" },
  { control: "Pause", text: "Keyboard P" },
];

//styles
export const DEFAULT_PIPES_COLORS: number[] = [
  0xe97451, 0xd27d2d, 0xff7f50, 0xb87333, 0xff5f1f, 0xf89880, 0xfa8072,
];
export const MENU_LINE_HEIGHT: number = 42;
export const MENU_TEXT_OPTIONS = {
  fontSize: "24px",
  color: "#000",
  fontFamily: "ROCABE trial",
};
export const SCORE_TEXT_OPTIONS = {
  fontSize: "32px",
  color: "#000",
  fontStyle: "bold",
};
export const BEST_SCORE_TEXT_OPTIONS = {
  fontSize: "16px",
  color: "#000",
  fontStyle: "bold",
};
export const COUNTDOWN_TEXT_OPTIONS = {
  fontSize: "32px",
  fill: "black",
  fontStyle: "bold",
};
export const BEST_SCORE_SCENE_TEXT_OPTIONS = {
  fontSize: "32px",
  fill: "black",
  fontStyle: "bold",
};
export const MENU_TITLE_OPTIONS = {
  fontSize: "46px",
  color: "black",
  fontFamily: "ROCABE trial",
};
export const THEME_TEXT_OPTIONS = {
  fontSize: "16px",
  color: "black",
};
export const CONTROLS_LIST_TEXT_OPTIONS = {
  fontSize: "24px",
  color: "#000",
  fontFamily: "ROCABE trial",
};
