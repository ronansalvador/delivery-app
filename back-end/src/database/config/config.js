require('dotenv').config();

const environment = process.env.NODE_ENV || "test";

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.HOSTNAME || process.env.MYSQL_HOST || process.env.MYSQLHOST || 'localhost',
  port: process.env.MYSQL_PORT || process.env.MYSQLPORT || '3306',
  database: process.env.MYSQL_DB_NAME || process.env.MYSQLDBNAME,
    // `${process.env.MYSQL_DB_NAME || 'delivery-app'}${suffix[environment] || suffix.test}`,
  username: process.env.MYSQL_USER || process.env.MYSQLUSER || 'root',
  password: process.env.MYSQL_PASSWORD || process.env.MYSQLPASSWORD || 'password',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
