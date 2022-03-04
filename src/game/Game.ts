import Unit from 'game/units/Unit';
import Engine from 'game/Engine';
import StarShip from 'game/units/StarShip';
// import throttleInput from 'utils/throttleInput';

interface ISprites {
  [key: string]: HTMLImageElement;
}

export default class Game {
  _ctx: CanvasRenderingContext2D;

  sprites: ISprites;

  private starShip: Unit | undefined;

  private _canvasWidth: number;

  private _canvasHeight: number;

  private _engine: Engine;

  constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    this._ctx = ctx;
    this._canvasWidth = canvasWidth;
    this._canvasHeight = canvasHeight;

    console.log(this._canvasWidth, this._canvasHeight);

    // TODO: считаю что стоит загрузку ресурсов вынести в отдельный файл
    this.sprites = {
      // TODO: считаю что стоит иметь какой-то конфиг со списком ассетов игры
      background: new Image(),
      spaceship: new Image(),
    };

    this._engine = new Engine(this.render, 500);

    // TODO: Использовать эвент бас для инициализации
    this._preload();
  }

  // Загрузка спрайтов
  protected _preload() {
    const required = Object.keys(this.sprites).length - 1;

    Object.keys(this.sprites).forEach((key, index) => {
      this.sprites[key].src = `../images/${key}.png`;
      this.sprites[key].addEventListener('load', () => {
        if (index >= required) {
          // FIXME: Надо переписать изящнее при переносе в отдельный класс
          this._init();
        }
      });
    });
  }

  // Инициализация
  protected _init() {
    this._createUnits();
  }

  // Объявление юнитов
  protected _createUnits() {
    // TODO: нужен какой-то фабричный инициализатор таких объектов
    // Объявили корабль
    this.starShip = new StarShip(this.sprites.spaceship, 300, 400, 150, 150, this._ctx);
    this.setInputListeners();
  }

  // Вешаем листенеры
  protected setInputListeners() {
    // Добавляем обработчик нажатий на кнопки и управление кораблем
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      event.stopPropagation();

      // TODO: Реализовать перемещение по диагонали
      // keyCode 39
      if (event.key === 'ArrowRight') {
        // const limitInput = throttleInput(this.starShip!.move, [1, 0], 1000);
        // limitInput();
        this.starShip!.move(1, 0);
      }

      // keyCode 37
      if (event.key === 'ArrowLeft') {
        // moveObject(this.starShip?.move, [-2, 0]);
        this.starShip!.move(-1, 0);
      }

      // keyCode 38
      if (event.key === 'ArrowUp') {
        this.starShip!.move(0, -1);
      }

      // keyCode 40
      if (event.key === 'ArrowDown') {
        this.starShip!.move(0, 1);
      }
    });
  }

  protected _clearCanvas() {
    this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
  }

  private render = () => {
    this._clearCanvas();
    this._ctx.drawImage(this.sprites.background, 0, 0, 900, 700);
    this.starShip?.render();
  };

  start() {
    this._engine.start();
  }
}
