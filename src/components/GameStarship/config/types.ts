export interface ISprites {
  [key: string]: HTMLImageElement;
}

export interface IAudio {
  [key: string]: HTMLAudioElement | null;
}

export const enum KEYS {
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40,
  SPACE = 32,
}
