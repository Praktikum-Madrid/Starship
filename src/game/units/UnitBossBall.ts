import Unit from 'game/units/Unit';
import { ISprites } from 'types';
import createShadowForImage from 'game/utils/createShadow';

const BALLPARAMS = {
  hp: 10,
  damage: 1,
  velocity: 1,
  x: 350,
  y: 50,
  nameSprite: 'boss1',
  moveRadius: 50,
};

class UnitBossBall extends Unit {
  active: boolean;

  damage: number;

  hp: number;

  // private moveRadius: number;

  private tableWidth: number;

  private tableHeight: number;

  private direction: string;

  constructor(tableWidth: number, tableHeight: number) {
    super();
    this.hp = BALLPARAMS.hp;
    this.velocity = BALLPARAMS.velocity;
    this.active = true;
    this.x = BALLPARAMS.x;
    this.y = BALLPARAMS.y;
    this.width = 50;
    this.height = 50;
    this.damage = BALLPARAMS.damage;
    // this.moveRadius = BALLPARAMS.moveRadius;
    this.direction = 'left-to-bottom';
    this.tableWidth = tableWidth;
    this.tableHeight = tableHeight;
  }

  start() {
    this.dy = this.velocity;
    this.dx = this.velocity;
  }

  move() {
    // Направления движения
    // top-to-left
    // left-to-bottom
    // bottom-to-right
    // right-to-top
    // Вычисляем направление движения
    if (this.x > 0 && this.y > 0) {
      this.direction = 'top-to-left';
      console.log(this.direction);
      this.dy = this.velocity * 1;
      this.dx = this.velocity * -1;
    } else if (this.x <= 0) {
      this.direction = 'left-to-bottom';
      console.log(this.direction);
      this.dy = this.velocity * 1;
      this.dx = this.velocity * 1;
    } else if (this.x >= this.tableWidth) {
      this.direction = 'right-to-top';
      console.log(this.direction);
      this.dy = this.velocity * -1;
      this.dx = this.velocity * -1;
    } else if (this.y >= this.tableHeight) {
      this.direction = 'bottom-to-right';
      console.log(this.direction);
      this.dy = this.velocity * -1;
      this.dx = this.velocity * 1;
    } else if (this.y <= 0) {
      this.direction = 'top-to-left';
      console.log(this.direction);
      this.dy = this.velocity * 1;
      this.dx = this.velocity * -1;
    }

    console.log(this.x, this.y);
    console.log(this.dx, this.dy);

    // Движение босса
    this.x += this.dx;
    this.y += this.dy;
  }

  destroy() {
    this.active = false;
  }

  render(ctx: CanvasRenderingContext2D, sprites: ISprites) {
    if (this.active) {
      const drawImg = () => ctx.drawImage(
        sprites[BALLPARAMS.nameSprite],
        this.x,
        this.y,
        this.width,
        this.height,
      );
      if (this.isShadow) {
        createShadowForImage(ctx, drawImg);
      } else {
        drawImg();
      }
    }
  }
}

export default UnitBossBall;
