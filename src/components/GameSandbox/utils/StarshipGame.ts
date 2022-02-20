// StarshipGame.ts

import Background from './Background';
import Opponent from './Opponent';
import Spaceship from './Spaceship';
import { ISprites, KEYS } from './types';

export default class StarshipGame {
  _ctx: CanvasRenderingContext2D;

  sprites: ISprites;

  running: boolean;

  width: number;

  height: number;

  spaceship: Spaceship;

  background: Background;

  rows: number;

  cols: number;

  opponents: Opponent[];

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this.running = true;
    this.width = 900;
    this.height = 700;
    this.background = new Background();
    this.spaceship = new Spaceship();
    this.opponents = [];
    this.rows = 2;
    this.cols = 8;
    this.sprites = {
      background: new Image(),
      spaceship: new Image(),
      opponent: new Image(),
    };
  }

  private init() {
    this.background.start();
    this.setEvents();
  }

  private setEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === KEYS.SPACE) {
        // this.spaceship.fire();
      }
      if (e.keyCode === KEYS.LEFT || e.keyCode === KEYS.RIGHT) {
        this.spaceship.start(e.keyCode);
      }
    });
    window.addEventListener('keyup', (e) => {
      this.spaceship.stop();
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
    Object.keys(this.sprites).forEach((key, index) => {
      this.sprites[key].src = `../images/${key}.png`;
      this.sprites[key].addEventListener('load', onResourceLoad);
    });
  }

  // генерация противников
  private create() {
    for (let row = 0; row < this.rows; row += 1) {
      for (let col = 0; col < this.cols; col += 1) {
        this.opponents.push(new Opponent(100 * col + 50, 100 * row + 0));
      }
    }
  }

  private update() {
    this.background.move();
    this.spaceship.move();
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
    this._ctx.clearRect(0, 0, this.width, this.height);
    this._ctx.drawImage(
      this.sprites.background,
      this.background.x,
      this.background.y - this.background.height,
      this.background.width,
      this.background.height,
    );
    this._ctx.drawImage(
      this.sprites.background,
      this.background.x,
      this.background.y,
      this.background.width,
      this.background.height,
    );
    this._ctx.drawImage(
      this.sprites.spaceship,
      this.spaceship.x,
      this.spaceship.y,
      this.spaceship.width,
      this.spaceship.height,
    );

    this.renderOpponents();
  }

  renderOpponents() {
    this.opponents.forEach((opponent) => {
      this._ctx.drawImage(
        this.sprites.opponent,
        opponent.x,
        opponent.y,
        opponent.width,
        opponent.height,
      );
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
