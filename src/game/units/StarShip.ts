import Unit from 'game/units/Unit';
import { TCoordinate } from 'types';
import { velocity, speedRate, drift, slowDownTime } from 'config/units/starShip';

class StarShip extends Unit {
  protected _velocity: number;

  protected _speedRate: number;

  private xSpeed: number;

  private ySpeed: number;

  private _drift: number;

  private slowDownInterval: any;

  constructor(sprite: any, x: TCoordinate, y: TCoordinate, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(sprite, x, y, width, height, ctx);

    // Коэффициент ускорения
    this._velocity = velocity;
    // Максимальная скорость
    this._speedRate = speedRate;
    this._drift = drift;
    this.xSpeed = 1;
    this.ySpeed = 1;
  }

  protected resetSpeed() {
    this.ySpeed = 1;
    this.xSpeed = 1;
  }

  // Рассчитываем базовую физику
  protected _calculatePhysics = (x: number, y: number) => {
    if (x > 0) {
      // Вправо ->
      this.ySpeed = 0;
      if (this.xSpeed < 0) {
        this.xSpeed = 0;
        this._x += this._drift;
      }

      this.xSpeed += this._speedRate;
    }

    if (x < 0) {
      this.ySpeed = 0;
      if (this.xSpeed > 0) {
        this.xSpeed = 0;
        this._x -= this._drift;
      }

      // Влево <-
      this.xSpeed -= this._speedRate;
    }

    console.log('Изменяем скорость');
    if (y > 0) {
      this.xSpeed = 0;
      if (this.ySpeed < 0) {
        this.ySpeed = 0;
        this._y += this._drift;
      }

      // Вверх ->
      this.ySpeed += this._speedRate;
    }

    if (y < 0) {
      this.xSpeed = 0;
      if (this.ySpeed > 0) {
        this.ySpeed = 0;
        this._y -= this._drift;
      }

      // Вниз <-
      this.ySpeed -= this._speedRate;
    }
  };

  // Ограничиваем перемещения
  protected _limitMovements = (x:number, y: number) => {
    const { currentX, currentY } = this.getPosition();

    // FIXME: Переменные с размером холста надо переместить в свойства класса
    if (currentX < -75) {
      this.resetSpeed();
      x = 10;
    }

    if (currentX > 825) {
      this.resetSpeed();
      x = -10;
    }

    if (currentY < -75) {
      this.resetSpeed();
      y = 10;
    }

    if (currentY > 625) {
      this.resetSpeed();
      y = -10;
    }

    return { x, y };
  };

  // Скидываем скорость после того, как корабль не движется
  protected slowDown = () => {
    this.slowDownInterval = setTimeout(() => {
      console.log('Разгон убран');
      this.resetSpeed();
    }, slowDownTime);
  };

  public move(newX: TCoordinate, newY: TCoordinate) {
    clearTimeout(this.slowDownInterval);

    this._calculatePhysics(newX, newY);

    const { x, y } = this._limitMovements(newX, newY);

    const moveX = x * Math.abs(this.xSpeed);
    const moveY = y * Math.abs(this.ySpeed);

    console.log(moveX, moveY);

    this._x += moveX;
    this._y += moveY;
    this.slowDown();
  }
}

export default StarShip;
