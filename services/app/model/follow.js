module.exports = (app) => {
  const { Sequelize, model } = app;
  const { INTEGER, STRING, DATE, NOW } = Sequelize;
  const Follow = model.define(
    'follow',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: STRING(255), allowNull: false },
      followedid: { type: STRING(255) },
      status: { type: INTEGER(1), allowNull: false },
      created_at: { type: DATE, defaultValue: NOW },
      updated_at: { type: DATE, defaultValue: NOW },
    },
    {
      freezeTableName: true,
    }
  );
  return Follow;
};
