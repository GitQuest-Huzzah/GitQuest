const Sequelize = require("sequelize");

//create database link between sequelize and PG
// const db = new Sequelize('postgres://***REMOVED***:***REMOVED***@***REMOVED***:5432/***REMOVED***', {ssl:true});

const db = new Sequelize({
  database:'***REMOVED***',
  username: "***REMOVED***",
  password: "***REMOVED***",
    host: "***REMOVED***",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  },
});

db.sync()
module.exports = db;
