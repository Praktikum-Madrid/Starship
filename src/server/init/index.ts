import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { createThemes } from 'server/database/controllers/theme';
import { createEmotions } from 'server/database/controllers/emotion';
import { themeModel } from 'server/database/models/theme';
import { threadModel } from 'server/database/models/thread';
import { messageModel } from 'server/database/models/message';
import { emotionsModel } from 'server/database/models/emotions';
import { userModel } from 'server/database/models/user';

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
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
User.belongsTo(Theme);

Emotion.hasMany(Message, {
  foreignKey: 'emotionId',
});
Message.belongsTo(Emotion);

User.hasMany(Message, {
  foreignKey: 'authorId',
});
Message.belongsTo(User);

User.hasMany(Thread, {
  foreignKey: 'authorId',
});
Thread.belongsTo(User);

Thread.hasMany(Message, {
  foreignKey: 'threadId',
});
Message.belongsTo(Thread);

// нужна ли связь сообщения к сообщению?
// Message.hasMany(Message, { as: 'comments', foreignKey: 'replyToMessageId' });
// Message.belongsTo(Message, { as: 'message', foreignKey: 'replyToMessageId' });

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
    await createThemes();
    await createEmotions();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
