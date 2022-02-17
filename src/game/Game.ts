import Unit from 'game/units/Unit';

interface ISprites {
  [key: string]: HTMLImageElement;
}

export default class Game {
  _ctx: CanvasRenderingContext2D;

  sprites: ISprites;

  private starShip: Unit | undefined;

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;

    // TODO: считаю что стоит загрузку ресурсов вынести в отдельный файл
    this.sprites = {
      // TODO: считаю что стоит иметь какой-то конфиг со списком ассетов игры
      background: new Image(),
      spaceship: new Image(),
    };
  }

  private preload(callback: CallableFunction) {
    const required = Object.keys(this.sprites).length - 1;

    Object.keys(this.sprites).forEach((key, index) => {
      this.sprites[key].src = `../images/${key}.png`;
      this.sprites[key].addEventListener('load', () => {
        if (index >= required) {
          callback();
        }
      });
    });

    // TODO: нужен какой-то фабричный инициализатор таких объектов
    // Объявили корабль
    this.starShip = new Unit(this.sprites.spaceship, 300, 400, 150, 150, this._ctx);
  }

  private run() {
    window.requestAnimationFrame(() => {
      this.render();
    });

    // Добавляем обработчик нажатий на кнопки и управление кораблем
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      event.stopPropagation();

      // @ts-ignore
      const moveObject = (action: any, [x, y]: number[], animationTime = 500) => {
        const startTime = performance.now();

        // @ts-ignore
        const move = () => {
          // Текущий тамйстамп анимации
          const currentTime = performance.now();
          // Смещение во времени (относительно прошлого рендера)
          const shiftTime = currentTime - startTime;
          // Коэффициент относительно прошедшего времени и заданного (до 1)
          const multiply = shiftTime / animationTime;

          // Пока заданное время не прошло, анимируем
          if (multiply < 1) {
            console.log(x, y);

            if (this.starShip) {
              const { currentX, currentY } = this.starShip.getPosition();
              // FIXME: Переменные с размером холста надо переместить в свойства класса
              if (currentX < -75) {
                x = 1;
              }

              if (currentX > 825) {
                x = -1;
              }

              if (currentY < -75) {
                y = 1;
              }

              if (currentY > 625) {
                y = -1;
              }

              action(x, y);
            }

            this.render();
            requestAnimationFrame(move);
          }
        };

        return move();
      };

      // TODO: Реализовать перемещение по диагонали
      // keyCode 39
      if (event.key === 'ArrowRight') {
        moveObject(this.starShip?.move, [2, 0]);
      }

      // keyCode 37
      if (event.key === 'ArrowLeft') {
        moveObject(this.starShip?.move, [-2, 0]);
      }

      // keyCode 38
      if (event.key === 'ArrowUp') {
        moveObject(this.starShip?.move, [0, -2]);
      }

      // keyCode 40
      if (event.key === 'ArrowDown') {
        moveObject(this.starShip?.move, [0, 2]);
      }
    });
  }

  protected _clearCanvas() {
    this._ctx.clearRect(0, 0, 900, 700);
  }

  private render() {
    this._clearCanvas();
    this._ctx.drawImage(this.sprites.background, 0, 0, 900, 700);
    this.starShip?.render();
  }

  start() {
    this.preload(() => {
      this.run();
    });
  }
}
