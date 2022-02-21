import Unit from './Unit';
import Opponent from './UnitOpponent';
import { ISprites } from './types';

export default class Missile extends Unit {
  active: boolean;

  constructor() {
    super();
    this.active = true;
    this.velocity = 4;
    this.x = 440;
    this.y = 520;
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

  collide(opponent: Opponent) {
    const x = this.x + this.dx;
    const y = this.y + this.dy;

    if (
      x + this.width > opponent.x
      && x < opponent.x + opponent.width
      && y + this.height > opponent.y
      && y < opponent.y + opponent.height
    ) {
      return true;
    }
    return false;
  }

  destroy() {
    this.active = false;
    this.y += this.dy;
    this.dy = 0;
    setTimeout(() => {
      this.x = -1000;
      this.y = -1000;
    }, 10);
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    if (this.active) {
      ctx.drawImage(
        sprites.missile_1,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  }
}
