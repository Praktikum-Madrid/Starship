import { ISprites } from 'types';
import { SPRITES } from 'config/consts';

export default function createImg(): ISprites {
  const result: ISprites = {};

  SPRITES.forEach((sprite) => {
    result[`${sprite}`] = new Image();
  });

  return result;
}
