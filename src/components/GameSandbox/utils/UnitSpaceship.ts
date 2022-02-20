import Unit from './Unit';
import { KEYS, ISprites } from './types';

export default class Spaceship extends Unit {
  constructor() {
    super();
    this.velocity = 3;
    this.x = 400;
    this.y = 500;
    this.width = 150;
    this.height = 150;
  }

  start(direction: KEYS) {
    if (direction === KEYS.LEFT) {
      this.dx = -this.velocity;
    } else if (direction === KEYS.RIGHT) {
      this.dx = this.velocity;
    } else if (direction === KEYS.UP) {
      this.dy = -this.velocity;
    } else if (direction === KEYS.DOWN) {
      this.dy = this.velocity;
    }
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
      sprites.spaceship,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
