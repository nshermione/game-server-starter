import Sequelize, {DataTypes} from 'sequelize';
import {db} from '../db';


export class User extends Sequelize.Model {
  public readonly id!: number;
  public email!: string;
  public password: string;
  public displayName: string;
  public lastLogin: Date;
  public api!: boolean;
  public readonly createdAt!: Date;
  public updatedAt!: Date;
}

export function createUserMapping() {
  let sequelize = db.getSequelize();
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    api: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    displayName: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    lastLogin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    sequelize: sequelize
  });
}