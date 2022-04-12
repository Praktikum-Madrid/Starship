/* eslint-disable import/prefer-default-export */
import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';
import { TPostgresTheme } from '../config/types';

export const themeModel: ModelAttributes<Model, TPostgresTheme> = {
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
};
