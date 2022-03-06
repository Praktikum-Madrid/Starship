/* eslint-disable no-undef */
import { ISprites } from 'types';
import Unit from './Unit';

export default class Explosion extends Unit {
  active: boolean;

  frame: number;

  timerId: number | undefined;

  constructor(itemVelocity: number, itemX: number, itemY: number) {
    super();
    this.active = false;
    this.frame = 0;
    this.velocity = itemVelocity;
    this.x = itemX - 108;
    this.y = itemY - 150;
    this.width = 250;
    this.height = 250;
  }

  start() {
    this.dy = -this.velocity;
  }

  followItem(itemX: number, itemY: number) {
    this.x = itemX - 108;
    this.y = itemY - 150;
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
