/* eslint-disable import/prefer-default-export */
import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';
import { TPostgresEmotion } from '../config/types';

export const emotionsModel: ModelAttributes<Model, TPostgresEmotion> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  htmlCode: {
    type: DataType.STRING,
    allowNull: false,
  },
};
