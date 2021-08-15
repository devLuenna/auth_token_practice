//해당 파일은 복붙함. 다른 프로젝트와 비교하여 내용 다른 것 없음.

const DatabaseConnector = require('./common/mysql');

module.exports = class MyDatabaseConnector extends DatabaseConnector {
  constructor() {
    super();
  }
};