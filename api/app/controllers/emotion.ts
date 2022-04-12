import { EMOTIONS } from '../config/consts';
import { Emotion } from '../init';

// Создание смайлов
export async function createEmotions() {
  await Emotion.create({ htmlCode: EMOTIONS.SMILE });
  await Emotion.create({ htmlCode: EMOTIONS.SAD });
  await Emotion.create({ htmlCode: EMOTIONS.LIKE });
  await Emotion.create({ htmlCode: EMOTIONS.HEART });
}

// Получение смайла по id
export async function getEmotionById(id: number) {
  return Emotion.findOne({ where: { id } });
}

// Получение всех смайлов
export async function getAllEmotions() {
  return Emotion.findAll();
}
