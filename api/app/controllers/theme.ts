import { THEMES } from '../config/consts';
import { Theme } from '../init';

// Создание тем
export async function createThemes() {
  await Theme.create({ name: THEMES.LIGHT });
  await Theme.create({ name: THEMES.DARK });
}

// Получение темы по ID
export async function getThemeById(id: number) {
  return Theme.findOne({ where: { id } });
}

// Получение всех тем
export async function getAllThemes() {
  return Theme.findAll();
}
