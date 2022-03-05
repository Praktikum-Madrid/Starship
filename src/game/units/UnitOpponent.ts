import { ISprites } from 'types';
import Unit from './Unit';

export default class Opponent extends Unit {
  active: boolean;

  constructor(x: number, y: number, v: number) {
    super();
    this.velocity = 0.5 + v;
    this.active = true;
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 100;
  }

  start() {
    this.dy = this.velocity;
  }

  move() {
    if (this.dx) {
      this.x += this.dx;
    }
    if (this.dy) {
      this.y += this.dy;
    }
  }

  destroy() {
    this.active = false;
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    if (this.active) {
      ctx.drawImage(
        sprites.opponent,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  }
}
