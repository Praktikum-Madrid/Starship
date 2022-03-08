import { ISprites } from 'types';
import {
  WIDTH_CANWAS,
  HEIGT_CANWAS,
  NUM_MISSILES,
  LIFE,
  KEYS,
} from 'config/consts';
import Unit from './Unit';
import Missile from './UnitMissile';
import Opponent from './UnitOpponent';
import SpaceshipBump from './UnitSpaceshipBump';

export default class Spaceship extends Unit {
  missiles: Missile[];

  unitOfFire: boolean[];

  numShots: number;

  active: boolean;

  bumps: SpaceshipBump[];

  expIndex: number;

  constructor() {
    super();
    this.active = true;
    this.velocity = 3;
    this.x = 380;
    this.y = 500;
    this.width = 150;
    this.height = 150;
    this.missiles = Array(NUM_MISSILES).fill(null);
    this.unitOfFire = Array(NUM_MISSILES).fill(true);
    this.numShots = 0;
    this.bumps = Array(LIFE).fill(null);
    this.expIndex = 0;
    this.init();
  }

  init() {
    this.missiles = this.missiles.map(() => new Missile());
    this.bumps = this.bumps.map(() => new SpaceshipBump(this.velocity, this.x, this.y));
  }

  start = (direction: KEYS) => {
    if (direction === KEYS.LEFT) {
      this.dx = -this.velocity;
    } else if (direction === KEYS.RIGHT) {
      this.dx = this.velocity;
    } else if (direction === KEYS.UP) {
      this.dy = -this.velocity;
    } else if (direction === KEYS.DOWN) {
      this.dy = this.velocity;
    }
    this.bumps.forEach((bump) => {
      bump.start();
    });
  };

  fire = () => {
    if (this.missiles && this.numShots < NUM_MISSILES) {
      this.missiles[this.numShots].start();
      this.unitOfFire[this.numShots] = false;
      this.numShots += 1;
    }
    if (this.numShots === NUM_MISSILES) {
      this.active = false;
    }
  };

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
    this.bumps.forEach((bump) => {
      bump.followSpaceship(this.x, this.y);
    });

    return this.missiles;
  }

  rebound(opponent: Opponent) {
    const starshipLeft = this.x + this.dx;
    const starshipTop = this.y + this.dy;
    const starshipRight = starshipLeft + this.width;
    const starshipDown = starshipTop + this.height;
    const opponentLeft = opponent.x;
    const opponentTop = opponent.y;
    const opponentRight = opponentLeft + opponent.width;
    const opponentDown = opponentTop + opponent.height;

    if (
      starshipTop < opponentDown
      && starshipDown > opponentDown
    ) {
      this.dy = this.velocity;
    }
    if (
      starshipDown > opponentTop
      && starshipTop < opponentTop
    ) {
      this.dy = -this.velocity;
    }
    if (
      starshipRight > opponentLeft
      && starshipLeft < opponentLeft
    ) {
      this.dx = -this.velocity;
    }
    if (
      starshipLeft < opponentRight
      && starshipRight > opponentRight
    ) {
      this.dx = this.velocity;
    }
  }

  collideOpponent(opponent: Opponent) {
    const x = this.x + this.dx;
    const y = this.y + this.dy;

    if (
      x + this.width > opponent.x
      && x < opponent.x + opponent.width
      && y + this.height > opponent.y
      && y < opponent.y + opponent.height
    ) {
      if (this.expIndex < LIFE) {
        this.bumps[this.expIndex].active = true;
        this.bumps[this.expIndex].animate();
      }
      this.expIndex += opponent.damage;
      this.rebound(opponent);

      if (this.expIndex >= LIFE) {
        this.destroy();
      }

      return true;
    }
    return false;
  }

  collideBounds() {
    const starshipLeft = this.x + this.dx;
    const starshipTop = this.y + this.dy;
    const starshipRight = starshipLeft + this.width;
    const starshipDown = starshipTop + this.height;
    const boundsLeft = 0;
    const boundsTop = 0;
    const boundsRight = WIDTH_CANWAS;
    const boundsDown = HEIGT_CANWAS;

    if (starshipLeft < boundsLeft) {
      this.dx = this.velocity;
    }
    if (starshipRight > boundsRight) {
      this.dx = -this.velocity;
    }
    if (starshipTop < boundsTop) {
      this.dy = this.velocity;
    }
    if (starshipDown > boundsDown) {
      this.dy = -this.velocity;
    }
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    if (this.missiles) {
      this.missiles.forEach((missile) => {
        missile.render(ctx, sprites);
      });
    }
    if (this.active) {
      ctx.drawImage(
        sprites.spaceship,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }

    this.bumps.forEach((bump) => {
      if (bump.active) {
        bump.render(ctx, sprites);
      }
    });

    ctx.fillText(`Ракеты: ${NUM_MISSILES - this.numShots}`, 20, 60);
    ctx.fillText(`Жизни: ${LIFE - this.expIndex > 0 ? LIFE - this.expIndex : 0}`, 20, 120);
  }

  destroy() {
    this.missiles.forEach((missile) => {
      missile.destroy();
    });
    this.active = false;
  }
}
