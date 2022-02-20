// StarshipGame.ts

import { ISprites, KEYS } from './types';
import Background from './UnitBackground';
import Missile from './UnitMissile';
import Opponent from './UnitOpponent';
import Spaceship from './UnitSpaceship';

export default class StarshipGame {
  _ctx: CanvasRenderingContext2D;

  sprites: ISprites;

  running: boolean;

  widthCanvas: number;

  heightCanvas: number;

  spaceship: Spaceship;

  background: Background;

  rows: number;

  cols: number;

  opponents: (Opponent | null)[];

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this.running = true;
    this.widthCanvas = 900;
    this.heightCanvas = 700;
    this.background = new Background();
    this.spaceship = new Spaceship();
    this.opponents = []; // массив генерируемых противников
    this.rows = 10;
    this.cols = 8;
    this.sprites = {
      background: new Image(),
      background_space: new Image(),
      spaceship: new Image(),
      opponent: new Image(),
      missile_1: new Image(),
      missile_2: new Image(),
      missile_3: new Image(),
      missile_4: new Image(),
    };
  }

  private init() {
    this.background.start();
    this.setEvents();
  }

  private setEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === KEYS.SPACE) {
        this.spaceship.fire();
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
    // TODO: добавить загрузку аудио
  }

  private preloadSprites(onResourceLoad: { (): void }) {
    Object.keys(this.sprites).forEach((key) => {
      this.sprites[key].src = `../images/${key}.png`;
      this.sprites[key].addEventListener('load', onResourceLoad);
    });
  }

  // генерация противников на игровом поле
  private create() {
    for (let row = 0; row < this.rows; row += 1) {
      for (let col = 0; col < this.cols; col += 1) {
        this.opponents.push(Math.random() < 0.125 ? new Opponent(100 * col + 50, 200 * -row + 0, Math.random() - 0.3) : null);
      }
    }
    this.opponents.forEach((opponent) => {
      if (opponent && opponent.active) {
        opponent.start();
        console.log('start opponent');
      }
    });
  }

  private collideOpponents(missiles: Missile[]) {
    missiles.forEach((missile) => {
      this.opponents.forEach((opponent) => {
        if (opponent && opponent.active && missile.collide(opponent)) {
          missile.destroy();
          opponent.destroy();
        }
      });
    });
  }

  private update() {
    this.background.move();
    this.opponents.forEach((opponent) => {
      if (opponent && opponent.active) {
        opponent.move();
      }
    });
    this.collideOpponents(this.spaceship.move());
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

  end() {
    this.running = false;
  }
}
