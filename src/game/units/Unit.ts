import { TCoordinate } from 'types';

export default class Unit {
  protected _y: TCoordinate;

  protected _x: TCoordinate;

  private readonly _width: number;

  private readonly _height: number;

  private readonly _sprite: any;

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
  public move(x: TCoordinate, y: TCoordinate) {
    // TODO: Использовать дебаунсер для ограничения скорости перемещения
    this._x += x;
    this._y += y;
    console.log(this._x, this._y);
  }

  // Рисует юнит на холсте
  public render = () => {
    this._ctx.drawImage(this._sprite, this._x, this._y, this._width, this._height);
  };

  // Возвращает текущюю позицию юнита
  public getPosition = () => ({
    currentX: this._x,
    currentY: this._y,
  });

  public destroy = () => {
    // TODO: Уничтожение объекта
  };
}
