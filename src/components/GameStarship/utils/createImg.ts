import { SPRITES } from '../config/const';
import { ISprites } from '../config/types';

export default function createImg(): ISprites {
  const result: ISprites = {};

  SPRITES.forEach((sprite) => {
    result[`${sprite}`] = new Image();
  });

  return result;
}
