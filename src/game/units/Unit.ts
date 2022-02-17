import { TCoordinate } from 'types';

export default class Unit {
  private _y: TCoordinate;

  private _x: TCoordinate;

  private _width: number;

  private _height: number;

  private _sprite: any;

  private _ctx: CanvasRenderingContext2D;

  // FIXME: Правильный тип у спрайта
  constructor(sprite: any, x: TCoordinate, y: TCoordinate, width: number, height: number, ctx: CanvasRenderingContext2D) {
    this._x = x;
    this._y = y;
    this._sprite = sprite;
    this._width = width;
    this._height = height;
    this._ctx = ctx;
  }

  // Перемещает юнит по координатам (+/-)
  public move = (x: TCoordinate, y: TCoordinate) => {
    this._x += x;
    this._y += y;

    console.log(this._x, this._y);
  };

  public render = () => {
    this._ctx.drawImage(this._sprite, this._x, this._y, this._width, this._height);
  };

  public getPosition = () => ({
    currentX: this._x,
    currentY: this._y,
  });

  public destroy = () => {
    // TODO: Уничтожение объекта
  };
}
