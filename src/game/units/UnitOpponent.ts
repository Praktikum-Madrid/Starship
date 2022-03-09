import { ISprites } from 'types';
import Unit from './Unit';

export const TYPES_OPPONENTS = {
  METEOR: 'METEOR',
  SPACESHIP: 'SPACESHIP',
};

const OPPONENTS = {
  [TYPES_OPPONENTS.METEOR]: {
    nameSprite: 'meteor_opponent',
    damage: 2,
  },
  [TYPES_OPPONENTS.SPACESHIP]: {
    nameSprite: 'spaceship_opponent',
    damage: 1,
  },
};

export default class Opponent extends Unit {
  active: boolean;

  type: string;

  damage: number;

  constructor(x: number, y: number, v: number, type = TYPES_OPPONENTS.SPACESHIP) {
    super();
    this.velocity = 0.5 + v;
    this.active = true;
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 100;
    this.type = type;
    this.damage = OPPONENTS[type].damage;
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
        sprites[OPPONENTS[this.type].nameSprite],
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }
  }
}
