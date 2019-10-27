'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const Topic = app.model.define(
    'topic',
    {
      topicid: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: STRING(255), allowNull: false },
      topictitle: { type: STRING(255), allowNull: false },
      topicimg: { type: STRING(1000), allowNull: true },
      topiccontent: { type: STRING(10000), allowNull: false },
      created_at: DATE,
      updated_at: { type: DATE, defaultValue: NOW },
    },
    {
      freezeTableName: true,
    }
  );

  return Topic;
};
