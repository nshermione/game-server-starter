const fs = require('fs');

module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'games',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: true
  },
  test: {
    username: 'user',
    password: 'password',
    database: 'games_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    logging: false
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // }
  }
};