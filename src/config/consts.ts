export const WIDTH_CANWAS = 900;
export const HEIGT_CANWAS = 700;

export const ROWS_OPPONENTS = 10;
export const COLS_OPPONENTS = 8;

export const NUM_MISSILES = 30;
export const LIFE = 5;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const EMOTIONS = {
  SMILE: '&#128512',
  SAD: '&#128577',
  LIKE: '&#128077',
  HEART: '&#129505',
};

export const enum PATH {
  HOME = '/',
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  PROFILE = '/profile',
  GAME = '/game',
  LEADERBOARD = '/leaderboard',
  FORUM = '/forum',
  FORUM_TOPIC_ID = '/forum/:topicId',
  SERVER_ERROR = 'server-error',
}

export const enum KEYS {
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40,
  SPACE = 32,
  ENTER = 13,
}

export const enum LEADERBOARD_REQUEST {
  RATING_FIELD_NAME = 'rating',
  TEAM_NAME = 'starship',
}

export const enum END_GAME {
  LOSE = 'LOSE',
  WIN = 'WIN',
}

export const AUDIOS: string[] = [
  'bump',
  'music',
  'explosion',
];

// FIXME: Использовать сгенерированный список спрайтов вместо этого ручного списка
export const SPRITES: string[] = [
  'background',
  'background_space',
  'spaceship',
  'spaceship_opponent',
  'meteor_opponent',
  'missile_1',
  'missile_2',
  'missile_3',
  'missile_4',
  'exa_000',
  'exa_001',
  'exa_002',
  'exa_003',
  'exa_004',
  'exa_005',
  'exa_006',
  'exa_007',
  'exa_008',
  'exa_009',
  'exa_010',
  'exa_011',
  'exa_012',
  'exa_013',
  'exa_014',
  'exa_015',
  'exa_016',
  'exa_017',
  'exa_018',
  'exc_000',
  'exc_001',
  'exc_002',
  'exc_003',
  'exc_004',
  'exc_005',
  'exc_006',
  'exc_007',
  'exc_008',
  'exc_009',
  'exc_010',
  'exc_011',
  'exc_012',
  'exc_013',
  'exc_014',
  'exc_015',
  'exc_016',
  'exc_017',
  'exc_018',
  'exc_019',
  'exc_020',
  'exc_021',
  'exc_022',
  'exc_023',
  'exc_024',
  'exc_025',
  'exc_026',
  'exc_027',
  'exc_028',
  'exc_029',
  'exc_030',
  'exc_031',
  'exc_032',
  'exc_033',
  'exc_034',
  'exc_035',
  'exc_036',
  'exc_037',
  'exc_038',
  'exc_039',
  'exc_040',
];
