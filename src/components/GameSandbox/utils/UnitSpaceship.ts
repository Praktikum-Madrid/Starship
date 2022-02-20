import Unit from './Unit';
import { KEYS, ISprites } from './types';
import Missile from './UnitMissile';

const NUM_MISSILES = 100;

export default class Spaceship extends Unit {
  missiles: Missile[];

  unitOfFire: boolean[];

  numShots: number;

  constructor() {
    super();
    this.velocity = 3;
    this.x = 380;
    this.y = 500;
    this.width = 150;
    this.height = 150;
    this.missiles = Array(NUM_MISSILES).fill(null);
    this.unitOfFire = Array(NUM_MISSILES).fill(true);
    this.numShots = 0;
    this.init();
  }

  init() {
    this.missiles = this.missiles.map(() => new Missile());
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

  fire() {
    if (this.missiles && this.numShots < NUM_MISSILES) {
      this.missiles[this.numShots].start();
      this.unitOfFire[this.numShots] = false;
      this.numShots += 1;
    }
  }

  move() {
    if (this.missiles) {
      this.missiles.forEach((missile) => {
        missile.move();
      });
    }
    if (this.dx) {
      this.x += this.dx;
      this.missiles.forEach((missile, index) => {
        if (this.unitOfFire[index]) {
          missile.x += this.dx;
        }
      });
    }
    if (this.dy) {
      this.y += this.dy;
      this.missiles.forEach((missile, index) => {
        if (this.unitOfFire[index]) {
          missile.y += this.dy;
        }
      });
    }
    return this.missiles;
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    if (this.missiles) {
      this.missiles.forEach((missile) => {
        missile.render(ctx, sprites);
      });
    }
    ctx.drawImage(
      sprites.spaceship,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
