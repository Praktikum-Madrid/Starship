import { ISprites } from 'types';
import Unit from './Unit';

export default class Background extends Unit {
  sx: number;

  sy: number;

  sWidth: number;

  sHeight: number;

  constructor() {
    super();
    this.velocity = 1;
    this.x = 0;
    this.y = 0;
    this.width = 1400;
    this.height = 1400;
    this.sx = 0;
    this.sy = 0;
    this.sWidth = 900;
    this.sHeight = 700;
  }

  start() {
    this.dy = this.velocity;
  }

  move() {
    if (this.dy) {
      this.sy += this.dy;
      if (this.sy === this.sHeight) {
        this.sy = 0;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    ctx.drawImage(
      sprites.background_space, // sprites.background_space - это фон космоса
      this.x,
      this.y,
      this.width,
      this.height,
      this.sx,
      this.sy - this.sHeight + 1,
      this.sWidth,
      this.sHeight,
    );
    ctx.drawImage(
      sprites.background_space, // sprites.background_space - это фон космоса
      this.x,
      this.y,
      this.width,
      this.height,
      this.sx,
      this.sy,
      this.sWidth,
      this.sHeight,
    );
  }
}
