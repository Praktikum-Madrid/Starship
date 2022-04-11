import { IMusic } from 'types';

class SoundEngine {
  private _soundsList: string[];

  private _sounds: Record<string, HTMLAudioElement> | never;

  private _currentLoaded: number;

  constructor(soundsList: string[]) {
    this._soundsList = soundsList;
    this._sounds = {};
    this._currentLoaded = 0;

    // Запускаем загрузку звуков
    this._preloadSounds();
  }

  // Загружаем звуки
  private _preloadSounds = () => {
    this._soundsList.forEach((soundName) => {
      console.log('loading', soundName);
      this._sounds[soundName] = new Audio(`../sounds/${soundName}.mp3`);
      this._sounds[soundName]!.addEventListener('canplaythrough', this.countLoaded, {
        once: true,
      });
    });
  };

  // Подсчитываем число загруженных звуков
  private countLoaded = () => {
    console.log('Звук загружен');
    this._currentLoaded += 1;

    // Если все звуки подгружены
    if (this._currentLoaded === this._soundsList.length) {
      console.log('Звуки загружены полностью');
    }
  };

  // Может проигрывать несколько звуков одновременно
  public play(name: string, volume: number = 1) {
    const playedSound = this._sounds[name].cloneNode(true) as HTMLAudioElement;
    playedSound.volume = volume;
    playedSound.play();
    // TODO: Удалять экземпляры из DOM после завершения проигрывания
  }

  // Возвращает трек, которым можно урпавлять
  public addMusic(name: string, volume: number = 1): IMusic {
    const music: IMusic = this._sounds[name].cloneNode(true) as HTMLAudioElement;
    music.volume = volume;

    // eslint-disable-next-line func-names
    music.stop = function () {
      this.src = '';
    };

    return music;
  }
}

export default SoundEngine;
