/* eslint-disable no-undef */
import Unit from './Unit';
import { ISprites } from '../config/types';

export default class Explosion extends Unit {
  active: boolean;

  frame: number;

  timerId: number | undefined;

  constructor(missileVelocity: number, missileX: number, missileY: number) {
    super();
    this.active = false;
    this.frame = 0;
    this.velocity = missileVelocity;
    this.x = missileX - 108;
    this.y = missileY - 150;
    this.width = 250;
    this.height = 250;
  }

  start() {
    this.dy = -this.velocity;
  }

  followMissile(missileX: number, missileY: number) {
    this.x = missileX - 108;
    this.y = missileY - 150;
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    if (this.active) {
      ctx.drawImage(
        sprites[`exc_${this.frame > 9 ? '0' : '00'}${this.frame > 39 ? 40 : this.frame}`],
        this.x,
        this.y,
        this.width,
        this.height,
      );

      if (this.frame >= 39 && this.timerId) {
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
