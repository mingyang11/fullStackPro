module.exports = (app) => {
  const { Sequelize, model } = app;
  const { INTEGER, STRING, DATE, NOW } = Sequelize;
  const User = model.define(
    'users',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: STRING(255), field: 'userId' },
      username: { type: STRING(255), allowNull: false },
      email: { type: STRING(255), allowNull: false },
      password: { type: STRING(255), allowNull: false },
      awatarurl: { type: STRING(255), field: 'awatarUrl' },
      mobile: STRING(32),
      prefix: STRING(32),
      abstract: { type: STRING(255), allowNull: true },
      sex: { type: INTEGER, defaultValue: 0 },
      created_at: { type: DATE, defaultValue: NOW },
      updated_at: { type: DATE, defaultValue: NOW },
    },
    {
      freezeTableName: true,
    }
  );
  return User;
};
