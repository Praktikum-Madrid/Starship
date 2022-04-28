/* eslint-disable import/prefer-default-export */
import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';
import { TPostgresThread } from '../config/types';

export const threadModel: ModelAttributes<Model, TPostgresThread> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  text: {
    type: DataType.TEXT,
    allowNull: false,
  },
};
