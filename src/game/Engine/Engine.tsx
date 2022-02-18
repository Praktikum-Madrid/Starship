interface IEngine {
  start: () => void,
  stop: () => void,
}

class Engine implements IEngine {
  private _isLooping: boolean;

  // eslint-disable-next-line no-undef
  private _lastFrameTime: DOMHighResTimeStamp | undefined;

  private _drawFunction: Function;

  private _frameRate: number;

  constructor(drawFunction: Function, frameRate: number) {
    // Активирована ли анимация
    this._isLooping = false;
    this._drawFunction = drawFunction;
    // Частота кадров: 1 мс делим на число кадров
    this._frameRate = 1000 / frameRate;

    // console.log('Engine initialised');
  }

  // Рендерит один кадр
  _animateFrame = () => {
    if (!this._isLooping) {
      return;
    }

    // Текущее время
    const timeNow = performance.now();
    // Число прошедших с последней анимации секунд
    const deltaSeconds = (timeNow - this._lastFrameTime!) / this._frameRate; // Если хотим 25 кадров/сек, тут будет 40
    this._lastFrameTime = timeNow;
    requestAnimationFrame(this._animateFrame);

    // Если прошло время анимации фрейма
    if (deltaSeconds >= 1) {
      this._drawFunction();
    }
  };

  start = () => {
    // console.log('Engine started');
    this._isLooping = true;
    this._lastFrameTime = performance.now();
    this._animateFrame();
  };

  stop = () => {
    this._isLooping = false;
  };
}

export default Engine;
