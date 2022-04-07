/* eslint-disable import/prefer-default-export */
import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';
import { TPostgresUserInfo } from 'types';

export const userModel: ModelAttributes<Model, TPostgresUserInfo> = {
  userId: {
    type: DataType.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataType.STRING,
    allowNull: false,
  },
  secondName: {
    type: DataType.STRING,
    allowNull: false,
  },
  login: {
    type: DataType.STRING,
    allowNull: false,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
  },
  phone: {
    type: DataType.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataType.STRING,
  },
  avatar: {
    type: DataType.STRING,
  },
};
