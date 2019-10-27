'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, NOW } = Sequelize;
    await queryInterface.createTable('topic', {
      topicid: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: STRING(255), allowNull: false },
      topictitle: { type: STRING(255), allowNull: false },
      topicimg: { type: STRING(1000), allowNull: true },
      topiccontent: { type: STRING(10000), allowNull: false },
      created_at: DATE,
      updated_at: { type: DATE, defaultValue: NOW },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('topic');
  },
};
