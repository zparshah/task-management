const moment = require('moment');

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Tasks, {
      foreignKey: 'user_id',
    });
  };

  Users.beforeCreate((user) => {
    user.setDataValue('createdAt', moment().unix());
    user.setDataValue('updatedAt', moment().unix());
  });

  Users.beforeUpdate((user) => {
    user.setDataValue('updatedAt', moment().unix());
  });

  return Users;
};
