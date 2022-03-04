// StarshipGame.ts

import { TUserInfo } from 'types';
import LeaderboardAPI from 'api/Leaderboard';
import createImg from '../utils/createImg';
import throttleInput from '../../../utils/throttleInput';
import Background from './UnitBackground';
import Missile from './UnitMissile';
import Opponent from './UnitOpponent';
import Spaceship from './UnitSpaceship';
import { toggleFullScreen } from '../utils/fullscreen';
import { IAudio, ISprites, KEYS } from '../config/types';
import {
  AUDIOS,
  COLS_OPPONENTS,
  HEIGT_CANWAS,
  ROWS_OPPONENTS,
  SPRITES,
  WIDTH_CANWAS,
} from '../config/const';

export default class StarshipGame {
  _ctx: CanvasRenderingContext2D;

  sprites: ISprites;

  sounds: IAudio;

  running: boolean;

  widthCanvas: number;

  heightCanvas: number;

  spaceship: Spaceship;

  background: Background;

  rows: number;

  cols: number;

  opponents: (Opponent | null)[];

  score: number;

  settings: TUserInfo;

  constructor(ctx: CanvasRenderingContext2D, settings: TUserInfo) {
    this._ctx = ctx;
    this.running = true;
    this.widthCanvas = WIDTH_CANWAS;
    this.heightCanvas = HEIGT_CANWAS;
    this.background = new Background();
    this.spaceship = new Spaceship();
    this.opponents = [];
    this.rows = ROWS_OPPONENTS;
    this.cols = COLS_OPPONENTS;
    this.sprites = createImg();
    this.sounds = {
      bump: null,
    };
    this.score = 0;
    this.settings = settings;
  }

  private init() {
    this.background.start();
    this.setTextFont();
    this.setEvents();
  }

  private setTextFont() {
    this._ctx.font = '20px Arial';
    this._ctx.fillStyle = '#FFFFFF';
  }

  private setEvents() {
    // Ограничиваем частоту срабатывания ввода
    const limitInput = throttleInput(200);

    window.addEventListener('keydown', (e) => {
      if (e.keyCode === KEYS.ENTER) {
        toggleFullScreen();
      }
      if (e.keyCode === KEYS.SPACE) {
        // Ограничиваем частоту стрельбы
        limitInput(this.spaceship.fire);
      }
      if (
        e.keyCode === KEYS.LEFT
        || e.keyCode === KEYS.RIGHT
        || e.keyCode === KEYS.UP
        || e.keyCode === KEYS.DOWN
      ) {
        this.spaceship.start(e.keyCode);
      }
    });
    window.addEventListener('keyup', (e) => {
      if (
        e.keyCode === KEYS.LEFT
        || e.keyCode === KEYS.RIGHT
        || e.keyCode === KEYS.UP
        || e.keyCode === KEYS.DOWN
      ) {
        this.spaceship.stop();
      }
    });
  }

  private preload(callback: CallableFunction) {
    let loaded = 0;
    let required = Object.keys(this.sprites).length - 1;
    required += Object.keys(this.sounds).length;

    const onResourceLoad = () => {
      loaded += 1;
      if (loaded >= required) {
        callback();
      }
    };

    this.preloadSprites(onResourceLoad);
    this.preloadAudios(onResourceLoad);
  }

  private preloadSprites(onResourceLoad: { (): void }) {
    SPRITES.forEach((key) => {
      this.sprites[key].src = `../images/${key}.png`;
      this.sprites[key].addEventListener('load', onResourceLoad);
    });
  }

  private preloadAudios(onResourceLoad: { (): void }) {
    AUDIOS.forEach((key) => {
      this.sounds[key] = new Audio(`../sounds/${key}.mp3`);
      this.sounds[key]!.addEventListener('canplaythrough', onResourceLoad, {
        once: true,
      });
    });
  }

  private create() {
    for (let row = 0; row < this.rows; row += 1) {
      for (let col = 0; col < this.cols; col += 1) {
        this.opponents.push(
          Math.random() < 0.125
            ? new Opponent(100 * col + 50, 200 * -row, Math.random() - 0.3)
            : null,
        );
      }
    }
    this.opponents.forEach((opponent) => {
      if (opponent && opponent.active) {
        opponent.start();
      }
    });
  }

  private collideMissileToOpponents(missiles: Missile[]) {
    missiles.forEach((missile) => {
      this.opponents.forEach((opponent) => {
        if (opponent && opponent.active && missile.collide(opponent)) {
          missile.destroy();
          opponent.destroy();
          this.sounds.bump?.play();
          this.addScore();
        }
      });
    });
  }

  private collideStarshipToOpponents() {
    this.opponents.forEach((opponent) => {
      if (
        opponent
        && opponent.active
        && this.spaceship.collideOpponent(opponent)
      ) {
        this.sounds.bump?.play();
      }
    });
  }

  private update() {
    this.background.move();
    this.opponents.forEach((opponent) => {
      if (opponent && opponent.active) {
        opponent.move();
      }
    });

    this.spaceship.collideBounds();
    this.collideMissileToOpponents(this.spaceship.move());
    this.collideStarshipToOpponents();

    if (!this.spaceship.active) {
      this.end('LOSE', this.score);
    }
  }

  private addScore() {
    this.score += 1;
    const opp = this.opponents.length
    - this.opponents.filter((item) => item === null).length;
    if (this.score === Math.round(opp / 1.3)) {
      this.end('WIN', this.score);
    }
  }

  private run() {
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.update();
        this.render();
        this.run();
      });
    }
  }

  private render() {
    this._ctx.clearRect(0, 0, this.widthCanvas, this.heightCanvas);
    this.background.render(this._ctx, this.sprites);
    this.spaceship.render(this._ctx, this.sprites);

    this.renderOpponents();
    this._ctx.fillText(`Счет: ${this.score}`, 20, 30);
    this._ctx.fillText(
      `Противники: ${
        this.opponents.length
        - this.opponents.filter((item) => item === null).length
        - this.score
      }`,
      20,
      90,
    );
  }

  renderOpponents() {
    this.opponents.forEach((opponent) => {
      if (opponent && opponent.active) {
        opponent.render(this._ctx, this.sprites);
      }
    });
  }

  start() {
    this.init();
    this.preload(() => {
      this.create();
      this.run();
    });
  }

  end(message: string, score: number) {
    setTimeout(() => {
      this.running = false;
      if (message === 'WIN') {
        const leaderboardRequest = {
          data: {
            avatar: this.settings.avatar,
            rating: score * 150,
            first_name: this.settings.first_name,
            second_name: this.settings.second_name,
          },
          ratingFieldName: 'rating',
          teamName: 'starship',
        };

        LeaderboardAPI.addUserToLeaderboard(leaderboardRequest)
          .then((response) => {
            if (response.ok && response.status === 200) {
              console.log('ok');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      console.log(`${message} ${this.settings.first_name} Ваш результат ${this.score}.`);
    }, 2000);
  }
}
