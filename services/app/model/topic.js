module.exports = (app) => {
  const { Sequelize, model } = app;
  const { INTEGER, STRING, DATE, NOW } = Sequelize;
  const Topic = model.define(
    'topic',
    {
      topicid: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: STRING(255), allowNull: false },
      topictitle: { type: STRING(255), allowNull: true },
      topicimg: { type: STRING(1000), allowNull: false },
      address: { type: STRING(255), allowNull: false },
      created_at: { type: DATE, defaultValue: NOW },
      updated_at: { type: DATE, defaultValue: NOW },
    },
    {
      freezeTableName: true,
    }
  );
  return Topic;
};
