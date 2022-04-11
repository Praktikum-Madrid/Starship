import { TUserInfo, ISprites, TGameCallback, IMusic } from 'types';
import {
  AUDIOS,
  COLS_OPPONENTS,
  END_GAME,
  HEIGT_CANWAS,
  KEYS,
  ROWS_OPPONENTS,
  SPRITES,
  WIDTH_CANWAS,
} from 'config/consts';
import SoundEngine from 'game/soundEngine';
import Unit from 'game/units/Unit';
import throttleInput from 'utils/throttleInput';
import Background from 'game/units/UnitBackground';
import Missile from 'game/units/UnitMissile';
import Opponent, { TYPES_OPPONENTS } from 'game/units/UnitOpponent';
import Spaceship from 'game/units/UnitSpaceship';
import UnitBossBall from 'game/units/UnitBossBall';
import createImg from './utils/createImg';

export default class StarshipGame {
  background: Background;

  callback: TGameCallback;

  _ctx: CanvasRenderingContext2D;

  cols: number;

  heightCanvas: number;

  opponents: (Opponent | null)[];

  sprites: ISprites;

  spaceship: Spaceship;

  rows: number;

  running: boolean;

  score: number;

  settings: TUserInfo;

  widthCanvas: number;

  private sound: SoundEngine;

  private readonly music: IMusic;

  private bossMusic: IMusic;

  private boss: UnitBossBall | undefined;

  constructor(
    ctx: CanvasRenderingContext2D,
    settings: TUserInfo,
    cb: TGameCallback,
  ) {
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
    this.sound = new SoundEngine(AUDIOS);
    this.music = this.sound.addMusic('music', 0.5);
    this.bossMusic = this.sound.addMusic('boss', 0.5);
    this.score = 0;
    this.settings = settings;
    this.callback = cb;
  }

  private init() {
    this.background.start();
    this.setTextFont();
    this.setEvents();
    this.addShadowUnit(this.spaceship);
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
        this.callback.toggleFullscreen();
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
    const required = Object.keys(this.sprites).length - 1;

    const onResourceLoad = () => {
      loaded += 1;
      if (loaded >= required) {
        callback();
      }
    };

    this.preloadSprites(onResourceLoad);
  }

  private preloadSprites(onResourceLoad: { (): void }) {
    SPRITES.forEach((key) => {
      this.sprites[key].src = `../images/${key}.png`;
      this.sprites[key].addEventListener('load', onResourceLoad);
    });
  }

  private createOpponent(col: number, row: number) {
    const type = Math.random() < 0.3 ? TYPES_OPPONENTS.METEOR : TYPES_OPPONENTS.SPACESHIP;
    return new Opponent(100 * col + 50, 200 * -row, Math.random() - 0.3, type);
  }

  private addShadowUnit(unit: Unit) {
    unit.setShadow(this.background.showShadows); // добавляем тень юниту если фон поддерживает отображение теней
  }

  private create() {
    for (let row = 0; row < this.rows; row += 1) {
      for (let col = 0; col < this.cols; col += 1) {
        this.opponents.push(
          Math.random() < 0.125
            ? this.createOpponent(col, row)
            : null,
        );
      }
    }

    this.opponents.forEach((opponent) => {
      if (opponent && opponent.active) {
        opponent.start();
        this.addShadowUnit(opponent);
      }
    });

    this.music.play(); // Включаем музыку

    // FIXME: dev only
    // this.startBossFight();
  }

  private collideMissileToOpponents(missiles: Missile[]) {
    let bossDamageTaken = false;

    missiles.forEach((missile) => {
      // Столкновения ракет с врагами
      this.opponents.forEach((opponent) => {
        if (opponent && opponent.active && missile.collide(opponent)) {
          missile.destroy();
          opponent.destroy();

          this.sound.play('explosion');
          this.addScore();
        }
      });

      // Столкновения ракет с боссом
      if (this.boss && this.boss.active && missile.collide(this.boss) && !bossDamageTaken) {
        bossDamageTaken = true;
        missile.destroy();
        this.boss.takeDamage();
        this.sound.play('explosion');

        if (this.boss.hp <= 0) {
          this.end(END_GAME.WIN, this.score);
        }
      }
    });
  }

  private collideStarshipToOpponents() {
    this.opponents.forEach((opponent) => {
      if (
        opponent
        && opponent.active
        && this.spaceship.collideOpponent(opponent)
      ) {
        this.sound.play('bump');
      }
    });
  }

  private update() {
    // Передвинуть фон
    this.background.move();

    // Передвинуть всех врагов
    // if (this.opponents.length) {
    this.opponents.forEach((opponent) => {
      if (opponent && opponent.active) {
        opponent.move();
      }
    });
    // }

    // Проверить есть ли босс, и выполнить движение боссом
    this.boss?.move();

    // Проверить столкновения с краями экрана
    this.spaceship.collideBounds();
    // Проверить столкновения ракет с врагами
    this.collideMissileToOpponents(this.spaceship.move());
    // Проверить столкновения корабля с врагами
    this.collideStarshipToOpponents();

    // Проверить, жив ли игрок
    if (!this.spaceship.active) {
      this.end(END_GAME.LOSE, this.score);
    }
  }

  private addScore() {
    this.score += 1;
    const opp = this.opponents.length - this.opponents.filter((item) => item === null).length;
    if (this.score === Math.round(opp / 1.2)) {
      this.startBossFight();
    }
  }

  // Создаем юнит босса
  private createBoss() {
    console.log('Создали босса');
    // Передали размеры игрового экрана боссу для хитрого плана
    return new UnitBossBall(this.widthCanvas, this.heightCanvas);
  }

  // Запускаем бой с боссом
  private startBossFight = () => {
    // Остановили музыку
    if (this.music) {
      console.log('Music stopped');
      // @ts-ignore
      this.music.stop();
    }
    // Создали босса
    this.boss = this.createBoss();

    this.boss?.start();

    // Включили музыку босса
    this.bossMusic?.play();
  };

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
    this.boss?.render(this._ctx, this.sprites);
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

  end(message: string = END_GAME.LOSE, score: number = 0) {
    setTimeout(() => {
      this.music.pause(); // Останавливаем музыку
      this.bossMusic.pause(); // Останавливаем музыку
      this.running = false;
      if (message === END_GAME.WIN) {
        this.callback.gameEndWithWin(score);
      } else {
        this.callback.gameEndWithLose();
      }
    }, 2000);
  }
}
