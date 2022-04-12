/* eslint-disable import/prefer-default-export */
import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';
import { TPostgresUserInfo } from '../config/types';

export const userModel: ModelAttributes<Model, TPostgresUserInfo> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataType.STRING,
    allowNull: false,
  },
  uuid: {
    type: DataType.STRING,
  },
  authCookie: {
    type: DataType.STRING,
  },
  mode: {
    type: DataType.STRING,
  },
};
