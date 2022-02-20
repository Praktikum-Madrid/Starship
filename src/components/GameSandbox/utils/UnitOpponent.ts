import Unit from './Unit';
import { KEYS } from './types';

export default class Opponent extends Unit {
  active: boolean;

  constructor(x: number, y: number) {
    super();
    this.active = true;
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 100;
  }

  start(direction: KEYS) {
    if (direction === KEYS.LEFT) {
      this.dx = -this.velocity;
    } else if (direction === KEYS.RIGHT) {
      this.dx = this.velocity;
    }
  }
}
