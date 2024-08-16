const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Title',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    project: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true,
    },  
    deadline: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Tasks.associate = (models) => {
    Tasks.belongsTo(models.Users, {
      foreignKey: 'user_id',
    });
  };

  Tasks.beforeCreate((task) => {
    task.setDataValue('createdAt', moment().unix());
    task.setDataValue('updatedAt', moment().unix());
  });

  Tasks.beforeUpdate((task) => {
    task.setDataValue('updatedAt', moment().unix());
  });

  return Tasks;
};
