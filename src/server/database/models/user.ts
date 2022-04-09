/* eslint-disable import/prefer-default-export */
import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';
import { TPostgresUserInfo } from 'types';

export const userModel: ModelAttributes<Model, TPostgresUserInfo> = {
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
