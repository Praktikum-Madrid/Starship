/* eslint-disable import/prefer-default-export */
import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';
import { TPostgresMessage } from '../config/types';

export const messageModel: ModelAttributes<Model, TPostgresMessage> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  text: {
    type: DataType.TEXT,
    allowNull: false,
  },
  replyToMessageId: {
    type: DataType.INTEGER,
  },
};
