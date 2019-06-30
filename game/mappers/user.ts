import Sequelize, {DataTypes} from 'sequelize';
import {db} from '../services/db';


export class User extends Sequelize.Model {
  public readonly id!: number;
  public email!: string;
  public displayName: string;
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
    displayName: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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