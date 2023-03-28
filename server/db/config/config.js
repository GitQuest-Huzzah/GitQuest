require('dotenv').config();
module.exports = {
  "development": {
    "username": null,
    "password": null,
    "database": "gitgoingdb",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": null,
    "password": null,
    "database": "gitgoingdb",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_CONNECTION,
    "dialect": "postgres"
  }
}
