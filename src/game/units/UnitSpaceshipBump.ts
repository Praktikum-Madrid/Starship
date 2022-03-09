import { ISprites } from 'types';
import Unit from './Unit';

export default class SpaceshipBump extends Unit {
  active: boolean;

  frame: number;

  timerId: number | undefined;

  constructor(spaceshipVelocity: number, spaceshipX: number, spaceshipY: number) {
    super();
    this.active = false;
    this.frame = 0;
    this.velocity = spaceshipVelocity;
    this.x = spaceshipX - 50;
    this.y = spaceshipY - 100;
    this.width = 250;
    this.height = 250;
  }

  start() {
    this.dy = -this.velocity;
  }

  followSpaceship(spaceshipX: number, spaceshipY: number) {
    this.x = spaceshipX - 50;
    this.y = spaceshipY - 100;
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    if (this.active) {
      ctx.drawImage(
        sprites[`exa_${this.frame > 9 ? '0' : '00'}${this.frame > 17 ? 18 : this.frame}`],
        this.x,
        this.y,
        this.width,
        this.height,
      );

      if (this.frame >= 17 && this.timerId) {
        clearInterval(this.timerId);
        this.active = false;
      }
    }
  }

  animate() {
    if (this.active) {
      this.timerId = window.setInterval(() => {
        this.frame += 1;
      }, 10);
    }
  }
}
