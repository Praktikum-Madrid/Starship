import Unit from './Unit';
import { ISprites } from './types';

export default class Missile extends Unit {
  constructor() {
    super();
    this.velocity = 2;
    this.x = 400;
    this.y = 500;
    this.width = 30;
    this.height = 100;
  }

  start() {
    this.dy = -this.velocity;
  }

  move() {
    if (this.dx) {
      this.x += this.dx;
    }
    if (this.dy) {
      this.y += this.dy;
    }
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    ctx.drawImage(
      sprites.missile_1,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
