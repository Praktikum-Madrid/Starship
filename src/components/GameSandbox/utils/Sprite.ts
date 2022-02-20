export default class StarshipGame {
  width: number;

  height: number;

  velocity: number;

  dx: number;

  dy: number;

  x: number;

  y: number;

  constructor() {
    this.width = 900;
    this.height = 700;
    this.velocity = 4;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
  }

  stop() {
    this.dx = 0;
    this.dy = 0;
  }

  move() {
    if (this.dx) {
      this.x += this.dx;
    }
    if (this.dy) {
      this.y += this.dy;
    }
  }
}
