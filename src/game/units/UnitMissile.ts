import { ISprites } from 'types';
import Unit from './Unit';
import Opponent from './UnitOpponent';
import Explosion from './UnitExplosion';

export default class Missile extends Unit {
  active: boolean;

  explosion: Explosion;

  private _frame: number;

  timerId: number | undefined;

  private _isAnimating: boolean;

  private _animationSpeed: number;

  constructor() {
    super();
    this.active = true;
    this.velocity = 4;
    this.x = 440;
    this.y = 520;
    this.width = 30;
    this.height = 100;
    this.explosion = new Explosion(this.velocity, this.x, this.y);
    this._frame = 1;
    this._isAnimating = false;
    this._animationSpeed = 50;
  }

  start() {
    this.dy = -this.velocity;
    this.explosion.start();
    this._isAnimating = true;
    this.animate();
  }

  move() {
    if (this.y < 0) {
      this.destroy();
    }
    if (this.dx) {
      this.x += this.dx;
    }
    if (this.dy) {
      this.y += this.dy;
    }
    this.explosion.followItem(this.x, this.y);
  }

  // FIXME: Придумать как сталкивать ракеты с боссом так, чтобы хитпоинты снимались по одному
  collide(opponent: Opponent | any) {
    const x = this.x + this.dx;
    const y = this.y + this.dy;

    if (
      x + this.width > opponent.x
      && x < opponent.x + opponent.width
      && y + this.height > opponent.y
      && y < opponent.y + opponent.height
    ) {
      this.explosion.active = true;
      this.explosion.animate();

      return true;
    }
    return false;
  }

  destroy() {
    this.active = false;
    this._isAnimating = false;
    this.y += this.dy;
    this.dy = 0;
    // setTimeout(() => {
    //   this.x = -1000;
    //   this.y = -1000;
    // }, 300);
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    // Вычисляем текущий спрайт
    const currentSprite = sprites[`missile_${this._frame}`];

    if (this.active) {
      ctx.drawImage(
        currentSprite,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    }

    if (this.explosion.active) {
      this.explosion.render(ctx, sprites);
    }

    // Если рокета не существует, прекратить анимацию
    if (!this._isAnimating) {
      clearInterval(this.timerId);
    }
  }

  private animate() {
    if (this._isAnimating) {
      this.timerId = window.setInterval(() => {
        if (this._frame < 4) {
          this._frame += 1;
        } else {
          this._frame = 1;
        }
      }, this._animationSpeed);
    }
  }
}
