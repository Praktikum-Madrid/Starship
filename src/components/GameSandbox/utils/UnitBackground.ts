import Unit from './Unit';
import { ISprites } from './types';

export default class Background extends Unit {
  sx: number; // Координата по оси X верхнего левого угла фрагмента, который будет вырезан из изображения-источника и помещён в контекст-приёмник

  sy: number; // Координата по оси Y верхнего левого угла фрагмента, который будет вырезан из изображения-источника и помещён в контекст-приёмник

  sWidth: number; // Ширина фрагмента, который будет вырезан из изображения источника и помещён в контекст-приёмник

  sHeight: number; // Высота фрагмента, который будет вырезан из изображения источника и помещён в контекст-приёмник

  constructor() {
    super();
    this.velocity = 1;
    this.x = 0;
    this.y = 0;
    this.width = 1400;
    this.height = 1400;
    this.sx = 0;
    this.sy = 0;
    this.sWidth = 900;
    this.sHeight = 700;
  }

  start() {
    this.dy = this.velocity;
  }

  move() {
    if (this.dy) {
      this.sy += this.dy;
      if (this.sy === this.sHeight) {
        this.sy = 0;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    ctx.drawImage(
      sprites.background, // sprites.background_space - это фон космоса
      this.x,
      this.y,
      this.width,
      this.height,
      this.sx,
      this.sy - this.sHeight + 1,
      this.sWidth,
      this.sHeight,
    );
    ctx.drawImage(
      sprites.background, // sprites.background_space - это фон космоса
      this.x,
      this.y,
      this.width,
      this.height,
      this.sx,
      this.sy,
      this.sWidth,
      this.sHeight,
    );
  }
}
