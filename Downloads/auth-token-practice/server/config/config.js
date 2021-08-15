//해당 파일은 npx sequelize-cli init --> 부트스트래핑 하면 자동 생성됨.(다만 config.json으로 생성됨.)

//***************아래 참고

// 성공적으로 bootstraping이 끝나면 다음 파일 및 폴더들이 생성됩니다. 직접 models 디렉토리를 만드는 것이 아닙니다!

// config/config.json
// models/
// migrations/
// seeders/

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "authentication2",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "authentication2",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "authentication2",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
