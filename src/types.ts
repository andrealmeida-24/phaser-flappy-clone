export type GameDifficulty = "easy" | "normal" | "hard";

type GameDifficultyConfig = {
  pipeVerticalDistanceRange: number[];
  pipeHorizontalDistanceRange: number[];
};

export type Difficulties = {
  [key in GameDifficulty]: GameDifficultyConfig;
};

type MenuItem = {
  scene: string;
  text: string;
};

export type Menu = MenuItem[];

type ControlItem = {
  [key: string]: string;
};

export type Controls = ControlItem[];
