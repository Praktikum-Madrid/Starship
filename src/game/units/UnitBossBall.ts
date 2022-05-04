import Unit from 'game/units/Unit';
import { ISprites } from 'types';
import createShadowForImage from 'game/utils/createShadow';

const BALLPARAMS = {
  hp: 5,
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
    this.width = 150;
    this.height = 150;
    this.damage = BALLPARAMS.damage;
    // this.moveRadius = BALLPARAMS.moveRadius;
    this.direction = 'left-to-bottom';
    this.tableWidth = tableWidth;
    this.tableHeight = tableHeight;
  }

  start() {
    this.dy = this.velocity;
    this.dx = this.velocity;
    this.direction = 'top-to-left';
  }

  move() {
    // Вычисляем направление движения
    if (this.direction === 'top-to-left') {
      if (this.x > 0) {
        this.dy = this.velocity * 2;
        this.dx = this.velocity * -1;
      } else {
        this.direction = 'left-to-bottom';
      }
    }

    if (this.direction === 'left-to-bottom') {
      if (this.y < this.tableHeight) {
        this.dy = this.velocity;
        this.dx = this.velocity * 2;
      } else {
        this.direction = 'bottom-to-right';
      }
    }

    if (this.direction === 'bottom-to-right') {
      if (this.x < this.tableWidth) {
        this.dy = this.velocity * -1;
        this.dx = this.velocity * 2;
      } else {
        this.direction = 'right-to-top';
      }
    }

    if (this.direction === 'right-to-top') {
      if (this.y > 0) {
        this.dy = this.velocity * -1;
        this.dx = this.velocity * -1;
      } else {
        this.direction = 'top-to-left';
      }
    }

    // Движение босса
    this.x += this.dx;
    this.y += this.dy;
  }

  takeDamage() {
    console.log('Damage from missle');
    console.log(this.hp);
    this.hp -= 1;
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
