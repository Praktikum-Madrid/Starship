import Sprite from './sprite';

export default class Background extends Sprite {
  constructor() {
    super();
    this.velocity = 1;
  }

  start() {
    this.dy = this.velocity;
  }

  move() {
    if (this.dy) {
      this.y += this.dy;
      if (this.y > this.height) {
        this.y = 0;
      }
    }
  }
}
