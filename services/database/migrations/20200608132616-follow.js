'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, NOW } = Sequelize;
    await queryInterface.createTable('follow', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: STRING(255), allowNull: false },
      followedid: { type: STRING(255) },
      status: { type: INTEGER(1), allowNull: false },
      created_at: { type: DATE, defaultValue: NOW },
      updated_at: { type: DATE, defaultValue: NOW },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('follow');
  },
};
