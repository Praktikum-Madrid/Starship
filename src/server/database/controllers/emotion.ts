import { EMOTIONS } from 'config/consts';
import { Emotion } from 'server/init';

// Создание смайлов
export async function createEmotions() {
  await Emotion.findOrCreate({ where: { htmlCode: EMOTIONS.SMILE } });
  await Emotion.findOrCreate({
    where: {
      htmlCode: EMOTIONS.SAD,
    },
  });
  await Emotion.findOrCreate({
    where: {
      htmlCode: EMOTIONS.LIKE,
    },
  });
  await Emotion.findOrCreate({
    where: {
      htmlCode: EMOTIONS.HEART,
    },
  });
  await Emotion.findOrCreate({
    where: {
      htmlCode: EMOTIONS.SHIT,
    },
  });
}

// Получение смайла по id
export async function getEmotionById(id: number) {
  return Emotion.findOne({ where: { id } });
}

// Получение всех смайлов
export async function getAllEmotions() {
  return Emotion.findAll();
}
