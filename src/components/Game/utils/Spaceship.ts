import Sprite from './sprite';
import { KEYS } from './types';

export default class Spaceship extends Sprite {
  constructor() {
    super();
    this.x = 300;
    this.y = 400;
    this.width = 300;
    this.height = 300;
  }

  start(direction: KEYS) {
    if (direction === KEYS.LEFT) {
      this.dx = -this.velocity;
    } else if (direction === KEYS.RIGHT) {
      this.dx = this.velocity;
    }
  }
}
