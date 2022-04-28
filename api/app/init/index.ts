import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { createEmotions } from '../controllers/emotion';
import { themeModel } from '../models/theme';
import { threadModel } from '../models/thread';
import { messageModel } from '../models/message';
import { emotionsModel } from '../models/emotions';
import { userModel } from '../models/user';
import { createThemes } from '../controllers/theme';

const sequelizeOptions: SequelizeOptions = {
  host: process.env.PGHOST || 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'newPassword',
  database: 'my-db-name',
  dialect: 'postgres',
};

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем модели
export const User = sequelize.define('User', userModel, {});
export const Theme = sequelize.define('Theme', themeModel, {});
export const Thread = sequelize.define('Thread', threadModel, {});
export const Message = sequelize.define('Message', messageModel, {});
export const Emotion = sequelize.define('Emotion', emotionsModel, {});

// Определяем отношения между таблицами
Theme.hasMany(User, {
  foreignKey: 'themeId',
});
User.belongsTo(Theme, {
  foreignKey: 'themeId',
});

Emotion.hasMany(Message, {
  foreignKey: 'emotionId',
});
Message.belongsTo(Emotion, {
  foreignKey: 'emotionId',
});

User.hasMany(Message, {
  foreignKey: 'authorId',
});
Message.belongsTo(User, {
  foreignKey: 'authorId',
});

User.hasMany(Thread, {
  foreignKey: 'authorId',
});
Thread.belongsTo(User, {
  foreignKey: 'authorId',
});

Thread.hasMany(Message, {
  foreignKey: 'threadId',
});
Message.belongsTo(Thread, {
  foreignKey: 'threadId',
});

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync({ force: false }); // Синхронизация базы данных
    await createThemes();
    await createEmotions();
    console.log('Connection has been established successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
