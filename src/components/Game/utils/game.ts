// game.ts

interface ISprites {
  [key: string]: HTMLImageElement;
}

export default class StarshipGame {
  _ctx: CanvasRenderingContext2D;

  sprites: ISprites;

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this.sprites = {
      background: new Image(),
      spaceship: new Image(),
    };
  }

  private preload(callback: CallableFunction) {
    const required = Object.keys(this.sprites).length - 1;

    Object.keys(this.sprites).forEach((key, index) => {
      this.sprites[key].src = `../images/${key}.png`;
      this.sprites[key].addEventListener('load', () => {
        if (index >= required) {
          callback();
        }
      });
    });
  }

  private run() {
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  private render() {
    this._ctx.drawImage(this.sprites.background, 0, 0, 900, 700);
    this._ctx.drawImage(this.sprites.spaceship, 300, 400, 300, 300);
  }

  start() {
    this.preload(() => {
      this.run();
    });
  }
}
