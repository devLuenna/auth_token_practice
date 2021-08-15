'use strict';
//데이터베이스에 미리 저장되어 있을 user 레코드
//수기 작성함!

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      {
        id: '0',
        userId: 'kimcoding',
        password: '1234',
        email: 'kimcoding@authstates.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});
  },
};