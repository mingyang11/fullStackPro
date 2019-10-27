'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const Budget = app.model.define(
    'budget',
    {
      budgetid: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: STRING(255), allowNull: false },
      budgetitle: { type: STRING(255), allowNull: false },
      budgetcontent: { type: STRING(10000), allowNull: false },
      money: { type: INTEGER, allowNull: true },
      receiver: { type: INTEGER, allowNull: true },
      created_at: DATE,
      updated_at: { type: DATE, defaultValue: NOW },
    },
    {
      freezeTableName: true,
    }
  );

  return Budget;
};
