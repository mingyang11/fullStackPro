'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, NOW } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: STRING(255), allowNull: false },
      username: { type: STRING(255), allowNull: false },
      email: { type: STRING(255), allowNull: false },
      password: { type: STRING(255), allowNull: false },
      awatarurl: { type: STRING(255) },
      mobile: { type: STRING(32) },
      prefix: { type: STRING(32) },
      abstract: { type: STRING(255), allowNull: true },
      sex: { type: INTEGER, defaultValue: 0 },
      created_at: { type: DATE },
      updated_at: { type: DATE },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
