'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, NOW } = Sequelize;
    await queryInterface.createTable('topic', {
      topicid: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: STRING(255), allowNull: false },
      topictitle: { type: STRING(255), allowNull: true },
      topicimg: { type: STRING(1000), allowNull: false },
      address: { type: STRING(255), allowNull: false },
      created_at: { type: DATE },
      updated_at: { type: DATE },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('topic');
  },
};
