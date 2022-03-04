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
  ENTER = 13,
}

export const enum LEADERBOARD {
  RATING_FIELD_NAME = 'rating',
  TEAM_NAME = 'starship',
}

export const enum END {
  LOSE = 'LOSE',
  WIN = 'WIN',
}
